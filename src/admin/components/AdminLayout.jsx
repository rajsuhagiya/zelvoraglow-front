import { useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const NAV_ITEMS = [
  { path: "/admin/dashboard", icon: "◈", label: "Dashboard" },
  { path: "/admin/products",  icon: "◉", label: "Products"  },
  { path: "/admin/orders",    icon: "◎", label: "Orders"    },
  { path: "/admin/users",     icon: "◍", label: "Users"     },
  { path: "/admin/routes",    icon: "◐", label: "Routes"    },
  { path: "/admin/settings",  icon: "◑", label: "Settings"  },
];

export default function AdminLayout() {
  const { admin, adminLogout } = useAdminAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  return (
    <div className={`adm-shell ${collapsed ? "collapsed" : ""}`}>

      {/* SIDEBAR */}
      <aside className="adm-sidebar">
        <div className="adm-logo">
          <span className="adm-logo-icon">✦</span>
          {!collapsed && (
            <span className="adm-logo-text">
              <span style={{ color: "#e8957a" }}>Z</span>elvora
              <span style={{ color: "#c9a96e" }}>Glow</span>
            </span>
          )}
        </div>

        {!collapsed && <p className="adm-sidebar-label">NAVIGATION</p>}

        <nav className="adm-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `adm-nav-item ${isActive ? "active" : ""}`}
              title={item.label}
            >
              <span className="adm-nav-icon">{item.icon}</span>
              {!collapsed && <span className="adm-nav-label">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="adm-sidebar-footer">
          {!collapsed && (
            <div className="adm-admin-info">
              <div className="adm-avatar">{admin?.name?.[0]}</div>
              <div>
                <p className="adm-admin-name">{admin?.name}</p>
                <p className="adm-admin-role">{admin?.role}</p>
              </div>
            </div>
          )}
          <button className="adm-logout-btn" onClick={handleLogout} title="Logout">
            ⎋
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="adm-main">
        <header className="adm-topbar">
          <button className="adm-collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "▶" : "◀"}
          </button>
          <div className="adm-topbar-right">
            <a href="/" target="_blank" rel="noreferrer" className="adm-view-site">
              ↗ View Store
            </a>
            <div className="adm-topbar-avatar">{admin?.name?.[0]}</div>
          </div>
        </header>

        <div className="adm-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
