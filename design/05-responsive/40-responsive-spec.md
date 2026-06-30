# 40 · Responsive Specification

> **Cross-refs:** [11 · Spacing/Grid](../02-design-system/11-spacing-grid-layout.md) · [10 · Typography (fluid)](../02-design-system/10-typography.md) · [06 · Nav](../01-architecture/06-navigation-and-sitemap.md)
> **Strategy:** **desktop-first** (internal workstation users, MD §8); tablet/mobile = graceful degradation. Everything still works to 320px and at 200% zoom / 400% reflow (WCAG 1.4.4 / 1.4.10).

## Breakpoints
| Name | Range | Posture |
|---|---|---|
| `mobile` | < 768px | Single column; sidebar → drawer; tables scroll-x or card list (low priority) |
| `tablet` | 768–1279px | Sidebar → 64px icon rail; master-detail stacks; bento 2-col |
| `desktop` | 1280–1535px | **Primary** — full sidebar, master-detail, multi-column, bento 4-col |
| `wide` | ≥ 1536px | Content capped at 1440px, centered; extra space = margins, not stretched tables |

## Responsive padding & gutters (fluid)
- **Content gutter:** `clamp(16px, 4vw, 24px)` → 16 on mobile/tablet, 24 desktop.
- **Section padding (y):** `clamp(36px, 5vw, 60px)`.
- **Card padding:** 16 mobile → 20 desktop. **Grid gap:** 12 mobile → 16 desktop.
- All still snap to the **8-pt** scale at each breakpoint (no arbitrary values).

## Layout behavior by region
| Region | Desktop | Tablet | Mobile |
|---|---|---|---|
| **Sidebar** | 240px expanded (rich) | 64px icon rail (tooltips) | Off-canvas drawer (hamburger) |
| **Top bar** | full search + actions | search collapses to icon | logo + hamburger + search icon + avatar |
| **Workspace tabs** | full tab strip | scrollable tab strip | tabs → `Select` dropdown |
| **Master-detail** (Parts & BOM, SCM) | side-by-side | list on top / editor below, or editor in a Sheet | list → tap → editor in full-screen Sheet |
| **Data tables** | full columns | horizontal scroll in a contained region; sticky first col | horizontal scroll **or** card-per-row list; never break page layout |
| **Bento dashboard** | 4-col, varied spans | 2-col; hero KPIs 2×2 | 1-col, ordered by importance; charts scroll-x |
| **Forms (New Enquiry)** | 2-col within cards | 1–2 col | 1-col; sticky footer actions |
| **Stage tracker** | horizontal | horizontal scroll / 2-row | vertical |
| **Cost sheet** | full table | scroll-x; sticky total footer | scroll-x; sticky total |

## UI element responsiveness
- **Controls don't shrink** on small screens — buttons/inputs grow to ≥40px min-height for touch (WCAG 2.5.8 ≥24px, we target 40).
- **Fonts:** headings fluid (`clamp`), body/control/table fixed — see [10 · Responsive type](../02-design-system/10-typography.md).
- **Tap targets** ≥ 24×24px CSS everywhere; primary actions full-width on mobile.
- **Hover-only affordances** get a tap/visible equivalent on touch (row actions become an always-visible ⋯ menu).

## Tables on small screens (the hard case)
1. **Contained horizontal scroll** (default) — table scrolls inside its own `overflow-x:auto` region; page never scrolls sideways. Sticky header + sticky first column (RFQ#).
2. **Card list** (mobile, where scanning matters) — each row becomes a card: primary fields + StatusBadge + key metric; tap → detail.
Choose per screen: Enquiries List → card list on mobile; Cost Sheet → scroll (numbers must align).

## Per-screen quick reference
- **Login:** centered card, all sizes.
- **Enquiries List:** table → card list (mobile); filters → drawer.
- **Overview:** tracker vertical; KPIs 2×2; cards stack.
- **Parts & BOM / SCM RM&OS:** master-detail → stacked / Sheet.
- **Cost Sheet:** scroll-x + sticky total.
- **Approval:** committee + chain stack vertically.
- **Dashboard:** bento reflows 4→2→1; charts scroll-x with insight caption kept visible.
- **Admin:** tabs → select; user table → cards.

## Verification
Test at 320 / 768 / 1280 / 1536px and 200% / 400% zoom; Playwright viewport snapshots per screen; assert no horizontal page scroll (only contained table scroll) and visible focus at every breakpoint.
