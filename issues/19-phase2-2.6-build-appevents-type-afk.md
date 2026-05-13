# 2.6 Build `AppEvents` type

## What to build

A discriminated union that catalogs every event name allowed on the cross-MFE event bus. Initially has `'product:added-to-cart': { product: Product }` and `'auth:logout': void`. New events MUST be added here before `emit` will type-check — this is the contract that prevents string-keyed coupling.

Refs: `sepc.md` §20, §21.

## Acceptance criteria

- [ ] `AppEvents` type defined as a record keyed by event name → detail payload
- [ ] Includes `'product:added-to-cart'` with `{ product: Product }`
- [ ] Includes `'auth:logout'` with `void`
- [ ] Adding a new event key surfaces a compile error in any `emit` call that uses an undeclared key (verify with a deliberately-broken test file)

## Blocked by

- `14-phase2-2.1-init-shared-store-package-afk.md`

## User stories covered

- Dev #35 (cross-MFE comms contract)

## Status

Pending
