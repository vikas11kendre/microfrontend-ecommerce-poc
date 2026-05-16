# Repository Guidelines

## Source of Truth

This repo currently contains:

- `prd.md`: product scope, phases, and user-facing requirements.
- `sepc.md`: technical source of truth.
- `issues/`: implementation tickets.

Treat `sepc.md` as the technical source of truth and `prd.md` as the product and phase source of truth.

## Intended Monorepo Structure

- `packages/host`: Next.js shell on port `3000`, routing, auth, runtime remote manifest.
- `packages/remote-products`: product listing/detail remote on port `3001`.
- `packages/remote-cart`: cart page and cart summary remote on port `3002`.
- `packages/remote-orders`: order flow remote on port `3003`.
- `packages/shared-ui`: reusable UI components.
- `packages/shared-store`: Redux Toolkit state, typed hooks, and event bus.

## Commands

After Phase 0 is implemented:

- `npm install`
- `npm run dev`
- `APP=remote-products npm run dev:app`
- `npm run build:all`
- `npm run type-check`
- `npm run test --workspaces`
- `npx playwright test`

## Coding Rules

Use TypeScript, React, Next.js Pages Router, and Tailwind CSS.

Keep shared config at the root:

- `tsconfig.base.json`
- `.eslintrc.js`
- `.prettierrc`

Prettier defaults:

- single quotes
- trailing commas
- 100-character print width

Naming:

- Components: `PascalCase`
- Hooks: `useCamelCase`
- Redux slices: `camelCaseSlice`
- Tests: colocated near the code they verify

Import shared packages only from public barrels:

```ts
import { Button } from 'shared-ui';
```

Do not deep import from shared packages.

## Testing Rules

Use Vitest and React Testing Library for unit/component tests.

Prioritize:

- reducer state transitions
- event bus `emit/on`
- manifest fallback branches
- error-boundary retry behavior

Use Playwright for the full E2E flow:

```text
browse → login → add to cart → order → logout
```

## Security Rules

Commit `.env.example`.

Never commit `.env.local`.

Remote URLs are server-side only and must not use `NEXT_PUBLIC_`:

- `REMOTE_PRODUCTS_URL`
- `REMOTE_CART_URL`
- `REMOTE_ORDERS_URL`

## AI Tool Routing

Use at most one primary skill per task unless the workflow clearly needs multiple steps.

### Codebase and Refactoring

Before answering codebase questions, read:

```text
graphify-out/GRAPH_REPORT.md
```

Use:

- `graphify` for architecture, dependency flow, god nodes, module relationships, and cross-file reasoning.
- Serena MCP for symbol navigation, references, declarations, renaming, and refactoring.
- Direct file reads only after Graphify or Serena identifies relevant files.

Avoid `grep`, `rg`, `findstr`, `Select-String`, and raw shell search for code navigation unless Graphify and Serena fail.

For graph-level questions, prefer:

```bash
graphify query "question here"
graphify path "A" "B"
graphify explain "concept here"
```

After code changes, run:

```bash
graphify update .
```

### Frontend Skills

Use:

- `frontend-design` for creating/improving visible UI.
- `vercel-react-best-practices` for React/Next.js performance and production patterns.
- `vercel-composition-patterns` for reusable component APIs and composition.
- `web-design-guidelines` for UI/UX/accessibility audits.
- `webapp-testing` for Playwright/browser verification.
- `review` for final standards/spec review.


### Planning, Docs, and Deployment

Use:

- `issues-batch-executor` for executing existing issue batches.
- `excalidraw-diagram` for diagrams.
- `customize-opencode` only for OpenCode config, MCP, agents, skills, plugins, or permissions.
- `find-skills` only when discovering/installing skills.
- `caveman` only when explicitly requested.

## Conflict Rules

Choose the most specific tool:

1. Architecture/codebase question → `graphify`
2. Symbol lookup/refactor → Serena MCP
3. React/Next.js performance → `vercel-react-best-practices`
4. Component API design → `vercel-composition-patterns`
5. UI creation → `frontend-design`
6. UI audit → `web-design-guidelines`
7. Browser verification → `webapp-testing`
8. Final review → `review`

Do not load many skills just because they are available.