import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import "./index.css";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
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
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
