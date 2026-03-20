import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

// ── User ──
import { AuthProvider } from "./user/context/AuthContext";
import { CartProvider } from "./user/context/CartContext";
import Navbar from "./user/components/Navbar";
import ProtectedRoute from "./user/components/ProtectedRoute";
import Home from "./user/pages/Home";
import Shop from "./user/pages/Shop";
import ProductDetail from "./user/pages/ProductDetail";
import Cart from "./user/pages/Cart";
import Login from "./user/pages/Login";
import Register from "./user/pages/Register";
import Checkout from "./user/pages/Checkout";
import Profile from "./user/pages/Profile";

// ── Admin ──
import { AdminAuthProvider } from "./admin/context/AdminAuthContext";
import AdminRoute from "./admin/components/AdminRoute";
import AdminLayout from "./admin/components/AdminLayout";
import AdminLogin from "./admin/pages/AdminLogin";
import Dashboard from "./admin/pages/Dashboard";
import AdminProducts from "./admin/pages/Products";
import AdminOrders from "./admin/pages/Orders";
import AdminUsers from "./admin/pages/Users";
import AdminSettings from "./admin/pages/Settings";
import AdminRoutesPage from "./admin/pages/RouteManager";

import "./index.css";
import "./admin/admin.css";

// Adds Navbar above every user page
function UserLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* ══════════════════════════════════════
                  ADMIN  →  /admin/...
                  Declared FIRST — matched before user.
              ══════════════════════════════════════ */}

              {/* Public: admin login page */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Guard layer → if not logged in, redirect to /admin/login */}
              <Route element={<AdminRoute />}>
                {/* Sidebar + topbar shell */}
                <Route element={<AdminLayout />}>
                  <Route
                    path="/admin"
                    element={<Navigate to="/admin/dashboard" replace />}
                  />
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/products" element={<AdminProducts />} />
                  <Route path="/admin/orders" element={<AdminOrders />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route path="/admin/settings" element={<AdminSettings />} />
                  <Route path="/admin/routes" element={<AdminRoutesPage />} />
                </Route>
              </Route>

              {/* ══════════════════════════════════════
                  USER STOREFRONT  →  /...
                  Navbar added via UserLayout wrapper.
              ══════════════════════════════════════ */}

              <Route element={<UserLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </AdminAuthProvider>
  );
}
