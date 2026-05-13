# 9.5 host `login.tsx`

## What to build

Login page at `pages/login.tsx`. Form against hardcoded credentials `test@test.com` / `password123`. On success:
1. Generate `token = \`mock-jwt-${Date.now()}\``
2. Set `auth-token` cookie via `js-cookie` (1-day expiry, `sameSite: 'lax'`)
3. Dispatch `authSlice.actions.login({ user: { email }, token })`
4. Redirect to `/` (or `?returnTo` if provided by middleware)

This is the mock-auth seam — README §10 calls out NextAuth as the production replacement.

Refs: `sepc.md` §13.

## Acceptance criteria

- [ ] Page renders email + password form
- [ ] Wrong creds show an inline error
- [ ] Correct creds: cookie set, redux state updated, redirect happens
- [ ] Cookie name is `auth-token` (matches middleware in 9.6)
- [ ] Cookie has `expires: 1 day`

## Blocked by

- `15-phase2-2.2-build-authslice-afk.md`
- `25-phase3-3.4-app-with-redux-provider-afk.md`

## User stories covered

- Shopper #21 (login with credentials)

## Status

Pending
