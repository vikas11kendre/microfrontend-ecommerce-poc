# 1.6 Build `Navbar`  (HITL — visual parity check)

## What to build

The shared navbar used by both host and remotes-in-standalone-mode. Reads cart count from `shared-store` (renders Badge) and reads auth state to switch between Login / Logout button. Supports a `cartDropdown` slot prop: when provided, clicking the cart icon opens the slot content (mini-cart); when absent, the icon is a link to `/cart`.

This is the load-bearing component for "navbar never breaks" (shopper #24) — it lives outside ErrorBoundaries and must not depend on any remote.

**HITL** because the final DoD is a visual side-by-side check: open `:3000` (host) and `:3001` (standalone remote) and confirm the navbar looks identical.

Refs: `sepc.md` §10.

## Acceptance criteria

- [ ] `Navbar` accepts `cartDropdown?: React.ReactNode`
- [ ] Cart icon shows `Badge` with count from `useAppSelector(state => state.cart.totalCount)`
- [ ] When `cartDropdown` is provided, clicking the cart icon toggles a popover containing the slot content
- [ ] When `cartDropdown` is absent, clicking the cart icon navigates to `/cart`
- [ ] Login/Logout button is driven by `state.auth.isAuthenticated`
- [ ] Visual parity verified: open host (`:3000`) and any standalone remote (`:3001`) — navbar renders identically (you complete this step once all of Phase 3 + 9.7 exist)

## Blocked by

- `08-phase1-1.2-build-button-afk.md`
- `10-phase1-1.4-build-badge-afk.md`
- Soft dependency: needs `shared-store` from Phase 2 to read state (build component first, wire state once 2.5 lands)

## User stories covered

- Shopper #13 (badge count updates immediately)
- Shopper #14 (mini-cart dropdown)
- Shopper #24 (navbar never breaks)
- Dev #29 (standalone parity)

## Status

Pending
