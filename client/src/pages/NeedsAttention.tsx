import { Link } from "react-router-dom";
import { AlertTriangle, Clock, FileWarning, MessageCircleQuestion } from "lucide-react";
import { Card, StatusBadge } from "../components/ui";

const OVERDUE = [
  { id: "e6", rfq: "RA-2026-0128", customer: "HAL", note: "Quote overdue by 4 days", status: "Lost" },
  { id: "e5", rfq: "RA-2026-0133", customer: "GE Aviation", note: "Returned to BD 5 days ago", status: "Returned to BD" },
  { id: "e4", rfq: "RA-2026-0151", customer: "Safran", note: "Approval pending 3 days", status: "Pending Approval" },
  { id: "e1", rfq: "RA-2026-0142", customer: "Boeing", note: "Due in 2 days", status: "In SCM Sourcing" },
];
const STALE = [
  { id: "e1", rfq: "RA-2026-0142", customer: "Boeing", note: "2 cost lines stale after Rev 3" },
  { id: "e4", rfq: "RA-2026-0151", customer: "Safran", note: "1 cost line stale (supplier price)" },
];
const QUERIES = [
  { id: "e1", rfq: "RA-2026-0142", customer: "Boeing", note: "SCM → Engineering: tolerance clarification", who: "Dhanya" },
  { id: "e3", rfq: "RA-2026-0150", customer: "BEL", note: "Open SME consultation (Quality)", who: "Niranjan" },
];

function Section({ icon, title, count, hue, children }: { icon: React.ReactNode; title: string; count: number; hue: string; children: React.ReactNode }) {
  return (
    <Card>
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <span style={{ color: hue }}>{icon}</span>
        {title}
        <span className="ml-auto rounded-full px-2 text-xs font-bold" style={{ color: hue, background: `color-mix(in srgb, ${hue} 14%, transparent)` }}>{count}</span>
      </div>
      <ul className="divide-y" style={{ borderColor: "var(--border)" }}>{children}</ul>
    </Card>
  );
}

export function NeedsAttention() {
  return (
    <div className="mx-auto max-w-[1000px]">
      <h1 className="text-2xl font-bold tracking-tight">Needs attention</h1>
      <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>RFQs requiring action — overdue items, stale cost sheets, and open queries.</p>

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <Section icon={<Clock size={16} />} title="Overdue" count={OVERDUE.length} hue="var(--st-returned)">
          {OVERDUE.map((i) => (
            <li key={i.rfq} className="flex items-center justify-between gap-2 py-2.5 text-sm" style={{ borderColor: "var(--border)" }}>
              <Link to={`/enquiries/${i.id}`} className="min-w-0">
                <span className="font-mono text-xs" style={{ color: "var(--accent-foreground)" }}>{i.rfq}</span>
                <span className="block truncate" style={{ color: "var(--muted-foreground)" }}>{i.customer} — {i.note}</span>
              </Link>
              <StatusBadge status={i.status} />
            </li>
          ))}
        </Section>

        <Section icon={<FileWarning size={16} />} title="Stale cost sheets" count={STALE.length} hue="var(--warning)">
          {STALE.map((i) => (
            <li key={i.rfq} className="py-2.5 text-sm">
              <Link to={`/enquiries/${i.id}`}>
                <span className="font-mono text-xs" style={{ color: "var(--accent-foreground)" }}>{i.rfq}</span>
                <span className="block" style={{ color: "var(--muted-foreground)" }}>{i.customer} — {i.note}</span>
              </Link>
            </li>
          ))}
        </Section>

        <Section icon={<MessageCircleQuestion size={16} />} title="Open queries" count={QUERIES.length} hue="var(--st-scm)">
          {QUERIES.map((i, n) => (
            <li key={n} className="py-2.5 text-sm">
              <Link to={`/enquiries/${i.id}`}>
                <span className="font-mono text-xs" style={{ color: "var(--accent-foreground)" }}>{i.rfq}</span>
                <span className="block" style={{ color: "var(--muted-foreground)" }}>{i.note} · {i.who}</span>
              </Link>
            </li>
          ))}
        </Section>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs" style={{ color: "var(--muted-foreground)" }}>
        <AlertTriangle size={14} /> Counts mirror the sidebar "Needs attention" badge.
      </div>
    </div>
  );
}
