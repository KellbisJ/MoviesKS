import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { MediaDataT } from "./types";
import { endpointVerifier } from "../../utils/endpointVerifier";
import { customReqMediaDataUtil } from "../../utils/customReqMediaDataUtil";

dotenv.config();

const api_key: string | undefined = process.env.API_KEY;
const FETCH_TIMEOUT_MS = 10000;

const MediaData = express.Router();

const mediaRoutes: Array<{ proxyPath: string; requiresId: boolean }> = [
  // id required endpoints
  { proxyPath: "movie/:id", requiresId: true },
  { proxyPath: "tv/:id", requiresId: true },
  { proxyPath: "movie/:id/similar", requiresId: true },
  { proxyPath: "tv/:id/similar", requiresId: true },
  { proxyPath: "movie/:id/videos", requiresId: true },
  { proxyPath: "tv/:id/videos", requiresId: true },
  { proxyPath: "movie/:id/images", requiresId: true },
  { proxyPath: "tv/:id/images", requiresId: true },
  { proxyPath: "movie/:id/reviews", requiresId: true },
  { proxyPath: "tv/:id/reviews", requiresId: true },

  // not id required endpoints
  { proxyPath: "movie/now_playing", requiresId: false },
  { proxyPath: "movie/popular", requiresId: false },
  { proxyPath: "movie/top_rated", requiresId: false },
  { proxyPath: "movie/upcoming", requiresId: false },
  { proxyPath: "tv/airing_today", requiresId: false },
  { proxyPath: "tv/on_the_air", requiresId: false },
  { proxyPath: "tv/popular", requiresId: false },
  { proxyPath: "tv/top_rated", requiresId: false },
  { proxyPath: "genre/movie/list", requiresId: false },
  { proxyPath: "genre/tv/list", requiresId: false },
  { proxyPath: "discover/movie", requiresId: false },
  { proxyPath: "discover/tv", requiresId: false },

  // trending
  { proxyPath: "trending/movie/day", requiresId: false },
  { proxyPath: "trending/tv/day", requiresId: false },
  { proxyPath: "trending/movie/week", requiresId: false },
  { proxyPath: "trending/tv/week", requiresId: false },

  // search
  { proxyPath: "search/movie", requiresId: false },
  { proxyPath: "search/tv", requiresId: false },
];

const getMediaData = async (req: Request, res: Response, pathToGet: string) => {
  const currentPath = req.originalUrl;
  const { pageLanguageCustomHeader } = req;
  const { page, query, with_genres, language } = req.query as Record<
    string,
    string | undefined
  >;

  const api_url_req = endpointVerifier(
    currentPath,
    pathToGet,
    api_key,
    pageLanguageCustomHeader,
    page,
    query,
    with_genres,
    language
  );

  try {
    const response = await customReqMediaDataUtil(
      api_url_req,
      FETCH_TIMEOUT_MS
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: MediaDataT = await response.json();
    res.json(data);
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === "AbortError";
    const errorMessage = isTimeout
      ? "Request timed out"
      : error instanceof Error
        ? error.message
        : "An unexpected error occurred";

    console.error(`Request failed: ${errorMessage}`);
    res.status(isTimeout ? 504 : 500).json({ error: errorMessage });
  }
};

mediaRoutes.forEach(({ proxyPath, requiresId }) => {
  MediaData.get(`/${proxyPath}`, (req: Request, res: Response) => {
    const id = requiresId ? req.params.id : undefined;

    let pathToGet = proxyPath;
    if (id) pathToGet = pathToGet.replace(":id", id as string);

    getMediaData(req, res, pathToGet);
  });
});

export { MediaData };
