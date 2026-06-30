# AeroQuote ↔ Design Sync Traceability

> Proves the design UI/UX is **100% synced** with the two sources — [`AeroQuote-UIUX-Documentation.md`](../sources/AeroQuote-UIUX-Documentation.md) (the wireframe spec) and [`01-architecture/07-ux-flows.md`](01-architecture/07-ux-flows.md) (canonical flow) — from top layers down to micro-level rules. Every row maps a source item → where it's applied. **No gaps.**

## A. AeroQuote MD §-by-§ → applied in

| AeroQuote MD § | Item | Applied in | ✓ |
|---|---|---|---|
| §2 | Information architecture / sitemap / tabs-in-one-workspace | `05-information-architecture` | ✓ |
| §3 / §3.1 | 12-step end-to-end flow | `07-ux-flows §C` | ✓ |
| §3.2 | 4 decision points & loops (completeness, contracted-item, approval, customer decision) | `07-ux-flows §D` + screens 29/31/33/23 | ✓ |
| §3.3 | 5 notification triggers | `07-ux-flows §F` + `37-states-and-notifications` | ✓ |
| §4.1 | Login (no role picker, server-side role, rate-limit) | `27-login` | ✓ |
| §4.2 | Enquiries List (status pills, search RFQ/customer/part, **computed** turnaround, +New BD/Admin) | `22-enquiries-list` | ✓ |
| §4.3 | New Enquiry (3 cards, FileAgo link-only, 2 distinct saves) | `28-new-enquiry` | ✓ |
| §4.4 | Overview (8-state tracker, loop-backs as note, 4 KPIs) | `23-enquiry-overview` | ✓ |
| §4.5 | Parts & BOM (completeness gate, master-detail, 5-way classification toggle, MandatoryFieldInput, SME log, revision) | `29-parts-and-bom` | ✓ |
| §4.6 | CFT (4-party sign-off, Low/Med/High risk) | `30-cft-feasibility` | ✓ |
| §4.7 | SCM RM & OS (split Eng/SCM columns, contracted-item hard gate, missing-detail queries) | `31-scm-rm-os` | ✓ |
| §4.8 | Cost Sheet (6-stage roll-up, subtotals, amber `isStale`, revision/quote chips) | `32-cost-sheet` + `20-cost-buildup-table` | ✓ |
| §4.9 | Approval (3 reviewers checklist, OK/Not OK→In Estimation) | `33-approval` | ✓ |
| §4.10 | Revision Log (vertical timeline, color-coded source badges) | `34-revision-log` + `18-revision-timeline` | ✓ |
| §4.11 | Admin (Users + Cost Settings, two tabs, configurable rates) | `35-admin-users-settings` | ✓ |
| §5 | 4 shared components (StatusBadge, RevisionTimeline, MandatoryFieldInput, CostBuildupTable) | `17` / `18` / `19` / `20` | ✓ |
| §6 | Role visibility matrix (7 roles) | `08-role-visibility-matrix` | ✓ |
| §7 | Annotation legend (wireframe-only, not carried to hi-fi) | n/a by design (noted in `07 §H`) | ✓ |
| §8 | Responsiveness / states / accessibility wireframe notes (desktop-first; filled-vs-empty field treatment; status text+color; pagination/virtualization) | `40-responsive` · `37-states` · `14-a11y` · `22` | ✓ |
| §9 | Open questions (back-loop rendering · SCM split collapse · Admin read-only) | Decision Log **O-1/O-2/O-3** + `08` note + `31` note | ✓ |

## B. 07-ux-flows micro-level elements → applied in
| Flow element | Applied in | ✓ |
|---|---|---|
| Image step-blocks → 12-step mapping | screens grouped per `24-end-to-end-screen-flow` | ✓ |
| 8 forward states + branches/terminals | `17-status-badge` (enum) + `23` tracker | ✓ |
| 12-step table (each owner/screen/status) | every `04-screens/*` cites its step | ✓ |
| 4 gates (build as real gates, not free-text) | 29 (completeness), 31 (contracted, API-level), 33 (approval loop), 23 (outcome) | ✓ |
| Eng Working-Sheet activities (drawing review, process mapping, cycle time, tooling, qualification, customer-specific req, SME) | `29-parts-and-bom` | ✓ |
| Revision Management (rev no/by/date/fields/old→new/reason/notify) | `18` + `34` | ✓ |
| SCM contract gate (existing vs new supplier RFQ) | `31-scm-rm-os` | ✓ |
| Automatic Impact Analysis → `isStale` + recalc | `32-cost-sheet` + `41`/`37` | ✓ |
| Approval workflow (committee → L1→L2→Final) | `33-approval` | ✓ |
| Audit trail (who/what/when/why/old-vs-new/attachments/notify) | `18`/`34` + `37` | ✓ |
| Notification triggers (5) | `37` + each owning screen | ✓ |
| SOP doc codes (RA-MKT-R-01 / F-09 / F-04) | `22`/`32`/`23` + `26-source-spec-index` | ✓ |

## C. Result
**Every AeroQuote section (§2–§9) and every 07-ux-flows element — top layer (IA, flow, roles) to micro level (gates, mandatory fields, computed turnaround, stale rows, source badges, doc codes) — is applied in a design doc.** Confirmed in [END-TO-END-CHECKLIST](END-TO-END-CHECKLIST.md). The only items not "applied" are the wireframe-only annotation legend (§7, intentionally dropped) and §9 open questions (tracked as decisions O-1/O-2/O-3) — both by design, not gaps.
