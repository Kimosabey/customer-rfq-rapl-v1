# 41 · Data Visualization & Charts

> **Cross-refs:** [38 · Dashboard & Reports](../04-screens/38-dashboard-and-reports.md) · [09 · Color](09-color-system.md) · [14 · Accessibility](14-accessibility-wcag22.md)
> Principle: **a chart must be understood at a glance.** Every chart states its **intent** (a derived insight), is **interactive**, and has an **accessible fallback**. No decoration-only charts.

## 1. Library choice
- **Primary: Apache ECharts** (`echarts-for-react`) — rich, interactive (tooltips, drill-down, brush/zoom, legend toggle), themable to our tokens, handles large datasets. Use for the **Dashboard & Reports** analytics.
- **Lightweight inline:** small sparklines / mini-bars may use **Tremor** or **Recharts** where ECharts is overkill.
- *Note:* a charting lib is an **addition to the base stack** — flag for approval; ECharts is the recommended pick.
- Theme ECharts from our CSS tokens (status hues, neutral grid, Geist font) so charts match the app in light & dark.

## 2. "Insight-first" rule (infer & give intent) — each chart is a mini-infographic
Treat every chart as a **mini-infographic**, not a raw plot: **title + a one-line auto-derived insight + the viz + a delta indicator (↑/↓ vs last period)** — so a viewer understands what it says **in one glance**, before reading any axis. Every chart card carries a **one-line auto-derived insight** — the takeaway, not just the picture:
- Bar (RFQs by stage): *"SCM is the bottleneck — 17 of 42 active RFQs (40%) are in sourcing."*
- Donut (outcomes): *"Win rate 62%, up 4 pts vs last quarter."*
- Line (turnaround): *"Median turnaround down to 11 days from 14."*
- Aging: *"4 RFQs overdue — oldest is 26 days."*
These captions are generated from the data (thresholds/comparisons), so a viewer **understands without studying axes**.

## 2b. The information lives IN the viz (self-explaining charts)
The caption is the headline; the **chart itself must also carry the data** so it reads with zero axis-hunting. Bake meaning into the marks (all native ECharts features):
- **Direct data labels** on marks — value on/above each bar, **% on each donut slice**, last value on a line — so numbers are visible at rest (`series.label`).
- **Target / threshold lines** — SLA target on turnaround, target win-rate, due-date line (`markLine`); the viewer instantly sees above/below target.
- **Annotation callouts** on notable points — peak, overdue, anomaly, "you are here" (`markPoint`).
- **Reference bands** — shade a "healthy" vs "at-risk" range (`markArea`), e.g. turnaround ≤ 12 days green band.
- **Inline delta** — ↑/↓ vs last period rendered on the chart, color-coded (green up / red down by metric polarity).
- **Inline legend labels** — label series at the end of the line / on the slice, so no separate legend hunt.
- **Discipline:** label the **meaningful** points (max, target breach, latest), not every datapoint — clarity over density. Tooltips carry the exhaustive detail on hover/focus.

> Rule of thumb: cover the side-caption and the chart should **still** tell its story from the in-viz labels, target line, and annotations alone.

## 3. Chart types → analytics
| Analytic | Chart | Interaction |
|---|---|---|
| RFQs by stage | horizontal/vertical **bar** | click bar → filtered Enquiries List |
| Outcomes (Won/Regretted/Lost/Closed) | **donut** | hover %, click → list |
| Turnaround over time | **line** (median) | time-range brush, hover point |
| Pipeline conversion | **funnel** | stage drop-off tooltip |
| Aging / overdue | **heatmap** or sorted bar | click → RFQ |
| Win rate / SLA | **gauge** | threshold bands (target line) |
| Volume by customer | **stacked bar** | toggle series via legend |

## 4. Interactivity (required)
- **Tooltips** on hover/focus with exact values + context.
- **Drill-down:** clicking a segment navigates to the filtered list/RFQ.
- **Legend toggle** to show/hide series; **time-range brush** on trends.
- **Cross-filter** (optional): selecting a stage filters sibling tiles.
- **Empty/loading:** skeleton chart placeholder; "no data for this range" message.

## 5. Visual style (matches the system)
- Use **status hues** for categorical (stage/outcome), a single brand-indigo ramp for sequential/quantitative.
- Neutral gridlines (`--border`), muted axis labels (`--muted-fg`), Geist font, tabular numerals, `₹` formatting (en-IN).
- Restraint: no 3D, no heavy gradients inside data marks, max ~6 categorical colors visible at once.
- Light + dark themes: re-theme on toggle (axis/grid/tooltip backgrounds from tokens).

## 6. Accessibility (charts are not vision-only)
- Each chart has an **accessible name + summary** (the insight caption doubles as this) and an associated **data table** (toggle "View as table" or visually-hidden) — satisfies 1.1.1 / 1.4.1.
- Color paired with **labels/patterns**; never rely on hue alone to distinguish series.
- Keyboard: focusable data points where feasible; tooltips reachable.
- Respect `prefers-reduced-motion` (disable enter/transition animations); honor contrast for labels.

## Claude Design brief
> Use **Apache ECharts** for dashboard analytics — interactive (tooltips, click-to-drill-down, legend toggle, time brush) and themed to our tokens (status hues, neutral grid, Geist, ₹ en-IN, light/dark). **Every chart is insight-first:** show a one-line derived takeaway ("SCM is the bottleneck — 40% of active RFQs") so it's understood at a glance, not just a picture. Charts: bar (RFQs by stage), donut (outcomes), line (turnaround trend), funnel (conversion), gauge (win rate/SLA), heatmap (aging). Every chart has an accessible summary + a "view as table" fallback; color always paired with labels. Loading = skeleton chart; empty = "no data for this range."
