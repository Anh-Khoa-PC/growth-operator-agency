import { useMutation } from '@tanstack/react-query';
import z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUserAccountPage } from './UserAccountProvider';
import { createUserAccount, updateUserAccount } from '../requests';
import { isAxiosError } from 'axios';
import { queryClient } from '@/main';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { userRoles } from '../constants';
import { Textarea } from '@/components/ui/textarea';

// Define Zod schema for form validation
const userSchema = z.object({
    fullname: z.string().min(1, "Full Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.string().min(1, "Role is required"),
    is_active: z.boolean().optional(),
    description: z.string().optional(),
});


type UserFormValues = z.infer<typeof userSchema>;

export default function EditUserForm({
    item
}: {
    item?: Partial<UserFormValues>;
}) {
    const { selectedItemId, onSelectItemId } = useUserAccountPage();

    const formDefaultValues = item || {
        fullname: "",
        email: "",
        password: "",
        role: "",
        description: "",
        is_active: true, // Default to active
    };

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: UserFormValues) => {
            if (selectedItemId) {
                // updateUserAccount expects (id, user)
                return updateUserAccount(selectedItemId, data);
            } else {
                // createUserAccount expects (user)
                return createUserAccount(data);
            }
        },
    });

    const form = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: formDefaultValues,
    });

    const submit = ({ data, doReset = false }: { data: UserFormValues; doReset?: boolean }) => {
        mutate(data, {
            onSuccess: async (data) => {
                if (isAxiosError(data)) {
                    toast.error('Có lỗi xảy ra:' + data.response?.data.message);
                } else {
                    toast.success('Nhập dữ liệu thành công');

                    await queryClient.refetchQueries({
                        queryKey: ['user-accounts'],
                    });

                    if (!doReset) {
                        onSelectItemId(undefined)
                    } else {
                        form.reset(formDefaultValues);
                        form.setFocus('fullname');
                    }
                }
            },
            onError: (error) => {
                if (isAxiosError(error)) {
                    toast.error('Có lỗi xảy ra:' + error.response?.data.message);
                }
            }
        });
    }



    const onSubmit = async (data: UserFormValues) => {
        try {
            submit({ data });
        } catch (error) {
            console.error('Unknown error: ' + error);
        }
    };

    const saveAndReset = async (data: UserFormValues) => {
        try {
            submit({ data, doReset: true });
        } catch (error) {
            console.error('Unknown error: ' + error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='after:text-red-500 after:content-["*"]'>Họ và tên người dùng</FormLabel>
                            <FormControl>
                                <Input placeholder="Họ và tên người dùng" autoComplete='off' autoFocus {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='after:text-red-500 after:content-["*"]'>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" autoComplete='off' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='after:text-red-500 after:content-["*"]'>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='after:text-red-500 after:content-["*"]'>Vai trò</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                >
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder="Chọn vai trò" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={userRoles.ADMIN}>Admin</SelectItem>
                                        <SelectItem value={userRoles.USER}>User</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ghi chú</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Ghi chú" autoComplete='off' {...field} ></Textarea>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter className='flex items-center gap-2'>
                    <Button variant="outline" onClick={() => onSelectItemId(undefined)}>
                        Đóng
                    </Button>
                    <Button type="submit" disabled={isPending}>{selectedItemId ? "Lưu thay đổi" : "Thêm"}</Button>
                    {selectedItemId ?
                        <Button type="button" onClick={form.handleSubmit(saveAndReset)} disabled={isPending}>Lưu và Tiếp tục</Button>
                        : null}

                </DialogFooter>
            </form>
        </Form>
    );
}