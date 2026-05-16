# 2.1 Init `shared-store` package

## What to build

Create the `packages/shared-store` workspace package. Version-pin to `1.0.0` exactly. Declare peer deps on React, `@reduxjs/toolkit`, `react-redux`, `redux-persist`. The `1.0.0` pin is load-bearing: the CI version-drift script (11.3) will fail if any consumer references a different major.

Refs: `sepc.md` §8, §9, §20, §21.

## Acceptance criteria

- [ ] `packages/shared-store/package.json` exists with `"version": "1.0.0"` (exact, no caret)
- [ ] Peer deps declared for `react`, `react-dom`, `@reduxjs/toolkit`, `react-redux`, `redux-persist`
- [ ] `tsconfig.json` extends `tsconfig.base.json`
- [ ] Installs as workspace dependency in another package cleanly

## Blocked by

- `02-phase0-0.2-add-shared-ts-base-afk.md`

## User stories covered

- Dev #36 (version-drift guard depends on the pin)

## Status

Completed
