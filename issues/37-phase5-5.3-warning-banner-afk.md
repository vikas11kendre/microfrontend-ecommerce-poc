# 5.3 `WarningBanner`

## What to build

A non-blocking, dismissible banner that renders above the navbar. Used by `_app.tsx` after `bootstrapRemotes()` returns `{ usedCache: true }` to inform the user the manifest service was unreachable and we're running on a cached config.

Must not push the rest of the layout (it's fixed/sticky-top, or layout is built around it).

Refs: `sepc.md` §14, §15.

## Acceptance criteria

- [ ] `WarningBanner` accepts `message: string` and `onDismiss?: () => void`
- [ ] Renders above the navbar
- [ ] Has a dismiss button that calls `onDismiss`
- [ ] Dismissing it does not cause layout shift below the navbar

## Blocked by

- `22-phase3-3.1-init-nextjs-apps-afk.md`

## User stories covered

- Shopper #25 (transparency about degraded state)

## Status

Pending
