# 04 · User Journeys

> **Cross-refs:** [07 · UX Flows](../01-architecture/07-ux-flows.md) (the canonical step table) · [03 · Personas](03-personas.md)
> Journeys are the **human story over the 12-step flow**; the flow doc is the system-of-record table. Steps cite `flow step N`.

## J0 · Happy path (one RFQ, end to end)

```
Customer → BD logs & acknowledges → Engineering completeness ✓ → BOM built →
CFT feasibility ✓ → SCM sources & quotes → Estimation builds cost →
Committee review ✓ → L1 → L2 → Final approval ✓ → BD sends quote → Won → recorded
```

## J1 · BD — intake & close (steps 2–4, 10–12)
1. Opens **Enquiries List**, clicks **+ New Enquiry** (visible only to BD/Admin).
2. Fills three grouped cards (RFQ details · scope · drawing package / FileAgo link) → **Save & Acknowledge Customer** (ack email) → **Save & Notify Engineering** (status → *In Engineering Review*).
3. *(later, after approval)* On **Enquiry Overview**: **Send Quotation** (RA-MKT-F-04) → **Follow-up** → records **Outcome** (Won/Regretted/Lost/Closed).
- **Emotion:** relief that nothing can fall through the cracks; the two separate save buttons match how she actually works.

## J2 · Engineering — completeness & BOM (steps 5–6)
1. Opens **Parts & BOM**. Above the parts list: the **completeness gate**.
   - **No** → RFQ returns to BD *with missing items attached* (status → *Returned to BD*).
   - **Yes** → proceeds.
2. In the master-detail editor, classifies each line (5-way), fills the **mandatory customer requirement** (can't be blank), logs **SME consultations** inline.
- **Emotion:** confidence the BOM is complete and on the record; revision history is right there.

## J3 · CFT — feasibility (step 7)
1. Opens **CFT Feasibility**; the four parties (Eng/Quality/SCM/Production) record assessment + **risk rating**; four-party sign-off advances status → *In CFT Review → In SCM Sourcing*.

## J4 · SCM — sourcing (step 8)
1. Opens **SCM RM & OS** (split Engineering | SCM columns).
2. **Contracted-item check** per line → *Contracted* (use existing) or *New Enquiry* (RFQ suppliers).
3. For New Enquiry lines: supplier, price/unit, MOQ, lead time, SAP code, quote date. **Gate:** can't save a quote on a New-Enquiry line missing supplier/date.
4. Raises **Missing-Detail Queries** to Engineering without leaving the screen.

## J5 · Estimation — costing & review (step 9 / 9r)
1. Opens **Cost Sheet**; the **six-stage build-up** rolls up with subtotal rows. **Stale rows** (amber) signal a recalculate is needed.
2. Completes → status *Pending Approval*; joins **Approval** review with CEO/COO + BD.

## J6 · CEO/COO — approval (step 9r, image STEP 5)
1. Opens **Approval**: reads meeting notes + the number → committee **OK / Not OK**, then formal **L1 → L2 → Final** sign-off.
   - **Not OK** → status loops to *In Estimation*; notes persist so Estimation sees exactly what was flagged.
   - **OK / Final** → status *Quote Submitted*.

## J7 · Admin — setup (ongoing)
1. **Admin → Users:** manage roles. **Admin → Cost Settings:** overhead %, margin %, machine/labour rates → feed new cost sheets.

## Cross-cutting micro-journeys
- **"Why did this number change?"** → open **Revision Log** timeline → see old→new, who, when, why, source badge.
- **A handoff fires** → recipient gets a notification (toast + notification center) linking straight to the owed screen (`RFQ_RECEIVED_TO_ENGINEERING`, `MISSING_DETAILS_QUERY`, `BOM_REVISED`, `QUOTE_FOR_REVIEW`, `QUOTE_DISPATCHED`).
