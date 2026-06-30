# 08 · Role Visibility Matrix

> **Cross-refs:** [06 · Nav](06-navigation-and-sitemap.md) · [03 · Personas](03-personas.md) · [07 · Flows](07-ux-flows.md)
> **Source:** MD §6 (the API access table, re-expressed as UI show/hide). UI affordance only — the API enforces the same rules independently.

## Roles (7)
**BD** · **Engineering** · **CFT** (virtual: Eng+Quality+SCM+Production) · **SCM** · **Estimation** · **CEO/COO** · **Admin**.

## Nav + create/edit matrix (MD §6)

| Role | Sees in nav | Can create / edit |
|---|---|---|
| **BD** | Enquiries List, New Enquiry, Overview, Approval | New enquiry, acknowledgement, outcome |
| **Engineering** | Enquiries List, Parts & BOM, CFT Feasibility *(read)*, SCM RM & OS *(read eng. fields)* | BOM lines, classification, SME log, completeness decision |
| **CFT** | Enquiries List, CFT Feasibility | Feasibility study records |
| **SCM** | Enquiries List, CFT Feasibility *(read)*, SCM RM & OS | Contract check, supplier quotes, lead-time/MOQ, missing-detail queries |
| **Estimation** | Enquiries List, Cost Sheet, Approval | Cost build-up, recalculation |
| **CEO/COO** | Enquiries List, Approval | Final OK / Not OK |
| **Admin** | Everything + Users & Settings | User/role management, cost-rate settings |

> **Revision Log** is visible to **every role with access to the RFQ** — "all roles" (MD §4.8). A single shared log means nobody downstream takes an upstream change on faith.

## Per-screen access detail

| Screen | BD | Eng | CFT | SCM | Est | CEO/COO | Admin |
|---|---|---|---|---|---|---|---|
| Login | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Enquiries List | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| New Enquiry | **✎** | – | – | – | – | – | **✎** |
| Overview | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Parts & BOM | 👁 | **✎** | 👁 | 👁 | 👁 | 👁 | 👁 |
| CFT Feasibility | 👁 | 👁 | **✎** | 👁 | 👁 | 👁 | 👁 |
| SCM RM & OS | 👁 | 👁(eng) | 👁 | **✎** | 👁 | 👁 | 👁 |
| Cost Sheet | 👁 | – | – | – | **✎** | 👁 | 👁 |
| Approval | **✎**(review) | – | – | – | **✎**(review) | **✎**(final) | 👁 |
| Revision Log | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Admin Users/Settings | – | – | – | – | – | – | **✎** |

**Legend:** **✎** create/edit · 👁 read-only · ✓ view · – not in nav · 👁(eng) reads engineering fields only.

## Design rules
- Items a role can't use **don't render** (no greyed-out dead ends) — except where read-only is meaningful (a tab showing a neighbor's work for context).
- **Write actions** (Save & Notify, Submit Quote, Approve, Recalculate) appear only for roles that own them.
- The active **role** is shown in the top-bar user menu; switching role is **not** a user action (resolved server-side, MD §4.1).
- **Open question (MD §9):** whether Admin should see CFT/SCM screens read-only for support — currently hidden; revisit before build.
