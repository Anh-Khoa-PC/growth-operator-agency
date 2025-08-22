import { Button } from "@/components/ui/button";
import UsersTable from "./components/UsersTable";
import { useUserAccountPage } from "./components/UserAccountProvider";
import EditUser from "./components/EditUser";

export default function UsersPage() {
    const { onSelectItemId } = useUserAccountPage();
    const handleAddUser = () => {
        onSelectItemId(null);
    };

    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Danh sách người dùng</h1>
                    <Button type="button" onClick={handleAddUser}>Thêm tài khoản</Button>
                </div>
                <UsersTable />
                <EditUser />
            </div>
        </div>
    );
}