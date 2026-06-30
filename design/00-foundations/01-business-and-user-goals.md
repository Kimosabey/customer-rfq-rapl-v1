# 01 · Business & User Goals

> **Cross-refs:** [00 · Vision](00-product-vision.md) · [03 · Personas](03-personas.md) · [08 · Role matrix](../01-architecture/08-role-visibility-matrix.md)

## Business goals

| # | Goal | How the product serves it | Measure |
|---|---|---|---|
| B1 | **Faster, predictable turnaround** | One workspace, automatic handoff notifications, no re-keying | Median days received → quote submitted ↓ |
| B2 | **Zero lost RFQs** | Every RFQ logged in the register; status always visible; terminal outcomes recorded | 100% of RFQs reach a terminal state |
| B3 | **Full traceability / audit** | Append-only revision log + audit trail on every action (who/what/when/why) | Any field's history reconstructable |
| B4 | **Profitability via accurate costing** | 6-stage cost build-up with admin-set rates; stale-row flags prevent quoting old numbers | Fewer post-quote cost corrections |
| B5 | **Validated pricing** | No quote leaves without committee review + L1→L2→Final approval | 100% of sent quotes are approved |
| B6 | **Win/loss visibility** | Four distinct outcomes (Won/Regretted/Lost/Closed) recorded back to the register | Win-rate & loss-reason reporting |

## User goals (by role)

| Role | Primary goal | "Done" looks like |
|---|---|---|
| **BD** | Log, acknowledge, route, and close the loop fast | RFQ acknowledged + Engineering notified in one sitting; outcome recorded |
| **Engineering** | Confirm completeness, build an accurate BOM | Completeness decided; every BOM line classified; no blank customer requirement |
| **CFT** | Judge feasibility & risk before effort is spent | Four-party sign-off with a clear risk rating |
| **SCM** | Get the best supplier quotes without leaving gaps | Every "New Enquiry" line has supplier + date before a quote can save |
| **Estimation** | Produce a correct, current price | Cost sheet complete, no stale rows, ready for review |
| **CEO/COO** | Approve only competitive, profitable quotes | One clear OK/Not-OK with the numbers in front of them |
| **Admin** | Keep users and cost rates correct | Roles managed; overhead/margin/rates configured (no hardcoding) |

## Success metrics (design-observable)

- **Time-on-task:** logging a new enquiry, classifying a BOM line, completing a cost sheet — each should feel like a focused, few-minute task, not a spreadsheet hunt.
- **Error prevention:** mandatory-field and contracted-item **gates** block bad saves at the UI *and* API (MD §5.2, §5.4) — designed as hard gates, not warnings.
- **Glanceability:** status, KPIs, and stale-data flags are readable without opening a tab or asking a colleague.
- **Accessibility:** WCAG 2.2 AA across every screen (keyboard, contrast, focus, labels).
