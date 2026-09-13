/**
 * Knowledge binding — HOW THIS ARTIFACT realizes the knowledge.
 *
 * Probed from the real files (read, not guessed) on scaffold day.
 * Never import runtime code: type-only imports only.
 */

import type { KnowledgeBinding } from '../../../knowledge/contract.ts';

export const bindings: KnowledgeBinding[] = [
  {
    id: 'movie_tv_duality',
    target: 'frontend/src/types/media-type/index.ts',
    mechanism:
      'MediaTypeT enum {movie, tv}; the id/type pair is the key everywhere — routes, services, save keys, and validation (use-valid-media-type hook, utils/media-type-validation).',
    verified: true,
  },
  {
    id: 'movie_tv_duality',
    target: 'frontend/src/app/pathsApp.tsx',
    mechanism:
      'Route table: /movie, /tv, /movie/all, /tv/all, /movie/preview/genre/:id, /tv/preview/genre/:id, genre-filtered lists — every browse route has a twin; detail route validates the track from the URL.',
    verified: true,
  },
];