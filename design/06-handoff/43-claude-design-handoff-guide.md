# 43 · Claude Design Handoff Guide

> How to hand these specs to **Claude Design** (claude.ai) and get on-brand, accessible, gap-free screens. Copy-paste recipe — no guesswork.
> **Cross-refs:** [README](../README.md) · [design-guidelines.html](../design-guidelines.html) · [END-TO-END-CHECKLIST](../END-TO-END-CHECKLIST.md) · [globals.css](globals.css)

## How to prompt (per screen)
Paste, in this order, into Claude Design:
1. **Global system prompt** (below — paste once per conversation).
2. **The screen's brief** — the “Claude Design brief” block at the bottom of that screen's doc (`04-screens/NN-*.md`).
3. **Any domain components** the screen uses (the relevant `03-components/*` brief).
4. Optionally attach **[globals.css](globals.css)** so it uses exact tokens, and **[DUMMY-DATA](../07-references/DUMMY-DATA.md)** for realistic content.

## Global system prompt (paste once)
> You are designing screens for the **Rangsons Aerospace Customer RFQ Platform** — an internal, data-dense enterprise tool (RFQs, large tables, forms, approvals, documents, 8-hour daily use). **Architecture:** React.js SPA (frontend) + Node.js/Express API (backend) + **MongoDB** (local for now) — decoupled, not Next.js full-stack. **UI stack:** TypeScript · Tailwind v4 · shadcn/ui · Radix · Lucide · Framer Motion · TanStack Query/Table · React Hook Form + Zod · **ECharts**. (Theme via a React theme provider; Geist self-hosted.)
> **Style: “Calm Enterprise.”** Neutral-first canvas, one scarce brand accent (indigo `#2E3192`), dense but legible. Font **Geist** (Inter fallback), 14px base, fluid headings. **Light default + full dark** (next-themes). Background = static **blueprint grid** (no aurora/beams). Use the tokens in `globals.css`.
> **Rules:** never color alone — status/risk/validation = color + text + icon; gates **block** (mandatory fields, contracted-item, approval); show all states (empty/loading-skeleton/error/no-access). **WCAG 2.2 AA** (visible focus, ≥24px targets, labels, reduced-motion). Charts = **ECharts, self-explaining** (in-viz data labels + target line + insight caption), interactive, with a data-table fallback.
> **Aceternity:** micro-interactions only (command palette, empty states, skeletons, subtle transitions, dialog/toast/hover, AI panel, search). **Do NOT** use aurora, beams, spotlight, moving borders, 3D cards, infinite cards, parallax, sparkles, floating dock.
> Use dummy data with these names: Harshan Aiyappa, Kishan, Niranjan, Kimo, Kaushik, Dhanya, Raghav. Currency ₹ en-IN (lakh grouping). Designed by Harshan Aiyappa.

## Per-screen doc recipe
| Screen | Paste these docs (+ system prompt) |
|---|---|
| Landing / Login | `42-landing` + `27-login` |
| Dashboard & Reports | `38-dashboard-and-reports` + `41-charts` + `39-cards-bento` |
| Enquiries List | `22-enquiries-list` + `17-status-badge` + `21-base` |
| New Enquiry | `28-new-enquiry` + `19-mandatory-field-input` |
| Enquiry Overview | `23-enquiry-overview` + `17-status-badge` |
| Parts & BOM | `29-parts-and-bom` + `19-mandatory-field-input` + `18-revision-timeline` |
| CFT Feasibility | `30-cft-feasibility` |
| SCM RM & OS | `31-scm-rm-os` + `19-mandatory-field-input` |
| Cost Sheet | `32-cost-sheet` + `20-cost-buildup-table` |
| Approval | `33-approval` |
| Revision Log | `34-revision-log` + `18-revision-timeline` |
| Admin | `35-admin-users-settings` |
*(Always also available: `09-color`, `10-type`, `11-spacing`, `14-a11y`, `36-content` for formatting/copy.)*

## Suggested generation order
1. Landing/Login → 2. App shell + sidebar (from `06-nav`) → 3. Enquiries List → 4. Enquiry Overview → 5. Dashboard → 6. the workspace screens (BOM, SCM, Cost, Approval, CFT, Revision) → 7. New Enquiry → 8. Admin.

## Acceptance checklist (what good output must have)
- [ ] Uses the **tokens** (no random colors); light + dark both correct.
- [ ] Geist font; 14px base; fluid headings; ₹ en-IN money, tabular numerals.
- [ ] Status as **pill (text + color + dot)**; never color alone.
- [ ] **All states** present (empty / skeleton-loading / error / no-access).
- [ ] **Role-gated** elements hidden when not permitted ([08 matrix](../01-architecture/08-role-visibility-matrix.md)).
- [ ] Gates **block** (mandatory field can't be blank; contracted-item; approval loop).
- [ ] Charts **self-explain** (in-viz labels + target line + caption) and are interactive.
- [ ] **WCAG 2.2 AA**: visible focus, keyboard, labels, ≥24px targets, reduced-motion.
- [ ] Background = blueprint grid; **no** aurora/beams/sparkles/3D/floating dock.
- [ ] Responsive per [40](../05-responsive/40-responsive-spec.md): desktop-first, no horizontal page scroll.

## Reference set
Visual north star: **[design-guidelines.html](../design-guidelines.html)**. Completeness proof: **[END-TO-END-CHECKLIST](../END-TO-END-CHECKLIST.md)**. Tokens: **[globals.css](globals.css)**. Shortcuts: **[44-keyboard-shortcuts](44-keyboard-shortcuts.md)**.
