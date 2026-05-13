# 6.11 `useProduct(id)` hook

## What to build

A TanStack Query hook for fetching a single product by id (`/products/${id}`). Returns an isolated cache from the listing — different query key, no shared state.

Refs: `sepc.md` §11, §12.

## Acceptance criteria

- [ ] `useProduct(id: string | number): UseQueryResult<Product>` exported
- [ ] Query key is `['product', id]`
- [ ] Listing cache (from `useProducts`) and detail cache (from `useProduct`) are isolated — modifying one does not affect the other

## Blocked by

- `27-phase3-3.6-queryclient-singleton-afk.md`

## User stories covered

- Shopper #3 (product detail)

## Status

Pending
