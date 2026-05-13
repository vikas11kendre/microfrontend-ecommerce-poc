# 9.1 host `index.tsx`

## What to build

Host's `pages/index.tsx` dynamically imports `remoteProducts/ProductsPage` with `ssr: false`, wraps it in an `ErrorBoundary` (fallback: `RemoteError name="products" onRetry={retry}`) and a `<Suspense>` (fallback: `Spinner` or a skeleton).

This is the page-tier fault isolation pattern, applied for the first time. Same pattern repeats in 9.2/9.3/9.4.

Refs: `sepc.md` §13, §14.

## Acceptance criteria

- [ ] `pages/index.tsx` uses `dynamic(() => import('remoteProducts/ProductsPage'), { ssr: false })`
- [ ] Wrapped in `<ErrorBoundary fallback={...RemoteError}>` + `<Suspense fallback={...}>`
- [ ] Killing `remote-products` (stop its dev server) → host page shows `RemoteError` card, navbar/footer still work, retry button is functional
- [ ] Recovery: bringing remote-products back and clicking retry loads the page

## Blocked by

- `34-phase4-4.7-host-bootstrap-in-app-afk.md`
- `36-phase5-5.2-remoteerror-card-afk.md`
- `48-phase6-6.10-productspage-exposed-afk.md`

## User stories covered

- Shopper #1 (browse)
- Shopper #24, #25 (fault isolation)
- Interviewer #41

## Status

Pending
