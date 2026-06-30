import { NavLink } from "react-router-dom";

const TABS = [
  { label: "Overview", path: "" },
  { label: "Parts & BOM", path: "/parts" },
  { label: "CFT", path: "/feasibility" },
  { label: "SCM", path: "/rm-os" },
  { label: "Cost Sheet", path: "/cost-sheet" },
  { label: "Approval", path: "/approval" },
  { label: "Revision Log", path: "/revision-log" },
];

export function WorkspaceTabs({ id }: { id: string }) {
  return (
    <div className="mt-3 flex gap-1 overflow-x-auto border-b text-sm" style={{ borderColor: "var(--border)" }}>
      {TABS.map((t) => (
        <NavLink
          key={t.label}
          to={`/enquiries/${id}${t.path}`}
          end={t.path === ""}
          className="whitespace-nowrap px-3 py-2 font-medium"
          style={({ isActive }) =>
            isActive
              ? { color: "var(--accent-foreground)", borderBottom: "2px solid var(--accent-foreground)" }
              : { color: "var(--muted-foreground)" }
          }
        >
          {t.label}
        </NavLink>
      ))}
    </div>
  );
}
