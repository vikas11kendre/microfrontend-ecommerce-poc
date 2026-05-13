# Micro Frontend E-Commerce POC

> **Primary goal: master agentic coding — build a real, non-trivial project with AI agents using best practices and the fewest tokens possible.**
> Secondary goals: practice machine-coding rounds and internalize Module Federation by building it end-to-end.

A Next.js + Module Federation e-commerce app is the *vehicle*. The *real* artifact is the workflow that produced it.

---

## Why this repo exists

I wanted to answer one question:

> **How do I drive an AI coding agent to ship a non-trivial project efficiently — without hallucinations, scope creep, or token waste — like a Tech Lead drives a junior team?**

So this repo is three things at once:

1. A reproducible **playbook for agent-driven development** (spec → PRD → issues → AFK execution).
2. **Machine-coding practice** — every UI piece (debounce hook, pagination, search, infinite scroll, error boundary, toast bus, etc.) is a classic frontend interview problem.
3. A **portfolio-grade Micro Frontend reference** for FAANG / top product Frontend Lead / Solution Architect interviews.

---

## The agentic workflow (the real product)

Every step exists to **freeze decisions, kill hallucinations, and shrink context** before code is written.

### 1. `spec.md` — raw input
My thoughts dumped: what to build, tech stack, rough constraints. No formatting discipline yet.

### 2. `/grill-me` — interrogate the spec
Agent asks hard questions until ambiguity dies: architecture, contracts, edge cases, tradeoffs.
This step costs time and tokens up front — and pays for itself many times over by stopping the agent guessing later. Forces *me* to decide, not the agent to hallucinate.
**Output:** frozen scope, frozen tech-task decisions, frozen architecture.

### 3. `/to-prd` — formalize as PRD
Agent converts grilled spec into `prd.md`: goals, scope, non-goals, contracts, acceptance criteria. Single source of truth from here on.

### 4. `/prd-to-issues` — slice into Jira-style tickets
PRD broken into ~85 issues under `issues/`, organized by phase (Phase 0 → Phase 12). Each issue is a **vertical tracer-bullet slice** with explicit acceptance criteria — small enough that **a beginner dev (or a fresh agent context) can pick any one cold and ship it**.

Each ticket is tagged:

- **AFK** — *Away From Keyboard*. Self-contained. Agent runs end-to-end, merges without human input.
- **HITL** — *Human In The Loop*. Needs an architectural call or design review. Human gates the merge.

> **Rule: prefer AFK over HITL.** Every HITL ticket is a flag that the upstream PRD missed a decision. Push the decision back into `prd.md`, not the ticket.

### 5. `/caveman` — token diet
Cuts agent verbosity ~75%. Drops articles, filler, pleasantries — keeps full technical precision. Adds up fast over 85 issues.

### 6. `graphify` — codebase index
Builds a knowledge graph at `graphify-out/` with god nodes, communities, cross-file edges. Agent reads `GRAPH_REPORT.md` *before* grepping — turns "scan 200 files" into "traverse 4 edges." Massive context savings after Phase 0.

### 7. `/issues-batch-executor` — AFK grind
Walks phase-tagged issues one by one *without* dragging prior context forward. Each ticket starts fresh, finishes, commits. Stops context bloat over the project lifetime.

### 8. Domain skills on demand
`frontend-best-practices`, `test-driven-development`, `systematic-debugging`, `verification-before-completion` — invoked per issue when relevant. Skills enforce discipline the model would otherwise drop.

---

## Token-saving stack (cumulative effect)

| Lever | What it kills |
|---|---|
| `/grill-me` | hallucinations from ambiguous specs |
| Frozen PRD | re-litigating decisions mid-build |
| AFK-first issues | human round-trips |
| Tracer-bullet slices | half-finished work, mid-issue re-scoping |
| `/caveman` | response fluff |
| `graphify` | repeated codebase scans |
| `/issues-batch-executor` | prior-issue context drag |
| Per-issue fresh agent | context bloat over the project |

---

## Repo layout

```
spec.md                  raw input
prd.md                   frozen source of truth
issues/                  ~85 phase-tagged AFK / HITL tickets
packages/
  host/                  Next.js shell
  remote-products/       MFE
  remote-cart/           MFE
  remote-orders/         MFE
  shared-ui/             cross-MFE components
  shared-store/          Redux + event bus
graphify-out/            codebase knowledge graph
.claude/skills/          custom skills (caveman, grill-me, to-prd,
                         prd-to-issues, issues-batch-executor, review)
```

---

## How to use this repo

**To learn the workflow:**
1. Read `spec.md` (raw input).
2. Read `prd.md` (post-grill output) — see what got pinned down.
3. Scan `issues/` — see how a PRD decomposes into AFK slices.
4. Read `.claude/skills/*/SKILL.md` — the actual skill prompts.
5. Pick any AFK issue, hand it to an agent cold, watch it ship.

**To run the app:**
```bash
npm install
npm run dev      # all apps via concurrently
```

**To keep the graph fresh after edits:**
```bash
graphify update .
```

---

## Status

In progress. Phase 0 (monorepo scaffolding) and Phase 1 (shared-ui) complete. Tracking via `issues/`.

The product-doc sections below (Overview, Architecture, Tech Stack, etc.) are filled by Phase 12 tickets as the implementation lands.

---
---

## 1. Overview

TBD.

## 2. Architecture Diagram

TBD.

## 3. Tech Stack

TBD.

## 4. Monorepo Structure

TBD.

## 5. Getting Started

TBD.

## 6. Port Map

TBD.

## 7. Module Federation

TBD.

## 8. Shared Store

TBD.

## 9. Cross-MFE Communication

TBD.

## 10. Auth Flow

TBD.

## 11. API Integration

TBD.

## 12. Search + Filter + Pagination

TBD.

## 13. Testing Strategy

TBD.

## 14. Failure Modes & Graceful Degradation

TBD.

## 15. Vercel Deployment

TBD.

## 16. CI Topology

TBD.

## 17. Accessibility

TBD.

## 18. Trade-offs

TBD.

## 19. What I'd Do Differently in Production

TBD.
