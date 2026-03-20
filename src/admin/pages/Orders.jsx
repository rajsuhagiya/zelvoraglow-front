import { useState } from "react";

const STATUS_COLORS = {
  pending: "#f59e0b",
  processing: "#3b82f6",
  shipped: "#8b5cf6",
  delivered: "#10b981",
  cancelled: "#ef4444",
};

const seedOrders = () => {
  const existing = localStorage.getItem("zelvora_orders");
  if (existing) return JSON.parse(existing);
  const demo = [
    { id: "ORD-1001", customer: "Ayesha M.", email: "ayesha@example.com", total: 130, items: 2, status: "delivered", date: "2025-03-10" },
    { id: "ORD-1002", customer: "Sophie L.", email: "sophie@example.com", total: 72,  items: 1, status: "shipped",   date: "2025-03-14" },
    { id: "ORD-1003", customer: "Priya K.",  email: "priya@example.com",  total: 58,  items: 1, status: "processing",date: "2025-03-17" },
    { id: "ORD-1004", customer: "Mia W.",    email: "mia@example.com",    total: 94,  items: 3, status: "pending",   date: "2025-03-19" },
    { id: "ORD-1005", customer: "Luna R.",   email: "luna@example.com",   total: 45,  items: 1, status: "cancelled", date: "2025-03-20" },
  ];
  localStorage.setItem("zelvora_orders", JSON.stringify(demo));
  return demo;
};

const STATUSES = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState(seedOrders);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [viewOrder, setViewOrder] = useState(null);

  const saveOrders = (list) => {
    setOrders(list);
    localStorage.setItem("zelvora_orders", JSON.stringify(list));
  };

  const updateStatus = (id, status) => {
    saveOrders(orders.map((o) => o.id === id ? { ...o, status } : o));
    if (viewOrder?.id === id) setViewOrder((v) => ({ ...v, status }));
  };

  const filtered = orders.filter((o) => {
    const matchFilter = filter === "all" || o.status === filter;
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const revenue = orders.filter(o => o.status === "delivered").reduce((s, o) => s + o.total, 0);

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <div>
          <h1>Orders</h1>
          <p>Track and manage all customer orders.</p>
        </div>
      </div>

      <div className="adm-stats-grid" style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: "1.5rem" }}>
        {[
          { label: "Total Orders",   value: orders.length,                                        color: "#e8957a", icon: "📦" },
          { label: "Revenue",        value: `$${revenue.toFixed(2)}`,                             color: "#10b981", icon: "💰" },
          { label: "Pending",        value: orders.filter(o=>o.status==="pending").length,        color: "#f59e0b", icon: "⏳" },
          { label: "Delivered",      value: orders.filter(o=>o.status==="delivered").length,      color: "#3b82f6", icon: "✅" },
        ].map((s) => (
          <div key={s.label} className="adm-stat-card">
            <div className="adm-stat-icon" style={{ background: s.color + "20", color: s.color }}>{s.icon}</div>
            <div className="adm-stat-value">{s.value}</div>
            <div className="adm-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="adm-card">
        <div className="adm-table-toolbar">
          <input className="adm-search" placeholder="Search by order ID or customer..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="adm-filter-pills">
            {STATUSES.map((s) => (
              <button key={s} className={`adm-filter-pill ${filter === s ? "active" : ""}`} onClick={() => setFilter(s)}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id}>
                  <td><strong>{o.id}</strong></td>
                  <td>
                    <div className="adm-user-cell">
                      <div className="adm-user-avatar sm">{o.customer[0]}</div>
                      <div>
                        <div>{o.customer}</div>
                        <div className="adm-muted" style={{ fontSize: "11px" }}>{o.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{o.date}</td>
                  <td>{o.items} item{o.items > 1 ? "s" : ""}</td>
                  <td><strong>${o.total.toFixed(2)}</strong></td>
                  <td>
                    <span className="adm-status-badge" style={{ background: STATUS_COLORS[o.status] + "20", color: STATUS_COLORS[o.status] }}>
                      {o.status}
                    </span>
                  </td>
                  <td>
                    <div className="adm-row-actions">
                      <button className="adm-btn-edit" onClick={() => setViewOrder(o)}>View</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="adm-empty">No orders match your filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ORDER DETAIL MODAL */}
      {viewOrder && (
        <div className="adm-modal-overlay" onClick={(e) => e.target === e.currentTarget && setViewOrder(null)}>
          <div className="adm-modal" style={{ maxWidth: "500px" }}>
            <div className="adm-modal-header">
              <h3>Order {viewOrder.id}</h3>
              <button onClick={() => setViewOrder(null)} className="adm-modal-close">✕</button>
            </div>
            <div className="adm-modal-body">
              <div className="adm-detail-row"><span>Customer</span><strong>{viewOrder.customer}</strong></div>
              <div className="adm-detail-row"><span>Email</span><strong>{viewOrder.email}</strong></div>
              <div className="adm-detail-row"><span>Date</span><strong>{viewOrder.date}</strong></div>
              <div className="adm-detail-row"><span>Items</span><strong>{viewOrder.items}</strong></div>
              <div className="adm-detail-row"><span>Total</span><strong>${viewOrder.total.toFixed(2)}</strong></div>
              <div className="adm-detail-row">
                <span>Status</span>
                <span className="adm-status-badge" style={{ background: STATUS_COLORS[viewOrder.status] + "20", color: STATUS_COLORS[viewOrder.status] }}>
                  {viewOrder.status}
                </span>
              </div>

              <div className="adm-field" style={{ marginTop: "1.5rem" }}>
                <label>Update Status</label>
                <select value={viewOrder.status} onChange={(e) => updateStatus(viewOrder.id, e.target.value)}>
                  {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn-ghost" onClick={() => setViewOrder(null)}>Close</button>
              <button className="adm-btn-primary" onClick={() => setViewOrder(null)}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
