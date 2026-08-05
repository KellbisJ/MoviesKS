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
- Responsive grid: 2→5 columns for media
- Backdrop blur glassmorphism on overlays

## Colors

A restrained neutral palette anchored by a single warm accent. The light mode uses soft grays; the dark mode deepens everything toward true black. The accent shifts warmer in dark mode to maintain legibility and warmth.

### Primary
- **Charcoal** (#4a4a48 light / #d1d1d1 dark): Headline and navigation text in light/dark modes respectively. Used for active nav underlines and section titles.

### Accent
- **Amber Glow** (#c08457 light / #d4a373 dark): The single accent color. Appears on active states, ratings badges, primary buttons, and hover highlights. Used on ≤15% of any given screen — its rarity draws the eye.

### Secondary
- **Warm Gray** (#8e8e8e light / #888888 dark): Secondary text, icons, and disabled states. Subtle enough to recede, warm enough to feel cohesive.

### Neutral
- **Paper White** (#ffffff): Surface-3 — the brightest surface, used for cards, modals, and dropdowns in light mode.
- **Warm Gray-1** (#f0f0f0): Surface-1 — background for search bars, filter bars, and elevated panels.
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
- **Label** (500, `text-xs`/`text-sm`, 1.4): Navigation labels, filter bar labels, and secondary UI text.

## Layout

**Desktop:** Fixed top navbar (h-16, px-8, backdrop-blur) with a centered content container (max-w-[1536px], px-4 sm:px-6). The home page header is centered with generous vertical spacing (mt-4 mb-4). Media sections use a responsive grid (2→5 columns) with 16px (gap-4) spacing between cards.

**Mobile:** Fixed bottom navbar (h-12) with icon-only navigation and expandable overlay menus. The bottom nav uses the same backdrop-blur treatment. Content adapts with reduced padding and full-width cards.

**Grid behavior:** Media grids use CSS Grid with responsive breakpoints: `grid-cols-2` (sm), `grid-cols-3` (md), `grid-cols-4` (lg), `grid-cols-5` (xl). Images use `aspect-[2/3]` for posters. The images gallery uses `grid-auto-rows: auto; grid-flow-row-dense` for masonry-like packing.

**Spacing rhythm:** 4px/8px/16px/24px/32px/48px — all multiples of 4px. Consistent vertical rhythm with `space-y-*` utilities.

## Elevation & Depth

Shadows are the primary depth mechanism — the system is lifted, not flat. Three shadow tiers are used consistently:

### Shadow Vocabulary
- **Shadow-md** (`box-shadow: ...`): The navbar and filter bar. A subtle, ambient shadow that anchors the fixed header without competing with content.
- **Shadow-lg** (`box-shadow: ...`): Media cards, containers, and dropdown menus. The default card elevation — noticeable but not heavy.
- **Shadow-2xl**: The backdrop image on detail pages. Deep, immersive depth for the hero layer.
- **Hover lift**: Cards transition from `shadow-lg` to `shadow-2xl` on hover, creating a tactile "lift" effect.

**The Lift-By-Interaction Rule.** Shadows deepen only in response to user interaction (hover, focus). At rest, surfaces are calm and unobtrusive.

## Shapes

The system uses two corner strategies:

- **Rounded-lg (16px)**: Media cards, poster containers, and dropdown panels. Subtle but noticeable rounding that feels modern and friendly.
- **Rounded-full (9999px)**: Search bars, filter bar inputs, CTA buttons, and rating badges. Pill shapes create a sense of approachability and fluidity.
- **Rounded-md (12px)**: Secondary containers like filter bar buttons and settings panels.
- **Rounded-xl (20px)**: Poster images and backdrop containers. The largest rounding for the most important visual elements.

All images are `overflow-hidden` with their parent's `rounded-*` applied to the container, not the `<img>` itself.

## Components

### Media Cards (Posters)
- **Shape:** Rounded-lg (16px) for the card container, overflow-hidden
- **Aspect:** 2/3 (portrait poster ratio)
- **Background:** Poster image with a gray-800 placeholder that fades in via `opacity` transition (500ms)
- **Hover:** Scale to 1.05 with `shadow-lg` → `shadow-2xl` transition (300ms), plus a black/50 overlay with title text and rating badge that fade in
- **Save button:** Absolute top-right, pill-shaped, glassmorphic (`bg-gray-800/30 backdrop-blur-sm`), appears on hover. Filled amber when saved.
- **Rating badge:** Bottom-right corner, black/50 pill with yellow star icon and vote average

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
- **Navigation:** Icon-only (Lucide icons, 21px) with expandable overlay menus (translate-y slide-up animation, 300ms)
- **States:** Icon menus slide down from below the bar with opacity transition

### Filter Bar
- **Shape:** Rounded-md (12px) containers with bg-surface-1
- **Layout:** Two pill-style dropdowns (media type and genre) with chevron icons
- **Dropdowns:** Absolute positioned panels, bg-surface-1, shadow-md, rounded-lg, w-80
- **Selected state:** bg-surface-3 with a left border accent (border-l-5 border-primary) — a distinctive visual pattern
- **Spacing:** p-2.5 px-5 internal padding, gap-4 between sections

### Buttons (CTA)
- **Shape:** Rounded-full (pill)
- **Primary (Watch Trailer):** bg-accent, text-white, px-4 py-2, with Clapperboard icon
- **Ghost (Return to Homepage):** bg-accent, text-white, rounded-full, with hover:bg-opacity-90
- **Save (bookmark):** Pill-shaped, glassmorphic, appears on card hover

### Empty State / No Results
- **Shape:** Rounded-lg container with bg-surface-2
- **Icon:** Search icon in a rounded-full container (bg-surface-3), p-4
- **Layout:** Centered, max-w-md, with centered heading and description
- **CTA:** Pill-shaped button in accent color

### Modals (Trailer, Select Media)
- **Shape:** Rounded-lg with shadow-lg
- **Background:** bg-surface-1/30 dark:bg-dark-surface-1 (glassmorphic for overlay)
- **Animation:** fade-in (300ms ease-out) for appearance, opacity-0 → opacity-100

### Loading States
- **Skeletons:** Placeholder shapes matching the content they replace (MediaNullSkeleton, MediaHomeSkeleton, SingleMediaSkeleton)
- **Popcorn loader:** Animated popcorn icon with pulsing ring and floating particle dots — a signature loading experience

## Do's and Don'ts

### Do:
- **Do** use the amber accent sparingly — it's a spotlight, not a floodlight (≤15% of screen).
- **Do** apply `backdrop-blur-sm` to all fixed navbars and glassmorphic overlays for depth without opacity loss.
- **Do** use `rounded-full` for all search bars, filter inputs, and CTA buttons to maintain the pill aesthetic.
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
