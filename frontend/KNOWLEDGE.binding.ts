/**
 * Knowledge binding — HOW THIS ARTIFACT realizes the knowledge.
 *
 * Probed from the real files (read, not guessed) on scaffold day.
 * Never import runtime code: type-only imports only.
 */

import type { KnowledgeBinding } from '../knowledge/contract.ts';

export const bindings: KnowledgeBinding[] = [
  {
    id: 'screening_room_design',
    target: 'frontend/DESIGN.md',
    mechanism:
      'Full design system: token palette (ambient amber accent, neutral surfaces), Inter-only typography, radii/spacing scales, shadow vocabulary, per-component specs, and the Do/Don\'t list (single accent ≤15%, dark: prefix on every color, rounded-full pills, overflow-hidden on containers not <img>).',
    verified: true,
  },
  {
    id: 'screening_room_design',
    target: 'frontend/src/index.css',
    mechanism:
      'Tokens materialized: @theme block declares the exact DESIGN.md palette as Tailwind v4 color tokens (--color-accent, --color-surface-*, dark variants) plus the signature animations (popcorn loader particles, fade-in).',
    verified: true,
  },
  {
    id: 'screening_room_design',
    target: 'frontend/PRODUCT.md',
    mechanism:
      'Product commitments and principles (discover first, bilingual by default, respect the device, room to grow) — the "why" behind the design voice.',
    verified: true,
  },
];