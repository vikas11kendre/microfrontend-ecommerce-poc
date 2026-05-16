# 2.5 Build typed hooks

## What to build

Export `useAppSelector: TypedUseSelectorHook<RootState>` and `useAppDispatch: () => AppDispatch`. These are the only selector/dispatch hooks consumers should use — they enforce typing automatically.

Refs: `sepc.md` §8, §9.

## Acceptance criteria

- [ ] `useAppSelector` and `useAppDispatch` exported from package
- [ ] `useAppSelector(state => state.cart.totalCount)` narrows to `number` without explicit cast
- [ ] Type-only test (`tsd` or compile-time check) confirms the narrowing

## Blocked by

- `17-phase2-2.4-wire-store-redux-persist-afk.md`

## User stories covered

- Dev #30 (shared types/typing)

## Status

Completed
