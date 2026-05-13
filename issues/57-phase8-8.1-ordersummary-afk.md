# 8.1 `OrderSummary`

## What to build

A read-only block that lists items + totals AT ORDER TIME (snapshot, not live). Since the POC does not persist orders to a backend, this snapshot is taken from local state at the moment `Place Order` is clicked (passed through navigation state or recomputed deterministically).

The point: subsequent cart changes must not affect this display — it represents what was ordered.

Refs: `sepc.md` §17.

## Acceptance criteria

- [ ] `OrderSummary` renders items, quantities, line totals, and grand total
- [ ] Display is snapshot-style: post-order cart changes do not alter it
- [ ] Empty render path is unreachable in normal flow (defensive empty handling is fine)

## Blocked by

- `22-phase3-3.1-init-nextjs-apps-afk.md`

## User stories covered

- Shopper #19 (order confirmation)

## Status

Pending
