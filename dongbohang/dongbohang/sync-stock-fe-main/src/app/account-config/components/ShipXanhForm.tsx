import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { getShipXanhCredentials, saveShipXanhCredentials } from "../request";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isAxiosError } from "axios";

// Define Zod schema for form validation
const shipXanhSchema = z.object({
    email: z.string().min(1, "Email là bắt buộc"),
    password: z.string().min(1, "Password là bắt buộc"),
});

type ShipXanhFormValues = z.infer<typeof shipXanhSchema>;

export default function ShipXanhAccountForm() {
    const { data: accountInfo, isLoading: isFetching, isError, error } = useQuery({
        queryKey: ["ship-xanh-account-info"],
        queryFn: getShipXanhCredentials,
    });

    if (isError) {
        toast.error("Failed to fetch ShipXanh account information.");
        console.error(error);
    }

    const form = useForm<ShipXanhFormValues>({
        resolver: zodResolver(shipXanhSchema),
        defaultValues: {
            email: accountInfo?.email || "",
            password: accountInfo?.password || "",
        },
        values: {
            email: accountInfo?.email || "",
            password: accountInfo?.password || "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: ShipXanhFormValues) => {
            return saveShipXanhCredentials(data.email, data.password);
        },
        onSuccess: () => {
            toast.success("Lưu thông tin tài khoản thành công!");
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                toast.error("Lưu thông tin thất bại. " + error.message || "Vui lòng thử lại.");
            } else {
                toast.error("Lưu thông tin thất bại. Vui lòng thử lại.");
            }
            console.error(error);
        },
    });

    const onSubmit = (data: ShipXanhFormValues) => {
        mutate(data);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tài khoản Ship Xanh</CardTitle>
            </CardHeader>
            <CardContent>
                {isFetching ? (
                    <p>Loading account information...</p>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="after:text-red-500 after:content-['*']">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email"
                                                placeholder="Nhập email của bạn"
                                                {...field}
                                            />
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
                                        <FormLabel className="after:text-red-500 after:content-['*']">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="Nhập mật khẩu"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? "Đang lưu..." : "Lưu"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
            </CardContent>
        </Card>
    );
}