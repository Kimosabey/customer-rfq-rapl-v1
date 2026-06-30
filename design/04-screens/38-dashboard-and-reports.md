# 38 · Dashboard & Reports  (bento)

> **Route:** `/dashboard` · **Access:** CEO/COO, BD lead, Admin (role-scoped data). **Flow:** cross-cutting oversight. **Closes:** Decision-Log O-3 (image lists "Dashboard & Reports" as a key feature).
> **Cross-refs:** [39 · Cards/Bento/Animation](../02-design-system/39-cards-bento-and-animation.md) · [24 · Screen flow](24-end-to-end-screen-flow.md) · [22 · Enquiries List](22-enquiries-list.md)

## Purpose
The bird's-eye view across **all** RFQs (the per-RFQ view is [Enquiry Overview](23-enquiry-overview.md)). Answers: how many are active, where are they stuck, are we hitting turnaround, what's our win rate, what needs attention. Built as a **bento grid** — varied tile sizes on one 8-pt grid — so the most important numbers read first.

## Bento composition
```
┌ Active RFQs ┐┌ Avg turnaround ┐┌ Pending approval ┐┌ Win rate ┐   ← 4 hero KPI tiles (gradient)
│    42       ││    11 days     ││       6           ││  62%     │
└─────────────┘└────────────────┘└──────────────────┘└──────────┘
┌ RFQs by stage (bar) ───────────────┐┌ Outcomes (donut) ─────┐
│ Eng CFT SCM Est Appr Won …          ││  Won/Lost/Open        │
└─────────────────────────────────────┘└───────────────────────┘
┌ Needs attention (aging/overdue list) ┐┌ Recent activity ─────┐
│ overdue RFQs, stale cost sheets,      ││ notifications +       │
│ open queries — each deep-links        ││ revisions feed        │
└───────────────────────────────────────┘└───────────────────────┘
┌ Turnaround trend (line) ────────────┐┌ Top customers (list) ─┐
```

## Tiles
| Tile | Size | Content |
|---|---|---|
| **Hero KPIs** ×4 | 1×1 each | Active RFQs · Avg turnaround (days) · Pending approval · Win rate % (gradient tiles, count-up on load) |
| **RFQs by stage** | 2×1 | Bar chart of the 8 states; click a bar → filtered Enquiries List |
| **Outcomes** | 1×1 | Donut: Won / Regretted / Lost / Closed (with text legend) |
| **Needs attention** | 2×1 | Overdue (due date passed), stale cost sheets, open SME/missing-detail queries — actionable list, deep links |
| **Recent activity** | 1×1 | Notification + revision feed |
| **Turnaround trend** | 2×1 | Line: median days-to-quote over time |
| **Top customers** | 1×1 | Volume / win-rate by customer |

## Reports
- **Filters:** date range, customer, status, business type, owner.
- **Export:** CSV (always) + PDF (the formatted register / summary). Light theme used for print/export.
- **Saved views** (optional later).

## States
- Loading: bento skeleton tiles (shimmer). Empty: "No RFQs yet — once you log enquiries, insights appear here." Error: per-tile retry (one failing tile doesn't blank the page). Role-scoped: a BD lead sees BD-relevant cuts; Admin sees all.

## Responsive
- **Desktop (≥1280):** full bento (4-col grid; tiles span 1–2). **Tablet:** 2-col bento; hero KPIs 2×2; charts full-width. **Mobile:** single column, KPIs first, charts scroll-x; heavy tiles collapse to summary.

## Accessibility
- **Charts need text alternatives:** every chart has an accessible summary + an associated data table (toggle or visually-hidden) so it's not vision-only (1.1.1, 1.4.1).
- KPI tiles are links with accessible names; count-up respects `prefers-reduced-motion` (shows final value instantly).
- Color in charts paired with labels/patterns; legend is text. WCAG 2.2 AA.

## Frontend mapping
- Bento via CSS grid (`grid-template-columns: repeat(4, 1fr)` + `grid-column: span N`). Charts: **Apache ECharts** (`echarts-for-react`) — interactive + insight-first per [41 · Data Visualization](../02-design-system/41-data-visualization-and-charts.md); every chart shows a derived insight caption and supports click-to-drill-down. TanStack Query for aggregates; filters in URL params; export via server endpoint.

## Claude Design brief
> A cross-RFQ **dashboard built as a bento grid** (varied tile sizes on one grid). Top row: four **gradient hero KPI tiles** — Active RFQs (42), Avg turnaround (11 days), Pending approval (6), Win rate (62%) — numbers count up on load. Then a **bar chart** of RFQs by stage (clickable), a **donut** of outcomes (Won/Lost/Open with text legend), a **"Needs attention"** actionable list (overdue, stale cost sheets, open queries, deep-linked), a **recent activity** feed, a **turnaround trend** line, and a **top customers** list. A filter bar (date/customer/status) + CSV/PDF export. Charts must have text/data-table alternatives. Bento reflows to 2-col on tablet, 1-col on mobile. Light default, dark supported, WCAG AA, count-up respects reduced-motion.
