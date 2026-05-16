# 2.2 Build `authSlice`

## What to build

A Redux Toolkit slice that owns auth state. Actions: `login({ user, token })` and `logout()`. State shape matches `AuthState` from `sepc.md` §8 (`isAuthenticated`, `user`, `token`). Pure reducer logic — no side effects, no thunks; the cookie-setting happens in the host login page (9.5).

Refs: `sepc.md` §8, §9.

## Acceptance criteria

- [ ] `authSlice` exports `reducer`, `actions.login`, `actions.logout`
- [ ] Initial state has `isAuthenticated: false`, `user: null`, `token: null`
- [ ] Dispatching `login` then `logout` returns state to the exact initial value (deep equality)
- [ ] State shape matches `AuthState` from `sepc.md` §8

## Blocked by

- `14-phase2-2.1-init-shared-store-package-afk.md`

## User stories covered

- Shopper #21 (login)
- Shopper #23 (logout)

## Status

Completed
