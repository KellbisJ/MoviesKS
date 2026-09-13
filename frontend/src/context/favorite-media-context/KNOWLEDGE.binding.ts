/**
 * Knowledge binding — HOW THIS ARTIFACT realizes the knowledge.
 *
 * Probed from the real files (read, not guessed) on scaffold day.
 * Never import runtime code: type-only imports only.
 */

import type { KnowledgeBinding } from '../../../knowledge/contract.ts';

export const bindings: KnowledgeBinding[] = [
  {
    id: 'saved_favorites',
    target: 'frontend/src/context/favorite-media-context/index.tsx',
    mechanism:
      'SavedMediaProvider: state {movies: [], tv: []}, persisted to localStorage key favoriteMedia, hydrated once on mount; saveMedia toggles by id within the track array.',
    verified: true,
  },
  {
    id: 'saved_favorites',
    target: 'frontend/src/hooks/use-save-media/index.ts',
    mechanism:
      'Pure toggle: reads favoriteMedia, returns false if id already saved, otherwise pushes and writes. Track key derived from MediaTypeT (movie -> movies, tv -> tv).',
    verified: true,
  },
];