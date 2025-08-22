// File: /api/get-etsy-stock.js
import axios from 'axios';

export default async function handler(request, response) {
  // Cho phép gọi từ mọi nguồn (CORS) để frontend có thể kết nối
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Xử lý các yêu cầu CORS preflight
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  try {
    const clientId = process.env.VITE_ETSY_CLIENT_ID;
    const refreshToken = process.env.VITE_ETSY_REFRESH_TOKEN;
    const shopId = process.env.VITE_ETSY_SHOP_ID;

    // Kiểm tra các biến môi trường cần thiết
    if (!clientId || !refreshToken || !shopId) {
      console.error("Lỗi: Thiếu biến môi trường.");
      return response.status(500).json({ success: false, message: "Thiếu biến môi trường trên Vercel." });
    }

    // 1. Lấy access token mới bằng refresh token
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('client_id', clientId);
    params.append('refresh_token', refreshToken);

    const tokenResponse = await axios.post("https://api.etsy.com/v3/public/oauth/token", params);
    const accessToken = tokenResponse.data.access_token;

    // 2. Dùng access token để lấy dữ liệu tồn kho từ Etsy
    const etsyResponse = await axios.get(
      `https://openapi.etsy.com/v3/application/shops/${shopId}/listings/active`,
      {
        headers: {
          'x-api-key': clientId,
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    // 3. Trích xuất dữ liệu tồn kho từ phản hồi API
    const stockData = etsyResponse.data.results.flatMap(listing => {
        // Lấy quantity trực tiếp từ listing object
        const quantity = listing.quantity;
        // Kiểm tra nếu sản phẩm có biến thể (SKU)
        if (listing.skus && listing.skus.length > 0) {
            // Tạo một item cho mỗi SKU với cùng một quantity
            return listing.skus.map(sku => ({
                sku: sku,
                stock: quantity,
                listing_title: listing.title,
                listing_id: listing.listing_id
            }));
        } else {
            // Nếu không có SKU, tạo một item duy nhất với title và quantity
            return [{
                sku: "(Không có SKU)",
                stock: quantity,
                listing_title: listing.title,
                listing_id: listing.listing_id
            }];
        }
    });

    // 4. Trả về kết quả thành công
    return response.status(200).json({ success: true, data: stockData });

  } catch (error) {
    // Xử lý và ghi lại lỗi chi tiết nếu có
    console.error("Lỗi trong serverless function:", error.response?.data || error.message);
    return response.status(500).json({ 
        success: false, 
        message: "Lỗi khi lấy dữ liệu Etsy", 
        detail: error.response?.data || error.message 
    });
  }
}