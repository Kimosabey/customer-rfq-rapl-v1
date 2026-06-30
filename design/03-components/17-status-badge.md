# 17 · StatusBadge

> **Used on:** Enquiries List, Enquiry Overview, every workspace tab header (MD §5).
> **Cross-refs:** [09 · Color §6](../02-design-system/09-color-system.md) · [07 · Flows §B](../01-architecture/07-ux-flows.md) · [13 · Icons](../02-design-system/13-iconography.md)

## Purpose
Render the **RFQ status enum** as a fixed text + color pill. **Never free text; never color alone** (WCAG 1.4.1). One status → one hue → one icon, identical everywhere.

## Anatomy
```
┌───────────────────────────┐
│ ● [icon] In SCM Sourcing  │   dot + optional icon + label
└───────────────────────────┘
   tint background · status-hue text/border · radius-sm · text-xs/500
```

## Status set (the 8 forward + branches/terminals)
`Open · In Engineering Review · In CFT Review · In SCM Sourcing · In Estimation · Pending Approval · Quote Submitted · Order Received · Returned to BD · Regretted · Lost · Closed/Hold`. Hue per status from [09 §6](../02-design-system/09-color-system.md).

## Variants
- **`soft`** (default): tint bg (`--st-*-50`) + `-800` text. For tables/inline.
- **`solid`**: status hue bg + white/dark text (verified ≥4.5:1). For the workspace header emphasis.
- **`outline`**: transparent bg + hue border + hue text. For dense rows.
- **Sizes:** `sm` (table rows, 20px) · `md` (headers, 24px).
- **`withDot`** (bool): leading status dot (always for `soft`/`outline` to carry color at small size).

## States
Static by default. **Interactive** only when used as a list quick-filter (List screen): adds hover (slightly deeper tint), `aria-pressed` selected (solid), and focus ring. Loading → `Skeleton` pill.

## Props (API)
```ts
type RfqStatus =
  | "open" | "in_engineering_review" | "in_cft_review" | "in_scm_sourcing"
  | "in_estimation" | "pending_approval" | "quote_submitted" | "order_received"
  | "returned_to_bd" | "regretted" | "lost" | "closed_hold";

interface StatusBadgeProps {
  status: RfqStatus;
  variant?: "soft" | "solid" | "outline";   // default "soft"
  size?: "sm" | "md";                         // default "sm"
  withDot?: boolean;                          // default true
  interactive?: boolean;                      // filter mode (List)
  selected?: boolean;                         // when interactive
  onClick?: () => void;
}
```
Label + hue + icon are derived from `status` via a single internal map — callers pass only the enum (prevents drift/free-text).

## Accessibility
- Renders text label always; color is redundant, not sole carrier (1.4.1).
- Non-interactive: `role="status"`-free plain text+visual (it's a label, not a live region).
- Interactive (filter): `<button aria-pressed>`, focus ring `--ring`, 24px+ target (2.5.8).
- Dot/icon are `aria-hidden`; the text is the accessible name.

## Tokens
`--st-*` (+ `-50` tints), `--radius-sm`, `--text-xs`, `--ring`. Dark mode swaps tint for a low-alpha hue over `--card` with lightened text (≥4.5:1).

## Implementation mapping
shadcn `Badge` base + a `statusConfig` map (`{label, hue, icon}`). CVA variants for soft/solid/outline × sm/md. In filter mode, compose with Radix Toggle semantics.

## Claude Design brief
> A small pill showing RFQ status as **text + color + a leading dot**. 12 statuses, each a distinct hue (Open=slate, In Engineering=indigo, CFT=violet, SCM=amber, Estimation=teal, Pending Approval=blue, Quote Submitted=cyan, Won=green, Returned=orange, Lost=red, Closed=gray). Default soft style = tint background + dark-of-hue text; solid style for emphasis. Never show color without the text label. On the list screen these double as clickable filter chips with a pressed/selected state.
