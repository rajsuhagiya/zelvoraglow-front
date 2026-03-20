import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext();

// Seed default admin on first load
const seedAdmin = () => {
  const admins = JSON.parse(localStorage.getItem("zelvora_admins") || "[]");
  if (admins.length === 0) {
    localStorage.setItem("zelvora_admins", JSON.stringify([
      { id: 1, name: "Super Admin", email: "admin@zelvoraglow.com", password: "admin123", role: "superadmin" }
    ]));
  }
};
seedAdmin();

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem("zelvora_admin_session");
    return saved ? JSON.parse(saved) : null;
  });

  const adminLogin = (email, password) => {
    const admins = JSON.parse(localStorage.getItem("zelvora_admins") || "[]");
    const found = admins.find((a) => a.email === email && a.password === password);
    if (found) {
      const { password: _, ...safe } = found;
      setAdmin(safe);
      localStorage.setItem("zelvora_admin_session", JSON.stringify(safe));
      return { success: true };
    }
    return { success: false, error: "Invalid admin credentials." };
  };

  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem("zelvora_admin_session");
  };

  return (
    <AdminAuthContext.Provider value={{ admin, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
