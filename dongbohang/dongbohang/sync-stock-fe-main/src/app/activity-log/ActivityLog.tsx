import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ActivityLogPage() {
    const [filters, setFilters] = useState({
        from: "",
        to: "",
        user: "",
        action: "",
        status: "",
    });

    const [logs] = useState([
        {
            time: "2025-07-22 10:00:00",
            user: "johndoe@example.com",
            action: "1",
            status: "success",
            data: "Updated user profile",
        },
        {
            time: "2025-07-22 11:00:00",
            user: "janesmith@example.com",
            action: "2",
            status: "failed",
            data: "Deleted a product",
        },
        {
            time: "2025-07-22 12:00:00",
            user: "admin@example.com",
            action: "3",
            status: "success",
            data: "Added a new category",
        },
    ]);

    const filteredLogs = logs.filter((log) => {
        const matchesTime =
            (!filters.from || new Date(log.time) >= new Date(filters.from)) &&
            (!filters.to || new Date(log.time) <= new Date(filters.to));
        const matchesUser = !filters.user || log.user.includes(filters.user);
        const matchesAction = (!filters.action || filters.action === "all") || log.action === filters.action;

        return matchesTime && matchesUser && matchesAction;
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Nhật ký hoạt động</h1>
                </div>
                <div className="flex flex-wrap gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Thời gian từ</label>
                        <Input
                            type="datetime-local"
                            name="from"
                            value={filters.from}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Thời gian đến</label>
                        <Input
                            type="datetime-local"
                            name="to"
                            value={filters.to}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Người dùng</label>
                        <Input
                            type="text"
                            name="user"
                            placeholder="Email người dùng"
                            value={filters.user}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hành động</label>
                        <Select
                            onValueChange={(value) => setFilters((prev) => ({ ...prev, action: value }))}
                            value={filters.action}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn hành động" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả</SelectItem>
                                <SelectItem value="1">Hành động 1</SelectItem>
                                <SelectItem value="2">Hành động 2</SelectItem>
                                <SelectItem value="3">Hành động 3</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                        <Select
                            onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
                            value={filters.status}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả</SelectItem>
                                <SelectItem value="success">Thành công</SelectItem>
                                <SelectItem value="failed">Thất bại</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 bg-white">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Thời gian</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Người dùng</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Hành động</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Trạng thái</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Dữ liệu thay đổi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.map((log, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2 text-sm text-gray-700">{log.time}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{log.user}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{`Hành động ${log.action}`}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{log.status === "success" ? (<Badge className="bg-green-100 text-green-800">Thành công</Badge>) : (<Badge className="bg-red-100 text-red-800">Thất bại</Badge>)}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{log.data}</td>
                                </tr>
                            ))}
                            {filteredLogs.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-2 text-center text-sm text-gray-500">
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <Button
                        type="button"
                        title="Trang trước"
                        variant="outline"
                    >
                        <ArrowLeft />
                    </Button>
                    <div className="flex items-center gap-2">
                        <span>Trang</span>
                        <Input
                            type="number"
                            value={1}
                            onChange={() => {}}
                            min={1}
                            // max={totalPages}
                            className="w-16 text-center"
                        />
                        <span>/ 7</span>
                    </div>
                    <Button
                        type="button"
                        title="Trang sau"
                        variant="outline"
                    >
                        <ArrowRight />
                    </Button>
                </div>
            </div>
        </div>
    );
}