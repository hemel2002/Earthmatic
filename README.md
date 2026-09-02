# Earthmatic — website

Phase 1 build of the Earthmatic marketing site: Home, Services, Platform, Work, Insights, About, Contact, plus legal stubs. Content and design direction sourced from `content/brief/Earthmatic.docx`.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix) · React Three Fiber · `motion` · MDX content · zod + react-hook-form

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve a production build |
| `npm run lint` | ESLint |
| `npm test` | Vitest unit tests (run once) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:e2e` | Playwright end-to-end + accessibility suite (starts the dev server itself) |
| `npm run analyze` | Production build with the bundle analyzer enabled |

## Structure

- `src/app/` — routes (App Router), one folder per page, `opengraph-image.tsx` per route, `robots.ts`/`sitemap.ts`
- `src/components/ui/` — shadcn primitives (generated; treat as vendored, edit sparingly)
- `src/components/{layout,marketing,three,forms,seo}/` — site-specific components
- `src/content/` — MDX frontmatter schemas (zod) and loaders for Insights/Work
- `content/insights/`, `content/work/` — MDX content files
- `src/lib/` — constants, metadata/SEO helpers, form validation, forms storage
- `data/submissions/*.jsonl` — local append-only form submission storage (gitignored, dev/staging only — see caveat in `src/lib/forms-store.ts`)
- `tests/unit/` — Vitest, `tests/e2e/` — Playwright

## Notable decisions

- **Dark-only theme.** No light mode/toggle — see the comment block at the top of `src/app/globals.css`.
- **3D hero** (`src/components/three/`) is lazy-loaded client-only, gated on `prefers-reduced-motion` and WebGL2 support, and falls back to a static SVG with an identical aspect ratio. Its JS chunk (~230KB gzip, dominated by the React Three Fiber reconciler itself) is isolated to the `/` route only — verified via a network-request check, not just code-splitting intent.
- **Sample content** (3 Insights articles, 3 case studies, placeholder team bios) is visibly badged via `PlaceholderBadge` — see `[[project-skills-installed]]`-style notes inline in the content frontmatter (`sample: true`).
- **Forms** post to local Next.js Route Handlers (`src/app/api/forms/*`) validated with zod and stored as JSONL via `src/lib/forms-store.ts` — not wired to a real email/DB backend yet. On Vercel this writes to `/tmp` so the form doesn't 500, but `/tmp` isn't durable there; treat production submissions as logged (via `notifySubmission`), not safely stored, until a real backend is wired in.
- Individual `/services/[slug]` and `/industries/*` pages are Phase 2, per the brief's explicit scope line — the services nav links to `/services#<slug>` anchors on the hub page instead.
