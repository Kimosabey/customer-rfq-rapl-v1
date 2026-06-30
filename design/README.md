# Customer RFQ Platform — Design Documentation

**Rangsons Aerospace (RAPL)** · Internal RFQ → Quotation platform · Design system + UI/UX specs.

This folder is the **design source of truth**. It is authored as a **self-contained handoff package for Claude Design** (claude.ai) and for the build: **React.js SPA + Node.js/Express API + MongoDB (local)**, UI layer Tailwind v4 · shadcn/ui · Radix · TypeScript · TanStack Query/Table · React Hook Form + Zod · ECharts. Every screen and component doc is "promptable" — readable standalone, ending with a paste-ready **Claude Design brief** — so you can hand any single file to Claude Design and get an on-brand, accessible result without opening the others.

## How to use this set

1. Read **[01-architecture/07-ux-flows.md](01-architecture/07-ux-flows.md)** first — the canonical 12-step flow, status state machine, and notifications, anchored to the process-flow image. Everything else hangs off it.
2. Skim the **design system** (`02-design-system/`) — color, type, spacing, tokens, a11y.
3. For any screen: open its file in `04-screens/`, copy the **Claude Design brief** at the bottom, prepend the design-system briefs, and hand to Claude Design.

## Status

| Phase | Scope | State |
|---|---|---|
| **Pass 1** | Foundations · Architecture · Design system · Component library | ✅ Complete |
| **Pass 2** | End-to-end screen-flow map + **all 11 screen specs** (full coverage, no gaps) | ✅ Complete — ready for Claude Design handoff |
| Later | Responsive specs · Dev handoff · Token files (`globals.css`/Tailwind `@theme`) · optional Dashboard & Reports (O-3) | Pending |

> Scope decisions (locked): **Light default + full dark** · **Docs only, no token files yet** · authored for **Claude Design** handoff.

## Map

```
design/
  design-guidelines.html ✓   ← open in a browser: the visual style + brand guideline
  README.md ✓ · DESIGN-DECISIONS-LOG.md ✓ · UX-REVIEW-AND-RATINGS.md ✓ · END-TO-END-CHECKLIST.md ✓
  00-foundations/    00 vision ✓ · 01 goals ✓ · 02 UX research ✓ · 03 personas ✓ · 04 journeys ✓
  01-architecture/   05 IA ✓ · 06 nav/sitemap (rich sidebar) ✓ · 07 UX flows ✓ · 08 role matrix ✓
  02-design-system/  09 color ✓ · 10 type (Geist+fluid) ✓ · 11 spacing/grid ✓ · 12 elevation/motion ✓
                     13 icons ✓ · 14 a11y ✓ · 15 tokens ✓ · 36 content/formatting ✓ · 39 cards/bento/animation ✓ · 41 charts/ECharts ✓
  03-components/     16 overview ✓ · 17 StatusBadge ✓ · 18 RevisionTimeline ✓ · 19 MandatoryFieldInput ✓
                     20 CostBuildupTable ✓ · 21 base ✓ · 37 states & notifications ✓
  04-screens/        24 end-to-end flow ✓ · ALL screens ✓
                     42 Landing/Sign-in · 27 Login · 38 Dashboard&Reports · 22 List · 23 Overview · 28 New Enquiry
                     29 Parts&BOM · 30 CFT · 31 SCM RM&OS · 32 Cost Sheet · 33 Approval · 34 Revision Log · 35 Admin
  05-responsive/     40 responsive spec ✓
  06-handoff/        43 Claude Design guide ✓ · 45 paste-ready PROMPTS ✓ · 46 FE/BE/Mongo impl plan ✓ · globals.css (tokens) ✓ · 44 keyboard shortcuts ✓
  07-references/     assets/ (2 logos + process-flow) ✓ · 25 moodboard ✓ · 26 source index ✓ · DUMMY-DATA ✓
  (root)             AEROQUOTE-SYNC-TRACEABILITY ✓ · UX-REVIEW-AND-RATINGS ✓ · END-TO-END-CHECKLIST ✓ · DESIGN-DECISIONS-LOG ✓
```
✓ = written. Every screen/component doc ends with a paste-ready **Claude Design brief**.

> **Designed by Harshan Aiyappa · Full Stack AI Engineer** (harshan.aiyappa@lingotran.com).

## Conventions

- Every doc **cites its source** (e.g. `MD §4.4`, `PPTX slide 6`, `flow step 9r`) and **cross-links** related docs.
- Components reference **semantic tokens**, never raw hex.
- Status/validation = **text + color**, never color alone.
- Target: **WCAG 2.2 AA**, desktop-first with tablet/mobile graceful degradation.

## Sources

See **[07-references/26-source-spec-index.md](07-references/26-source-spec-index.md)** — links every original artifact (process-flow image, wireframe spec, SOP deck, logo, palette).
