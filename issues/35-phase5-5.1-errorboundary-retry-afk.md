# 5.1 `ErrorBoundary` with retry

## What to build

A class component in the host that catches render errors of its children. Renders a `fallback` render-prop with `{ error, retry }`. The `retry` function must:
1. Clear the dynamic-import cache for the failed remote (via a key bump that re-runs `React.lazy`)
2. Re-mount the child

This is the page-tier fault isolation layer — used to wrap every `dynamic(() => import('remote*/...'))` boundary on the host.

Refs: `sepc.md` §14, §15.

## Acceptance criteria

- [ ] `ErrorBoundary` is a class component with `componentDidCatch`
- [ ] Accepts a `fallback: (props: { error, retry }) => ReactNode` render-prop
- [ ] `retry` clears import cache + re-mounts (verifiable via test 10.5)
- [ ] In a manual test: child throws → fallback renders → retry → child stops throwing → child renders
- [ ] Default behavior: re-thrown errors during render are caught (not swallowed in event handlers — React limitation)

## Blocked by

- `22-phase3-3.1-init-nextjs-apps-afk.md`

## User stories covered

- Shopper #24, #25 (fault isolation)
- Interviewer #41 (failure-modes story)

## Status

Pending
