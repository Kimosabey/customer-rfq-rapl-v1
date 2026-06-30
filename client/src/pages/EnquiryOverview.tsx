import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Layers, MessageCircleQuestion, AlertTriangle, Clock, ChevronRight, FileText } from "lucide-react";
import { getEnquiry } from "../lib/data";
import { Card, StatusBadge, Skeleton, EmptyState, Button } from "../components/ui";
import { StageTracker } from "../components/StageTracker";
import { useAuth } from "../lib/auth";

function Kpi({ icon, label, value, hue }: { icon: React.ReactNode; label: string; value: number; hue?: string }) {
  return (
    <Card className="!p-4">
      <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
        <span style={{ color: hue ?? "var(--muted-foreground)" }}>{icon}</span>
        {label}
      </div>
      <div className="mt-1 text-2xl font-extrabold tabular-nums">{value}</div>
    </Card>
  );
}

export function EnquiryOverview() {
  const { id = "" } = useParams();
  const { user } = useAuth();
  const { data: e, isLoading } = useQuery({ queryKey: ["enquiry", id], queryFn: () => getEnquiry(id) });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1100px] space-y-4">
        <Skeleton className="h-7 w-64" />
        <Skeleton className="h-20" />
        <div className="grid grid-cols-4 gap-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20" />)}</div>
      </div>
    );
  }
  if (!e) return <EmptyState title="Enquiry not found" description="This RFQ doesn't exist or was removed." />;

  // mock KPIs for the worked example
  const kpi = { bom: 12, sme: 2, missing: 1, days: e.totalDurationDays ?? 0 };
  const isBD = user?.role === "BD";

  return (
    <div className="mx-auto max-w-[1100px]">
      {/* workspace header */}
      <div className="flex flex-wrap items-center gap-3">
        <Link to="/enquiries" className="text-sm" style={{ color: "var(--muted-foreground)" }}>Enquiries</Link>
        <ChevronRight size={14} style={{ color: "var(--muted-foreground)" }} />
        <h1 className="text-xl font-bold tracking-tight">
          <span className="font-mono">{e.rfqNumber}</span> · {e.customerName}
        </h1>
        <StatusBadge status={e.status} />
      </div>

      {/* tab strip (Overview active; others link to placeholders) */}
      <div className="mt-3 flex gap-1 overflow-x-auto border-b text-sm" style={{ borderColor: "var(--border)" }}>
        {[
          ["Overview", ""],
          ["Parts & BOM", "/parts"],
          ["CFT", "/feasibility"],
          ["SCM", "/rm-os"],
          ["Cost Sheet", "/cost-sheet"],
          ["Approval", "/approval"],
          ["Revision Log", "/revision-log"],
        ].map(([label], i) => (
          <span
            key={label}
            className="whitespace-nowrap px-3 py-2 font-medium"
            style={i === 0 ? { color: "var(--accent-foreground)", borderBottom: "2px solid var(--accent-foreground)" } : { color: "var(--muted-foreground)" }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* stage tracker */}
      <Card className="mt-4">
        <div className="mb-3 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>Stage</div>
        <StageTracker status={e.status} />
      </Card>

      {/* KPI tiles */}
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Kpi icon={<Layers size={15} />} label="BOM lines" value={kpi.bom} hue="var(--st-engineering)" />
        <Kpi icon={<MessageCircleQuestion size={15} />} label="Open SME queries" value={kpi.sme} hue="var(--st-scm)" />
        <Kpi icon={<AlertTriangle size={15} />} label="Missing-detail" value={kpi.missing} hue="var(--st-returned)" />
        <Kpi icon={<Clock size={15} />} label="Days open" value={kpi.days} hue="var(--st-pending)" />
      </div>

      {/* summary + activity */}
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <Card>
          <div className="mb-2 text-sm font-semibold">Summary</div>
          <dl className="grid grid-cols-2 gap-y-2 text-sm">
            <dt style={{ color: "var(--muted-foreground)" }}>Customer</dt><dd>{e.customerName}</dd>
            <dt style={{ color: "var(--muted-foreground)" }}>Business type</dt><dd>{e.businessType ?? "—"}</dd>
            <dt style={{ color: "var(--muted-foreground)" }}>No. of parts</dt><dd className="tabular-nums">{e.noOfParts ?? "—"}</dd>
            <dt style={{ color: "var(--muted-foreground)" }}>Customer due</dt><dd>{e.customerDueDate ? new Date(e.customerDueDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}</dd>
            <dt style={{ color: "var(--muted-foreground)" }}>Owner</dt><dd>{e.owner ?? "—"}</dd>
            <dt style={{ color: "var(--muted-foreground)" }}>Drawings</dt><dd><a href="#" className="inline-flex items-center gap-1" style={{ color: "var(--accent-foreground)" }}><FileText size={13} /> FileAgo link</a></dd>
          </dl>
          {isBD && (
            <div className="mt-4 flex flex-wrap gap-2">
              <Button>Send Quotation</Button>
              <Button variant="outline">Follow-up</Button>
              <Button variant="secondary">Record outcome</Button>
            </div>
          )}
        </Card>
        <Card>
          <div className="mb-2 text-sm font-semibold">Recent activity</div>
          <ul className="space-y-2.5 text-sm">
            <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--st-engineering)" }} /><span><b>Niranjan</b> revised material spec (Rev 3) · 28 Jun</span></li>
            <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--st-returned)" }} /><span><b>Dhanya</b> raised a missing-detail query · 26 Jun</span></li>
            <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--st-scm)" }} /><span>RFQ moved to <b>In SCM Sourcing</b> · 24 Jun</span></li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
