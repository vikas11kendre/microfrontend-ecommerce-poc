# 6.3 `CategoryTabs`

## What to build

A horizontal tab strip rendered from `useCategories()`. Selecting a tab writes `?category=<name>` to the URL via `router.push` (replaces, not appends). Active state is read back from `router.query.category`.

Refs: `sepc.md` §11, §12.

## Acceptance criteria

- [ ] Renders one tab per category returned by `useCategories`
- [ ] Includes an "All" tab that clears `?category`
- [ ] Clicking a tab updates the URL and the active highlight
- [ ] Active tab is derived from `router.query.category` (so browser back/forward restores it)

## Blocked by

- `40-phase6-6.2-usecategories-hook-afk.md`

## User stories covered

- Shopper #6 (category filter)
- Shopper #8 (URL reflects filter state)

## Status

Pending
