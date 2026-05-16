# 2.3 Build `cartSlice`

## What to build

A Redux Toolkit slice that owns cart state. Actions: `addItem(product)`, `removeItem(id)`, `clearCart()`. The dedupe rule is the key invariant — `addItem` for a product already in the cart increments quantity, not pushes a duplicate row. State shape matches `CartState` from `sepc.md` §8.

Refs: `sepc.md` §8, §9.

## Acceptance criteria

- [ ] `cartSlice` exports `reducer` and `actions.{addItem, removeItem, clearCart}`
- [ ] `addItem` for an existing product id increments that item's `quantity` (does NOT add a new entry)
- [ ] `removeItem` removes a line entirely (doesn't decrement quantity)
- [ ] `clearCart` returns state to initial (empty items, zero totals)
- [ ] Derived totals (`totalCount`, `totalPrice`) are recomputed on every action
- [ ] State shape matches `CartState` from `sepc.md` §8

## Blocked by

- `14-phase2-2.1-init-shared-store-package-afk.md`

## User stories covered

- Shopper #11 (add to cart)
- Shopper #13 (badge updates)
- Shopper #15 (remove from cart)

## Status

Completed
