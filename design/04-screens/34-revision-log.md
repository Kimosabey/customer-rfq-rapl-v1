# 34 · Revision Log

> **Route:** `/enquiries/:id/revision-log` · **Access:** **all roles** with access to the RFQ (MD §4.8). **Flow:** cross-cutting (audit trail).
> **Cross-refs:** [24 · Flow](24-end-to-end-screen-flow.md) · [18 · RevisionTimeline](../03-components/18-revision-timeline.md) · [07 · Flows §E (Revision Management) + §F](../01-architecture/07-ux-flows.md)

## Purpose
The shared, append-only history — "what happened, in order, and why" for any part, person, or date range (MD §4.10). The whole point of one shared log is that **nobody downstream takes an upstream change on faith**, so it's visible to every role with RFQ access.

## Layout / anatomy
```
Revision Log — RA-2026-0142
┌ Filters ─────────────────────────────────────────────────┐
│ Source ▾  · Person ▾  · Field ▾  · Date range  · [search] │
└────────────────────────────────────────────────────────────┘
[ RevisionTimeline · scope = rfq ]
 ●─ Rev 3 · Material spec  [Engineering Revision]  28 Jun 14:02
 │   Ti-6Al-4V → Ti-6Al-4V (AMS 4928) · by Ravi · reason: customer spec
 │   ⚠ Recalculation required → Cost Sheet line
 ●─ Rev 2 · Customer requirement  [SCM Query]  …
 ●─ Rev 1 · …
```

## Key elements
- **[`RevisionTimeline`](../03-components/18-revision-timeline.md)** at `rfq` scope (the same component runs at `part` scope inside the BOM editor, and `cross-rfq` for admin/reporting).
- Each entry: Rev No, changed field(s), **source badge**, timestamp, old→new diff, changed-by (role), reason, and a **recalculation-required** flag linking to the affected Cost Sheet line (from `BOM_REVISED`/Automatic Impact Analysis).
- **Source badges, color-coded:** *Engineering Revision* (`--st-engineering`) vs *SCM Query* (`--st-returned`) — tells "new information arrived" apart from "someone caught a gap" (MD §4.10).
- **Filters:** source, person, field, date range, search.

## States
- Populated · filtered · **filtered-empty** ("No changes match these filters") · **empty** ("No revisions yet") · loading (skeleton rail) · error.
- Long logs paginate/virtualize once volume grows (MD §8).

## Responsive
- Desktop: filters bar + full timeline. Tablet/mobile: filters collapse into a drawer; timeline stays vertical (it already is).

## Accessibility
- Ordered list semantics; each entry has an accessible summary; diff conveyed by **text** ("changed from… to…") not strikethrough/color alone (1.4.1); source distinction via badge text + color.
- Filters are standard labeled controls; result count announced via `aria-live`. WCAG 2.2 AA. (Component a11y in [18](../03-components/18-revision-timeline.md).)

## Frontend mapping
- `RevisionTimeline` (scope `rfq`); TanStack Query keyed by RFQ + filters (filters in URL params); append-only data (no edit/delete in UI — it's an audit record).

## Claude Design brief
> A full-page revision/audit log for one RFQ, visible to every role. A filter bar (source, person, field, date range, search) above a **vertical change-history timeline**. Each entry: a colored node, header (revision number · field · a source badge — "Engineering Revision" indigo vs "SCM Query" orange · timestamp), the change as **old → new** (text-labeled, not color-only), who changed it and why, and an amber "Recalculation required" link when the change made a cost line stale. Append-only (no edit/delete). Include empty, filtered-empty, and loading states. Light default, dark supported, WCAG AA.
