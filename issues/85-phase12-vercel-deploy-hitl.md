# 12.5 Vercel deploy (combined 12.5 + 12.6 + 12.7)  (HITL — Vercel dashboard work)

## What to build

Three combined dashboard-side steps:

**12.5 Vercel projects (×4).** Create four Vercel projects, one per package. Set root directory for each project to `packages/<package>`. Connect to the GitHub repo. Deploy on push to main.

**12.6 Vercel env vars (host).** In the host project's Vercel dashboard, set `REMOTE_PRODUCTS_URL`, `REMOTE_CART_URL`, `REMOTE_ORDERS_URL` to the production URLs of the other three Vercel projects. These are server-side env vars (no `NEXT_PUBLIC_` prefix). Verify `https://<host>.vercel.app/api/remotes` returns the production URLs.

**12.7 Ignored-build-step per remote.** In each remote project's Vercel "Git" settings, set the ignored build step to:

```bash
git diff HEAD^ HEAD --quiet packages/<pkg>/
```

This makes Vercel skip the build when nothing in that package changed (exit 0 = skip; exit 1 = build).

HITL: all three are Vercel dashboard actions — agents can't perform them. Mark this issue done after you've completed all three on the dashboard.

Refs: `sepc.md` §18, §22.

## Acceptance criteria

- [ ] Four Vercel projects exist, each with the correct root directory
- [ ] All four deploy URLs are reachable
- [ ] Host's Vercel project has the three `REMOTE_*_URL` env vars set to production URLs
- [ ] Host's `/api/remotes` returns the production URLs (verifiable via `curl https://<host>.vercel.app/api/remotes`)
- [ ] Each remote project has the `git diff` ignored-build-step configured
- [ ] Verify: pushing a change to `packages/remote-cart` only redeploys remote-cart, not remote-products/remote-orders/host

## Blocked by

- `34-phase4-4.7-host-bootstrap-in-app-afk.md` (the manifest mechanism must exist before it has anything to point at)
- `80-phase11-11.4-e2e-workflow-afk.md` (you probably want green CI before deploying)

## User stories covered

- Dev #32 (URL changes without host rebuild)
- Interviewer #38 (live deploy URLs)

## Status

Pending
