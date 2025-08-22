import { UserAccountPageProvider } from "@/app/users/components/UserAccountProvider";
import Authenticate from "@/middleware/Authentication";
import { lazy } from "react";
import { useRoutes } from "react-router-dom";

// Layouts
const AuthLayout = lazy(() => import("@/app/layouts/AuthLayout"));
const MainLayout = lazy(() => import("@/app/layouts/MainLayout"));

// Pages
const Login = lazy(() => import("@/app/auth/Login"));
const DashboardPage = lazy(() => import("@/app/dashboard/Dashboard"));
const SyncStockPage = lazy(() => import("@/app/sync-stock/SyncStock"));
const ActivityLogPage = lazy(() => import("@/app/activity-log/ActivityLog"));
const UsersPage = lazy(() => import("@/app/users/Users"));
const AccountConfig = lazy(() => import("@/app/account-config/AccountConfig"));
const NotFoundPage = lazy(() => import("@/app/errors/not-found"));

// Define routes
const publicRoutes = [
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <Login /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
];

const privateRoutes = [
    {
        path: "/",
        element: <Authenticate />,
        children: [
            {
                path: "/",
                element: <MainLayout />,
                children: [
                    {
                        path: "dashboard",
                        element: <DashboardPage />,
                    },
                    {
                        path: "stock-sync",
                        element: <SyncStockPage />,
                    },
                    {
                        path: "activity-log",
                        element: <ActivityLogPage />,
                    },
                    {
                        path: "user-accounts",
                        element: (<UserAccountPageProvider>
                            <UsersPage />
                        </UserAccountPageProvider>),
                    },
                    {
                        path: "account-configs",
                        element: <AccountConfig />,
                    },
                    {
                        path: "account-configs/redirect",
                        element: "Here will be the redirect page after Etsy OAuth",
                    },

                    { path: "*", element: <NotFoundPage /> },
                ],
            },
        ]
    }
];

export default function AppRouter() {
    const routes = useRoutes([
        ...publicRoutes,
        ...privateRoutes
    ]);
    return routes;
}