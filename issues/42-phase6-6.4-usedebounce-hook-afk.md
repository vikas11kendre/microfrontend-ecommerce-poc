# 6.4 `useDebounce` hook

## What to build

Generic `useDebounce<T>(value: T, delayMs: number): T`. Returns the latest value only after `delayMs` of no changes. Used by `SearchBar` to avoid refiltering on every keystroke.

Refs: `sepc.md` §11, §12.

## Acceptance criteria

- [ ] `useDebounce<T>(value, delayMs)` exported
- [ ] Under rapid input changes, the returned value updates only after `delayMs` of idle time
- [ ] Cleanup runs on unmount (no setTimeout leaks)
- [ ] Unit test (with fake timers) verifies idle-time behavior

## Blocked by

- `22-phase3-3.1-init-nextjs-apps-afk.md`

## User stories covered

- Shopper #5 (responsive search, no jarring keystroke-by-keystroke refetch)

## Status

Pending
