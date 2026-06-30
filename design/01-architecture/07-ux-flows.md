# 07 · UX Flows — Canonical RFQ Process (single source of truth)

> **This table is the system-of-record for the flow.** All screen/component docs reference it, so the three process sources never drift.
> **Authority:** the **process-flow image** is the authoritative MAIN flow (`assets/process-flow.png`); the wireframe MD supplies screen/state detail; the PPTX supplies document codes.
> **Cross-refs:** [04 · Journeys](../00-foundations/04-user-journeys.md) · [08 · Role matrix](08-role-visibility-matrix.md) · [17 · StatusBadge](../03-components/17-status-badge.md) · [Screens](../04-screens/)

---

## A. Image step-blocks → 12-step mapping

The image organizes the process into **6 visual step-blocks**; they map 1:1 onto the granular 12 steps:

| Image step-block | Granular steps | Owner(s) |
|---|---|---|
| **STEP 1** — BD first contact | 2–4 | BD |
| **STEP 2** — Engineering Working Sheet + CFT Review | 5–7 | Engineering, CFT |
| **STEP 3** — SCM Processing | 8 | SCM |
| **STEP 4** — Costing (Estimation) | 9 | Estimation |
| **STEP 5** — Review & Approval | 9r | Estimation + CEO/COO + BD |
| **STEP 6** — BD send & follow-up | 10–12 | BD |

## B. Status state machine (MD §5.1)

**8 forward states:**
```
Open → In Engineering Review → In CFT Review → In SCM Sourcing →
In Estimation → Pending Approval → Quote Submitted → Order Received
```
**Branches & terminals:**
```
[Completeness = No] ─────────────▶ Returned to BD ──(resubmit)──▶ In Engineering Review
[Approval = Not OK] ─────────────▶ In Estimation (loop, notes persist)
[Customer decision] Order Received(Won) · Regretted · Lost · Closed/Hold   (terminal)
```
> Forward states render as a numbered, ordered **stage tracker** on Overview. Loop-backs are real states but are **not** drawn as a 9th forward step — they surface as a reverse-arrow / state note on the relevant stage (MD §4.4).

## C. The 12-step flow

| # | Block | Owner | Screen / action | Captures / produces | Status before → after |
|---|---|---|---|---|---|
| 1 | — | Customer | RFQ arrives (email/portal/letter) — *not a screen* | Raw RFQ package | — → *(not in system)* |
| 2 | 1 | BD | **New Enquiry** | rfqNumber, rfqReceivedDate, customer, location, contacts, SOW, businessType, rfqDescription, noOfParts, customerDueDate, FileAgo link | *(new)* → **Open** |
| 3 | 1 | BD | New Enquiry → **Save & Acknowledge Customer** | Ack email + NotificationLog | Open |
| 4 | 1 | BD | New Enquiry → **Save & Notify Engineering** | CFT + Engineering notified w/ link + summary | Open → **In Engineering Review** |
| 5 | 2 | Engineering | Parts & BOM → **Completeness check** (gate) | Yes/No on drawings, specs, tolerances, special-process notes | No → **Returned to BD** · Yes → stays In Engineering Review |
| 6 | 2 | Engineering | Parts & BOM → **BOM editor** | Product BOM (materials) + Process BOM (operations) | In Engineering Review |
| 6a | 2 | Engineering | Classification toggle | Material / Standard / Subcon / Special Process / Consumables | — |
| 6b | 2 | Engineering | `MandatoryFieldInput` | Customer-specific requirement per line — "None specified" or a value, **never blank** | — |
| 6c | 2 | Engineering | SME Consultation Log | discipline, SME, question, response, open/resolved — against the line | — |
| 7 | 2 | CFT (Eng+Quality+SCM+Production) | **CFT Feasibility** | Manufacturability, risk rating, tolerance/quality risk, **four-party sign-off** | In Engineering Review → **In CFT Review** → **In SCM Sourcing** |
| 8 | 3 | SCM | SCM RM & OS → **Contracted check** (8a, line-level gate) | Contracted / New Enquiry per line | In SCM Sourcing |
| 8 | 3 | SCM | SCM RM & OS → **Quote fields** (New Enquiry lines) | supplier, pricePerUnit, MOQ, leadTimeDays, SAP code, quoteDate | In SCM Sourcing |
| 9 | 4 | Estimation | **Cost Sheet** | 6-stage build-up: material → outsource/special → conversion → tooling → overheads → margin | In SCM Sourcing → **In Estimation** → **Pending Approval** |
| 9r | 5 | Estimation + CEO/COO + BD | **Approval** | Committee OK/Not OK + meeting notes, then L1→L2→Final sign-off | Not OK → **In Estimation** (loop) · OK → **Quote Submitted** |
| 10 | 6 | BD | Overview → **Send Quotation** | Approved quote (RA-MKT-F-04) + delivery timeline | **Quote Submitted** |
| 11 | 6 | BD | Overview → **Follow-up** | Calls/emails to check decision | Quote Submitted |
| 11 | 6 | BD | Overview → **Outcome** | Final customer decision | Won → **Order Received** · else **Regretted / Lost / Closed-Hold** |
| 12 | 6 | BD | **Enquiries List** | Outcome reflected back; full history preserved | *(terminal)* |

## D. Decision gates (build as real gates, not free-text status)

1. **Completeness check** (step 5, Parts & BOM) — RFQ-level. "No" returns to BD **with the missing items attached**, not a silent flag (MD §3.2).
2. **Contracted-item check** (step 8a, SCM RM & OS) — **line-level**. Blocks saving a quote on any line still flagged *New Enquiry* with no supplier/quoteDate — an **API-level rejection**, not just a UI warning (MD §5.4).
3. **Approval decision** (step 9r, Approval) — *Not OK* routes to **In Estimation** (clean re-edit), not Pending Approval; meeting notes persist across the loop (MD §3.2).
4. **Customer decision** (step 11, Overview) — four explicit outcomes (Won/Regretted/Lost/Closed), never collapsed to a binary (MD §3.2).

## E. Detail the image makes explicit (must appear in the screens)

- **Engineering Working Sheet activities (STEP 2):** Technical Drawing Review · Customer Requirement Review · Product BOM · Process BOM · Material/Item Classification · Process Mapping · Cycle Time Analysis · Tooling Details · Qualification Requirements · Customer-Specific Requirements · SME Consultation.
- **Revision Management:** every change = a new revision — Revision No, Changed By, Date/Time, Changed Fields, Old→New Value, Reason — with auto-notification to impacted teams.
- **SCM contract gate (STEP 3):** Verify Eng inputs → check existing approved supply contracts → *Material/Process available?* **Yes** = use existing contract · **No** = create new supplier RFQ → send to suppliers → receive quotes → evaluate & select best → send RM + special-process costs (with lead times) to Costing.
- **Automatic Impact Analysis:** a change in Engineering Revision / Supplier Price / Lead Time / Quantity / Process / Specification flags affected areas (SCM, Costing, Tooling, Lead Time, Delivery) and auto-notifies → this is what sets **`isStale`** and drives **cost recalculation**.
- **Approval Workflow (STEP 5):** committee review "Is the quote OK?" (Estimation + CEO/COO + BD) **then** formal sign-off **L1 Dept/Section Head → L2 CEO/COO → Final Approval**.
- **Cross-cutting (Key Features + Audit Trail footer):** end-to-end traceability · complete revision history · audit trail on every action (who / what / when / why / old-vs-new / attachments / auto-notifications) · dashboard & reports.

## F. Notification triggers (MD §3.3) — fire at department-boundary handoffs

| Notification | Fires at |
|---|---|
| `RFQ_RECEIVED_TO_ENGINEERING` | Step 4 — BD "Notify Engineering" |
| `MISSING_DETAILS_QUERY` | SCM raises a query (RM & OS) **or** Engineering returns an RFQ via completeness check |
| `BOM_REVISED` | Any BOM / RM & OS change the revision hook detects → also sets `isStale: true` on referencing cost sheets |
| `QUOTE_FOR_REVIEW` | Step 9 — Estimation completes build-up; enters Pending Approval |
| `QUOTE_DISPATCHED` | Step 10 — BD sends the quotation |

> `BOM_REVISED` is the only trigger that doesn't push a person to a screen — it raises a flag Estimation must notice on its next Cost Sheet visit. This is why stale rows must be **visibly** surfaced (amber).

## G. SOP document codes (PPTX — traceability)
**RA-MKT-R-01** = Enquiry Register (Enquiries List / New Enquiry) · **RA-MKT-F-09** = Info-to-SCM / Cost Sheet · **RA-MKT-F-04** = Quotation (Send Quotation).

## H. Source reconciliation (resolved — no open gaps in the flow)
1. **Approval model — resolved (image STEP 5):** committee review → sequential **L1 → L2 → Final**. The Approval screen models both. *(was: committee vs. sequential ambiguity.)*
2. **Outcomes — resolved:** adopt the wireframe's **4 distinct** terminal states (Won/Regretted/Lost/Closed) over the deck's binary, for richer BD reporting.
3. **Responsive — resolved:** desktop-first (internal workstation users, MD §8); tablet/mobile = graceful degradation, low priority. *(detailed in `05-responsive/`.)*
