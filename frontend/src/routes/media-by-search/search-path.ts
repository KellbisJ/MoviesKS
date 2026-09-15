import { MediaTypeT } from '@/types/media-type';

/** Full title-search URL. Always encoded: queries may contain & + ? and spaces. */
const searchPath = (type: MediaTypeT, query: string) => `/search/${type}/${encodeURIComponent(query)}`;

export { searchPath };
