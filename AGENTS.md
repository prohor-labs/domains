<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Domains Prohor Guidelines (`domains.prohor.dev`)

## 1. Project Domain & Context
- Core focus: Instant domain search, availability checking, live registration & renewal pricing, and TLD comparison.
- **Current Provider**: **Vercel Registrar API** (`POST https://api.vercel.com/v1/registrar/domains/search`) using `VERCEL_BEARER_TOKEN` in `.env.local`.
- **Future Provider**: **Porkbun API v3** (`POST https://api.porkbun.com/api/json/v3/` for direct registration, DNS management, and 900+ TLD pricing sync).

## 2. Runtime & Package Manager
- Use **Bun** exclusively (`bun`, `bun add`, `bun run`, `bunx`). Never npm/yarn/pnpm.

## 3. Zero Comments
- Strictly NO comments (`//`, `/* */`, `<!-- -->`, `#`, JSDoc). Self-explanatory code only.

## 4. Tooling & Verification
- Biome, Knip & React Doctor (`doctor.config.json`) ignore `src/components/ui/**`.
- Verify with `bun x tsc --noEmit` before concluding.

## 5. Database (PostgreSQL + Drizzle ORM)
- Schema in `src/db/schema.ts`; client in `src/db/index.ts`.
- Every table exports `drizzle-zod` schemas (`createInsertSchema`, `createSelectSchema`, `createUpdateSchema`) and inferred types (`$inferSelect`, `$inferInsert`).
- Relational queries in `src/db/queries/` with barrel in `index.ts`.
- Scripts: `bun run db:push` | `db:generate` | `db:migrate` | `db:studio`.

## 6. TanStack Query & State Management
- SSR client in `src/lib/query/client.ts`; provider in `src/lib/query/provider.tsx`.
- Centralized key factory in `src/lib/query/keys.ts`.
- Hooks in `src/hooks/queries/` with barrel in `index.ts`.
- Cache domain searches and TLD pricing with appropriate `staleTime` (e.g. 5–15 mins).
- Use URL query parameters (`useSearchParams` / `nuqs`) and LocalStorage for watchlists & recent searches.

## 7. Components (`src/components/`)
- Filenames in kebab-case; exports in PascalCase.
- Structure:
  - `ui/`: shadcn & primitives
  - `layout/`: header, footer, shell, navigation (`app-shell.tsx`, `header.tsx`)
  - `shared/`: strictly cross-feature UI (`theme-toggle.tsx`, `brand-logo.tsx`)
  - `search/`: domain search bar, result cards, status indicators (`domain-search-input.tsx`, `search-result-card.tsx`)
  - `pricing/`: TLD price comparison tables, renewal cards, promo tags (`tld-pricing-table.tsx`, `price-badge.tsx`)
  - `watchlist/`: saved domains, favorite lists, comparison drawers

## 8. Active Skills (`.agents/skills/`)
Strictly consult and follow the corresponding skill instructions when working in these areas:
- `next-best-practices`: App router, RSC boundaries, server actions, route handlers.
- `tanstack-query-best-practices`: SSR hydration, query keys, mutations, cache invalidation.
- `shadcn`: Adding and composing UI primitives with Base UI & Tailwind CSS.
- `vercel-react-best-practices`: React 19 performance, bundle size, re-render avoidance.
- `postgresql-table-design`: Table schemas, constraints, indexing, relational design.
- `responsive-design`: Fluid layouts, breakpoints, mobile-first interfaces.
- `typescript-advanced-types`: Type-safe queries, inferred models, generic response types.
