# 00 · Product Vision

> **Cross-refs:** [01 · Goals](01-business-and-user-goals.md) · [03 · Personas](03-personas.md) · [07 · UX Flows](../01-architecture/07-ux-flows.md)
> **Sources:** PPTX (SOP), `AeroQuote-UIUX-Documentation.md` (MD §1–2), process-flow image.

## Vision statement

> A single, auditable workspace that carries a customer RFQ from first contact to a won-or-lost outcome — replacing the email-and-Excel relay across six departments with one shared record where **nothing is lost, every change is traceable, and the price that reaches the customer has been validated.**

## The problem today

Rangsons Aerospace receives RFQs from customers like **Boeing, HAL, and BEL** (PPTX slide 3). Each RFQ is worked manually through **six departments in sequence** (PPTX slide 2) using an Excel Enquiry Register (`RA-MKT-R-01`), shared spreadsheets, and email handoffs. This causes:

- **Lost context at handoffs** — drawings, customer-specific requirements, and supplier quotes live in separate files; a downstream team can't see why an upstream value changed.
- **Silent mandatory-field gaps** — customer-specific requirements get skipped in Excel (MD §5.2), surfacing late as costly rework.
- **Stale costing** — when an engineering revision or supplier price changes, the cost sheet doesn't know it's out of date (MD §4.8).
- **No single status** — "where is this RFQ right now?" requires asking people, not opening a screen.

## Target outcome

| From (Excel relay) | To (this platform) |
|---|---|
| Status known by asking | One **glanceable status** per RFQ (8-state machine) |
| Changes untracked | **Append-only revision log** — who/what/when/why/old→new (image: audit trail) |
| Mandatory fields skippable | **Cannot save blank** customer-requirement fields (MD §5.2) |
| Costing goes stale silently | **Auto impact analysis** flags stale rows + recalculation (image) |
| Quote sent without full review | **Committee review → L1→L2→Final** approval before send (image STEP 5) |

## Scope — Phase 1

**In:** the full 12-step RFQ→Quotation workflow across 7 roles; the 11 screens; revision history; notifications; role-based access; admin-configurable cost rates (MD §4.11).

**Out (Phase 1):** binary file storage — drawings live in **FileAgo**, the platform stores **links only** (MD §4.3, §1.2). No customer-facing portal; all users are internal.

## North-star & guardrails

- **North star:** RFQ turnaround time (days from received → quote submitted), with zero lost RFQs and a complete audit trail on every one.
- **Guardrails:** every cross-department handoff is traceable; no quote is sent without passing the approval gate; accessibility is WCAG 2.2 AA.
