# 0.5 Add root scripts

## What to build

Wire root `package.json` `scripts` for whole-monorepo orchestration: `dev` (all 4 apps via `concurrently`), `dev:app` (single targeted app), `build:all`, `type-check`. Scripts will produce real output once Phase 3 apps exist; defining them now is enough.

Refs: `sepc.md` §4.

## Acceptance criteria

- [ ] `dev` script uses `concurrently` to start host (3000), remote-products (3001), remote-cart (3002), remote-orders (3003)
- [ ] `dev:app` accepts an app name argument (e.g. `npm run dev:app -- host`)
- [ ] `build:all` runs `npm run build --workspaces`
- [ ] `type-check` runs `tsc --noEmit` across workspaces
- [ ] Scripts parse without error (functional verification deferred until Phase 3 apps exist)

## Blocked by

- `01-phase0-0.1-init-monorepo-root-afk.md`

## User stories covered

- Dev #26 (single `npm run dev`)
- Dev #27 (focused single-app dev)

## Status

Pending
