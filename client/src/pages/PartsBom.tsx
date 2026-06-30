import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, History } from "lucide-react";
import { Card } from "../components/ui";
import { WorkspaceTabs } from "../components/WorkspaceTabs";
import { MandatoryFieldInput, type MandatoryValue } from "../components/MandatoryFieldInput";

const CLASSIFICATIONS = ["Material", "Standard", "Subcon", "Special Process", "Consumables"];

interface Part { id: string; name: string; classification: string; spec: string; qty: number; req: MandatoryValue; }
const INITIAL: Part[] = [
  { id: "p1", name: "Ti-6Al-4V bar", classification: "Material", spec: "AMS 4928", qty: 12, req: { kind: "specified", value: "Boeing-approved mill; cert EN 10204 3.1" } },
  { id: "p2", name: "AN3 fastener", classification: "Standard", spec: "NAS spec", qty: 200, req: { kind: "none" } },
  { id: "p3", name: "NADCAP anodize", classification: "Special Process", spec: "per drawing", qty: 12, req: null },
  { id: "p4", name: "Bracket machining", classification: "Subcon", spec: "tol ±0.05", qty: 12, req: { kind: "none" } },
];

export function PartsBom() {
  const { id = "" } = useParams();
  const [parts, setParts] = useState<Part[]>(INITIAL);
  const [sel, setSel] = useState("p3"); // start on the one with a blocking gate
  const [complete, setComplete] = useState<"yes" | "no" | null>("yes");
  const part = parts.find((p) => p.id === sel)!;
  const update = (patch: Partial<Part>) => setParts((ps) => ps.map((p) => (p.id === sel ? { ...p, ...patch } : p)));

  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="flex flex-wrap items-center gap-3">
        <Link to={`/enquiries/${id}`} className="text-sm" style={{ color: "var(--muted-foreground)" }}>Overview</Link>
        <ChevronRight size={14} style={{ color: "var(--muted-foreground)" }} />
        <h1 className="text-xl font-bold tracking-tight">Parts &amp; BOM</h1>
      </div>
      <WorkspaceTabs id={id} />

      {/* completeness gate */}
      <Card className="mt-4">
        <div className="text-sm font-semibold">Completeness check</div>
        <p className="mt-0.5 text-sm" style={{ color: "var(--muted-foreground)" }}>Are the customer's drawings, specs, tolerances &amp; special-process notes complete?</p>
        <div className="mt-2 flex gap-2">
          {(["yes", "no"] as const).map((v) => (
            <button key={v} onClick={() => setComplete(v)} aria-pressed={complete === v}
              className="rounded-md border px-3 py-1.5 text-sm font-semibold"
              style={complete === v ? (v === "yes" ? { background: "color-mix(in srgb, var(--success) 14%, transparent)", color: "var(--success)", borderColor: "transparent" } : { background: "color-mix(in srgb, var(--st-returned) 14%, transparent)", color: "var(--st-returned)", borderColor: "transparent" }) : { borderColor: "var(--input)", color: "var(--muted-foreground)" }}>
              {v === "yes" ? "Yes — proceed" : "No — return to BD"}
            </button>
          ))}
        </div>
        {complete === "no" && (
          <div className="mt-2 text-xs font-medium" style={{ color: "var(--st-returned)" }}>↩ Returning to BD requires listing the missing items (blocks BOM edit).</div>
        )}
      </Card>

      {/* master-detail */}
      <div className="mt-3 grid gap-3 md:grid-cols-[280px_1fr]">
        <Card className="!p-2">
          <div className="px-2 py-1.5 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Parts ({parts.length})</div>
          {parts.map((p) => (
            <button key={p.id} onClick={() => setSel(p.id)} className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm"
              style={sel === p.id ? { background: "var(--accent)", color: "var(--accent-foreground)", fontWeight: 600 } : undefined}>
              <span className="truncate">{p.name}</span>
              {p.req === null && <span className="ml-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--destructive)" }} title="Mandatory field unset" />}
            </button>
          ))}
        </Card>

        <Card>
          <div className="text-sm font-semibold">{part.name}</div>

          <div className="mt-3 text-sm font-semibold">Classification</div>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {CLASSIFICATIONS.map((c) => (
              <button key={c} onClick={() => update({ classification: c })} aria-pressed={part.classification === c}
                className="rounded-md border px-2.5 py-1 text-xs font-semibold"
                style={part.classification === c ? { background: "var(--accent)", color: "var(--accent-foreground)", borderColor: "transparent" } : { borderColor: "var(--input)", color: "var(--muted-foreground)" }}>
                {c}
              </button>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <label><span className="text-sm font-semibold">Material / process spec</span>
              <input value={part.spec} onChange={(e) => update({ spec: e.target.value })} className="mt-1 h-9 w-full rounded-md border px-3 text-sm" style={{ borderColor: "var(--input)", background: "var(--card)" }} /></label>
            <label><span className="text-sm font-semibold">Quantity</span>
              <input type="number" value={part.qty} onChange={(e) => update({ qty: Number(e.target.value) })} className="mt-1 h-9 w-full rounded-md border px-3 text-sm tabular-nums" style={{ borderColor: "var(--input)", background: "var(--card)" }} /></label>
          </div>

          <div className="mt-4">
            <MandatoryFieldInput label="Customer-specific requirement" value={part.req} onChange={(req) => update({ req })} />
          </div>

          {/* SME log */}
          <div className="mt-5 border-t pt-3" style={{ borderColor: "var(--border)" }}>
            <div className="text-sm font-semibold">SME consultation log</div>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-center justify-between"><span>Quality · Niranjan — "Heat-treat lot traceability?"</span><span className="rounded-full px-2 text-[11px] font-semibold" style={{ color: "var(--success)", background: "color-mix(in srgb, var(--success) 14%, transparent)" }}>resolved</span></li>
              <li className="flex items-center justify-between"><span>Production · Kimo — "Fixture availability for OP30?"</span><span className="rounded-full px-2 text-[11px] font-semibold" style={{ color: "var(--st-scm)", background: "color-mix(in srgb, var(--st-scm) 14%, transparent)" }}>open</span></li>
            </ul>
          </div>

          {/* revision note */}
          <div className="mt-4 flex items-center gap-2 text-xs" style={{ color: "var(--muted-foreground)" }}>
            <History size={14} /> Last revised: Rev 3 · material spec · by Niranjan · 28 Jun (see Revision Log)
          </div>
        </Card>
      </div>
    </div>
  );
}
