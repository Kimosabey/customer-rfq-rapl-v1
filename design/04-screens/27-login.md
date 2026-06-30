# 27 · Login  (entry / landing)

> **Route:** `/login` · **Access:** all (the only unauthenticated route). **Flow:** entry point.
> **Cross-refs:** [24 · Screen flow](24-end-to-end-screen-flow.md) · [14 · Accessibility](../02-design-system/14-accessibility-wcag22.md) · [09 · Color](../02-design-system/09-color-system.md)

## Purpose
Authenticate an internal user. **No role picker** — role is resolved server-side from the user record, never chosen by the person logging in (MD §4.1). This is the only route the API leaves unauthenticated, behind `express-rate-limit`.

## Layout / anatomy
```
            ┌──────────────────────────────┐
            │      [ Rangsons logo ]        │
            │   Customer RFQ Platform       │
            │                               │
            │  Email                        │
            │  [______________________]     │
            │  Password                     │
            │  [______________________] 👁  │
            │                               │
            │  [        Sign in        ]    │   ← primary, full-width
            │  ⚠ inline error region        │
            └──────────────────────────────┘
            centered card on neutral canvas
```

## Elements
- **Brand:** logo + product name (the one place the logo appears prominently).
- **Email** + **Password** (with show/hide toggle).
- **Sign in** — primary button, full-width; `loading` (`aria-busy`) during auth.
- **Error region** — invalid credentials / rate-limited / network, in text.
- No "remember me" / SSO in Phase 1 unless added; no self-service signup (internal accounts).

## States
- Default · focused · validating · **invalid credentials** (generic message, no user enumeration) · **rate-limited** ("Too many attempts, try again in N") · network error · loading · success → redirect to `/enquiries`.

## Responsive
- Single centered card across all breakpoints; max-width ~400px; comfortable padding; works at 320px.

## Accessibility
- `<form>` with labeled inputs (visible labels, not placeholder-as-label, 3.3.2).
- **3.3.8 Accessible authentication:** allow **paste** into password; no cognitive-test CAPTCHA.
- Error tied to fields via `aria-describedby`; submit error announced (`role="alert"`).
- Password show/hide is a labeled toggle button (`aria-pressed`, `aria-label`).
- Focus starts on email; Enter submits; visible focus ring. WCAG 2.2 AA.

## Frontend mapping
- React Hook Form + Zod (email/password schema); shadcn Input/Button; auth via the API `/auth/login`; on success set session + redirect (Next.js). Generic error copy by design (no enumeration).

## Claude Design brief
> A clean, centered sign-in card on a neutral canvas (light default, dark supported). Rangsons logo + "Customer RFQ Platform" title, an Email field, a Password field with a show/hide toggle, and a full-width primary **Sign in** button. Show inline, text-based errors (invalid credentials, rate-limited). **No role selector** (role is server-side). Allow pasting the password. Visible focus, keyboard submit, WCAG AA. Minimal — this is an internal tool, not a marketing page.
