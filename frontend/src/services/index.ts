import { currentLanguage } from "@/context/lang";

const BASE_API_URL: string =
  import.meta.env.VITE_APP_SERVER || "http://localhost:8000/api";

export const API_TRENDING_MOVIES_URL = `${BASE_API_URL}/trending/movie/day`;
export const API_TRENDING_TV_URL = `${BASE_API_URL}/trending/tv/day`;
export const API_MOVIE_SEARCH = `${BASE_API_URL}/search/movie`;
export const API_MOVIE_DETAIL = (id: string) => `${BASE_API_URL}/movie/${id}`;
export const API_TV_DETAIL = (series_id: string) =>
  `${BASE_API_URL}/tv/${series_id}`;
export const API_MOVIE_DETAIL_SIMILAR = (id: string) =>
  `${BASE_API_URL}/movie/${id}/similar`;
export const API_TV_DETAIL_SIMILAR = (series_id: string) =>
  `${BASE_API_URL}/tv/${series_id}/similar`;
export const API_MOVIE_CATEGORY = `${BASE_API_URL}/discover/movie`;
export const API_TV_CATEGORY = `${BASE_API_URL}/discover/tv`;
export const API_GENRE_MOVIE_URL = `${BASE_API_URL}/genre/movie/list`;
export const API_GENRE_TV_URL = `${BASE_API_URL}/genre/tv/list`;
export const API_MEDIA_VIDEOS = (type: string, id: string) =>
  `${BASE_API_URL}/${type}/${id}/videos`;
export const API_SEARCH_MEDIA = (type: string) =>
  `${BASE_API_URL}/search/${type}`;
export const API_MEDIA_IMAGES = (type: string, id: string) =>
  `${BASE_API_URL}/${type}/${id}/images`;
export const API_MEDIA_LISTS = (type: string, mediaListType: string) =>
  `${BASE_API_URL}/${type}/${mediaListType}`;
export const API_CONFIG_LANGUAGES = `${BASE_API_URL}/configurations/languages`;
export const API_MEDIA_REVIEWS = (type: string, id: string) =>
  `${BASE_API_URL}/${type}/${id}/reviews`;

interface ApiOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

async function apiClient<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  if (!endpoint.startsWith(BASE_API_URL)) {
    throw new Error("Bloqueado: Petición a dominio no permitido");
  }

  let url = endpoint;
  if (options.params) {
    const searchParams = new URLSearchParams();
    Object.entries(options.params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });

    const queryString = searchParams.toString();
    url += (url.includes("?") ? "&" : "?") + queryString;
  }

  // 3. Prepare Headers
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json;charset=utf-8",
    "X-Requested-With": "XMLHttpRequest",
    "X-LANG-CONTEXT": currentLanguage,
    ...options.headers,
  };

  // 4. Timeout Setup
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
      credentials: "include",
    });

    clearTimeout(timeoutId);

    // 5. Check HTTP Status
    if (!response.ok) {
      // You can implement custom error handling classes here if needed
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    clearTimeout(timeoutId); // Ensure timer is cleared on error

    if ((error as Error).name === "AbortError") {
      console.error("Request timed out");
    }
    throw error;
  }
}

// const api = axios.create({
// 	baseURL: BASE_API_URL,
// 	headers: {
// 		Accept: 'application/json',
// 		'Content-Type': 'application/json;charset=utf-8',
// 		'X-Requested-With': 'XMLHttpRequest',
// 	},
// 	timeout: 15000,
// 	withCredentials: true,

// 	// xsrfCookieName: 'XSRF-TOKEN',
// 	// xsrfHeaderName: 'X-XSRF-TOKEN',
// });

// api.interceptors.request.use((config) => {
// 	if (!config.url?.startsWith(BASE_API_URL)) {
// 		throw new axios.Cancel('Bloqueado: Petición a dominio no permitido');
// 	}

// 	config.headers['X-LANG-CONTEXT'] = currentLanguage;
// 	return config;
// });

export { apiClient };
