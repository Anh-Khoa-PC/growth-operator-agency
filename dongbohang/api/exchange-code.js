// File: /api/exchange-code.js
import axios from 'axios';

export default async function handler(request, response) {
  // Chỉ cho phép request POST
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { code, codeVerifier } = request.body;

    if (!code || !codeVerifier) {
      return response.status(400).json({ message: 'Thiếu code hoặc codeVerifier.' });
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', process.env.VITE_ETSY_CLIENT_ID);
    params.append('redirect_uri', `${process.env.VITE_FRONTEND_URL}/account-configs/callback`);
    params.append('code', code);
    params.append('code_verifier', codeVerifier);

    const tokenResponse = await axios.post("https://api.etsy.com/v3/public/oauth/token", params);

    const refreshToken = tokenResponse.data.refresh_token;

    return response.status(200).json({ success: true, refreshToken: refreshToken });

  } catch (error) {
    console.error("Lỗi khi đổi code lấy token:", error.response?.data || error.message);
    return response.status(500).json({ success: false, message: "Lỗi phía server khi đổi token.", details: error.response?.data });
  }
}