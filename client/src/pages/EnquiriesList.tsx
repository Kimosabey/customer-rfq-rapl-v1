import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Search, Plus, Inbox } from "lucide-react";
import { api, type Enquiry } from "../lib/api";
import { StatusBadge, Skeleton, EmptyState, Button } from "../components/ui";
import { useAuth } from "../lib/auth";

const FILTERS = ["All", "In Engineering Review", "In SCM Sourcing", "Pending Approval", "Order Received", "Lost"];

export function EnquiriesList() {
  const { user } = useAuth();
  const canCreate = user?.role === "BD" || user?.role === "Admin";
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["enquiries"],
    queryFn: () => api<Enquiry[]>("/enquiries"),
  });

  const rows = useMemo(() => {
    let r = data ?? [];
    if (filter !== "All") r = r.filter((e) => e.status === filter);
    if (q.trim()) {
      const s = q.toLowerCase();
      r = r.filter((e) => e.rfqNumber.toLowerCase().includes(s) || e.customerName.toLowerCase().includes(s));
    }
    return r;
  }, [data, filter, q]);

  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Enquiries</h1>
        {canCreate && (
          <Link to="/enquiries/new">
            <Button><Plus size={16} /> New Enquiry</Button>
          </Link>
        )}
      </div>

      {/* filter chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className="rounded-full border px-3 py-1 text-xs font-semibold"
              style={
                active
                  ? { background: "var(--accent)", color: "var(--accent-foreground)", borderColor: "transparent" }
                  : { borderColor: "var(--border)", color: "var(--muted-foreground)" }
              }
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* search */}
      <div className="mt-3 flex h-9 max-w-sm items-center gap-2 rounded-md border px-3 text-sm" style={{ borderColor: "var(--input)" }}>
        <Search size={15} style={{ color: "var(--muted-foreground)" }} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search RFQ # or customer…"
          className="w-full bg-transparent outline-none"
        />
      </div>

      {/* table */}
      <div className="mt-4 overflow-hidden rounded-xl border" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ color: "var(--muted-foreground)" }} className="text-left text-[11px] uppercase tracking-wide">
              <th className="px-4 py-2.5 font-bold">RFQ #</th>
              <th className="px-4 py-2.5 font-bold">Customer</th>
              <th className="px-4 py-2.5 text-right font-bold">Parts</th>
              <th className="px-4 py-2.5 font-bold">Business</th>
              <th className="px-4 py-2.5 font-bold">Status</th>
              <th className="px-4 py-2.5 text-right font-bold">Turnaround</th>
              <th className="px-4 py-2.5 font-bold">Owner</th>
            </tr>
          </thead>
          <tbody>
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-t" style={{ borderColor: "var(--border)" }}>
                  {Array.from({ length: 7 }).map((__, j) => (
                    <td key={j} className="px-4 py-3"><Skeleton className="h-4 w-20" /></td>
                  ))}
                </tr>
              ))}
            {!isLoading &&
              rows.map((e) => (
                <tr key={e._id} className="border-t hover:bg-[var(--card-2,transparent)]" style={{ borderColor: "var(--border)" }}>
                  <td className="px-4 py-3 font-mono text-xs">
                    <Link to={`/enquiries/${e._id}`} style={{ color: "var(--accent-foreground)" }}>{e.rfqNumber}</Link>
                  </td>
                  <td className="px-4 py-3">{e.customerName}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{e.noOfParts ?? "—"}</td>
                  <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{e.businessType ?? "—"}</td>
                  <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
                  <td className="px-4 py-3 text-right tabular-nums">{e.totalDurationDays ?? 0}d</td>
                  <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{e.owner ?? "—"}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {isError && (
          <EmptyState title="Couldn't load enquiries" description={(error as Error)?.message || "Check that the API server is running."} />
        )}
        {!isLoading && !isError && rows.length === 0 && (
          <EmptyState
            icon={<Inbox size={28} />}
            title={q || filter !== "All" ? "No enquiries match these filters" : "No enquiries yet"}
            description={q || filter !== "All" ? "Try clearing the search or filter." : "New RFQs you log will appear here."}
            action={canCreate && filter === "All" && !q ? (
              <Link to="/enquiries/new"><Button><Plus size={16} /> New Enquiry</Button></Link>
            ) : undefined}
          />
        )}
      </div>

      {!isLoading && !isError && rows.length > 0 && (
        <p className="mt-3 text-xs" style={{ color: "var(--muted-foreground)" }}>Showing {rows.length} of {data?.length ?? 0}</p>
      )}
    </div>
  );
}
