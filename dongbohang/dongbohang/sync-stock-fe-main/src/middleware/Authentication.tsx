// import { useAuth } from "@/hooks/use-auth";
import { Outlet } from "react-router-dom";

export default function Authenticate() {
  // const { isAuthenticated } = useAuth();
  // return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
  return <Outlet />
}