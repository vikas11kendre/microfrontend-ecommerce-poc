# 5.4 `FullPageSpinner`

## What to build

A centered, full-viewport spinner shown by `_app.tsx` while `bootstrapRemotes()` is pending. Uses `Spinner` from `shared-ui` at size `'lg'`.

Refs: `sepc.md` §14, §15.

## Acceptance criteria

- [ ] `FullPageSpinner` renders a centered `Spinner` (size `lg`) on a full-viewport container
- [ ] No flash-of-empty-content — appears immediately on mount
- [ ] Has `aria-label="Loading"` or equivalent for screen readers

## Blocked by

- `11-phase1-1.5-build-spinner-afk.md`

## User stories covered

- Dev #32 (smooth manifest bootstrap)

## Status

Pending
