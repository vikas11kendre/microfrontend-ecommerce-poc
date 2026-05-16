# 2.8 Export barrel for shared-store

## What to build

`packages/shared-store/src/index.ts` re-exports: `store`, `persistor`, slices (`authSlice`, `cartSlice`), typed hooks (`useAppSelector`, `useAppDispatch`), `AppEvents` type, event bus (`emit`, `on`). Single import surface — no deep paths allowed.

Refs: `sepc.md` §8, §9, §20.

## Acceptance criteria

- [ ] `index.ts` re-exports everything in the list above
- [ ] All consumer code imports only from `'shared-store'`, never from `'shared-store/src/...'`
- [ ] Type re-exports include `RootState`, `AppDispatch`, `AppEvents`

## Blocked by

- `15-phase2-2.2-build-authslice-afk.md`
- `16-phase2-2.3-build-cartslice-afk.md`
- `17-phase2-2.4-wire-store-redux-persist-afk.md`
- `18-phase2-2.5-build-typed-hooks-afk.md`
- `20-phase2-2.7-build-typed-event-bus-afk.md`

## User stories covered

- Dev #30 (clean shared API)

## Status

Completed
