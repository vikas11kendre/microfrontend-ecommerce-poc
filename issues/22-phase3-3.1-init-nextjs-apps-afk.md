# 3.1 Init Next.js 14 apps (×4)

## What to build

For each of `host` (port 3000), `remote-products` (3001), `remote-cart` (3002), `remote-orders` (3003): create a Next.js 14 app under `packages/<app>` using the Pages Router, TypeScript, and Tailwind. Each app's `package.json` `dev` script binds to its assigned port.

Next.js **14** specifically (not 13, not 15) — `@module-federation/nextjs-mf` stable support is the constraint.

Refs: `sepc.md` §5, §6, §7, §11.

## Acceptance criteria

- [ ] `packages/host`, `packages/remote-products`, `packages/remote-cart`, `packages/remote-orders` all exist as Next 14 apps
- [ ] All use Pages Router (not App Router), TypeScript, Tailwind
- [ ] `npm run dev -w packages/host` opens a blank page on `:3000`
- [ ] `npm run dev -w packages/remote-products` opens on `:3001`
- [ ] `npm run dev -w packages/remote-cart` opens on `:3002`
- [ ] `npm run dev -w packages/remote-orders` opens on `:3003`

## Blocked by

- `02-phase0-0.2-add-shared-ts-base-afk.md`

## User stories covered

- Dev #26 (one-command dev)
- Dev #27 (focused single-app dev)
- Dev #28 (standalone remotes)

## Status

Pending
