# 4.1 `remote-products`: configure `exposes`

## What to build

In `packages/remote-products/next.config.js`, configure the MF plugin to expose `./ProductsPage` and `./ProductDetailPage`. These are the two surfaces the host dynamic-imports. Components don't exist yet (Phase 6) — stub them with placeholder default exports so `next build` produces the federation manifest.

Refs: `sepc.md` §6.

## Acceptance criteria

- [ ] `next.config.js` MF plugin sets `name: 'remoteProducts'` and `exposes: { './ProductsPage': './src/pages/index.tsx', './ProductDetailPage': './src/pages/product/[id].tsx' }`
- [ ] Placeholder components exist at those paths (Phase 6 fills in real implementations)
- [ ] After `next build`, the generated `remoteEntry.js` includes both module IDs

## Blocked by

- `24-phase3-3.3-configure-shared-deps-afk.md`

## User stories covered

- Dev #28 (standalone), Dev #32 (federation)

## Status

Pending
