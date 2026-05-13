# 6.2 `useCategories` hook

## What to build

A TanStack Query hook that fetches `${NEXT_PUBLIC_API_BASE}/products/categories` from fakestoreapi. Returns a stable string array cached for 60s (matches the per-remote QueryClient default).

Refs: `sepc.md` §11, §12.

## Acceptance criteria

- [ ] `useCategories(): UseQueryResult<string[]>` exported
- [ ] Query key is `['categories']`
- [ ] Cached for 60s via the shared `queryClient` (no override needed)
- [ ] Returns the same array reference on repeat renders while data is fresh

## Blocked by

- `27-phase3-3.6-queryclient-singleton-afk.md`

## User stories covered

- Shopper #6 (filter by category)

## Status

Pending
