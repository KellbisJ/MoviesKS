# MoviesKS

Bilingual movie and TV discovery SPA. Bun workspaces monorepo with two packages.

## Layout

- `frontend/` — React 19 + Vite + Tailwind v4 + TypeScript. All UI/UX work happens here, under `frontend/src`.
- `backend/` — Express 5 + TypeScript proxy in front of TheMovieDB (TMDB). It holds the API key, restricts which TMDB endpoints are reachable, and injects the language.

## Frontend design system

The design system lives in `frontend/`, not at the root. Read these before any UI change:

- `frontend/DESIGN.md` — palette (light + dark tokens), typography, radii, spacing. Follow it; do not invent new colors or fonts.
- `frontend/PRODUCT.md` — who the product is for and what it must do.

## Frontend structure (`frontend/src`)

- `routes/` — one folder per page (home, media-detail, saved-media, search-*, media-all-*, filtered-media).
- `components/` — `common`, `layout`, `modals`, `specific`, `utilities`.
- `context/` — theme, lang, favorite-media, search-media providers.
- `hooks/`, `services/`, `utils/`, `types/` — one folder per unit, kebab-case names.

Custom CSS goes in `frontend/src/index.css`; prefer Tailwind utilities in components.

## Backend structure (`backend/`)

Entry point is `backend/index.ts`. It builds the Express app, mounts middleware in this order, then mounts the router at `/api`:

1. `api/middleware/Cors.ts` — allowlist of the two Vercel origins. Any origin is accepted when `NODE_ENV=development` or when the request has no `Origin` header. Also allows the custom `X-LANG-CONTEXT` header.
2. `api/middleware/SecurityHeaders.ts` — Helmet with a hand-written CSP (TMDB images, YouTube frames, Google Fonts, the Vercel frontend/backend URLs) plus a few extra headers.
3. `api/middleware/LanguageHandler.ts` — reads `X-LANG-CONTEXT` from the request and stores it on `req.pageLanguageCustomHeader`. Defaults to `es-MX`.

`api/bootstrap.ts` refuses to start without `API_KEY` and only calls `app.listen` outside Vercel production. On Vercel the app is exported as a serverless handler (see `backend/vercel.json`: every `/api/*` request goes to `index.ts`).

### Routes

- `api/routes/index.ts` — `GET /api/` returns a JSON index of example endpoints. Mounts the two routers below and exports the TMDB base URL.
- `api/routes/movies-and-tvseries/index.ts` — table-driven proxy. The `mediaRoutes` array lists every allowed TMDB path (detail, similar, videos, images, reviews, popular/top_rated/upcoming/now_playing lists, genres, discover, trending, search). Each entry becomes a `GET /api/<path>` handler that forwards `page`, `query`, `with_genres`, and `language` query params.
- `api/routes/addons/index.ts` — proxies `configuration/languages` and `configuration/primary_translations`. Passes TMDB error status codes through.
- `*/types.ts` — TMDB response interfaces and the language-code maps used by the frontend.

### Utils

- `api/utils/endpointVerifier.ts` — builds the outgoing TMDB URL. It appends the API key, forces `include_adult=false`, and adds the header language except on `/images` and `/reviews`. It only builds a URL when the request path matches the route table, so the table doubles as an allowlist.
- `api/utils/customReqMediaDataUtil.ts` — `fetch` wrapped in an `AbortController` with a 10 s timeout. Timeouts return 504, other failures 500.

### Backend rules

- To expose a new TMDB endpoint, add one entry to `mediaRoutes` (or `configurationsRoutes`). Do not add ad-hoc handlers.
- A new query param must be added to the `endpointVerifier` signature or it will be dropped silently.
- A new deploy origin must be added in two places: the CORS allowlist and the CSP `connectSrc` list.
- Never log or return the API key. Keep `include_adult=false`.
- There is no test suite. Verify changes by running the server and hitting the endpoint with `curl`.

## Commands (run from the root)

```
bun run dev             # frontend + backend together
bun run dev:frontend    # Vite dev server only
bun run dev:backend     # Express on :8000 via ts-node
bun run build:frontend  # production build
cd frontend && npx eslint src   # lint frontend
cd backend && npx eslint .      # lint backend
```

Env: `frontend/.env` needs `VITE_APP_SERVER`; `backend/.env` needs `API_KEY`, `PORT`, `NODE_ENV`. Samples are in each folder as `.env.sample`.

## Conventions

- Commit only when asked. Branch off `master` for anything non-trivial.
- Keep components small and colocated with their route or feature folder.
- Both packages use strict TypeScript and ESLint 10. Keep new code typed; no `any`.

<!-- knowledge:auto:begin -->
<!-- generated from knowledge/index.ts via `node knowledge/validate.ts --sync` — hand-edits get overwritten -->

## Knowledge routing

Find the row for the area you are about to work in. Read that entry doc and its bindings BEFORE editing anything there.

| Subject | Read first when | Entry doc · bindings |
|---|---|---|
| Bilingual product (EN/ES) | before adding or editing any user-facing text, the language toggle, or any language-aware fetch | `knowledge/index.ts` · frontend/src/context/lang/KNOWLEDGE.binding.ts |
| Design DNA — "The Screening Room" | before creating or styling any component, page, or interaction | `knowledge/index.ts` · frontend/KNOWLEDGE.binding.ts |
| Discovery & browse loop | before building or changing any browse, search, filter, or detail flow (services, pages, routes) | `knowledge/index.ts` · frontend/src/services/KNOWLEDGE.binding.ts |
| Movie/TV twin tracks | before adding types, routes, or services that handle media — movie or tv | `knowledge/index.ts` · frontend/src/types/media-type/KNOWLEDGE.binding.ts |
| Saved media collection | before editing save/favorite flows, the saved-media page, or persistence keys | `knowledge/index.ts` · frontend/src/context/favorite-media-context/KNOWLEDGE.binding.ts |
| Backend as constrained gateway | before adding or changing backend endpoints, query params, CORS, CSP, or anything that touches the TMDB proxy | `knowledge/index.ts` · backend/api/routes/movies-and-tvseries/KNOWLEDGE.binding.ts |

<!-- knowledge:auto:end -->
