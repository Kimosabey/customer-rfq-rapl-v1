# PRD — Rangsons Aerospace · Customer RFQ Platform

> **Drag this into Claude Design to generate the screens.** Single-source PRD distilled from the full `design/` spec. Designed by Harshan Aiyappa · Full Stack AI Engineer.

## 1. Product
An internal web app that digitizes Rangsons Aerospace's customer RFQ → Quotation process. Customers (Boeing, HAL, BEL, Safran, GE Aviation) send RFQs; work flows through 6 departments + Admin with full traceability, revision history, gated approvals, and notifications. Internal staff only, desktop-first, used 8 hours a day. **Replaces an Excel-based process** — so nothing can be lost, status is always glanceable, and every change is auditable.

## 2. Stack
React.js SPA + Node.js/Express API + MongoDB (local). UI: TypeScript, Tailwind v4, shadcn/ui, Radix, Lucide, Framer Motion, TanStack Query/Table, React Hook Form + Zod, Apache ECharts.

## 3. Visual style — "Calm Enterprise"
Neutral-first canvas; one scarce brand accent (indigo). Modern & dense like Linear/Stripe, restrained like Vercel/Notion. **Font Geist** (Inter fallback), 14px base, fluid headings (clamp). **Light default + full dark.** Background = static aerospace **blueprint grid** (faint indigo grid + corner glow) — **NO aurora/beams**. Scrollbars hidden but scrollable.

**Aceternity policy:** micro-interactions only (command palette, empty states, skeletons, subtle transitions, dialog/toast/hover, search). Avoid: aurora, beams, spotlight, moving borders, 3D cards, infinite cards, parallax, sparkles, floating dock.

## 4. Design tokens
| Token | Light | Dark |
|---|---|---|
| background | #FFFFFF | #0F131A |
| foreground (text) | #212935 | #E1E1E8 |
| muted text | #6B7280 | #9AA1AE |
| card | #FFFFFF | #212935 |
| border | #E1E1E8 | #2A2A2A |
| **primary** | #2E3192 (white text) | #2E3192 (white text) |
| on-surface accent (links/active) | #2E3192 | #8E92E8 |
| destructive | #EC1D23 (white-text btn → #C2161B) | same |
| success / warning | #15803D / #B45309 | #34C06A / #F0A44A |

**Status hues** (badges always = color **+ text** + dot): open=slate #6B7280, In Engineering Review=indigo #2E3192, In CFT Review=violet #7C3AED, In SCM Sourcing=amber #D97706, In Estimation=teal #0E7490, Pending Approval=blue #2563EB, Quote Submitted=cyan #0891B2, Order Received=green #15803D, Returned to BD=orange #EA580C, Lost/Regretted=red #C2161B, Closed/Hold=gray #9AA1AE.

Radius 4/8/12/18px · 8-pt spacing · soft shadows (light) / borders (dark).

## 5. Global rules
- **Never color alone** — status/risk/validation = color + text + icon.
- **Gates BLOCK** (not warnings): completeness check, contracted-item check, approval.
- Always design **empty / skeleton-loading / error / no-access** states.
- **Role-gated** elements hidden when not permitted.
- **WCAG 2.2 AA**: visible focus, ≥24px targets, labels, reduced-motion.
- **Charts (ECharts) self-explain:** in-viz data labels + a target/reference line + a one-line insight caption ("SCM is the bottleneck — 40% of active RFQs"); interactive (tooltip, click-to-drill); data-table fallback.
- Money = ₹ en-IN (lakh grouping, tabular). Codes mono (RA-2026-0142, RA-MKT-F-09, SAP 4500218823).

## 6. Roles (7)
BD · Engineering · CFT (virtual: Eng+Quality+SCM+Production) · SCM · Estimation · CEO/COO · Admin. Each screen is role-gated (create/edit/read).

## 7. Canonical flow (12 steps · 8 states · 4 gates · 5 notifications)
**States:** Open → In Engineering Review → In CFT Review → In SCM Sourcing → In Estimation → Pending Approval → Quote Submitted → Order Received. Branches: Returned to BD, Not OK → In Estimation. Terminals: Order Received (Won) / Regretted / Lost / Closed-Hold.

**Steps:** BD logs RFQ → acknowledges customer → notifies Engineering → Engineering completeness gate → builds Product+Process BOM (classify, mandatory customer requirement, SME log) → CFT feasibility (4-party sign-off + risk) → SCM sourcing (contracted gate + supplier quotes) → Estimation 6-stage cost build-up → committee review + L1→L2→Final approval → BD sends quote → follow-up → records outcome → register updated.

**Gates:** (1) completeness "No" → returns to BD with missing items; (2) contracted-item — can't save a quote on a "New Enquiry" line missing supplier/date (API-level); (3) approval "Not OK" → loops to In Estimation, notes persist; (4) customer decision = 4 outcomes.

**Notifications:** RFQ→Engineering, missing-detail query, BOM revised (→ stale cost rows), quote-for-review, quote dispatched.

## 8. App shell
- **Rich sidebar** (brand gradient surface): logo, prominent "+ New Enquiry" CTA (BD/Admin), grouped sections (WORKSPACE / ADMIN) with icon+label items, **live count badges** (Enquiries 42, Needs attention 3 in red), active item = filled pill + left accent bar + glow, user/role card at bottom (Harshan Aiyappa · BD), collapsible to 64px icon rail.
- **Top bar:** ⌘K global search (RFQ#/customer/part), notifications bell, theme toggle, avatar.
- **Enquiry workspace:** pinned header (breadcrumb + RFQ# + customer + status badge) + tab strip (Overview, Parts & BOM, CFT, SCM, Cost Sheet, Approval, Revision Log).

## 9. Screens (14)

1. **Landing / Sign-in** (`/`) — branded splash: left gradient panel (logo, "Customer RFQ Platform", value line, 3 bullets, blueprint grid) + right sign-in card (email, password+show/hide, Sign in, errors). Footer credit.
2. **Login** (`/login`) — centered sign-in card alone; no role picker (server-side); paste-allowed password; rate-limited.
3. **Dashboard & Reports** (`/dashboard`, **bento**) — 4 gradient hero KPI tiles (Active 42, Avg turnaround 11d, Pending 6, Win rate 62%); ECharts bar "RFQs by stage" (value labels + caption), donut "Outcomes", "Needs attention" list (overdue 4, stale 2, queries 5, deep links), recent activity, turnaround line, top customers; filters + CSV/PDF export.
4. **Enquiries List** (`/enquiries`) — register table: RFQ# (mono link), Customer, Parts, Business type, **Status pill**, **Turnaround (computed days)**, Received/Due (overdue highlighted), Owner, actions; status filter chips, search, density toggle, pagination; +New (BD/Admin). Mobile → card list.
5. **New Enquiry** (`/enquiries/new`) — 3 cards (RFQ details / scope & description / drawing package = FileAgo link, no upload); two buttons: "Save & Acknowledge Customer" + "Save & Notify Engineering".
6. **Enquiry Overview** (`/enquiries/:id`) — **8-step stage tracker** (loop-backs as reverse-arrow note), 4 KPI tiles (BOM lines, open SME, missing-detail, days open), summary card + activity panel; BD actions (Send Quotation / Follow-up / Outcome).
7. **Parts & BOM** (`/parts`) — completeness gate (Yes/No → return to BD); master-detail: parts list + line editor with **5-way classification toggle** (Material/Standard/Subcon/Special Process/Consumables), spec fields, **mandatory customer requirement (never blank: "None specified" or a required value)**, inline SME log, revision timeline.
8. **CFT Feasibility** (`/feasibility`) — assessment + Low/Med/High **risk toggle**; **four-party sign-off** (Engineering/Quality/SCM/Production); decision Approved/Not Approved.
9. **SCM RM & OS** (`/rm-os`) — split per line (read-only Engineering | SCM-editable); **Contracted vs New Enquiry** check; New Enquiry → supplier/price/MOQ/lead-time/SAP/quote-date; **save blocked** if incomplete; "Missing Detail Queries → Engineering" card.
10. **Cost Sheet** (`/cost-sheet`) — **six-stage build-up table** (Material → Outsource/special → Conversion → Tooling → Overheads → Margin) with subtotal rows + bold **Total Selling Price** (₹ tabular); context chips (Eng rev, SCM date); **amber stale rows** + Recalculate banner; Submit for Approval.
11. **Approval** (`/approval`) — Total price + committee review (meeting notes + 3 reviewers + **OK / Not OK**; Not OK → Estimation) then **sequential L1 → L2 → Final** chain (locked steps).
12. **Revision Log** (`/revision-log`) — filter bar + vertical timeline; each entry: source badge (Engineering Revision indigo / SCM Query orange), old→new diff, who/why, "Recalculation required" link; append-only.
13. **Admin — Users & Settings** (`/admin`) — two tabs: Users (table + add/edit/deactivate) and Cost Settings (Overhead %, Margin %, machine/labour rates → feed cost sheets).

## 10. Dummy data
Users: Harshan Aiyappa (BD), Niranjan & Kimo (Engineering), Dhanya (SCM), Kaushik (Estimation), Raghav (CEO/COO), Kishan (Admin).
RFQs: RA-2026-0142 Boeing (In SCM Sourcing, 8d), RA-2026-0139 HAL (Won), RA-2026-0150 BEL (In Engineering Review), RA-2026-0151 Safran (Pending Approval), RA-2026-0133 GE Aviation (Returned to BD), RA-2026-0128 HAL (Lost).
Cost example (RA-2026-0142): Material ₹58,000 · Outsource ₹32,000 · Conversion ₹74,000 · Tooling ₹12,500 · Overheads ₹19,500 · Margin ₹18,500 · **Total ₹2,14,500**.

## 11. Deliverable
Generate all 14 screens in **light + dark**, each with empty/loading/error states, role-gated, WCAG 2.2 AA, using the tokens and style above. Treat the Enquiries List, Cost Sheet, and Dashboard as the flagship screens.
