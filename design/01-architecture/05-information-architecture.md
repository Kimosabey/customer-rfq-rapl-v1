# 05 · Information Architecture

> **Cross-refs:** [06 · Nav & Sitemap](06-navigation-and-sitemap.md) · [07 · UX Flows](07-ux-flows.md) · [08 · Role matrix](08-role-visibility-matrix.md)
> **Source:** MD §2 + §7.1 (mirrored exactly; only grouped for navigation).

## Core IA principle

The RFQ is the **unit of work**. Engineering, CFT, SCM, Estimation, and Approval are **not** standalone destinations — they are **tabs inside one Enquiry workspace**, because they all operate on the *same* RFQ and the *same* BOM lines, and users constantly glance sideways (e.g. Estimation checking whether SCM's quote landed). Splitting them into top-level pages would force re-navigation for what is one continuous review (MD §2).

## Sitemap (mirrors MD §7.1)

| Area | Screens | Primary role(s) |
|---|---|---|
| **Account** | Login | All |
| **BD intake** | Enquiries List · New Enquiry | BD, Admin (list visible to all) |
| **Enquiry workspace** | Overview · Parts & BOM · CFT Feasibility · SCM RM & OS · Cost Sheet · Approval · Revision Log | Eng, CFT, SCM, Estimation, CEO/COO, BD |
| **Admin** | Users · Cost Settings | Admin |

## Hierarchy

```
/login
/enquiries                       ← register / list (all roles)
/enquiries/new                   ← BD, Admin
/enquiries/:id                   ← workspace shell
   ├─ /                          Overview        (everyone w/ access)
   ├─ /parts  · /bom/:bomLineId  Parts & BOM     (Engineering)
   ├─ /feasibility               CFT Feasibility (CFT)
   ├─ /rm-os                     SCM RM & OS      (SCM)
   ├─ /cost-sheet                Cost Sheet      (Estimation)
   ├─ /approval                  Approval        (Estimation, CEO/COO, BD)
   └─ /revision-log              Revision Log    (all w/ access)
/admin/users                     ← Admin
/admin/settings                  ← Admin
```

## Workspace model

- **Shell:** persistent left sidebar (top-level nav, role-filtered) + top bar (global search, theme toggle, notifications, user/role).
- **Inside an RFQ:** a sub-navigation tab strip across the seven workspace screens; the RFQ identity (number, customer, **StatusBadge**) stays pinned in a workspace header above the tabs.
- **Overview** is the hub every tab reports back to (the stage tracker + KPIs live here).

## Content grouping rationale (key decisions)
- **Admin Users + Cost Settings** = one screen, two tabs (both Admin-only, low-frequency — MD §4.11).
- **SME log + revision history** live *on* the BOM screen, not as separate pages (SME is "not a separate workflow stage" — MD §6c).
- **Revision Log** is its own workspace tab *and* a scoped panel inside the BOM editor (same component, different query scope — MD §5).
- **Login** carries no role picker — role is resolved server-side (MD §4.1).
