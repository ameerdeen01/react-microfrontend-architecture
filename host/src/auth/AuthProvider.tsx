
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import {
  DEMO_USERS,
  type AuthUser,
  type AuthContextType,
} from "./AuthContext";

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = sessionStorage.getItem("mfe-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email: string, password: string) => {
    const matchedUser = DEMO_USERS.find(
      (item) => item.email === email && item.password === password
    );

    if (!matchedUser) return false;

    const { password: _password, ...safeUser } = matchedUser;

    setUser(safeUser);
    sessionStorage.setItem("mfe-user", JSON.stringify(safeUser));

    return true;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("mfe-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
