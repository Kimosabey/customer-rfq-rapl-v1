# 12 · Elevation & Motion

> **Cross-refs:** [11 · Spacing](11-spacing-grid-layout.md) · [09 · Color](09-color-system.md) · [14 · Accessibility](14-accessibility-wcag22.md)
> Restraint: elevation communicates layering, motion communicates causality. Neither decorates.

## Elevation (shadow tokens)

Light theme uses soft shadows; dark theme uses **borders + lighter surfaces** instead of heavy shadows (shadows read poorly on dark).

| Token | Light | Dark | Use |
|---|---|---|---|
| `elevation-0` | none | none | Page, table rows |
| `elevation-1` | `0 1px 2px rgba(16,24,40,.06)` | 1px `--border` + `--card` | Cards, table container |
| `elevation-2` | `0 4px 8px -2px rgba(16,24,40,.10)` | `--neutral-850` surface + border | Dropdowns, popovers, sticky headers |
| `elevation-3` | `0 12px 24px -6px rgba(16,24,40,.14)` | `--neutral-850` + stronger border | Dialogs, command palette |
| `elevation-overlay` | `rgba(16,24,40,.40)` scrim | `rgba(0,0,0,.60)` scrim | Modal/drawer backdrop |

## Z-index scale
`base 0` · `sticky 10` (table headers, workspace header) · `dropdown 1000` · `overlay 1100` · `modal 1200` · `popover 1300` · `toast 1400` · `tooltip 1500`.

## Motion tokens

| Token | Duration | Easing | Use |
|---|---|---|---|
| `motion-instant` | 0ms | — | State toggles that must feel immediate |
| `motion-fast` | 120ms | `ease-out` | Hover, focus, small state changes |
| `motion-base` | 200ms | `cubic-bezier(.2,0,0,1)` | Dropdowns, tabs, accordions |
| `motion-slow` | 280ms | `cubic-bezier(.2,0,0,1)` | Dialogs, drawers, page/tab transitions |
| `motion-spring` | — | Framer spring `{stiffness:300,damping:30}` | Stage-tracker progress, toast enter |

## Motion patterns (Framer Motion, used sparingly)
- **Tab / workspace switch:** 8px fade-slide, `motion-base`.
- **Dialog / drawer:** scale-fade (0.98→1) + scrim fade, `motion-slow`.
- **Toast:** slide-in from top-right + spring; auto-dismiss 5s (errors persist).
- **Stage tracker:** animated fill when a status advances; reverse-arrow pulse once on loop-back.
- **Stale-row flag:** subtle background tint fade-in when `isStale` flips true (no looping animation).
- **List/table:** no row-level entrance animation (avoids jank at volume); skeletons instead of spinners.

## Rules
- Animate only `transform` and `opacity` (compositor-friendly).
- **No** infinite/looping/decorative motion; **no** parallax; **no** motion that conveys required information.
- Hover effects are enhancements; never the only affordance.

## Accessibility — reduced motion (WCAG 2.3.3)
- Respect `prefers-reduced-motion: reduce` → drop transforms/springs to opacity-only or 0ms; toasts/dialogs appear without slide.
- Provide it globally (a `useReducedMotion` hook gates Framer variants).
- Focus transitions stay instant and visible regardless.
