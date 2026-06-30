# 30 · CFT Feasibility

> **Route:** `/enquiries/:id/feasibility` · **Access:** CFT (others read). **Flow:** step 7.
> **Cross-refs:** [24 · Flow](24-end-to-end-screen-flow.md) · [07 · Flows step 7](../01-architecture/07-ux-flows.md) · [17 · StatusBadge](../03-components/17-status-badge.md) · [13 · Icons (risk)](../02-design-system/13-iconography.md)

## Purpose
The **cross-functional team** (Engineering + Quality + SCM + Production) studies whether Rangsons can make the part, the risks, and tolerance/process capability — with a **four-party sign-off** (MD §4.6). CFT is those four groups together, not a fifth department.

## Layout / anatomy
```
CFT Feasibility — RA-2026-0142
┌ Assessment ──────────────────────────────────────────────┐
│ Manufacturability  · Tolerance / process capability       │
│ Quality risk notes · Overall feasibility decision         │
│ Risk rating:  ( Low ) ( Medium ) ( High )                 │  ← toggle
└────────────────────────────────────────────────────────────┘
┌ Four-party sign-off ─────────────────────────────────────┐
│ ☐ Engineering   ☐ Quality   ☐ SCM   ☐ Production          │
│   (name · date · comment per party)                       │
└────────────────────────────────────────────────────────────┘
        Decision:  ( ✓ Approved / Proceed )  ( ✕ Not Approved / Revise )
```

## Key elements
- **Assessment fields:** technical feasibility, risk assessment, manufacturability check, tolerance & process capability, overall decision (image STEP 2 → CFT Review).
- **Risk rating toggle (Low/Med/High)** — a fast read for Estimation & CEO/COO on which lines deserve closer review (MD §4.6); color + text + icon.
- **Four-party sign-off** — Engineering, Quality, SCM, Production each sign (name, date, comment). Advancing requires the sign-off the spec defines.
- **Decision:** Approved (Proceed) → status `In CFT Review → In SCM Sourcing`; Not Approved (Revise) → routes back for rework (image: Approved/Not Approved branch).

## States
- In progress (partial sign-off) · all parties signed · approved (advances) · not approved (revise) · loading · read-only for non-CFT roles.
- Each party slot: unsigned · signed · changed-after-sign (flag).

## Responsive
- Desktop: assessment + sign-off side by side. Tablet/mobile: stack; sign-off becomes a vertical list.

## Accessibility
- Risk rating = `ToggleGroup` with text labels + icons (not color-only, 1.4.1).
- Sign-off = checkboxes/buttons with accessible names per party + state; decision buttons clearly labeled (not color-only).
- Live region announces status change on approval. WCAG 2.2 AA.

## Frontend mapping
- TanStack Query for the feasibility record; RHF+Zod (risk enum, required overall decision); four-party sign-off as a structured sub-form; decision = mutation advancing status.

## Claude Design brief
> A cross-functional feasibility screen. An assessment card (manufacturability, tolerance/process capability, quality risk notes, overall feasibility decision) with a **Low/Medium/High risk toggle** shown as text+color+icon. A **four-party sign-off** block — Engineering, Quality, SCM, Production — each with name/date/comment and a signed state. A clear decision control: **Approved (Proceed)** vs **Not Approved (Revise)**. Include partial-signoff, approved, not-approved, and read-only states. Light default, dark supported, WCAG AA.
