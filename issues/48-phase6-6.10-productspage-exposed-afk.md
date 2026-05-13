# 6.10 `ProductsPage` (exposed)

## What to build

The page-level component exposed as `./ProductsPage`. Wraps `<ProductsList>` (which composes `SearchBar` + `CategoryTabs` + `SortFilter` + `PaginationToggle` + product grid) in `<QueryClientProvider client={queryClient}>`. Each remote owns its own QueryClient — the provider stays inside the exposed module so standalone mode works without extra plumbing.

Refs: `sepc.md` §11, §12.

## Acceptance criteria

- [ ] `ProductsPage` is the default export of the exposed module
- [ ] Wraps content in `<QueryClientProvider client={queryClient}>` (the per-remote singleton from 3.6)
- [ ] Composes `SearchBar`, `CategoryTabs`, `SortFilter`, `PaginationToggle`, and the product grid (`ProductCard` list)
- [ ] Loads cleanly when the host dynamic-imports it AND when visiting `:3001/` standalone

## Blocked by

- `39-phase6-6.1-productcard-afk.md`
- `41-phase6-6.3-categorytabs-afk.md`
- `43-phase6-6.5-searchbar-afk.md`
- `44-phase6-6.6-sortfilter-dropdown-afk.md`
- `46-phase6-6.8-paginationtoggle-afk.md`
- `47-phase6-6.9-useproducts-composite-hook-afk.md`

## User stories covered

- Shopper #1, #2

## Status

Pending
