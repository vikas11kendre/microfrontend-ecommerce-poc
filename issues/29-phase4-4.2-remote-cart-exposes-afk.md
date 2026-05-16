# 4.2 `remote-cart`: configure `exposes`

## What to build

In `packages/remote-cart/next.config.js`, expose `./CartPage` and `./CartSummary`. `CartSummary` is the federated mini-cart widget that the host's Navbar slot will mount (Phase 9.7).

Refs: `sepc.md` §6.

## Acceptance criteria

- [ ] MF plugin sets `name: 'remoteCart'` and exposes `./CartPage` + `./CartSummary`
- [ ] Placeholder components exist at the exposed paths
- [ ] `remoteEntry.js` includes both modules after build

## Blocked by

- `24-phase3-3.3-configure-shared-deps-afk.md`

## User stories covered

- Dev #28, Dev #32

## Status

Completed
