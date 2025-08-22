// /api/sync-all-stock.js
// Boss nhớ deploy với Node >= 18 (Vercel mặc định ok). Không cần node-fetch.
// DEBUG log: set ENV DEBUG=true để in log chi tiết.

const DEBUG = process.env.DEBUG === "true";

// ---- Helpers ---------------------------------------------------------------

function log(...args) {
  if (DEBUG) console.log(...args);
}

function assertEnv(name) {
  const v = process.env[name];
  if (!v || String(v).trim() === "") {
    throw new Error(`Thiếu biến môi trường: ${name}`);
  }
  return v;
}

async function fetchJSON(url, opts = {}, timeoutMs = 15000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal, ...opts });
    const text = await res.text(); // đọc text trước để debug dễ hơn
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      // nếu không phải JSON, vẫn trả về raw
      data = text;
    }
    if (!res.ok) {
      const err = new Error(
        `HTTP ${res.status} ${res.statusText} for ${url} :: ${typeof data === "string" ? data : JSON.stringify(data)}`
      );
      err.status = res.status;
      err.body = data;
      throw err;
    }
    return data;
  } finally {
    clearTimeout(id);
  }
}

// ---- ShipXanh via Firebase -------------------------------------------------

/**
 * Đăng nhập Firebase (ShipXanh dùng Firebase Auth) để lấy idToken
 */
async function getShipXanhIdToken({ email, password, firebaseApiKey }) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`;
  const body = {
    email,
    password,
    returnSecureToken: true,
  };
  log("ShipXanh Login →", email);
  const data = await fetchJSON(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!data?.idToken) {
    throw new Error("Không lấy được idToken từ Firebase (ShipXanh).");
  }
  return data.idToken;
}

/**
 * Lấy toàn bộ products từ ShipXanh (paginate)
 * API: https://prod-api.shipxanh.com/inventory/products?active=true&page=0&size=200
 * Response mẫu Boss đã gửi: { code, message, data: { total, items:[{models:[{sku, sellableStock,...}], ...}] } }
 */
async function getShipXanhProducts({ idToken }) {
  const base = "https://prod-api.shipxanh.com/inventory/products?active=true";
  const size = 200;
  let page = 0;
  const all = [];

  while (true) {
    const url = `${base}&page=${page}&size=${size}`;
    log("ShipXanh GET →", url);
    const json = await fetchJSON(
      url,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      },
      20000
    );

    const items = json?.data?.items ?? json?.items ?? [];
    log(`ShipXanh page ${page} → items:`, items.length);

    if (!Array.isArray(items) || items.length === 0) break;

    all.push(...items);
    // nếu tổng đã đủ thì dừng
    const total = json?.data?.total ?? null;
    if (total !== null && all.length >= total) break;

    page += 1;
  }

  return all;
}

/**
 * Chuẩn hoá ShipXanh → map SKU → stock (sellableStock)
 * Vì mỗi product có nhiều model (variation), mình flatten models.
 */
function flattenShipXanhToSkuStock(shipProducts = []) {
  const skuToStock = new Map();
  for (const p of shipProducts) {
    const models = p?.models ?? [];
    for (const m of models) {
      const sku = m?.sku;
      const stock =
        m?.sellableStock ?? m?.stock ?? m?.quantity ?? 0; // fallback đề phòng
      if (sku) {
        skuToStock.set(sku, Number(stock) || 0);
      }
    }
  }
  return skuToStock;
}

// ---- Etsy ------------------------------------------------------------------

/**
 * Lấy access_token mới từ Etsy bằng refresh_token
 * Endpoint: https://api.etsy.com/v3/public/oauth/token
 */
async function refreshEtsyAccessToken({ clientId, refreshToken }) {
  const form = new URLSearchParams();
  form.append("grant_type", "refresh_token");
  form.append("client_id", clientId);
  form.append("refresh_token", refreshToken);

  const url = "https://api.etsy.com/v3/public/oauth/token";
  log("Etsy refresh token…");
  const data = await fetchJSON(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    },
    20000
  );
  if (!data?.access_token) {
    throw new Error(
      `Không lấy được Etsy access_token: ${JSON.stringify(data)}`
    );
  }
  return data.access_token;
}

/**
 * Lấy tất cả listings đang active (paginate theo offset)
 * API: GET /v3/application/shops/{shop_id}/listings/active?limit=100&offset=0
 */
async function getAllEtsyListings({ accessToken, clientId, shopId }) {
  const limit = 100;
  let offset = 0;
  const all = [];

  while (true) {
    const url = `https://openapi.etsy.com/v3/application/shops/${shopId}/listings/active?limit=${limit}&offset=${offset}`;
    log("Etsy GET →", url);
    const json = await fetchJSON(
      url,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-api-key": clientId, // LƯU Ý: x-api-key = client_id
          Authorization: `Bearer ${accessToken}`,
        },
      },
      20000
    );

    const results = json?.results ?? [];
    all.push(...results);
    if (results.length < limit) break; // hết trang
    offset += limit;
  }

  return all;
}

// ---- Combine ---------------------------------------------------------------

/**
 * Ghép Etsy listings với ShipXanh stock theo SKU
 * Etsy: mỗi listing có mảng skus (option)
 */
function combineEtsyWithShipXanh({ etsyListings, shipSkuToStock }) {
  const combined = [];

  for (const et of etsyListings) {
    const quantity = et?.quantity ?? 0; // stock Etsy ở cấp listing
    const skus = Array.isArray(et?.skus) ? et.skus : [];

    if (skus.length > 0) {
      for (const sku of skus) {
        combined.push({
          sku,
          etsy_stock: quantity,
          shipxanh_stock: shipSkuToStock.has(sku)
            ? shipSkuToStock.get(sku)
            : "No data",
          listing_title: et?.title ?? "",
          listing_id: et?.listing_id ?? "",
        });
      }
    } else {
      combined.push({
        sku: "(Không có SKU)",
        etsy_stock: quantity,
        shipxanh_stock: "No data",
        listing_title: et?.title ?? "",
        listing_id: et?.listing_id ?? "",
      });
    }
  }

  return combined;
}

// ---- API Route -------------------------------------------------------------

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET")
    return res.status(405).json({ message: "Chỉ chấp nhận phương thức GET" });

  try {
    // Validate ENV
    const FIREBASE_API_KEY = assertEnv("FIREBASE_API_KEY");
    const SHIPXANH_USERNAME = assertEnv("SHIPXANH_USERNAME");
    const SHIPXANH_PASSWORD = assertEnv("SHIPXANH_PASSWORD");

    const ETSY_CLIENT_ID = assertEnv("VITE_ETSY_CLIENT_ID"); // x-api-key
    const ETSY_REFRESH_TOKEN = assertEnv("VITE_ETSY_REFRESH_TOKEN");
    const ETSY_SHOP_ID = assertEnv("VITE_ETSY_SHOP_ID");

    // 1) ShipXanh → Firebase idToken → products
    let shipIdToken = null;
    let shipProducts = [];
    try {
      shipIdToken = await getShipXanhIdToken({
        email: SHIPXANH_USERNAME,
        password: SHIPXANH_PASSWORD,
        firebaseApiKey: FIREBASE_API_KEY,
      });
      const items = await getShipXanhProducts({ idToken: shipIdToken });
      shipProducts = items;
    } catch (e) {
      console.error("❌ ShipXanh lỗi:", e.message);
    }
    const shipSkuToStock = flattenShipXanhToSkuStock(shipProducts);

    // 2) Etsy → refresh token → listings
    let etsyListings = [];
    try {
      const etsyAccessToken = await refreshEtsyAccessToken({
        clientId: ETSY_CLIENT_ID,
        refreshToken: ETSY_REFRESH_TOKEN,
      });

      etsyListings = await getAllEtsyListings({
        accessToken: etsyAccessToken,
        clientId: ETSY_CLIENT_ID,
        shopId: ETSY_SHOP_ID,
      });
    } catch (e) {
      console.error("❌ Etsy lỗi:", e.message);
    }

    // 3) Combine
    const combined = combineEtsyWithShipXanh({
      etsyListings,
      shipSkuToStock,
    });

    return res.status(200).json({
      success: true,
      stats: {
        etsy_count: etsyListings.length,
        shipxanh_products: shipProducts.length,
        shipxanh_unique_skus: shipSkuToStock.size,
        combined_rows: combined.length,
      },
      data: combined,
      debug: DEBUG
        ? {
            sample_ship_product: shipProducts[0] ?? null,
            first_10_sku_map: Array.from(shipSkuToStock.entries()).slice(0, 10),
          }
        : undefined,
    });
  } catch (err) {
    console.error("❌ Lỗi tổng:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Lỗi server không xác định",
    });
  }
}
