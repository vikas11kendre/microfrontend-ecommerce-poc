# 3.3 Configure shared deps in MF plugin (×4)

## What to build

In each app's `next.config.js`, set up the `shared: {...}` block per `sepc.md` §6:
- `react`, `react-dom`, `@reduxjs/toolkit`, `react-redux`, `redux-persist` — `singleton: true` (one instance across all federated modules)
- `shared-store` — `singleton: true`, `strictVersion: true`, `requiredVersion: '^1.0.0'`

This is what makes the Redux store a true singleton across the federation boundary.

Refs: `sepc.md` §6.

## Acceptance criteria

- [ ] All 4 apps have identical `shared: {...}` blocks in `next.config.js`
- [ ] React + RTK + react-redux + redux-persist marked `singleton: true`
- [ ] `shared-store` marked `singleton: true, strictVersion: true, requiredVersion: '^1.0.0'`
- [ ] `next build` succeeds in every app with no duplicate-instance warnings

## Blocked by

- `21-phase2-2.8-export-barrel-afk.md`
- `23-phase3-3.2-install-mf-plugin-afk.md`

## User stories covered

- Dev #36 (singleton enforcement is half of the version-drift story)

## Status

Completed
