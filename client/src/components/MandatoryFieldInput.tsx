export type MandatoryValue = { kind: "none" } | { kind: "specified"; value: string } | null;

export function MandatoryFieldInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: MandatoryValue;
  onChange: (v: MandatoryValue) => void;
}) {
  const kind = value?.kind ?? null;
  const text = value?.kind === "specified" ? value.value : "";
  const invalid = kind === null || (kind === "specified" && !text.trim());

  return (
    <div>
      <div className="text-sm font-semibold">
        {label}
        <span style={{ color: "var(--destructive)" }}> *</span>
      </div>
      <div className="mt-1.5 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={kind === "none"}
          onClick={() => onChange({ kind: "none" })}
          className="rounded-full border px-3 py-1 text-xs font-semibold"
          style={kind === "none" ? { background: "var(--primary)", color: "#fff", borderColor: "transparent" } : { borderColor: "var(--input)", color: "var(--muted-foreground)" }}
        >
          ◉ None specified by customer
        </button>
        <button
          type="button"
          aria-pressed={kind === "specified"}
          onClick={() => onChange({ kind: "specified", value: text })}
          className="rounded-full border px-3 py-1 text-xs font-semibold"
          style={kind === "specified" ? { background: "var(--accent)", color: "var(--accent-foreground)", borderColor: "transparent" } : { borderColor: "var(--input)", color: "var(--muted-foreground)" }}
        >
          Specify requirement…
        </button>
      </div>
      {kind === "specified" && (
        <input
          autoFocus
          value={text}
          onChange={(e) => onChange({ kind: "specified", value: e.target.value })}
          placeholder="e.g. Source: Boeing-approved mill; cert EN 10204"
          className="mt-2 h-9 w-full rounded-md border px-3 text-sm outline-none focus:ring-2"
          style={{ borderColor: "var(--input)", background: "var(--card)" }}
        />
      )}
      {invalid && (
        <div className="mt-1 text-xs font-medium" style={{ color: "var(--destructive)" }}>
          Enter the requirement or select “None specified”.
        </div>
      )}
    </div>
  );
}
