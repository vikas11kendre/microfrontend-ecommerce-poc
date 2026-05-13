# 1.4 Build `Badge`

## What to build

Numeric badge used on the cart icon in the navbar. Props: `{ count, variant? }`. When `count` is 0 the component must render nothing (returns `null`) so the navbar doesn't show a zero badge.

Refs: `sepc.md` §10.

## Acceptance criteria

- [ ] `Badge` accepts `count: number` and `variant?: 'primary' | 'danger' | 'neutral'`
- [ ] Renders `null` when `count === 0`
- [ ] Caps visible value at `99+` for `count > 99`
- [ ] Smoke render test verifies the zero-count branch

## Blocked by

- `07-phase1-1.1-init-shared-ui-package-afk.md`

## User stories covered

- Shopper #13 (cart icon badge updates immediately)

## Status

Pending
