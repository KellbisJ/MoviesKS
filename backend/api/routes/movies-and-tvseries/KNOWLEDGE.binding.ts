/**
 * Knowledge binding — HOW THIS ARTIFACT realizes the knowledge.
 *
 * Probed from the real files (read, not guessed) on scaffold day.
 * Never import runtime code: type-only imports only.
 */

import type { KnowledgeBinding } from '../../../../knowledge/contract.ts';

export const bindings: KnowledgeBinding[] = [
  {
    id: 'tmdb_proxy_allowlist',
    target: 'backend/api/routes/movies-and-tvseries/index.ts',
    mechanism:
      'mediaRoutes table: 28 entries (10 require :id, 18 list/genre/discover/trending/search). Each row becomes GET /api/<path>; requiresId rows substitute :id from req.params before building the URL. No ad-hoc handlers exist — every TMDB call must be a row here.',
    verified: true,
  },
  {
    id: 'tmdb_proxy_allowlist',
    target: 'backend/api/utils/endpointVerifier.ts',
    mechanism:
      'Builds the outgoing TMDB URL only when the cleaned request path matches a table entry; appends api_key + include_adult=false, plus page/query/with_genres/language params — a param absent from this signature is dropped silently. Header language is skipped for paths containing /images or /reviews. Timeout paths return 504 via customReqMediaDataUtil (10 s AbortController).',
    verified: true,
  },
];