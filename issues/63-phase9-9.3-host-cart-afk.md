# 9.3 host `cart.tsx`

## What to build

Host's `pages/cart.tsx` dynamic-imports `remoteCart/CartPage` with the page-tier fault-isolation wrapper.

Refs: `sepc.md` §13, §14.

## Acceptance criteria

- [ ] Uses `dynamic(() => import('remoteCart/CartPage'), { ssr: false })`
- [ ] Wrapped in `ErrorBoundary` + `Suspense` with `RemoteError` fallback
- [ ] Killing remote-cart shows the RemoteError card; navbar still works

## Blocked by

- `56-phase7-7.5-cartpage-exposed-afk.md`
- `61-phase9-9.1-host-index-afk.md`

## User stories covered

- Shopper #16 (cart page)
- Shopper #24, #25

## Status

Pending
