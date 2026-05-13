# 1.2 Build `Button`

## What to build

A reusable button component used across host + all remotes. Props: `{ label, onClick, variant?, disabled?, loading? }`. The `loading` state should disable the button and show a Spinner (defined in 1.5 — wire that in after 1.5 lands, or stub it for now).

Refs: `sepc.md` §10.

## Acceptance criteria

- [ ] `Button` accepts `label`, `onClick`, `variant?: 'primary' | 'secondary' | 'ghost'`, `disabled?`, `loading?`
- [ ] Disabled and loading states are visually distinct and both prevent `onClick` from firing
- [ ] Renders in a smoke import test (or Storybook story) without crashing

## Blocked by

- `07-phase1-1.1-init-shared-ui-package-afk.md`

## User stories covered

- Transitively supports many shopper stories (no direct mapping)

## Status

Pending
