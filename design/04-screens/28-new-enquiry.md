# 28 · New Enquiry  (BD intake)

> **Route:** `/enquiries/new` · **Access:** BD, Admin. **Flow:** steps 2–4. **Doc code:** writes the register `RA-MKT-R-01`.
> **Cross-refs:** [24 · Screen flow](24-end-to-end-screen-flow.md) · [07 · Flows steps 2–4](../01-architecture/07-ux-flows.md) · [19 · MandatoryFieldInput](../03-components/19-mandatory-field-input.md) · [11 · Layout](../02-design-system/11-spacing-grid-layout.md)

## Purpose
Log a new RFQ and kick off the workflow. Grouped into **three cards** because steps 1–4 are conceptually three actions — *log it · describe it · attach the package* — even though done in one sitting (MD §4.3).

## Layout / anatomy
```
Enquiries › New Enquiry
┌ Card 1 · RFQ details ─────────────────────────────────────┐
│ RFQ number*  Received date*  Customer*  Location           │
│ Contact name  Contact email  Contact phone  Business type* │
└────────────────────────────────────────────────────────────┘
┌ Card 2 · Scope & description ─────────────────────────────┐
│ Scope of work (SOW)*   RFQ description   No. of parts*     │
│ Customer due date*                                         │
└────────────────────────────────────────────────────────────┘
┌ Card 3 · Drawing package ─────────────────────────────────┐
│ FileAgo link*   (ℹ no upload — links only, Phase 1)        │
└────────────────────────────────────────────────────────────┘
        [ Save & Acknowledge Customer ]   [ Save & Notify Engineering ]
```

## Key elements
- **Three grouped cards**, labels above inputs, 12-col internal grid.
- **FileAgo link** — required; the **only** "file" field anywhere. A note heads off the assumption of an upload button (binary storage is out of Phase 1, MD §1.2/§4.3).
- **Two distinct save actions** (kept separate, not one "Submit" — MD §4.3):
  - **Save & Acknowledge Customer** → ack email (`NotificationLog`); stays `Open`.
  - **Save & Notify Engineering** → notifies CFT + Engineering; status `Open → In Engineering Review` + `RFQ_RECEIVED_TO_ENGINEERING`.

## Fields (required marked *)
`rfqNumber* · rfqReceivedDate* · customerName* · location · contactName · contactEmail · contactPhone · businessType* · sow* · rfqDescription · noOfParts* · customerDueDate* · fileAgoLink*` (MD §3.1 step 2).

## States
- Empty (new) · validating (inline) · **per-field errors** (required, email format, link format, date sanity) · saving (per-action `aria-busy`) · save-success toast + redirect to Overview · partial save (Acknowledge done, Notify pending — both actions remain available) · duplicate RFQ number warning.

## Responsive
- Desktop: two-column fields within cards. Tablet/mobile: single column, cards stack, action buttons stack full-width and stick to bottom.

## Accessibility
- Each input visibly labeled + required in text + `aria-required`; errors via `aria-describedby`; error summary on submit (3.3.1/3.3.3).
- **3.3.7 Redundant entry:** customer/contact carried forward; never re-asked later in the flow.
- Two primary-ish actions are clearly distinguished by label (not color alone); confirm dialog on "Notify Engineering" (irreversible handoff). WCAG 2.2 AA.

## Frontend mapping
- React Hook Form + Zod (full schema incl. URL + date refinements); shadcn Form/Input/Select/DatePicker; two submit handlers (acknowledge vs notify) → TanStack Query mutations; optimistic status + toast; redirect to `/enquiries/:id`.

## Claude Design brief
> A BD intake form titled "New Enquiry", organized into **three cards**: (1) RFQ details — RFQ number, received date, customer, location, contacts, business type; (2) Scope & description — scope of work, description, number of parts, customer due date; (3) Drawing package — a single **FileAgo link** field with a note that there's no file upload (links only). Labels above inputs, inline validation. Two distinct footer buttons — **Save & Acknowledge Customer** and **Save & Notify Engineering** — not one submit. Required fields marked in text. Include empty, validating, error, and saving states. Light default, dark supported, WCAG AA.
