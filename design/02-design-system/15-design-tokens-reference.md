# 15 · Design Tokens Reference

> **Cross-refs:** [09 · Color](09-color-system.md) · [10 · Type](10-typography.md) · [11 · Spacing](11-spacing-grid-layout.md) · [12 · Elevation & Motion](12-elevation-and-motion.md)
> **Scope note:** this is the **token specification** (names + values). Actual `globals.css` / Tailwind v4 `@theme` files are **deferred** to the token-build phase — this doc is what they will encode.

## Naming convention
- **Primitive** tokens describe a raw value: `--neutral-500`, `--space-4`, `--text-body`, `--radius-md`.
- **Semantic** tokens describe a role and map to a primitive (and flip per theme): `--background`, `--foreground`, `--primary`, `--ring`, `--destructive`, `--st-*`.
- Components reference **semantic** tokens only. Pattern: `--{role}` / `--{role}-foreground` / `--{role}-hover` / `--{role}-active`.
- Tailwind v4 exposes them via `@theme inline` so utilities read `bg-primary`, `text-muted-foreground`, `border-input`, `ring-ring`.

## Color tokens
Full light + dark mapping (with contrast ratios) lives in [09 · Color](09-color-system.md) §4–§6. Summary of the semantic set:

```
--background --foreground --card --card-foreground --popover --popover-foreground
--muted --muted-foreground --border --input --ring
--primary --primary-foreground --primary-hover --primary-active --primary-accent(dark)
--secondary --secondary-foreground --accent --accent-foreground
--destructive --destructive-foreground --destructive-strong
--success --warning --info  (+ each *-50 tint)
--st-open --st-engineering --st-cft --st-scm --st-estimation
--st-pending --st-submitted --st-won --st-returned --st-lost --st-closed
```

## Spacing tokens
`--space-0 0 · 1 4 · 2 8 · 3 12 · 4 16 · 5 20 · 6 24 · 8 32 · 10 40 · 12 48 · 16 64` (px). See [11](11-spacing-grid-layout.md).

## Radius tokens
`--radius-sm 4 · --radius-md 8 · --radius-lg 12 · --radius-full 9999` (px).

## Typography tokens
`--font-sans` (Inter) · `--font-mono` (Geist Mono).
`--text-display 30/36 · --text-h1 24/32 · --text-h2 20/28 · --text-h3 16/24 · --text-body 14/20 · --text-sm 13/18 · --text-xs 12/16`.
Weights: `--fw-regular 400 · --fw-medium 500 · --fw-semibold 600`. See [10](10-typography.md).

## Elevation / z-index / motion tokens
`--elevation-0..3`, `--elevation-overlay`; `--z-sticky 10 · --z-dropdown 1000 · --z-overlay 1100 · --z-modal 1200 · --z-popover 1300 · --z-toast 1400 · --z-tooltip 1500`; `--motion-fast 120ms · --motion-base 200ms · --motion-slow 280ms` + easings. See [12](12-elevation-and-motion.md).

## Layout tokens
`--topbar-h 56 · --sidebar-w 240 · --sidebar-w-collapsed 64 · --workspace-header-h 56 · --tabstrip-h 44 · --content-max 1440 · --gutter 24` (px).

## Theme strategy (spec)
- `:root` = light values (default). `.dark` = dark overrides. Toggled by `next-themes` on `<html>`.
- Only **semantic** tokens flip between themes; primitives are constant.
- shadcn/ui token names are a **subset** of the semantic set above, so its components inherit the system with zero overrides.

## Component-token bridge (examples — full per-component in `03-components/`)
| Component | Reads tokens |
|---|---|
| Button (primary) | `--primary`, `--primary-foreground`, `--primary-hover`, `--ring` |
| StatusBadge | `--st-*`, soft tint + `-800` text |
| CostBuildupTable stale row | `--warning-50` bg + `--warning` left border |
| Input | `--background`, `--input`, `--ring`, `--foreground`, `--muted-foreground` |
