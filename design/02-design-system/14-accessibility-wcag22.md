# 14 · Accessibility — WCAG 2.2 AA

> **Cross-refs:** [09 · Color](09-color-system.md) · [10 · Type](10-typography.md) · [12 · Motion](12-elevation-and-motion.md) · [21 · Base components](../03-components/21-base-components.md)
> **Target:** WCAG **2.2 Level AA** on every screen. Radix primitives give us correct semantics/focus for free; this doc is the checklist we hold each screen to.

## Why Radix + shadcn
Radix UI primitives ship accessible roles, keyboard interaction, focus management, and `aria-*` wiring (Dialog, Tabs, Popover, Select, Tooltip, Toast, etc.). We build on them rather than re-implementing — most of the criteria below are satisfied by *using them correctly*.

## Checklist (by principle)

### Perceivable
- **1.4.3 Contrast (AA):** all text ≥ 4.5:1 (large/UI ≥ 3:1). Governed by token tables in [09](09-color-system.md); each pairing has a computed ratio.
- **1.4.1 Use of color:** status/validation/risk = **color + text + icon**. Never color alone.
- **1.4.11 Non-text contrast:** control borders, focus rings, status dots ≥ 3:1 against adjacent colors.
- **1.1.1 Non-text content:** icons decorative → `aria-hidden`; meaningful icons → `aria-label`; the logo has alt text.
- **1.4.4 Resize / 1.4.10 Reflow:** rem units; usable at 200% zoom; reflows at 400% (1280px→320px) without 2-axis scroll except data tables (which scroll-x in a contained region).
- **1.4.12 Text spacing:** layout survives user spacing overrides.

### Operable
- **2.1.1 Keyboard:** every action reachable and operable by keyboard; no traps (2.1.2). ⌘K palette + tab strip arrow-nav.
- **2.4.7 Focus visible:** 2px `--ring` + 2px offset on every focusable element; never `outline:none` without a replacement.
- **2.4.11 Focus not obscured (2.2 NEW):** sticky top bar/headers must not cover the focused element — scroll-padding accounts for the 56px bar.
- **2.4.3 Focus order:** DOM order = visual order; dialogs trap+restore focus (Radix).
- **2.5.8 Target size minimum (2.2 NEW):** interactive targets ≥ 24×24px CSS (we use 32px+).
- **2.5.7 Dragging (2.2 NEW):** any drag (e.g. reordering) has a non-drag alternative (menu action).
- **2.3.3 Animation from interactions:** honor `prefers-reduced-motion` ([12](12-elevation-and-motion.md)).

### Understandable
- **3.3.1/3.3.3 Errors:** errors identified in text, tied to the field (`aria-describedby`), with a fix suggestion. Mandatory-field and contracted-item **gates** explain *what* is missing (flow §D).
- **3.3.2 Labels:** every input has a visible, persistent label (no placeholder-as-label).
- **3.3.7 Redundant entry (2.2 NEW):** don't re-ask for info already provided in the same flow (e.g. customer carried across New-Enquiry cards).
- **3.3.8 Accessible authentication (2.2 NEW):** Login allows paste into password; no cognitive-test CAPTCHA.
- **3.2.x Consistent nav/identification:** nav, StatusBadge, and actions behave identically across screens.

### Robust
- **4.1.2 Name/role/value:** custom controls expose correct roles/states (Radix). `MandatoryFieldInput` toggle exposes pressed state.
- **4.1.3 Status messages:** toasts, save confirmations, "quote sent" use `aria-live` / role="status" so they're announced without focus change.

## Patterns we standardize
- **Forms:** label → input → helper/error stack; required marked in text + `aria-required`; error summary on submit.
- **Tables:** `<th scope>`, caption/`aria-label`, sortable headers announce sort state; row actions reachable by keyboard.
- **Dialogs/drawers:** Radix Dialog (focus trap, `Esc`, scrim, restore focus).
- **Toasts:** Radix Toast region, polite live, errors assertive.
- **Skip link** to main content; landmark regions (`header`/`nav`/`main`/`aside`).

## Verification
- Automated: axe-core in Playwright + Vitest a11y assertions per component.
- Manual: keyboard-only pass, screen-reader smoke (NVDA/VoiceOver), 200%/400% zoom, forced-colors/high-contrast check.
- **Each screen doc includes an "Accessibility notes" section** asserting these per-screen.
