# 9.6 host `middleware.ts`

## What to build

Next.js middleware at `packages/host/middleware.ts` that protects `/cart` and `/orders`. Reads `auth-token` cookie; if missing, redirects to `/login?returnTo=<original-path>`.

Matcher config restricts middleware to the protected paths only (no overhead on `/`, `/product/*`, `/api/*`).

Refs: `sepc.md` §13.

## Acceptance criteria

- [ ] `middleware.ts` exists with `config.matcher: ['/cart', '/orders']`
- [ ] No `auth-token` cookie → redirects to `/login?returnTo=<path>`
- [ ] Cookie present → request proceeds unmodified
- [ ] Middleware does NOT validate token shape (POC mock — see Out of Scope in PRD)

## Blocked by

- `65-phase9-9.5-host-login-afk.md`

## User stories covered

- Shopper #22 (redirect to login when accessing protected paths)

## Status

Pending
