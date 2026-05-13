# 0.4 Add Prettier config

## What to build

Create root `.prettierrc` with team-agreed defaults (single quotes, trailing comma, 100-col width, etc. — pick sensible defaults that match the spec).

Refs: `sepc.md` §2, §4.

## Acceptance criteria

- [ ] `.prettierrc` exists at root with defaults agreed in the spec
- [ ] `.prettierignore` excludes `node_modules`, `.next`, build artifacts
- [ ] `npx prettier --check .` runs without crashing

## Blocked by

- `01-phase0-0.1-init-monorepo-root-afk.md`

## User stories covered

- Dev #30 (shared tsconfig/eslint/prettier)

## Status

Pending
