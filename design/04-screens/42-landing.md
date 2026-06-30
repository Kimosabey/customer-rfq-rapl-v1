# 42 · Landing / Sign-in Splash

> **Route:** `/` (public) — if authenticated, redirect to `/dashboard` (managers) or `/enquiries`; else show this. **Access:** all (unauthenticated).
> **Cross-refs:** [27 · Login](27-login.md) (the form lives here) · [24 · Screen flow](24-end-to-end-screen-flow.md) · [39 · Backgrounds](../02-design-system/39-cards-bento-and-animation.md)

## What "landing" means here
This is an **internal enterprise tool**, so there is **no marketing landing page**. The public entry is a **branded sign-in splash** — a polished, on-brand front door that contains the [Login](27-login.md) form. It exists to set identity and trust, not to sell.

## Layout (split)
```
┌──────────────────────────────┬───────────────────────────┐
│  BRAND PANEL (blueprint grid) │  SIGN-IN CARD             │
│  [Rangsons logo]              │  Welcome back             │
│  Customer RFQ Platform        │  Email   [_____________]  │
│  "From enquiry to quotation — │  Password[_____________]👁│
│   fully traceable."           │  [      Sign in       ]   │
│  • 6-department workflow      │  ⚠ error region           │
│  • Full revision & audit trail│                           │
│  • Validated, on-time quotes  │  Designed by Harshan      │
│                               │  Aiyappa · FS AI Engineer │
└──────────────────────────────┴───────────────────────────┘
   left = gradient brand panel + static blueprint grid    right = neutral sign-in
```

## Elements
- **Brand panel (left):** brand gradient + **static blueprint grid** background (§39 — *not* aurora), logo, product name, a one-line value statement, 3 concise capability bullets. No animation beyond a one-time fade-in.
- **Sign-in card (right):** the [Login](27-login.md) form (email, password + show/hide, Sign in, error region) — server-side role resolution, paste-allowed, rate-limited.
- **Footer credit:** "Designed by Harshan Aiyappa · Full Stack AI Engineer."

## States
Default · validating · invalid credentials (generic) · rate-limited · loading · success → role-based redirect. (Form states per [27](27-login.md).)

## Responsive
- **Desktop:** 50/50 split. **Tablet:** brand panel shrinks (top banner) + card below. **Mobile:** brand panel collapses to a compact header (logo + name); sign-in card fills; blueprint grid stays as a faint backdrop.

## Accessibility
- One `<h1>` (product name); sign-in form fully labeled; brand bullets are real text; blueprint grid is decorative (`aria-hidden`). Visible focus, keyboard submit, WCAG 2.2 AA. Honors `prefers-reduced-motion` (no entrance motion).

## Claude Design brief
> A **branded sign-in splash** (internal tool — not a marketing site). Split layout: left = gradient brand panel with the Rangsons logo, "Customer RFQ Platform", a one-line value ("From enquiry to quotation — fully traceable"), and three capability bullets, over a **static aerospace blueprint-grid** background (no aurora/beams). Right = a neutral sign-in card (email, password + show/hide, Sign in, inline errors). Footer: "Designed by Harshan Aiyappa · Full Stack AI Engineer." Authenticated users skip this and land on Dashboard/Enquiries. Responsive: split → stacked. Light default, dark supported, WCAG AA, reduced-motion safe.
