# 16 · Component Library Overview

> **Cross-refs:** [Design system](../02-design-system/) · [Screens](../04-screens/) · [21 · Base components](21-base-components.md)
> Components are the bridge between the design system and the screens. Every component: references **semantic tokens** only, ships **all states**, and is **WCAG 2.2 AA**.

## Layers

```
shadcn/ui + Radix primitives        ← accessible base (Button, Input, Dialog, Tabs, Select, Table, Toast…)
        ▲
Base components (21)                 ← our themed wrappers + conventions
        ▲
Domain components (17–20)            ← the 4 RFQ-specific shared components (MD §5)
        ▲
Screen compositions (04-screens)     ← pages assembled from the above
```

## The four domain components (MD §7.2 / §5)

| Component | File | Used on | One-line behavior |
|---|---|---|---|
| **StatusBadge** | [17](17-status-badge.md) | List, Overview, every tab header | RFQ status enum → fixed text+color pill; never free text, never color-only |
| **RevisionTimeline** | [18](18-revision-timeline.md) | BOM line detail, Revision Log page | Vertical timeline old→new, source badge, recalc flag; same component, different query scope |
| **MandatoryFieldInput** | [19](19-mandatory-field-input.md) | BOM editor, RM & OS eng. fields | Two-state toggle that **cannot render blank**; "None specified" or a required value |
| **CostBuildupTable** | [20](20-cost-buildup-table.md) | Cost Sheet | Fixed 6-stage grouped table + subtotals; amber stale rows; read-only except Recalculate |

## Standard documentation shape (every component doc)
1. **Purpose** + where it's used (cite flow/screen).
2. **Anatomy** (ASCII or part list).
3. **Variants** & **states** (default, hover, focus, active, disabled, loading, error, empty, selected).
4. **Props / API** (TypeScript interface).
5. **Accessibility** (roles, keyboard, aria).
6. **Tokens** consumed.
7. **Implementation mapping** (shadcn/Radix primitive).
8. **Claude Design brief** (paste-ready).

## Cross-cutting conventions
- **States are mandatory:** no component is "done" until empty/loading/error are designed (skeletons, not spinners, for content).
- **Controlled + RHF-friendly:** form components accept `value`/`onChange`, integrate with React Hook Form + Zod.
- **Composition over config:** prefer small composable parts (shadcn pattern) over mega-props.
- **Density-aware:** components respect the comfortable/compact density setting where applicable.
- **Theme-agnostic:** never theme-conditional in component code; tokens flip via `.dark`.

## Inventory (base — see [21](21-base-components.md))
Button · IconButton · Input · Textarea · Select · Combobox · Checkbox · RadioGroup · Switch · Toggle/ToggleGroup · DatePicker · Label/FormField · Card · Tabs · Dialog · Drawer/Sheet · Popover · DropdownMenu · Tooltip · Toast · Badge · Avatar · Breadcrumb · Pagination · Skeleton · EmptyState · DataTable (TanStack) · CommandPalette (⌘K) · StageTracker · KpiTile · NotificationItem.
