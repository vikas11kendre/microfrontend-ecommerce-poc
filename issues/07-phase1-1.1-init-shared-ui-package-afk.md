# 1.1 Init `shared-ui` package

## What to build

Create the `packages/shared-ui` workspace package — its `package.json` declares `"name": "shared-ui"`, React as a peer dependency, and a build/source-only setup (no bundler needed; consumers compile via their own toolchains).

Refs: `sepc.md` §10.

## Acceptance criteria

- [ ] `packages/shared-ui/package.json` exists with `"name": "shared-ui"` and `react` + `react-dom` as peer dependencies
- [ ] Package shows up in `npm ls --workspaces`
- [ ] `tsconfig.json` extends `tsconfig.base.json`

## Blocked by

- `02-phase0-0.2-add-shared-ts-base-afk.md`

## User stories covered

- Dev #30 (shared config across packages)

## Status

Completed
