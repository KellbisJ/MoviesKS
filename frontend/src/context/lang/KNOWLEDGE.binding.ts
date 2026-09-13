/**
 * Knowledge binding — HOW THIS ARTIFACT realizes the knowledge.
 *
 * Probed from the real files (read, not guessed) on scaffold day.
 * Never import runtime code: type-only imports only.
 */

import type { KnowledgeBinding } from '../../../knowledge/contract.ts';

export const bindings: KnowledgeBinding[] = [
  {
    id: 'bilingual_ui',
    target: 'frontend/src/context/lang/index.tsx',
    mechanism:
      'LanguagesProvider; localStorage key MOVIESKS_LANG; DEFAULT_LANG es-MX; module-level currentLanguage read by apiClient. setLanguageLS rejects falsy values.',
    verified: true,
  },
  {
    id: 'bilingual_ui',
    target: 'frontend/src/types/languages/index.ts',
    mechanism:
      'languagesEN + languagesES maps (140 keys each, probed symmetric), LanguageISOCode = keyof languagesEN; exports langKeys/langValuesEN/langValuesES. Map keys must stay symmetric across languages (see validateLanguageSymmetry).',
    verified: true,
  },
];