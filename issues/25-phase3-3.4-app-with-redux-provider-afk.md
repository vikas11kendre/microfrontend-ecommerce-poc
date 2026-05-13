# 3.4 `_app.tsx` with Redux Provider + PersistGate (×4)

## What to build

Each app's `pages/_app.tsx` wraps everything in `<ReduxProvider store={store}>` → `<PersistGate persistor={persistor}>` → `<Layout>` (which renders the shared `Navbar` from `shared-ui`). This is the "per-remote standalone parity" decision in action — each remote can render itself fully (navbar + state + persistence) without the host.

Refs: `sepc.md` §5, §11.

## Acceptance criteria

- [ ] All 4 apps' `_app.tsx` wrap children in `ReduxProvider` → `PersistGate` → `Layout`
- [ ] `Layout` renders the `Navbar` from `shared-ui` (no remote-loaded mini-cart yet — Phase 9.7 adds that on the host)
- [ ] Visiting each remote's port directly renders the navbar
- [ ] Visiting host's `:3000` renders the navbar (page body blank pre-Phase 9)

## Blocked by

- `13-phase1-1.7-export-barrel-afk.md`
- `21-phase2-2.8-export-barrel-afk.md`
- `24-phase3-3.3-configure-shared-deps-afk.md`

## User stories covered

- Dev #28 (standalone remotes)
- Dev #29 (standalone visual parity)

## Status

Pending
