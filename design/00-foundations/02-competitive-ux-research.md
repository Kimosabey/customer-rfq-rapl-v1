# 02 · Competitive & UX Research

> **Cross-refs:** [25 · Moodboard](../07-references/25-moodboard-and-inspiration.md) · [09 · Color](../02-design-system/09-color-system.md)
> Goal: borrow proven **patterns** for a dense B2B workflow tool — never visuals. Everything resolves to our tokens + Rangsons brand.

## Landscape — analog products

| Category | Examples | What we learn |
|---|---|---|
| **CPQ / quoting** | Salesforce CPQ, SAP CPQ, PandaDoc | Multi-stage cost build-up, approval chains, quote versioning — our Cost Sheet + Approval mirror this |
| **ERP RFQ / sourcing** | SAP Ariba, Coupa, Zycus | Supplier-quote capture, contracted-vs-new sourcing, audit trails — our SCM RM & OS screen |
| **PLM / engineering** | Arena, Windchill | BOM editors, revision control, where-used impact — our Parts & BOM + Revision Log |
| **Modern B2B SaaS** | Linear, Stripe Dashboard, Vercel, Notion, Height | Density with calm; status pipelines; keyboard-first; restrained color |

## Reference brands → what we adopt

| Brand | Pattern we take | Applied to |
|---|---|---|
| **Linear** | Status pipeline, ⌘K command palette, keyboard-first, quiet density | Enquiries List, global nav, status pills |
| **Stripe Dashboard** | Financial tables: grouped rows, subtotals, right-aligned numerals, money formatting | Cost Sheet (`CostBuildupTable`) |
| **Vercel** | Restraint, generous frame whitespace, neutral surfaces, crisp focus states | App shell, forms |
| **Notion** | Calm typography, content-first layout, side peek/detail | Master-detail BOM editor |
| **Arc** | Sidebar workspace + subtle motion on context switches | Enquiry workspace tabs |

## Dribbble — moodboard search plan

Mined as inspiration only (captured in [25 · Moodboard](../07-references/25-moodboard-and-inspiration.md) with URLs + take/avoid):
`enterprise dashboard` · `B2B SaaS data table` · `ERP / procurement dashboard` · `admin panel` · `approval workflow UI` · `status pipeline / kanban` · `audit log timeline` · `cost estimate / quotation UI` · `BOM / parts table`.

## What we take / what we avoid

**Take:** information density without clutter · status as text+color pills · master-detail for record editing · sticky table headers + subtotal rows · timeline for history · command palette for power users · empty/loading/error states designed, not afterthoughts.

**Avoid:** marketing-site gradients & hero imagery · color-only status · dense tables crammed into cards · novelty navigation · decorative motion · light-gray-on-white "ghost" text that fails contrast.

## Research conclusions (drive the design)

1. **Neutral-first, brand-scarce** — color earns attention only on actions, focus, and status.
2. **The table is the product** — invest most in the list, cost sheet, and BOM editor.
3. **Make the process legible** — a stage tracker + revision timeline turn an invisible workflow into a visible one.
4. **Gates over warnings** — model mandatory fields and contracted-item checks as states that block, matching the spec's API-level gates.
