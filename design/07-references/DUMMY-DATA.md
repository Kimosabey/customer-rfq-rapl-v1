# Dummy Data (canonical) — for mockups & Claude Design

> Use **these names and values** for all dummy/sample data so every screen and mockup is consistent. Team names provided by the project owner.
> **Cross-refs:** [03 · Personas](../00-foundations/03-personas.md) · [END-TO-END-CHECKLIST](../END-TO-END-CHECKLIST.md)

## Users (role → name)
| Role | Name | Initials | Notes |
|---|---|---|---|
| BD (logged-in demo user) | **Harshan Aiyappa** | HA | Also the design author |
| Engineering | **Niranjan** | NK | Builds BOM |
| Engineering (2nd) | **Kimo** | KM | SME / second reviewer |
| SCM | **Dhanya** | DH | Sourcing & procurement |
| Estimation | **Kaushik** | KS | Cost build-up |
| CEO / COO | **Raghav** | RG | Final approval |
| Admin | **Kishan** | KN | Users & cost settings |

> CFT (cross-functional) sign-off uses: Niranjan (Engineering), Kimo (Quality), Dhanya (SCM), Kaushik (Production rep) — illustrative.

## Sample RFQs
| RFQ # | Customer | Parts | Status | Turnaround | Owner |
|---|---|---|---|---|---|
| RA-2026-0142 | Boeing | 12 | In SCM Sourcing | 8 days | Dhanya |
| RA-2026-0139 | HAL | 6 | Order Received (Won) | 21 days | Harshan Aiyappa |
| RA-2026-0150 | BEL | 9 | In Engineering Review | 3 days | Niranjan |
| RA-2026-0151 | Safran | 4 | Pending Approval | 14 days | Kaushik |
| RA-2026-0133 | GE Aviation | 18 | Returned to BD | 5 days | Harshan Aiyappa |
| RA-2026-0128 | HAL | 7 | Lost | 26 days | Harshan Aiyappa |

## Sample BOM lines (RA-2026-0142, Boeing)
| Part | Classification | Spec | Qty |
|---|---|---|---|
| Ti-6Al-4V bar | Material | AMS 4928 | 12 |
| AN3 fastener | Standard | NAS spec | 200 |
| NADCAP anodize | Special Process | per drawing | 12 |
| Bracket machining | Subcon | tol ±0.05 | 12 |
| Cutting fluid | Consumables | — | — |

## Sample suppliers (SCM)
Aakash Metals (Ti bar) · PrecisionCoat NADCAP (anodize) · Bharat Fasteners (AN3) · SAP codes `4500218823`, `4500219104`.

## Sample cost build-up (RA-2026-0142)
| Stage | Amount |
|---|---|
| 1 · Direct material | ₹58,000 |
| 2 · Outsource / special process | ₹32,000 |
| 3 · Conversion (machine+labour) | ₹74,000 |
| 4 · Tooling | ₹12,500 |
| 5 · Overheads (12.5%) | ₹19,500 |
| 6 · Margin (15%) | ₹18,500 |
| **Total Selling Price** | **₹2,14,500** |

## Sample revisions (RA-2026-0142)
- Rev 3 · Material spec · *Engineering Revision* · by **Niranjan** · 28 Jun 2026 · "Ti-6Al-4V → Ti-6Al-4V (AMS 4928)" · recalc required.
- Rev 2 · Customer requirement · *SCM Query* · by **Dhanya** · 26 Jun 2026.

## Sample dashboard figures
Active RFQs **42** · Avg turnaround **11 days** · Pending approval **6** · Win rate **62%** · Needs attention: 4 overdue, 2 stale cost sheets, 5 open queries.
