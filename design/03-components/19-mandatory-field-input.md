# 19 · MandatoryFieldInput

> **Used on:** BOM line editor (customer-specific requirement), SCM RM & OS engineering-side fields (MD §5, §5.2).
> **Cross-refs:** [07 · Flows step 6b](../01-architecture/07-ux-flows.md) · [14 · Accessibility](../02-design-system/14-accessibility-wcag22.md)

## Purpose
Enforce — at the **UI layer** — a field that has been silently skipped in the Excel process. It is **physically impossible to render a blank text box**: the user must explicitly choose "None specified by customer" **or** enter a real value (MD §5.2, enforced at three layers; this is the UI one).

## Anatomy
```
Customer-Specific Requirement *                       ← label (required, in text)
┌─────────────────────────────┐ ┌──────────────────┐
│ ◉ None specified by customer│ │ ○ Specify…       │  ← two-state toggle (one MUST be chosen)
└─────────────────────────────┘ └──────────────────┘
        (when "Specify" selected ▼)
┌──────────────────────────────────────────────────┐
│ e.g. Source: Boeing-approved mill; cert EN 10204  │  ← reveals required text field
└──────────────────────────────────────────────────┘
⚠ Enter the requirement or select "None specified".   ← error if neither/empty
```

## Behavior (the rule)
1. Initial state = **unset** (neither option chosen) → field is **invalid** until resolved.
2. **"None specified by customer"** → records an explicit sentinel value (not null/blank).
3. **"Specify requirement…"** → reveals a text input that **itself cannot be saved empty**.
4. Save is blocked while unset or while "Specify" is chosen but empty (Zod refinement + API rejection).

## Variants & states
- **States:** unset (invalid) · none-selected (valid) · specify-empty (invalid) · specify-filled (valid) · disabled (read-only for non-owning roles) · error.
- **Density:** comfortable / compact (inline in BOM table cell expands to this on focus).
- No "blank text box" state exists — by design.

## Props (API)
```ts
type MandatoryValue =
  | { kind: "none" }
  | { kind: "specified"; value: string };   // value is non-empty by construction

interface MandatoryFieldInputProps {
  label: string;
  value: MandatoryValue | null;             // null = unset (invalid)
  onChange: (v: MandatoryValue) => void;
  disabled?: boolean;
  error?: string;
  noneLabel?: string;       // default "None specified by customer"
  specifyLabel?: string;    // default "Specify requirement…"
}
```
Zod: `z.discriminatedUnion("kind", [...]).refine(v => v.kind==="none" || v.value.trim().length>0)`; form-level required (no `null`).

## Accessibility
- Toggle = `radiogroup` (Radix RadioGroup) with two radios → exposes selection state (4.1.2); arrow-key navigable.
- Revealed input is `aria-required`, labeled, error tied via `aria-describedby` (3.3.1/3.3.3).
- Required indicated in **text** ("*" + "required") not color alone.
- Error message names the fix ("Enter the requirement or select 'None specified'").

## Tokens
`--input`, `--ring`, `--destructive` (error border/text), `--muted-foreground` (helper), `--accent` (selected toggle).

## Implementation mapping
Radix RadioGroup (two options) + conditional shadcn `Input`/`Textarea`, wired to React Hook Form `Controller` with the Zod schema above. Reused as a controlled field anywhere a "customer requirement" appears.

## Claude Design brief
> A required field that can never be left blank. Show a label with a required marker, then a two-option toggle: **"None specified by customer"** and **"Specify requirement…"**. One must be selected. Choosing "Specify" reveals a text input that also can't be empty. If nothing is chosen (or "Specify" is empty), show an inline error: *"Enter the requirement or select 'None specified'."* Never render it as a plain empty text box. Disabled/read-only for roles that can't edit.
