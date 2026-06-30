import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../lib/auth";
import { Button } from "../components/ui";

export function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("harshan.aiyappa@lingotran.com");
  const [pw, setPw] = useState("demo");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    await login(email.trim());
    nav("/enquiries");
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      {/* brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden p-10 text-white md:flex" style={{ background: "var(--grad-brand)" }}>
        <div className="blueprint pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <div className="relative flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-lg bg-white">
            <img src="/rangsons-logo-mark.png" alt="Rangsons Aerospace" className="h-full w-full object-contain p-1" />
          </span>
          <span className="text-lg font-bold">Rangsons RFQ</span>
        </div>
        <div className="relative">
          <h1 className="text-3xl font-bold leading-tight">Customer RFQ Platform</h1>
          <p className="mt-2 max-w-sm text-white/70">From enquiry to quotation — fully traceable.</p>
          <ul className="mt-5 space-y-1.5 text-sm text-white/80">
            <li>• 6-department workflow, gated approvals</li>
            <li>• Full revision &amp; audit trail</li>
            <li>• Validated, on-time quotes</li>
          </ul>
        </div>
        <p className="relative text-xs text-white/50">Designed by Harshan Aiyappa · Full Stack AI Engineer</p>
      </div>

      {/* sign-in */}
      <div className="flex items-center justify-center p-8">
        <form onSubmit={submit} className="w-full max-w-sm">
          <h2 className="text-xl font-bold">Welcome back</h2>
          <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>Sign in to continue. (Demo: any email works.)</p>

          <label className="mt-6 block text-sm font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2"
            style={{ borderColor: "var(--input)", background: "var(--card)" }}
            required
          />

          <label className="mt-4 block text-sm font-semibold">Password</label>
          <div className="relative mt-1.5">
            <input
              type={show ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="h-10 w-full rounded-md border px-3 pr-10 text-sm outline-none focus:ring-2"
              style={{ borderColor: "var(--input)", background: "var(--card)" }}
            />
            <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-2.5" aria-label="Toggle password" style={{ color: "var(--muted-foreground)" }}>
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button type="submit" className="mt-6 w-full" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </Button>
          <p className="mt-3 text-xs" style={{ color: "var(--muted-foreground)" }}>
            Try a seeded role: niranjan@rangsons.test (Engineering), kishan@rangsons.test (Admin).
          </p>
        </form>
      </div>
    </div>
  );
}
