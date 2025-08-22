import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

interface CombinedItem {
    sku: string;
    etsy_stock: number;
    shipxanh_stock: string | number;
    listing_title: string;
    listing_id: number;
}

export default function SyncStockPage() {
    const [combinedData, setCombinedData] = useState<CombinedItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAllStockData = async () => {
        setIsLoading(true);
        setError(null);
        setCombinedData([]);

        try {
            // Gọi đến backend /api/sync-all-stock
            const response = await axios.get("/api/sync-all-stock");

            if (response.data.success) {
                setCombinedData(response.data.data);
                toast.success(`Đã tải thành công ${response.data.data.length} sản phẩm.`);
            } else {
                setError(response.data.detail); // Hiển thị lỗi chi tiết từ backend
                toast.error(response.data.message || "Không thể tải dữ liệu.");
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.detail || err.message);
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Đã xảy ra lỗi không xác định.");
            }
            console.error("Lỗi frontend:", err);
            toast.error("Lỗi khi tải dữ liệu. Vui lòng kiểm tra log backend.");
        } finally {
            setIsLoading(false);
        }
    };

    // Tự động gọi API khi component được tải
    useEffect(() => {
        fetchAllStockData();
    }, []);

    const handleSyncToShipXanh = () => {
        toast.info("Chức năng đồng bộ chưa được triển khai hoàn chỉnh.");
    };

    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Bảng So Sánh Tồn Kho</h1>
                    <Button onClick={fetchAllStockData} disabled={isLoading}>
                        {isLoading ? "Đang tải..." : "Làm mới dữ liệu"}
                    </Button>
                </div>

                {error && <div className="text-red-500 mb-4">Lỗi: {error}</div>}

                {combinedData.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 bg-white">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-700 border-r">Mã sản phẩm</th>
                                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-700 border-r">Tồn kho Etsy</th>
                                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Tồn kho Ship Xanh</th>
                                </tr>
                            </thead>
                            <tbody>
                                {combinedData.map((item, index) => (
                                    <tr key={item.sku || index} className="border-t">
                                        <td className="py-2 px-4 border-b text-sm text-gray-700">{item.sku || "(Không có SKU)"}</td>
                                        <td className="py-2 px-4 border-b text-sm text-gray-700">{item.etsy_stock}</td>
                                        <td className="py-2 px-4 border-b text-sm text-gray-700">{item.shipxanh_stock}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex gap-4 mt-4">
                            <Button onClick={handleSyncToShipXanh}>Đồng bộ từ Etsy → Ship Xanh</Button>
                        </div>
                    </div>
                )}

                {isLoading && (
                    <div className="text-center mt-10">
                        <p>Đang tải dữ liệu tồn kho...</p>
                    </div>
                )}
                {!isLoading && combinedData.length === 0 && !error && (
                    <div className="text-gray-500 text-center mt-10">
                        <p>Không tìm thấy dữ liệu tồn kho.</p>
                    </div>
                )}
            </div>
        </div>
    );
}