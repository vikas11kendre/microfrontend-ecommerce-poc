# 5.2 `RemoteError` card

## What to build

A presentational component that renders the fallback UI for a failed remote: heading "This section is temporarily unavailable", short body explaining the issue, and a manual retry button. Props: `{ name: string, onRetry: () => void }`.

This is what users see when a page-tier remote fails (page-body MFE — e.g., `ProductsPage`). Widget-tier failures (mini-cart) get a `null` fallback instead (handled in 9.7).

Refs: `sepc.md` §14, §15.

## Acceptance criteria

- [ ] `RemoteError` accepts `name: string` and `onRetry: () => void`
- [ ] Renders heading, body copy mentioning the remote name, and a retry button
- [ ] Retry button calls `onRetry` when clicked
- [ ] Renders cleanly inside the `ErrorBoundary` fallback render-prop

## Blocked by

- `08-phase1-1.2-build-button-afk.md`
- `35-phase5-5.1-errorboundary-retry-afk.md`

## User stories covered

- Shopper #25 (clear "unavailable — retry" card)
- Interviewer #41

## Status

Pending
