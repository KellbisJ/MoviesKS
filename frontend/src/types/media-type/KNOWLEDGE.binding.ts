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
      'Route table: /movie and /tv share one browse page (routes/filtered-media) with filters in the query string (?genres=&sort=&year=); legacy /all, /preview/genre/:id and /all/category/:id twins redirect there via LegacyBrowseRedirect. Detail route validates the track from the URL.',
    verified: true,
  },
];