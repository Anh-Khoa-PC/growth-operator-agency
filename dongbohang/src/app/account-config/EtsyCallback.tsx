import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const exchangeCodeForToken = async (code: string, codeVerifier: string) => {
    const { data } = await axios.post('/api/exchange-code', { 
        code: code,
        codeVerifier: codeVerifier
    });
    if (!data.success) {
        throw new Error(data.details?.error_description || data.message || "Không thể đổi code lấy token.");
    }
    return data;
};

export default function EtsyCallbackPage() {
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');

        // Lấy verifier đã được lưu từ bước trước
        const codeVerifier = sessionStorage.getItem("etsy_code_verifier");

        if (code && codeVerifier) {
            toast.info("Đã nhận được mã, đang đổi lấy Refresh Token...");
            exchangeCodeForToken(code, codeVerifier)
                .then(res => {
                    setRefreshToken(res.refreshToken);
                    toast.success("Lấy Refresh Token thành công!");
                })
                .catch(err => {
                    setError(err.message);
                    toast.error("Lấy Refresh Token thất bại.");
                })
                .finally(() => {
                    // Xóa verifier sau khi dùng xong
                    sessionStorage.removeItem("etsy_code_verifier");
                });
        } else {
            setError("Không tìm thấy mã ủy quyền hoặc mã xác thực trong phiên làm việc.");
        }
    }, [location]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Hoàn tất kết nối Etsy</h1>
            {refreshToken && (
                <div className="p-4 bg-green-100 text-green-800 rounded mt-4">
                    <p className="font-bold">Thành công! Vui lòng copy Refresh Token dưới đây và dán vào file `.env` của bạn tại dòng `VITE_ETSY_REFRESH_TOKEN`.</p>
                    <pre className="mt-2 p-2 bg-gray-200 text-black rounded break-all">{refreshToken}</pre>
                </div>
            )}
            {error && <p className="p-4 bg-red-100 text-red-800 rounded mt-4">Lỗi: {error}</p>}
        </div>
    );
}