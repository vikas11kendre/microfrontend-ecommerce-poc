# 3.2 Install MF plugin + runtime (×4)

## What to build

In each of the 4 apps, install `@module-federation/nextjs-mf` (build-time webpack plugin) and `@module-federation/runtime` (runtime API used by the host's `bootstrapRemotes()`). No `next.config.js` wiring yet — that lands in 3.3 and Phase 4.

Refs: `sepc.md` §6.

## Acceptance criteria

- [ ] All 4 apps have `@module-federation/nextjs-mf` and `@module-federation/runtime` in dependencies
- [ ] Versions are consistent across all 4 packages
- [ ] Plugin imports cleanly from a draft `next.config.js` (smoke test)

## Blocked by

- `22-phase3-3.1-init-nextjs-apps-afk.md`

## User stories covered

- Dev #31 (each app has its own next.config.js with MF wired in)

## Status

Pending
