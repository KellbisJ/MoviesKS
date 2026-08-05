# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
General public / casual visitors who want to discover, browse, and keep track of movies and TV series.

## Product Purpose
A personal project that lets users discover popular and top-rated movies and TV series, search for specific titles, filter by genre, view detailed media pages (trailers, images, reviews, similar titles), and save favorites. Success means a fast, clean browsing experience that could grow into a larger product.

## Positioning
A lightweight, bilingual (English / Spanish) movie and TV series discovery SPA backed by a custom backend API — simple enough for casual users, deep enough for regular visitors.

## Operating Context
- Accessed as a web SPA deployed on Vercel.
- Users browse from desktop or mobile browsers.
- Content comes from a custom backend API (default `http://localhost:8000/api`), with TMDB-style endpoints (trending, search, detail, genres, images, videos, reviews, similar).
- Supports dark/light theme toggle and language toggle (EN/ES).

## Capabilities and Constraints
- **Confirmed:** Routes for home, movie/TV browsing, detail pages, saved media, search, discover, and genre filtering.
- **Confirmed:** Bilingual (EN/ES) via language context; dark/light theme via theme context.
- **Confirmed:** Favorites/saved media via `SavedMediaProvider`.
- **Confirmed:** Trailer modal, media images, reviews, similar titles, preview categories.
- **Undecided:** Whether the backend API URL will change from `localhost:8000` to a production host.
- **Undecided:** Authentication / user accounts (currently no auth).
- **Undecided:** Which mobile platform (iOS, Android, adaptive) if the project grows to native.
- **Constraint:** Stack is React 19 + Vite + Tailwind CSS 4 + React Router — not changing for now.

## Brand Commitments
- Name: **MoviesKS**
- Logo: `public/playmovie_122005.ico`
- Voice: Neutral, accessible — no specific tone committed.

## Evidence on Hand
- Icon asset: `public/playmovie_122005.ico`
- Fonts: Inter (headings, body), loaded from Google Fonts.
- Accent color palette: warm tones (`#c08457` light / `#d4a373` dark).
- Deploy target: Vercel (SPA rewrites configured in `vercel.json`).

## Product Principles
1. **Discover first.** The home page and browse flows should surface content quickly with minimal friction.
2. **Bilingual by default.** All user-facing text supports English and Spanish.
3. **Respect the user's device.** Dark/light theme and responsive layout are first-class concerns.
4. **Personal project with room to grow.** Architecture and UX should be clean enough to support future features without a rewrite.

## Accessibility & Inclusion
- Dark/light theme support for different lighting conditions.
- Responsive layout for mobile and desktop.
- No specific accessibility standard committed yet (WCAG target TBD).
