# 32 · Estimation Cost Sheet

> **Route:** `/enquiries/:id/cost-sheet` · **Access:** Estimation (CEO/COO, BD read in review). **Flow:** step 9. **Doc code:** RA-MKT-F-09.
> **Cross-refs:** [24 · Flow](24-end-to-end-screen-flow.md) · [20 · CostBuildupTable](../03-components/20-cost-buildup-table.md) · [07 · Flows step 9 + §E impact](../01-architecture/07-ux-flows.md) · [35 · Admin rates](35-admin-users-settings.md)

## Purpose
Build the final price via the fixed **six-stage roll-up** using Admin-configured rates, and never quote a **stale** number. The screen is the home of [`CostBuildupTable`](../03-components/20-cost-buildup-table.md).

## Layout / anatomy
```
Cost Sheet — RA-2026-0142     [Eng Rev R3] [SCM quote 2026-06-25]   ← context chips
⚠ 2 lines stale — recalculation required                [ Recalculate ]   ← banner (if stale)
┌ CostBuildupTable ─────────────────────────────────────────────────────┐
│ 1 Direct material        … subtotal                                     │
│ 2 Outsource / special    … subtotal                                     │
│ 3 Conversion (machine+labour × rates)  … subtotal                       │
│ 4 Tooling                … subtotal                                     │
│ 5 Overheads (Admin %)    … subtotal                                     │
│ 6 Margin (Admin %)       … subtotal                                     │
│ ═══ TOTAL SELLING PRICE                                                 │
└────────────────────────────────────────────────────────────────────────┘
        [ Submit for Approval ]   → Pending Approval (QUOTE_FOR_REVIEW)
```

## Key elements
- **Six fixed stages** with a subtotal per stage and a bold Total Selling Price — the sequence is the business logic (MD §4.8). Inputs from Engineering (process BOM, cycle time, machine/labour hours) + SCM (material/standard/subcontract/special-process costs, lead times) per image STEP 4.
- **Stale rows (amber)** = `isStale` from the `BOM_REVISED`/Automatic-Impact-Analysis hook; **Recalculate** action + summary banner.
- **Context chips:** Engineering revision ref + SCM quote date the costs were based on (a stale line only means something against its revision).
- **Rates** (overhead %, margin %, machine/labour) come from **Admin → Cost Settings** ([35](35-admin-users-settings.md)), never hardcoded (MD §5.5).
- **Submit for Approval** → status `In Estimation → Pending Approval`, fires `QUOTE_FOR_REVIEW`.

## States
- Populated (all current) · partially-stale (banner + amber rows) · recalculating · empty ("No cost lines yet — awaiting SCM quotes") · loading (skeleton by stage) · read-only (review by CEO/COO, BD) · submitted (locked pending approval) · **returned from approval (Not OK)** → editable again, with the reviewer's notes pinned.

## Responsive
- Desktop: full table. Tablet/mobile: table scrolls-x within a contained region (never breaks page layout); totals stay visible (sticky footer row).

## Accessibility
- Semantic table, grouped by stage, subtotal/total rows labeled for screen readers; stale = amber + **text tag** + icon (1.4.1); border contrast ≥3:1 (1.4.11).
- Recalculate completion announced via `aria-live`. WCAG 2.2 AA. (Full component a11y in [20](../03-components/20-cost-buildup-table.md).)

## Frontend mapping
- `CostBuildupTable` (TanStack Table, grouped rows, computed subtotals/total); TanStack Query for the sheet + rates; Recalculate + Submit are mutations; `isStale` driven by the revision hook (07 §F); Not-OK loop re-opens edit with persisted notes.

## Claude Design brief
> An estimation cost sheet built around a **six-stage cost build-up table** (Direct material → Outsource/special process → Conversion → Tooling → Overheads → Margin), each stage closed by a subtotal, ending in a bold **Total Selling Price** (right-aligned tabular money). Show two context chips up top (engineering revision, SCM quote date). If any line is **stale**, shade it amber with a "stale" tag and show a banner with a **Recalculate** button. Footer **Submit for Approval** button. Handle states: all-current, partially-stale, recalculating, empty (awaiting SCM quotes), read-only review, and returned-from-approval (editable with reviewer notes pinned). Light default, dark supported, WCAG AA.
