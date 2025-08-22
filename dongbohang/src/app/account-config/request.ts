import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

// Function to send Etsy account information
export const saveEtsyClientKey = async (clientKey: string) => {
    const response = await axios.post(`${BACKEND_URL}/api/v1/etsy/save-client-key`, {
        client_key: clientKey,
    });
    return response.data;
};

// Function to send ShipXanh account credentials
export const saveShipXanhCredentials = async (email: string, password: string) => {
    const response = await axios.post(`${BACKEND_URL}/api/v1/ship-xanh/save-credentials`, {
        email,
        password,
    });
    return response.data;
};

// Function to fetch Etsy Client Key
export const getEtsyClientKey = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/etsy/client-keys`);
    return response.data;
};

// Function to fetch ShipXanh credentials
export const getShipXanhCredentials = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/ship-xanh/credentials`);
    return response.data;
};

// Function to fetch ShipXanh stock data
export const getShipXanhStockData = async (url: string) => {
    const response = await axios.post(`${BACKEND_URL}/api/v1/ship-xanh/stock-numbers`, {
        url,
    });
    return response.data;
};