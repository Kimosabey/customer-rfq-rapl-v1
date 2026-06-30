# 46 · Implementation Plan — React + Node.js + MongoDB

> The build plan for **later** (after Claude Design produces screens). Stack: **React.js SPA + Node.js/Express API + MongoDB (local)**. Maps the design + canonical flow to real code. Designed by Harshan Aiyappa.
> **Cross-refs:** [07 · UX Flows](../01-architecture/07-ux-flows.md) · [08 · Roles](../01-architecture/08-role-visibility-matrix.md) · [globals.css](globals.css) · [45 · Prompts](45-claude-design-prompts.md)

## Architecture (decoupled)
```
React SPA (Vite)  ──HTTP/JSON──▶  Node.js/Express API  ──Mongoose──▶  MongoDB (local)
  TanStack Query                    JWT auth + RBAC                     mongodb://localhost:27017/rapl_rfq
```

## Repo layout
```
/client  (React + Vite + TS)
  src/ app/ (router) · components/ (shadcn) · features/<domain>/ · lib/(api,query,auth) · styles/globals.css
/server  (Node + Express + TS)
  src/ models/ · routes/ · controllers/ · middleware/(auth,rbac,validate) · services/(revision,notify,cost) · db.ts · app.ts
.env  (MONGO_URI, JWT_SECRET, PORT)
```

## Frontend stack
React 18+ · React Router · **TanStack Query** (server state) · **Zustand** (UI: filters, density, theme) · **React Hook Form + Zod** · **Tailwind v4 + shadcn/ui + Radix** · Lucide · Framer Motion · **TanStack Table** · **ECharts** (`echarts-for-react`). Theme: a small React provider toggling `.dark` on `<html>` (persist in localStorage). Fonts: self-host Geist + Geist Mono (`@fontsource`). Use [globals.css](globals.css) verbatim.

## Backend stack
Node + **Express** + TypeScript · **Mongoose** · **JWT** auth (`/auth/login`, `express-rate-limit`) · **Zod** request validation (mirror the gates) · RBAC middleware from [08](../01-architecture/08-role-visibility-matrix.md).

## Data models (Mongoose)
- **User** `{ name, email, passwordHash, role: enum(BD|Engineering|CFT|SCM|Estimation|CEO_COO|Admin), active }`
- **Enquiry** `{ rfqNumber, customerName, location, contacts{name,email,phone}, sow, businessType, rfqDescription, noOfParts, rfqReceivedDate, customerDueDate, fileAgoLink, status: enum(8 forward + branches), outcome, createdBy, timestamps }` — `totalDurationDays` computed at read.
- **BomLine** `{ enquiryId, partRef, kind: product|process, classification: enum(material|standard|subcon|special_process|consumables), spec, qty, customerRequirement: { kind: none|specified, value }, feasibilityComments }`
- **SmeConsultation** `{ bomLineId, discipline, smeName, question, response, status: open|resolved }`
- **Feasibility** `{ enquiryId, manufacturability, riskRating: low|med|high, signoffs:[{party,name,date,comment}], decision: approved|revise }`
- **ScmQuote** `{ bomLineId, contracted: bool, supplier, pricePerUnit, moq, leadTimeDays, sapCode, quoteDate }`
- **MissingDetailQuery** `{ enquiryId, raisedBy, toRole, message, status }`
- **CostSheet** `{ enquiryId, lines:[{ stage: enum(6), label, qty, rate, amount, isStale, sourceRef }], engineeringRev, scmQuoteDate, totalSellingPrice, status }`
- **Approval** `{ enquiryId, committee:[{role,name,decision}], meetingNotes, ok: bool, chain:[{level,approver,date,status}] }`
- **Revision** `{ enquiryId, bomLineId?, revNo, field, oldValue, newValue, changedBy, changedAt, source: engineering_revision|scm_query, reason, recalcRequired }`
- **NotificationLog** `{ type: enum(5), enquiryId, recipientRole, message, read, createdAt }`
- **Settings** `{ overheadPct, marginPct, machineRate, labourRate }`

## API (representative)
`POST /auth/login` · `GET/POST /enquiries` · `GET/PATCH /enquiries/:id` · `POST /enquiries/:id/acknowledge` · `POST /enquiries/:id/notify-engineering` · `POST /enquiries/:id/completeness` · `GET/POST/PATCH /enquiries/:id/bom` · `POST /bom/:id/sme` · `GET/PUT /enquiries/:id/feasibility` · `GET/PATCH /enquiries/:id/scm` (quote save **rejects** New-Enquiry line missing supplier/date) · `GET/POST /enquiries/:id/cost-sheet` + `POST .../recalculate` + `POST .../submit` · `GET/POST /enquiries/:id/approval` (Not OK → status `In Estimation`) · `GET /enquiries/:id/revisions` · `GET /notifications` + `PATCH read` · `GET/PUT /admin/settings` · `GET/POST/PATCH /admin/users` · `GET /dashboard/summary`.

## Cross-cutting services
- **Revision hook:** on any BOM/SCM change → write `Revision` + set referencing `CostSheet.lines.isStale=true` + emit `BOM_REVISED`.
- **Notifications:** the 5 triggers ([07 §F](../01-architecture/07-ux-flows.md)) write `NotificationLog` (+ email later).
- **Status state machine:** central guard validates legal transitions; gates enforced server-side (completeness, contracted-item, approval loop) — UI mirrors with Zod.
- **Cost engine:** 6-stage roll-up using `Settings` rates; subtotals/total computed.

## Build order
1. Scaffold client+server, `globals.css`, theme provider, shadcn init, Mongo connect, seed users (the 7 dummy people).
2. Auth + RBAC + Login/Landing.
3. App shell + rich sidebar + ⌘K.
4. Enquiries List + New Enquiry (+ status transitions, notifications).
5. Enquiry Overview (stage tracker, KPIs).
6. Workspace screens: Parts & BOM → CFT → SCM (gate) → Cost Sheet (recalc) → Approval (chain) → Revision Log.
7. Dashboard (ECharts aggregates) + Admin.
8. Polish: states, a11y pass (axe), responsive, OKLCH token conversion.

## Local dev
`mongod` (local) · `MONGO_URI=mongodb://localhost:27017/rapl_rfq` · `cd server && npm i && npm run dev` · `cd client && npm i && npm run dev` · seed script creates users + a few sample RFQs from [DUMMY-DATA](../07-references/DUMMY-DATA.md).
