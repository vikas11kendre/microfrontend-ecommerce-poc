# 6.12 `ProductDetailPage` (exposed)

## What to build

Page at `pages/product/[id].tsx`, exposed as `./ProductDetailPage`. Renders the product (via `useProduct(id)`) and an "Add to cart" button.

Clicking "Add to cart" performs a SINGLE side effect that is BOTH:
1. Dispatches `cartSlice.addItem(product)` (state mutation — source of truth)
2. Emits `'product:added-to-cart'` event with `{ product }` (notification — for host toast in 9.8)

These are two facets of one user action — see `sepc.md` §20 "single fact, single emission" rule. Don't subscribe to the event to mutate state; don't dispatch and skip the event.

Refs: `sepc.md` §11, §12, §20.

## Acceptance criteria

- [ ] Page route exists at `pages/product/[id].tsx`
- [ ] Exposed as `./ProductDetailPage` in `next.config.js`
- [ ] Renders product details using `useProduct(id)`
- [ ] "Add to cart" button dispatches `addItem` AND emits `'product:added-to-cart'` in the same handler
- [ ] Add handler does both atomically (no event without dispatch, no dispatch without event)
- [ ] Renders at host `/product/<id>` AND standalone `:3001/product/<id>`

## Blocked by

- `49-phase6-6.11-useproduct-hook-afk.md`
- `21-phase2-2.8-export-barrel-afk.md`

## User stories covered

- Shopper #3 (detail page)
- Shopper #11 (add to cart from detail)
- Shopper #12 (toast confirmation — host side in 9.8)

## Status

Pending
