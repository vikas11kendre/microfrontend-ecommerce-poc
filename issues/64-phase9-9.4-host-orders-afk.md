# 9.4 host `orders.tsx`

## What to build

Host's `pages/orders.tsx` dynamic-imports `remoteOrders/OrdersPage` with the page-tier fault-isolation wrapper.

Refs: `sepc.md` §13, §14.

## Acceptance criteria

- [ ] Uses `dynamic(() => import('remoteOrders/OrdersPage'), { ssr: false })`
- [ ] Wrapped in `ErrorBoundary` + `Suspense` with `RemoteError` fallback
- [ ] Killing remote-orders shows the RemoteError card; navbar still works

## Blocked by

- `60-phase8-8.4-orderspage-exposed-afk.md`
- `61-phase9-9.1-host-index-afk.md`

## User stories covered

- Shopper #19 (order confirmation)
- Shopper #24, #25

## Status

Pending
