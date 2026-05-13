# 4.7 host: call `bootstrapRemotes()` in `_app.tsx`

## What to build

Wire `bootstrapRemotes()` into the host's `_app.tsx` lifecycle. Gate the page render on a `ready` state set after bootstrap resolves. While `!ready`, show `FullPageSpinner` (5.4). After bootstrap, if the cached manifest was used, render `WarningBanner` (5.3) above the layout.

Refs: `sepc.md` §14.

## Acceptance criteria

- [ ] Host's `_app.tsx` runs `bootstrapRemotes()` on mount (client-side only)
- [ ] First paint shows `FullPageSpinner` (or equivalent) until bootstrap resolves
- [ ] After ready, normal page render
- [ ] When `usedCache: true`, `WarningBanner` renders above the navbar
- [ ] Bootstrap failure does NOT crash the app — fallback still renders navbar/footer

## Blocked by

- `33-phase4-4.6-host-bootstrap-remotes-afk.md`
- Soft: `37-phase5-5.3-warning-banner-afk.md` and `38-phase5-5.4-fullpage-spinner-afk.md` should land before final wiring (placeholder UI is fine for the AC otherwise)

## User stories covered

- Dev #32
- Shopper #24, #25

## Status

Pending
