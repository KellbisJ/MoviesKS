---
name: MoviesKS
description: A cinematic movie and TV series discovery SPA
colors:
  bg-main: "#e2e2e2"
  surface-1: "#f0f0f0"
  surface-2: "#f8f8f8"
  surface-3: "#ffffff"
  primary: "#4a4a4a"
  secondary: "#8e8e8e"
  accent: "#c08457"
  accent-ink: "#94603a"
  text-high: "#2a2a2a"
  text-low: "#666666"
  dark-bg-main: "#1a1a1a"
  dark-surface-1: "#242424"
  dark-surface-2: "#2d2d2d"
  dark-surface-3: "#383838"
  dark-primary: "#d1d1d1"
  dark-secondary: "#888888"
  dark-accent: "#d4a373"
  dark-text-high: "#e0e0e0"
  dark-text-low: "#a0a0a0"
typography:
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  heading:
    fontFamily: "Inter, sans-serif"
    fontWeight: 700
    lineHeight: 1.2
  label:
    fontFamily: "Inter, sans-serif"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  button-ghost:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.text-high}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  card-media:
    backgroundColor: "{colors.surface-3}"
    textColor: "{colors.text-high}"
    rounded: "{rounded.lg}"
    padding: "0"
  input-search:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.text-high}"
    rounded: "{rounded.full}"
    padding: "8px 24px"
---

# Design System: MoviesKS

## Overview

**Creative North Star: "The Screening Room"**

A warm, cinematic interface where content is the star and the interface fades into the background. Dark-mode depths meet soft neutral surfaces, with a warm amber accent that recalls the glow of a projector beam. The system feels fluid and vivid — transitions are smooth, hover states reveal depth, and every interaction is deliberate without being heavy.

The layout is spacious on desktop with a fixed top navbar and centered content, collapsing to a compact bottom nav on mobile. Cards lift with shadows on hover, posters scale gently, and the accent color appears sparingly — only where it matters: active states, ratings, and call-to-action buttons.

**Key Characteristics:**
- Warm amber accent on deep neutral canvases
- Shadow-based depth (lifted, not flat)
- Pill-shaped search and CTA elements
- Responsive grid: 2→6 columns of 2:3 posters
- Backdrop blur glassmorphism on overlays

## Colors

A restrained neutral palette anchored by a single warm accent. The light mode uses soft grays; the dark mode deepens everything toward true black. The accent shifts warmer in dark mode to maintain legibility and warmth.

### Primary
- **Charcoal** (#4a4a4a light / #d1d1d1 dark): Headline and navigation text in light/dark modes respectively. Used for active nav underlines and section titles.

### Accent
- **Amber Glow** (#c08457 light / #d4a373 dark): The single accent color. Appears on active states, ratings badges, primary buttons, and hover highlights. Used on ≤15% of any given screen — its rarity draws the eye.
- **Amber Ink** (#94603a, light mode only): The same amber deepened for small text and filled buttons with white labels on light surfaces (5.3:1 on white, 4.6:1 on surface-1). Light `#c08457` is only 3.1:1 on white, so never use it for body-size text. Dark mode keeps `#d4a373`, which already passes.

### Secondary
- **Warm Gray** (#8e8e8e light / #888888 dark): Secondary text, icons, and disabled states. Subtle enough to recede, warm enough to feel cohesive.

### Neutral
- **Paper White** (#ffffff): Surface-3 — the brightest surface, used for cards, modals, and dropdowns in light mode.
- **Warm Gray-1** (#f0f0f0): Surface-1 — background for search bars, filter chips and select pills, and elevated panels.
- **Warm Gray-2** (#f8f8f8): Surface-2 — subtle backgrounds for empty states and secondary surfaces.
- **Deep Canvas** (#e2e2e2 light / #1a1a1a dark): The main background. Light mode is a soft warm gray; dark mode is a deep near-black.
- **Text High** (#2a2a2a light / #e0e0e0 dark): Primary body text and headings.
- **Text Low** (#666666 light / #a0a0a0 dark): Secondary body text, placeholders, and muted descriptions.

**The Single Accent Rule.** The amber accent appears on no more than 15% of any given screen. Its warmth is the point — it should feel like a spotlight, not a floodlight.

## Typography

**All fonts: Inter** (loaded from Google Fonts, with `sans-serif` fallback). A single typeface for the entire system — headings at weight 700, body at 400, labels at 500. The character is clean, modern, and highly legible at all sizes.

### Hierarchy
- **Display** (700, `text-3xl`/`text-5xl`, 1.2): The "MoviesKS" header on the home page. Bold and commanding, centered.
- **Headline** (700, `text-3xl`/`text-4xl`, 1.2): Media titles on detail pages. Paired with the year in a lighter weight.
- **Title** (700, `text-xl`/`text-xl`, 1.2): Section titles ("Recent popular movies") and modal headers.
- **Body** (400, `text-sm`/`text-base`, 1.5): Body text, descriptions, synopsis. Comfortable reading length.
- **Label** (500, `text-xs`/`text-sm`, 1.4): Navigation labels, filter chip and select labels, and secondary UI text.

## Layout

**Desktop:** Fixed top navbar (h-16, px-8, backdrop-blur) on browse/detail pages; the home/search hero navbar sits in the document flow, so those pages get no top offset. Centered content container (max-w-[1536px], px-4 sm:px-6).

**Home page:** One lead feature, then lighter sections. The lead is the most popular movie, full width (rounded-xl 20px, 4:5 on mobile with the poster, 16:9 at sm, `min(62vh,600px)` tall at lg with the backdrop), with the title, rating, year, synopsis, a "View details" pill and a Save pill. The search pill overlaps the lead's bottom edge (-mt-7/-mt-8). Each section (popular movies, popular TV, top-rated movies, top-rated TV) is a surface-1 card with its blurred backdrop glow, a heading plus "See all", a ranked `<ol>` of 4 rows with large rank numerals (1-col → 2 at sm → 4 at xl), then a horizontal poster rail. The page title is an sr-only h1; there is no visible brand header or tagline. Media sections use a responsive grid (2→5 columns) with 16px (gap-4) spacing between cards.

**Browse page (`/movie`, `/tv`):** One page per media type; every filter lives in the query string (`?genres=28,35&sort=top_rated&year=2024`), so Back, reload and sharing work. Old `/movie/all`, `/preview/genre/:id` and `/all/category/:id` URLs redirect here. Top to bottom: a visible h1 that names the result ("Acción + Comedia", or "Películas en tendencia hoy" unfiltered) with a meta line (type · sort · year · title count, `aria-live`); a controls row (Movies | TV segmented pill, then Sort and Year native-select pills); a genre chip group; then the poster grid. There is no separate filter panel or modal.

**Detail page (`/movie/detail/:id`, `/tv/detail/:id`):** A hero over the backdrop (`w780`, `w1280` at lg, under a bg-main/80 veil), at least 90vh tall on phones and a full screen at lg. It uses `min-h`, never a fixed height, so the hero never becomes a scroll box inside the page. Poster (with a round bookmark Save toggle) on the left at lg, stacked on phones. Right column, top to bottom:
- h1 title with the year in lighter weight
- rating pill and the one solid Amber Ink "Watch trailer" pill
- tagline in curly quotes
- the facts grid (type, runtime, status, original language; muted icons with sr-only labels; rows with no data are hidden)
- synopsis, then genres (links to the browse page)
- a "Details" `<dl>` (budget and box office in localized USD, production logos on a light plate so dark artwork stays visible in dark mode, spoken languages named in the page language).

Below the hero: a "More like this" poster rail (same rail as home), then a segmented tablist (Images, Videos, Reviews, with counts, arrow-key navigation). Each tab's data settles on its own, so one failed request shows an inline retry in its own tab only. A failed or unknown title renders a bilingual error state (Try again / Browse), never a blank page, and `document.title` follows the title.

**Mobile:** Fixed bottom navbar (h-12) with icon-only navigation and expandable overlay menus. The bottom nav uses the same backdrop-blur treatment. Content adapts with reduced padding and full-width cards.

**Grid behavior:** Media grids use CSS Grid: 2 columns on phones, 3 at sm, 4 at md, 5 at lg (6 at 2xl on the browse page). Cells are `aspect-[2/3]`, never fixed heights, so posters are never cropped. The browse grid ends with a sentinel that auto-loads the next page, a "Load more" pill as the explicit path, and a "You've reached the end" line. The images gallery uses `grid-flow-row-dense` with backdrops spanning two columns, each tile at its own aspect ratio, in TMDB's (vote-ranked) order: never shuffled. Every tile is a button that opens the viewer in one tap.

**Spacing rhythm:** 4px/8px/16px/24px/32px/48px — all multiples of 4px. Consistent vertical rhythm with `space-y-*` utilities.

## Elevation & Depth

Shadows are the primary depth mechanism — the system is lifted, not flat. Three shadow tiers are used consistently:

### Shadow Vocabulary
- **Shadow-md** (`box-shadow: ...`): The navbar, select pills and the type toggle. A subtle, ambient shadow that anchors the fixed header without competing with content.
- **Shadow-lg** (`box-shadow: ...`): Media cards, containers, and dropdown menus. The default card elevation — noticeable but not heavy.
- **Shadow-2xl**: The backdrop image on detail pages. Deep, immersive depth for the hero layer.
- **Hover lift**: Cards transition from `shadow-lg` to `shadow-2xl` on hover, creating a tactile "lift" effect.

**The Lift-By-Interaction Rule.** Shadows deepen only in response to user interaction (hover, focus). At rest, surfaces are calm and unobtrusive.

## Shapes

The system uses two corner strategies:

- **Rounded-lg (16px)**: Media cards, poster containers, and dropdown panels. Subtle but noticeable rounding that feels modern and friendly.
- **Rounded-full (9999px)**: Search bars, filter chips, select pills, CTA buttons, and rating badges. Pill shapes create a sense of approachability and fluidity.
- **Rounded-md (12px)**: Secondary containers like settings panels and inline alerts.
- **Rounded-xl (20px)**: Poster images and backdrop containers. The largest rounding for the most important visual elements.

All images are `overflow-hidden` with their parent's `rounded-*` applied to the container, not the `<img>` itself.

## Components

### Media Cards (Posters)
- **Shape:** Rounded-lg (16px) for the card container, overflow-hidden
- **Aspect:** 2/3 (portrait poster ratio)
- **Background:** Poster image with a gray-800 placeholder that fades in via `opacity` transition (500ms)
- **At rest:** A bottom black/85 → transparent scrim always shows the title (line-clamp-2) and the rating (amber star, `dark-accent`). Hover deepens the scrim and lifts `shadow-lg` → `shadow-2xl`; rail posters also scale to 1.05 (motion-safe only).
- **Save button:** Round 40px button, a *sibling* of the card link (never nested inside it), with `aria-label` and `aria-pressed`. Bookmark icon. Unsaved: black/45 with backdrop blur; on hover-capable devices it appears on hover or keyboard focus, and it is always visible on touch. Saved: filled amber (`accent` / `dark-accent`) with BookmarkCheck, always visible.
- **No poster:** A focusable link to the detail page on surface-2 with a Film icon, the title, and bilingual "No poster" text.

### Navigation Bar (Desktop)
- **Shape:** Full-width fixed bar, h-16, px-8
- **Background:** `bg-surface-3/80 dark:bg-dark-surface-3/80` with `backdrop-blur-sm` — glassmorphic, semi-transparent
- **Shadow:** shadow-md for subtle depth
- **Active state:** Accent-colored text with an underline indicator (via `underlinePath` utility)
- **Transition:** `transition-colors duration-200` for all state changes
- **Search bar:** Pill-shaped (rounded-full), bg-surface-1, with focus ring (ring-2 ring-accent)

### Navigation Bar (Mobile)
- **Shape:** Fixed bottom bar, h-12, full-width
- **Background:** `bg-surface-1 dark:bg-dark-surface-1` with backdrop-blur-sm
- **Shadow:** shadow-md
- **Navigation:** Two labelled buttons (Compass "Explore", Settings "Settings") with `aria-expanded`, opening overlay menus (translate-y slide-up, 300ms). Hidden overlays are `inert`.
- **States:** Icon menus slide down from below the bar with opacity transition

### Browse Controls
- **Type toggle:** A surface-1 pill track (p-1, shadow-sm) holding two links, Movies and TV. The active one is a surface-3 pill with `aria-current="page"`. Switching type keeps sort and year and drops genres, because genre ids differ between tracks.
- **Select pills:** Sort (Tendencia hoy, Más populares, Mejor valoradas, Más recientes) and Year (Cualquier año, then current year back to 1950). Each is a `<label>` pill (surface-1, shadow-sm) holding a muted label, a native `<select>` in semibold, and a ChevronDown. A native select is as wide as its longest option, so it gets `min-w-0 flex-1 truncate` and option text stays short (no explanatory suffixes). Phones: the type toggle takes its own full-width row (two equal segments), Sort and Year share a two-column row at h-11 with the label visually hidden; sm+: everything sits in one row at h-10 with labels shown. Focus draws `ring-2 ring-accent` on the pill. Native selects are deliberate: on phones the OS picker is the best thumb-reach control. Trending can't be filtered on TMDB, so with genres or a year selected it is disabled and the sort falls back to popular.
- **Genre chips:** `<button aria-pressed>` pills (h-10 on touch, h-9 at sm) inside a labelled group, starting with "Todos/All". Unselected: surface-1 → surface-3 on hover. Selected: Amber Ink fill (`accent-ink`, white text; `dark-accent` with dark text) with a Check icon. Chip order never changes on toggle, so keyboard focus stays put. Phones get one horizontally scrolling line with the `rail-fade` mask; sm and up wrap. Multiple genres combine as AND, and the empty state says so.
- **Never:** side-border selection markers, dropdown panels, or modals for filtering.

### Buttons (CTA)
- **Shape:** Rounded-full (pill)
- **Solid Amber Ink (Watch trailer, Back to home, Try again, Clear filters):** `bg-accent-ink` text-white (`dark-accent` with dark text), px-5 py-2.5, font-semibold; hover goes to Charcoal (`primary` / `dark-primary`)
- **Save (bookmark):** Pill-shaped, glassmorphic, appears on card hover

### Empty State / No Results
- **Shape:** Rounded-lg container with bg-surface-2
- **Icon:** Search icon in a rounded-full container (bg-surface-3), p-4
- **Layout:** Centered, max-w-md, with centered heading and description
- **CTA:** Pill-shaped button in accent color

### Dialogs (Trailer, Image Viewer)
- **One component:** `components/common/dialog`. Portal, `role="dialog"` + `aria-modal`, localized `aria-label`, focus moves in and is trapped, Escape and a backdrop click close it, page scroll is locked, and focus returns to the opener. z-1100 (above the navbar).
- **Look:** black/85 veil with backdrop blur, motion-safe `fade-in`. Controls are labelled white/15 pills or 44px round buttons, placed *above* or *below* the media, never overlapping it.
- **Trailer:** 16:9 player that autoplays on open, sized by viewport height as well as width so the Close pill stays on screen in landscape.
- **Videos tab:** YouTube thumbnails with a play badge. The iframe loads only inside the dialog.
- **Image viewer:** kind and position ("Póster · 3 de 24", `aria-live`), a Close button, prev/next buttons, and arrow keys. Backdrops load at `w1280` and posters at `w780`, never `original`.

### Motion & Accessibility Floor
- `prefers-reduced-motion: reduce` collapses all animations, transitions and smooth scrolling (global rule in `index.css`). Decorative hover motion uses `motion-safe:`.
- Every interactive element shows a 2px accent `focus-visible` outline. Text selection, caret and `accent-color` are themed from the amber accent.
- `<html lang>` follows the page language. Icon buttons carry localized labels.

### Loading States
- **Skeletons:** Placeholder shapes matching the content they replace (HomeSkeleton mirrors the lead, search, ranked rows and rail; SingleMediaSkeleton)
- **Errors (home):** Sections load independently. A failed section is hidden and one alert above the sections says what failed, with an Amber Ink "Try again" pill that refetches.
- **Popcorn loader:** Animated popcorn icon with pulsing ring and floating particle dots — a signature loading experience

## Do's and Don'ts

### Do:
- **Do** use the amber accent sparingly — it's a spotlight, not a floodlight (≤15% of screen).
- **Do** apply `backdrop-blur-sm` to all fixed navbars and glassmorphic overlays for depth without opacity loss.
- **Do** use `rounded-full` for all search bars, filter chips, select pills, and CTA buttons to maintain the pill aesthetic.
- **Do** transition shadows on hover (`shadow-lg` → `shadow-2xl`) to create tactile lift.
- **Do** use `opacity` transitions (500ms) for image loading states — fade-in, not flash-in.
- **Do** keep all spacing as multiples of 4px for consistent rhythm.
- **Do** use `overflow-hidden rounded-*` on container elements, not on `<img>` elements.
- **Do** apply `will-change-transform` and `will-change-opacity` to elements that animate for GPU acceleration.

### Don't:
- **Don't** use more than one accent color on any given screen. The amber is the only accent.
- **Don't** apply shadows to every element — reserve them for interactive surfaces (cards, nav, dropdowns).
- **Don't** use `border` as a primary visual separator — use tonal differences (surface-1 vs surface-2) instead.
- **Don't** mix rounded corners within the same component — cards use rounded-lg, buttons use rounded-full. Don't mix them arbitrarily.
- **Don't** use hard black (#000000) or pure white (#ffffff) for text — always use text-high/text-low for softer contrast.
- **Don't** forget the dark-mode color prefix (`dark:`) on every light-mode color utility.
