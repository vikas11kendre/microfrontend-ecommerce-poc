# 9.2 host `product/[id].tsx`

## What to build

Host's `pages/product/[id].tsx` dynamic-imports `remoteProducts/ProductDetailPage` with the same page-tier fault-isolation wrapper as 9.1.

Refs: `sepc.md` §13, §14.

## Acceptance criteria

- [ ] Uses `dynamic(() => import('remoteProducts/ProductDetailPage'), { ssr: false })`
- [ ] Wrapped in `ErrorBoundary` + `Suspense` with `RemoteError` fallback
- [ ] Killing remote-products shows the RemoteError card; navbar still works

## Blocked by

- `50-phase6-6.12-productdetailpage-exposed-afk.md`
- `61-phase9-9.1-host-index-afk.md` (template pattern established there)

## User stories covered

- Shopper #3 (detail page)
- Shopper #24, #25

## Status

Pending
