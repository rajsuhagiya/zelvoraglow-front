import { useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState(() =>
    JSON.parse(localStorage.getItem("zelvora_users") || "[]")
  );
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [addError, setAddError] = useState("");

  const saveUsers = (list) => {
    setUsers(list);
    localStorage.setItem("zelvora_users", JSON.stringify(list));
  };

  const handleDelete = (id) => {
    saveUsers(users.filter((u) => u.id !== id));
    setDeleteConfirm(null);
  };

  const handleAddUser = () => {
    setAddError("");
    if (!newUser.name || !newUser.email || !newUser.password) return setAddError("All fields required.");
    if (users.find((u) => u.email === newUser.email)) return setAddError("Email already exists.");
    saveUsers([...users, { ...newUser, id: Date.now() }]);
    setShowAddModal(false);
    setNewUser({ name: "", email: "", password: "" });
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <div>
          <h1>Users</h1>
          <p>Manage all registered customers.</p>
        </div>
        <button className="adm-btn-primary" onClick={() => setShowAddModal(true)}>+ Add User</button>
      </div>

      <div className="adm-stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", marginBottom: "1.5rem" }}>
        <div className="adm-stat-card">
          <div className="adm-stat-icon" style={{ background: "#e8957a20", color: "#e8957a" }}>👤</div>
          <div className="adm-stat-value">{users.length}</div>
          <div className="adm-stat-label">Total Users</div>
        </div>
        <div className="adm-stat-card">
          <div className="adm-stat-icon" style={{ background: "#7ec8c820", color: "#7ec8c8" }}>✅</div>
          <div className="adm-stat-value">{users.length}</div>
          <div className="adm-stat-label">Active Users</div>
        </div>
        <div className="adm-stat-card">
          <div className="adm-stat-icon" style={{ background: "#c9a96e20", color: "#c9a96e" }}>🆕</div>
          <div className="adm-stat-value">{users.slice(-3).length}</div>
          <div className="adm-stat-label">New This Week</div>
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-table-toolbar">
          <input className="adm-search" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <span className="adm-count">{filtered.length} users</span>
        </div>

        {filtered.length === 0 ? (
          <div className="adm-empty">
            <p>No users registered yet.</p>
            <p className="adm-empty-hint">Users appear here when they register on the storefront.</p>
          </div>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div className="adm-user-cell">
                        <div className="adm-user-avatar">{u.name[0]}</div>
                        <span>{u.name}</span>
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td><span className="adm-muted">#{u.id}</span></td>
                    <td><span className="adm-status active">Active</span></td>
                    <td>
                      <div className="adm-row-actions">
                        <button className="adm-btn-edit" onClick={() => setViewUser(u)}>View</button>
                        <button className="adm-btn-delete" onClick={() => setDeleteConfirm(u.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD USER MODAL */}
      {showAddModal && (
        <div className="adm-modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowAddModal(false)}>
          <div className="adm-modal" style={{ maxWidth: "440px" }}>
            <div className="adm-modal-header">
              <h3>Add New User</h3>
              <button onClick={() => setShowAddModal(false)} className="adm-modal-close">✕</button>
            </div>
            <div className="adm-modal-body">
              {addError && <div className="adm-error">{addError}</div>}
              <div className="adm-field"><label>Full Name</label><input value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} placeholder="Jane Doe" /></div>
              <div className="adm-field"><label>Email</label><input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} placeholder="jane@example.com" /></div>
              <div className="adm-field"><label>Password</label><input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} placeholder="••••••" /></div>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn-ghost" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="adm-btn-primary" onClick={handleAddUser}>Add User</button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW USER MODAL */}
      {viewUser && (
        <div className="adm-modal-overlay" onClick={(e) => e.target === e.currentTarget && setViewUser(null)}>
          <div className="adm-modal" style={{ maxWidth: "400px" }}>
            <div className="adm-modal-header">
              <h3>User Details</h3>
              <button onClick={() => setViewUser(null)} className="adm-modal-close">✕</button>
            </div>
            <div className="adm-modal-body">
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div className="adm-user-avatar lg">{viewUser.name[0]}</div>
                <h3 style={{ marginTop: "12px" }}>{viewUser.name}</h3>
                <span className="adm-status active">Active Customer</span>
              </div>
              <div className="adm-detail-row"><span>Email</span><strong>{viewUser.email}</strong></div>
              <div className="adm-detail-row"><span>User ID</span><strong>#{viewUser.id}</strong></div>
              <div className="adm-detail-row"><span>Role</span><strong>Customer</strong></div>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn-ghost" onClick={() => setViewUser(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirm && (
        <div className="adm-modal-overlay">
          <div className="adm-confirm-modal">
            <h3>Delete User?</h3>
            <p>This will permanently remove the user account.</p>
            <div className="adm-modal-footer">
              <button className="adm-btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="adm-btn-danger" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
