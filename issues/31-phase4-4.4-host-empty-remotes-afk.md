# 4.4 host: leave `remotes: {}` empty

## What to build

The host's `next.config.js` uses the MF plugin ONLY for shared-deps coordination and the build-time chunk graph. The `remotes` object is `{}` — no static URLs in config. All remote URLs come from the runtime manifest (4.5/4.6).

This is the runtime-manifest decision from the 2026-05-12 grill-me locked in mechanically.

Refs: `sepc.md` §6, §14.

## Acceptance criteria

- [ ] Host's `next.config.js` MF plugin block has `remotes: {}` (literally empty)
- [ ] `shared: {...}` block present and matches 3.3 spec
- [ ] `grep -rE 'localhost:300[1-3]|\.vercel\.app' packages/host/next.config.js` returns zero matches
- [ ] Host `next build` succeeds

## Blocked by

- `24-phase3-3.3-configure-shared-deps-afk.md`

## User stories covered

- Dev #32 (URL changes without host rebuild)

## Status

Pending
