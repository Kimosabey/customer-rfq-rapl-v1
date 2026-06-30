# 21 · Base Components

> **Cross-refs:** [16 · Overview](16-component-library-overview.md) · [Design system](../02-design-system/) · [14 · Accessibility](../02-design-system/14-accessibility-wcag22.md)
> Themed wrappers over **shadcn/ui + Radix**. Each lists variants, key states, and the primitive it maps to. All consume **semantic tokens**; all ship empty/loading/error where relevant.

## Universal states (every interactive component)
`default · hover · focus-visible (2px --ring +2 offset) · active/pressed · disabled · loading · error` — plus `selected` where applicable. Skeletons for content loads; inline messages for errors.

## Form & input

| Component | Variants | Notes / a11y | Radix/shadcn |
|---|---|---|---|
| **Button** | primary · secondary · outline · ghost · **destructive** (`--destructive-strong` for white text) · link; sizes sm/md/lg; `loading`, `iconLeft/Right` | One primary per view; `aria-busy` when loading | shadcn Button (+CVA) |
| **IconButton** | same variants | **requires** `aria-label` + tooltip | Button + Tooltip |
| **Input / Textarea** | default · error · disabled · readOnly | label above; helper/error below; `aria-describedby` | shadcn Input |
| **Select** | single; with search → Combobox | typeahead; keyboard; labeled | Radix Select / Combobox |
| **Checkbox / RadioGroup / Switch** | default/checked/indeterminate/disabled | role+state exposed | Radix |
| **Toggle / ToggleGroup** | single/multi; used by classification 5-way & risk Low/Med/High | `aria-pressed`; arrow nav | Radix Toggle |
| **DatePicker** | single; min/max | text-entry fallback; labeled | shadcn + Radix Popover |
| **FormField/Label** | — | wraps label+control+helper+error; binds RHF + Zod | shadcn Form |

## Layout & surfaces

| Component | Notes | Maps to |
|---|---|---|
| **Card** | elevation-1; header/body/footer slots | div + tokens |
| **Tabs** | workspace sub-nav + in-screen tabs; arrow-nav; active = brand accent | Radix Tabs |
| **Dialog** | focus trap, Esc, scrim, restore focus; elevation-3 | Radix Dialog |
| **Drawer / Sheet** | side panel (filters, line detail on tablet) | Radix Dialog (side) |
| **Popover / DropdownMenu** | menus, row actions; elevation-2 | Radix |
| **Tooltip** | truncation + icon-button labels; delay 300ms | Radix Tooltip |
| **Toast** | success/info/warning/error; `aria-live`; errors persist | Radix Toast |
| **Breadcrumb** | workspace header path | nav + links |

## Data & feedback

| Component | Notes | Maps to |
|---|---|---|
| **DataTable** | sticky header, sortable, density toggle, pagination/virtualization, row selection, per-row actions, empty/loading/error | **TanStack Table** + shadcn Table |
| **Pagination** | page size + range; keyboard | shadcn |
| **Badge** | neutral/semantic; base for StatusBadge | shadcn Badge |
| **Avatar** | user menu, changed-by | shadcn Avatar |
| **Skeleton** | content placeholders (rows, cards, timeline) | shadcn Skeleton |
| **EmptyState** | icon + title + description + primary action; per-screen copy | custom |
| **CommandPalette (⌘K)** | global search + jump-to + actions; role-filtered | shadcn Command (cmdk) |

## Domain-flavored base (composed, used across screens)

| Component | Purpose | Notes |
|---|---|---|
| **StageTracker** | the 8-state forward tracker on Overview | ordered, numbered; loop-back = reverse-arrow note; not a 9th step |
| **KpiTile** | Overview metric tiles | label + value + optional trend; links to source tab |
| **NotificationItem** | one `NotificationLog` entry | type icon + summary + deep link + time; read/unread |
| **RoleBadge** | shows current role | text + neutral color |

## Conventions
- **CVA** for variants; `cn()` for class merge; `forwardRef` for all controls.
- Controlled + RHF-compatible (`value`/`onChange`, `name`, `ref`).
- No hardcoded color/spacing — tokens only.
- Each component gets a Storybook-style states matrix during build (not in this docs pass).

## Claude Design brief
> Build a calm, dense enterprise component set on shadcn/ui + Radix. Buttons (primary indigo, destructive red, secondary/outline/ghost), labeled inputs with helper/error below, Radix-based selects/toggles/checkboxes, cards with subtle elevation, tabs with a brand-accent active indicator, accessible dialogs/drawers/popovers/tooltips, toasts (4 severities), and a powerful data table (sticky header, sortable, density toggle, pagination, row actions, designed empty/loading/error). Add a ⌘K command palette, an 8-step stage tracker, KPI tiles, and notification list items. Every control has visible focus, full keyboard support, and uses the design tokens — light default, dark fully supported.
