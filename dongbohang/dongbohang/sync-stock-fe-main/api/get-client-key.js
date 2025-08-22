// File: /api/get-client-key.js
export default async function handler(request, response) {
  try {
    const clientId = process.env.VITE_ETSY_CLIENT_ID;
    if (!clientId) {
      throw new Error("VITE_ETSY_CLIENT_ID is not defined in .env file.");
    }
    response.status(200).json({ success: true, clientKey: clientId });
  } catch (error) {
    console.error(error);
    response.status(500).json({ success: false, message: error.message });
  }
}