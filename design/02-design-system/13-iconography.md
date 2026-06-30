# 13 · Iconography

> **Cross-refs:** [12 · Motion](12-elevation-and-motion.md) · [17 · StatusBadge](../03-components/17-status-badge.md) · [14 · Accessibility](14-accessibility-wcag22.md)
> **Library:** **Lucide** (`lucide-react`) — single source; no mixed icon sets.

## Sizing & style
- Sizes: **16px** (inline w/ text, buttons), **20px** (nav, toolbar), **24px** (empty states, KPI tiles).
- Stroke 1.5–2px (Lucide default 2); align optical size to 14px body.
- Color inherits `currentColor` → follows text token; status icons take the status hue.
- Spacing: 8px (`space-2`) between icon and label.

## Semantic icon map (consistent meanings)

| Meaning | Lucide icon |
|---|---|
| Enquiries / register | `clipboard-list` |
| New enquiry | `file-plus` |
| Parts & BOM | `layers` / `list-tree` |
| CFT feasibility | `shield-check` |
| SCM / sourcing | `shopping-cart` |
| Cost sheet | `calculator` |
| Approval | `check-check` / `badge-check` |
| Revision log | `history` |
| Admin users | `users` |
| Settings / rates | `settings` |
| Notifications | `bell` |
| Search / command | `search` / `command` |
| Theme | `sun` / `moon` |

## Status & state icons (paired with text — never alone)

| State | Icon | Hue |
|---|---|---|
| Success / Won / resolved | `check-circle-2` | success |
| Warning / stale / returned | `alert-triangle` | warning |
| Error / Lost / blocked gate | `x-circle` | destructive |
| Info / pending | `info` / `clock` | info |
| Open query | `message-circle-question` | st-scm |
| Locked / required gate | `lock` | muted |
| Risk High/Med/Low | `flame` / `alert-triangle` / `circle` | st hues |

## Usage rules
- **Decorative icons:** `aria-hidden="true"`, no tab stop.
- **Icon-only buttons:** require `aria-label` + a tooltip (WCAG 4.1.2, 1.1.1).
- **Status icons** reinforce, never replace, the text label (WCAG 1.4.1).
- One icon = one meaning across the app; don't reuse `check` for both "done" and "selected" — use distinct icons.
- Keep icon usage sparse in tables (icon noise hurts scanning); prefer text + a single leading status dot.

## Implementation mapping (spec only)
- Import per-icon (`import { Bell } from "lucide-react"`) for tree-shaking.
- Wrap status icon+label in the `StatusBadge` component so the pairing is enforced structurally ([17](../03-components/17-status-badge.md)).
