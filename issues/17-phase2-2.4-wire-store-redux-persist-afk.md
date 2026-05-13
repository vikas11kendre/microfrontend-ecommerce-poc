# 2.4 Wire store + redux-persist

## What to build

Compose `authSlice` and `cartSlice` into the root store. Configure `redux-persist` with `whitelist: ['auth', 'cart']` so both survive page reloads via `localStorage`. Export `store`, `persistor`, and the typed `RootState` / `AppDispatch` types.

Refs: `sepc.md` §8, §9, §20, §21.

## Acceptance criteria

- [ ] Store combines `auth` and `cart` reducers under a `persistReducer`
- [ ] `persistConfig` has `whitelist: ['auth', 'cart']` and uses `localStorage`
- [ ] `RootState` and `AppDispatch` types exported
- [ ] After a page refresh in a test harness, both `auth` and `cart` state are restored from `localStorage`

## Blocked by

- `15-phase2-2.2-build-authslice-afk.md`
- `16-phase2-2.3-build-cartslice-afk.md`

## User stories covered

- Shopper #20 (cart persists across tab close)

## Status

Pending
