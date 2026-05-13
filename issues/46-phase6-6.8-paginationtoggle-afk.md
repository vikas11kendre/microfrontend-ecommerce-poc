# 6.8 `PaginationToggle`

## What to build

A small UI control (segmented buttons or switch) that flips `usePagination` mode. Switching mid-scroll must not reset the visible list — current items remain visible, only the load-more trigger changes (intersection observer vs manual button).

Refs: `sepc.md` §11, §12.

## Acceptance criteria

- [ ] Renders two options: "Infinite scroll" and "Load more"
- [ ] Clicking calls `setMode` from `usePagination`
- [ ] Flipping during scroll continues from current scroll position (visible items unchanged)

## Blocked by

- `45-phase6-6.7-usepagination-hook-afk.md`

## User stories covered

- Shopper #9

## Status

Pending
