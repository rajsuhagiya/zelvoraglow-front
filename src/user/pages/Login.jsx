import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = login(form.email, form.password);
    setLoading(false);
    if (result.success) navigate("/");
    else setError(result.error);
  };

  return (
    <main className="auth-page">
      <div className="auth-visual">
        <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700&q=80" alt="beauty" />
        <div className="auth-visual-overlay">
          <p className="brand-lg"><span className="brand-z">Z</span>elvora<span className="brand-glow">Glow</span></p>
          <p>"Your skin. Your glow. Your story."</p>
        </div>
      </div>

      <div className="auth-form-wrap">
        <div className="auth-form-card">
          <h1>Welcome back</h1>
          <p className="auth-sub">Sign in to your ZelvoraGlow account</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn-auth" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one →</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
