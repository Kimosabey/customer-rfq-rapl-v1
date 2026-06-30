# 11 · Spacing, Grid & Layout

> **Cross-refs:** [10 · Typography](10-typography.md) · [12 · Elevation & Motion](12-elevation-and-motion.md) · [06 · Nav](../01-architecture/06-navigation-and-sitemap.md)
> **System:** strict **8-point** spacing. Every margin, padding, gap, and size is a multiple of 4 (half-step) / 8.

## Spacing scale

| Token | px | Typical use |
|---|---|---|
| `space-0` | 0 | reset |
| `space-1` | 4 | icon↔label gap, tight inline |
| `space-2` | 8 | input padding-y, chip padding |
| `space-3` | 12 | compact cell padding |
| `space-4` | 16 | **default** gap, card padding-sm |
| `space-5` | 20 | — |
| `space-6` | 24 | card padding, section gap |
| `space-8` | 32 | block separation |
| `space-10` | 40 | — |
| `space-12` | 48 | page section gap |
| `space-16` | 64 | major section / empty-state |

## Layout frame

```
Sidebar 240px (collapsed 64px) │ Top bar 56px │ Content (fluid)
                                              │ max content width 1440px, centered
                                              │ content padding 24px (desktop)
```

| Region | Size |
|---|---|
| Top bar height | 56px |
| Sidebar width | 240px (expanded) / 64px (collapsed) |
| Workspace header (RFQ id + status) | 56px |
| Tab strip | 44px |
| Content max-width | 1440px |
| Content gutter | 24px desktop · 16px tablet · 16px mobile |

## Grid
- **12-column** fluid grid for content; 24px gutters (desktop).
- **Forms:** New Enquiry uses grouped cards, each an internal 12-col grid (fields span 6/12 or 12/12). Labels above inputs.
- **Master-detail** (Parts & BOM): left list ~`minmax(280px, 360px)`, right editor fills remainder; collapses to stacked on tablet.
- **Tables:** full content width; sticky header + (where present) sticky first column for wide tables (Cost Sheet, BOM).

## Density
- **Default row height:** 44px (comfortable). **Compact:** 36px (density toggle on lists).
- Cell padding 12px x · 8px y default; 8px x · 4px y compact.
- Density choice persists per user (Zustand + localStorage).

## Breakpoints (desktop-first; tablet/mobile = graceful degradation)

| Name | Min width | Behavior |
|---|---|---|
| `desktop` | ≥1280 | Primary target — full sidebar, master-detail, multi-column |
| `tablet` | 768–1279 | Sidebar collapses to icons; master-detail stacks; tables scroll-x |
| `mobile` | <768 | Single column; sidebar → drawer; tables → scroll-x or card list; low-priority (internal users at workstations, MD §8) |

## Radius & borders
- Radius: `radius-sm` 4px (inputs, badges) · `radius-md` 8px (cards, buttons, menus) · `radius-lg` 12px (dialogs, popovers). Full (9999px) only for status dots/avatars.
- Border width 1px; default `--border`; control border `--input`; focus ring 2px `--ring` + 2px offset.

## Rules
- No magic numbers — only scale tokens.
- Vertical rhythm: section gap `space-8`; within-card gap `space-4`.
- Touch targets ≥ 24×24px CSS (WCAG 2.5.8); interactive controls aim for 32px+ min height (inputs/buttons 36–40px).
