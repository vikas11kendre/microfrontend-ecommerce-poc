---
name: issues-batch-executor
description: Use when working through phase-tagged implementation issue files where a single agent would otherwise carry many issues' worth of context. Triggers on requests like "do the next batch of issues", "continue phase N", "execute the phase2 tickets", or any multi-issue grind where token usage grows with each completed issue.
---

# Issues Batch Executor

Two modes:

- **Worker mode** (default) — do at most `batch_size` issues, write `issues/HANDOFF.md`, stop. Used when a fresh agent is given a batch directly.
- **Orchestrator mode** — main agent stays cold; spawns fresh `Agent` subagents per batch in a loop until phase done. Trigger phrases: "run phase X", "do whole phase", "auto batch", "execute all of phase N", "finish phase".

The handoff file is the only memory between batches. If a fact isn't in HANDOFF.md or visible by reading the changed code, it is gone — and that's the point.

## Mode selection

Detect at skill invocation:

- User asks for a single batch ("do next batch", "continue phase3") → **worker mode**, go to "Per-issue loop".
- User asks to drive the whole phase ("run phase3", "auto", "finish phase4") → **orchestrator mode**, go to "Orchestrator mode" section.
- Subagent was dispatched by an orchestrator → **worker mode** (prompt will say so).

## Inputs

From the calling message, or default:

- `phase_name` — e.g. `phase2`. If absent, read `next.next_phase` from existing HANDOFF.md.
- `batch_size` — default `2`. Hard cap.
- `issue_root` — default `issues/`.

## Issue discovery

1. Flat layout. Files named like `14-phase2-2.1-...-afk.md`.
2. Match files whose name contains `-{phase_name}-`.
3. Sort ascending by filename.
4. Skip any `issue_id` listed under `done` or `skip` in HANDOFF.md.
5. Take the first `batch_size` remaining. That is the batch. No more.

## Per-issue loop

For each issue, in order:

1. Read the issue file **once**. Extract: `issue_id`, build goal, acceptance criteria, refs, `blocked by`, status.
2. **Direct context only.** Allowed: files the issue names, and `graphify explain "<concept>"` for concepts the issue *names by string*. **Forbidden in worker mode:** `graphify query`, `graphify path`, broad Glob/Grep sweeps, reading other issue files, reading spec/PRD/CLAUDE.md. Hard cap: ≤2 `graphify explain` per issue.
3. **Cite-or-skip.** Any claim you put in HANDOFF `carry` must come from a file you Read this batch. If you cannot cite `path:line`, omit the claim. No paraphrasing spec/PRD/other-issue content from memory.
4. Check blockers (rule below). Real blocker → write HANDOFF and stop.
5. **Read-before-write.** Before any `Edit`/`Write` on an existing file, `Read` it in this batch. Never `Write` to a path you have not confirmed via `Read` or `Glob`. Never list a path in HANDOFF `changed`/`added` without that confirmation.
6. Implement.
7. **Verify with a real command.** Run the narrowest verification that proves acceptance: file-local type-check → package test → package build. Repo-wide only if acceptance demands integration. Capture the **exact command** that exited 0.
8. Verification fails → fix now. Cannot fix safely → treat as a real blocker. Same issue verified-failed twice → blocker.
9. Record the issue in HANDOFF `done` with proof: `- <id>: <one-line outcome> [ok: <exact cmd>]`. No proof line = batch is unverified and the orchestrator will halt.

After the last issue in the batch: write HANDOFF.md, stop. **Do not** run `graphify update .` — the orchestrator runs it once at phase end.

## Real blocker (the only reasons to stop early)

- Missing required file, export, or interface in the workspace
- Dependency not installed; env/config absent
- Build/test/type-check failure the current issue cannot safely resolve
- Acceptance cannot be verified with current repo state

`Blocked by: #...` in issue metadata is **advisory**. If the referenced artifact already exists in the workspace, continue.

## HANDOFF.md — the only thing the next agent reads from you

Path: `issues/HANDOFF.md`. **Replace** the file each batch; never append. It is current state, not a log.

```yaml
---
phase: phase2
batch_size: 2
written_at: 2026-05-13
---

## done
- 14-phase2-2.1: shared-store scaffolded, types exported [ok: pnpm -F shared-store typecheck]
- 15-phase2-2.2: authSlice + reducer wired [ok: pnpm -F shared-store test auth]

## changed
- packages/shared-store/package.json
- packages/shared-store/src/auth/authSlice.ts

## added
- packages/shared-store/src/auth/authSlice.test.ts

## next
next_phase: phase2
next_issues: [16-phase2-2.3, 17-phase2-2.4]
skip: []

## carry
- contract: authSlice :: exports { login, logout, setToken }; token: string|null
- contract: cart slice (next) :: must read auth.token via selector, not direct state

## blockers
(empty)
```

Rules:

- **`done` lines must end with `[ok: <exact cmd>]`.** Missing proof = orchestrator halts batch as unverified.
- **`carry` strict schema:** each line starts with `contract: <name> :: <signature or invariant>`. Max 5 lines. Each line ≤80 chars. No reasoning, no recap, no "note:" lines. If it doesn't fit `contract: X :: Y`, omit it.
- **Cite-or-skip:** `carry` claims must be re-derivable from files listed in `changed`/`added`. If not, omit.
- **File size cap: 80 lines total.** If HANDOFF would exceed, you're pasting too much — strip to deltas.
- **Path confirmation:** every path in `changed`/`added` must have been Read or Glob-confirmed this batch. No phantom paths.
- Never paste issue bodies, command output, or file contents into HANDOFF.
- Empty section → keep the header, put `(empty)` or `[]`.

## End-of-batch chat output

```json
{"done":["<id>","<id>"],"changed":["<path>"],"added":["<path>"],"notes":["<short blocker if any>"]}
```

This JSON is your **only** chat output for the batch. No per-issue blocks, no prose, no summary. Then stop.

## Token discipline (the whole point)

- Never reread a prior-batch issue file.
- Never restate an issue body — refer to it by id.
- Never summarize what HANDOFF.md already says.
- Never print file contents unless asked.
- Prefer path lists over prose.
- `graphify explain` only — no `query`, no `path`. Max 2 explains per issue.
- No emit-per-issue blocks. Only the end-of-batch JSON.
- No Read of any file not named in the current issue, HANDOFF, or returned by a Glob you just ran.
- No paraphrasing from memory — cite the file:line or omit.

## Red flags — you are bleeding tokens

| Thought | Reality |
|---|---|
| "Let me re-read the spec to be safe" | Re-read of resolved material. Skip unless an acceptance criterion names a file you haven't Read this batch. |
| "One more issue, it's small" | Batch overrun. Stop at `batch_size`. |
| "I'll paste the file into HANDOFF so it's complete" | HANDOFF is a delta, not a snapshot. The code is the snapshot. |
| "I should explain my reasoning in carry" | Reasoning belongs in the commit. `carry` is `contract: X :: Y` only. |
| "Let me run a broad graphify query to be thorough" | Worker mode forbids `query` and `path`. Only `explain`, max 2/issue. |
| "I'll do the verification at the end of the batch" | Verify per issue, immediately. Record exact cmd in `[ok: ...]`. |
| "I remember the spec said X" | Memory hallucinates. Cite `path:line` from a file Read this batch, or omit. |
| "I'll Write this file — it probably exists" | No. `Read` or `Glob` first. Phantom paths in HANDOFF are a halt condition. |

## Stop conditions

- `batch_size` issues completed → write HANDOFF, stop.
- Real blocker on the current issue → write HANDOFF (with blocker line), stop.
- No issues match `-{phase_name}-` → write HANDOFF with `next_issues: []`, stop.

---

# Orchestrator mode

Main agent = dispatcher only. Never reads issue bodies. Never implements. Holds only HANDOFF deltas + filename list. Spawns one fresh `Agent` subagent per batch and loops until phase done.

## Orchestrator inputs

- `phase_name` — from user message, or read `next.next_phase` from `issues/HANDOFF.md`.
- `issue_root` — default `issues/`.
- `max_batches` — safety cap, default `20`. Hard stop after this many subagent spawns.

## Orchestrator loop

Track across iterations (in-memory): `last_done_ids` (the `done` list from the most recent worker JSON).

Repeat until stop condition:

1. **Read state** — `issues/HANDOFF.md` only. Extract `done`, `skip`, `next_phase`. If file absent (phase fresh), treat `done=[]`, `skip=[]`. **Assert HANDOFF.md ≤ 80 lines** — if larger, halt and surface to user (worker is leaking).
2. **Discover candidates** — `Glob` for `issues/*-{phase_name}-*.md`. Sort ascending. Drop ids in `done` or `skip`. Take first 2 → `candidates`. None → phase complete, exit loop (go to phase-end actions).
3. **Decide batch size** — for candidate 1, `Read` only the **first 30 lines** of the issue file. Get file byte size via `Glob` result (don't full-Read). Apply "Heaviness rule" below. If batch_size=2, peek candidate 2's first 30 lines too. Slice `candidates` → `batch`.
4. **Spawn worker** — single `Agent` call (subagent_type=general-purpose), prompt template in "Worker prompt" below. Pass: phase, batch ids, decided batch_size. Foreground. Wait.
5. **Read returned JSON** — the subagent's last message has the end-of-batch JSON block. Extract `done`, `notes`.
6. **Integrity check** — re-read `issues/HANDOFF.md`. Parse `done` section ids. Compare to worker JSON `done`:
   - Mismatch (worker claimed ids not in HANDOFF, or HANDOFF has ids worker didn't claim) → halt, surface to user.
   - Any HANDOFF `done` line missing `[ok: <cmd>]` → halt (unverified batch).
   - Worker JSON `done` ⊆ pre-spawn HANDOFF `done` (worker claimed nothing new) AND `notes` empty → halt (silent failure).
7. **Stop checks** (in order):
   - `notes` has blocker → halt, surface blocker.
   - Worker JSON `done` == `last_done_ids` (same ids two batches running) → halt, treat as loop.
   - HANDOFF `next_issues` is `[]` → phase complete, exit loop.
   - `max_batches` reached → halt, warn user.
8. Update `last_done_ids` = worker JSON `done`. Next iteration.

**Phase-end actions** (after loop exits cleanly): run `graphify update .` once. Then emit final summary.

Emit one line per batch as it completes (`batch N: did [ids]`), plus final state at end. Nothing else.

## Heaviness rule (batch_size 1 vs 2)

Inputs: first 30 lines of issue file + file byte size (from `Glob` metadata, not a full Read).

Pick `batch_size = 1` when the **first** candidate is heavy. OR-combined heuristics:

- File size > ~8 KB (rough proxy for >200 lines).
- Acceptance criteria header lists > 4 items (visible in first 30 lines).
- Mentions "integration", "e2e", "migration", "rollback", "module federation wiring", "host shell" in the first 30 lines.
- Touches > 3 packages (count distinct `packages/<x>/` mentions in first 30 lines).
- Header frontmatter tag `weight: heavy` or `size: L`.

Else light. If candidate 1 light, peek candidate 2's first 30 lines: if heavy → `batch_size=1`; else `batch_size=2`. Never exceed 2.

## Worker prompt template

The orchestrator spawns the subagent with a self-contained prompt — the subagent has no conversation history:

```text
You are a worker for the issues-batch-executor skill.

Invoke the skill `issues-batch-executor` immediately. Run in **worker mode**.

Phase: {phase_name}
Batch ids (in order): {comma-separated ids}
Batch size cap: {1 or 2}

Inputs you must read yourself:
- issues/HANDOFF.md (prior state)
- issues/{id}.md for each id in the batch

Do not read other issue files. Do not read spec/PRD/CLAUDE.md. Do not run `graphify query` or `graphify path`. Follow the skill's "Per-issue loop" and "Token discipline" sections exactly.

Each `done` line in HANDOFF must end with `[ok: <exact cmd>]` — proof of verification. `carry` lines must be `contract: <name> :: <signature>`. Never `Write`/`Edit` a path before `Read`/`Glob` confirms it.

When the batch is done (or blocked), write issues/HANDOFF.md (≤80 lines) and emit ONLY the end-of-batch JSON block as your final message. No per-issue blocks, no prose. Then stop.
```

## What the orchestrator must NOT do

- Never read issue body files.
- Never read spec/PRD.
- Never call `graphify` itself (workers do that).
- Never run verification (workers do that).
- Never paste worker JSON or HANDOFF content back to the user — one-line summary per batch only.
- Never spawn parallel workers — batches are sequential because each depends on the prior HANDOFF.

## Orchestrator stop output

```text
phase {phase_name}: {N} batches, {M} issues done
final state: {phase complete | blocked: <id> — <one-line reason> | cap reached at {max_batches}}
```

That's it. User can `/clear` and inspect HANDOFF.md if they want detail.
