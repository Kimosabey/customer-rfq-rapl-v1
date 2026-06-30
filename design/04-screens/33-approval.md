# 33 · Approval

> **Route:** `/enquiries/:id/approval` · **Access:** Estimation + CEO/COO + BD (review); CEO/COO final. **Flow:** step 9r. **Doc code:** quotation RA-MKT-F-04.
> **Cross-refs:** [24 · Flow](24-end-to-end-screen-flow.md) · [07 · Flows §D gate 3 + §E STEP 5](../01-architecture/07-ux-flows.md) · [32 · Cost Sheet](32-cost-sheet.md)

## Purpose
The only multi-party gate. Resolves the source reconciliation: a **committee review** ("Is the quote OK?") **followed by** a formal **L1 → L2 → Final** sequential sign-off (image STEP 5). "Not OK" loops to a clean cost re-edit, not a re-review.

## Layout / anatomy
```
Approval — RA-2026-0142            Total Selling Price: ₹2,14,500   [view Cost Sheet]
┌ Committee review ────────────────────────────────────────────┐
│ Meeting notes (persist across loops) [____________________]   │
│ Reviewers:  ☐ Estimation   ☐ CEO/COO   ☐ BD                   │
│ Decision:   ( ✕ Not OK )   ( ✓ OK )                           │  ← binary, under notes
└────────────────────────────────────────────────────────────────┘
┌ Approval workflow (sequential) ─────────────────────────────┐
│ ①L1 Dept/Section Head ─▶ ②L2 CEO/COO ─▶ ③Final Approval       │
│  (each: approver · date · status)                             │
└────────────────────────────────────────────────────────────────┘
```

## Key elements
- **The number, in view:** Total Selling Price + a link back to the Cost Sheet (decide with the numbers present).
- **Committee review:** three reviewer slots — **Estimation, CEO/COO, BD** — shown as a checklist (all have a stake even though CEO/COO is structurally final, MD §4.9). **Meeting notes** field directly above the decision.
- **OK / Not OK** — binary toggle immediately under the notes (the entire purpose of the screen, not buried, MD §4.9).
  - **Not OK** → status loops to **In Estimation** (clean re-edit); **notes persist** so Estimation sees exactly what was flagged (MD §3.2).
  - **OK** → proceeds to the sign-off chain.
- **Sequential approval workflow:** **L1 Dept/Section Head → L2 CEO/COO → Final Approval** (image STEP 5). Each level: approver, date, status; later levels locked until earlier ones approve. Final → status `Quote Submitted`.

## States
- Pending review (committee not decided) · Not OK (looped, notes shown on Cost Sheet) · OK → L1 pending → L2 pending → Final → approved (`Quote Submitted`) · loading · read-only for roles without a vote at the current step.
- Each sign-off level: locked · awaiting · approved · rejected (kicks back).

## Responsive
- Desktop: committee + workflow side by side or stacked. Tablet/mobile: stack; sign-off chain becomes vertical steps.

## Accessibility
- Decision = clearly labeled buttons (not color-only); reviewers + sign-off levels expose state (4.1.2).
- Sequential locking communicated in text ("Awaiting L1 approval"), not by appearance alone.
- Status change announced via `aria-live`. Notes field labeled, persists. WCAG 2.2 AA.

## Frontend mapping
- TanStack Query for approval record; RHF for notes; decision + each sign-off level are mutations advancing a small state machine; Not-OK mutation sets status `In Estimation` and pins notes onto the Cost Sheet; role-gated controls per [08](../01-architecture/08-role-visibility-matrix.md).

## Claude Design brief
> An approval screen showing the **Total Selling Price** (with a link to the cost sheet) at top. A **committee review** card: a meeting-notes field, three reviewer checkboxes (Estimation, CEO/COO, BD), and a prominent **OK / Not OK** decision right under the notes. **Not OK** sends it back to Estimation (and keeps the notes). On **OK**, show a **sequential approval workflow**: L1 Dept/Section Head → L2 CEO/COO → Final Approval, each with approver/date/status and later steps locked until earlier ones approve. Communicate locked/awaiting/approved in text, not color alone. Include pending, looped-back, in-progress-chain, and approved states. Light default, dark supported, WCAG AA.
