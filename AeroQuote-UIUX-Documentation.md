# AeroQuote.AI — UI/UX Wireframe Documentation

**Companion to:** `AeroQuote-Wireframes.html` (interactive low-fidelity prototype) and `AeroQuote-Process-Flow.mermaid` (rendered end-to-end flow diagram)
**Source spec:** RFQ Platform Technical Design Document + RFQ-to-Quotation Process SOP
**Stage:** Wireframe / information-architecture pass — precedes visual design and component build

## 1. How to use this set of documents

The HTML file is a clickable prototype, not a static image set. Open it in a browser, use the **Viewing As** selector in the top bar to switch between the seven roles defined in Section 6 of the technical document, and use the left sidebar to move between every screen named in the routing table (Section 7.1). Menu items and create/approve buttons that a role shouldn't see disappear when that role is selected — this is the wireframe's way of proving out the access-control model before a single line of React is written. Every screen carries small red annotation notes that point back to the exact section of the spec that justifies a design decision (a mandatory field, a state-machine transition, a computed field, an append-only log).

Section 3 below — End-to-end process flow — is the connective tissue between the source SOP and the screens: it walks the full twelve-step journey of one RFQ and states, for every step, which screen owns it, what data it must capture, and which status transition fires. The `.mermaid` file renders the same journey as a diagram with explicit decision branches and loop-backs. Read the flow section before the screen specs if this is your first pass through the documentation — the screens were designed around that flow, not the other way around.

The visual language is deliberately a drafting-sheet aesthetic — graph-paper background, dashed-line input boxes, ink-navy structure, a single warning-red accent for callouts — rather than a polished UI skin. That's intentional at this stage: dashed borders read as "placeholder," solid borders read as "populated," and nothing here should be mistaken for a final visual design. It also fits the subject matter: this is, after all, a tool for an aerospace manufacturer.

## 2. Information architecture

The sitemap below mirrors Section 7.1 of the technical document exactly; nothing has been added or removed, only grouped for navigation. Engineering, CFT, SCM, Estimation, and Approval are not standalone destinations a user picks from a menu — they're tabs inside a single Enquiry workspace, because every one of those modules operates on the same RFQ and the same set of BOM lines, and a user constantly needs to glance at neighboring tabs (an Estimation user checking whether SCM's quote landed yet, for instance). Splitting them into separate top-level pages would force re-navigation for what's really one continuous review.

| Area | Screens | Primary role(s) |
|---|---|---|
| Account | Login | All |
| BD intake | Enquiries List, New Enquiry | BD, Admin (list is visible to all) |
| Enquiry workspace | Overview, Parts & BOM, CFT Feasibility, SCM RM & OS, Cost Sheet, Approval, Revision Log | Engineering, CFT, SCM, Estimation, CEO/COO, BD |
| Admin | Users, Cost Settings | Admin |

## 3. End-to-end process flow

This is the one thing the screen list by itself can't show: how a single RFQ actually moves through all eleven screens, in what order, through whose hands, and what happens automatically along the way. It follows the twelve steps and four stage-blocks defined in Section 2 of the SOP exactly, restated here as a UI flow rather than a process narrative, so that a developer can build navigation, redirects, and notification triggers without cross-referencing the SOP page by page. A rendered version of this same flow is provided separately as `AeroQuote-Process-Flow.mermaid`.

### 3.1 The flow, step by step

| # | Stage block | Owner | Screen / action | What gets captured or produced | Status before → after |
|---|---|---|---|---|---|
| 1 | Customer contact | Customer | — (RFQ arrives by email, portal, or letter; not a system screen) | The raw RFQ package | — → *(not yet in system)* |
| 2 | It starts with the customer | BD | New Enquiry | rfqNumber, rfqReceivedDate, customerName, location, contact details, SOW, businessType, rfqDescription, noOfParts, customerDueDate, FileAgo link | *(new)* → Open |
| 3 | It starts with the customer | BD | New Enquiry → "Save & Acknowledge Customer" | Acknowledgement email sent; NotificationLog entry | Open |
| 4 | It starts with the customer | BD | New Enquiry → "Save & Notify Engineering" | Drawings confirmed on FileAgo; CFT + assigned Engineering users notified with link + summary | Open → In Engineering Review |
| 5 | Engineering checks, then CFT assesses | Engineering | Parts & BOM → Completeness Check toggle | Yes/No decision on whether drawings, specs, tolerances, and special-process notes are complete | Yes: stays In Engineering Review · No: → Returned to BD |
| 6 | Engineering checks, then CFT assesses | Engineering | Parts & BOM → BOM line editor | Product BOM (materials) + Process BOM (operations); every line classified into one of 5 categories | In Engineering Review |
| 6a | — | Engineering | Parts & BOM → Classification toggle | Material List / Standard List / Subcon List / Special Process / Consumables — sets how SCM and Estimation treat the line downstream | — |
| 6b | — | Engineering | Parts & BOM → `MandatoryFieldInput` | Customer-Specific Requirement per line — explicit "None specified" or a real value, never blank | — |
| 6c | — | Engineering | Parts & BOM → SME Consultation Log panel | Discipline, SME name, question, response, open/resolved — logged against the specific BOM line, not a separate stage | — |
| 7 | Engineering checks, then CFT assesses | CFT (Eng + Quality + SCM + Production) | CFT Feasibility | Manufacturability assessment, risk rating, tolerance/quality risk notes, four-party sign-off | In Engineering Review → In CFT Review → In SCM Sourcing |
| 8 | SCM gets supplier quotations | SCM | SCM RM & OS → Contracted-item check (8a) | Contracted/New Enquiry tag per line | In SCM Sourcing |
| 8 (cont.) | SCM gets supplier quotations | SCM | SCM RM & OS → Quote fields | If New Enquiry: supplier, pricePerUnit, MOQ, leadTimeDays, SAP code, quoteDate recorded | In SCM Sourcing |
| 9 | Estimation | Estimation | Cost Sheet | Cost build-up: material → outsource → conversion → tooling → overheads → margin, using Settings-configured rates | In SCM Sourcing → In Estimation → Pending Approval |
| 9 (review) | Estimation | Estimation + CEO/COO + BD | Approval | OK / Not OK decision, meeting notes, reviewer sign-off per role | Not OK: → In Estimation (loop) · OK: → Quote Submitted |
| 10 | BD closes the loop | BD | Enquiry Overview → Send Quotation | Approved quotation document sent to customer with delivery timeline | Quote Submitted |
| 11 | BD closes the loop | BD | Enquiry Overview → Follow-up | Calls/emails customer to check on their decision | Quote Submitted |
| 11 (decision) | BD closes the loop | BD | Enquiry Overview → Outcome | Customer's final decision recorded | Won → Order Received · Rejected/other supplier → Regretted/Lost · Paused → Closed |
| 12 | BD closes the loop | BD | Enquiries List | Final outcome reflected back in the register — full history preserved | *(terminal)* |

### 3.2 Decision points and loops — what each one must do

Four moments in the flow are genuine branches, not just status labels, and each needs to be built as a real gate rather than a free-text status field a user could set incorrectly:

The **completeness check** (Step 5, Parts & BOM screen) is Engineering's gate on the entire RFQ. Answering "No" must redirect the enquiry back into BD's queue with the specific missing items attached, not just flip a status flag silently — BD needs to know *what* was incomplete, not just *that* it was.

The **contracted-item check** (Step 8a, SCM RM & OS screen) gates at the line level, not the RFQ level — different lines on the same RFQ can be Contracted while others are New Enquiry simultaneously. The screen must block a quote save on any line still flagged New Enquiry with no supplier or quoteDate set, exactly as Section 5.4 of the technical document specifies; this is an API-level rejection, not just a UI warning, so the wireframe's gate has to be backed by a real validation error if the PATCH is attempted directly.

The **approval decision** (Step 9 review, Approval screen) is the only three-party gate in the flow. "Not OK" must route the enquiry back to In Estimation, not Pending Approval, so the next pass starts from a clean cost-sheet edit rather than a re-review of the same numbers. The meeting notes field should persist across that loop so Estimation can see exactly what was flagged without a separate conversation.

The **customer decision** (Step 11, Enquiry Overview) is the only branch with more than two outcomes — Won, Regretted, Lost, or Closed/Hold are four distinct terminal-ish states, not a binary, and the UI should offer all four explicitly rather than collapsing "Lost" and "Closed" into one button, since BD's reporting depends on telling a competitive loss apart from a paused project.

### 3.3 What fires automatically at each handoff

Every transition above that crosses a department boundary should trigger a `NotificationLog` entry and email, per Section 3.11 of the technical document — this is system behavior, not a screen, but it belongs in the flow because a developer building the screens above needs to know which user action is the trigger:

| Notification type | Fired at |
|---|---|
| `RFQ_RECEIVED_TO_ENGINEERING` | Step 4 — BD's "Notify Engineering" action |
| `MISSING_DETAILS_QUERY` | Whenever SCM raises a query on the RM & OS screen, or Engineering returns an RFQ via the completeness check |
| `BOM_REVISED` | Any save on a BOM line or RM & OS record that the revision-log hook detects as changed (Section 5.3) — this is also what sets `isStale: true` on any cost sheet referencing that line |
| `QUOTE_FOR_REVIEW` | Step 9 — Estimation completes the cost build-up and the enquiry enters Pending Approval |
| `QUOTE_DISPATCHED` | Step 10 — BD sends the quotation to the customer |

This is also why the Cost Sheet screen needs to visibly surface `isStale` rows rather than just silently holding outdated numbers: the `BOM_REVISED` trigger is the one notification that doesn't push a person toward a specific screen, it just raises a flag that Estimation has to notice on their own next visit to the Cost Sheet.

## 4. Screen-by-screen specification

### 4.1 Login (`/login`)
A single centered card — email, password, sign-in — with no role picker on this screen itself; role is resolved server-side from the authenticated user record, not chosen by the person logging in. The note on this screen flags that `/auth/login` is the one route the API leaves unauthenticated, and that it sits behind `express-rate-limit`.

### 4.2 Enquiries List (`/enquiries`)
This screen replaces the Enquiry Register wholesale, so it needed to keep that register's two strongest properties: nothing can be lost, and status is glanceable at a row level. Status pills across the top act as quick filters mapped one-to-one to the state-machine values in Section 5.1, and a search box covers RFQ number, customer, and part — the three things a BD or Engineering user is most likely to be searching for mid-call with a customer. The Turnaround column is explicitly called out as a computed value (`totalDurationDays`), not a stored field, since the spec is precise that this is calculated at read time to avoid going stale. "+ New Enquiry" only renders for BD and Admin, consistent with the write-access table in Section 6.

### 4.3 New Enquiry (`/enquiries/new`, BD)
The form is grouped into three cards — RFQ details, scope & description, drawing package — rather than one long form, because Steps 1 through 4 of the SOP are conceptually three different actions (log it, describe it, attach the package) even though they happen in one sitting. The FileAgo link field is marked required and is the only place a "file" appears anywhere in the platform; the note on this screen exists specifically to head off the natural assumption that there'd be an upload button, since Section 1.2 explicitly scopes binary storage out of Phase 1. Two distinct save actions — "Save & Acknowledge Customer" and "Save & Notify Engineering" — are kept separate rather than collapsed into one "Submit" button, because they're two different emails to two different audiences and a BD user may legitimately want to do one without the other.

### 4.4 Enquiry Overview (`/enquiries/:id`)
This is the screen every other screen reports back to, so it carries the one piece of information everyone needs at a glance: where is this RFQ right now. The horizontal stage tracker renders the eight forward-progressing states from Section 5.1 as a literal sequence (numbered markers are justified here — this genuinely is an ordered process, not a styling choice). Loop-back transitions ("Returned to BD," "Not OK → Estimation") are real states in the data model but aren't drawn as a ninth forward step; in the full build these surface as a small reverse arrow on the relevant stage when that loop is active, which the wireframe calls out rather than draws, to avoid implying the loop is part of the normal forward path. Four KPI tiles (BOM lines, open SME queries, open missing-detail queries, days open) are pulled to the top because they're the four numbers that tell a manager whether this RFQ needs attention without opening a single tab.

### 4.5 Parts & BOM (`/enquiries/:id/parts`, `/bom/:bomLineId` — Engineering)
The completeness-check decision sits above the parts list, not buried inside a part, because it's a gate for the entire RFQ — answering "No" here is what sends the whole thing back to BD, per Step 5. Below it, a master-detail layout (parts on the left, the selected BOM line's full editor on the right) was chosen over a single long table because BOM-line editing involves enough fields — category, classification, material spec, process detail, the mandatory customer requirement, feasibility comments — that cramming them into table cells would make the classification logic in Section 6a illegible. Classification is built as a five-way toggle rather than a dropdown specifically because the choice is consequential (it determines which fields render next and how SCM and Estimation treat the line downstream), and a toggle keeps that choice visible rather than hidden behind a click.

The Customer-Specific Requirement field is the one place in the whole platform where a design constraint from the spec directly shapes the component: Section 5.2 requires this field to be enforced at three separate layers precisely because it has been silently skipped in the Excel process before. The wireframe reflects that by making it physically impossible to render a blank text box — it's a two-state toggle ("None specified by customer" / "Specify requirement…"), matching the `MandatoryFieldInput` component named in Section 7.2.

SME Consultation Log and the part's revision history live on this same screen, beneath the editor, rather than as separate pages — Section 6c of the SOP is explicit that SME consultation "is not a separate workflow stage," and the revision history is what lets an Engineering user see, without navigating away, whether a field they're about to edit has already been revised twice this week.

### 4.6 CFT Feasibility (`/enquiries/:id/feasibility`)
Built around a four-party sign-off (Engineering, Quality, SCM, Production) because Section 7 defines CFT as those four groups studying feasibility together, not CFT as a fifth department with its own staff. The risk-rating toggle (Low/Medium/High) gives Estimation and CEO/COO a fast read on which lines deserve a closer look later without reading every comment field.

### 4.7 SCM RM & OS (`/enquiries/:id/rm-os`)
The split-column layout (Engineering-provided fields on the left, SCM-to-complete fields on the right) is a direct visual translation of the schema's own `engineering` / `scm` sub-document split, which itself mirrors the existing Excel sheet's "To be updated by Engineering / To be updated by SCM" columns — this is one of the few places where keeping a familiar Excel-era visual pattern is a feature, not a compromise, since it's how SCM users already think about this data. The contracted-item check is pulled above the quote fields and styled as a hard gate, because Section 5.4 makes it a genuine API-level gate: a quote can't be saved against a line still flagged "New Enquiry" with no supplier or date set. Missing Detail Queries sit in their own card on the same screen, addressed to Engineering, so an SCM user never has to leave this view to flag a gap upstream.

### 4.8 Estimation Cost Sheet (`/enquiries/:id/cost-sheet`)
The table is deliberately not a generic data grid — it's built to render the exact six-stage roll-up from Section 5.2 (direct material → outsource/special process → conversion → tooling → overheads → margin) with a visible subtotal row closing each stage, because that sequence is the business logic, not just a display preference. Amber row shading marks `isStale: true` lines, which is the one styling choice on this screen that exists purely because the data model needs it to: a stale line is the entire reason the Revision Log's "Recalculation Required" flag exists, and Estimation needs to see it without cross-referencing a separate log. Engineering revision reference and SCM quote date are pinned as small chips above the table rather than buried in a footnote, since a stale cost line is only meaningful in light of which revision it was calculated against.

### 4.9 Approval (`/enquiries/:id/approval`)
Three reviewer slots — Estimation, CEO/COO, BD — are shown as a checklist rather than a single "approved by" field, because Section 5 (SOP) describes this as the three of them sitting together, and the platform should reflect that all three have a stake in the decision even though only CEO/COO's vote is structurally final. "Not OK" and "OK" are presented as a binary toggle immediately under the meeting-notes field, deliberately not buried at the bottom of a long form, since this single decision is the entire purpose of the screen.

### 4.10 Revision Log (`/enquiries/:id/revision-log`)
Rendered as a vertical timeline rather than a table, matching the `RevisionTimeline` shared component named in Section 7.2 — a timeline reads naturally as "what happened, in order," which is exactly what Section 4.1 of the SOP asks this view to answer for any part, person, or date range. The source badge (Engineering Revision vs. SCM Query) is color-coded because that distinction is what tells a reader whether a change originated from new information arriving, or from someone catching a gap — two very different stories that the old Excel sheet couldn't tell apart at a glance.

### 4.11 Admin — Users & Settings (`/admin/users`, `/admin/settings`)
Combined into one screen with two tabs rather than two separate pages, since both are Admin-only, low-frequency screens and don't benefit from separate top-level navigation real estate. The Cost Settings tab exists specifically because Section 5.5 requires overhead %, margin %, and machine/labour rates to be Admin-configurable rather than hardcoded — this screen is the literal UI for that requirement.

## 5. Shared component library

These four components, named explicitly in Section 7.2 of the technical document, appear on multiple screens above and should be built once and reused rather than re-implemented per screen.

| Component | Used on | Behavior |
|---|---|---|
| `StatusBadge` | Enquiries List, Overview, every workspace tab header | Renders the Enquiry status enum with a fixed color mapping (see legend below). Never free-text; always one of the eight state-machine values. |
| `RevisionTimeline` | BOM Line detail (scoped to one part), full Revision Log page (scoped to RFQ or cross-RFQ) | Vertical timeline, old→new value with strikethrough/bold treatment, source badge, recalculation-required indicator. Same component, different query scope. |
| `MandatoryFieldInput` | BOM Line editor, RM & OS Engineering-side fields | Two-state toggle wrapping any "customer requirement" style field; cannot render as an empty text input. Selecting "Specify requirement…" reveals a text field that itself cannot be saved empty. |
| `CostBuildupTable` | Cost Sheet | Fixed six-stage grouped table with subtotal rows; flags `isStale` rows in amber; read-only except via the Recalculate action. |

## 6. Role-based visibility matrix

This is the same access table from Section 6 of the technical document, re-expressed as what's actually shown or hidden in the UI rather than as API middleware.

| Role | Sees in nav | Can create/edit |
|---|---|---|
| BD | Enquiries List, New Enquiry, Overview, Approval | New enquiry, acknowledgement, outcome |
| Engineering | Enquiries List, Parts & BOM, CFT Feasibility (read), SCM RM & OS (read engineering fields) | BOM lines, classification, SME log, completeness decision |
| CFT | Enquiries List, CFT Feasibility | Feasibility study records |
| SCM | Enquiries List, CFT Feasibility (read), SCM RM & OS | Contract check, supplier quotes, lead time/MOQ, missing-detail queries |
| Estimation | Enquiries List, Cost Sheet, Approval | Cost build-up, recalculation |
| CEO/COO | Enquiries List, Approval | Final OK / Not OK |
| Admin | Everything, plus Users & Settings | User/role management, cost-rate settings |

Every role sees the Revision Log tab on any RFQ they have access to — it's explicitly "all roles" in Section 4.8 of the API spec, since the whole point of a single shared log is that nobody downstream has to take an upstream change on faith.

## 7. Annotation legend used throughout the wireframes

Small numbered or symbol-marked notes appear directly on the relevant component rather than in a separate glossary, the way a dimension callout sits next to the feature it describes on an engineering drawing. An `i` marker is informational context tying a UI element back to a spec section; a `!` marker flags a hard business rule (a validation gate, a required field, an append-only constraint); an arrow marker flags a state transition. None of these survive into the high-fidelity design — they exist only so a developer reviewing the wireframe doesn't have to flip back to the technical document to understand why a field looks the way it does.

## 8. Responsiveness, states, and accessibility — wireframe-stage notes

This prototype is built at desktop width since every defined user is an internal employee at a workstation, not a field user on a phone; a tablet breakpoint is worth revisiting only if SCM or CFT users end up reviewing on shop-floor tablets. Every form field shown "empty" (dashed border, grey placeholder text) has a corresponding "filled" treatment (solid border, dark text) already in the CSS, so the high-fidelity pass should carry that distinction forward — it's the cheapest way to make clear which fields are system-populated versus user-editable. Status colors are paired with text labels everywhere, not color alone, so the eventual build should keep `StatusBadge` text-plus-color rather than collapsing to a color dot. Tables that can grow long — the Enquiries List, the Revision Log, the SME Consultation Log — will need pagination or virtualization once real volume is loaded; the wireframe shows a handful of rows for legibility only.

## 9. Open questions for the next pass

A few decisions were made for the wireframe that the technical document leaves room to revisit: whether the back-loop transitions ("Returned to BD," "Not OK → Estimation") should be a literal branch drawn on the stage tracker or stay as a hover/expand affordance; whether the SCM split-column layout should collapse to a single column on the RM & OS screen once real field counts are known (Tooling and Consumable sections likely need fewer fields than Tube/Rod/Sheet); and whether Admin should see CFT and SCM screens read-only for support purposes, which the wireframe currently hides by default. Worth resolving before component build begins.

---
*Wireframe Rev A — generated alongside `AeroQuote-Wireframes.html` and `AeroQuote-Process-Flow.mermaid`. Open the HTML file in a browser and use the role selector to walk through every screen referenced above; open the Mermaid file to see the flow rendered as a diagram.*
