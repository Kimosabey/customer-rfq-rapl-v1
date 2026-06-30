# 37 · States & Notifications (reference)

> **Cross-refs:** [16 · Components](16-component-library-overview.md) · [36 · Content](../02-design-system/36-content-and-formatting.md) · [12 · Motion](../02-design-system/12-elevation-and-motion.md) · [14 · Accessibility](../02-design-system/14-accessibility-wcag22.md)
> Centralizes the four universal states + the notification system so every screen handles them identically.

## 1. Universal states (every data surface ships all of these)

| State | Pattern |
|---|---|
| **Loading** | **Skeleton** (never spinners for content) matching the final layout; shimmer animation; preserve header/toolbar |
| **Empty** | Icon + title + description + primary action (copy in [36 §7](../02-design-system/36-content-and-formatting.md)) |
| **Error** | Inline (field) · banner (section) · toast (action) · full-page (route) — always text + retry where possible |
| **No-access** | Hidden in nav; if reached directly, a clear "no access" page (don't leak data) |
| **Success** | Toast + optimistic UI update + `aria-live` announcement |

## 2. Skeleton patterns
- **Table:** 5–8 placeholder rows at current density; header stays real.
- **Cards / KPI:** grey blocks for value + label.
- **Timeline:** 3 placeholder nodes on the rail.
- **Form:** label + input-height bars.
- Shimmer = subtle left-to-right sweep, `motion-base`, disabled under `prefers-reduced-motion`.

## 3. Error taxonomy
| Type | Surface | Example |
|---|---|---|
| Field validation | inline under field | `Enter a valid email address.` |
| **Gate block** (mandatory / contracted-item) | inline banner above action | `2 lines need a supplier and quote date before you can save.` |
| API / business rule | toast (error) | `Couldn't submit — the cost sheet has stale lines.` |
| Network | toast + Retry | `Couldn't save — check your connection.` |
| Permission | page/section | `You don't have access to edit this.` |
| Not found | full page | `This RFQ doesn't exist or was removed.` |

## 4. Toasts (Radix Toast)
- **Severities:** success · info · warning · error — each = icon + color + **text** (not color-only).
- **Position:** top-right; stack max 3; **auto-dismiss 5s** (success/info), **persist** (error) until dismissed.
- **Action slot:** optional ("Undo," "View," "Retry").
- **A11y:** region `aria-live="polite"` (assertive for errors); `role="status"`; focusable actions.

## 5. Notification center (the bell)
- Lists `NotificationLog` items, newest first; **unread** dot + count badge on the bell.
- Each item: **type icon** + message ([36 §9](../02-design-system/36-content-and-formatting.md)) + RFQ link + relative time + read/unread.
- Actions: click → deep-link to the owed screen; mark read / mark all read; group by day.
- The 5 triggers fire **toast (if you're online & relevant) + center entry + email**; `BOM_REVISED` is center+email only (no forced navigation — it raises a flag, per flow §F).

## 6. Confirmation dialogs (Radix Dialog)
Use for **irreversible or cross-boundary** actions only:
- `Save & Notify Engineering` (handoff) · `Return to BD` · `Mark Not OK` · `Send Quotation` · `Record outcome` · `Deactivate user`.
- Pattern: title (the action) + consequence sentence + `Cancel` / primary confirm; destructive confirm uses `--destructive-strong`.
- Don't over-confirm routine saves.

## 7. Optimistic updates
- Status transitions and saves update the UI immediately (TanStack Query optimistic) + toast; on failure, roll back + error toast. Stage tracker animates the new state on success.

## Claude Design brief
> Standardize states across all screens: **skeleton loaders** (not spinners) shaped like the real content with a subtle shimmer; **empty states** with icon + title + description + action; **errors** as inline (field), banner (gate blocks listing what's wrong), or toast; a **no-access** page. **Toasts** top-right, 4 severities (icon+text), auto-dismiss except errors, optional action button. A **notification center** on the bell: unread count, list of items (icon + message + RFQ link + time), deep-linking to the relevant screen. **Confirmation dialogs** only for irreversible/handoff/destructive actions. Light default, dark supported, WCAG AA, honors reduced-motion.
