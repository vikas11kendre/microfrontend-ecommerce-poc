<div align="center">

# 🛒 &nbsp; Micro Frontend E-Commerce POC

### _A laboratory for **agentic software engineering** — disguised as a production-grade Module Federation app._

<br/>

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Module Federation" src="https://img.shields.io/badge/Module%20Federation-runtime-FF6B6B?style=for-the-badge&logo=webpack&logoColor=white" />
  <img alt="Redux Toolkit" src="https://img.shields.io/badge/Redux%20Toolkit-2.x-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  <img alt="TanStack Query" src="https://img.shields.io/badge/TanStack%20Query-v5-FF4154?style=for-the-badge&logo=react-query&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

<p>
  <img alt="Status" src="https://img.shields.io/badge/status-in_progress-yellow?style=flat-square" />
  <img alt="Phases" src="https://img.shields.io/badge/phases-2%2F12_complete-blue?style=flat-square" />
  <img alt="Issues" src="https://img.shields.io/badge/issues-85_tickets-success?style=flat-square" />
  <img alt="Built With" src="https://img.shields.io/badge/built_with-Claude_Code-D97757?style=flat-square&logo=anthropic&logoColor=white" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green?style=flat-square" />
</p>

<sub>**Two goals, one repo:** <br/> ① learn how to drive AI coding agents like a Tech Lead drives a team &nbsp;·&nbsp; ② ship a portfolio-grade Micro Frontend for FAANG-tier interviews.</sub>

<br/>

[**📖 The Workflow**](#-the-agentic-workflow) &nbsp;·&nbsp; [**🏗️ Architecture**](#%EF%B8%8F-architecture) &nbsp;·&nbsp; [**🚀 Quick Start**](#-quick-start) &nbsp;·&nbsp; [**🧠 Graphify**](#-graphify--the-codebase-knowledge-graph) &nbsp;·&nbsp; [**🗺️ Roadmap**](#%EF%B8%8F-roadmap)

</div>

<br/>

---

## ✨ The Pitch

Most "AI-built" demos are toy CRUDs hand-held by humans. This repo asks the harder question:

> **How do you drive an AI coding agent to ship a real, multi-package, federated frontend — without hallucinations, scope creep, or runaway token bills — the way Tech Lead drives a team of juniors?**

The **product** is a working Micro Frontend e-commerce app (Next.js + Module Federation + Redux Toolkit + TanStack Query) deployed independently to Vercel.

The **artifact** is the **agentic workflow** that produced it: a reproducible pipeline of skills, gates, and discipline that turns a fuzzy idea into ~85 independently-shippable tickets a beginner dev (or a fresh agent context) can pick up cold.

This README documents both.

---

## 🎯 Why This Repo Exists

<table>
<tr>
<td width="33%" valign="top">

### 🤖 &nbsp; Agentic Coding Lab

A reproducible playbook for **agent-driven development**:

`spec` → `grill` → `PRD` → `issues` → `AFK` execution → `review`.

Every skill picked to **freeze decisions, kill hallucinations, and shrink context** before code is written.

</td>
<td width="33%" valign="top">

### 💻 &nbsp; Machine-Coding Practice

Every UI piece is a classic FE interview problem:

debounce hook · pagination · infinite scroll · search · sort/filter · error boundary with retry · toast bus · custom event bus · etc.

</td>
<td width="33%" valign="top">

### 🏛️ &nbsp; Solution-Architect Portfolio

A **real Micro Frontend reference**:

runtime manifest, per-remote QueryClient, `strictVersion` shared store, 3-tier graceful degradation, per-package CI, independent Vercel deploys.

</td>
</tr>
</table>

---

## 🏗️ Architecture

High-level runtime view — host shell, three federated remotes, shared singletons, manifest-driven remote registration, and the cross-MFE event bus.

```
                          ┌───────────────────────────────────────────────┐
                          │             Browser (single tab)              │
                          │                                               │
                          │   window  ──►  Event Bus (CustomEvent)        │
                          │   • product:added-to-cart                     │
                          │   • auth:logout                               │
                          └───────────────────┬───────────────────────────┘
                                              │ dynamic import → remoteEntry.js
        ┌─────────────────────────────────────┼─────────────────────────────────────┐
        │                                     │                                     │
        ▼                                     ▼                                     ▼
┌──────────────────┐              ┌────────────────────────┐            ┌──────────────────────┐
│  HOST  :3000     │              │ remote-products :3001  │            │ remote-cart   :3002  │
│  Next.js shell   │              │  exposes:              │            │  exposes:            │
│                  │              │   ./ProductsPage       │            │   ./CartPage         │
│  _app.tsx        │              │   ./ProductDetailPage  │            │   ./CartSummary      │
│   ├ ReduxProvider│              │  module-singleton      │            │  module-singleton    │
│   ├ PersistGate  │              │  QueryClient           │            │  QueryClient         │
│   └ Layout       │              └────────────────────────┘            └──────────────────────┘
│      ├ Navbar    │
│      └ <Page/>   │              ┌────────────────────────┐
│                  │              │ remote-orders :3003    │
│  pages/          │              │  exposes:              │
│   ├ index        │ ◄─dynamic──► │   ./OrdersPage         │
│   ├ product/[id] │              │  module-singleton      │
│   ├ cart         │              │  QueryClient           │
│   ├ orders       │              └────────────────────────┘
│   ├ login        │
│   └ api/remotes ─┼── reads REMOTE_*_URL (server-side env, no NEXT_PUBLIC_)
│                  │
│  middleware.ts   │      Auth gate → /cart, /orders redirect to /login if no cookie
│                  │
│  lib/manifest.ts │      bootstrapRemotes():
│                  │        1. fetch /api/remotes  (server reads env)
│                  │        2. fallback → localStorage 'mfe:remotes:lkg' + warning banner
│                  │        3. @module-federation/runtime.init({ remotes })
└──────────────────┘

┌─────────────── Shared packages (singleton: true, strictVersion) ───────────────┐
│                                                                                │
│   shared-store  (^1.0.0, additive-only minor/patch)                            │
│     • store.ts        Redux Toolkit + redux-persist (whitelist: auth, cart)    │
│     • authSlice       login / logout                                           │
│     • cartSlice       addItem / removeItem / clearCart                         │
│     • events.ts       AppEvents discriminated union                            │
│     • eventBus.ts     emit / on  (typed wrapper over window.dispatchEvent)     │
│                                                                                │
│   shared-ui                                                                    │
│     Button · Card · Badge · Spinner · Navbar (cartDropdown slot)               │
│                                                                                │
│   Ownership rule:                                                              │
│     Redux  → persistent shared state  (the noun: auth, cart)                   │
│     Events → ephemeral cross-remote signals (the verb: toasts, logout)         │
└────────────────────────────────────────────────────────────────────────────────┘

External data:  fakestoreapi.com  ← consumed by each remote's own QueryClient
                                    (caches isolated by ownership boundary)
```

### Fault isolation (3 tiers)

| Tier | Failure | What the user sees | Recovery |
|---|---|---|---|
| **Manifest** | `/api/remotes` 5xx | Shell renders w/ last-known-good manifest + warning banner | Auto-retry next page load |
| **Page-remote** | `remoteEntry.js` 404/500/timeout | ErrorBoundary card "Section temporarily unavailable" + **Retry** | Re-imports remote (clears dyn-import cache) |
| **Widget-remote** | Federated mini-cart fails | Widget silently hidden; navbar/cart-count keep working | Degraded UX, not broken |
| **State contract** | `shared-store` version mismatch | **Hard fail loud** at federation init | Coordinated re-deploy |

> **Why this shape:** runtime manifest (not static `remotes:` in `next.config.js`) means a remote URL change → update env var → **no host rebuild**. `strictVersion` on `shared-store` makes state-shape drift fail loud at boot instead of silently corrupting Redux. Per-remote `QueryClient` keeps cache ownership aligned with team ownership.

---

## 🤖 The Agentic Workflow

> The **real** product of this repo. Every step exists to freeze decisions, kill hallucinations, and shrink context.

```
   ┌──────────┐   /grill-me   ┌──────────┐   /to-prd    ┌─────────┐   /prd-to-issues   ┌───────────┐
   │ spec.md  │ ────────────► │ frozen   │ ───────────► │ prd.md  │ ─────────────────► │ issues/   │
   │ (raw)    │   interrogate │ scope    │  synthesize  │ (truth) │  vertical slices   │ ~85 AFK   │
   └──────────┘               └──────────┘              └─────────┘                    └─────┬─────┘
                                                                                             │
                                                                       /issues-batch-executor│
                              ┌──────────────┐    ┌──────────────┐    /caveman + graphify    │
                              │   /review    │ ◄──│  AFK agent   │ ◄──────────────────────── ┘
                              │ (2-axis,     │    │ (fresh ctx,  │
                              │ Standards +  │    │  HANDOFF.md  │
                              │  Spec)       │    │  only memory)│
                              └──────────────┘    └──────────────┘
                                     │
                                     ▼
                                  ✅ merge
```

Each skill below uses the same three-line treatment: **What** / **Why we use it** / **How it helps**.

<details open>
<summary><h3 style="display:inline">📝 &nbsp; Step 0 — <code>spec.md</code> &nbsp; <sub><em>(raw input)</em></sub></h3></summary>

- **What** &nbsp;·&nbsp; My unfiltered thoughts: what to build, tech stack, rough constraints. No formatting discipline.
- **Why** &nbsp;·&nbsp; Giving an agent a "vibe" is worse than giving it a messy draft. Even a rough doc anchors the conversation.
- **How it helps** &nbsp;·&nbsp; Gives `/grill-me` something concrete to attack instead of asking 100 open questions cold.

</details>

<details open>
<summary><h3 style="display:inline">🔥 &nbsp; Step 1 — <a href="./.claude/skills/grill-me"><code>/grill-me</code></a></h3></summary>

- **What** &nbsp;·&nbsp; Agent interrogates the spec one question at a time, walking the design tree branch by branch, recommending an answer for each. Decisions pinned down inline.
- **Why** &nbsp;·&nbsp; Silent assumptions become hallucinated code later. Grilling forces ambiguity to surface *before* any line is written, and forces *me* (not the agent) to make the calls.
- **How it helps** &nbsp;·&nbsp; By the time grilling ends — architecture, contracts, tech-task choices, and edge cases are frozen. Downstream agents stop guessing — they execute.

</details>

<details open>
<summary><h3 style="display:inline">📋 &nbsp; Step 2 — <a href="./.claude/skills/to-prd"><code>/to-prd</code></a></h3></summary>

- **What** &nbsp;·&nbsp; Synthesizes the grilled conversation + `spec.md` into `prd.md` — goals, scope, non-goals, contracts, acceptance criteria. No new questions, just synthesis.
- **Why** &nbsp;·&nbsp; Conversations are lossy; a PRD is durable. Future agents (with no memory of the grilling) need a single source of truth.
- **How it helps** &nbsp;·&nbsp; Every subsequent step (issue breakdown, code review, AFK execution) cites `prd.md` instead of re-litigating decisions.

</details>

<details open>
<summary><h3 style="display:inline">🎯 &nbsp; Step 3 — <a href="./.claude/skills/prd-to-issues"><code>/prd-to-issues</code></a></h3></summary>

- **What** &nbsp;·&nbsp; Breaks `prd.md` into **vertical tracer-bullet slices** under `issues/`, phase-tagged (Phase 0 → Phase 12), each with explicit acceptance criteria.
- **Why** &nbsp;·&nbsp; Monolithic plans drown an agent's context. Small, independent tickets keep each agent run short, focused, and reviewable.
- **How it helps** &nbsp;·&nbsp; Any AFK ticket can be picked up cold by a fresh agent (or a beginner dev) and shipped end-to-end. **~85 tickets** here.

**Each ticket is tagged:**

| Tag | Meaning | Behavior |
|---|---|---|
| 🟢 **AFK** | *Away From Keyboard* | Agent runs end-to-end, merges without human input |
| 🟡 **HITL** | *Human In The Loop* | Needs architectural call / design review; human gates the merge |

> 💡 **Rule: prefer AFK over HITL.** Every HITL ticket signals the upstream PRD missed a decision — push it back into `prd.md`, not the ticket.

</details>

<details open>
<summary><h3 style="display:inline">🗜️ &nbsp; Step 4 — <a href="./.claude/skills/caveman"><code>/caveman</code></a></h3></summary>

- **What** &nbsp;·&nbsp; Ultra-compressed output mode. Drops articles, filler, pleasantries. Keeps technical precision and code blocks exact.
- **Why** &nbsp;·&nbsp; Agents love to explain themselves. Over 85 issues, fluff is the biggest single token leak after re-reading files.
- **How it helps** &nbsp;·&nbsp; **~75%** fewer output tokens per response, zero loss of substance. Pays for itself in 2–3 issues.

</details>

<details open>
<summary><h3 style="display:inline">🕸️ &nbsp; Step 5 — <a href="#-graphify--the-codebase-knowledge-graph"><code>graphify</code></a></h3></summary>

- **What** &nbsp;·&nbsp; Builds a queryable knowledge graph of the repo (god nodes, communities, cross-file edges) at `graphify-out/`. Multi-modal: code, SQL, shell, docs, PDFs, images.
- **Why** &nbsp;·&nbsp; Grep/glob across a 200-file monorepo costs thousands of tokens per issue. The graph turns that into edge traversal.
- **How it helps** &nbsp;·&nbsp; `CLAUDE.md` directive + PreToolUse hook force the agent to read `GRAPH_REPORT.md` *before* any file scan. Public benchmarks report **49–70× token reduction** on 500+ file repos.

</details>

<details open>
<summary><h3 style="display:inline">⚙️ &nbsp; Step 6 — <a href="./.claude/skills/issues-batch-executor"><code>/issues-batch-executor</code></a></h3></summary>

- **What** &nbsp;·&nbsp; Orchestrator that walks phase-tagged tickets, spawning a **fresh agent per batch** with only `issues/HANDOFF.md` as memory. Two modes: *worker* (one batch, stop) and *orchestrator* (loop until phase done).
- **Why** &nbsp;·&nbsp; Context bloat is the silent killer in long projects — issue #80's agent shouldn't be carrying issue #1's context. Per-batch resets force everything load-bearing into `HANDOFF.md` or the code itself.
- **How it helps** &nbsp;·&nbsp; Keeps each agent run small, cheap, reviewable. The main orchestrator stays cold; only fresh subagents pay the per-issue token cost.

</details>

<details open>
<summary><h3 style="display:inline">🔍 &nbsp; Step 7 — <a href="./.claude/skills/review"><code>/review</code></a></h3></summary>

- **What** &nbsp;·&nbsp; Two-axis review of the diff since a fixed point — **Standards** (follows repo conventions?) and **Spec** (matches the originating issue / PRD?). Runs both axes in parallel sub-agents.
- **Why** &nbsp;·&nbsp; AFK agents can ship green tests that still drift from the PRD. A separate reviewing agent catches what the building agent rationalized away.
- **How it helps** &nbsp;·&nbsp; Gates merges with an independent second opinion, without burning the main context on diff-reading.

</details>

<details open>
<summary><h3 style="display:inline">🧱 &nbsp; Step 8 — Superpowers skill suite <em>(on demand)</em></h3></summary>

- **What** &nbsp;·&nbsp; Discipline skills: `test-driven-development`, `systematic-debugging`, `verification-before-completion`, `brainstorming`, `frontend-best-practices`.
- **Why** &nbsp;·&nbsp; LLMs drift toward "claim done" before evidence. These skills are rigid playbooks — TDD red-green-refactor, verify-before-commit, etc.
- **How it helps** &nbsp;·&nbsp; Invoked per-issue when the workflow matches. Keeps quality from collapsing as the project grows.

</details>

---

## 📊 Token Economics

The cumulative effect of stacking these levers. Each row attacks a different waste mode.

| Lever | Waste it kills | Mechanism |
|---|---|---|
| `/grill-me` | Hallucinations from ambiguous specs | Front-loaded interrogation |
| `/to-prd` | Re-litigating decisions mid-build | Durable source of truth |
| `/prd-to-issues` (AFK-first) | Human round-trips, half-done work | Vertical slices, explicit acceptance criteria |
| `/caveman` | Response fluff | **~75% fewer output tokens** |
| `graphify` | Repeated codebase scans | Knowledge graph + PreToolUse hook — **49–70× reported** |
| `/issues-batch-executor` | Prior-issue context drag | Fresh agent per batch, `HANDOFF.md` is the only memory |
| `/review` | Spec drift slipping into `main` | 2-axis independent review |
| Per-issue fresh agent | Context bloat over the project lifetime | Cold-start guarantees |

---

## 🧠 Graphify — the codebase knowledge graph

<table>
<tr><td>

**What it is:** open-source knowledge-graph skill for AI coding assistants. Turns any folder (code, SQL schemas, shell scripts, docs, PDFs, images, video) into a queryable graph with god nodes, communities, and cross-file edges.

**Outputs:** `graphify-out/GRAPH_REPORT.md` (highlights) · `graph.html` (interactive viz) · `graph.json` (full graph).

**Why we added it:** the agent reads `GRAPH_REPORT.md` *before* any grep / glob / file scan (enforced via `CLAUDE.md` + a PreToolUse hook). Result: *"scan 200 files"* → *"traverse 4 edges."*

🔗 &nbsp; [**graphify.net**](https://graphify.net) &nbsp;·&nbsp; [**GitHub**](https://github.com/safishamsi/graphify) &nbsp;·&nbsp; [**Claude Code integration guide**](https://graphify.net/graphify-claude-code-integration.html)

</td></tr>
</table>

### Install (Python 3.10+)

```bash
# pick one
pip install graphifyy
# or
uv tool install graphifyy
# or
pipx install graphifyy

# one-time setup
graphify install

# wire it into Claude Code (adds CLAUDE.md directive + PreToolUse hook)
graphify claude install
```

### Build & maintain the graph

```bash
graphify build .      # one-time — writes graphify-out/ (GRAPH_REPORT.md, graph.html, graph.json)
graphify update .     # after edits — AST-only re-index, no API cost
```

> ⚠️ Skipping the install means every issue pays the *"scan the codebase from scratch"* tax — the whole token-saving story collapses.

---

## 🚀 Quick Start

```bash
# 1. clone & install
git clone https://github.com/<you>/microfrontend-ecommerce-poc.git
cd microfrontend-ecommerce-poc
npm install

# 2. (optional but recommended) wire up graphify
pip install graphifyy && graphify install && graphify claude install
graphify build .

# 3. start everything (host + 3 remotes, via concurrently)
npm run dev
```

| Service | URL | Role |
|---|---|---|
| **host** | http://localhost:3000 | Shell, routing, auth, Redux Provider |
| **remote-products** | http://localhost:3001 | Product listing + detail |
| **remote-cart** | http://localhost:3002 | Cart page + cart summary widget |
| **remote-orders** | http://localhost:3003 | Order placement + success |

**Mock auth credentials:** `test@test.com` / `password123`

---

## 🗂️ Repo Layout

```
microfrontend-ecommerce-poc/
├── 📄 spec.md                      raw input (the messy draft)
├── 📄 prd.md                       frozen source of truth (post-grill)
├── 📁 issues/                      ~85 phase-tagged AFK / HITL tickets
│
├── 📁 packages/
│   ├── host/                       Next.js shell (port 3000)
│   ├── remote-products/            Products MFE (port 3001)
│   ├── remote-cart/                Cart MFE (port 3002)
│   ├── remote-orders/              Orders MFE (port 3003)
│   ├── shared-ui/                  Button · Card · Badge · Spinner · Navbar
│   └── shared-store/               Redux Toolkit + redux-persist + typed event bus
│
├── 📁 graphify-out/                codebase knowledge graph
│   ├── GRAPH_REPORT.md             ◄── agent reads this BEFORE grep
│   ├── graph.html                  interactive visualisation
│   └── graph.json                  full graph data
│
└── 📁 .claude/skills/              custom skills powering the workflow
    ├── grill-me/
    ├── to-prd/
    ├── prd-to-issues/
    ├── caveman/
    ├── issues-batch-executor/
    └── review/
```

---

## 🛠️ Tech Stack

| Concern | Choice | Reason |
|---|---|---|
| **Framework** | Next.js 14 (Pages Router) | Stable `@module-federation/nextjs-mf` support |
| **Language** | TypeScript | Senior-role signal; types are non-negotiable |
| **Styling** | Tailwind CSS | Fast, modern, production standard |
| **Module Federation** | `@module-federation/nextjs-mf` + `@module-federation/runtime` | Build-time plugin + runtime dynamic remote registration (manifest-driven) |
| **State** | Redux Toolkit + redux-persist | Persistent shared state (auth, cart) across remotes |
| **Cross-MFE comms** | `window.dispatchEvent` (typed `CustomEvent` wrapper) | Ephemeral signals; singleton-safe by design |
| **Data fetching** | TanStack Query v5 | One `QueryClient` per remote (module-singleton); caches isolated by ownership |
| **Package manager** | npm workspaces | Simple monorepo, zero extra tooling |
| **Dev experience** | `concurrently` | One command, all apps |
| **Testing** | Vitest + RTL + Playwright | Unit + component + 1 cross-MFE E2E that boots all 4 apps |
| **Deployment** | Vercel (1 project per app) | Native Next.js support, independent deploys |
| **CI** | GitHub Actions (per-package workflows) | Path-filtered; reusable workflow; mirrors deploy partition |
| **Agentic harness** | [Claude Code](https://claude.com/claude-code) + custom skills + [Graphify](https://graphify.net) | The actual experiment |

---

## 🗺️ Roadmap

> Tracked in `issues/` — every line below is a folder of vertical-slice tickets.

| Phase | Scope | Status |
|---|---|---|
| **0** | Monorepo scaffolding (workspaces, TS base, ESLint, Prettier, scripts) | ✅ Complete |
| **1** | `shared-ui` package (Button, Card, Badge, Spinner, Navbar) | ✅ Complete |
| **2** | `shared-store` (Redux slices, redux-persist, typed event bus) | 🟡 In progress |
| **3** | Next.js apps init + Module Federation plugin wiring | ⬜ Pending |
| **4** | Remote `exposes`, host `/api/remotes` manifest, runtime bootstrap | ⬜ Pending |
| **5** | Error boundaries, retry UX, warning banner, full-page spinner | ⬜ Pending |
| **6** | Products MFE — search, filter, sort, pagination, infinite scroll | ⬜ Pending |
| **7** | Cart MFE — cart page, cart summary widget, item actions | ⬜ Pending |
| **8** | Orders MFE — order summary, success screen | ⬜ Pending |
| **9** | Host wiring — pages, layout, middleware auth, toast listener | ⬜ Pending |
| **10** | Testing — Vitest + RTL units, Playwright cross-MFE E2E | ⬜ Pending |
| **11** | CI — reusable Node build, per-package workflows, version pin check | ⬜ Pending |
| **12** | README sections, Vercel deploy | ⬜ Pending |

---

## 📚 Detailed Product Documentation

> The numbered sections below are filled progressively by **Phase 12** tickets (`issues/81-84`).
> Each section is a vertical slice; nothing is pre-written.

<details>
<summary><strong>Index of sections (click to expand)</strong></summary>

| # | Section | Status |
|---|---|---|
| 1 | Overview | TBD (Phase 12.1) |
| 2 | Architecture Diagram | ✅ See above |
| 3 | Tech Stack | ✅ See above |
| 4 | Monorepo Structure | ✅ See above |
| 5 | Getting Started | ✅ See above |
| 6 | Port Map | ✅ See above |
| 7 | Module Federation deep-dive | TBD (Phase 12.2) |
| 8 | Shared Store + versioning policy | TBD (Phase 12.2) |
| 9 | Cross-MFE Communication | TBD (Phase 12.2) |
| 10 | Auth Flow | TBD (Phase 12.2) |
| 11 | API Integration | TBD (Phase 12.3) |
| 12 | Search + Filter + Pagination | TBD (Phase 12.3) |
| 13 | Testing Strategy | TBD (Phase 12.3) |
| 14 | Failure Modes & Graceful Degradation | TBD (Phase 12.3) |
| 15 | Vercel Deployment | TBD (Phase 12.4) |
| 16 | CI Topology | TBD (Phase 12.4) |
| 17 | Accessibility | TBD (Phase 12.4) |
| 18 | Trade-offs | TBD (Phase 12.4) |
| 19 | What I'd Do Differently in Production | TBD (Phase 12.4) |

</details>

---

## 🙏 Credits & Inspiration

---

## 📄 License

MIT — free to learn from, fork, remix, or use as a template for your own agentic-coding experiments.

