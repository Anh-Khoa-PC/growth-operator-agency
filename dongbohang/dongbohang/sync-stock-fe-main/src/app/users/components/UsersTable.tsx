import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@/lib/const";
import { useUserAccountPage } from "./UserAccountProvider";
import { getAllUserAccounts } from "../requests";
import { useEffect, useState } from "react";
import { Edit3, Trash2 } from "lucide-react";

export default function UsersTable() {
    const { filter, changeFilter, onSelectItemId } = useUserAccountPage();
    const [debouncedFilter, setDebouncedFilter] = useState(filter);

    // Debounce filter updates
    useEffect(() => {
        const handler = setTimeout(() => {
            changeFilter(debouncedFilter);
        }, 300); // 300ms debounce delay

        return () => {
            clearTimeout(handler);
        };
    }, [debouncedFilter, filter, changeFilter]);

    // Fetch users using React Query
    const { data: users = [], isLoading, isError } = useQuery({
        queryKey: ["user-accounts", filter],
        queryFn: () => getAllUserAccounts(filter),
    });

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 bg-white">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Họ và tên</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Kích hoạt</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Vai trò</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Ghi chú</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 font-normal">
                            <Input
                                placeholder="Search Full Name"
                                name="fullname"
                                value={debouncedFilter.fullname || ""}
                                onChange={(e) => setDebouncedFilter({ ...debouncedFilter, fullname: e.target.value })}
                            />
                        </th>
                        <th className="px-4 py-2 font-normal">
                            <Input
                                placeholder="Search Email"
                                name="email"
                                value={debouncedFilter.email || ""}
                                onChange={(e) => setDebouncedFilter({ ...debouncedFilter, email: e.target.value })}
                            />
                        </th>
                        <th className="px-4 py-2"></th>
                        <th className="px-4 py-2 font-normal">
                            <Select
                                onValueChange={(value) =>
                                    setDebouncedFilter({
                                        ...debouncedFilter,
                                        is_active: value === "true" ? true : value === "false" ? false : undefined,
                                    })
                                }
                                value={debouncedFilter.is_active !== undefined ? debouncedFilter.is_active.toString() : ""}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Kích hoạt" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tất cả</SelectItem>
                                    <SelectItem value="true">Đang hoạt động</SelectItem>
                                    <SelectItem value="false">Ngừng hoạt động</SelectItem>
                                </SelectContent>
                            </Select>
                        </th>
                        <th className="px-4 py-2"></th>
                        <th className="px-4 py-2"></th>
                        <th className="px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <tr>
                            <td colSpan={6} className="px-4 py-2 text-center text-sm text-gray-500">
                                Loading...
                            </td>
                        </tr>
                    )}
                    {isError && (
                        <tr>
                            <td colSpan={6} className="px-4 py-2 text-center text-sm text-red-500">
                                Lỗi khi tải dữ liệu. Vui lòng thử lại.
                            </td>
                        </tr>
                    )}
                    {!isLoading && !isError && users.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-4 py-2 text-center text-sm text-gray-500">
                                Chưa có dữ liệu
                            </td>
                        </tr>
                    )}
                    {!isLoading &&
                        !isError &&
                        users.map((user: User, index: number) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-2 text-sm text-gray-700">{user.fullname}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{user.is_active ? "Yes" : "No"}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{user.role}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{user.description}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <Button type="button" variant="outline" size="sm" className="mr-2" onClick={() => onSelectItemId(user.id)}>
                                        <Edit3 />
                                    </Button>
                                    <Button variant="destructive" size="sm">
                                        <Trash2 />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}