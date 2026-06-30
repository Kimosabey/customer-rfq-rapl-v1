# 39 · Cards, Bento Layout & Animation

> **Cross-refs:** [11 · Spacing/Grid](11-spacing-grid-layout.md) · [12 · Elevation & Motion](12-elevation-and-motion.md) · [38 · Dashboard](../04-screens/38-dashboard-and-reports.md)
> The "modern visual layer." Used to make marketing-grade surfaces (dashboard, login, empty, success) feel polished — **without** adding noise to dense work screens.

## 1. Card variants

| Variant | Look | Use | Tokens |
|---|---|---|---|
| **Flat** | bg + 1px border, no shadow | inside tables, dense panels | `--card`, `--border` |
| **Elevated** | + `elevation-1`, hover → `elevation-2` lift | standard content cards | `--shadow-1/2` |
| **Interactive** | elevated + hover translateY(-3px) + cursor | clickable cards (screen map, KPI links) | + `--motion-base` |
| **Feature** | gradient top-border (3px, `--grad-sky`) | highlight/principle cards | brand gradient |
| **Stat / KPI** | label + big number, optional trend | metric tiles | `--font` tabular |
| **Gradient hero** | full indigo gradient bg, white text, glow | dashboard hero KPIs, login art | `--grad-brand`, `--glow` |
| **Bento tile** | rounded-xl, varied span, consistent padding | dashboard, overview | grid spans |

- Radius: cards `--radius-lg` (12), bento/hero `--radius-xl` (18). Padding 16–20 (`space-4/5`).
- **One elevation step on hover max.** No nested heavy shadows.

## 2. Bento layout

A bento grid = tiles of **varied sizes on one shared grid**, sized by importance. Modern, scannable, and great for dashboards.

- **Grid:** `display:grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4)`. Tiles span 1–2 cols (and 1–2 rows for tall tiles).
- **Hierarchy:** biggest/most-important number = biggest tile, top-left. Hero KPIs 1×1; charts 2×1; lists 1–2×1.
- **Consistency:** same radius, padding, border across tiles; gradient reserved for hero KPIs only (scarcity).
- **Where to use:** Dashboard & Reports (primary), Enquiry Overview (KPI + summary + activity), empty/success screens. **Never** for the cost sheet, BOM editor, forms, or data tables — those need uniform rows, not bento.
- **Responsive:** 4-col → 2-col (tablet) → 1-col (mobile); tall tiles flatten; order by importance.

## 3. Backgrounds — the "blueprint grid" (static, unique, on-brand)

Our signature background is a **subtle aerospace blueprint grid** (faint indigo dot/line grid that fades out via a radial mask) + a soft corner brand glow — a nod to engineering drawings, distinctive without being noisy. **Static, no animated aurora.**

| Surface | Treatment |
|---|---|
| **Login / Landing** | Blueprint grid + corner brand glow behind the card (static) |
| **Dashboard hero / page headers** | Faint blueprint grid, masked so it never competes with content |
| **Empty / success states** | Gentle static gradient; a single one-shot success animation on "Won" is OK |
| **All work screens** (List, BOM, Cost, SCM, Approval, forms, tables) | Flat surfaces — no background treatment |

- Technique: layered `radial-gradient` (glow) + two 1px `linear-gradient` grids on a 32–34px cell, with a `mask-image` radial fade. **No looping animation, no aurora/beams.**

## 4. Micro-interactions (the "alive" feel, used sparingly)

| Interaction | Spec |
|---|---|
| **Card hover** | translateY(-3px) + shadow step, `motion-fast` |
| **KPI count-up** | numbers tick from 0 on first view (~600ms), once; reduced-motion → final value instantly |
| **Staggered reveal** | cards/tiles fade+rise on mount, 40ms stagger, `motion-base` |
| **Skeleton shimmer** | left→right sweep while loading |
| **Button press** | scale 0.98 active; primary has soft glow on hover |
| **Tab / route switch** | 8px fade-slide, `motion-base` |
| **Stage tracker** | fill animates when status advances; spring |
| **Toast** | slide-in + spring; errors persist |
| **Status pill (filter)** | tint deepen on hover; pressed = solid |

## 5. Animation library policy — Aceternity (selective use only)

Aceternity UI is built for **landing pages, marketing sites, SaaS showcase pages** — rich Framer-Motion spectacle. **Do NOT adopt it as our design system.** This is an enterprise data product (RFQs, large tables, forms, approvals, documents, 8-hour daily usage). **Steal the micro-interactions, not the overall style.**

**✅ Use selectively** (re-implement via Framer Motion / shadcn, themed to our tokens): command palette · empty states · loading skeletons · subtle page/route transitions · dialog animations · toast animations · hover effects · AI-assistant panel animation · search experience.

**❌ Avoid entirely:** aurora backgrounds · spotlight effects · moving borders · 3D cards · infinite moving cards · hero parallax · background beams · sparkles · floating dock navigation.

> Our background is the **static blueprint grid** (§3), not an aurora — deliberately, per this policy.

## 6. Rules & accessibility
- Animate only `transform` / `opacity`. No layout-thrashing animations.
- **`prefers-reduced-motion: reduce`** disables ambient backgrounds, count-ups, staggers, springs → instant/opacity-only.
- No infinite looping motion on work screens; no motion that conveys required information (WCAG 2.3.3).
- Performance: ambient layers `will-change` sparingly; pause when tab hidden.

## Claude Design brief
> Add a modern visual layer: **card variants** (flat, elevated, interactive hover-lift, feature with a gradient top-border, stat/KPI, full-gradient hero, bento tile). Use a **bento grid** (varied tile sizes on one grid, biggest number top-left) for the **dashboard** and overview — never for tables/forms. Add **tasteful ambient background animation** (slow gradient aurora) only on **login, dashboard hero, and empty/success** screens; keep all dense work screens flat and fast. Micro-interactions: card hover lift, KPI count-up, staggered card reveal, skeleton shimmer, button press, tab fade-slide, stage-tracker fill. Everything honors `prefers-reduced-motion`. Light default, dark supported, WCAG AA.
