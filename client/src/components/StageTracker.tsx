import { Check } from "lucide-react";

const FORWARD = [
  "Open",
  "In Engineering Review",
  "In CFT Review",
  "In SCM Sourcing",
  "In Estimation",
  "Pending Approval",
  "Quote Submitted",
  "Order Received",
];
const SHORT: Record<string, string> = {
  Open: "Open",
  "In Engineering Review": "Engineering",
  "In CFT Review": "CFT",
  "In SCM Sourcing": "SCM",
  "In Estimation": "Estimation",
  "Pending Approval": "Approval",
  "Quote Submitted": "Submitted",
  "Order Received": "Received",
};
// branch / terminal states map onto a forward index for display + carry a note
const BRANCH: Record<string, { idx: number; note: string }> = {
  "Returned to BD": { idx: 1, note: "↩ Returned to BD — missing details" },
  Regretted: { idx: 7, note: "Customer regretted" },
  Lost: { idx: 7, note: "✕ Lost to another supplier" },
  "Closed / Hold": { idx: 7, note: "Closed / on hold" },
};

export function StageTracker({ status }: { status: string }) {
  const branch = BRANCH[status];
  const currentIdx = branch ? branch.idx : FORWARD.indexOf(status);

  return (
    <div>
      <div className="flex items-center overflow-x-auto pb-1">
        {FORWARD.map((s, i) => {
          const done = i < currentIdx;
          const active = i === currentIdx && !branch;
          const numBg = done ? "var(--success)" : active ? "var(--grad-sky)" : "var(--card)";
          return (
            <div key={s} className="flex items-center">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span
                  className="grid h-6 w-6 place-items-center rounded-full border-2 text-[11px] font-bold"
                  style={{
                    background: numBg,
                    borderColor: done ? "var(--success)" : active ? "transparent" : "var(--border)",
                    color: done || active ? "#fff" : "var(--muted-foreground)",
                    boxShadow: active ? "var(--glow)" : undefined,
                  }}
                >
                  {done ? <Check size={13} /> : i + 1}
                </span>
                <span
                  className="text-xs"
                  style={{ color: active ? "var(--foreground)" : "var(--muted-foreground)", fontWeight: active ? 700 : 500 }}
                >
                  {SHORT[s]}
                </span>
              </div>
              {i < FORWARD.length - 1 && (
                <span className="mx-1.5 h-0.5 w-6" style={{ background: done ? "var(--success)" : "var(--border)" }} />
              )}
            </div>
          );
        })}
      </div>
      {branch && (
        <div className="mt-2 inline-flex rounded-md px-2 py-1 text-xs font-semibold"
          style={{ color: "var(--st-returned)", background: "color-mix(in srgb, var(--st-returned) 12%, transparent)" }}>
          {branch.note}
        </div>
      )}
    </div>
  );
}
