# 0.1 Init monorepo root

## What to build

Create the root `package.json` for the workspace with `workspaces: ["packages/*"]` and a dev dependency on `concurrently` (needed later for the multi-app `npm run dev`). This is the foundation every other package will be installed into.

Refs: `sepc.md` §2, §4, §22.

## Acceptance criteria

- [ ] Root `package.json` exists with `private: true` and `workspaces: ["packages/*"]`
- [ ] `concurrently` declared as a devDependency
- [ ] `npm install` at root succeeds with zero workspace packages present

## Blocked by

None — can start immediately.

## User stories covered

- Dev #26 (single `npm run dev`)
- Dev #27 (focused single-app dev)

## Status

Pending
