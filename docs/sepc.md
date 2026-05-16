# Technical Specification
## Micro Frontend E-Commerce POC

> Complete technical decisions, folder structure, contracts, and integration spec for all apps. Built for a Tech Lead / Solution Architect GitHub portfolio.

---

## Goal
Goal is to prepare for interview for front end lead or solution architect role in faang and top product base companies. this project is for practicing machine coding skills , and learn by creating project micro front end  in next js along with some machine coding round practice. this code will be public or interviewer and recruiter so it should follow the standard coding practices a solid show repo

## 1. Tech Stack

| Concern | Tech | Reason |
|---------|------|--------|
| Framework | Next.js 14 (Pages Router) | Current LTS; Pages Router has stable `@module-federation/nextjs-mf` support |
| Language | TypeScript | Senior role signal |
| Styling | Tailwind CSS | Fast, modern, production standard |
| Module Federation | `@module-federation/nextjs-mf` + `@module-federation/runtime` | Build-time plugin + runtime dynamic remote registration (manifest-driven) |
| State Management | Redux Toolkit + redux-persist | Persistent shared state (auth, cart) across remotes |
| Cross-MFE Comms | Native `window.dispatchEvent` (typed `CustomEvent` wrapper) | Ephemeral cross-remote signals (toasts, logout coordination); singleton-safe by design |
| Data Fetching | TanStack Query v5 | One QueryClient per remote (module-singleton); caches isolated by ownership |
| Package Manager | npm workspaces | Simple monorepo, no extra tooling |
| Dev Experience | concurrently | One command starts all apps |
| Testing | Vitest + React Testing Library + Playwright | Unit + component + one cross-MFE E2E that boots all 4 apps |
| Deployment | Vercel (separate project per app) | Native Next.js support |
| CI | GitHub Actions (per-package workflows) | Path-filtered builds; one reusable workflow; mirrors deploy partition |

---

## 2. Monorepo Structure

```
mfe-ecommerce/
├── packages/
│   ├── host/
│   ├── remote-products/
│   ├── remote-cart/
│   ├── remote-orders/
│   ├── shared-ui/
│   └── shared-store/
├── package.json            ← root (npm workspaces + concurrently)
├── .eslintrc.js            ← shared eslint config
├── .prettierrc             ← shared prettier config
├── tsconfig.base.json      ← shared TypeScript base config
└── README.md
```

---

## 3. Port Allocation

| Package | Port | Role |
|---------|------|------|
| host | 3000 | Shell, routing, auth, Redux Provider |
| remote-products | 3001 | Product listing + detail |
| remote-cart | 3002 | Cart page + cart summary widget |
| remote-orders | 3003 | Order placement + success |

---

## 4. Root package.json

```json
{
  "name": "mfe-ecommerce",
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "dev": "concurrently \"npm run dev -w packages/host\" \"npm run dev -w packages/remote-products\" \"npm run dev -w packages/remote-cart\" \"npm run dev -w packages/remote-orders\"",
    "dev:app": "npm run dev -w packages/$APP",
    "build:all": "npm run build -w packages/remote-products && npm run build -w packages/remote-cart && npm run build -w packages/remote-orders && npm run build -w packages/host",
    "type-check": "npm run type-check --workspaces"
  },
  "devDependencies": {
    "concurrently": "latest"
  }
}
```

**Usage:**
```bash
npm run dev                          # start all apps
APP=remote-products npm run dev:app  # start one app
```

---

## 5. Folder Structure Per App

### host/
```
host/
├── pages/
│   ├── _app.tsx          ← Redux Provider, manifest bootstrap, global layout
│   ├── index.tsx         ← loads remote-products listing (runtime-loaded)
│   ├── product/
│   │   └── [id].tsx      ← loads remote-products detail
│   ├── cart.tsx          ← loads remote-cart
│   ├── orders.tsx        ← loads remote-orders
│   ├── login.tsx         ← mock auth page
│   └── api/
│       └── remotes.ts    ← serves manifest from server-side env vars
├── components/
│   └── Layout.tsx        ← Navbar (with cartDropdown slot) + footer wrapper
├── hooks/
│   └── useAuth.ts
├── lib/
│   └── manifest.ts       ← fetch manifest, last-known-good cache (localStorage), init runtime
├── middleware.ts          ← Next.js auth protection
├── next.config.js        ← Module Federation plugin (remotes registered at runtime)
├── tailwind.config.js
├── tsconfig.json
├── .env.local            ← localhost server-side URLs (gitignored)
├── .env.production       ← Vercel server-side URLs
└── .env.example          ← template (committed)
```

### remote-products/
```
remote-products/
├── pages/
│   ├── _app.tsx          ← standalone-mode wrapper (Redux Provider + Layout/Navbar)
│   ├── index.tsx         ← product listing (exposed via MF; wraps in QueryClientProvider)
│   └── product/
│       └── [id].tsx      ← product detail (exposed via MF; wraps in QueryClientProvider)
├── components/
│   ├── ProductCard.tsx
│   ├── CategoryTabs.tsx
│   ├── SearchBar.tsx
│   ├── SortFilter.tsx
│   └── PaginationToggle.tsx
├── hooks/
│   ├── useProducts.ts
│   ├── useProduct.ts
│   ├── useCategories.ts
│   ├── useDebounce.ts
│   └── usePagination.ts
├── lib/
│   └── queryClient.ts    ← module-singleton QueryClient (one instance per remote bundle)
├── utils/
│   └── queryKeys.ts
├── constants/
│   └── index.ts
├── types/
│   └── product.ts
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── .env.local
├── .env.production
└── .env.example
```

### remote-cart/
```
remote-cart/
├── pages/
│   ├── _app.tsx          ← standalone-mode wrapper (Redux Provider + Layout/Navbar)
│   └── index.tsx         ← cart page (exposed via MF)
├── components/
│   ├── CartItem.tsx
│   ├── CartSummary.tsx   ← exposed as federated mini-cart dropdown (line items + remove)
│   └── EmptyCart.tsx
├── hooks/
│   └── useCartActions.ts
├── lib/
│   └── queryClient.ts    ← module-singleton QueryClient
├── types/
│   └── cart.ts
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── .env.local
├── .env.production
└── .env.example
```

### remote-orders/
```
remote-orders/
├── pages/
│   ├── _app.tsx          ← standalone-mode wrapper (Redux Provider + Layout/Navbar)
│   └── index.tsx         ← order page (exposed via MF)
├── components/
│   ├── OrderSummary.tsx
│   └── OrderSuccess.tsx
├── hooks/
│   └── useOrder.ts
├── lib/
│   └── queryClient.ts    ← module-singleton QueryClient
├── types/
│   └── order.ts
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── .env.local
├── .env.production
└── .env.example
```

### shared-store/
```
shared-store/
├── src/
│   ├── store.ts
│   ├── slices/
│   │   ├── authSlice.ts
│   │   └── cartSlice.ts
│   ├── hooks.ts          ← useAppSelector, useAppDispatch
│   ├── events.ts         ← AppEvents type registry (discriminated union)
│   ├── eventBus.ts       ← typed wrapper over window.dispatchEvent / addEventListener
│   └── index.ts
└── package.json          ← semver: "1.0.0" (additive-only minor/patch policy; see §20a)
```

### shared-ui/
```
shared-ui/
├── src/
│   ├── Button/
│   │   └── index.tsx
│   ├── Card/
│   │   └── index.tsx
│   ├── Badge/
│   │   └── index.tsx
│   ├── Spinner/
│   │   └── index.tsx
│   ├── Navbar/
│   │   └── index.tsx
│   └── index.ts
└── package.json
```

---

## 6. Module Federation Config Contract

### remote-products — Exposes
```js
exposes: {
  './ProductsPage': './pages/index',
  './ProductDetailPage': './pages/product/[id]'
}
```

### remote-cart — Exposes
```js
exposes: {
  './CartPage': './pages/index',
  './CartSummary': './components/CartSummary'
}
```

### remote-orders — Exposes
```js
exposes: {
  './OrdersPage': './pages/index'
}
```

### host — Consumes (runtime registration, NOT static)
Host does **not** declare remote URLs in `next.config.js`. URLs are resolved at runtime via the manifest:

```ts
// host/lib/manifest.ts
import { init } from '@module-federation/runtime'

export async function bootstrapRemotes() {
  // 1. try network; 2. fall back to last-known-good in localStorage
  let manifest: Record<string, string>
  try {
    manifest = await fetch('/api/remotes').then(r => r.json())
    localStorage.setItem('mfe:remotes:lkg', JSON.stringify(manifest))
  } catch {
    manifest = JSON.parse(localStorage.getItem('mfe:remotes:lkg') ?? '{}')
    showWarningBanner('Using cached remotes — some features may be stale.')
  }
  init({
    name: 'host',
    remotes: Object.entries(manifest).map(([name, entry]) => ({
      name,
      entry: `${entry}/remoteEntry.js`,
    })),
  })
}
```

Host's `next.config.js` still uses `@module-federation/nextjs-mf` for the build-time plugin (chunk graph, shared deps), but `remotes: {}` is empty — they're registered dynamically.

### Shared Dependencies (ALL apps)
```js
shared: {
  react: { singleton: true, requiredVersion: deps.react },
  'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
  'react-redux': { singleton: true },
  '@reduxjs/toolkit': { singleton: true },
  'redux-persist': { singleton: true },
  '@tanstack/react-query': { singleton: true },
  'shared-store': {
    singleton: true,
    strictVersion: true,
    requiredVersion: '^1.0.0',   // accept 1.x; hard-fail on 2.x (breaking) mismatch
  },
  'shared-ui': { singleton: true }
}
```

> `singleton: true` prevents duplicate library instances. `strictVersion: true` on `shared-store` ensures version drift fails loud at runtime instead of causing silent state-shape bugs. See §21 for the full evolution policy.

---

## 7. Environment Config Per App

> Remote URLs are **server-side only** (no `NEXT_PUBLIC_` prefix). They are read at request time by `host/pages/api/remotes.ts` and exposed via the manifest. Changing a URL → update Vercel env var → **no host rebuild required**. This is what makes deploys genuinely independent.

### host .env.local (gitignored)
```
REMOTE_PRODUCTS_URL=http://localhost:3001
REMOTE_CART_URL=http://localhost:3002
REMOTE_ORDERS_URL=http://localhost:3003
NEXT_PUBLIC_API_BASE=https://fakestoreapi.com
```

### host .env.production (Vercel dashboard)
```
REMOTE_PRODUCTS_URL=https://mfe-products.vercel.app
REMOTE_CART_URL=https://mfe-cart.vercel.app
REMOTE_ORDERS_URL=https://mfe-orders.vercel.app
NEXT_PUBLIC_API_BASE=https://fakestoreapi.com
```

### .env.example (committed)
```
REMOTE_PRODUCTS_URL=
REMOTE_CART_URL=
REMOTE_ORDERS_URL=
NEXT_PUBLIC_API_BASE=
```

### Remote apps .env.local
Remotes only need the public API base for standalone mode:
```
NEXT_PUBLIC_API_BASE=https://fakestoreapi.com
```

### host/pages/api/remotes.ts
```ts
import type { NextApiRequest, NextApiResponse } from 'next'
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300')
  res.status(200).json({
    remoteProducts: process.env.REMOTE_PRODUCTS_URL,
    remoteCart:     process.env.REMOTE_CART_URL,
    remoteOrders:   process.env.REMOTE_ORDERS_URL,
  })
}
```

---

## 8. TypeScript Types Contract

### Product
```ts
interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: { rate: number; count: number }
}
```

### Auth State
```ts
interface AuthState {
  isAuthenticated: boolean
  user: { id: number; name: string; email: string } | null
  token: string | null
}
```

### Cart State
```ts
interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  totalCount: number
  totalPrice: number
}
```

---

## 9. shared-store Spec

### authSlice Actions
| Action | Payload | Effect |
|--------|---------|--------|
| login | { user, token } | sets isAuthenticated true |
| logout | none | resets to initial state |

### cartSlice Actions
| Action | Payload | Effect |
|--------|---------|--------|
| addItem | Product object | adds or increments quantity |
| removeItem | product id | removes item completely |
| clearCart | none | empties cart |

### redux-persist Config
```ts
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart']
}
```

---

## 10. shared-ui Component Contracts

### Button
```ts
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  loading?: boolean
}
```

### Card
```ts
interface CardProps {
  title: string
  description?: string
  image?: string
  footer?: React.ReactNode
  onClick?: () => void
}
```

### Badge
```ts
interface BadgeProps {
  count: number
  variant?: 'primary' | 'danger'
}
```

### Spinner
```ts
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
}
```

### Navbar
```ts
interface NavbarProps {
  cartDropdown?: React.ReactNode   // slot — host injects <FederatedCartSummary />; standalone remotes pass nothing
}
```

- Reads cart count from `shared-store` via `useAppSelector(s => s.cart.totalCount)`.
- Reads auth state for login/logout button.
- Renders **identically** whether mounted by the host or by a remote running standalone — a hard requirement so the UX is consistent at `:3000`, `:3001`, `:3002`, `:3003`.
- When `cartDropdown` is provided (host only), clicking the cart icon opens the federated mini-cart. When absent (standalone remote), clicking navigates to `/cart`.

---

## 11. TanStack Query Setup

### QueryClient — module-singleton per remote bundle

Each remote ships **its own** `QueryClient` as a module-level singleton inside its bundle. The exposed components wrap themselves in `<QueryClientProvider>` so they're self-contained — works identically whether loaded via Module Federation by the host or rendered standalone in the remote's own `_app.tsx`.

```ts
// remote-products/lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query'
export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 1 } }
})

// remote-products/pages/index.tsx  (exposed)
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/queryClient'

export default function ProductsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsList />
    </QueryClientProvider>
  )
}
```

> Caches are **isolated by ownership boundary** — products fetched in remote-products are not visible to remote-cart's cache and vice versa. This is intentional; it mirrors the team-autonomy story.

### Query Keys (remote-products/utils/queryKeys.ts)
```ts
export const QUERY_KEYS = {
  products: ['products'] as const,
  product: (id: number) => ['product', id] as const,
  categories: ['categories'] as const,
  category: (name: string) => ['category', name] as const
}
```

### Custom Hooks
```
useProducts.ts     ← product listing with search + sort + category
useProduct.ts      ← single product detail
useCategories.ts   ← category list for tabs
useDebounce.ts     ← debounce search input (300ms)
usePagination.ts   ← toggle between infinite scroll + load more
useCartActions.ts  ← abstracts dispatch for cart operations
useAuth.ts         ← reads auth state from shared store
```

---

## 12. Search + Filter + Pagination Spec

### Search
- Controlled input inside remote-products
- `useDebounce(searchTerm, 300)` — 300ms delay
- Client-side filtering (fakestoreapi has no search endpoint)

### Sort & Filter via URL Query Params
```
/?category=electronics&sort=price-asc
```
- Read via `useRouter().query`
- Write via `router.push`
- Browser back/forward works correctly
- Links are shareable

### Sort Options
```ts
type SortOption = 'price-asc' | 'price-desc' | 'rating-desc'
```

### Pagination Toggle
- Toggle stored in local component state
- **Infinite scroll** — `useInfiniteQuery` + IntersectionObserver
- **Load more** — `useInfiniteQuery` + manual button trigger
- Both use same hook — only trigger differs

---

## 13. Auth Flow

### Mock Credentials
```
email: test@test.com
password: password123
```

### Login Flow
```
User submits login
→ validate against hardcoded credentials
→ generate mock token: `mock-jwt-${Date.now()}`
→ store in cookie via js-cookie
→ dispatch authSlice.login({ user, token })
→ redirect to /
```

### Next.js Middleware
```ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')
  const protectedRoutes = ['/cart', '/orders']
  if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
```

### Protected Routes
| Route | Protected |
|-------|-----------|
| `/` | No |
| `/product/[id]` | No |
| `/cart` | Yes |
| `/orders` | Yes |
| `/login` | No |

---

## 14. Remote Loading Pattern (Host)

Two-step: (1) bootstrap manifest + register remotes once at app start; (2) lazy-load federated pages on demand.

```tsx
// host/pages/_app.tsx
import { bootstrapRemotes } from '../lib/manifest'

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false)
  useEffect(() => { bootstrapRemotes().finally(() => setReady(true)) }, [])
  if (!ready) return <FullPageSpinner />
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <Layout><Component {...pageProps} /></Layout>
      </PersistGate>
    </ReduxProvider>
  )
}

// host/pages/index.tsx
const ProductsPage = dynamic(
  () => import('remoteProducts/ProductsPage').catch(handleRemoteLoadError),
  { ssr: false, loading: () => <Spinner /> }
)

<ErrorBoundary fallback={({ retry }) => <RemoteError name="Products" onRetry={retry} />}>
  <Suspense fallback={<Spinner />}>
    <ProductsPage />
  </Suspense>
</ErrorBoundary>
```

> `ssr: false` is required for Module Federation with Next.js Pages Router. The ErrorBoundary exposes a `retry` handler that re-imports the remote (clears the dynamic import cache); see §15 for the full failure matrix.

---

## 15. Error Handling Strategy

### 15a. Fault isolation matrix (graceful degradation, 3 tiers)

Hard guarantee: **Navbar + Footer + login + navigation never break**, regardless of which remote(s) are down. The user can always leave a broken page.

| Failure | Tier | User sees | Recovery |
|---------|------|-----------|----------|
| `/api/remotes` fails (network/500) | Manifest | Shell renders using **last-known-good manifest** from `localStorage`; non-blocking warning banner ("Using cached configuration") | Auto-retry on next page load; manual "Refresh" button |
| `remoteEntry.js` 404 / 500 / timeout | Page-remote | ErrorBoundary card: "This section is temporarily unavailable" + manual **Retry** button | Retry re-imports the remote (clears dynamic import cache) |
| Chunk fetch fails mid-render | Page-remote | Same as above | Retry |
| Remote runtime throws | Page-remote | Same as above | Retry; console-log the error |
| Mini-cart widget remote fails | Widget-remote | Widget returns `null` (silently hidden); cart icon still shows count from shared-store and links to `/cart` | None needed — degraded UX, not broken |
| shared-store version mismatch | Federation init | Hard fail loud (`strictVersion: true`) at load time — never silent | Coordinated re-deploy |

### 15b. Other handling

| Layer | Scenario | Handling |
|-------|----------|----------|
| TanStack Query | API call fails | `isError` + retry button (per remote's QueryClient) |
| TanStack Query | Loading | Spinner component |
| Empty state | Empty cart | Message + link to products |
| Empty state | No products | "No products found" message |
| Empty state | Order success | Success screen + mock order ID |
| Auth | Unauthorized access | Middleware redirect to `/login` |
| Cart | Empty cart on `/orders` page | Redirect to `/` |

---

## 16. Performance Patterns

- `next/image` — all product images, automatic optimization
- `React.memo` — Card component, prevents re-renders in listing
- Selective `useSelector` — select only needed state, not entire store
- TanStack Query caching — products cached, no redundant API calls
- `singleton: true` — prevents duplicate library instances

---

## 17. Order Flow

```
/cart
  → shows cart items from Redux cartSlice
  → "Place Order" button (disabled if cart empty)
  → on click: dispatch clearCart
  → generate mock order ID: ORD-${Date.now()}
  → redirect to /orders

/orders
  → shows success screen
  → displays mock order ID
  → "Continue Shopping" → redirect to /
```

---

## 18. Vercel Deployment

### One Vercel Project Per App
```
Project 1 → root directory: packages/host
Project 2 → root directory: packages/remote-products
Project 3 → root directory: packages/remote-cart
Project 4 → root directory: packages/remote-orders
```

### Deployment Order (first-time setup)
```
1. Deploy remote-products → copy Vercel URL
2. Deploy remote-cart     → copy Vercel URL
3. Deploy remote-orders   → copy Vercel URL
4. Set REMOTE_*_URL (server-side, no NEXT_PUBLIC_ prefix) in host's Vercel project
5. Deploy host once
```

### Ongoing Remote URL Changes (the win)
```
Update REMOTE_*_URL in host's Vercel env vars dashboard
→ host's /api/remotes serves the new URL on next request
→ no host rebuild, no host redeploy
```
This is the payoff of the runtime-manifest pattern: a remote can move CDNs, change domains, or roll out behind a feature URL without touching the host.

### Host Vercel Rewrites — NOT USED

Runtime manifest replaces same-origin rewrites. Manifest returns absolute remote URLs directly; the browser fetches `remoteEntry.js` from each remote's own origin. No rewrite rules needed in `next.config.js`.

> Trade-off: cross-origin requests for `remoteEntry.js`. Each remote must serve permissive CORS headers on the entry file. Vercel does this by default for static assets.

### Vercel Ignored Build Step Per Remote
```bash
git diff HEAD^ HEAD --quiet packages/remote-products/
```
Exit 1 → build runs. Exit 0 → Vercel skips build.
Ensures independent deployability — changing one remote does not trigger others.

---

## 19. GitHub Actions CI — per-package workflows

CI is **partitioned by ownership boundary**, same as deploy. Pushing to `remote-cart` only triggers `remote-cart`'s pipeline (plus any `shared-*` pipelines whose files changed).

### File layout
```
.github/workflows/
├── _node-build.yml       ← reusable workflow (the only place that defines steps)
├── host.yml
├── remote-products.yml
├── remote-cart.yml
├── remote-orders.yml
└── shared.yml            ← shared-store + shared-ui (their CI runs together because they're co-versioned)
```

### Reusable workflow
```yaml
# .github/workflows/_node-build.yml
on:
  workflow_call:
    inputs:
      package: { required: true, type: string }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run type-check -w packages/${{ inputs.package }}
      - run: npm run test       -w packages/${{ inputs.package }}
      - run: npm run build      -w packages/${{ inputs.package }}
      - name: Verify shared-store version pinning
        run: node scripts/check-shared-store-version.js
```

### Per-package workflow (example)
```yaml
# .github/workflows/remote-cart.yml
name: remote-cart
on:
  push:
    paths:
      - 'packages/remote-cart/**'
      - 'packages/shared-store/**'
      - 'packages/shared-ui/**'
      - '.github/workflows/remote-cart.yml'
      - '.github/workflows/_node-build.yml'
jobs:
  ci:
    uses: ./.github/workflows/_node-build.yml
    with:
      package: remote-cart
```

### Cross-MFE E2E (separate workflow)
```yaml
# .github/workflows/e2e.yml — runs only on PRs to main
name: cross-mfe-e2e
on: { pull_request: { branches: [main] } }
jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build:all
      - run: npx playwright install --with-deps
      - run: npx playwright test
        # Playwright config webServer boots all 4 apps via `npm start` for prod parity
```

---

## 20. Cross-MFE Communication (Event Bus)

Two patterns coexist with a strict ownership rule:

| Pattern | Owns | Examples |
|---------|------|----------|
| Redux (`shared-store`) | **Persistent shared state** — the noun; survives reload; single source of truth | `auth` (user, token), `cart` (items, totals) |
| Event Bus (`shared-store/eventBus`) | **Ephemeral cross-remote signals** — the verb; fire-and-forget; zero coupling between emitter and listener | `product:added-to-cart`, `auth:logout` |

> **Rule:** If two patterns could both solve a problem, prefer Redux when the consumer needs to read current value at any time; prefer events when the consumer reacts to a transition. Never dispatch a Redux action *and* emit an event for the same fact.

### Implementation
```ts
// shared-store/src/events.ts
export type AppEvents = {
  'product:added-to-cart': { product: Product }
  'auth:logout': void
}

// shared-store/src/eventBus.ts
export function emit<K extends keyof AppEvents>(
  name: K, detail: AppEvents[K]
) {
  if (typeof window === 'undefined') return  // SSR guard
  window.dispatchEvent(new CustomEvent(name, { detail }))
}

export function on<K extends keyof AppEvents>(
  name: K, handler: (detail: AppEvents[K]) => void
) {
  if (typeof window === 'undefined') return () => {}
  const listener = (e: Event) => handler((e as CustomEvent).detail)
  window.addEventListener(name, listener)
  return () => window.removeEventListener(name, listener)
}
```

### Why native CustomEvent (and not in-memory pub/sub)?
- `window` is **truly singleton** across remotes — cannot be broken by misconfigured MF `singleton` settings.
- DevTools-debuggable: `window.addEventListener('product:added-to-cart', console.log)` works from any console.
- Zero runtime dependency.

### Demo wiring (2 events, both directions)
- `product:added-to-cart`: **remote-products** emits on `addItem` → **host** listens → shows toast in Layout.
- `auth:logout`: **host** emits on logout button click → **remote-cart** listens → clears any open mini-cart dropdown / optimistic UI.

---

## 21. Versioning Policy (shared-store contract evolution)

`shared-store` is a versioned public API. Every remote builds against a specific version; runtime mismatch is detected by `strictVersion: true` in MF config.

### Three-rule policy

1. **Strict semver** in `shared-store/package.json` (`"1.0.0"`, bumped explicitly).
2. **Additive-only** for MINOR / PATCH bumps:
   - ✅ Adding a new optional field on an existing type
   - ✅ Adding a new action
   - ✅ Adding a new slice
   - ❌ Renaming or removing a field
   - ❌ Changing a field's type
   - ❌ Removing an action
3. **MAJOR** bump → breaking change → **coordinated re-deploy** of all remotes documented in a release checklist.

### Runtime enforcement
```js
// every app's next.config.js
shared: {
  'shared-store': {
    singleton: true,
    strictVersion: true,
    requiredVersion: '^1.0.0',
  },
}
```
A remote built against `1.1.0` running inside a host serving `1.2.0` → both 1.x → loads cleanly. A remote built against `1.x` with a host on `2.0.0` → fails loud at federation init; never silent.

### CI enforcement
`scripts/check-shared-store-version.js` reads `shared-store@<v>` from every package's `package.json` and fails CI if more than one version is referenced.

### Worked example (adding `CartItem.discount`)
- Before: `{ id, title, price, image, quantity }`
- After:  `{ id, title, price, image, quantity, discount?: number }`
- Bump: `1.0.0 → 1.1.0` (additive, optional field)
- Old remotes ignore the field; new remotes use it. No coordinated deploy required.

---

## 22. Key Technical Decisions & Trade-offs

| Decision | Reason | Trade-off |
|----------|--------|-----------|
| Module Federation over iframes | Shared state, better DX | Tighter coupling than iframes |
| Next.js 14 + Pages Router (not App Router) | Stable MFE plugin support | No React Server Components |
| Shared Redux store + event bus (split) | Best of both: persistent state + decoupled signals | Two patterns to teach; ownership rule must be documented |
| Each remote owns QueryClient (module singleton) | Cache isolation by ownership boundary | No cross-remote query cache sharing |
| Runtime manifest via `/api/remotes` | Genuine independent deployability (URL change → no host rebuild) | Slightly more complex bootstrap; need last-known-good fallback |
| 3-tier graceful degradation | Shell always navigable; partial failure is partial UX | More error-boundary code than spec's single fallback |
| shared-store strictVersion + additive-only | Loud fail on version drift; backward-compatible evolution by default | Major bumps require coordinated deploy |
| Cookie-based mock auth | Simple POC; same-domain sharing | Mock only; real auth needs a provider seam |
| URL query params for filters | Shareable links, browser history | Slightly more complex than local state |
| npm workspaces over Nx | Zero extra tooling for POC | No advanced build caching |
| Per-package CI workflows | CI partition matches deploy partition | More workflow files to maintain |

---

## 23. What I'd Do Differently in Production

- Use a real auth provider (Auth0, Cognito, NextAuth.js with a real OAuth provider) — replaces the mock cookie flow in §13
- Add per-remote Sentry projects + source-map upload in CI — errors auto-tag with the remote name, route to the owning team
- Add proper BFF (Backend for Frontend) API layer instead of calling fakestoreapi directly
- Target **WCAG 2.1 AA** explicitly: `@axe-core/playwright` in the cross-MFE E2E + documented keyboard-nav contract (the POC ships best-effort: semantic HTML + alt text only)
- Add visual regression testing (Chromatic / Percy)
- Use Nx or Turborepo for build caching at scale (POC uses npm workspaces only)
- Implement proper CSP headers for remote script loading (manifest origin must be allow-listed)
- Use a design token system instead of raw Tailwind classes
- Manifest service externalised (Vercel Edge Config / S3 / dedicated service) instead of host-served — supports staged rollouts, percentage-based traffic to a new remote URL, instant rollback
- Bundle/performance budgets per remote enforced in CI

---

## 24. README Sections

1. Overview — what this demonstrates
2. Architecture Diagram — ASCII diagram of all apps + manifest flow
3. Tech Stack — with reasons for each choice
4. Monorepo Structure — folder tree
5. Getting Started — install + run commands
6. Port Map — quick reference table
7. Module Federation — runtime manifest pattern, how remotes register at boot
8. Shared Store — what is shared, ownership rule, **versioning policy**
9. Cross-MFE Communication — Redux vs Event Bus split, the two demo events
10. Auth Flow — **mock auth disclaimer**, NextAuth.js plug-in seam
11. API Integration — fakestoreapi endpoints used
12. Search + Filter + Pagination — patterns used
13. Testing Strategy — Vitest + RTL + 1 cross-MFE Playwright E2E
14. Failure Modes & Graceful Degradation — 3-tier matrix, the "navbar never breaks" guarantee
15. Vercel Deployment — first-time setup + ongoing remote URL changes (the runtime-manifest win)
16. CI Topology — per-package workflows, paths filters
17. Accessibility — best-effort scope today, WCAG 2.1 AA target for production
18. Trade-offs — honest about MFE costs
19. What I'd do differently in production
