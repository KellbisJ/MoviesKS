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
      'SavedMediaProvider: state {movies: [], tv: []} read synchronously from localStorage key favoriteMedia on first render. saveMedia toggles by id within the track array using read-modify-write against storage; a window storage listener adopts changes from other tabs. Exposes restoreMedia (undo), lastRemoved and storageFailed.',
    verified: true,
  },
  {
    id: 'saved_favorites',
    target: 'frontend/src/context/favorite-media-context/storage.ts',
    mechanism:
      'readSaved never throws: corrupt JSON or odd shapes become an empty collection, bad entries and duplicate ids are dropped, and old full objects are slimmed to {id, title|name, poster_path, vote_average, savedAt}. writeSaved returns false on quota or blocked storage.',
    verified: true,
  },
];
