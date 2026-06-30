# 44 · Keyboard Shortcuts (map)

> Power-user shortcuts (Linear-style). Press **?** anywhere to open this as a cheat-sheet overlay. All actions are also reachable without shortcuts (WCAG 2.1.1). `⌘` = Cmd (mac) / Ctrl (win).
> **Cross-refs:** [06 · Nav](../01-architecture/06-navigation-and-sitemap.md) · [14 · Accessibility](../02-design-system/14-accessibility-wcag22.md)

## Global
| Keys | Action |
|---|---|
| `⌘ K` | Command palette / global search (RFQ#, customer, part, jump-to) |
| `/` | Focus search |
| `?` | Open shortcuts cheat-sheet |
| `⌘ \` | Toggle sidebar (expand/collapse) |
| `g` then `d` | Go to Dashboard |
| `g` then `e` | Go to Enquiries |
| `g` then `a` | Go to Admin (Admin only) |
| `n` | New Enquiry (BD/Admin) |
| `⌘ .` | Toggle theme (light/dark) |
| `Esc` | Close dialog / drawer / popover / palette |

## Data tables (Enquiries List, Cost Sheet, BOM, Revision Log)
| Keys | Action |
|---|---|
| `↑ / ↓` | Move row focus |
| `Enter` | Open focused row |
| `x` | Toggle row selection |
| `f` | Open filters |
| `⌘ ↵` | Apply filters / run search |
| `[` `]` | Prev / next page |
| `d` | Toggle density (comfortable/compact) |

## Enquiry workspace (tabs)
| Keys | Action |
|---|---|
| `1`–`7` | Jump to tab (Overview…Revision Log) |
| `← / →` | Move between tabs (Radix Tabs) |
| `r` | Open Revision Log |

## Forms (New Enquiry, editors)
| Keys | Action |
|---|---|
| `⌘ ↵` | Save / submit primary action |
| `Esc` | Cancel / discard (with confirm if dirty) |
| `Tab / ⇧Tab` | Next / previous field |

## Screen-specific
| Screen | Keys | Action |
|---|---|---|
| Parts & BOM | `⌘ ↵` | Save BOM line · `Esc` deselect |
| SCM RM & OS | `⌘ ↵` | Save quote (blocked if gate unmet) |
| Cost Sheet | `⌘ R` | Recalculate · `⌘ ↵` Submit for approval |
| Approval | `o` / `p` | Mark OK / Not OK (with confirm) |

## Rules
- Shortcuts never the **only** way to do something; visible focus always on.
- Disabled inside text inputs (except `⌘`-combos and `Esc`).
- The cheat-sheet (`?`) lists exactly this, role-filtered.
