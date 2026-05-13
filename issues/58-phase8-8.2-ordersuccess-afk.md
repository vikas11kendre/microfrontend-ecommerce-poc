# 8.2 `OrderSuccess`

## What to build

The success screen shown after place-order. Reads the mock order id from the URL query string (`?id=ORD-...`), displays it prominently, and has a "Continue Shopping" button that navigates to `/`.

Refs: `sepc.md` §17.

## Acceptance criteria

- [ ] Shows a success heading + the order id from `router.query.id`
- [ ] "Continue Shopping" button navigates to `/`
- [ ] Renders nothing degenerate if the id is missing (paired with `useOrder` redirect in 8.3)

## Blocked by

- `08-phase1-1.2-build-button-afk.md`

## User stories covered

- Shopper #19 (order confirmation with mock order id)

## Status

Pending
