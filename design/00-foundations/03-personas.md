# 03 · Personas

> **Cross-refs:** [04 · Journeys](04-user-journeys.md) · [08 · Role matrix](../01-architecture/08-role-visibility-matrix.md) · [07 · UX Flows](../01-architecture/07-ux-flows.md)
> Seven role-based personas (MD §6 / PPTX slide 8). All are **internal employees at desktop workstations** (MD §8) — this drives desktop-first design.

---

### P1 · Priya — Business Development (BD)
- **Owns:** first contact + closing the loop (flow steps 2–4, 10–12).
- **Goals:** log every RFQ so nothing is lost; acknowledge the customer fast; route to Engineering; record the final outcome.
- **Pains today:** RFQs scattered across inboxes; no single status; follow-up reminders live in her head.
- **Key screens:** Enquiries List, New Enquiry, Enquiry Overview (Send Quotation, Follow-up, Outcome), Approval (review).
- **Needs:** glanceable register, two distinct save actions (acknowledge vs notify), explicit four-way outcome.

### P2 · Ravi — Engineering
- **Owns:** completeness gate + Product/Process BOM (flow steps 5–6).
- **Goals:** decide if customer data is complete; build a correct, classified BOM; never leave a customer requirement blank.
- **Pains today:** Excel lets fields be skipped; SME conversations happen off-record.
- **Key screens:** Parts & BOM (master-detail editor, classification, `MandatoryFieldInput`, SME log), Revision Log.
- **Needs:** a gate that sends incomplete RFQs back to BD *with the missing items attached*; inline revision history.

### P3 · CFT — Cross-Functional Team (Eng + Quality + SCM + Production)
- **Owns:** feasibility & risk study (flow step 7). *A virtual team, not a staffed department.*
- **Goals:** judge manufacturability, tolerance/quality risk; four-party sign-off; a fast risk rating.
- **Key screens:** CFT Feasibility.
- **Needs:** a four-party sign-off layout and a Low/Med/High risk toggle that downstream roles can scan.

### P4 · Sahana — SCM (Sourcing & Procurement) ★
- **Owns:** supplier quotations for raw material & special processes (flow step 8). *Author of the source SOP.*
- **Goals:** check existing contracts first; only RFQ suppliers for new items; capture price/MOQ/lead-time/SAP code; flag missing inputs to Engineering.
- **Pains today:** an Excel "to-be-updated-by-SCM" column with no validation; back-and-forth emails for clarifications.
- **Key screens:** SCM RM & OS (split Engineering/SCM columns, contracted-item gate, missing-detail queries), CFT (read).
- **Needs:** a hard gate that blocks saving a quote on a "New Enquiry" line with no supplier/date.

### P5 · Karthik — Estimation
- **Owns:** the cost build-up & quotation document (flow step 9).
- **Goals:** roll up material→outsource→conversion→tooling→overheads→margin using configured rates; never quote a stale number.
- **Key screens:** Cost Sheet (`CostBuildupTable`), Approval.
- **Needs:** visible stale-row flags; a recalculate action; rates that come from Admin settings, not hardcoded.

### P6 · Meera — CEO / COO
- **Owns:** final approval (flow step 9r, image STEP 5).
- **Goals:** approve only competitive, profitable quotes; see the number and the notes, decide quickly.
- **Key screens:** Approval, Enquiries List (oversight), Enquiry Overview KPIs.
- **Needs:** a low-frequency, high-clarity OK/Not-OK with full context; the loop-back must start clean (Not OK → In Estimation).

### P7 · Admin
- **Owns:** users/roles + cost-rate settings (MD §4.11).
- **Goals:** keep access correct; configure overhead %, margin %, machine/labour rates.
- **Key screens:** Admin → Users, Admin → Cost Settings.
- **Needs:** one place, two tabs; changes that propagate to every new cost sheet.

---

## Shared traits (design implications)
- Desktop-first, mouse + keyboard, often two RFQs open in different tabs.
- Domain-expert users — favor **density and shortcuts** over hand-holding.
- Trust matters: they need to **see why** a value is what it is (revision history, source badges, audit trail).
