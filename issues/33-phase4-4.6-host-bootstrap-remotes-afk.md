# 4.6 host: `bootstrapRemotes()` in `lib/manifest.ts`

## What to build

A function in `packages/host/lib/manifest.ts` that:
1. Fetches `/api/remotes`
2. On success: caches the response to `localStorage` key `mfe:remotes:lkg` (last-known-good); returns the fresh manifest
3. On failure: reads from `localStorage`, returns cached manifest + sets a flag the host UI uses to render the `WarningBanner`
4. Calls `init({ remotes })` from `@module-federation/runtime` with `remotes` derived from the manifest
5. If both network AND cache fail: still calls `init({ remotes: [] })` so the app boots (graceful degradation — navbar/footer/login still work)

Refs: `sepc.md` §14.

## Acceptance criteria

- [ ] `bootstrapRemotes(): Promise<{ usedCache: boolean }>` exported
- [ ] On fetch success, `localStorage.getItem('mfe:remotes:lkg')` contains the manifest after the call
- [ ] When fetch returns 500 but cache has a manifest, `init()` is still called with the cached remotes and `usedCache: true` is returned
- [ ] When fetch fails AND cache is empty, `init({ remotes: [] })` is called and the function resolves (does NOT throw)
- [ ] No `localStorage` access during SSR

## Blocked by

- `32-phase4-4.5-host-api-remotes-route-afk.md`

## User stories covered

- Dev #32
- Shopper #24, #25 (graceful degradation)

## Status

Pending
