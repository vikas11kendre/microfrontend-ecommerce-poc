# 7.3 `CartSummary` (exposed as federated mini-cart)

## What to build

The mini-cart dropdown that the host's Navbar slot will mount. Lists line items (compact view), totals, and per-line remove. Renders `EmptyCart` when empty.

Subscribes to the `'auth:logout'` event (via `shared-store`'s `on`) — on receipt, clears its local optimistic UI state immediately (the Redux state will also clear via `clearCart` from the host, but this gives instant visual feedback on the widget).

This is the widget-tier MFE — its host wrapper (9.7) uses a `null` fallback so a remote-cart failure is invisible to users.

Refs: `sepc.md` §10, §17, §20.

## Acceptance criteria

- [ ] `CartSummary` exposed as `./CartSummary` from remote-cart
- [ ] Renders compact line items (image, title, qty × price) + totals + per-line remove
- [ ] Renders `EmptyCart` when `cart.items.length === 0`
- [ ] Subscribes to `'auth:logout'` on mount; unsubscribes on unmount
- [ ] On logout event, optimistic UI clears immediately (before next Redux sync)

## Blocked by

- `20-phase2-2.7-build-typed-event-bus-afk.md`
- `52-phase7-7.1-cartitem-afk.md`
- `53-phase7-7.2-emptycart-afk.md`

## User stories covered

- Shopper #14 (mini-cart dropdown)
- Shopper #15 (remove from mini-cart)
- Shopper #23 (logout clears cart UI)

## Status

Pending
