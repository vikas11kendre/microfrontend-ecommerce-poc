# 6.7 `usePagination` hook

## What to build

A small hook that holds pagination mode state: `'infinite' | 'load-more'`. Persisted in local component state only (not URL, not localStorage — the toggle is per-session UX).

Refs: `sepc.md` §11, §12.

## Acceptance criteria

- [ ] `usePagination(): { mode, setMode }` exported
- [ ] Default mode is `'infinite'`
- [ ] Toggling `setMode` does NOT refetch products (same `useInfiniteQuery` data, just different trigger)
- [ ] State is per-component (not global)

## Blocked by

- `22-phase3-3.1-init-nextjs-apps-afk.md`

## User stories covered

- Shopper #9 (infinite scroll vs load-more)

## Status

Pending
