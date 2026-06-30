# 20 · CostBuildupTable

> **Used on:** Estimation Cost Sheet (MD §4.8, §5.2). **Source code:** RA-MKT-F-09.
> **Cross-refs:** [07 · Flows step 9](../01-architecture/07-ux-flows.md) · [09 · Color](../02-design-system/09-color-system.md) · [10 · Type (tabular nums)](../02-design-system/10-typography.md)

## Purpose
Render the **fixed six-stage cost roll-up** — this sequence *is* the business logic, not a display preference. Read-only except via the **Recalculate** action; flags `isStale` rows in amber.

## The six stages (fixed order, each closed by a subtotal row)
1. **Direct material** (from SCM quotes)
2. **Outsource / special process** (NADCAP coating, heat-treat, welding…)
3. **Conversion** (machine + labour hours × configured rates)
4. **Tooling**
5. **Overheads** (Admin-configured %)
6. **Margin** (Admin-configured %)
→ **Total Selling Price** (image: "Total Selling Price").

## Anatomy
```
┌ Eng Rev: R3 ┐ ┌ SCM quote: 2026-06-25 ┐         ← context chips (pinned above table)
│ STAGE 1 · DIRECT MATERIAL                         qty  rate     amount │
│  Ti-6Al-4V bar                                     12  ₹4,200  ₹50,400 │
│  Std fastener (AN3)              ⚠ stale          200  ₹38     ₹7,600  │ ← amber row
│  ── Subtotal · Direct material                            ₹58,000 │
│ STAGE 2 · OUTSOURCE / SPECIAL PROCESS … (subtotal) …                  │
│ …                                                                     │
│ ═══ TOTAL SELLING PRICE                                   ₹2,14,500 │
└───────────────────────────────────────────────────────────────────────┘
                                              [ Recalculate ]  (when stale)
```

## Stale handling (the one data-driven style)
- Rows with `isStale: true` → `--warning-50` background + `--warning` left border + an `⚠ stale` text tag (color + **text**, 1.4.1).
- A banner above the table summarizes "N lines stale — recalculation required" with the **Recalculate** action.
- **Context chips** (Engineering revision ref + SCM quote date) pinned above the table — a stale line is only meaningful against the revision it was calculated on (MD §4.8).

## Variants & states
- **States:** populated · partially-stale · all-current · loading (skeleton rows by stage) · empty ("No cost lines yet — awaiting SCM quotes") · recalculating (stage subtotals show progress) · error.
- Read-only for non-Estimation roles (CEO/COO, BD see it in review).
- Density: comfortable / compact.

## Props (API)
```ts
type CostStage = "material" | "outsource" | "conversion" | "tooling" | "overheads" | "margin";
interface CostLine {
  id: string; stage: CostStage; label: string;
  qty?: number; rate?: number; amount: number;
  isStale?: boolean; sourceRef?: string;   // BOM line / supplier quote
}
interface CostBuildupTableProps {
  lines: CostLine[];
  engineeringRev: string; scmQuoteDate: string;   // context chips
  totalSellingPrice: number;
  canRecalculate: boolean;                          // Estimation only
  onRecalculate?: () => void;
  isRecalculating?: boolean;
  density?: "comfortable" | "compact";
}
```
Subtotals + total are **computed** (not stored); numbers use tabular numerals, right-aligned, 2-decimal currency.

## Accessibility
- Semantic `<table>` with `<th scope>`, a `<caption>` ("Cost build-up for RA-2026-0142"), grouped rows via `<tbody>` per stage with a stage row header.
- Stale state conveyed by text tag + icon, not color alone (1.4.1); border contrast ≥3:1 (1.4.11).
- Subtotal/total rows marked as such for screen readers (row header text "Subtotal · Direct material").
- Recalculate is a labeled button; on completion fires an `aria-live` status ("Cost sheet recalculated").

## Tokens
`--warning-50`, `--warning`, `--border`, `--muted-foreground` (stage headers), tabular `--font-sans`, `--text-body`.

## Implementation mapping
TanStack Table with grouped rows (stage grouping) + custom subtotal/total rows; **not** a generic editable grid — it's a fixed structure. Recalculate triggers a TanStack Query mutation; `isStale` from the `BOM_REVISED` hook (flow §F).

## Claude Design brief
> A read-only financial table showing a cost build-up in **six fixed stages** (Direct material → Outsource/special process → Conversion → Tooling → Overheads → Margin), each stage closed by a **subtotal row**, ending in a bold **Total Selling Price**. Right-align money with aligned (tabular) numerals. Mark stale lines with an **amber background + left border + a "stale" tag**, and show a banner with a **Recalculate** button when any line is stale. Pin two small chips above the table: the engineering revision and the SCM quote date the costs were based on. Include loading (skeleton) and empty ("awaiting SCM quotes") states.
