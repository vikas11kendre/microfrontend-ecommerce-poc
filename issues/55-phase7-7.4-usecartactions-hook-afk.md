# 7.4 `useCartActions` hook

## What to build

A small wrapper hook returning `{ add, remove, clear }` — each function dispatches the corresponding `cartSlice` action via `useAppDispatch`. The constraint is: no other code in remote-cart imports `useAppDispatch` directly for cart operations.

Refs: `sepc.md` §10, §17.

## Acceptance criteria

- [ ] `useCartActions(): { add, remove, clear }` exported
- [ ] `add(product)` dispatches `cartSlice.actions.addItem(product)`
- [ ] `remove(id)` dispatches `cartSlice.actions.removeItem(id)`
- [ ] `clear()` dispatches `cartSlice.actions.clearCart()`
- [ ] No consumer in remote-cart imports `useAppDispatch` directly (grep check)

## Blocked by

- `21-phase2-2.8-export-barrel-afk.md`

## User stories covered

- Dev #30 (clean cart API)

## Status

Pending
