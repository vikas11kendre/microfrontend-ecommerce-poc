# 3.5 `.env.example` (committed) + `.env.local` (gitignored)

## What to build

Per `sepc.md` §7:
- Host has `REMOTE_PRODUCTS_URL`, `REMOTE_CART_URL`, `REMOTE_ORDERS_URL` — **server-side only**, no `NEXT_PUBLIC_` prefix (they're consumed only by `/api/remotes`)
- Each remote has `NEXT_PUBLIC_API_BASE=https://fakestoreapi.com` (browser-accessible since fetch happens client-side)

Commit `.env.example` (with placeholder values), gitignore `.env.local` (with real values for local dev — already covered by 0.6).

Refs: `sepc.md` §7.

## Acceptance criteria

- [ ] `packages/host/.env.example` lists `REMOTE_PRODUCTS_URL`, `REMOTE_CART_URL`, `REMOTE_ORDERS_URL` (no `NEXT_PUBLIC_` prefix)
- [ ] Each remote's `.env.example` lists `NEXT_PUBLIC_API_BASE`
- [ ] `.env.local` files exist with localhost values and are not tracked by git
- [ ] `grep -r 'NEXT_PUBLIC_REMOTE' packages/host` returns zero matches (catches accidental leakage)

## Blocked by

- `22-phase3-3.1-init-nextjs-apps-afk.md`

## User stories covered

- Dev #31 (per-app config)
- Dev #32 (URL changes without host rebuild — env-driven)

## Status

Completed
