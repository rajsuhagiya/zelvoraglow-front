import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("zelvora_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("zelvora_users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...safeUser } = found;
      setUser(safeUser);
      localStorage.setItem("zelvora_user", JSON.stringify(safeUser));
      return { success: true };
    }
    return { success: false, error: "Invalid email or password." };
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("zelvora_users") || "[]");
    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email already registered." };
    }
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem("zelvora_users", JSON.stringify(users));
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem("zelvora_user", JSON.stringify(safeUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("zelvora_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
