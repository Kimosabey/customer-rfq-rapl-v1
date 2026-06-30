# Design Decisions Log

Append-only. Each entry: **what** we decided, **why**, and the **source/constraint** behind it. Newest at top.

| # | Decision | Why | Source / constraint |
|---|---|---|---|
| D-024 | **Handoff finalized:** paste-ready Claude Design **prompt pack** (master + 14 per-screen prompts) + **FE/BE/Mongo implementation plan** added as MD | User: "give me Claude design plan and prompt" + plan FE/BE/Mongo | `06-handoff/45`, `46` |
| D-023 | **Build stack confirmed:** React.js SPA + Node.js/Express API + **MongoDB (local for now)** — decoupled, not Next.js; UI layer unchanged (Tailwind/shadcn/Radix/TanStack/ECharts) | User instruction | `06-handoff/43`, `globals.css` |
| D-022 | **Two brand logos:** horizontal lockup (`rangsons_logo.png`) for wide contexts; emblem mark (`rangsons-logo2.png`) for favicon/collapsed/avatar; dark surfaces use a white chip | User instruction | `26`, `25`, HTML |
| D-021 | **Charts self-explain IN the viz** (data labels, target `markLine`, `markPoint` callouts, inline delta) + insight caption — understood in one glance; **ECharts** confirmed | User instruction | `41-data-visualization` |
| D-020 | **Landing = branded sign-in splash** (`/`) — internal tool, no marketing page; gradient brand panel + blueprint grid + sign-in card | User: "what about landing page?" | `42-landing` |
| D-019 | **Aceternity = selective only** (steal micro-interactions, not style); **no aurora/beams** — background is a **static aerospace blueprint grid**; **scrollbars hidden** in the guideline | User instruction | `39 §3/§5`, `design-guidelines.html` |
| D-018 | **Credit & identity:** Designed by **Harshan Aiyappa · Full Stack AI Engineer** (harshan.aiyappa@lingotran.com); dummy data uses team names (Harshan, Kishan, Niranjan, Kimo, Kaushik, Dhanya, Raghav) | User instruction | [DUMMY-DATA](07-references/DUMMY-DATA.md) |
| D-017 | **Charts = Apache ECharts**, insight-first (derived takeaway caption), interactive (drill-down), accessible (data-table fallback) | User: charts must be understood at a glance + interactive | `41-data-visualization` |
| D-016 | **Color critique + OKLCH plan:** source 10 colors rationalized into 2 brand + neutral scale + 4 semantic + 11 status; recommend OKLCH authoring + status-hue harmonization | User: "did we derive colors properly as modern?" | `09 §9` |
| D-015 | **Responsive spec added** — desktop-first, fluid padding/type (clamp), per-breakpoint layout, contained table scroll | User: responsive padding/layout/element fonts | `40-responsive-spec` |
| D-014 | **Font = Geist** (Sans+Mono), Inter fallback; fluid heading scale, fixed body/controls | User: choose best modern font + responsive type | `10-typography` |
| D-013 | **Modern visual layer:** rich branded sidebar (not plain), bento dashboard, ambient animation (hero/login/empty only), card variants, micro-interactions | User: animations/bento/card design; richer sidebar/dashboard | `39`, `06`, `design-guidelines.html` |
| D-012 | **Dashboard & Reports screen added** (bento) — closes O-3; gap docs added (content `36`, states `37`) | User: bolder dashboard + critique/gap-fill | `38`, `36`, `37` |
| D-011 | **All 11 screens specced** + an [end-to-end screen-flow map](04-screens/24-end-to-end-screen-flow.md) proving every flow step maps to a screen | User: "make sure end-to-end flow from landing to end, no missing screens" | User instruction |
| D-010 | **Landing = Login** (`/login`); post-login **home = Enquiries List**. No marketing landing page (internal tool) | Internal users only; MD §7.1 has no separate dashboard | MD §4.1, §7.1 |
| D-009 | All docs authored as a **self-contained Claude Design handoff** — each screen/component ends with a paste-ready brief | User will hand these to Claude Design (claude.ai) to generate hi-fi UI; docs must work standalone | User instruction |
| D-008 | **Status colors** = 11 distinct hues, always **text + color** (soft badge); `#1A3333` teal repurposed as "In Estimation" | Raw palette had no status hues; color-only fails WCAG 1.4.1; teal was an unused outlier | WCAG 1.4.1 · `colorstheme.txt` |
| D-007 | Derived a **neutral scale + semantic set** (success/warning/info), consolidating 3 near-duplicate darks | Raw palette had no light tints and no green/amber — unusable for a data tool as-is | `colorstheme.txt` analysis |
| D-006 | **Dark-mode accent** uses lightened indigo `#8E92E8`; primary *fill* stays `#2E3192`+white in both themes | `#2E3192` on dark `#212935` = 1.37:1 (fails); filled buttons pass regardless of theme | WCAG contrast (computed) |
| D-005 | **White-text destructive** buttons use `#C2161B`, not `#EC1D23` | White on brand red = 4.40:1 (fails normal-text AA); `#C2161B` = 6.2:1 | WCAG contrast (computed) |
| D-004 | **Approval = committee review → sequential L1→L2→Final** sign-off | Image shows both a group review ("Is it OK?") and a 2-level approval workflow | Process-flow image (STEP 5) |
| D-003 | **Process-flow image is the authoritative MAIN flow**; wireframe MD owns screens/states; PPTX owns doc codes | User: "main flow is from the image." Avoids the 3 sources drifting | User instruction + source set |
| D-002 | **Pass 1 = foundations + system + components + 2 flagship screens**; docs only, no token files yet | Fastest path to a meaningful review; reduce rework risk | User decision |
| D-001 | **Light theme default**, dark fully supported | Data-dense tool used all day at workstations → less eye strain, better print/export; dark still first-class | User decision + product type |

## Open items (to resolve as later docs are written)
- **O-1 Responsive:** wireframe says desktop-only is acceptable; user stack wants mobile/tablet. → Desktop-first primary; tablet/mobile graceful degradation; real mobile use is low priority. *(to be specified in `05-responsive/`)*
- **O-2 Outcome states:** adopt the wireframe's 4 distinct terminal states (Won/Regretted/Lost/Closed) over the deck's 2, for richer BD reporting. *(reflected in `07-ux-flows.md`)*
- **O-3 Dashboard & Reports:** the process-flow image lists "Dashboard & Reports" as a key feature, but MD §7.1's screen set has none. Currently **Enquiries List = home/dashboard** and **Overview KPI tiles** carry per-RFQ health. A dedicated cross-RFQ Dashboard & Reports screen is a **Phase-1.x candidate** — flagged, not silently dropped. *(see `04-screens/24-end-to-end-screen-flow.md`)*
