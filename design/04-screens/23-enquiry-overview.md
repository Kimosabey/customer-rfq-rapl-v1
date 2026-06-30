# 23 · Enquiry Overview  (flagship #2)

> **Route:** `/enquiries/:id` · **Access:** all roles with access to the RFQ (read); BD owns Send Quotation / Follow-up / Outcome actions.
> **Role:** the hub every workspace tab reports back to — "where is this RFQ right now?" (MD §4.4).
> **Cross-refs:** [21 · StageTracker/KpiTile](../03-components/21-base-components.md) · [17 · StatusBadge](../03-components/17-status-badge.md) · [07 · Flows §B/§C](../01-architecture/07-ux-flows.md) · [08 · Roles](../01-architecture/08-role-visibility-matrix.md)

## Purpose
One glance answers: current stage, health (KPIs), and what happens next. It carries the **8-state stage tracker** and the four KPI tiles that tell a manager whether this RFQ needs attention without opening a tab (MD §4.4).

## Layout / anatomy
```
┌ Workspace header ──────────────────────────────────────────────────────┐
│ Enquiries › RA-2026-0142 · Boeing            [In SCM Sourcing]  ⋯ actions│
├ Tabs ───────────────────────────────────────────────────────────────────┤
│ ▸Overview  Parts&BOM  CFT  SCM  Cost Sheet  Approval  Revision Log       │
├──────────────────────────────────────────────────────────────────────────┤
│ STAGE TRACKER (8 forward states)                                          │
│ ①Open ─ ②Eng ─ ③CFT ─ ④SCM● ─ ⑤Est ─ ⑥Approval ─ ⑦Submitted ─ ⑧Received │
│   (loop-back note: ⟲ Returned to BD / Not OK→Estimation when active)      │
│ ┌ KPI ─────┐ ┌ KPI ─────┐ ┌ KPI ───────────┐ ┌ KPI ─────────┐            │
│ │ BOM lines│ │ Open SME │ │ Open missing-   │ │ Days open    │            │
│ │   12     │ │ queries 2│ │ detail queries 1│ │   8          │            │
│ └──────────┘ └──────────┘ └─────────────────┘ └──────────────┘            │
│ ┌ Summary card ──────────────┐ ┌ Activity / notifications ─────────────┐ │
│ │ Customer, SOW, due date,   │ │ recent NotificationLog + revisions     │ │
│ │ business type, FileAgo link│ │ (deep links)                           │ │
│ └────────────────────────────┘ └────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────┘
```

## Key elements
- **Workspace header:** breadcrumb + RFQ# + customer + **StatusBadge (solid)** + actions menu; pinned.
- **Stage tracker:** the 8 **forward** states as an ordered, numbered sequence (numbers justified — it's a real ordered process). Current state highlighted; completed states checked. **Loop-backs** (Returned to BD, Not OK→Estimation) surface as a **reverse-arrow / state note** on the relevant stage — *not* a 9th forward step (MD §4.4).
- **Four KPI tiles** (MD §4.4): BOM lines · open SME queries · open missing-detail queries · days open. Each links to its source tab.
- **Summary card:** RFQ details (customer, location, contacts, SOW, business type, due date, FileAgo **link** — no upload, MD §4.3).
- **Activity panel:** recent notifications + revisions with deep links.
- **BD actions** (when state allows): **Send Quotation** (RA-MKT-F-04, after approval) · **Follow-up** · **Record Outcome** (Won / Regretted / Lost / Closed — four explicit buttons, MD §3.2).

## States
- **Loading:** skeleton tracker + KPI tiles + cards.
- **Early (Open):** tracker at stage 1; KPIs mostly 0; BD sees "Notify Engineering" guidance.
- **Loop-back active:** tracker shows the reverse-arrow note; activity explains why (missing items / Not-OK notes).
- **Terminal (Won/Lost/etc.):** tracker fully resolved; outcome banner; actions reduce to view/duplicate.
- **Error / not-found / no-access:** appropriate empty/error.

## Responsive
- **Desktop:** tracker horizontal; KPIs in a 4-up row; summary + activity side by side.
- **Tablet:** tracker horizontal scroll or 2-row; KPIs 2×2; cards stack.
- **Mobile (low priority):** tracker vertical; KPIs 2×2; tabs become a select; cards stack.

## Accessibility
- Stage tracker = ordered list with current step `aria-current="step"`; status conveyed by text, not color/position alone.
- KPI tiles are links/buttons with accessible names ("2 open SME queries — view").
- Outcome buttons are clearly labeled (not color-only); destructive-flavored ones (Lost) use text+icon.
- Live region announces status changes ("Status: Quote Submitted"). WCAG 2.2 AA per [14](../02-design-system/14-accessibility-wcag22.md).

## Frontend mapping
- `StageTracker` + `KpiTile` (base components); **TanStack Query** for the RFQ aggregate + activity; actions are mutations with optimistic status + toast; tabs = Radix Tabs with role-gated rendering ([08](../01-architecture/08-role-visibility-matrix.md)).

## Claude Design brief
> An RFQ "overview" hub. Pinned header: breadcrumb + RFQ number + customer + a solid status badge + an actions menu. Below it, a tab strip (Overview, Parts & BOM, CFT, SCM, Cost Sheet, Approval, Revision Log). Main content: a horizontal **8-step stage tracker** (Open → Engineering → CFT → SCM → Estimation → Approval → Quote Submitted → Order Received) with the current step highlighted and completed steps checked; show loop-backs ("Returned to BD", "Not OK → Estimation") as a subtle reverse-arrow note on the relevant step, not a new step. Then four KPI tiles (BOM lines, open SME queries, open missing-detail queries, days open), each clickable. A summary card (customer, scope, due date, business type, a FileAgo link — no file upload) beside a recent-activity/notifications panel with deep links. For BD, show Send Quotation / Follow-up / Record Outcome (four outcomes: Won, Regretted, Lost, Closed). Include loading, early, loop-back, and terminal states. Light default, dark supported, WCAG AA.
