# 1.3 Build `Card`

## What to build

A generic card layout used by `ProductCard` and other listing surfaces. Props: `{ title, description?, image?, footer?, onClick? }`. Image and footer slots are optional and must not render if absent.

Refs: `sepc.md` §10.

## Acceptance criteria

- [ ] `Card` accepts the documented props
- [ ] Image renders only when `image` prop is provided (no empty `<img>` tag otherwise)
- [ ] Card is clickable as a whole when `onClick` is provided
- [ ] Smoke render test passes

## Blocked by

- `07-phase1-1.1-init-shared-ui-package-afk.md`

## User stories covered

- Transitively supports shopper #1, #2 (product list/detail)

## Status

Completed
