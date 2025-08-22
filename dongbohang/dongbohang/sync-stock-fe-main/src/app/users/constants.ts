export type ID = number | string | null;

export interface FilterState {
    fullname?: string; // Filter by full name
    is_active?: boolean; // Filter by active status
    email?: string; // Filter by email
}

export const userRoles = {
    ADMIN: 'ADMIN_ROLE',
    USER: 'USER_ROLE',
}