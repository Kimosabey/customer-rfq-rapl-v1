import { NavLink } from "react-router-dom";
import { LayoutGrid, ClipboardList, AlertTriangle, Users, Settings, Plus, type LucideIcon } from "lucide-react";
import { useAuth, ROLE_LABEL, type Role } from "../lib/auth";

interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  roles: Role[] | "all";
  group: "WORKSPACE" | "ADMIN";
  badge?: string;
  badgeRed?: boolean;
}

const NAV: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutGrid, roles: ["BD", "CEO_COO", "Admin"], group: "WORKSPACE" },
  { label: "Enquiries", to: "/enquiries", icon: ClipboardList, roles: "all", group: "WORKSPACE", badge: "42" },
  { label: "Needs attention", to: "/needs-attention", icon: AlertTriangle, roles: "all", group: "WORKSPACE", badge: "3", badgeRed: true },
  { label: "Users", to: "/admin/users", icon: Users, roles: ["Admin"], group: "ADMIN" },
  { label: "Settings", to: "/admin/settings", icon: Settings, roles: ["Admin"], group: "ADMIN" },
];

const canSee = (item: NavItem, role: Role) => item.roles === "all" || item.roles.includes(role);

export function Sidebar({ collapsed }: { collapsed: boolean }) {
  const { user } = useAuth();
  const role = user?.role ?? "BD";
  const canCreate = role === "BD" || role === "Admin";
  const groups: ("WORKSPACE" | "ADMIN")[] = ["WORKSPACE", "ADMIN"];

  return (
    <aside
      className="flex h-full flex-col gap-1 px-3 py-3.5 text-white transition-[width] duration-200 ease-out"
      style={{ width: collapsed ? 64 : 212, background: "var(--grad-brand)" }}
    >
      {/* brand */}
      <div className="flex items-center gap-2.5 px-1.5 pb-3 pt-1">
        <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-md bg-white">
          <img src="/rangsons-logo-mark.png" alt="Rangsons" className="h-full w-full object-contain p-0.5" />
        </span>
        {!collapsed && (
          <span className="truncate">
            <span className="block text-sm font-bold leading-tight">Rangsons RFQ</span>
            <span className="block text-[10px] leading-tight text-white/55">Customer RFQ Platform</span>
          </span>
        )}
      </div>

      {/* CTA */}
      {canCreate && (
        <NavLink
          to="/enquiries/new"
          className="mb-1 flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/15 px-2.5 py-2 text-sm font-semibold hover:bg-white/25"
          title="New Enquiry"
        >
          <Plus size={16} />
          {!collapsed && "New Enquiry"}
        </NavLink>
      )}

      {groups.map((g) => {
        const items = NAV.filter((i) => i.group === g && canSee(i, role));
        if (!items.length) return null;
        return (
          <div key={g}>
            {!collapsed && (
              <div className="px-2 pb-1 pt-3 text-[10px] font-bold tracking-wider text-white/55">{g}</div>
            )}
            {items.map((i) => (
              <NavLink
                key={i.to}
                to={i.to}
                title={collapsed ? i.label : undefined}
                className="group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-[#cfd1f5] hover:bg-white/10 hover:text-white"
                style={({ isActive }) =>
                  isActive ? { background: "rgba(255,255,255,.16)", color: "#fff", fontWeight: 600 } : undefined
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span
                        className="absolute -left-3 top-1.5 bottom-1.5 w-[3px] rounded-r"
                        style={{ background: "#fff", boxShadow: "0 0 12px rgba(255,255,255,.7)" }}
                      />
                    )}
                    <i.icon size={16} className="shrink-0" />
                    {!collapsed && <span className="flex-1 truncate">{i.label}</span>}
                    {!collapsed && i.badge && (
                      <span
                        className="rounded-full px-1.5 text-[11px] font-bold"
                        style={i.badgeRed ? { background: "#EC1D23", color: "#fff" } : { background: "rgba(255,255,255,.18)" }}
                      >
                        {i.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        );
      })}

      {/* user card */}
      <div className="mt-auto flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/10 px-2.5 py-2">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white" style={{ background: "#EC1D23" }}>
          {(user?.name ?? "H").charAt(0)}
        </span>
        {!collapsed && (
          <span className="truncate text-xs">
            <span className="block font-semibold text-white">{user?.name ?? "Harshan Aiyappa"}</span>
            <span className="block text-[11px] text-white/60">{ROLE_LABEL[role]}</span>
          </span>
        )}
      </div>
    </aside>
  );
}
