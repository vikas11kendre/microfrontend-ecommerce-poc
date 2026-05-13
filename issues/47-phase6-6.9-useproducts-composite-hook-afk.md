# 6.9 `useProducts` composite hook

## What to build

A TanStack `useInfiniteQuery` hook keyed on `[search, sort, category]` (all read from `router.query`). Fetches products from fakestoreapi. Since fakestoreapi has no `?search` param, search is applied client-side as a filter step after fetch. Sort and category use the API's parameters where available, client-side otherwise.

Refs: `sepc.md` §11, §12.

## Acceptance criteria

- [ ] `useProducts(): UseInfiniteQueryResult<Product[]>` exported
- [ ] Query key is `['products', { search, sort, category }]` and changes refetch
- [ ] Search filter applied client-side (since fakestoreapi has no search endpoint)
- [ ] Pagination uses `useInfiniteQuery` with a sensible `getNextPageParam`
- [ ] URL params drive the query key (so back/forward refetches correctly)

## Blocked by

- `27-phase3-3.6-queryclient-singleton-afk.md`
- `42-phase6-6.4-usedebounce-hook-afk.md`

## User stories covered

- Shopper #4, #5, #6, #7, #8, #9

## Status

Pending
