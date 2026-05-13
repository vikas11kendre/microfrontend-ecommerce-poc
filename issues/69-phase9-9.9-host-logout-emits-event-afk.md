# 9.9 host logout emits event

## What to build

Wire the navbar's Logout button to a host-level handler that:
1. Dispatches `authSlice.actions.logout()`
2. Dispatches `cartSlice.actions.clearCart()`
3. Emits `'auth:logout'` event via `shared-store`'s `emit`
4. Removes the `auth-token` cookie
5. Redirects to `/`

The event lets the federated `CartSummary` (7.3) clear its optimistic UI immediately, even before Redux state propagates.

Refs: `sepc.md` §14, §20.

## Acceptance criteria

- [ ] Logout handler does all 5 steps in order
- [ ] After logout: Redux auth state cleared, cart cleared, cookie removed, mini-cart UI cleared (instant via event)
- [ ] Logging out clears mini-cart optimistic UI within one frame (verifiable by the E2E in 10.7)

## Blocked by

- `12-phase1-1.6-build-navbar-hitl.md`
- `54-phase7-7.3-cartsummary-exposed-afk.md`
- `65-phase9-9.5-host-login-afk.md`

## User stories covered

- Shopper #23 (logout ends session, resets cart)

## Status

Pending
