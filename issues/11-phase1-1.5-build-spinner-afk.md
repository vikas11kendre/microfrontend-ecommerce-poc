# 1.5 Build `Spinner`

## What to build

Loading spinner used by the `Button` loading state and the `FullPageSpinner`. Props: `{ size? }` with values `'sm' | 'md' | 'lg'`. Three sizes must be visually distinguishable.

Refs: `sepc.md` §10.

## Acceptance criteria

- [ ] `Spinner` accepts `size?: 'sm' | 'md' | 'lg'` (default `md`)
- [ ] All three sizes render with distinct dimensions
- [ ] Respects `prefers-reduced-motion` (no animation when set)
- [ ] Smoke render test passes

## Blocked by

- `07-phase1-1.1-init-shared-ui-package-afk.md`

## User stories covered

- Transitively supports shopper #5 (responsive feel) and many others

## Status

Completed
