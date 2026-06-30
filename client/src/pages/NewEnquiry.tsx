import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "../components/ui";

function Field({ label, required, hint, type = "text", value, onChange, full }: {
  label: string; required?: boolean; hint?: string; type?: string; value: string; onChange: (v: string) => void; full?: boolean;
}) {
  return (
    <label className={full ? "col-span-2" : ""}>
      <span className="text-sm font-semibold">{label}{required && <span style={{ color: "var(--destructive)" }}> *</span>}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-1 h-9 w-full rounded-md border px-3 text-sm outline-none focus:ring-2"
        style={{ borderColor: "var(--input)", background: "var(--card)" }}
      />
      {hint && <span className="mt-1 block text-xs" style={{ color: "var(--muted-foreground)" }}>{hint}</span>}
    </label>
  );
}

export function NewEnquiry() {
  const nav = useNavigate();
  const [f, setF] = useState<Record<string, string>>({});
  const set = (k: string) => (v: string) => setF((p) => ({ ...p, [k]: v }));
  const [done, setDone] = useState<string | null>(null);

  const save = (action: "ack" | "notify") => {
    setDone(action === "ack" ? "Acknowledgement email sent to the customer." : "Engineering notified — status set to In Engineering Review.");
    setTimeout(() => nav("/enquiries"), 1100);
  };

  return (
    <div className="mx-auto max-w-[900px]">
      <h1 className="text-2xl font-bold tracking-tight">New Enquiry</h1>
      <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>Log an incoming RFQ. Required fields marked *.</p>

      <Card className="mt-4">
        <div className="mb-3 text-sm font-semibold">1 · RFQ details</div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="RFQ number" required value={f.rfq ?? ""} onChange={set("rfq")} hint="e.g. RA-2026-0152" />
          <Field label="Received date" required type="date" value={f.received ?? ""} onChange={set("received")} />
          <Field label="Customer" required value={f.customer ?? ""} onChange={set("customer")} />
          <Field label="Location" value={f.location ?? ""} onChange={set("location")} />
          <Field label="Contact name" value={f.contact ?? ""} onChange={set("contact")} />
          <Field label="Business type" required value={f.btype ?? ""} onChange={set("btype")} hint="New / Repeat" />
        </div>
      </Card>

      <Card className="mt-3">
        <div className="mb-3 text-sm font-semibold">2 · Scope &amp; description</div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Scope of work (SOW)" required value={f.sow ?? ""} onChange={set("sow")} full />
          <Field label="No. of parts" required type="number" value={f.parts ?? ""} onChange={set("parts")} />
          <Field label="Customer due date" required type="date" value={f.due ?? ""} onChange={set("due")} />
        </div>
      </Card>

      <Card className="mt-3">
        <div className="mb-3 text-sm font-semibold">3 · Drawing package</div>
        <Field label="FileAgo link" required value={f.fileago ?? ""} onChange={set("fileago")} full hint="Links only — no file upload in Phase 1." />
      </Card>

      {done && (
        <div className="mt-4 rounded-md px-3 py-2 text-sm font-medium" style={{ background: "color-mix(in srgb, var(--success) 14%, transparent)", color: "var(--success)" }}>
          ✓ {done}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <Button variant="secondary" onClick={() => save("ack")}>Save &amp; Acknowledge Customer</Button>
        <Button onClick={() => save("notify")}>Save &amp; Notify Engineering</Button>
      </div>
    </div>
  );
}
