# Claude Code prompt — Rangsons RFQ Platform

Paste the block below into Claude Code, run from the **repo root** (the one containing `client/`, `server/`, and `design/`). Drop this `design_handoff_rfq_platform/` folder in the repo root first so the prototype is reachable.

---

You are building the **Rangsons Aerospace — Customer RFQ Platform**, an internal data-dense enterprise web app (RFQs, large tables, forms, multi-level approvals; 8-hour daily desktop use).

**Read these first, in order, and treat them as binding:**
1. `design/06-handoff/PRD.md` — product, flow, tokens, 14 screens, dummy data
2. `design/06-handoff/globals.css` — the EXACT design tokens. Use the CSS vars verbatim; never hardcode hex in components.
3. `design/02-design-system/` (color, type, spacing, motion, cards/bento, charts, content/formatting)
4. `design/03-components/` (overview, StatusBadge, RevisionTimeline, MandatoryFieldInput, CostBuildupTable, base components, states)
5. `design/04-screens/` — every screen spec (each ends with a "Claude Design brief")
6. `design/01-architecture/` (nav/sidebar, ux-flows, role-visibility matrix)
7. `design/07-references/DUMMY-DATA.md` — use these names (Harshan Aiyappa=BD, Niranjan/Kimo=Engineering, Dhanya=SCM, Kaushik=Estimation, Raghav=CEO/COO, Kishan=Admin)
8. `design_handoff_rfq_platform/README.md` + open `design_handoff_rfq_platform/RFQ Platform.dc.html` in a browser — the **hifi visual + interaction reference** for all 14 screens. Recreate it faithfully; switch role via the avatar menu and toggle theme to see every variant. It is a reference, **not** code to copy — rebuild it in the codebase's stack.

**Stack (already scaffolded in `client/` and `server/`):** Vite + React 18 + TypeScript + Tailwind v4 + shadcn/ui + Radix + Lucide + Framer Motion + TanStack Query/Table + React Hook Form + Zod + Apache ECharts (`echarts-for-react`). Server: Express + Mongoose + MongoDB (local).

**Style — "Calm Enterprise":** neutral-first, one scarce indigo accent (`#2E3192`), Geist font (Inter fallback), 14px base, fluid headings. Light default + full dark via `.dark`. Background = static aerospace blueprint grid (faint indigo grid + part line-art + corner glow) — **NO** aurora/beams/moving background. Money = `₹` en-IN, lakh grouping, tabular-nums.

**Build order:**
1. **Tokens + theme** — wire `globals.css` into Tailwind v4; `ThemeProvider` (light/dark, persisted).
2. **Primitives** (shadcn/ui themed to tokens): Button, Input, Card, Badge, **StatusBadge** (color+text+dot, 12 hues), Tabs, Dialog, Toast, **DataTable** (TanStack), Skeleton, EmptyState.
3. **Domain components**: StageTracker (8 states), KpiTile (incl. gradient hero variant + count-up), MandatoryFieldInput, RevisionTimeline, CostBuildupTable.
4. **Shell**: collapsible gradient Sidebar (groups, icon+label, count badges, active accent bar, user card, role-gated items, 240↔64 rail, tablet auto-rail + mobile drawer) + TopBar (⌘K command palette, notifications, theme toggle, role-switcher avatar) + AppShell + blueprint background.
5. **Screens, wired to the API**: **Enquiries List** and **Dashboard** (ECharts with in-viz labels + reference line + one-line insight caption + data-table fallback) first; then Enquiry Overview, Parts & BOM, CFT, SCM, Cost Sheet, Approval, Revision Log, New Enquiry, Needs attention, Admin (Users + Cost Settings), Landing/Login.
6. **Server**: Mongoose models (Enquiry, BOMLine, CFT, SCMLine, CostSheet, Approval, Revision, User, CostSettings) + Express routes; a seed script using the dummy data (RFQ RA-2026-0142 Boeing as the worked example). Wire the client with TanStack Query (optimistic transitions + Undo, query invalidation).

**Hard rules (must hold):**
- **Gates BLOCK, not warn**: mandatory-field unset, contracted-item missing supplier/date, stale cost on submit, approval chain order → action disabled with inline reason.
- **Status / risk / validation = color + text + icon/dot**, never color alone.
- **Role-gated** nav, counts, actions (hidden when not permitted) per the role matrix.
- **Every data surface** ships empty / skeleton-loading / error / no-access states.
- **WCAG 2.2 AA**: visible focus rings (`--ring`), ≥24px targets, labelled controls, `prefers-reduced-motion`, scrollbars hidden but scrollable.
- **Motion = micro-interactions only** (palette, dialog/toast, skeletons, list/empty transitions). The only continuous animation is the **landing/login** blueprint draw-in loop (entry page only, reduced-motion safe).
- **Logos**: horizontal lockup (`rangsons_logo.png`) for expanded sidebar / login / wide headers (on a white chip over dark); emblem mark for favicon / collapsed rail / avatar.

Work screen-by-screen. After each, run the app and confirm it matches the prototype in both themes and renders empty/loading/error states. Ask me before adding any content, screen, or field not in the spec.

---

**Tip:** if Claude Code needs the prototype's exact inline values for a specific component, point it at the relevant block in `design_handoff_rfq_platform/RFQ Platform.dc.html` (search the file for the screen name) alongside the matching `design/04-screens/*.md` brief.
