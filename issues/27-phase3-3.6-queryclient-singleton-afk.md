# 3.6 Per-remote `QueryClient` module-singleton

## What to build

In each remote (`remote-products`, `remote-cart`, `remote-orders`), create `lib/queryClient.ts` that exports ONE `QueryClient` instance with `defaultOptions: { queries: { staleTime: 60_000, retry: 1 } }`. Module-singleton — importing it twice from different files must return the same instance (reference-equal).

Intentional design: cache is isolated per remote (no cross-remote query sharing — see PRD "Out of Scope").

Refs: `sepc.md` §11.

## Acceptance criteria

- [ ] Each remote has `lib/queryClient.ts` exporting one `QueryClient` instance
- [ ] `staleTime: 60_000` and `retry: 1` configured
- [ ] Importing twice from different files yields the same reference (`===` check)
- [ ] Host does NOT have a QueryClient (host doesn't fetch directly)

## Blocked by

- `22-phase3-3.1-init-nextjs-apps-afk.md`

## User stories covered

- Dev #28 (remote standalone behavior)

## Status

Pending
