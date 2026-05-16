# 4.5 host: `/api/remotes` route

## What to build

Next.js API route at `packages/host/pages/api/remotes.ts` that returns:

```json
{ "remoteProducts": "<url>", "remoteCart": "<url>", "remoteOrders": "<url>" }
```

Values come from `process.env.REMOTE_PRODUCTS_URL` / `REMOTE_CART_URL` / `REMOTE_ORDERS_URL` (server-side env, set in 3.5). Response headers: `Cache-Control: public, max-age=60, stale-while-revalidate=300`.

This is the manifest service — swapping a remote URL is now a Vercel-env-var change with zero rebuild.

Refs: `sepc.md` §14.

## Acceptance criteria

- [ ] Route exists at `pages/api/remotes.ts`
- [ ] Returns JSON with the three keys, reading from server env vars
- [ ] Sets `Cache-Control: public, max-age=60, stale-while-revalidate=300`
- [ ] Hitting the route locally returns the URLs from `.env.local`
- [ ] Returns 500 (with a `{ error }` body) when env vars are missing

## Blocked by

- `26-phase3-3.5-env-files-afk.md`

## User stories covered

- Dev #32 (URL changes without rebuild)

## Status

Completed
