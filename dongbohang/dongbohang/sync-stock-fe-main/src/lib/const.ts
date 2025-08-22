import type { ID } from "@/app/users/constants";

export type User = {
    id: ID;
    fullname: string;
    email: string;
    password: string;
    is_active: boolean;
    role: string;
    description: string;
};
