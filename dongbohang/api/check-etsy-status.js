// File: /api/check-etsy-status.js
import axios from 'axios';

export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  try {
    const clientId = process.env.VITE_ETSY_CLIENT_ID;
    const refreshToken = process.env.VITE_ETSY_REFRESH_TOKEN;
    const shopId = process.env.VITE_ETSY_SHOP_ID;

    // Lấy access token mới để xác thực
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('client_id', clientId);
    params.append('refresh_token', refreshToken);

    const tokenResponse = await axios.post("https://api.etsy.com/v3/public/oauth/token", params);
    const accessToken = tokenResponse.data.access_token;

    // Gọi một API đơn giản để kiểm tra kết nối (lấy thông tin shop)
    const etsyResponse = await axios.get(
      `https://openapi.etsy.com/v3/application/shops/${shopId}`,
      {
        headers: {
          'x-api-key': clientId,
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    
    // Nếu gọi thành công, trả về tên shop
    const shopName = etsyResponse.data.shop_name;
    return response.status(200).json({ success: true, message: `Kết nối thành công tới shop: ${shopName}` });

  } catch (error) {
    console.error("Lỗi khi kiểm tra trạng thái Etsy:", error.response?.data || error.message);
    return response.status(500).json({ success: false, message: "Kết nối thất bại. Vui lòng kiểm tra lại thông tin trong file .env." });
  }
}