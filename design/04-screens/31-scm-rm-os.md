# 31 · SCM RM & OS  (Raw Material & Outsourcing)

> **Route:** `/enquiries/:id/rm-os` · **Access:** SCM (others read engineering fields). **Flow:** step 8 (incl. 8a gate). **Doc code:** RA-MKT-F-09.
> **Cross-refs:** [24 · Flow](24-end-to-end-screen-flow.md) · [07 · Flows §D gate 2](../01-architecture/07-ux-flows.md) · [19 · MandatoryFieldInput](../03-components/19-mandatory-field-input.md)

## Purpose
SCM sources raw material & special processes. The **split-column layout** (Engineering-provided | SCM-to-complete) directly mirrors the schema's `engineering`/`scm` split and the Excel "to be updated by…" columns — the one place keeping the familiar Excel pattern is a *feature* (MD §4.7).

## Layout / anatomy
```
SCM RM & OS — RA-2026-0142
┌ per BOM line ──────────────────────────────────────────────────────────┐
│ ENGINEERING (read)            │ SCM (edit)                              │
│ material / process · spec ·   │ Contracted check:  ( Contracted )       │
│ qty · customer requirement    │                    ( New Enquiry )  ←8a │
│                               │ ── if New Enquiry ──                    │
│                               │ supplier · price/unit · MOQ ·           │
│                               │ lead time (days) · SAP code · quote date│
└───────────────────────────────┴──────────────────────────────────────────┘
┌ Missing Detail Queries → Engineering ─────────────────────────────────┐
│ raise a query without leaving this screen                              │
└────────────────────────────────────────────────────────────────────────┘
```

## Key elements
- **Split columns** per line: Engineering fields (read) | SCM fields (edit).
- **Contracted-item check (8a) — a HARD GATE, line-level** (MD §5.4): each line tagged *Contracted* (use existing approved contract) or *New Enquiry* (RFQ suppliers). **A quote cannot be saved on a "New Enquiry" line with no supplier or quote date** — an **API-level rejection**, not just a UI warning. Styled as a gate above the quote fields.
- **Quote fields** (New Enquiry lines): supplier, pricePerUnit, MOQ, leadTimeDays, SAP code, quoteDate (image STEP 3: send RFQ → receive quotes → select best).
- **Missing Detail Queries** card → addressed to Engineering, on the same screen (`MISSING_DETAILS_QUERY`); no need to leave the view.
- Saving a quote updates costs downstream and fires `BOM_REVISED` if it changes a referenced value.

## States
- Per line: unsourced (contracted check unset) · Contracted · New-Enquiry-incomplete (**save blocked**, gate visible) · New-Enquiry-complete · saved.
- Screen: loading · empty (no BOM yet — awaiting Engineering) · all lines sourced (ready to send costs to Costing → `In Estimation`) · read-only for non-SCM.
- Query card: none · open · resolved.

## Responsive
- Desktop: two-column split per line in a table/cards. Tablet/mobile: columns stack (Engineering above SCM); per MD §9 the split may collapse to single column once real field counts settle.

## Accessibility
- Contracted check = labeled radiogroup; the **save gate** surfaces a clear text error explaining exactly which lines block the save (3.3.1/3.3.3).
- Read-only Engineering column clearly marked non-editable; SCM column labeled inputs.
- Money/lead-time numeric, tabular. WCAG 2.2 AA.

## Frontend mapping
- TanStack Query per RFQ lines; RHF+Zod with a **refinement enforcing the contracted-item gate** (mirrors the API rule so the UI blocks before the PATCH); Radix RadioGroup for the check; query card as a sub-form mutation.

## Claude Design brief
> An SCM sourcing screen with a **split layout per BOM line**: left = read-only Engineering fields (material/process, spec, qty, customer requirement); right = SCM-editable fields. Start each line with a **Contracted vs New Enquiry** check. For "New Enquiry" lines reveal supplier, price/unit, MOQ, lead-time (days), SAP code, and quote date. **Block saving** a quote on a New-Enquiry line that's missing supplier or date, with a clear error listing the offending lines. Add a "Missing Detail Queries → Engineering" card on the same screen. Include empty (awaiting BOM), incomplete-blocked, complete, and read-only states. Light default, dark supported, WCAG AA.
