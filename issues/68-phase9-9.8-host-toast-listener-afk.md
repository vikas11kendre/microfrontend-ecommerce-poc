# 9.8 host toast listener

## What to build

In the host's `Layout`, subscribe to `'product:added-to-cart'` via `shared-store`'s `on`. On receipt, show a transient toast with the product title (e.g., "Added: <title>"). Auto-dismiss after ~2.5s.

The host owns this UX — the remote-products emits, the host listens. Demonstrates cross-MFE comms without remote-products knowing about the toast.

Refs: `sepc.md` §14, §20.

## Acceptance criteria

- [ ] `Layout` subscribes to `'product:added-to-cart'` on mount; unsubscribes on unmount
- [ ] On event, shows a toast with the product title
- [ ] Toast auto-dismisses after ~2.5s
- [ ] Multiple rapid adds queue or replace gracefully (no overlap stack)
- [ ] Add from `ProductDetailPage` (on any remote-products route) → toast appears in host UI

## Blocked by

- `20-phase2-2.7-build-typed-event-bus-afk.md`
- `50-phase6-6.12-productdetailpage-exposed-afk.md`

## User stories covered

- Shopper #12 (toast confirmation on add)

## Status

Pending
