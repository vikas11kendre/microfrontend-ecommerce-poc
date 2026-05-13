# 8.3 `useOrder` hook

## What to build

Reads `id` from `router.query`. If missing or malformed, redirects to `/` (via `router.replace`). Returns the id when present.

Hook stays minimal — a placeholder for future expansion (fetching order details from a real backend). Today it only validates and returns.

Refs: `sepc.md` §17.

## Acceptance criteria

- [ ] `useOrder(): { id: string }` exported
- [ ] If `router.query.id` is missing/empty, calls `router.replace('/')` and returns nothing renderable
- [ ] Once id is present, returns it stably

## Blocked by

- `22-phase3-3.1-init-nextjs-apps-afk.md`

## User stories covered

- Shopper #19

## Status

Pending
