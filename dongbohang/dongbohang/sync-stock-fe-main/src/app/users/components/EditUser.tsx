import { useQuery } from '@tanstack/react-query';
import { getUserAccountById } from '../requests';
import EditUserForm from './EditUserForm';
import { useUserAccountPage } from './UserAccountProvider';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function EditUser() {
    const { selectedItemId, onSelectItemId } = useUserAccountPage();

    const { data: user, isLoading, isError } = useQuery({
        queryKey: ["user-account", selectedItemId],
        queryFn: () => getUserAccountById(selectedItemId!),
        enabled: !!selectedItemId, // Only run the query if selectedItemId is defined
    });

    return (
        <Dialog open={selectedItemId !== undefined} onOpenChange={() => onSelectItemId(undefined)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{selectedItemId ? "Cập nhật thông tin tài khoản" : "Thêm tài khoản mới"}</DialogTitle>
                    <DialogDescription className="hidden"></DialogDescription>
                </DialogHeader>
                {isLoading && <p>Đang tải thông tin người dùng...</p>}
                {isError && <p>Lỗi khi tải thông tin người dùng. Vui lòng thử lại.</p>}
                {!isLoading && !isError && <EditUserForm item={user} />}
            </DialogContent>
        </Dialog>
    );
}