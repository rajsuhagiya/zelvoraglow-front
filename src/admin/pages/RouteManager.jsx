import { useState } from "react";

const DEFAULT_ROUTES = [
  { id: 1, path: "/",          label: "Home",        visible: true,  inNav: true,  protected: false, icon: "🏠" },
  { id: 2, path: "/shop",      label: "Shop",        visible: true,  inNav: true,  protected: false, icon: "🛍" },
  { id: 3, path: "/cart",      label: "Cart",        visible: true,  inNav: false, protected: false, icon: "🛒" },
  { id: 4, path: "/login",     label: "Login",       visible: true,  inNav: false, protected: false, icon: "🔑" },
  { id: 5, path: "/register",  label: "Register",    visible: true,  inNav: false, protected: false, icon: "📝" },
  { id: 6, path: "/checkout",  label: "Checkout",    visible: true,  inNav: false, protected: true,  icon: "💳" },
  { id: 7, path: "/profile",   label: "My Profile",  visible: true,  inNav: false, protected: true,  icon: "👤" },
  { id: 8, path: "/product/:id", label: "Product Detail", visible: true, inNav: false, protected: false, icon: "✨" },
];

const ADMIN_ROUTES = [
  { id: 101, path: "/admin/dashboard", label: "Dashboard", icon: "◈" },
  { id: 102, path: "/admin/products",  label: "Products",  icon: "◉" },
  { id: 103, path: "/admin/orders",    label: "Orders",    icon: "◎" },
  { id: 104, path: "/admin/users",     label: "Users",     icon: "◍" },
  { id: 105, path: "/admin/routes",    label: "Routes",    icon: "◐" },
  { id: 106, path: "/admin/settings",  label: "Settings",  icon: "◑" },
];

const EMPTY_ROUTE = { id: null, path: "", label: "", visible: true, inNav: false, protected: false, icon: "🔗" };

export default function AdminRoutesPage() {
  const [routes, setRoutes] = useState(() => {
    const saved = localStorage.getItem("zelvora_routes");
    return saved ? JSON.parse(saved) : DEFAULT_ROUTES;
  });
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_ROUTE);
  const [isEdit, setIsEdit] = useState(false);
  const [activeTab, setActiveTab] = useState("user");

  const saveRoutes = (list) => {
    setRoutes(list);
    localStorage.setItem("zelvora_routes", JSON.stringify(list));
  };

  const toggleField = (id, field) => {
    saveRoutes(routes.map((r) => r.id === id ? { ...r, [field]: !r[field] } : r));
  };

  const openAdd = () => {
    setForm({ ...EMPTY_ROUTE, id: Date.now() });
    setIsEdit(false);
    setShowModal(true);
  };

  const openEdit = (r) => {
    setForm(r);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.path || !form.label) return;
    if (isEdit) {
      saveRoutes(routes.map((r) => r.id === form.id ? form : r));
    } else {
      saveRoutes([...routes, form]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    saveRoutes(routes.filter((r) => r.id !== id));
  };

  const handleReset = () => {
    saveRoutes(DEFAULT_ROUTES);
  };

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <div>
          <h1>Route Manager</h1>
          <p>Control which pages exist, their visibility, and nav placement.</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="adm-btn-ghost" onClick={handleReset}>Reset Defaults</button>
          <button className="adm-btn-primary" onClick={openAdd}>+ Add Route</button>
        </div>
      </div>

      {/* TAB SWITCHER */}
      <div className="adm-tab-row">
        <button className={`adm-tab-btn ${activeTab === "user" ? "active" : ""}`} onClick={() => setActiveTab("user")}>
          🛍 User Routes ({routes.length})
        </button>
        <button className={`adm-tab-btn ${activeTab === "admin" ? "active" : ""}`} onClick={() => setActiveTab("admin")}>
          🔒 Admin Routes ({ADMIN_ROUTES.length})
        </button>
      </div>

      {activeTab === "user" && (
        <div className="adm-card">
          <p className="adm-card-desc">These are the storefront routes available to customers. Toggle visibility, nav inclusion, and auth protection.</p>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Icon</th>
                  <th>Label</th>
                  <th>Path</th>
                  <th>Visible</th>
                  <th>In Navbar</th>
                  <th>Protected</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((r) => (
                  <tr key={r.id}>
                    <td style={{ fontSize: "18px" }}>{r.icon}</td>
                    <td><strong>{r.label}</strong></td>
                    <td><code className="adm-code">{r.path}</code></td>
                    <td>
                      <label className="adm-toggle sm">
                        <input type="checkbox" checked={r.visible} onChange={() => toggleField(r.id, "visible")} />
                        <span className="adm-toggle-slider"></span>
                      </label>
                    </td>
                    <td>
                      <label className="adm-toggle sm">
                        <input type="checkbox" checked={r.inNav} onChange={() => toggleField(r.id, "inNav")} />
                        <span className="adm-toggle-slider"></span>
                      </label>
                    </td>
                    <td>
                      {r.protected
                        ? <span className="adm-status-badge" style={{ background: "#e8957a20", color: "#e8957a" }}>Auth Required</span>
                        : <span className="adm-status active">Public</span>
                      }
                    </td>
                    <td>
                      <div className="adm-row-actions">
                        <button className="adm-btn-edit" onClick={() => openEdit(r)}>Edit</button>
                        <button className="adm-btn-delete" onClick={() => handleDelete(r.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "admin" && (
        <div className="adm-card">
          <p className="adm-card-desc">Admin-only routes are always protected and cannot be toggled. They are managed internally.</p>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Icon</th>
                  <th>Label</th>
                  <th>Path</th>
                  <th>Protection</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {ADMIN_ROUTES.map((r) => (
                  <tr key={r.id}>
                    <td style={{ fontSize: "16px" }}>{r.icon}</td>
                    <td><strong>{r.label}</strong></td>
                    <td><code className="adm-code">{r.path}</code></td>
                    <td><span className="adm-status-badge" style={{ background: "#b39ddb20", color: "#7c4dff" }}>Admin Only</span></td>
                    <td><span className="adm-status active">Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ROUTE MODAL */}
      {showModal && (
        <div className="adm-modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="adm-modal" style={{ maxWidth: "480px" }}>
            <div className="adm-modal-header">
              <h3>{isEdit ? "Edit Route" : "Add New Route"}</h3>
              <button onClick={() => setShowModal(false)} className="adm-modal-close">✕</button>
            </div>
            <div className="adm-modal-body">
              <div className="adm-form-grid">
                <div className="adm-field">
                  <label>Label *</label>
                  <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="e.g. About Us" />
                </div>
                <div className="adm-field">
                  <label>Path *</label>
                  <input value={form.path} onChange={(e) => setForm({ ...form, path: e.target.value })} placeholder="/about" />
                </div>
                <div className="adm-field">
                  <label>Icon (emoji)</label>
                  <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="🔗" />
                </div>
                <div className="adm-field">
                  <label>Toggles</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "6px" }}>
                    {[
                      { key: "visible", label: "Visible" },
                      { key: "inNav",   label: "Show in Navbar" },
                      { key: "protected", label: "Auth Protected" },
                    ].map((t) => (
                      <div key={t.key} className="adm-toggle-row">
                        <label className="adm-toggle sm">
                          <input type="checkbox" checked={form[t.key]} onChange={(e) => setForm({ ...form, [t.key]: e.target.checked })} />
                          <span className="adm-toggle-slider"></span>
                        </label>
                        <span>{t.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="adm-btn-primary" onClick={handleSave}>
                {isEdit ? "Save Changes" : "Add Route"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
