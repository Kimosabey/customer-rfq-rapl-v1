# Customer RFQ Platform — Rangsons Aerospace

Internal web app that digitizes Rangsons Aerospace's **customer RFQ → Quotation** process across 6 departments + Admin, with full traceability, revision history, gated approvals, and notifications. Replaces an Excel-based workflow so nothing is lost, status is always glanceable, and every change is auditable.

> **Designed by Harshan Aiyappa · Full Stack AI Engineer.** Style: "Calm Enterprise" — light default + full dark, Geist font, aerospace blueprint background, ECharts analytics.

## Tech stack
| Layer | Tech |
|---|---|
| **Frontend** | React 18 + Vite + TypeScript + Tailwind v4 + shadcn/ui + Radix + Lucide + Framer Motion + TanStack Query/Table + React Hook Form + Zod + Apache ECharts |
| **Backend** | Node.js + Express + Mongoose |
| **Database** | MongoDB (local) |

## Repository structure
```
.
├── client/        React + Vite frontend (app shell, screens, components, tokens)
│   ├── public/    logos (favicon + brand marks)
│   └── src/       app, components, pages, lib (api, theme)
├── server/        Node + Express + Mongoose API
│   └── src/       app.ts, db.ts, models/, seed.ts
├── design/        Design system + full UI/UX documentation (source of truth)
│   ├── 00-foundations · 01-architecture · 02-design-system · 03-components
│   ├── 04-screens · 05-responsive · 07-references
│   ├── 06-handoff/  PRD, prompts, globals.css, impl plan, claude-design-package/
│   ├── design-guidelines.html   ← open in a browser: the visual brand guideline
│   └── README.md · UX-REVIEW-AND-RATINGS.md · END-TO-END-CHECKLIST.md · …
└── sources/       Original inputs (AeroQuote spec, RFQ.pptx SOP, process-flow image,
                   colorstheme.txt, brand logos)
```

## Getting started (local)

**Prerequisites:** Node 18+, a local MongoDB running at `mongodb://localhost:27017`.

```bash
# 1) Backend
cd server
npm install
cp .env.example .env          # MONGO_URI + PORT
npm run seed                  # seed users + sample RFQs (dummy data)
npm run dev                   # API on http://localhost:4000

# 2) Frontend (new terminal)
cd client
npm install
npm run dev                   # app on http://localhost:5173 (proxies /api → :4000)
```

Sign in with any seeded email (e.g. `harshan.aiyappa@lingotran.com`); role is resolved server-side. Switch theme with the top-bar toggle.

## The 7 roles
BD · Engineering · CFT · SCM · Estimation · CEO/COO · Admin — nav, actions, and screens are role-gated ([design/01-architecture/08-role-visibility-matrix.md](design/01-architecture/08-role-visibility-matrix.md)).

## Documentation
- **Visual guideline:** [design/design-guidelines.html](design/design-guidelines.html)
- **Spec index / how to read:** [design/README.md](design/README.md)
- **Canonical flow (12 steps, 8 states, 4 gates):** [design/01-architecture/07-ux-flows.md](design/01-architecture/07-ux-flows.md)
- **PRD + Claude Design prompts + tokens:** [design/06-handoff/](design/06-handoff/)
- **Implementation plan (this app):** [design/06-handoff/46-implementation-plan.md](design/06-handoff/46-implementation-plan.md)

## Status
Design system + hifi prototype: **complete**. App build: **in progress** — server (Express + Mongoose + seed) and client foundation (shell, theme, Enquiries List, Dashboard) wired to the API; remaining screens are being ported from the design specs screen-by-screen.
