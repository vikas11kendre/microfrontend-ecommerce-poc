# 6.6 `SortFilter` dropdown

## What to build

A `<select>` with options `price-asc`, `price-desc`, `rating-desc`. Writes `?sort=<value>` to the URL. Active selection is read back from `router.query.sort`.

Refs: `sepc.md` §11, §12.

## Acceptance criteria

- [ ] Renders three options with human-readable labels
- [ ] Selection writes `?sort=<value>` via `router.push`
- [ ] Selection is derived from `router.query.sort` on mount + change
- [ ] Browser back/forward restores the prior sort

## Blocked by

- `22-phase3-3.1-init-nextjs-apps-afk.md`

## User stories covered

- Shopper #7 (sort by price/rating)
- Shopper #8 (URL reflects sort)

## Status

Pending
