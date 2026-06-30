# 29 · Parts & BOM  (Engineering)

> **Route:** `/enquiries/:id/parts` · `/bom/:bomLineId` · **Access:** Engineering (others read). **Flow:** steps 5–6 (incl. 6a–c).
> **Cross-refs:** [24 · Flow](24-end-to-end-screen-flow.md) · [19 · MandatoryFieldInput](../03-components/19-mandatory-field-input.md) · [18 · RevisionTimeline](../03-components/18-revision-timeline.md) · [07 · Flows §D gate 1](../01-architecture/07-ux-flows.md)

## Purpose
Engineering's workspace: decide **completeness**, then build the **Product + Process BOM** with classification, the mandatory customer requirement, and the SME log — all on one screen (SME is "not a separate stage", MD §6c).

## Layout / anatomy
```
[ Completeness check ]  Are drawings, specs, tolerances & special-process notes complete?
   ( ◉ Yes  ○ No → returns to BD with missing items )        ← RFQ-level GATE, above the list
┌ Parts list (master) ┬ BOM line editor (detail) ───────────────────────┐
│ ▸ Part A  (5 lines) │ Category · Classification (5-way toggle)          │
│   Part B  (3 lines) │ Material/Process spec · feasibility comments      │
│   + Add part        │ Customer-Specific Requirement  [MandatoryFieldInput]│
│                     │ ── SME Consultation Log (inline) ──               │
│                     │ ── Revision history (RevisionTimeline · part) ──  │
└─────────────────────┴───────────────────────────────────────────────────┘
```

## Key elements
- **Completeness gate** (above the list — it gates the whole RFQ, MD §4.5): **No** → status `Returned to BD` **with the missing items attached** (`MISSING_DETAILS_QUERY`), not a silent flag.
- **Master-detail:** parts left, selected line's full editor right (chosen over one long table so classification logic stays legible, MD §4.5).
- **Classification = 5-way toggle** (not dropdown — the choice is consequential and should stay visible): **Material · Standard · Subcon · Special Process · Consumables** (6a). Drives which fields render and how SCM/Estimation treat the line.
- **Customer-Specific Requirement** = [`MandatoryFieldInput`](../03-components/19-mandatory-field-input.md) — cannot be blank (6b).
- **SME Consultation Log** (inline panel): discipline, SME name, question, response, open/resolved (6c).
- **Revision history** ([`RevisionTimeline`](../03-components/18-revision-timeline.md), `part` scope) under the editor — see prior changes without navigating away.
- Engineering Working-Sheet activities surfaced (07 §E): drawing review, requirement review, process mapping, cycle time, tooling, qualification reqs.

## States
- **Completeness unset** (must decide before BOM edit is meaningful) · Yes (editing) · No (returned banner).
- Parts list: empty ("No parts yet — add the first") · loading skeleton.
- Editor: no line selected (prompt) · editing · validation errors (esp. mandatory requirement) · saving · saved (revision created → `BOM_REVISED`, marks dependent cost rows stale).
- Read-only for non-Engineering roles.

## Responsive
- Desktop: side-by-side master-detail. Tablet/mobile: list collapses; selecting a line opens the editor in a Sheet/drawer; SME log + revisions become accordions.

## Accessibility
- Completeness gate = labeled radiogroup; "No" opens a required "missing items" field (3.3.3).
- Classification toggle = `ToggleGroup` (`aria-pressed`, arrow-nav).
- Master list = listbox/tree semantics; selection drives the detail region (`aria-controls`).
- Mandatory field per [19]; SME log entries are an ordered list; revision history per [18]. WCAG 2.2 AA.

## Frontend mapping
- Master-detail via nested routes (`/parts` + `/bom/:bomLineId`); TanStack Query per RFQ + per line; RHF+Zod editor (Zod enforces classification enum + mandatory requirement); ToggleGroup (Radix); save mutation triggers revision hook.

## Claude Design brief
> Engineering's BOM workspace. At the top, a **completeness gate**: "Are the customer's drawings/specs/tolerances complete?" Yes/No — choosing **No** returns the RFQ to BD with a required "what's missing" note. Below, a **master-detail** layout: a parts list on the left; on the right, the selected BOM line's editor with a **5-way classification toggle** (Material / Standard / Subcon / Special Process / Consumables), spec fields, a **customer-specific requirement field that can never be blank** (two-state: "None specified" or a required value), an inline **SME consultation log**, and a **revision history timeline** for that part. Include empty (no parts), no-selection, editing, error, and read-only states. Light default, dark supported, WCAG AA.
