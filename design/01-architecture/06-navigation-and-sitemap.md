# 06 · Navigation & Sitemap

> **Cross-refs:** [05 · IA](05-information-architecture.md) · [08 · Role matrix](08-role-visibility-matrix.md) · [21 · Base components](../03-components/21-base-components.md)

## Navigation model

Two persistent regions + a contextual third inside an RFQ.

```
┌────────────────────────────────────────────────────────────────┐
│ TOP BAR:  [≡] Rangsons RFQ   ⌘K search…        🔔  ☼/☾  Priya ▾ │
├──────────┬─────────────────────────────────────────────────────┤
│ SIDEBAR  │ WORKSPACE HEADER (inside an RFQ):                     │
│ • Enquiries  RA-2026-0142 · Boeing  [In SCM Sourcing]           │
│ + New     ├─────────────────────────────────────────────────────┤
│ ───────   │ TABS: Overview·Parts&BOM·CFT·SCM·Cost·Approval·Log  │
│ Admin ⌄   ├─────────────────────────────────────────────────────┤
│  Users    │ CONTENT                                              │
│  Settings │                                                      │
└──────────┴─────────────────────────────────────────────────────┘
```

### Top bar (global, all screens)
- **Brand + sidebar toggle** (left).
- **Global search (⌘K)** — RFQ number, customer, part (MD §4.2). Doubles as a command palette (jump-to-screen, "new enquiry").
- **Notifications** — bell with unread count → panel of `NotificationLog` items, each linking to the owed screen.
- **Theme toggle** (light default ↔ dark).
- **User menu** — name, role badge, sign out.

### Left sidebar (primary nav, role-filtered) — modern, not plain
A designed sidebar, not a flat list. Structure top→bottom:

1. **Brand block** — logo mark + "Rangsons RFQ" (the gradient sidebar surface gives it depth).
2. **Primary CTA** — a prominent **`+ New Enquiry`** button (BD/Admin only), filled, sitting above nav.
3. **Grouped nav with section overlines** — e.g. `WORKSPACE` (Dashboard, Enquiries) and `ADMIN` (Users, Settings). Each item = **icon + label**, not text-only.
4. **Live count badges** on items that have actionable volume — e.g. *Enquiries* shows active count, a *Needs attention* item shows an alert count in red. Counts make the nav a status surface, not just links.
5. **Active state** = filled pill **+ a 3px left accent bar** + brand-accent text (indigo light / `#8E92E8` dark). Hover = subtle surface tint.
6. **User / role card (bottom)** — avatar + name + role badge + chevron menu (sign out, theme). Anchored to the bottom, visually distinct.
7. **Collapse control** — collapses to a 64px icon rail (tooltips on hover); state persists per user.

**Surface treatment:** the sidebar uses the **brand gradient** (`#2E3192 → #1C1C39`) with white/translucent text — a deliberate, branded anchor against the neutral content area (not a plain white column). Dark theme deepens the gradient. This is the one place brand color fills a large surface.

**Density:** 9–11px item padding, 8px gap icon↔label, 13px label. Section overlines `text-xs`, uppercase, translucent.

### Workspace tabs (contextual, inside `/enquiries/:id`)
Overview · Parts & BOM · CFT Feasibility · SCM RM & OS · Cost Sheet · Approval · Revision Log.
- **Role-gated:** a tab a role can't access doesn't render (e.g. Cost Sheet hidden from Engineering's edit view; read-only tabs shown per the matrix).
- **Revision Log:** visible to **every role with access to the RFQ** (MD §4.8 — "all roles").
- Active tab uses the brand accent indicator (indigo light / `#8E92E8` dark).

## Access-driven visibility (the rule)
Navigation is the visible face of the access matrix ([08](08-role-visibility-matrix.md)): **menu items and create/approve actions a role shouldn't have simply do not render** — proven out in the wireframe's role selector (MD §1). This is UI affordance only; the API enforces the same rules independently.

## Sitemap (route table)

| Route | Screen | Nav location | Roles |
|---|---|---|---|
| `/login` | Login | — | All (unauth) |
| `/enquiries` | Enquiries List | Sidebar | All |
| `/enquiries/new` | New Enquiry | Sidebar (BD/Admin) | BD, Admin |
| `/enquiries/:id` | Overview | Workspace tab | Access-holders |
| `/enquiries/:id/parts` · `/bom/:bomLineId` | Parts & BOM | Workspace tab | Engineering (others read) |
| `/enquiries/:id/feasibility` | CFT Feasibility | Workspace tab | CFT (others read) |
| `/enquiries/:id/rm-os` | SCM RM & OS | Workspace tab | SCM (others read eng. fields) |
| `/enquiries/:id/cost-sheet` | Cost Sheet | Workspace tab | Estimation |
| `/enquiries/:id/approval` | Approval | Workspace tab | Estimation, CEO/COO, BD |
| `/enquiries/:id/revision-log` | Revision Log | Workspace tab | All access-holders |
| `/admin/users` | Users | Sidebar (Admin) | Admin |
| `/admin/settings` | Cost Settings | Sidebar (Admin) | Admin |

## Wayfinding
- **Breadcrumb / workspace header:** `Enquiries › RA-2026-0142 (Boeing)` + StatusBadge, always pinned.
- **Deep links** from notifications and search land directly on the relevant tab.
- **Keyboard:** ⌘K everywhere; tab strip is arrow-navigable (Radix Tabs).
