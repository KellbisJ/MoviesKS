/**
 * Knowledge binding — HOW THIS ARTIFACT realizes the knowledge.
 *
 * Probed from the real files (read, not guessed) on scaffold day.
 * Never import runtime code: type-only imports only.
 */

import type { KnowledgeBinding } from '../../../knowledge/contract.ts';

export const bindings: KnowledgeBinding[] = [
  {
    id: 'discovery_flows',
    target: 'frontend/src/services/index.ts',
    mechanism:
      'One apiClient<T> for every flow: builds query params, blocks any URL that does not start with VITE_APP_SERVER (throws "Bloqueado: Petición a dominio no permitido"), and sends X-LANG-CONTEXT: currentLanguage on every request. API_* constants enumerate the reachable endpoints (trending, lists, search, detail, similar, videos, images, reviews, configurations).',
    verified: true,
  },
];