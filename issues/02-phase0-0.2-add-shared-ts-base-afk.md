# 0.2 Add shared TS base

## What to build

Create `tsconfig.base.json` at the repo root with strict mode enabled and path aliases that the per-package `tsconfig.json`s will extend. This is the single source of truth for compiler options across all 4 apps + 2 shared packages.

Refs: `sepc.md` §2, §4.

## Acceptance criteria

- [ ] `tsconfig.base.json` exists at root with `strict: true`
- [ ] Path aliases configured for `shared-ui` and `shared-store`
- [ ] Running `tsc --noEmit -p tsconfig.base.json` exits 0

## Blocked by

- `01-phase0-0.1-init-monorepo-root-afk.md`

## User stories covered

- Dev #30 (shared tsconfig/eslint/prettier)

## Status

Completed
