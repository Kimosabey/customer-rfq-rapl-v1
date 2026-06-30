# Handoff: Rangsons Aerospace — Customer RFQ Platform

## Overview
An internal, data-dense enterprise web app that takes an aerospace RFQ from **enquiry → BOM → CFT feasibility → SCM sourcing → cost build-up → multi-level approval → quotation**, with a full revision/audit trail. Built for 8-hour daily desktop use by internal staff (BD, Engineering, CFT, SCM, Estimation, CEO/COO, Admin). Style is **"Calm Enterprise"**: neutral-first canvas, one scarce indigo brand accent, a static aerospace "blueprint grid" background, light + full dark.

## About the Design Files
The file in this bundle (`RFQ Platform.dc.html`) is a **design reference created in HTML** — a high-fidelity, fully interactive prototype showing intended look, layout, states, and behavior. **It is not production code to copy.** The task is to **recreate it in the existing `client/` codebase** (Vite + React 18 + TypeScript + Tailwind v4 + shadcn/ui + Radix + Lucide + Framer Motion + TanStack Query/Table + React Hook Form + Zod + Apache ECharts) using those established patterns, wiring data to the `server/` Express + Mongoose + MongoDB API.

The prototype was authored as a single self-contained file for review speed. In the codebase it must be **decomposed into the component library + screens** described below. All visual values shown here come from the repo's own spec — treat `design/06-handoff/globals.css` as the **source of truth for tokens** and the `design/` folder (00→07) as the binding spec.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, status semantics, gates, and interactions are all decided. Recreate pixel-faithfully using the codebase's libraries. Where the prototype uses inline styles, map them to Tailwind classes / CSS variables from `globals.css` (do **not** hardcode hex — use the token vars).

## Tech mapping (prototype → target)
- Inline-styled elements → Tailwind v4 classes + shadcn/ui components; tokens via the CSS vars in `globals.css` (`bg-background`, `text-foreground`, `border-border`, `bg-primary`, etc.).
- Hand-rolled primitives (Button, Input, Card, Badge, Tabs, Dialog, Toast, Table, Skeleton) → **shadcn/ui** equivalents, themed with the tokens.
- Inline SVG icons → **Lucide** (`lucide-react`).
- Charts (bar / donut / line) → **Apache ECharts** (`echarts-for-react`), keep the in-viz labels + reference line + one-line insight caption + data-table fallback.
- Local component state / handlers → React state where local; **TanStack Query** for server data, **TanStack Table** for the Enquiries grid, **React Hook Form + Zod** for forms.
- Subtle transitions → **Framer Motion** (micro-interactions only — command palette, dialogs, toasts, skeletons, list/empty transitions). **No** aurora/beams/spotlight/parallax/3D/infinite-scroll. The one continuous animation allowed is the **landing/login** blueprint draw-in loop (entry page only, reduced-motion safe).

## Design Tokens (USE VERBATIM — from `design/06-handoff/globals.css`)
Apply via `:root` (light) and `.dark`. Never use raw hex in components — reference the var.

| Token | Light | Dark |
|---|---|---|
| `--background` | `#FFFFFF` | `#0F131A` |
| `--foreground` | `#212935` | `#E1E1E8` |
| `--card` | `#FFFFFF` | `#212935` |
| `--muted-foreground` | `#6B7280` | `#9AA1AE` |
| `--border` | `#E1E1E8` | `#2A2A2A` |
| `--primary` | `#2E3192` (white text, both themes) | `#2E3192` |
| `--accent-foreground` (on-surface accent) | `#2E3192` | `#8E92E8` |
| `--ring` (focus) | `#2E3192` | `#8E92E8` |
| `--destructive` | `#EC1D23` (button fill `#C2161B`) | same |
| `--success` | `#15803D` | `#34C06A` |
| `--warning` | `#B45309` | `#F0A44A` |

- **Brand gradient** (sidebar / brand panels only): `linear-gradient(160deg,#3A3EB0,#2E3192,#1C1C39)`.
- **Status hues** (always color **+ text + dot**, never color alone): open=slate · engineering=indigo · cft=violet · scm=amber · estimation=teal · pending=blue · submitted=cyan · won=green · returned=orange · lost=red · closed=gray. Each renders as a soft-bg pill in lists, a solid badge in the workspace header.
- **Type:** Geist (Geist Mono for figures/IDs), Inter fallback; 14px base; fluid headings `clamp(...)`.
- **Radius:** md 8 / lg 12 / xl 18. **Shadows:** `--shadow-1/2/3` + `--glow` (see globals.css).
- **Money:** `₹` en-IN, lakh grouping, `font-variant-numeric: tabular-nums`.

## Screens / Views
Top-level `view` state drives the shell. Workspace views render inside a pinned RFQ header + 7-tab strip.

1. **Landing / Login** (auth gate) — split: brand panel (horizontal logo on white chip, product name, value bullets, **looping blueprint draw-in** of real Rangsons parts: bent duct assembly w/ flanges + Ø dimension callout, heat-exchanger fin core, SATCOM dish) + sign-in card (email, password w/ show/hide, error region). Has a compact centered-card variant.
2. **Dashboard** — bento grid: 2 gradient KPI hero tiles (Active RFQs, Avg turnaround) + 2 plain KPI tiles (Pending approval, Win rate) with count-up; ECharts **RFQs-by-stage bar** (target line + insight caption), **Outcomes donut**, **monthly line**; Needs-attention list, recent activity, top customers. Each chart has a "Data" toggle → table fallback.
3. **Enquiries List** — status filter pills (12 states), search, density (Comfortable/Compact), **TanStack Table** (sortable: RFQ#, Customer, Parts, Business type, Status, Turnaround, Received/Due, Owner), SLA day meter, row → workspace. Ships **skeleton / empty / filtered-empty / error** states.
4. **Enquiry Overview** — 8-step **StageTracker**, KPI tiles, "what's blocking" **gate ledger** (completeness · contracted-item · committee · approval), SLA meter, summary panel, activity feed, role-gated BD actions.
5. **New Enquiry** — 3 form cards (customer/RFQ meta, commercial, attachments) with required markers + validation; 2 footer actions.
6. **Parts & BOM** — completeness gate banner, master-detail list, **5-way classification** (material/standard/special-process/subcon/consumables), **MandatoryFieldInput** (none / specified / unset→blocks), SME query log, part-scope **RevisionTimeline**.
7. **CFT Feasibility** — assessment fields, **risk toggle** (Low/Med/High = color+text+icon), **4-party sign-off** (Engineering/Quality/SCM/Production), decision (Approved / Not approved).
8. **SCM RM&OS** — per-BOM-line split (Engineering read vs SCM edit), **contracted vs new-enquiry gate** (new-enquiry lines reveal supplier/price/MOQ/lead/SAP/quote-date; missing → **Save blocked** with offending-line banner), missing-detail queries.
9. **Cost Sheet** — 6-stage **CostBuildupTable** (direct material, outsource/special, conversion, tooling, overheads %, margin %), **stale-row** markers + provenance chips (Eng Rev R3 · SCM quote date), **recalculate** banner, total ₹2,14,500, **Submit blocked while stale**.
10. **Approval** — committee review (notes + 3 reviewer checks + OK/Not-OK), then sequential **L1 → L2 → Final** chain (each locked until prior signs).
11. **Revision Log** — filter bar (source/person/field/date/search) + vertical timeline; source badges (Engineering Revision / SCM Query / Customer Requirement), old→new diffs, deep-link to stale cost line.
12. **Needs attention** — 3 grouped cards (Overdue RFQs / Stale cost sheets / Open SME queries), each item deep-links into its workspace.
13. **Admin · Users** — table (8 users, role badge + status + Edit/Deactivate) + Add-user dialog.
14. **Admin · Cost Settings** — overhead %, margin %, machine rate ₹/hr, labour rate ₹/hr → feeds new cost sheets.

## Shell
- **Sidebar** — brand gradient surface; emblem mark + "Rangsons RFQ / Customer RFQ Platform"; groups with icon+label, count badges, active accent bar + filled pill; user card; **collapsible** (240px ↔ 64px rail, `width .34s cubic-bezier(.22,1,.36,1)`); role-gated items hidden when not permitted; tablet auto-rail, mobile drawer + scrim.
- **TopBar** — page title, **⌘K** command palette (jump-to / recent / quick actions), notifications bell, theme toggle, role-switcher avatar menu.
- **Background** — static aerospace blueprint grid (faint indigo grid + faint part line-art + corner glow). **No** moving background.

## Interactions & Behavior
- **Gates BLOCK** (not just warn): mandatory-field unset, contracted-item missing supplier/date, stale cost on submit, approval chain order. Blocked actions are disabled with an inline reason.
- **Optimistic stage transitions** with an **Undo** affordance in the toast.
- **Command palette** ⌘K, shortcuts sheet on `?`.
- **Role-scoped** nav, counts, and needs-attention.
- **Theme** persists (localStorage); density + filters persist.
- **WCAG 2.2 AA**: visible focus rings (`--ring`), ≥24px targets, labelled controls, `prefers-reduced-motion` honored, scrollbars hidden but scrollable.
- **States everywhere**: design empty / skeleton-loading / error / no-access for each data surface (skeleton pattern demoed on Enquiries + Dashboard; replicate on workspace tabs when wiring async data).

## State Management
- **Server data** (TanStack Query): enquiries list, single RFQ + sub-resources (BOM, CFT, SCM lines, cost sheet, approvals, revisions), users, cost settings, dashboard aggregates. Mutations invalidate the relevant query keys; transitions optimistic with rollback.
- **Local/UI state**: theme, sidebar collapsed, current role (until real auth), active filters/density, dialog/palette open, form drafts (RHF).
- **Derived**: gate-ledger booleans, SLA days-remaining, stale-cost flags, role visibility.

## Dummy Data (use these names)
Harshan Aiyappa (BD), Niranjan & Kimo (Engineering), Dhanya (SCM), Kaushik (Estimation), Raghav (CEO/COO), Kishan (Admin). RFQ e.g. **RA-2026-0142** (Boeing, In SCM Sourcing). Real Rangsons parts/customers for flavor: tube & duct assemblies (Airbus A320), compact heat exchangers, SATCOM terminals, precision-machined Ti brackets; customers Boeing, Airbus, HAL, BEL, GE Aviation, Safran. Full set in `design/07-references/DUMMY-DATA.md`.

## Assets
- `rangsons_logo.png` — horizontal lockup (wide: sidebar expanded, login, wide headers). On dark surfaces place on a **white chip**.
- `rangsons-logo2.png` / `design/07-references/assets/rangsons-logo-mark.png` — emblem mark (favicon, collapsed rail, avatar fallback).
- Icons: Lucide. No other raster assets — the part line-art is inline SVG.

## Files in this bundle
- `RFQ Platform.dc.html` — the hifi interactive prototype (open in a browser to explore all 14 screens; switch role via the avatar menu, toggle theme, press ⌘K / `?`).
- `globals.css` — the exact token stylesheet (copy of `design/06-handoff/globals.css`).
- `CLAUDE-CODE-PROMPT.md` — ready-to-paste prompt to drive the build in Claude Code.

## Reference spec (in the main repo, the binding source)
`design/06-handoff/PRD.md`, `design/02-design-system/`, `design/03-components/`, `design/04-screens/` (each screen ends with a "Claude Design brief"), `design/01-architecture/` (nav, ux-flows, role matrix), `design/07-references/DUMMY-DATA.md`.
