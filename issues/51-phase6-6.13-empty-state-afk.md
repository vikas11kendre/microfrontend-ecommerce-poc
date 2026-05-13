# 6.13 Empty state for products listing

## What to build

A "No products found" message rendered by `ProductsPage` when the filtered listing is empty after fetch resolves. Must NOT render during the loading state — only after `isFetching === false` AND results are empty.

Refs: `sepc.md` §11, §12.

## Acceptance criteria

- [ ] Empty state component renders "No products found" copy and a "Clear filters" action
- [ ] Only appears when fetch completes with zero results (not during loading)
- [ ] "Clear filters" resets `q`, `sort`, `category` URL params

## Blocked by

- `48-phase6-6.10-productspage-exposed-afk.md`

## User stories covered

- Shopper #10 (clear "no products found" message)

## Status

Pending
