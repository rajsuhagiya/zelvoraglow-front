import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

// Used as a layout route — renders <Outlet /> if logged in, redirects if not
export default function AdminRoute() {
  const { admin } = useAdminAuth();
  return admin ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
