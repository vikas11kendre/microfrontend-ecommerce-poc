# 7.5 `CartPage` (exposed)

## What to build

The full cart page exposed as `./CartPage`. Lists `CartItem`s, shows totals, and has a "Place Order" button.

On "Place Order":
1. Generate `orderId = \`ORD-${Date.now()}\``
2. Dispatch `cartSlice.clearCart()`
3. Redirect to `/orders?id=<orderId>`

Button is disabled when cart is empty (uses `EmptyCart` state then).

Refs: `sepc.md` §10, §17.

## Acceptance criteria

- [ ] `CartPage` exposed as `./CartPage`
- [ ] Renders list of `CartItem`s + totals + "Place Order" button
- [ ] Shows `EmptyCart` when cart is empty
- [ ] "Place Order" generates `ORD-${Date.now()}`, dispatches `clearCart`, redirects to `/orders?id=<id>`
- [ ] Works at host `/cart` and standalone `:3002/cart`

## Blocked by

- `52-phase7-7.1-cartitem-afk.md`
- `53-phase7-7.2-emptycart-afk.md`
- `55-phase7-7.4-usecartactions-hook-afk.md`

## User stories covered

- Shopper #16 (cart page)
- Shopper #18 (place order button)
- Shopper #19 (confirmation flow continues at /orders)

## Status

Pending
