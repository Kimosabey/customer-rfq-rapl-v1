# 26 · Source Spec Index

Every design doc traces back to one of these original artifacts. This index is the single place that maps "where did this come from."

| Source | Location | Authority over | Used by |
|---|---|---|---|
| **Process-flow image** | `../../sources/process-flow.png` · copy at [`assets/process-flow.png`](assets/process-flow.png) | **Authoritative MAIN flow** — 6 step-blocks, decision branches, key features, audit trail | `07-ux-flows.md`, all screen docs |
| **Wireframe spec** | [`../../sources/AeroQuote-UIUX-Documentation.md`](../../sources/AeroQuote-UIUX-Documentation.md) | Screens, IA, 8-state machine, 7 roles, 4 shared components, data-model behaviors | `05`–`08`, `16`–`23` |
| **SOP deck** | `../../sources/RFQ.pptx` (9 slides, by SCM) | Process narrative + document codes (RA-MKT-R-01, RA-MKT-F-09, RA-MKT-F-04) | `07-ux-flows.md`, `00`–`04` |
| **Brand logo — horizontal lockup** | `../../sources/rangsons_logo.png` · copy [`assets/rangsons_logo.png`](assets/rangsons_logo.png) | Top bar (expanded), Login/Landing, wide headers, documents | `09`, `42`, `27` |
| **Brand logo — emblem mark** | `../../sources/rangsons-logo2.png` · copy [`assets/rangsons-logo-mark.png`](assets/rangsons-logo-mark.png) | Favicon, collapsed sidebar rail, avatar/app icon, compact & mobile | `06`, `design-guidelines.html` |
| *(both)* | — | Anchor brand colors: indigo `#2E3192`, red `#EC1D23`. On dark surfaces → white chip or white/mono version (to produce) | `09-color-system.md` |
| **Color palette** | [`../../sources/colorstheme.txt`](../../sources/colorstheme.txt) *(annotated with decisions)* | 10 raw colors → annotated decision record | `09-color-system.md`, `15-design-tokens-reference.md` |

## Citation convention
Docs cite sources inline as: `MD §4.4` (wireframe section), `PPTX slide 6` (deck), `image STEP 5` (process flow), `flow step 9r` (the canonical table in `07-ux-flows.md`).

## Key cross-references between sources (already reconciled)
- Image STEP-blocks ↔ wireframe's 12 steps: see the mapping table in [`../01-architecture/07-ux-flows.md`](../01-architecture/07-ux-flows.md).
- PPTX form codes ↔ screens: RA-MKT-R-01 = Enquiry Register (Enquiries List + New Enquiry), RA-MKT-F-09 = Info-to-SCM / Cost Sheet, RA-MKT-F-04 = Quotation (Send Quotation action).
