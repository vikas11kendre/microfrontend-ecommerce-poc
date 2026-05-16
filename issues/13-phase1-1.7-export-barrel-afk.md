# 1.7 Export barrel

## What to build

A single `packages/shared-ui/src/index.ts` that re-exports all components. This becomes the only allowed import surface — consumers do `import { Button, Card, Badge, Spinner, Navbar } from 'shared-ui'`, never deep paths.

Refs: `sepc.md` §10.

## Acceptance criteria

- [ ] `index.ts` re-exports `Button`, `Card`, `Badge`, `Spinner`, `Navbar`
- [ ] In a sibling package, `import { Button, Card, Badge, Spinner, Navbar } from 'shared-ui'` resolves and type-checks
- [ ] No deep-path imports (e.g. `shared-ui/src/Button`) exist in any consumer

## Blocked by

- `08-phase1-1.2-build-button-afk.md`
- `09-phase1-1.3-build-card-afk.md`
- `10-phase1-1.4-build-badge-afk.md`
- `11-phase1-1.5-build-spinner-afk.md`
- `12-phase1-1.6-build-navbar-hitl.md`

## User stories covered

- Dev #30 (shared package import hygiene)

## Status

Completed
