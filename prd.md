# PRD — Micro Frontend E-Commerce POC

> Source of truth for *what* and *why*. Technical depth lives in `sepc.md`; the 16 locked decisions from the 2026-05-12 grill-me session take precedence where they conflict.
>
> This PRD breaks the build into **small, beginner-friendly chunks** — each chunk is a discrete task any frontend developer (junior or above) can pick up, complete in under ~2 hours, and verify on their own. Chunks are designed to be checked off one at a time.

---

## Problem Statement

I'm preparing for **frontend lead / solution architect** interviews at FAANG and top product companies. I need a public portfolio repo that:

1. Demonstrates real micro-frontend architecture skills — independent deploys, fault isolation, cross-MFE comms, contract versioning — not toy MFE.
2. Can be cloned and run end-to-end by anyone reviewing it.
3. Is broken into **small enough chunks** that I (or a beginner reviewer) can pick up one task at a time without getting lost in the big picture.

The spec (`sepc.md`) describes the destination clearly, but it's written in architecture-doc style — dense, holistic, hard to "start tomorrow morning." I need it sliced into chunks.

---

## Solution

A **monorepo of 4 Next.js apps + 2 shared packages** that together render a working e-commerce flow (browse → search → add to cart → place order → logout), where:

- Each app deploys independently to its own Vercel project.
- The host discovers remote URLs at runtime via a manifest API — so changing a remote URL needs no host rebuild.
- Failures of any remote degrade gracefully — the navbar, footer, login, and navigation **never** break.
- Shared state (auth, cart) lives in Redux; ephemeral cross-MFE events ride a typed `window.dispatchEvent` bus.
- A single Playwright E2E proves the entire system works by booting all 4 apps and walking the full flow.

The build is sliced into **~75 small chunks** organized into 12 phases. Each chunk has a one-line goal and a one-line definition-of-done.

---

## User Stories

### Shopper (end-user of the deployed app)

1. As a shopper, I want to see a list of products on the home page, so that I can browse what's available.
2. As a shopper, I want to see each product's image, title, price, category, and rating, so that I can decide what to buy.
3. As a shopper, I want to click a product and see a detail page, so that I can read the full description.
4. As a shopper, I want to search products by name, so that I can find what I'm looking for quickly.
5. As a shopper, I want the search to feel responsive (no flash of stale results on every keystroke), so that typing isn't jarring.
6. As a shopper, I want to filter products by category, so that I can narrow down what I see.
7. As a shopper, I want to sort products by price (asc/desc) and rating, so that I can compare them my way.
8. As a shopper, I want the search/sort/filter to be reflected in the URL, so that I can share or bookmark a filtered view.
9. As a shopper, I want to choose between infinite scroll and a "load more" button, so that I can browse the way I prefer.
10. As a shopper, I want a clear "no products found" message when filters return nothing, so that I'm not confused by a blank page.
11. As a shopper, I want to add a product to my cart from either the listing or detail page, so that I don't have to click around.
12. As a shopper, I want a brief confirmation (toast) when something is added to my cart, so that I know the action worked.
13. As a shopper, I want the cart icon's badge count to update immediately when I add or remove an item, so that I trust what the UI is showing.
14. As a shopper, I want to click the cart icon and see a mini-cart dropdown with my items, so that I can review without leaving the page.
15. As a shopper, I want to remove an item from the mini-cart, so that I can change my mind without going to a separate page.
16. As a shopper, I want a dedicated cart page that lists all items with quantities and totals, so that I can review the full order.
17. As a shopper, I want an empty-cart screen with a link back to products, so that I'm never stuck.
18. As a shopper, I want a "Place Order" button on the cart page, so that I can complete checkout.
19. As a shopper, I want a confirmation screen with a mock order ID after placing an order, so that I feel the action was registered.
20. As a shopper, I want my cart to persist if I close the tab and come back, so that I don't lose my selection.
21. As a shopper, I want to log in with credentials, so that I can access protected pages (cart, orders).
22. As a shopper, if I'm not logged in and try to open /cart or /orders, I want to be redirected to /login, so that the flow is consistent.
23. As a shopper, I want a logout button that ends my session and resets the cart, so that I can hand off the device safely.
24. As a shopper, I want the navbar and footer to keep working even if part of the page fails to load, so that I can always navigate away.
25. As a shopper, if a section fails to load, I want to see a clear "this section is temporarily unavailable — retry" card, so that I understand the problem and can try again.

### Developer (the person building this repo)

26. As a developer, I want to start all 4 apps with a single `npm run dev` command, so that I don't juggle terminals.
27. As a developer, I want to start a single app for focused work, so that I don't burn CPU on the full stack.
28. As a developer, I want every remote to be runnable standalone at its own port (3001, 3002, 3003), so that I can iterate on a remote without booting the host.
29. As a developer, I want every remote in standalone mode to render with the same navbar/layout as the host, so that the standalone story is visually consistent.
30. As a developer, I want a single `tsconfig.base.json` + shared ESLint + Prettier config, so that style is consistent across packages.
31. As a developer, I want each app to have its own `next.config.js` with Module Federation wired in, so that builds and exposes are explicit per-app.
32. As a developer, I want to change a remote's deployed URL without rebuilding the host, so that deploys are genuinely independent.
33. As a developer, I want a CI workflow per package, so that pushing to remote-cart doesn't trigger remote-products' build.
34. As a developer, I want a single reusable workflow file that all per-package workflows call into, so that I have one place to update CI steps.
35. As a developer, I want one Playwright E2E that boots all 4 apps and walks the full flow, so that I catch cross-MFE regressions before merge.
36. As a developer, I want a CI script that fails the build if more than one version of `shared-store` is referenced across packages, so that version drift never reaches production.
37. As a developer, I want clear documentation in the README for the architectural decisions, so that I can use the repo as an interview prep aid.

### Interviewer / reviewer

38. As an interviewer, I want to clone the repo and run it with one command, so that I can see it working in <5 minutes.
39. As an interviewer, I want to read a README that explains the trade-offs honestly (including what was deferred), so that I can gauge the developer's judgment.
40. As an interviewer, I want to see one cross-MFE end-to-end test that proves the system works as a whole, so that I trust the architecture.
41. As an interviewer, I want the failure-modes section to be more than "it has a try/catch" — I want to see the matrix (manifest / page-remote / widget-remote) and the recovery story for each, so that I can probe deeper in the interview.

---

## Implementation Decisions

> **How to read the chunks:** every chunk has a goal (one sentence) and a definition-of-done (DoD — one sentence). Chunks within a phase can run in order; phases mostly run in order but Phase 5+ can sometimes parallelize once Phases 1–4 are done.
>
> **Source of truth for technical detail:** see `sepc.md` sections noted in each phase header. This PRD does not duplicate code shapes — it tells you *what* each chunk produces.

### Phase 0 — Repo setup (refs: sepc.md §2, §4, §22)

- **0.1 Init monorepo root.** Goal: create `package.json` with `workspaces: ["packages/*"]` and dev dependency on `concurrently`. **DoD:** `npm install` at root succeeds.
- **0.2 Add shared TS base.** Goal: create `tsconfig.base.json` with strict mode + path aliases. **DoD:** running `tsc --noEmit -p tsconfig.base.json` exits 0.
- **0.3 Add ESLint config.** Goal: create root `.eslintrc.js` extending recommended configs for TS + React + Next. **DoD:** `npx eslint .` runs without crashing.
- **0.4 Add Prettier config.** Goal: create `.prettierrc` with team-agreed defaults. **DoD:** `npx prettier --check .` runs.
- **0.5 Add root scripts.** Goal: wire root `dev`, `dev:app`, `build:all`, `type-check` scripts as per sepc.md §4. **DoD:** running `npm run dev` (after later phases) starts all 4 apps.
- **0.6 Add .gitignore + README skeleton.** Goal: ignore `node_modules`, `.next`, `.env.local`, dist; README has the 19 sections from sepc.md §24 stubbed. **DoD:** README renders the section headers in GitHub preview.

### Phase 1 — `shared-ui` package (refs: sepc.md §10)

- **1.1 Init `shared-ui` package.** Goal: `packages/shared-ui/package.json` with `"name": "shared-ui"` + React peer dep. **DoD:** package shows up in `npm ls --workspaces`.
- **1.2 Build `Button`.** Goal: component with `{ label, onClick, variant?, disabled?, loading? }` props. **DoD:** renders in Storybook OR in a smoke import test.
- **1.3 Build `Card`.** Goal: component with `{ title, description?, image?, footer?, onClick? }`. **DoD:** renders the optional image only when provided.
- **1.4 Build `Badge`.** Goal: component with `{ count, variant? }`; hides itself when count is 0. **DoD:** renders nothing when count is 0.
- **1.5 Build `Spinner`.** Goal: component with `{ size? }` (`sm | md | lg`). **DoD:** renders three sizes visually distinct.
- **1.6 Build `Navbar`.** Goal: component with `{ cartDropdown? }` slot prop. Reads cart count from `shared-store`. Reads auth state for login/logout button. When `cartDropdown` is provided, cart icon click opens the slot content; when absent, icon links to `/cart`. **DoD:** renders identically in host and standalone modes (visual check at `:3000` and `:3001`).
- **1.7 Export barrel.** Goal: `index.ts` re-exports all components. **DoD:** `import { Button, Card, Badge, Spinner, Navbar } from 'shared-ui'` resolves.

### Phase 2 — `shared-store` package (refs: sepc.md §8, §9, §20, §21)

- **2.1 Init `shared-store` package.** Goal: `packages/shared-store/package.json` pinned to semver `1.0.0`, with peer deps on React + RTK + react-redux + redux-persist. **DoD:** package installs as a workspace dependency cleanly.
- **2.2 Build `authSlice`.** Goal: actions `login({ user, token })` and `logout()` over `AuthState` shape from sepc.md §8. **DoD:** dispatching `login` then `logout` returns state to initial.
- **2.3 Build `cartSlice`.** Goal: actions `addItem(product)`, `removeItem(id)`, `clearCart()` over `CartState` from sepc.md §8. `addItem` increments quantity if the product already exists. **DoD:** adding the same product twice yields one cart item with quantity 2.
- **2.4 Wire store + redux-persist.** Goal: combine reducers, configure `persistConfig` with `whitelist: ['auth', 'cart']`. **DoD:** after refresh, auth + cart are restored from localStorage.
- **2.5 Build typed hooks.** Goal: `useAppSelector` + `useAppDispatch` typed against the store. **DoD:** TS narrows `state.cart.totalCount` to `number` without explicit cast.
- **2.6 Build `AppEvents` type.** Goal: discriminated union with `'product:added-to-cart': { product: Product }` and `'auth:logout': void`. **DoD:** adding a new event key to the union surfaces a compile error in any unrelated `emit` call.
- **2.7 Build typed event bus.** Goal: `emit<K>(name, detail)` + `on<K>(name, handler) => unsubscribe` over `window.dispatchEvent` / `addEventListener`. SSR guard returns no-op unsubscribe when `window` is undefined. **DoD:** unsubscribe removes the listener — second emit does not invoke the handler.
- **2.8 Export barrel.** Goal: `index.ts` re-exports store, hooks, slices, events, eventBus. **DoD:** every other package imports only from `shared-store` (no deep paths).

### Phase 3 — Per-app scaffolding (refs: sepc.md §5, §6, §7, §11)

For each of `host`, `remote-products`, `remote-cart`, `remote-orders`:

- **3.1 Init Next.js 14 app.** Goal: Pages Router, TypeScript, Tailwind, on the assigned port. **DoD:** `npm run dev -w packages/<app>` opens a blank page at the right port.
- **3.2 Install MF plugin + runtime.** Goal: `@module-federation/nextjs-mf` + `@module-federation/runtime` installed. **DoD:** plugin imports cleanly from `next.config.js`.
- **3.3 Configure shared deps.** Goal: in each app's `next.config.js`, set up `shared: {...}` per sepc.md §6 with `singleton: true` for React, RTK, react-redux, etc., and `strictVersion: true, requiredVersion: '^1.0.0'` for `shared-store`. **DoD:** `next build` succeeds with no duplicate-instance warnings.
- **3.4 Add `_app.tsx` with Redux Provider + PersistGate.** Goal: every app wraps in `<ReduxProvider>` + `<PersistGate>` + `<Layout>` (Navbar from `shared-ui`). **DoD:** standalone-mode browse at each remote's port renders the navbar.
- **3.5 Add `.env.example` (committed) + `.env.local` (gitignored).** Goal: env vars per sepc.md §7. Host has `REMOTE_*_URL` (server-side, no `NEXT_PUBLIC_` prefix); remotes have `NEXT_PUBLIC_API_BASE`. **DoD:** `.env.example` is committed, `.env.local` is not.
- **3.6 Add per-remote `QueryClient` module-singleton.** Goal: `packages/remote-*/lib/queryClient.ts` exports one `QueryClient` instance with `staleTime: 60s, retry: 1`. **DoD:** importing twice from different files returns the same instance (`===`).

### Phase 4 — Module Federation wiring (refs: sepc.md §6, §14)

- **4.1 remote-products: configure `exposes`.** Goal: expose `./ProductsPage` and `./ProductDetailPage`. **DoD:** built `remoteEntry.js` contains both modules.
- **4.2 remote-cart: configure `exposes`.** Goal: expose `./CartPage` and `./CartSummary`. **DoD:** built `remoteEntry.js` contains both.
- **4.3 remote-orders: configure `exposes`.** Goal: expose `./OrdersPage`. **DoD:** built `remoteEntry.js` contains it.
- **4.4 host: leave `remotes: {}` empty.** Goal: host's `next.config.js` uses MF plugin only for the build-time chunk graph + shared deps; no static remote URLs. **DoD:** `grep` for any remote URL string in `next.config.js` returns zero matches.
- **4.5 host: `/api/remotes` route.** Goal: returns JSON `{ remoteProducts, remoteCart, remoteOrders }` from `process.env.REMOTE_*_URL` with `Cache-Control: public, max-age=60, stale-while-revalidate=300`. **DoD:** hitting the route returns the URLs from `.env.local`.
- **4.6 host: `bootstrapRemotes()` in `lib/manifest.ts`.** Goal: fetch `/api/remotes`, on success cache to `localStorage` key `mfe:remotes:lkg`, on failure read from cache + show warning banner. Then call `init()` from `@module-federation/runtime` with `remotes` derived from manifest. **DoD:** when `/api/remotes` returns 500, app still boots using cached manifest and shows the banner.
- **4.7 host: call `bootstrapRemotes()` in `_app.tsx`.** Goal: gate render on a `ready` state set after bootstrap. Show full-page spinner until ready. **DoD:** first paint shows spinner, then app.

### Phase 5 — Cross-cutting components (refs: sepc.md §14, §15)

- **5.1 `ErrorBoundary` with retry.** Goal: class component catches render errors, exposes `retry()` to its fallback. Retry clears the dynamic-import cache (via a key bump or re-import) and re-mounts the child. **DoD:** throwing in a child → fallback renders → clicking retry re-attempts and succeeds when the child stops throwing.
- **5.2 `RemoteError` card.** Goal: fallback UI ("This section is temporarily unavailable") + manual retry button. **DoD:** receives `name` + `onRetry` props; renders cleanly inside the ErrorBoundary fallback render-prop.
- **5.3 `WarningBanner`.** Goal: non-blocking top banner used when cached manifest is in use. Dismissible. **DoD:** appears above navbar, doesn't push layout, can be dismissed.
- **5.4 `FullPageSpinner`.** Goal: centered spinner used during `bootstrapRemotes()`. **DoD:** uses `Spinner` from `shared-ui` size `lg`.

### Phase 6 — `remote-products` features (refs: sepc.md §11, §12)

- **6.1 `ProductCard`.** Goal: renders product image (via `next/image`), title, price, rating; `React.memo`-wrapped. **DoD:** in a list of 20, scrolling does not re-render unchanged cards (verified via React Profiler).
- **6.2 `useCategories` hook.** Goal: TanStack Query hook against `/products/categories`. **DoD:** returns a stable list cached for 60s.
- **6.3 `CategoryTabs`.** Goal: tab strip driven by `useCategories`; writes `?category=<name>` to URL via `router.push`. **DoD:** clicking a tab updates the URL and the listing.
- **6.4 `useDebounce` hook.** Goal: generic `useDebounce(value, delayMs)`. **DoD:** under rapid input changes, returned value updates only after `delayMs` of idle time.
- **6.5 `SearchBar`.** Goal: controlled input feeding `useDebounce(value, 300)`. **DoD:** typing fast does not refilter on every keystroke.
- **6.6 `SortFilter` dropdown.** Goal: select with options `price-asc | price-desc | rating-desc`; writes `?sort=<value>` to URL. **DoD:** browser back/forward restores the prior sort.
- **6.7 `usePagination` hook.** Goal: toggle state between `'infinite' | 'load-more'`; persisted in local component state. **DoD:** toggling does not refetch — same data, different trigger.
- **6.8 `PaginationToggle`.** Goal: UI to flip pagination mode. **DoD:** flipping during scroll continues from current position.
- **6.9 `useProducts` composite hook.** Goal: `useInfiniteQuery` keyed on `[search, sort, category]`; client-side filter for search (fakestoreapi has no search endpoint). **DoD:** changing any input refetches; URL params drive the query key.
- **6.10 `ProductsPage` (exposed).** Goal: wraps `ProductsList` in `<QueryClientProvider client={queryClient}>`. **DoD:** loads at host's `/` AND standalone at `:3001/`.
- **6.11 `useProduct(id)` hook.** Goal: TanStack Query hook for a single product. **DoD:** returns isolated cache from the listing.
- **6.12 `ProductDetailPage` (exposed).** Goal: route `pages/product/[id].tsx`; renders product + "Add to cart" button. **DoD:** clicking add dispatches `cartSlice.addItem` AND emits `product:added-to-cart` event. (Single fact, single emission — see sepc.md §20 rule.)
- **6.13 Empty state.** Goal: "No products found" when listing is empty after filters. **DoD:** appears only after fetch completes with empty result, not during loading.

### Phase 7 — `remote-cart` features (refs: sepc.md §10, §17)

- **7.1 `CartItem`.** Goal: row with image, title, price, quantity, remove button. **DoD:** clicking remove dispatches `cartSlice.removeItem(id)`.
- **7.2 `EmptyCart`.** Goal: friendly message + button linking to `/`. **DoD:** appears when `cart.items.length === 0`.
- **7.3 `CartSummary` (exposed as federated mini-cart).** Goal: dropdown listing line items with totals + per-line remove; subscribes to `auth:logout` event to clear local optimistic state. **DoD:** logout fires event → mini-cart clears optimistic UI.
- **7.4 `useCartActions` hook.** Goal: returns `{ add, remove, clear }` wrapping the dispatches. **DoD:** consumer code never imports `dispatch` directly.
- **7.5 `CartPage` (exposed).** Goal: lists `CartItem`s + totals + "Place Order" button (disabled when empty). **DoD:** clicking Place Order dispatches `clearCart`, generates `ORD-${Date.now()}`, redirects to `/orders?id=<id>`.

### Phase 8 — `remote-orders` features (refs: sepc.md §17)

- **8.1 `OrderSummary`.** Goal: read-only block listing items + totals at order time (snapshot, not live). **DoD:** unaffected by post-order cart changes.
- **8.2 `OrderSuccess`.** Goal: success screen showing mock order ID from query string + "Continue Shopping" button. **DoD:** continuing returns to `/`.
- **8.3 `useOrder` hook.** Goal: reads `id` from URL and returns it (plus any future hooks like fetch). **DoD:** missing ID redirects to `/`.
- **8.4 `OrdersPage` (exposed).** Goal: composes `OrderSuccess`. **DoD:** loads at host `/orders` AND standalone `:3003/`.

### Phase 9 — Host pages + auth (refs: sepc.md §13, §14)

- **9.1 host `index.tsx`.** Goal: dynamically import `remoteProducts/ProductsPage` with `ssr: false`, wrap in `ErrorBoundary` + `Suspense`. **DoD:** killing `remote-products` shows the RemoteError card; navbar still works.
- **9.2 host `product/[id].tsx`.** Goal: dynamic import `remoteProducts/ProductDetailPage`. **DoD:** same fault-isolation as 9.1.
- **9.3 host `cart.tsx`.** Goal: dynamic import `remoteCart/CartPage`. **DoD:** same fault-isolation.
- **9.4 host `orders.tsx`.** Goal: dynamic import `remoteOrders/OrdersPage`. **DoD:** same fault-isolation.
- **9.5 host `login.tsx`.** Goal: form against hardcoded `test@test.com` / `password123`. On success: generate `mock-jwt-${Date.now()}`, set cookie via `js-cookie`, dispatch `authSlice.login`, redirect to `/`. **DoD:** wrong creds show error; correct creds redirect.
- **9.6 host `middleware.ts`.** Goal: protect `/cart` and `/orders` — redirect to `/login` if no `auth-token` cookie. **DoD:** logged-out visit to `/cart` lands on `/login`.
- **9.7 host `Layout` with `cartDropdown` slot.** Goal: passes `<FederatedCartSummary />` to `Navbar`'s `cartDropdown` prop. Wraps `CartSummary` in its own `ErrorBoundary` whose fallback is `null` (widget-tier fault isolation). **DoD:** killing `remote-cart` → mini-cart silently absent; cart icon still navigates to `/cart`.
- **9.8 host toast listener.** Goal: in `Layout`, subscribe to `product:added-to-cart`; show transient toast with product title. **DoD:** adding from `ProductDetailPage` → toast appears in host.
- **9.9 host logout emits event.** Goal: navbar logout button dispatches `authSlice.logout` AND emits `auth:logout`. **DoD:** mini-cart clears optimistic UI on logout.

### Phase 10 — Testing (refs: sepc.md §15, §19)

- **10.1 Install Vitest + RTL.** Goal: configure Vitest at root with jsdom; add per-package test scripts. **DoD:** `npm run test --workspaces` runs the empty set without errors.
- **10.2 Test `eventBus`.** Goal: emit/on roundtrip; unsubscribe stops delivery; SSR no-op when `window` undefined. **DoD:** 3 passing tests.
- **10.3 Test `authSlice` + `cartSlice`.** Goal: reducer tests for every action (login, logout, addItem dedupe, removeItem, clearCart). **DoD:** 5+ passing tests.
- **10.4 Test `bootstrapRemotes`.** Goal: mock fetch + localStorage. Cases: (a) network success caches manifest, (b) network failure reads from cache + sets banner, (c) cache empty + network failure → still calls `init` with empty remotes (graceful). **DoD:** 3 passing tests.
- **10.5 Test `ErrorBoundary` + retry.** Goal: RTL test — child throws → fallback rendered; retry → re-mount succeeds when child stops throwing. **DoD:** 2 passing tests.
- **10.6 Install Playwright + configure `webServer`.** Goal: Playwright config boots all 4 apps via `npm run build` then `npm start`. **DoD:** `npx playwright test --list` shows the suite without runtime errors.
- **10.7 Cross-MFE E2E (the killer test).** Goal: scripted flow — login → browse products → add product → assert toast appears → assert Navbar count = 1 → open mini-cart → place order → assert success page → logout → assert mini-cart optimistic UI cleared. **DoD:** test passes locally with all 4 apps running.

### Phase 11 — CI (refs: sepc.md §19)

- **11.1 Reusable `_node-build.yml`.** Goal: workflow_call input `package`; runs `npm ci`, `type-check`, `test`, `build`, then `scripts/check-shared-store-version.js`. **DoD:** workflow validates with `actionlint`.
- **11.2 Per-package workflows.** Goal: `host.yml`, `remote-products.yml`, `remote-cart.yml`, `remote-orders.yml`, `shared.yml` — each with `paths:` filter scoped to its package + relevant shared packages + its own workflow file. **DoD:** changing one remote triggers only that workflow + (if shared changed) `shared.yml`.
- **11.3 `scripts/check-shared-store-version.js`.** Goal: walk each package's `package.json` for the `shared-store` version reference; fail if more than one distinct version exists. **DoD:** introducing a `^2.0.0` in one package while others are `^1.0.0` makes the script exit 1.
- **11.4 `e2e.yml` workflow.** Goal: on PRs to `main`, run the Playwright suite (which builds + starts all apps). **DoD:** triggers on PR open and on push to PR branches.

### Phase 12 — Documentation + deploy (refs: sepc.md §18, §22, §23, §24)

- **12.1 README §1–6.** Goal: overview, ASCII architecture diagram, tech stack with reasons, monorepo tree, getting-started, port map. **DoD:** a stranger can clone and run with the README alone.
- **12.2 README §7–10.** Goal: MF runtime manifest pattern, shared-store ownership + versioning, cross-MFE comms split + the 2 demo events, mock-auth disclaimer + NextAuth seam. **DoD:** reviewer can answer "how do remotes register?" from the README.
- **12.3 README §11–14.** Goal: API integration, search/filter/pagination patterns, testing strategy, **failure-modes matrix** + "navbar never breaks" guarantee. **DoD:** the 3 failure tiers are documented with recovery story for each.
- **12.4 README §15–19.** Goal: Vercel deployment (first-time + ongoing remote URL changes), CI topology, accessibility scope (best-effort + WCAG AA roadmap note), trade-offs, "what I'd do in production". **DoD:** trade-offs section calls out at least 5 honest costs (cross-origin requests, MF coupling, etc.).
- **12.5 Vercel projects (4).** Goal: one Vercel project per package, root dirs set. **DoD:** four deploy URLs reachable.
- **12.6 Vercel env vars.** Goal: set `REMOTE_*_URL` (server-side) in host's Vercel dashboard; verify `/api/remotes` returns prod URLs. **DoD:** host loads remotes from Vercel URLs without rebuild.
- **12.7 Vercel ignored-build-step per remote.** Goal: each remote's project sets the ignored build step to `git diff HEAD^ HEAD --quiet packages/<pkg>/`. **DoD:** changing only `remote-cart` doesn't redeploy `remote-products`.

---

## Testing Decisions

### What makes a good test

- **Test external behavior, not implementation details.** A reducer test asserts `state` shape after action; it does not assert that an internal helper was called. A hook test asserts the returned value over time; it does not assert internal `useEffect` order.
- **One assertion of intent per test.** Tests should read like specs.
- **Use real timers + real fetch only when essential.** Mock at the boundary (fetch, localStorage, IntersectionObserver). Do not mock things you own (slices, eventBus internals).
- **Tests should survive refactors.** If a test breaks when you rename an internal function but the behavior is unchanged, the test was testing the wrong thing.

### Modules with tests in scope (Phase 10)

| Module | Test type | Why |
|---|---|---|
| `eventBus` (`shared-store`) | Vitest unit | Load-bearing for cross-MFE comms; SSR guard is easy to break |
| `authSlice` + `cartSlice` (`shared-store`) | Vitest unit | Public contract every remote depends on; additive-only evolution rule means regressions must be caught early |
| `bootstrapRemotes` (`host/lib/manifest.ts`) | Vitest unit | Three branches (network OK, network fail w/ cache, network fail w/o cache); each branch protects a documented failure tier |
| `ErrorBoundary` with retry | RTL component | Retry semantics (clearing the import cache + re-mount) are non-obvious and easy to regress |
| Cross-MFE flow | Playwright E2E | The single "the system works as a whole" check; covers federation + events + redux + persistence + middleware in one |

### Modules explicitly *not* tested in this POC

- `shared-ui` components — visual, low-logic, covered transitively by the E2E.
- `useProducts` composite hook — covered by E2E; isolated test left as a stretch goal.
- `Navbar` slot adapter — covered by E2E in both modes (host + standalone).
- `check-shared-store-version.js` — covered manually (run script with seeded mismatches before relying on it in CI); not in the Vitest suite.

### Prior art

This is a greenfield repo, so there is no prior in-codebase art. External references for test shape:

- TanStack Query examples for hook-level tests.
- Redux Toolkit docs for slice tests (action → state transition).
- Playwright `webServer` config docs for the multi-app boot pattern.

---

## Out of Scope

The following are explicitly *not* in this POC. They appear in the README's "What I'd do differently in production" section (sepc.md §23) as roadmap items.

- **Real authentication.** Mock cookie token only. No NextAuth.js, Auth0, Cognito, or OAuth provider.
- **Real backend / BFF.** Calls `fakestoreapi.com` directly. No proxy, no transformation layer.
- **WCAG 2.1 AA.** Best-effort accessibility only (semantic HTML, alt text). No `@axe-core/playwright` in CI.
- **Per-remote Sentry / source-map upload.** Console-only error logging in POC.
- **Visual regression testing.** No Chromatic / Percy.
- **Build-cache scaling.** npm workspaces only — no Nx, Turborepo, or remote cache.
- **Design tokens.** Raw Tailwind utility classes; no token system.
- **CSP headers.** Out of scope; would matter for remote-script loading in production.
- **Externalised manifest service.** Host-served manifest only. Vercel Edge Config / S3 / dedicated service is a roadmap item.
- **Bundle/performance budgets** enforced in CI.
- **Staged rollouts / percentage traffic** to a new remote URL.
- **Cross-remote query cache sharing.** Intentional — caches are isolated by ownership boundary.
- **App Router (Next.js 14 App Router).** Stuck with Pages Router for stable `@module-federation/nextjs-mf` support.

---

## Further Notes

- **Primary technical reference:** `sepc.md` at repo root (typo in filename is intentional — do not rename).
- **Locked decisions:** see the 16 decisions recorded in the 2026-05-12 grill-me session. Those supersede `sepc.md` where they conflict (most notably: Next.js 14 not 13, per-remote `_app.tsx` for standalone parity, runtime manifest not build-time env vars, 3-tier fault isolation not single ErrorBoundary).
- **Interview talking points:** every chunk maps back to a defensible architectural decision. The README §18 "Trade-offs" section is the place to surface those honestly.
- **Pacing guidance:** the 75 chunks are roughly ordered so a beginner can complete one chunk per ~1–2 hours. The full POC is a 60–80 hour build for someone new to MFE; faster for experienced devs.
- **Next step after this PRD:** run `/prd-to-issues` to convert these chunks into a folder of independently-grabbable issue files for tracking.
