# 8.4 `OrdersPage` (exposed)

## What to build

The page exposed as `./OrdersPage`. Composes `useOrder` + `OrderSuccess`. Works at host's `/orders` and standalone `:3003/`.

Refs: `sepc.md` §17.

## Acceptance criteria

- [ ] `OrdersPage` exposed as `./OrdersPage`
- [ ] Renders `OrderSuccess` (which uses `OrderSummary` if you choose to include it on the page)
- [ ] Missing `?id` redirects to `/` (via `useOrder`)
- [ ] Works at host `/orders` AND standalone `:3003/`

## Blocked by

- `57-phase8-8.1-ordersummary-afk.md`
- `58-phase8-8.2-ordersuccess-afk.md`
- `59-phase8-8.3-useorder-hook-afk.md`

## User stories covered

- Shopper #19

## Status

Pending
