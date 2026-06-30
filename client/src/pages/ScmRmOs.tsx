import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Lock } from "lucide-react";
import { Card, Button } from "../components/ui";
import { WorkspaceTabs } from "../components/WorkspaceTabs";

interface Line {
  id: string; material: string; spec: string; qty: number;
  contracted: "contracted" | "new" | null;
  supplier: string; price: string; quoteDate: string;
}
const INITIAL: Line[] = [
  { id: "l1", material: "Ti-6Al-4V bar", spec: "AMS 4928", qty: 12, contracted: "new", supplier: "Aakash Metals", price: "4200", quoteDate: "2026-06-25" },
  { id: "l2", material: "AN3 fastener", spec: "NAS", qty: 200, contracted: "contracted", supplier: "", price: "", quoteDate: "" },
  { id: "l3", material: "NADCAP anodize", spec: "per drawing", qty: 12, contracted: "new", supplier: "", price: "", quoteDate: "" },
];

export function ScmRmOs() {
  const { id = "" } = useParams();
  const [lines, setLines] = useState<Line[]>(INITIAL);
  const upd = (lid: string, patch: Partial<Line>) => setLines((ls) => ls.map((l) => (l.id === lid ? { ...l, ...patch } : l)));

  const blocking = lines.filter((l) => l.contracted === "new" && (!l.supplier.trim() || !l.quoteDate));
  const canSave = blocking.length === 0;

  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="flex flex-wrap items-center gap-3">
        <Link to={`/enquiries/${id}`} className="text-sm" style={{ color: "var(--muted-foreground)" }}>Overview</Link>
        <ChevronRight size={14} style={{ color: "var(--muted-foreground)" }} />
        <h1 className="text-xl font-bold tracking-tight">SCM · RM &amp; OS</h1>
      </div>
      <WorkspaceTabs id={id} />

      {!canSave && (
        <div className="mt-3 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium" style={{ background: "color-mix(in srgb, var(--destructive) 12%, transparent)", color: "var(--destructive)" }}>
          <Lock size={15} /> {blocking.length} “New Enquiry” line{blocking.length > 1 ? "s" : ""} need a supplier and quote date before you can save.
        </div>
      )}

      <div className="mt-3 space-y-3">
        {lines.map((l) => {
          const isBlocking = blocking.includes(l);
          return (
            <Card key={l.id} style={isBlocking ? { borderColor: "var(--destructive)" } : undefined}>
              <div className="grid gap-4 md:grid-cols-2">
                {/* Engineering (read) */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Engineering (read-only)</div>
                  <div className="mt-1 text-sm font-semibold">{l.material}</div>
                  <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>{l.spec} · qty {l.qty}</div>
                </div>
                {/* SCM (edit) */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: "var(--accent-foreground)" }}>SCM</div>
                  <div className="mt-1 flex gap-2">
                    {(["contracted", "new"] as const).map((c) => (
                      <button key={c} onClick={() => upd(l.id, { contracted: c })} aria-pressed={l.contracted === c}
                        className="rounded-md border px-2.5 py-1 text-xs font-semibold"
                        style={l.contracted === c ? { background: "var(--accent)", color: "var(--accent-foreground)", borderColor: "transparent" } : { borderColor: "var(--input)", color: "var(--muted-foreground)" }}>
                        {c === "contracted" ? "Contracted" : "New Enquiry"}
                      </button>
                    ))}
                  </div>
                  {l.contracted === "new" && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <input placeholder="Supplier *" value={l.supplier} onChange={(e) => upd(l.id, { supplier: e.target.value })} className="h-8 rounded-md border px-2 text-sm" style={{ borderColor: l.supplier ? "var(--input)" : "var(--destructive)", background: "var(--card)" }} />
                      <input placeholder="₹ price/unit" value={l.price} onChange={(e) => upd(l.id, { price: e.target.value })} className="h-8 rounded-md border px-2 text-sm tabular-nums" style={{ borderColor: "var(--input)", background: "var(--card)" }} />
                      <input type="date" value={l.quoteDate} onChange={(e) => upd(l.id, { quoteDate: e.target.value })} className="col-span-2 h-8 rounded-md border px-2 text-sm" style={{ borderColor: l.quoteDate ? "var(--input)" : "var(--destructive)", background: "var(--card)" }} />
                    </div>
                  )}
                  {l.contracted === "contracted" && <div className="mt-2 text-xs" style={{ color: "var(--muted-foreground)" }}>Using existing approved contract.</div>}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* missing-detail query + save */}
      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto]">
        <Card>
          <div className="text-sm font-semibold">Missing Detail Query → Engineering</div>
          <textarea placeholder="Raise a query without leaving this screen…" rows={2} className="mt-2 w-full rounded-md border p-2 text-sm" style={{ borderColor: "var(--input)", background: "var(--card)" }} />
        </Card>
        <div className="flex items-end">
          <Button disabled={!canSave} title={canSave ? "" : "Resolve blocking lines first"}>Save quotes</Button>
        </div>
      </div>
    </div>
  );
}
