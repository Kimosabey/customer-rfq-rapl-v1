# 18 · RevisionTimeline

> **Used on:** BOM line detail (scoped to one part) · Revision Log page (scoped to RFQ or cross-RFQ). Same component, different query scope (MD §5).
> **Cross-refs:** [07 · Flows §E](../01-architecture/07-ux-flows.md) (Revision Management) · [09 · Color](../02-design-system/09-color-system.md)

## Purpose
Answer "what happened, in order, and why" for any part/field/person/date range. A vertical timeline reads naturally as a sequence — the story the old Excel sheet couldn't tell (MD §4.10).

## Anatomy (one entry)
```
│
●──┐  Rev 3 · Material spec   [Engineering Revision]        2026-06-28 14:02
│  │  Ti-6Al-4V  →  Ti-6Al-4V (AMS 4928)        ← old (strikethrough) → new (bold)
│  │  Changed by: Ravi (Engineering) · Reason: customer spec update
│  └  ⚠ Recalculation required (cost sheet line stale)
│
●──   Rev 2 · Customer requirement  [SCM Query] …
```

## Parts
- **Rail + node** per revision (node colored by source).
- **Header:** Rev No · changed field(s) · **source badge** · timestamp.
- **Diff:** old value (strikethrough, muted) → new value (bold) — fields from Revision Management (Rev No, Changed By, Date/Time, Changed Fields, Old/New, Reason).
- **Reason** + **Changed by (role)** line.
- **Recalculation-required** indicator when the change set `isStale` (links to Cost Sheet).

## Source badges (color-coded — the key distinction)
- **Engineering Revision** → `--st-engineering` (new information arrived).
- **SCM Query** → `--st-returned` (someone caught a gap).
Different stories at a glance (MD §4.10).

## Variants & states
- **Scope:** `part` (inline panel under BOM editor) · `rfq` (full page) · `cross-rfq` (admin/report).
- **Density:** comfortable / compact.
- **States:** loading → skeleton rail of 3; **empty** → "No revisions yet" (a brand-new line); error → inline retry; filtered-empty → "No changes match these filters."
- **Filter bar** (rfq/cross scope): by source, person, date range, field.

## Props (API)
```ts
interface Revision {
  id: string; revNo: number; field: string;
  oldValue: string | null; newValue: string;
  changedBy: { name: string; role: string }; changedAt: string; // ISO
  source: "engineering_revision" | "scm_query"; reason?: string;
  recalcRequired?: boolean; linkTo?: string; // e.g. cost sheet line
}
interface RevisionTimelineProps {
  scope: "part" | "rfq" | "cross-rfq";
  revisions: Revision[];
  filters?: { source?: string; person?: string; field?: string; from?: string; to?: string };
  density?: "comfortable" | "compact";
  isLoading?: boolean;
}
```

## Accessibility
- Ordered list semantics (`<ol>`); each entry an `<li>` with an accessible summary ("Revision 3, material spec, changed by Ravi, 28 Jun").
- Diff conveys change by **text** ("changed from… to…"), not color/strikethrough alone (1.4.1) — strikethrough is reinforced by an "old/new" label.
- Source distinction = badge **text** + color.
- Keyboard: entries with a `linkTo` are focusable links; filters are standard form controls.

## Tokens
`--st-engineering`, `--st-returned`, `--border` (rail), `--muted-foreground` (old value), `--foreground` (new), `--warning` (recalc), `--text-sm`.

## Implementation mapping
Custom timeline (semantic `<ol>`) + shadcn `Badge` for source + Radix Tooltip for truncated reasons. Data via TanStack Query keyed by scope/id; filters in URL search params.

## Claude Design brief
> A vertical change-history timeline. Each entry: a colored node, a header (revision number · which field · a source badge "Engineering Revision" in indigo or "SCM Query" in orange · timestamp), then the change as **old value struck-through → new value bold**, plus who changed it and why. Flag entries that made a cost line stale with an amber "Recalculation required" note linking to the cost sheet. Filter bar (source/person/field/date) on the full-page version. Empty state for parts with no revisions yet.
