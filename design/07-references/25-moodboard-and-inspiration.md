# 25 · Moodboard & Inspiration

> **Cross-refs:** [02 · UX Research](../00-foundations/02-competitive-ux-research.md) · [09 · Color](../02-design-system/09-color-system.md)
> **Rule:** borrow **patterns**, never visuals. Every reference resolves to our tokens + Rangsons brand. Dribbble is a *moodboard* source, not a template.

## Direction in one line
**Enterprise dashboard density + restrained polish** — Linear/Stripe information density, Vercel/Notion calm, a small deliberate indigo accent on a neutral canvas. Light by default, fully dark-capable.

## Reference brands (primary inspiration)

| Brand | What to study | Our application |
|---|---|---|
| **Linear** | Status pipeline, ⌘K palette, keyboard-first, muted density | Enquiries List, status pills, global nav |
| **Stripe Dashboard** | Financial tables — grouped sections, subtotals, tabular numerals, money alignment | Cost Sheet `CostBuildupTable` |
| **Vercel** | Frame whitespace, neutral surfaces, crisp focus rings, minimal chrome | App shell, forms |
| **Notion** | Calm type scale, content-first, side detail/peek | Master-detail BOM editor |
| **Arc** | Sidebar workspaces, subtle context-switch motion | Enquiry workspace tabs |

## Dribbble search plan (capture URL + screenshot + take/avoid for each pick)

| Search query | Looking for | Maps to |
|---|---|---|
| `enterprise dashboard` | Shell, nav, KPI tiles | App shell, Enquiry Overview |
| `B2B SaaS data table` | Dense tables, filters, density toggle | Enquiries List |
| `ERP / procurement dashboard` | Sourcing, supplier quote capture | SCM RM & OS |
| `approval workflow UI` | Review + sign-off chains | Approval (L1→L2→Final) |
| `status pipeline / kanban` | Stage trackers, status legends | Overview stage tracker, StatusBadge |
| `audit log timeline` | Change history, source badges | Revision Log timeline |
| `cost estimate / quotation UI` | Cost roll-ups, totals | Cost Sheet |
| `BOM / parts table` | Parts list + line editor | Parts & BOM |

> **Capture template per reference:** `URL · thumbnail · one-line "what we take" · one-line "what we avoid"`. Store thumbnails in `assets/moodboard/` when collected.

## Take / Avoid (the filter)

**Take** — density without clutter · text+color status pills · master-detail editing · sticky headers + subtotal rows · timeline history · command palette · designed empty/loading/error states.

**Avoid** — marketing gradients & hero art · color-only meaning · over-rounded "card soup" · novelty nav · decorative motion · low-contrast ghost text.

## Brand anchor & logo usage
Two lockups (both set the brand colors — **indigo `#2E3192`**, **red `#EC1D23`**):
- **Horizontal lockup** — `assets/rangsons_logo.png` → top bar (expanded), Login/Landing, wide headers, documents/PDF.
- **Emblem mark** — `assets/rangsons-logo-mark.png` (source `rangsons-logo2.png`) → favicon, collapsed sidebar rail, avatar/app icon, compact & mobile.
- **On dark/gradient surfaces:** place on a **white chip** (as in the sidebar) or use a white/mono version *(asset to be produced)* — the navy wordmark must never sit directly on a dark fill.

Inspiration adjusts layout & interaction patterns; it never overrides the brand or the validated palette in [09 · Color](../02-design-system/09-color-system.md).
