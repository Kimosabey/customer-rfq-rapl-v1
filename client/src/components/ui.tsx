import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

/* ---------- Button ---------- */
type Variant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
const VARIANT_CLASS: Record<Variant, string> = {
  primary: "text-white",
  secondary: "",
  outline: "border",
  ghost: "",
  destructive: "text-white",
};
export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: { variant?: Variant; className?: string; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const style: CSSProperties =
    variant === "primary"
      ? { background: "var(--grad-sky)", boxShadow: "0 4px 14px -4px rgba(46,49,146,.5)" }
      : variant === "destructive"
      ? { background: "var(--destructive-strong)" }
      : variant === "secondary"
      ? { background: "var(--muted)", color: "var(--foreground)" }
      : variant === "outline"
      ? { borderColor: "var(--input)", color: "var(--foreground)" }
      : { color: "var(--foreground)" };
  return (
    <button
      className={`inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition active:scale-[.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 ${VARIANT_CLASS[variant]} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ---------- Card ---------- */
export function Card({ className = "", style, children }: { className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <div
      className={`rounded-xl border p-5 ${className}`}
      style={{ background: "var(--card)", borderColor: "var(--border)", boxShadow: "var(--shadow-1)", ...style }}
    >
      {children}
    </div>
  );
}

/* ---------- StatusBadge (color + text + dot, never color alone) ---------- */
const STATUS_VAR: Record<string, string> = {
  Open: "--st-open",
  "In Engineering Review": "--st-engineering",
  "In CFT Review": "--st-cft",
  "In SCM Sourcing": "--st-scm",
  "In Estimation": "--st-estimation",
  "Pending Approval": "--st-pending",
  "Quote Submitted": "--st-submitted",
  "Order Received": "--st-won",
  "Returned to BD": "--st-returned",
  Regretted: "--st-lost",
  Lost: "--st-lost",
  "Closed / Hold": "--st-closed",
};
export function StatusBadge({ status }: { status: string }) {
  const v = `var(${STATUS_VAR[status] ?? "--st-open"})`;
  return (
    <span
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{ color: v, background: `color-mix(in srgb, ${v} 14%, transparent)` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "currentColor" }} aria-hidden />
      {status}
    </span>
  );
}

/* ---------- Skeleton ---------- */
export function Skeleton({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return <div className={`animate-pulse rounded ${className}`} style={{ background: "var(--muted)", ...style }} />;
}

/* ---------- EmptyState ---------- */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      {icon && <div style={{ color: "var(--muted-foreground)" }}>{icon}</div>}
      <h3 className="text-base font-semibold">{title}</h3>
      {description && (
        <p className="max-w-sm text-sm" style={{ color: "var(--muted-foreground)" }}>
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
