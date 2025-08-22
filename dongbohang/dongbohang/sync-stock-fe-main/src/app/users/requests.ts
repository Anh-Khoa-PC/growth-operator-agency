import axios from "axios";
import type { FilterState, ID } from "./constants";

// Sample response data for user accounts
const sampleUserAccounts = [
    {
        id: "1",
        fullname: "John Doe",
        email: "johndoe@example.com",
        password: "********", // Typically, passwords are not returned in plain text
        is_active: true,
        role: "Admin",
        description: "Administrator of the app",
    },
    {
        id: "2",
        fullname: "Jane Smith",
        email: "janesmith@example.com",
        password: "********",
        is_active: false,
        role: "User",
        description: "Regular user",
    },
    {
        id: "3",
        fullname: "Alice Johnson",
        email: "alicejohnson@example.com",
        password: "********",
        is_active: true,
        role: "Manager",
        description: "Manages user accounts",
    },
    {
        id: "4",
        fullname: "Bob Brown",
        email: "bobbrown@example.com",
        password: "********",
        is_active: false,
        role: "User",
        description: "Inactive user account",
    },
];

export default sampleUserAccounts;


const BACKEND_URL = import.meta.env.BACKEND_URL;
const BASE_URL = BACKEND_URL + "/api/user-accounts";

export const getAllUserAccounts = async (filter: FilterState) => {
    const params = new URLSearchParams();

    if (filter.fullname) {
        params.append("fullname", filter.fullname);
    }
    if (filter.is_active !== undefined) {
        params.append("is_active", filter.is_active.toString());
    }
    if (filter.email) {
        params.append("email", filter.email);
    }

    // const response = await axios.get(`${BASE_URL}?${params.toString()}`);
    // return response.data;
    // Assuming the response data is an array of user accounts

    // Simulate filtering logic
    const filteredUsers = sampleUserAccounts.filter((user) => {
        return (
            (!filter.fullname || user.fullname.toLowerCase().includes(filter.fullname.toLowerCase())) &&
            (filter.is_active === undefined || user.is_active === filter.is_active) &&
            (!filter.email || user.email.toLowerCase().includes(filter.email.toLowerCase()))
        );
    });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return filteredUsers;

};

export const createUserAccount = async (user: {
    fullname: string;
    email: string;
    password: string;
    is_active?: boolean;
    role: string;
    description?: string;
}) => {
    const response = await axios.post(BASE_URL, user);
    return response.data;
};

export const updateUserAccount = async (id: ID, user: Partial<{
    fullname: string;
    email: string;
    password: string;
    is_active?: boolean;
    role: string;
    description?: string;
}>) => {
    const response = await axios.put(`${BASE_URL}/${id}`, user);
    return response.data;
};

export const getUserAccountById = async (id: ID) => {
    const response = await axios.get(`/api/user-accounts/${id}`);
    return response.data;
};