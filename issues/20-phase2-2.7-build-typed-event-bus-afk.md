# 2.7 Build typed event bus

## What to build

Two generic functions over `AppEvents`:
- `emit<K extends keyof AppEvents>(name: K, detail: AppEvents[K])` — dispatches a `CustomEvent` on `window`
- `on<K extends keyof AppEvents>(name: K, handler: (detail: AppEvents[K]) => void): () => void` — adds the listener and returns an unsubscribe function

Must SSR-guard: when `typeof window === 'undefined'`, both functions become no-ops and `on` returns a no-op unsubscribe.

Refs: `sepc.md` §20, §21.

## Acceptance criteria

- [ ] `emit` and `on` exported with the documented generic signatures
- [ ] `on` returns an unsubscribe function that, when called, prevents subsequent `emit` calls from invoking the handler
- [ ] SSR guard verified: importing the module in a Node-only context does not throw
- [ ] Unit test confirms round-trip + unsubscribe + SSR no-op (3 cases)

## Blocked by

- `19-phase2-2.6-build-appevents-type-afk.md`

## User stories covered

- Dev #35 (cross-MFE comms)
- Shopper #12 (toast on add)

## Status

Pending
