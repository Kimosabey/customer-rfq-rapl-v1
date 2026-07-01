import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Check, Lock } from "lucide-react";
import { Card, Button } from "../components/ui";
import { WorkspaceTabs } from "../components/WorkspaceTabs";

const REVIEWERS = [
  { role: "Estimation", name: "Kaushik" },
  { role: "CEO / COO", name: "Raghav" },
  { role: "BD", name: "Harshan Aiyappa" },
];

export function Approval() {
  const { id = "" } = useParams();
  const [decision, setDecision] = useState<"ok" | "notok" | null>(null);
  const [checked, setChecked] = useState<string[]>([]);
  const toggle = (r: string) => setChecked((c) => (c.includes(r) ? c.filter((x) => x !== r) : [...c, r]));

  const chain = [
    { level: "L1 · Dept / Section Head", who: "Kaushik", status: decision === "ok" ? "approved" : "awaiting" },
    { level: "L2 · CEO / COO", who: "Raghav", status: decision === "ok" ? "awaiting" : "locked" },
    { level: "Final approval", who: "—", status: "locked" },
  ];

  return (
    <div className="mx-auto max-w-[900px]">
      <div className="flex flex-wrap items-center gap-3">
        <Link to={`/enquiries/${id}`} className="text-sm" style={{ color: "var(--muted-foreground)" }}>Overview</Link>
        <ChevronRight size={14} style={{ color: "var(--muted-foreground)" }} />
        <h1 className="text-xl font-bold tracking-tight">Approval</h1>
      </div>
      <WorkspaceTabs id={id} />

      <div className="mt-4 flex items-center justify-between rounded-lg border px-4 py-3" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>Total Selling Price</span>
        <span className="text-lg font-extrabold tabular-nums">₹2,14,500</span>
        <Link to={`/enquiries/${id}/cost-sheet`} className="text-sm font-semibold" style={{ color: "var(--accent-foreground)" }}>View Cost Sheet →</Link>
      </div>

      {/* committee review */}
      <Card className="mt-3">
        <div className="text-sm font-semibold">Committee review</div>
        <textarea rows={3} placeholder="Meeting notes (persist across loops)…" className="mt-2 w-full rounded-md border p-2 text-sm" style={{ borderColor: "var(--input)", background: "var(--card)" }} />
        <div className="mt-3 flex flex-wrap gap-4">
          {REVIEWERS.map((r) => (
            <label key={r.role} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={checked.includes(r.role)} onChange={() => toggle(r.role)} />
              <span>{r.role} <span style={{ color: "var(--muted-foreground)" }}>· {r.name}</span></span>
            </label>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="destructive" onClick={() => setDecision("notok")}>✕ Not OK</Button>
          <Button onClick={() => setDecision("ok")}>✓ OK</Button>
        </div>
        {decision === "notok" && (
          <div className="mt-2 text-xs font-medium" style={{ color: "var(--st-returned)" }}>↩ Routes back to In Estimation — meeting notes persist for the next pass.</div>
        )}
      </Card>

      {/* sequential approval chain */}
      <Card className="mt-3">
        <div className="text-sm font-semibold">Approval workflow</div>
        <div className="mt-3 space-y-2">
          {chain.map((c, i) => (
            <div key={i} className="flex items-center gap-3 rounded-md border px-3 py-2" style={{ borderColor: "var(--border)", opacity: c.status === "locked" ? 0.55 : 1 }}>
              <span className="grid h-7 w-7 place-items-center rounded-full text-xs font-bold"
                style={c.status === "approved" ? { background: "var(--success)", color: "#fff" } : c.status === "awaiting" ? { background: "var(--grad-sky)", color: "#fff" } : { background: "var(--muted)", color: "var(--muted-foreground)" }}>
                {c.status === "approved" ? <Check size={14} /> : c.status === "locked" ? <Lock size={13} /> : i + 1}
              </span>
              <div className="flex-1">
                <div className="text-sm font-semibold">{c.level}</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{c.who}</div>
              </div>
              <span className="text-xs font-semibold capitalize" style={{ color: c.status === "approved" ? "var(--success)" : c.status === "awaiting" ? "var(--accent-foreground)" : "var(--muted-foreground)" }}>{c.status}</span>
            </div>
          ))}
        </div>
        {decision !== "ok" && <div className="mt-2 text-xs" style={{ color: "var(--muted-foreground)" }}>Chain unlocks once the committee marks the quote OK.</div>}
      </Card>
    </div>
  );
}
