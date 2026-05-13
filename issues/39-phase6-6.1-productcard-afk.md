# 6.1 `ProductCard`

## What to build

A product list item showing image (via `next/image`), title, price, and rating. Wrapped in `React.memo` so unchanged cards skip re-render during list updates.

Refs: `sepc.md` §11, §12.

## Acceptance criteria

- [ ] Renders product image with `next/image` (proper width/height, alt text from product title)
- [ ] Shows title, price (formatted as USD), rating (stars or numeric)
- [ ] Wrapped in `React.memo` with shallow equality check on the product prop
- [ ] In a list of 20 items, scrolling/sorting does not re-render unchanged cards (verify with React Profiler or a counted-render test)

## Blocked by

- `09-phase1-1.3-build-card-afk.md`

## User stories covered

- Shopper #1 (browse products)
- Shopper #2 (see image/title/price/rating)

## Status

Pending
