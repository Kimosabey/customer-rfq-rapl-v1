# End-to-End Micro-Level Checklist

> Confirms **no page is left out** and every **UI element, feature/functionality, state, and flow step** is specified — with dummy data ([DUMMY-DATA](07-references/DUMMY-DATA.md)). Use before handing to Claude Design.
> ✓ = specified in a design doc. **Designed by Harshan Aiyappa.**

## A. Global app shell (every authenticated screen)
| Element | Spec'd | Feature / functionality |
|---|---|---|
| Rich sidebar (gradient, grouped, icons, badges, active accent) | ✓ [06] | role-filtered nav, count badges (Enquiries 42, Needs attention 3), collapse to icon rail |
| Primary CTA `+ New Enquiry` (BD/Admin) | ✓ | opens New Enquiry |
| Top bar: global search ⌘K | ✓ [06] | search RFQ#/customer/part; command palette |
| Notifications bell + center | ✓ [37] | unread count, NotificationLog list, deep links |
| Theme toggle (light/dark) | ✓ [09] | next-themes |
| User/role card (Harshan Aiyappa · BD) | ✓ [06] | menu: sign out, theme |
| Workspace header (breadcrumb + RFQ# + StatusBadge) | ✓ [05] | pinned inside an RFQ |
| Workspace tabs (7) | ✓ [06] | role-gated, arrow-nav |

## B. Screens (all 12 — none left out)

### 1 · Login `/login` ✓ [27]
Elements: logo, email, password+show/hide, Sign in, error region. Features: server-side role resolve, rate-limit, paste-allowed password. States: default/validating/invalid/rate-limited/loading/success→`/enquiries`. Dummy: harshan.aiyappa@lingotran.com.

### 2 · Dashboard & Reports `/dashboard` ✓ [38] (bento)
Elements: 4 hero KPI tiles, RFQs-by-stage bar, outcomes donut, needs-attention list, activity feed, turnaround line, top-customers. Features: ECharts interactive + **insight captions**, drill-down to filtered list, date/customer/status filters, CSV/PDF export. States: loading(skeleton)/empty/error/role-scoped. Dummy: 42 active, 11d avg, 62% win.

### 3 · Enquiries List `/enquiries` ✓ [22]
Elements: H1, +New, status filter pills, search, density toggle, column menu, table, pagination. Features: filter/sort/search, computed Turnaround, row→Overview, role-gated +New. States: loading/empty/filtered-empty/error/volume. Dummy: RA-2026-0142 Boeing · In SCM · 8d.

### 4 · New Enquiry `/enquiries/new` ✓ [28]
Elements: 3 cards (RFQ details / scope / drawing package), FileAgo link, 2 save actions. Features: RHF+Zod validation, Save & Acknowledge, Save & Notify Engineering (→status), duplicate-RFQ check, confirm on notify. States: empty/validating/errors/saving/success. Dummy: RA-2026-0150 BEL.

### 5 · Enquiry Overview `/enquiries/:id` ✓ [23]
Elements: 8-state stage tracker, 4 KPI tiles, summary card, activity panel, BD actions. Features: loop-back note, KPI deep links, Send Quotation/Follow-up/Outcome (4 outcomes). States: loading/early/loop-back/terminal/no-access. Dummy: 12 BOM, 2 SME, 1 missing, 8 days.

### 6 · Parts & BOM `/enquiries/:id/parts` ✓ [29]
Elements: completeness gate, master list, line editor, 5-way classification toggle, MandatoryFieldInput, SME log, revision timeline. Features: completeness Yes/No→Returned to BD w/ missing items, BOM edit, classification, can't-be-blank requirement, SME entries, BOM_REVISED→stale. States: gate unset/Yes/No, empty/loading/editing/error/read-only. Dummy: Ti-6Al-4V bar, Niranjan.

### 7 · CFT Feasibility `/enquiries/:id/feasibility` ✓ [30]
Elements: assessment fields, Low/Med/High risk toggle, 4-party sign-off, decision. Features: manufacturability/risk, four-party sign, Approved→In SCM Sourcing / Not Approved→revise. States: partial/all-signed/approved/not-approved/read-only. Dummy: CFT = Niranjan, Kimo, Dhanya, Kaushik.

### 8 · SCM RM & OS `/enquiries/:id/rm-os` ✓ [31]
Elements: split Eng|SCM columns, contracted-item check, quote fields, missing-detail queries. Features: contracted vs new, supplier/price/MOQ/lead/SAP/date, **hard save-gate** on incomplete New-Enquiry lines, raise query. States: unsourced/contracted/incomplete-blocked/complete/empty/read-only. Dummy: Dhanya, Aakash Metals, SAP 4500218823.

### 9 · Cost Sheet `/enquiries/:id/cost-sheet` ✓ [32]
Elements: context chips (Eng rev, SCM date), stale banner, 6-stage CostBuildupTable, Recalculate, Submit for Approval. Features: 6-stage roll-up, subtotals, amber stale rows, recalc, submit→Pending Approval, Not-OK return w/ notes. States: all-current/partial-stale/recalculating/empty/read-only/submitted/returned. Dummy: ₹2,14,500, Kaushik.

### 10 · Approval `/enquiries/:id/approval` ✓ [33]
Elements: total price + cost-sheet link, committee review (3 reviewers + notes), OK/Not OK, sequential L1→L2→Final. Features: committee decision, Not OK→In Estimation (notes persist), L1/L2/Final locking, Final→Quote Submitted. States: pending/looped/in-chain/approved/read-only. Dummy: Kaushik, Raghav (CEO/COO), Harshan (BD).

### 11 · Revision Log `/enquiries/:id/revision-log` ✓ [34]
Elements: filter bar, RevisionTimeline (rfq scope), source badges, recalc flags. Features: filter source/person/field/date, old→new diff, deep links, append-only. States: populated/filtered/filtered-empty/empty/loading. Dummy: Rev 3 by Niranjan, Rev 2 by Dhanya.

### 12 · Admin — Users & Settings `/admin` ✓ [35]
Elements: 2 tabs; Users table (+add, edit, deactivate), Cost Settings (overhead/margin/rates). Features: role management, rate config→feeds cost sheets, deactivate confirm. States: list/empty/add-edit/validation/saved. Dummy: Kishan (Admin), overhead 12.5%, margin 15%.

## C. Cross-cutting (micro-level)
| Concern | Spec'd | Detail |
|---|---|---|
| 5 notification triggers | ✓ [07§F, 37] | RFQ→Eng, missing-detail, BOM revised, quote-for-review, quote dispatched |
| 4 decision gates | ✓ [07§D] | completeness, contracted-item (line-level, API), approval loop, customer decision |
| Revision / audit trail | ✓ [18, 34] | who/what/when/why/old-vs-new + source badge |
| Role visibility (7 roles) | ✓ [08] | nav + per-screen create/edit/read matrix |
| Status state machine (8 + branches) | ✓ [07§B, 17] | StatusBadge text+color |
| Content & formatting | ✓ [36] | ₹ en-IN lakh, dates, labels, errors, empty copy |
| States everywhere | ✓ [37] | empty/loading(skeleton)/error/no-access/success |
| Charts | ✓ [41] | ECharts, insight-first, interactive, accessible |
| Responsive | ✓ [40] | desktop-first; tablet/mobile degradation |
| Accessibility | ✓ [14] | WCAG 2.2 AA per screen |

## D. Flow-step coverage (1–12) — every step has UI
2 New Enquiry ✓ · 3 acknowledge ✓ · 4 notify ✓ · 5 completeness ✓ · 6 BOM ✓ · 7 CFT ✓ · 8 SCM ✓ · 9 cost ✓ · 9r approval ✓ · 10 send ✓ · 11 follow-up/outcome ✓ · 12 register ✓. (Step 1 = customer email, intentionally not a screen.)

## E. Result
**12/12 screens specified · 0 flow steps orphaned · all gates, states, notifications, roles, formatting, charts, responsive, and dummy data covered.** Ready for Claude Design. Remaining (token-build only): OKLCH authoring, dark status-tint verification, keyboard-shortcut map.
