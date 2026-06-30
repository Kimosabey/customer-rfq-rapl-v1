# 45 · Claude Design — Plan & Paste-Ready Prompts

> The complete prompt pack for generating the UI in **Claude Design** (claude.ai). Paste the **Master prompt once** per conversation, then paste a **screen prompt** for each screen. Pair with [design-guidelines.html](../design-guidelines.html) (north star) + [globals.css](globals.css) (tokens). Designed by Harshan Aiyappa.
> **Cross-refs:** [43 · Handoff guide](43-claude-design-handoff-guide.md) · [DUMMY-DATA](../07-references/DUMMY-DATA.md) · screen specs in `../04-screens/`.

## Plan (how to run the session)
1. Paste **§A Master prompt** once (sets DNA: brand, tokens, rules, stack).
2. Attach `globals.css` + the two logos if the tool allows file uploads; else the master prompt has the hex values.
3. Generate in this order, one screen per message using **§B**: Landing → Login → App shell+Sidebar → Enquiries List → Enquiry Overview → Dashboard → Parts & BOM → SCM RM & OS → Cost Sheet → Approval → CFT → Revision Log → New Enquiry → Admin.
4. After each, check against the **acceptance checklist** in [43](43-claude-design-handoff-guide.md).

---

## §A · Master prompt (paste ONCE)

> You are a senior product designer building the **Rangsons Aerospace — Customer RFQ Platform**: an internal, data-dense enterprise web app (RFQs, large tables, forms, approvals, documents; 8-hour daily use by internal staff at desktops).
>
> **Architecture:** React.js SPA + Node.js/Express API + MongoDB (local). **UI:** TypeScript, Tailwind v4, shadcn/ui, Radix, Lucide, Framer Motion, TanStack Query/Table, React Hook Form + Zod, **Apache ECharts**.
>
> **Style — “Calm Enterprise.”** Neutral-first canvas, one scarce brand accent. Font **Geist** (Inter fallback), 14px base, fluid headings. **Light default + full dark.** Background = static aerospace **blueprint grid** (faint indigo grid + corner glow) — NO aurora/beams.
>
> **Tokens (light / dark):** bg `#FFFFFF`/`#0F131A`; text `#212935`/`#E1E1E8`; muted-text `#6B7280`/`#9AA1AE`; card `#FFFFFF`/`#212935`; border `#E1E1E8`/`#2A2A2A`; **primary `#2E3192`** (white text, both themes); on-surface accent `#2E3192`(light)/`#8E92E8`(dark); destructive `#EC1D23` (white-text buttons use `#C2161B`); success `#15803D`; warning `#B45309`. Status hues: open=slate, engineering=indigo, cft=violet, scm=amber, estimation=teal, pending=blue, submitted=cyan, won=green, returned=orange, lost=red, closed=gray.
>
> **Rules:** never color alone (status/risk/validation = color + text + icon); gates **block** (mandatory fields, contracted-item, approval); always design empty / skeleton-loading / error / no-access states; role-gated elements hidden when not permitted; **WCAG 2.2 AA** (visible focus, ≥24px targets, labels, reduced-motion); **scrollbars hidden** but scrollable. Charts = **ECharts, self-explaining**: in-viz data labels + a target/reference line + a one-line insight caption ("SCM is the bottleneck — 40% of active RFQs"), interactive (tooltip, click-to-drill), with a data-table fallback.
>
> **Aceternity:** micro-interactions only (command palette, empty states, skeletons, subtle transitions, dialog/toast/hover, search). NO aurora, beams, spotlight, moving borders, 3D cards, infinite cards, parallax, sparkles, floating dock.
>
> **Brand:** logo = horizontal lockup (wide) + emblem mark (favicon/collapsed); on dark surfaces put the logo on a white chip. **Dummy data names:** Harshan Aiyappa (BD), Niranjan/Kimo (Engineering), Dhanya (SCM), Kaushik (Estimation), Raghav (CEO/COO), Kishan (Admin). Money = ₹ en-IN (lakh grouping, tabular). RFQ e.g. `RA-2026-0142` (Boeing). Acknowledge with “Ready.” and wait for each screen request.

---

## §B · Per-screen prompts (paste one per screen)

**1. Landing / Sign-in (`/`)**
> Design the **branded sign-in splash**. Split layout: left = gradient brand panel with the Rangsons horizontal logo, "Customer RFQ Platform", one-line value "From enquiry to quotation — fully traceable", 3 capability bullets, over the static blueprint-grid background. Right = neutral sign-in card (email, password + show/hide, Sign in, inline errors). Footer "Designed by Harshan Aiyappa · Full Stack AI Engineer." Responsive split→stacked. States: default/error/loading.

**2. Login form (`/login`)**
> Design the centered sign-in card alone (used inside the splash). Email, password + show/hide, full-width primary Sign in, text errors (invalid/rate-limited). No role picker. Paste-allowed password. Visible focus, keyboard submit.

**3. App shell + Rich sidebar**
> Design the app shell: gradient **rich sidebar** (brand logo, prominent “+ New Enquiry” CTA, grouped sections WORKSPACE/ADMIN with icon+label items, live count badges — Enquiries 42, Needs attention 3 in red, active item = filled pill + left accent bar + glow, user/role card "Harshan Aiyappa · BD" at bottom, collapsible to 64px icon rail) + top bar (⌘K search, notifications bell, theme toggle, avatar) + content area. Role-filtered nav.

**4. Enquiries List (`/enquiries`)**
> Design the register: H1 + “New Enquiry” (BD/Admin only); a row of status filter chips (text+color, multi-select); search; density toggle; column menu; a sortable TanStack-style table — RFQ# (mono, links), Customer, Parts, Business type, **Status pill**, **Turnaround (days, computed)**, Received/Due (overdue highlighted), Owner, row actions. Sticky header, pagination with true count. States: skeleton/empty/filtered-empty/error. Mobile → card list.

**5. Enquiry Overview (`/enquiries/:id`)**
> Design the hub: pinned workspace header (breadcrumb + RFQ# + customer + solid status badge + actions) + tab strip (Overview, Parts & BOM, CFT, SCM, Cost Sheet, Approval, Revision Log). Content: horizontal **8-step stage tracker** (Open→Engineering→CFT→SCM→Estimation→Approval→Quote Submitted→Order Received; current highlighted, done checked; loop-backs as a reverse-arrow note, not a 9th step); 4 clickable KPI tiles (BOM lines 12, open SME 2, missing-detail 1, days open 8); summary card (customer, scope, due date, FileAgo link — no upload) beside a recent-activity/notifications panel. BD actions: Send Quotation / Follow-up / Record Outcome (Won/Regretted/Lost/Closed).

**6. Dashboard & Reports (`/dashboard`, bento)**
> Design a cross-RFQ **bento dashboard**: 4 gradient hero KPI tiles (Active RFQs 42, Avg turnaround 11d, Pending approval 6, Win rate 62%, count-up). Then ECharts: bar “RFQs by stage” (value labels + caption "SCM is the bottleneck — 40%"), donut “Outcomes” (Won/Lost/Open + legend), “Needs attention” actionable list (overdue 4, stale 2, queries 5, deep links), recent activity, turnaround line ("median 11d from 14"), top customers. Filter bar (date/customer/status) + CSV/PDF export. Reflows 4→2→1 col. Charts self-explain + data-table fallback.

**7. Parts & BOM (`/enquiries/:id/parts`)**
> Design Engineering’s workspace: a **completeness gate** at top (Yes/No; No → return to BD with a required “what’s missing” note). Below, **master-detail** — parts list left; right = selected BOM line editor with a **5-way classification toggle** (Material/Standard/Subcon/Special Process/Consumables), spec fields, a **customer-requirement field that can never be blank** (two-state: “None specified” or a required value), inline SME consultation log, and a revision-history timeline for that part. States: gate-unset/empty/no-selection/editing/error/read-only.

**8. SCM RM & OS (`/enquiries/:id/rm-os`)**
> Design the SCM sourcing screen: **split per BOM line** — left read-only Engineering fields (material/spec/qty/requirement); right SCM-editable. Start each line with a **Contracted vs New Enquiry** check; for New Enquiry reveal supplier/price-per-unit/MOQ/lead-time/SAP code/quote-date. **Block saving** a quote on a New-Enquiry line missing supplier or date, with an error listing offending lines. A “Missing Detail Queries → Engineering” card. States: empty(awaiting BOM)/incomplete-blocked/complete/read-only.

**9. Cost Sheet (`/enquiries/:id/cost-sheet`)**
> Design the estimation cost sheet around a **six-stage build-up table** (Direct material → Outsource/special → Conversion → Tooling → Overheads → Margin), each stage a subtotal row, ending in bold **Total Selling Price** (right-aligned tabular ₹). Two context chips (Eng rev R3, SCM quote date). **Amber stale rows** + a banner with **Recalculate**. Footer **Submit for Approval**. States: all-current/partial-stale/recalculating/empty/read-only/returned-with-notes.

**10. Approval (`/enquiries/:id/approval`)**
> Design the approval screen: Total Selling Price (+ link to cost sheet). A **committee review** card (meeting notes + 3 reviewer checkboxes Estimation/CEO-COO/BD + prominent **OK / Not OK**; Not OK → back to Estimation, notes kept). On OK, a **sequential approval workflow** L1 Dept/Section Head → L2 CEO/COO → Final, each with approver/date/status, later steps locked until earlier approve (states communicated in text, not color alone).

**11. CFT Feasibility (`/enquiries/:id/feasibility`)**
> Design the CFT screen: assessment card (manufacturability, tolerance/process capability, quality-risk notes, overall decision) with a **Low/Med/High risk toggle** (text+color+icon). A **four-party sign-off** block (Engineering, Quality, SCM, Production — name/date/comment + signed state). Decision: **Approved (Proceed)** vs **Not Approved (Revise)**. States: partial/all-signed/approved/not-approved/read-only.

**12. Revision Log (`/enquiries/:id/revision-log`)**
> Design the audit timeline (all roles): filter bar (source/person/field/date) + a vertical change-history timeline. Each entry: colored node, header (rev no · field · source badge — “Engineering Revision” indigo vs “SCM Query” orange · timestamp), the change as **old (struck) → new (bold)**, who/why, and an amber “Recalculation required” link when a cost line went stale. Append-only. States: empty/filtered-empty/loading.

**13. New Enquiry (`/enquiries/new`)**
> Design the BD intake form in **three cards**: (1) RFQ details — RFQ#, received date, customer, location, contacts, business type; (2) Scope & description — SOW, description, no. of parts, customer due date; (3) Drawing package — a single **FileAgo link** field with a note “no file upload, links only”. Two footer buttons: **Save & Acknowledge Customer** and **Save & Notify Engineering** (not one submit). Inline validation, required markers. States: empty/validating/error/saving.

**14. Admin — Users & Settings (`/admin`)**
> Design the Admin area with **two tabs**: Users (searchable table name/email/role/status + Add user + edit/deactivate-with-confirm) and Cost Settings (numeric Overhead %, Margin %, machine/labour rates with units + Save + note “applies to new cost sheets”). Admin-only. States: list/empty/add-edit/validation/saved.

---

## §C · Tips
- If output drifts off-brand, reply: “Use the tokens and rules from the master prompt; background is the blueprint grid, not aurora.”
- Ask for **both light and dark** versions of each screen.
- Ask for the **empty / loading / error** states explicitly if omitted.
- For charts, insist on **in-viz labels + caption + interactivity**, per the master prompt.
