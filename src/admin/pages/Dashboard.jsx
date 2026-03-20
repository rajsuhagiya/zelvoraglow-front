import { products } from "../../shared/data/products";

export default function Dashboard() {
  const users = JSON.parse(localStorage.getItem("zelvora_users") || "[]");
  const orders = JSON.parse(localStorage.getItem("zelvora_orders") || "[]");
  const revenue = orders.reduce((s, o) => s + (o.total || 0), 0);

  const stats = [
    { label: "Total Revenue", value: `$${revenue.toFixed(2)}`, icon: "💰", trend: "+12.5%", color: "#e8957a" },
    { label: "Total Products", value: products.length, icon: "✨", trend: "+2 new", color: "#c9a96e" },
    { label: "Registered Users", value: users.length, icon: "👤", trend: "+8 this week", color: "#7ec8c8" },
    { label: "Total Orders", value: orders.length, icon: "📦", trend: "+5 today", color: "#b39ddb" },
  ];

  const recentUsers = users.slice(-5).reverse();

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening with ZelvoraGlow.</p>
        </div>
        <span className="adm-badge">Live</span>
      </div>

      {/* STATS */}
      <div className="adm-stats-grid">
        {stats.map((s) => (
          <div key={s.label} className="adm-stat-card">
            <div className="adm-stat-top">
              <span className="adm-stat-icon" style={{ background: s.color + "20", color: s.color }}>{s.icon}</span>
              <span className="adm-trend">{s.trend}</span>
            </div>
            <div className="adm-stat-value">{s.value}</div>
            <div className="adm-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="adm-two-col">
        {/* TOP PRODUCTS */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>Top Products</h3>
            <a href="/admin/products" className="adm-card-link">Manage →</a>
          </div>
          <div className="adm-product-list">
            {products.slice(0, 5).map((p) => (
              <div key={p.id} className="adm-product-row">
                <img src={p.image} alt={p.name} className="adm-product-thumb" />
                <div className="adm-product-row-info">
                  <strong>{p.name}</strong>
                  <span>{p.category}</span>
                </div>
                <div className="adm-product-row-right">
                  <span className="adm-price-tag">${p.price}</span>
                  <span className="adm-rating-tag">⭐ {p.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT USERS */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>Recent Users</h3>
            <a href="/admin/users" className="adm-card-link">Manage →</a>
          </div>
          {recentUsers.length === 0 ? (
            <div className="adm-empty">No users registered yet.</div>
          ) : (
            <div className="adm-user-list">
              {recentUsers.map((u) => (
                <div key={u.id} className="adm-user-row">
                  <div className="adm-user-avatar">{u.name[0]}</div>
                  <div>
                    <strong>{u.name}</strong>
                    <span>{u.email}</span>
                  </div>
                  <span className="adm-user-badge">Customer</span>
                </div>
              ))}
            </div>
          )}
          {recentUsers.length === 0 && (
            <p className="adm-empty-hint">Users who register on the storefront appear here.</p>
          )}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="adm-card" style={{ marginTop: "1.5rem" }}>
        <div className="adm-card-header"><h3>Quick Actions</h3></div>
        <div className="adm-quick-actions">
          {[
            { label: "Add Product", href: "/admin/products", icon: "+" },
            { label: "View Orders", href: "/admin/orders", icon: "📦" },
            { label: "Manage Users", href: "/admin/users", icon: "👥" },
            { label: "Site Settings", href: "/admin/settings", icon: "⚙" },
            { label: "Manage Routes", href: "/admin/routes", icon: "🗺" },
          ].map((a) => (
            <a key={a.label} href={a.href} className="adm-quick-btn">
              <span>{a.icon}</span>
              {a.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
