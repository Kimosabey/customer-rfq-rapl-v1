import { createContext, useContext, useState, type ReactNode } from "react";
import { api } from "./api";
import { USE_MOCK, findMockUser } from "./data";

export type Role = "BD" | "Engineering" | "CFT" | "SCM" | "Estimation" | "CEO_COO" | "Admin";
export const ROLE_LABEL: Record<Role, string> = {
  BD: "Business Development",
  Engineering: "Engineering",
  CFT: "CFT",
  SCM: "SCM",
  Estimation: "Estimation",
  CEO_COO: "CEO / COO",
  Admin: "Admin",
};

export interface User {
  name: string;
  email: string;
  role: Role;
}

interface AuthState {
  user: User | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  setRole: (r: Role) => void;
}

const AuthCtx = createContext<AuthState>({} as AuthState);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const s = localStorage.getItem("user");
    return s ? (JSON.parse(s) as User) : null;
  });
  const persist = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem("user", JSON.stringify(u));
    else localStorage.removeItem("user");
  };
  const login = async (email: string) => {
    const derive = () =>
      email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Demo User";
    if (USE_MOCK) {
      const u = findMockUser(email);
      persist(u ?? { name: derive(), email, role: "BD" });
      return;
    }
    try {
      const { user } = await api<{ token: string; user: User }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      persist(user); // seeded email → real name + role
    } catch {
      persist({ name: derive(), email, role: "BD" }); // demo fallback
    }
  };
  const logout = () => persist(null);
  const setRole = (role: Role) => {
    if (user) persist({ ...user, role });
  };
  return <AuthCtx.Provider value={{ user, login, logout, setRole }}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
