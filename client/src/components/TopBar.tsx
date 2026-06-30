import { useState } from "react";
import { PanelLeft, Search, Bell, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "../lib/theme";
import { useAuth, ROLE_LABEL, type Role } from "../lib/auth";

const ROLES: Role[] = ["BD", "Engineering", "CFT", "SCM", "Estimation", "CEO_COO", "Admin"];

export function TopBar({ onToggleSidebar, title }: { onToggleSidebar: () => void; title: string }) {
  const { theme, toggle } = useTheme();
  const { user, setRole, logout } = useAuth();
  const [menu, setMenu] = useState(false);

  return (
    <header
      className="flex h-14 shrink-0 items-center gap-3 border-b px-4"
      style={{ borderColor: "var(--border)", background: "var(--background)" }}
    >
      <button onClick={onToggleSidebar} aria-label="Toggle sidebar" className="rounded-md p-1.5 hover:bg-[var(--muted)]">
        <PanelLeft size={18} />
      </button>
      <span className="text-sm font-semibold">{title}</span>

      <div
        className="ml-2 hidden h-8 max-w-xs flex-1 items-center gap-2 rounded-lg border px-3 text-xs sm:flex"
        style={{ borderColor: "var(--input)", color: "var(--muted-foreground)" }}
      >
        <Search size={14} />
        <span>Search RFQ / customer / part…</span>
        <kbd className="ml-auto rounded px-1 text-[10px]" style={{ background: "var(--muted)" }}>⌘K</kbd>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <button className="relative rounded-md p-2 hover:bg-[var(--muted)]" aria-label="Notifications">
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full" style={{ background: "#EC1D23" }} />
        </button>
        <button onClick={toggle} className="rounded-md p-2 hover:bg-[var(--muted)]" aria-label="Toggle theme">
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <div className="relative">
          <button
            onClick={() => setMenu((m) => !m)}
            className="flex items-center gap-2 rounded-md py-1 pl-1 pr-2 hover:bg-[var(--muted)]"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full text-xs font-bold text-white" style={{ background: "#EC1D23" }}>
              {(user?.name ?? "H").charAt(0)}
            </span>
            <ChevronDown size={14} />
          </button>
          {menu && (
            <div
              className="absolute right-0 z-50 mt-1 w-56 overflow-hidden rounded-lg border py-1 text-sm"
              style={{ background: "var(--card)", borderColor: "var(--border)", boxShadow: "var(--shadow-2)" }}
            >
              <div className="px-3 py-2 text-xs" style={{ color: "var(--muted-foreground)" }}>
                Switch role (demo)
              </div>
              {ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => { setRole(r); setMenu(false); }}
                  className="flex w-full items-center justify-between px-3 py-1.5 text-left hover:bg-[var(--muted)]"
                  style={user?.role === r ? { color: "var(--accent-foreground)", fontWeight: 600 } : undefined}
                >
                  {ROLE_LABEL[r]}
                  {user?.role === r && <span>✓</span>}
                </button>
              ))}
              <div className="my-1 border-t" style={{ borderColor: "var(--border)" }} />
              <button onClick={logout} className="w-full px-3 py-1.5 text-left hover:bg-[var(--muted)]" style={{ color: "var(--destructive)" }}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
