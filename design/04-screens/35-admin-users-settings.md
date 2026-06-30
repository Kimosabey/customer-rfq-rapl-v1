# 35 · Admin — Users & Cost Settings

> **Routes:** `/admin/users` · `/admin/settings` · **Access:** Admin only. **Flow:** setup (feeds Cost Sheet rates).
> **Cross-refs:** [24 · Flow](24-end-to-end-screen-flow.md) · [08 · Roles](../01-architecture/08-role-visibility-matrix.md) · [32 · Cost Sheet](32-cost-sheet.md)

## Purpose
One Admin area, **two tabs** — both are Admin-only, low-frequency screens that don't earn separate top-level nav (MD §4.11). Cost Settings is the literal UI for the requirement that overhead %, margin %, and machine/labour rates are **Admin-configurable, not hardcoded** (MD §5.5).

## Layout / anatomy
```
Admin
[ Users ] [ Cost Settings ]                                   ← tabs
── Users tab ─────────────────────────────────────────────────
 [🔍 search]                                   [ + Add user ]
 Name        Email             Role        Status   ⋯
 Ravi K.     ravi@…            Engineering Active   (edit/deactivate)
 …
── Cost Settings tab ─────────────────────────────────────────
 Overhead %  [ 12.5 ]   Margin %  [ 15 ]
 Machine rate (₹/hr) [ … ]   Labour rate (₹/hr) [ … ]   per process row
 [ Save settings ]   (changes apply to NEW cost sheets)
```

## Key elements
- **Users tab:** table (name, email, **role**, status), search, **+ Add user**, per-row edit / deactivate. Role assignment here is what server-side login resolves ([27](27-login.md)).
- **Cost Settings tab:** overhead %, margin %, machine rate, labour rate (per process/category as needed). A note clarifies changes apply to **new** cost sheets (existing sheets recalc only via their Recalculate action).
- Both tabs gated to Admin; nothing here for other roles.

## States
- Users: list · empty (seed admin only) · add/edit dialog · validation error (duplicate email) · deactivate confirm · loading.
- Settings: loaded · editing (dirty) · saving · saved toast · validation (numeric ranges, % bounds) · error.

## Responsive
- Desktop: full table + form grid. Tablet/mobile: table scrolls-x or becomes cards; settings form single-column; tabs become a select.

## Accessibility
- Tabs = Radix Tabs (arrow-nav, `aria-selected`). User table per DataTable a11y. Settings form: labeled numeric inputs with units, `aria-describedby` helper, error summary on save.
- Destructive **Deactivate** uses a confirm dialog + text label (not color alone). WCAG 2.2 AA.

## Frontend mapping
- Radix Tabs; Users = TanStack Table + add/edit Dialog (RHF+Zod); Settings = RHF+Zod numeric form → mutation; settings feed the Cost Sheet rate lookups ([32](32-cost-sheet.md)).

## Claude Design brief
> An Admin area with **two tabs**: **Users** and **Cost Settings**. Users tab: a searchable table (name, email, role, status) with an "Add user" button and per-row edit/deactivate (confirm on deactivate). Cost Settings tab: numeric fields for **Overhead %**, **Margin %**, and **machine/labour rates** (with units), a Save button, and a note that changes apply to new cost sheets. Both Admin-only. Include empty, add/edit dialog, validation, and saved states. Light default, dark supported, WCAG AA.
