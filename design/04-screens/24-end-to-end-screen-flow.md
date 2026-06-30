# 24 · End-to-End Screen Flow (landing → outcome)

> **The completeness proof.** This maps the *navigation* across **every screen** from entry to terminal state — the UI companion to the *business* flow in [07 · UX Flows](../01-architecture/07-ux-flows.md). If a step in 07 has no screen here, that's a gap. There are none.
> **Cross-refs:** [05 · IA](../01-architecture/05-information-architecture.md) · [06 · Nav](../01-architecture/06-navigation-and-sitemap.md) · [08 · Roles](../01-architecture/08-role-visibility-matrix.md)

## Landing & entry (the "landing page")
This is an **internal tool** — there is no marketing landing page. Entry is:

```
unauthenticated visit
   └─▶ /  (branded Landing / sign-in splash, 42) — contains the Login form (27)
         (auth ok) ─▶ /dashboard (managers, 38)  or  /enquiries (others, 22)  ← post-login HOME
```

> **Dashboard & Reports** appears in the process-flow image's *Key Features*, but the wireframe spec's screen list (MD §7.1) has **no separate dashboard** — **Enquiries List is the home/dashboard**, and per-RFQ health lives on **Enquiry Overview** (KPI tiles). A dedicated cross-RFQ **Dashboard & Reports** screen is logged as a **candidate** (see Decision Log O-3), not part of the canonical 11.

## The complete screen set (11 — nothing omitted, MD §7.1)

| # | Screen | Route | Spec | Owner | Flow step(s) |
|---|---|---|---|---|---|
| 1 | **Login** | `/login` | [27](27-login.md) | All | entry |
| 2 | **Enquiries List** | `/enquiries` | [22](22-enquiries-list.md) | All · BD/Admin create | 2, 12 (register) |
| 3 | **New Enquiry** | `/enquiries/new` | [28](28-new-enquiry.md) | BD, Admin | 2–4 |
| 4 | **Enquiry Overview** | `/enquiries/:id` | [23](23-enquiry-overview.md) | All access | hub · 10–11 (BD actions) |
| 5 | **Parts & BOM** | `/enquiries/:id/parts` | [29](29-parts-and-bom.md) | Engineering | 5–6 |
| 6 | **CFT Feasibility** | `/enquiries/:id/feasibility` | [30](30-cft-feasibility.md) | CFT | 7 |
| 7 | **SCM RM & OS** | `/enquiries/:id/rm-os` | [31](31-scm-rm-os.md) | SCM | 8 |
| 8 | **Cost Sheet** | `/enquiries/:id/cost-sheet` | [32](32-cost-sheet.md) | Estimation | 9 |
| 9 | **Approval** | `/enquiries/:id/approval` | [33](33-approval.md) | Est, CEO/COO, BD | 9r |
| 10 | **Revision Log** | `/enquiries/:id/revision-log` | [34](34-revision-log.md) | All access | cross-cutting |
| 11 | **Admin — Users & Settings** | `/admin/users` · `/admin/settings` | [35](35-admin-users-settings.md) | Admin | setup |

*(Doc numbers 25–26 are the references-folder docs — not screens.)*

## End-to-end walk (happy path, screen by screen)

```
[27 Login] ─auth─▶ [22 Enquiries List] ─+New (BD)─▶ [28 New Enquiry]
   │  Save&Acknowledge → ack email                   │ Save&Notify Engineering
   ▼                                                  ▼  (status: In Engineering Review)
[23 Overview] ◀────────── reports back to ──────────┐
   │ open workspace tabs                             │
   ▼                                                 │
[29 Parts & BOM]  completeness gate ──No──▶ Returned to BD ─▶ [28/23] (re-notify)
   │ Yes · build BOM · classify · mandatory req · SME log
   ▼ (In CFT Review)
[30 CFT Feasibility]  4-party sign-off ─▶ (In SCM Sourcing)
   ▼
[31 SCM RM & OS]  contracted gate · supplier quotes ─▶ (In Estimation)
   ▼
[32 Cost Sheet]  6-stage build-up ─▶ (Pending Approval)
   ▼
[33 Approval]  committee OK/NotOK → L1 → L2 → Final
   │  NotOK ─▶ back to [32 Cost Sheet] (In Estimation, notes persist)
   ▼ OK (Quote Submitted)
[23 Overview]  BD: Send Quotation → Follow-up → Record Outcome
   ▼
Won → Order Received   |   Regretted / Lost / Closed-Hold   (terminal)
   ▼
[22 Enquiries List]  outcome reflected back (full history kept)

cross-cutting at any point:  [34 Revision Log] (history) · [35 Admin] (setup) · notifications deep-link to the owed screen
```

## Coverage check (every flow step has a screen)

| Flow step (07 §C) | Screen | ✓ |
|---|---|---|
| 1 customer RFQ arrives | — (not a system screen, by design) | n/a |
| 2 log enquiry | New Enquiry / Enquiries List | ✓ |
| 3 acknowledge | New Enquiry action | ✓ |
| 4 notify engineering | New Enquiry action | ✓ |
| 5 completeness gate | Parts & BOM | ✓ |
| 6 / 6a–c BOM, classify, mandatory, SME | Parts & BOM | ✓ |
| 7 feasibility | CFT Feasibility | ✓ |
| 8 / 8a contracted gate + quotes | SCM RM & OS | ✓ |
| 9 cost build-up | Cost Sheet | ✓ |
| 9r approval (committee + L1/L2/Final) | Approval | ✓ |
| 10 send quotation | Enquiry Overview action | ✓ |
| 11 follow-up + outcome | Enquiry Overview action | ✓ |
| 12 outcome to register | Enquiries List | ✓ |
| revisions / audit (cross-cutting) | Revision Log | ✓ |
| cost-rate config / users | Admin | ✓ |

**Result:** all 12 process steps + cross-cutting concerns map to one of the 11 screens. **No missing screen, no orphaned step.**

## Global states present on every screen
Loading (skeleton) · Empty · Error · No-access (role-gated) · plus screen-specific gate/loop states. Notifications (toast + center) deep-link into the relevant screen at every department handoff (07 §F).
