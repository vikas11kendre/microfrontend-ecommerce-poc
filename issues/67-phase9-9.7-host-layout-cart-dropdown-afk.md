# 9.7 host `Layout` with `cartDropdown` slot

## What to build

In the host's `Layout` component, dynamic-import `remoteCart/CartSummary` (`ssr: false`) and pass it to `Navbar`'s `cartDropdown` slot prop. Wrap the federated `CartSummary` in its OWN `ErrorBoundary` whose fallback is `null` (NOT `RemoteError`).

This is the widget-tier fault isolation pattern — distinct from page-tier. If remote-cart is dead, the mini-cart silently disappears, the navbar stays intact, and the cart icon falls back to its default behavior (link to `/cart`).

Refs: `sepc.md` §14, §15.

## Acceptance criteria

- [ ] Layout dynamic-imports `remoteCart/CartSummary` with `ssr: false`
- [ ] CartSummary wrapped in an `ErrorBoundary` with `fallback={() => null}`
- [ ] Killing remote-cart: mini-cart silently absent, navbar unchanged, cart icon click navigates to `/cart` (which itself shows RemoteError per 9.3)
- [ ] When remote-cart is alive, mini-cart renders inside the navbar slot

## Blocked by

- `12-phase1-1.6-build-navbar-hitl.md`
- `35-phase5-5.1-errorboundary-retry-afk.md`
- `54-phase7-7.3-cartsummary-exposed-afk.md`

## User stories covered

- Shopper #14 (mini-cart dropdown)
- Shopper #24 (navbar never breaks)
- Shopper #25 (widget-tier silent fallback)

## Status

Pending
