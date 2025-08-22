import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Trang này không tồn tại hoặc đã bị xóa.
      </p>
      <Button onClick={() => navigate("/")} className="px-6 py-2">
        Quay lại trang chủ
      </Button>
    </div>
  );
}