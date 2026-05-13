# 0.3 Add ESLint config

## What to build

Create a root `.eslintrc.js` that extends the recommended configs for TypeScript, React, and Next.js. Per-package configs should be able to extend this base without duplication.

Refs: `sepc.md` §2, §4.

## Acceptance criteria

- [ ] Root `.eslintrc.js` exists and extends `eslint:recommended`, `@typescript-eslint/recommended`, `plugin:react/recommended`, and Next-specific rules
- [ ] `npx eslint .` runs without crashing (warnings on empty repo are fine)
- [ ] Required ESLint plugins declared as devDependencies at root

## Blocked by

- `01-phase0-0.1-init-monorepo-root-afk.md`

## User stories covered

- Dev #30 (shared tsconfig/eslint/prettier)

## Status

Pending
