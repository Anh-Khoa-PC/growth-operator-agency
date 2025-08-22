import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";

// --- Các hàm tạo mã hóa PKCE ---
// Tạo một chuỗi ngẫu nhiên an toàn
const generateRandomString = (length: number) => {
    const array = new Uint32Array(length / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).slice(-2)).join('');
};

// Băm chuỗi bằng SHA-256
const sha256 = async (plain: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
};

// Chuyển đổi ArrayBuffer sang Base64URL
const base64urlencode = (a: ArrayBuffer) => {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(a) as any))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
// ------------------------------------

const ETSY_AUTH_URL = "https://www.etsy.com/oauth/connect";
const ETSY_REDIRECT_URI = `${window.location.origin}/account-configs/callback`;
const ETSY_STATE = "super-state-khoa-pc";

const fetchEtsyClientKey = async () => {
    const { data } = await axios.get("/api/get-client-key");
    if (!data.success) throw new Error(data.message);
    return data.clientKey;
};

export default function EtsyAccountForm() {
    const { data: clientKey, isLoading, isError, error } = useQuery({
        queryKey: ["etsy-client-key"],
        queryFn: fetchEtsyClientKey,
    });

    const handleConnect = async () => {
        if (!clientKey) {
            toast.error("Không tìm thấy Client Key.");
            return;
        }
        // 1. Tạo cặp mã hóa mới
        const codeVerifier = generateRandomString(128);
        const hashed = await sha256(codeVerifier);
        const codeChallenge = base64urlencode(hashed);

        // 2. Lưu verifier vào sessionStorage để trang callback có thể lấy
        sessionStorage.setItem("etsy_code_verifier", codeVerifier);

        // 3. Tạo URL và chuyển hướng người dùng
        const authUrl = `${ETSY_AUTH_URL}?response_type=code&client_id=${clientKey}&redirect_uri=${ETSY_REDIRECT_URI}&scope=listings_r%20listings_w%20shops_r&state=${ETSY_STATE}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
        window.location.href = authUrl;
    };

    if (isError) {
        return <p className="text-red-500">Lỗi: {error.message}. Hãy chắc chắn bạn đã thêm VITE_ETSY_CLIENT_ID vào file .env.</p>
    }

    return (
        <Card>
            <CardHeader><CardTitle>Kết nối tài khoản Etsy</CardTitle></CardHeader>
            <CardContent>
                {isLoading ? (<p>Đang tải cài đặt...</p>) : (
                    <Button onClick={handleConnect} disabled={!clientKey}>
                        Kết nối với Etsy
                    </Button>
                )}
                <p className="text-sm text-gray-500 mt-4">
                    Nhấn vào nút trên để ủy quyền cho ứng dụng. Việc này chỉ cần làm một lần duy nhất để lấy Refresh Token.
                </p>
            </CardContent>
        </Card>
    );
}