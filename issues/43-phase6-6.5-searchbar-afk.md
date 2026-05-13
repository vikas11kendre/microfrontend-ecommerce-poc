# 6.5 `SearchBar`

## What to build

A controlled text input. Its raw value is the local state (typing-responsive); the debounced value (via `useDebounce(value, 300)`) is what gets written to `?q=<term>` and consumed by `useProducts`.

Refs: `sepc.md` §11, §12.

## Acceptance criteria

- [ ] Controlled `<input>` with local state for instant feedback
- [ ] Debounced value (300ms) is what writes to `router.query.q`
- [ ] Typing fast does NOT update `router.query.q` on every keystroke (verify by counting `router.push` calls in a test or manually)
- [ ] Has accessible label

## Blocked by

- `42-phase6-6.4-usedebounce-hook-afk.md`

## User stories covered

- Shopper #4 (search by name)
- Shopper #5 (no stale-result flashing)

## Status

Pending
