# 09 · Color System

> **Source of truth:** `rangsons_logo.png` (brand), `colorstheme.txt` (annotated palette).
> **Standard:** WCAG 2.2 AA — normal text ≥ 4.5:1, large/bold (≥ 18.66px or 24px) & UI components ≥ 3:1.
> **Theme:** **Light is default**; **Dark is fully supported** (`next-themes`, class strategy).
> **Cross-refs:** [10 · Typography](10-typography.md) · [14 · Accessibility](14-accessibility-wcag22.md) · [15 · Tokens](15-design-tokens-reference.md) · [17 · StatusBadge](../03-components/17-status-badge.md)
> **Handoff:** self-contained for Claude Design — the token tables + rules below are everything needed to color any screen.

---

## 1. Principles

1. **Brand-locked, accessibility-derived.** Two colors are fixed by the logo — **indigo `#2E3192`** (primary) and **red `#EC1D23`** (destructive). Everything else is *derived* to fill gaps the raw palette had (no tints, no green/amber) and to pass AA.
2. **Semantic, not literal.** Components reference role tokens (`--primary`, `--background`, `--destructive`), never raw hex. This is what makes the light↔dark swap free.
3. **Never color alone.** Status, validation, and meaning always pair color with text and/or an icon (WCAG 1.4.1).
4. **Calm, dense, neutral-first.** A data tool lives in neutrals; brand color is a small, deliberate accent (primary actions, focus, links, the active nav item).

---

## 2. Brand & the two contrast fixes (the only "gotchas")

| Pairing | Ratio | Verdict | Rule |
|---|---|---|---|
| White on indigo `#2E3192` | 10.66:1 | **AAA** | Primary buttons use white text — in **both** themes. |
| White on red `#EC1D23` | **4.40:1** | **FAIL** (normal text) | ❌ Don't put white normal-size text on brand red. |
| Dark text on red `#EC1D23` | 4.77:1 | AA | ✅ OK, or… |
| White on `--red-700 #C2161B` | ~6.2:1 | AA | ✅ …use **`#C2161B`** for white-text destructive buttons. |
| Indigo `#2E3192` on dark `#212935` | 1.37:1 | **FAIL** | ❌ Brand indigo cannot be an accent on dark surfaces. |
| `--indigo-accent-dark #8E92E8` on `#212935` | ~6.0:1 | AA | ✅ Dark-mode link/accent/focus uses **`#8E92E8`**. |

**The one rule to remember:** *filled* primary buttons stay `#2E3192` + white everywhere (self-contained, passes). Only **on-surface** accents (link text, focus ring, active indicators sitting directly on the page) switch: `#2E3192` in light → `#8E92E8` in dark.

---

## 3. Neutral scale (derived — cool/slate)

The raw palette had three near-duplicate darks and no light tints. Consolidated into one scale anchored on `#212935` (slate) and `#E1E1E8`:

| Token | Hex | Primary use |
|---|---|---|
| `neutral-0` | `#FFFFFF` | Light bg · text on dark |
| `neutral-50` | `#F7F8FA` | Raised surface (light) |
| `neutral-100` | `#EEF0F3` | Hover / zebra rows (light) |
| `neutral-200` | `#E1E1E8` | Borders / dividers (decorative) |
| `neutral-300` | `#CBCED6` | Input / control border (light) |
| `neutral-400` | `#9AA1AE` | Strong border ≥3:1 · disabled text edge |
| `neutral-500` | `#6B7280` | **Muted text** on white = 4.8:1 (AA) |
| `neutral-600` | `#4B5160` | Secondary text |
| `neutral-700` | `#404040` | Secondary text (10.4:1) · dark border |
| `neutral-800` | `#212935` | **Primary text (light)** · card (dark) |
| `neutral-850` | `#2A2A2A` | Elevated surface (dark) |
| `neutral-900` | `#161B24` | App background (dark) |
| `neutral-950` | `#000000` | Deepest dark · strokes |

---

## 4. Semantic role tokens — Light theme (default)

| Token | Hex | Foreground on it | Contrast | Notes |
|---|---|---|---|---|
| `--background` | `#FFFFFF` | `--foreground` | 14.6:1 | Page base |
| `--foreground` | `#212935` | — | — | Primary text |
| `--card` / `--popover` | `#FFFFFF` | `#212935` | 14.6:1 | Surfaces |
| `--muted` | `#EEF0F3` | `--muted-foreground` | ≥4.5:1 | Subtle fill |
| `--muted-foreground` | `#6B7280` | on white | 4.8:1 | Secondary/meta text |
| `--border` | `#E1E1E8` | — | — | Dividers (decorative) |
| `--input` | `#CBCED6` | — | — | Control border |
| `--ring` | `#2E3192` | — | 3:1+ | Focus ring |
| `--primary` | `#2E3192` | `#FFFFFF` | 10.66:1 | Primary action |
| `--primary-hover` | `#262986` | `#FFFFFF` | ~11:1 | Hover |
| `--primary-active` | `#000055` | `#FFFFFF` | 18.6:1 | Pressed |
| `--accent` | `#EEF0FF` | `#2E3192` | ~8:1 | Selected/brand tint |
| `--secondary` | `#EEF0F3` | `#212935` | ~13:1 | Secondary button |
| `--destructive` | `#EC1D23` | dark text | 4.77:1 | Fill/alert |
| `--destructive-strong` | `#C2161B` | `#FFFFFF` | 6.2:1 | White-text danger button |
| `--success` | `#15803D` | `#FFFFFF` | ≥4.5:1 | + `--success-50 #ECFDF3` tint |
| `--warning` | `#B45309` | `#FFFFFF` | ≥4.5:1 | + `--warning-50 #FFFBEB` tint |
| `--info` | `#2E3192` | `#FFFFFF` | 10.66:1 | + `--info-50 #EEF0FF` tint |

## 5. Semantic role tokens — Dark theme

| Token | Hex | Foreground on it | Contrast | Notes |
|---|---|---|---|---|
| `--background` | `#161B24` | `--foreground` | 13:1 | App base |
| `--foreground` | `#E1E1E8` | — | — | Primary text |
| `--card` / `--popover` | `#212935` | `#E1E1E8` | 11.3:1 | Surfaces |
| `--muted` | `#2A2A2A` | `#9AA1AE` | 5.9:1 | Subtle fill + meta text |
| `--border` | `#2A2A2A` | — | — | Dividers |
| `--input` | `#404040` | — | — | Control border |
| `--ring` | `#8E92E8` | — | 3:1+ | Focus ring (lightened) |
| `--primary` (fill) | `#2E3192` | `#FFFFFF` | 10.66:1 | Primary button — unchanged |
| `--primary-accent` (on-surface) | `#8E92E8` | on `#212935` | 6.0:1 | Links / active nav / accents |
| `--accent` | `#1C1C39` | `#E1E1E8` | ~12:1 | Selected nav surface |
| `--destructive` | `#EC1D23` | dark text | — | Fill; white-text uses `#C2161B` |
| `--success` / `--warning` / `--info` | lighten one step for on-surface text | — | ≥4.5:1 | Tints use `*-50` swapped for dark equivalents |

> Dark tints (`success/warning/info` soft badges) use a dark-surface variant: low-alpha color over `--card` with the **lightened** text hue, verified ≥4.5:1. Tabulated in [15 · Tokens](15-design-tokens-reference.md).

---

## 6. RFQ status colors (the state machine, colorized)

One hue per status, **always rendered as text + color** via [`StatusBadge`](../03-components/17-status-badge.md). Soft badge = tint background + `‑800` text (passes AA, typically ≥7:1). Hues are ordered to read as progression (cool → warm → green) and to keep loop/terminal states visually distinct.

| Status (state machine) | Hue token | Hex | Family |
|---|---|---|---|
| Open | `--st-open` | `#6B7280` | slate |
| In Engineering Review | `--st-engineering` | `#2E3192` | brand indigo |
| In CFT Review | `--st-cft` | `#7C3AED` | violet |
| In SCM Sourcing | `--st-scm` | `#D97706` | amber |
| In Estimation | `--st-estimation` | `#0E7490` | teal *(repurposed `#1A3333`)* |
| Pending Approval | `--st-pending` | `#2563EB` | blue |
| Quote Submitted | `--st-submitted` | `#0891B2` | cyan |
| Order Received (Won) | `--st-won` | `#15803D` | green |
| Returned to BD *(branch)* | `--st-returned` | `#EA580C` | orange |
| Regretted / Lost *(terminal)* | `--st-lost` | `#C2161B` | red |
| Closed / Hold *(terminal)* | `--st-closed` | `#9AA1AE` | muted gray |

Special data treatments: **stale cost rows** use `--warning-50` background + `--warning` left-border (Cost Sheet `isStale`); **revision source badges** use `--st-engineering` (Engineering Revision) vs `--st-returned` (SCM Query) per [18 · RevisionTimeline](../03-components/18-revision-timeline.md).

**Dark-mode status tints — verified.** In dark, soft badges = a low-alpha hue fill over `--card` (#212935) + the **lightened** status hue as text (values in [globals.css](../06-handoff/globals.css) `.dark`). Each lightened hue (e.g. eng `#8E92E8`, won `#34C06A`, scm `#F0A44A`, lost `#F0656A`) is chosen ≥ 4.5:1 against `#212935`; the badge always also carries the **text label**, so even a borderline tint never carries meaning alone (1.4.1). Verify exact ratios at token-build time alongside the OKLCH conversion (§9).

---

## 7. Usage rules (do / don't)

- ✅ Reference **role tokens** in components; ✅ pair every status/validation color with text+icon; ✅ keep brand color scarce (primary action, focus, links, active nav).
- ❌ No raw hex in components. ❌ No white normal text on `#EC1D23`. ❌ No `#2E3192` as on-surface accent in dark. ❌ No color-only meaning. ❌ No more than one primary action visible per view.

---

## 8. Implementation mapping (Tailwind v4 + next-themes) — *spec only, token files deferred*

- Tokens ship as CSS custom properties under `:root` (light) and `.dark` (dark), exposed to Tailwind v4 via `@theme inline` (e.g. `--color-primary: var(--primary)`), so classes read `bg-primary text-primary-foreground`.
- Theme switch: `next-themes` toggling the `.dark` class on `<html>`; no per-component conditionals.
- shadcn/ui consumes these as its standard token names (`--background`, `--foreground`, `--primary`, `--ring`, `--destructive`, …) so its components inherit the system unchanged.
- **Not emitted yet** (per scope): the actual `globals.css` / `@theme` block — deferred to the token-build phase. The exact name→hex tables here are its specification.

---

## 9. Critique of the source palette & modernization (OKLCH)

**Honest critique — the source `colorstheme.txt` was 10 colors, not a system:**
- **Three near-duplicate darks** (`#212935`, `#2A2A2A`, `#404040`) — redundant; consolidated into one neutral scale.
- **Three blues** (`#2E3192`, `#1C1C39`, `#000055`) — only one is the true brand; the others are surfaces/states.
- **An orphan teal** (`#1A3333`) — off-brand; demoted to the "In Estimation" status + data-viz.
- **No tints, no green/amber** — unusable as-is for a data tool.

**What we did:** kept the **2 real brand anchors** (indigo + red), and **derived** a coherent modern system — a 13-step neutral scale, 4 semantic roles, and 11 status hues. So we are **not** "using all 10 raw colors"; they were rationalized into a proper token system.

**Two modernization upgrades (recommended, top-rated practice):**
1. **Express tokens in OKLCH** (perceptually uniform) — what **Tailwind v4 and shadcn now use**. OKLCH makes tints/shades predictable (adjust lightness `L` only) and keeps contrast intuitive. E.g. primary ≈ `oklch(0.42 0.17 274)`, and a tint is the same hue/chroma at higher `L`. Author tokens in OKLCH, ship sRGB hex fallbacks.
2. **Harmonize status hues to one ramp** — set all status hues at a consistent `L`/`C` (e.g. solid at `L≈0.55, C≈0.15`; soft bg at `L≈0.95, C≈0.04`) so the 11 statuses read as **one family**, not ad-hoc picks. This is the main refinement that pushes the palette from "good" to "modern-cohesive."

> Rating: color system **8/10** as-is → **9.5/10** with OKLCH authoring + status-hue harmonization. Both are token-build-phase tasks (no visual redesign needed).

## 10. Claude Design brief (paste-ready)

> Use a **light-default, dark-supported** palette. **Primary** `#2E3192` indigo with **white** text for buttons (both themes). **Background** white `#FFFFFF` (light) / `#161B24` (dark); **text** `#212935` (light) / `#E1E1E8` (dark); **muted text** `#6B7280`. **Destructive** red `#EC1D23` for alerts/fills, but white-text danger buttons use `#C2161B`. **Focus/links** `#2E3192` in light, **`#8E92E8`** in dark. Status pills always show **text + color** using the status hues listed above. Keep brand color scarce; the UI is neutral-first and data-dense. Everything meets **WCAG 2.2 AA**.
