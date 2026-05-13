# 7.1 `CartItem`

## What to build

A row component for a single cart line: image, title, unit price, quantity, line total, and a remove button. Remove dispatches `cartSlice.removeItem(id)` — does not navigate or open a confirm dialog (instant remove, undo handled via the persistence + re-add UX).

Refs: `sepc.md` §10, §17.

## Acceptance criteria

- [ ] `CartItem` accepts `item: CartLineItem`
- [ ] Shows image, title, unit price (formatted), quantity, line total
- [ ] Remove button dispatches `cartSlice.removeItem(item.product.id)`
- [ ] Has accessible labels (e.g., "Remove <product title> from cart")

## Blocked by

- `21-phase2-2.8-export-barrel-afk.md`

## User stories covered

- Shopper #16 (cart page with quantities + totals)
- Shopper #15 (remove from cart)

## Status

Pending
