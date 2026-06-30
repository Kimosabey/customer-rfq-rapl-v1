# 22 · Enquiries List  (flagship #1)

> **Route:** `/enquiries` · **Access:** all roles (read); **+ New Enquiry** only BD/Admin.
> **Replaces:** the Excel Enquiry Register `RA-MKT-R-01` (MD §4.2). **Flow:** the register that steps 2 and 12 read/write.
> **Cross-refs:** [17 · StatusBadge](../03-components/17-status-badge.md) · [21 · DataTable](../03-components/21-base-components.md) · [07 · Flows](../01-architecture/07-ux-flows.md) · [11 · Layout](../02-design-system/11-spacing-grid-layout.md)

## Purpose
The home screen and register. Two properties it must preserve from the Excel register: **nothing is lost**, and **status is glanceable at a row level** (MD §4.2).

## Layout / anatomy
```
┌ Top bar ───────────────────────────────────────────────────────────────┐
├ Sidebar ┬───────────────────────────────────────────────────────────────┤
│ Enquiries│  Enquiries                                   [ + New Enquiry ] │  ← H1 + primary (BD/Admin)
│ + New    │  ┌ Status filter pills (StatusBadge, interactive) ───────────┐ │
│ Admin⌄   │  │ All · Open · In Eng · CFT · SCM · Estimation · Pending … │ │
│          │  └───────────────────────────────────────────────────────────┘ │
│          │  [🔍 Search RFQ# / customer / part]      [Density ▭]  [⋯ cols] │
│          │  ┌ DataTable ────────────────────────────────────────────────┐ │
│          │  │ RFQ #     Customer  Parts  Status        Turnaround  Due  │ │
│          │  │ RA-26-142 Boeing    12     [In SCM]      8d           …   │ │
│          │  │ …                                                          │ │
│          │  └───────────────────────────────────────────────────────────┘ │
│          │  Showing 1–25 of 318                         ‹ 1 2 3 … ›       │
└──────────┴───────────────────────────────────────────────────────────────┘
```

## Columns
| Column | Notes |
|---|---|
| RFQ # | mono; links to Overview |
| Customer | truncate + tooltip |
| Parts | `noOfParts`, right-aligned |
| Business type | tag |
| **Status** | `StatusBadge` (soft) |
| **Turnaround** | **computed `totalDurationDays`** (read-time, not stored — MD §4.2) |
| Received / Due | dates; due highlights when near/overdue |
| Owner / next action | role currently responsible |
| ⋯ | row actions (Open, Copy link) |

## Key interactions
- **Status pills = quick filters** mapped 1:1 to the state machine (multi-select, `aria-pressed`).
- **Global search** over RFQ# / customer / part (MD §4.2); also reachable via ⌘K.
- **Sort** any column; default = most recently updated.
- **Density toggle** (comfortable/compact) persists per user.
- **Column visibility** menu.
- **Row click / Enter** → Enquiry Overview.
- **+ New Enquiry** → `/enquiries/new` (BD/Admin only).

## States
- **Loading:** skeleton rows (respect density), header visible.
- **Empty (no RFQs):** illustration + "No enquiries yet" + **+ New Enquiry** (BD/Admin) / explanatory text (other roles).
- **Filtered-empty:** "No enquiries match these filters" + Clear filters.
- **Error:** inline retry; preserves filters.
- **Volume:** pagination (default) or virtualization once large (MD §8) — shows true total count.

## Responsive
- **Desktop (≥1280):** full table, all columns.
- **Tablet (768–1279):** sidebar→icons; table scrolls-x; non-essential columns collapse into a secondary line.
- **Mobile (<768, low priority):** each RFQ as a card (RFQ#, customer, StatusBadge, due); filters in a drawer.

## Accessibility
- `<table>` with `<th scope=col>`, caption "Enquiries register"; sortable headers announce sort state.
- Filter pills are a labeled group of toggle buttons (`aria-pressed`), focus-visible.
- Row is keyboard-activatable (link semantics on RFQ#); row actions reachable without hover.
- Result count is an `aria-live` status when filters change. WCAG 2.2 AA per [14](../02-design-system/14-accessibility-wcag22.md).

## Frontend mapping
- **TanStack Table** (sorting, column visibility, row model) + shadcn Table; **TanStack Query** for data (keyed by filters in URL params); filters/search/density in URL + Zustand; pagination server-side.
- `StatusBadge` interactive variant for pills; ⌘K shares the search index.

## Claude Design brief
> A dense enterprise register/list screen titled "Enquiries". Top: H1 + a primary "New Enquiry" button (only for BD/Admin). A row of status filter chips (text+color) mapped to the RFQ workflow states, multi-selectable. A search box (RFQ number / customer / part), a density toggle, and a column menu. Then a sortable data table: RFQ # (mono, links out), Customer, Parts count, Business type, **Status pill**, **Turnaround (days, computed)**, Received/Due dates (due highlights when overdue), current owner, row actions. Sticky header, comfortable/compact density, pagination with a true total count. Include skeleton-loading, empty, filtered-empty, and error states. Light default, dark supported, WCAG AA.
