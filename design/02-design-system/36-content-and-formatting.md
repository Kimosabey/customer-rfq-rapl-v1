# 36 · Content, Microcopy & Data Formatting

> **Cross-refs:** [10 · Typography](10-typography.md) · [37 · States & Notifications](../03-components/37-states-and-notifications.md) · [14 · Accessibility](14-accessibility-wcag22.md)
> Locale: **English (India)** · Currency **₹ INR** · Timezone **IST**. Tone: clear, professional, aerospace-precise — never cute.

## 1. Voice & tone
- **Plain and specific.** "Save & Notify Engineering," not "Submit." "2 lines block this save," not "Error."
- **Sentence case everywhere** (buttons, labels, headings) except proper nouns and codes. No Title Case, no ALL CAPS except table-header overlines.
- **Active, present tense.** "Recalculate cost sheet." "Quote sent to customer."
- **No blame in errors.** State what happened + how to fix.

## 2. Buttons & actions (verb-first, specific)
| Context | Label |
|---|---|
| BD intake | `Save & Acknowledge Customer` · `Save & Notify Engineering` |
| Completeness gate | `Mark complete` · `Return to BD` |
| SCM | `Save quote` · `Raise query to Engineering` |
| Cost | `Recalculate` · `Submit for Approval` |
| Approval | `Mark OK` · `Mark Not OK` · `Approve (Final)` |
| BD close | `Send Quotation` · `Record outcome` |
| Outcomes | `Won` · `Regretted` · `Lost` · `Closed / Hold` |
| Destructive | `Deactivate user` (confirm dialog) |

## 3. Currency & numbers (en-IN)
- **Currency:** `₹` prefix, **Indian grouping** (lakh/crore): `₹2,14,500` · `₹1,25,00,000`. Use `Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2})`.
- **Unit prices:** 2 decimals (`₹4,200.00`); **large totals:** 0 decimals OK. Always **right-aligned, tabular numerals**.
- **Optional crore shorthand** in dashboards only: `₹1.25 Cr` (never in the cost sheet itself).
- **Quantities:** grouped, tabular (`12`, `2,400`). **Percentages:** `12.5%`, `15%`. **Lead time:** `12 days`, `2 weeks`.

## 4. Dates & time
- **Display:** `DD MMM YYYY` → `28 Jun 2026`. With time: `28 Jun 2026, 14:02 IST`.
- **Relative** for activity/age: `8 days open`, `2 hours ago`, `Due in 3 days` / `Overdue 2 days` (warning color + text).
- **Data layer:** ISO 8601 (`2026-06-28T14:02:00+05:30`). Never show raw ISO to users.

## 5. Codes & identifiers (mono font)
- RFQ number `RA-2026-0142` · SOP doc codes `RA-MKT-R-01`, `RA-MKT-F-09`, `RA-MKT-F-04` · SAP code `4500218823`. All in `--font-mono`, never truncated mid-code.

## 6. Status labels (exact strings — used by StatusBadge)
`Open` · `In Engineering Review` · `In CFT Review` · `In SCM Sourcing` · `In Estimation` · `Pending Approval` · `Quote Submitted` · `Order Received` · `Returned to BD` · `Regretted` · `Lost` · `Closed / Hold`.

## 7. Empty-state copy (title · description · action)
| Screen | Title | Description | Action |
|---|---|---|---|
| Enquiries List | No enquiries yet | New RFQs you log will appear here. | + New Enquiry (BD/Admin) |
| Parts & BOM | No parts added | Add the first part to build the BOM. | Add part |
| SCM RM & OS | Awaiting BOM | SCM fields unlock once Engineering submits the BOM. | — |
| Cost Sheet | Awaiting SCM quotes | The cost build-up unlocks once SCM completes sourcing. | — |
| Revision Log | No revisions yet | Changes to this RFQ will be tracked here. | — |
| Filtered table | No results | No enquiries match these filters. | Clear filters |

## 8. Error message patterns (what + how to fix)
- **Field:** `Enter a valid email address.` · `RFQ number already exists — use a unique number.`
- **Gate (mandatory):** `Enter the requirement or select "None specified".`
- **Gate (contracted-item):** `2 lines flagged "New Enquiry" need a supplier and quote date before you can save.`
- **Permission:** `You don't have access to edit this. Ask an Admin if you need it.`
- **Network:** `Couldn't save — check your connection and try again.` (+ Retry)

## 9. Notifications copy (the 5 triggers) — short, actionable
| Trigger | Copy |
|---|---|
| `RFQ_RECEIVED_TO_ENGINEERING` | `New RFQ RA-2026-0142 (Boeing) — Engineering review needed.` |
| `MISSING_DETAILS_QUERY` | `SCM raised a query on RA-2026-0142 — details needed.` |
| `BOM_REVISED` | `BOM revised on RA-2026-0142 — cost sheet may need recalculation.` |
| `QUOTE_FOR_REVIEW` | `RA-2026-0142 is ready for approval review.` |
| `QUOTE_DISPATCHED` | `Quotation sent to Boeing for RA-2026-0142.` |

## 10. Misc rules
- Truncate long customer/part names with ellipsis + full value in a tooltip.
- Pluralize correctly (`1 part` / `12 parts`); show counts before nouns.
- Helper text is guidance, not repetition of the label.
- Never use color words in copy ("the red ones") — refer by status/meaning.
