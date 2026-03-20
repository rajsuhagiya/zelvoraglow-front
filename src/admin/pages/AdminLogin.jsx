import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function AdminLogin() {
  const { adminLogin } = useAdminAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "admin@gmail.com",
    password: "admin123",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const result = adminLogin(form.email, form.password);
    setLoading(false);
    if (result.success) navigate("/admin/dashboard");
    else setError(result.error);
  };

  return (
    <div className="adm-login-page">
      <div className="adm-login-left">
        <div className="adm-login-brand">
          <span className="adm-logo-icon">✦</span>
          <span className="adm-login-brand-name">
            <span style={{ color: "#e8957a" }}>Z</span>elvora
            <span style={{ color: "#c9a96e" }}>Glow</span>
          </span>
        </div>
        <h2 className="adm-login-tagline">
          Admin
          <br />
          Command
          <br />
          Centre
        </h2>
        <p className="adm-login-sub">
          Manage your entire cosmetic empire from one powerful dashboard.
        </p>
        <div className="adm-login-stats">
          <div className="adm-ls">
            <strong>8</strong>
            <span>Products</span>
          </div>
          <div className="adm-ls">
            <strong>50K+</strong>
            <span>Customers</span>
          </div>
          <div className="adm-ls">
            <strong>4.9★</strong>
            <span>Avg Rating</span>
          </div>
        </div>
      </div>
      <div className="adm-login-right">
        <div className="adm-login-card">
          <h3>Sign in to Admin</h3>
          <p className="adm-login-hint">
            Default: admin@zelvoraglow.com / admin123
          </p>
          {error && <div className="adm-error">{error}</div>}
          <form onSubmit={handleSubmit} className="adm-form">
            <div className="adm-field">
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="adm-field">
              <label>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="adm-btn-primary"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Access Dashboard →"}
            </button>
          </form>
          <a href="/" className="adm-back-link">
            ← Back to store
          </a>
        </div>
      </div>
    </div>
  );
}
