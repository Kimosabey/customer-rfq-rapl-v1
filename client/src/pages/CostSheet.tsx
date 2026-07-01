import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, RefreshCw, GitBranch, Calendar } from "lucide-react";
import { Card, Button } from "../components/ui";
import { WorkspaceTabs } from "../components/WorkspaceTabs";

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

interface Row { label: string; qty?: number; rate?: number; amount: number; stale?: boolean }
const STAGES: { stage: string; rows: Row[]; subtotal: number }[] = [
  { stage: "1 · Direct material", rows: [
      { label: "Ti-6Al-4V bar", qty: 12, rate: 4200, amount: 50400 },
      { label: "Std fastener (AN3)", qty: 200, rate: 38, amount: 7600, stale: true },
    ], subtotal: 58000 },
  { stage: "2 · Outsource / special process", rows: [{ label: "NADCAP anodize", qty: 12, rate: 2667, amount: 32000 }], subtotal: 32000 },
  { stage: "3 · Conversion (machine + labour)", rows: [{ label: "Machining + labour", amount: 74000 }], subtotal: 74000 },
  { stage: "4 · Tooling", rows: [{ label: "Fixtures", amount: 12500 }], subtotal: 12500 },
  { stage: "5 · Overheads (12.5%)", rows: [{ label: "Applied overhead", amount: 19500 }], subtotal: 19500 },
  { stage: "6 · Margin (15%)", rows: [{ label: "Profit margin", amount: 18500 }], subtotal: 18500 },
];
const TOTAL = 214500;

export function CostSheet() {
  const { id = "" } = useParams();
  const [stale, setStale] = useState(true);

  return (
    <div className="mx-auto max-w-[1000px]">
      <div className="flex flex-wrap items-center gap-3">
        <Link to={`/enquiries/${id}`} className="text-sm" style={{ color: "var(--muted-foreground)" }}>Overview</Link>
        <ChevronRight size={14} style={{ color: "var(--muted-foreground)" }} />
        <h1 className="text-xl font-bold tracking-tight">Cost Sheet</h1>
      </div>
      <WorkspaceTabs id={id} />

      {/* context chips */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}><GitBranch size={12} /> Eng Rev R3</span>
        <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}><Calendar size={12} /> SCM quote 25 Jun 2026</span>
      </div>

      {stale && (
        <div className="mt-3 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium" style={{ background: "var(--warning-bg)", color: "var(--warning)" }}>
          ⚠ 1 cost line is stale after Rev 3 — recalculation required.
          <Button variant="outline" className="ml-auto !h-7 !px-2 !text-xs" onClick={() => setStale(false)}><RefreshCw size={13} /> Recalculate</Button>
        </div>
      )}

      <Card className="mt-3 !p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>
              <th className="px-4 py-2.5 font-bold">Line</th>
              <th className="px-4 py-2.5 text-right font-bold">Qty</th>
              <th className="px-4 py-2.5 text-right font-bold">Rate</th>
              <th className="px-4 py-2.5 text-right font-bold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {STAGES.map((st) => (
              <>
                {st.rows.map((r, i) => (
                  <tr key={st.stage + i} className="border-t" style={{ borderColor: "var(--border)", ...(stale && r.stale ? { background: "var(--warning-bg)", borderLeft: "3px solid var(--warning)" } : {}) }}>
                    <td className="px-4 py-2.5">{r.label}{stale && r.stale && <span className="ml-2 text-xs font-semibold" style={{ color: "var(--warning)" }}>⚠ stale</span>}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{r.qty ?? "—"}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{r.rate ? inr(r.rate) : "—"}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums">{inr(r.amount)}</td>
                  </tr>
                ))}
                <tr className="border-t" style={{ borderColor: "var(--border)", background: "var(--card-2, var(--muted))" }}>
                  <td className="px-4 py-2 font-semibold" colSpan={3}>Subtotal · {st.stage}</td>
                  <td className="px-4 py-2 text-right font-semibold tabular-nums">{inr(st.subtotal)}</td>
                </tr>
              </>
            ))}
            <tr style={{ borderTop: "2px solid var(--foreground)" }}>
              <td className="px-4 py-3 font-extrabold" colSpan={3}>Total Selling Price</td>
              <td className="px-4 py-3 text-right font-extrabold tabular-nums">{inr(TOTAL)}</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <div className="mt-4 flex justify-end">
        <Button disabled={stale} title={stale ? "Recalculate stale lines first" : ""}>Submit for Approval</Button>
      </div>
    </div>
  );
}
