# 10 · Typography

> **Cross-refs:** [09 · Color](09-color-system.md) · [11 · Spacing](11-spacing-grid-layout.md) · [15 · Tokens](15-design-tokens-reference.md)
> Calm, dense, highly legible — built for long table sessions. Inspired by Linear/Stripe restraint.

## Typefaces — **Geist** (primary), Inter (fallback)

| Role | Family | Why |
|---|---|---|
| **UI / body** | **Geist Sans** (`next/font`, variable) | Vercel's product typeface — modern, geometric-humanist, excellent UI metrics; matches our Vercel/Linear direction |
| **Numerals (money, qty)** | Geist with `font-variant-numeric: tabular-nums` | Columns of figures align; no jitter in the Cost Sheet |
| **Mono (codes, IDs)** | **Geist Mono** | RFQ numbers, SAP codes, document codes (RA-MKT-…) read unambiguously; pairs natively with Geist Sans |

Sans stack: `"Geist","Geist Sans", Inter, ui-sans-serif, system-ui, "Segoe UI", Roboto, sans-serif`.
Mono stack: `"Geist Mono", ui-monospace, "SF Mono", Menlo, monospace`.
**Why Geist over Inter:** more current/distinctive, purpose-built for product UI, and pairs perfectly with Geist Mono — while Inter (kept as fallback) guarantees identical metrics if Geist fails to load. Both are free, variable, self-hosted via `next/font` (no layout shift).

## Type scale (8-pt rhythm, 1.25 ratio, rem-based)

| Token | Size / line-height | Weight | Use |
|---|---|---|---|
| `text-display` | 30 / 36 | 600 | Rare — empty-state hero, login title |
| `text-h1` | 24 / 32 | 600 | Page title (e.g. RFQ number header) |
| `text-h2` | 20 / 28 | 600 | Section / card title |
| `text-h3` | 16 / 24 | 600 | Sub-section, tab heading |
| `text-body` | 14 / 20 | 400 | **Default** — body, table cells, inputs |
| `text-body-strong` | 14 / 20 | 500 | Emphasis, labels |
| `text-sm` | 13 / 18 | 400 | Secondary/meta, helper text |
| `text-xs` | 12 / 16 | 500 | Badges, captions, table column headers (uppercase) |
| `text-mono` | 13 / 18 | 400 | Codes, IDs, supplier SAP codes |

> Base UI size is **14px** (not 16) — deliberate for an information-dense internal tool. Minimum readable size is **12px** (badges/captions only). Body text never goes below 14px.

## Responsive / fluid type
- **Headings scale fluidly** with `clamp()` so they shrink gracefully on small screens without breakpoints:
  - `--text-display: clamp(28px, 4vw + 8px, 40px)`
  - `--text-h1: clamp(22px, 3vw, 28px)`
  - `--text-h2: clamp(20px, 2.4vw, 24px)`
- **Body, table, input, button text stay fixed** (14/13/12) across breakpoints — fixed sizing keeps data tables and forms predictable and dense; only display/headings flex.
- **UI element fonts:** controls (buttons, inputs, tabs) keep 13–14px at all sizes; **do not shrink controls** on mobile (hurts tap targets) — instead controls grow min-height to ≥40px on touch.
- **Table cells:** 14px comfortable / 13px compact; may drop to 13px on tablet to fit more columns before switching to horizontal scroll.
- All sizes in **rem** so browser zoom + user font-size settings are respected (WCAG 1.4.4 / 1.4.10).
- Line-height loosens slightly on small screens for readability; line length capped ~72ch for prose.

## Weights
400 regular · 500 medium (labels, emphasis) · 600 semibold (headings, primary buttons). No 700+ in UI; reserve bold for the rare display.

## Usage rules
- **One H1 per screen** (the page/RFQ title).
- **Table headers:** `text-xs`, 500, uppercase, `--muted-foreground`, letter-spacing 0.04em.
- **Money & quantities:** tabular numerals, right-aligned, 2 decimals for currency.
- **Labels:** `text-body-strong`; helper/error text `text-sm` below the field.
- **Truncation:** single-line ellipsis for long customer/part names in cells, with full value in a tooltip (Radix Tooltip).
- **Line length:** body prose capped ~72ch; table cells unconstrained.

## Accessibility (WCAG 2.2)
- Sizes in **rem** → respect user zoom; layout must survive 200% zoom (1.4.4) and 400% reflow (1.4.10).
- Never convey meaning by weight/style alone.
- Contrast for every text token is governed by [09 · Color](09-color-system.md) (body `#212935`/`#E1E1E8`, muted `#6B7280` = 4.8:1).
- `letter-spacing`, `word-spacing`, `line-height` overrides must not break layout (1.4.12).

## Implementation mapping (spec only)
- Load Inter + Geist Mono via `next/font` (self-hosted, no layout shift).
- Expose scale as Tailwind v4 `--text-*` theme tokens; `font-variant-numeric: tabular-nums` as a `.tabular` utility used on numeric cells.
