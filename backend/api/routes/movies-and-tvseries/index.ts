import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';
import {
	MovieDetailInterface,
	TVDetailInterface,
	MovieSimilarInterface,
	TVSimilarInterface,
	MediaVideosInterface,
	MediaImagesInterface,
	MediaReviewInterface,
	NowPlayingMoviesListInterface,
	PopularMoviesInterface,
	TopRatedMoviesListInterface,
	UpcomingMoviesListInterface,
	AiringTodayTvSeriesListInterface,
	OnTheAirTvSeriesListInterface,
	PopularTvSeriesInterface,
	TopRatedTvSeriesListInterface,
	PreviewCategoriesMediaInterface,
	CategoryMediaPreviewDiscoverInterface,
} from './types';
import { endpointVerifier } from '../../utils/endpointVerifier';
import { LanguageISOCode } from '../addons/types';

dotenv.config();

const api_key: string | undefined = process.env.API_KEY;

const MediaData = express.Router();

const mediaRoutes: Array<{ proxyPath: string; requiresId: boolean }> = [
	// id required endpoints
	{ proxyPath: 'movie/:id', requiresId: true },
	{ proxyPath: 'tv/:id', requiresId: true },
	{ proxyPath: 'movie/:id/similar', requiresId: true },
	{ proxyPath: 'tv/:id/similar', requiresId: true },
	{ proxyPath: 'movie/:id/videos', requiresId: true },
	{ proxyPath: 'tv/:id/videos', requiresId: true },
	{ proxyPath: 'movie/:id/images', requiresId: true },
	{ proxyPath: 'tv/:id/images', requiresId: true },
	{ proxyPath: 'movie/:id/reviews', requiresId: true },
	{ proxyPath: 'tv/:id/reviews', requiresId: true },

	// not id required endpoints
	{ proxyPath: 'movie/now_playing', requiresId: false },
	{ proxyPath: 'movie/popular', requiresId: false },
	{ proxyPath: 'movie/top_rated', requiresId: false },
	{ proxyPath: 'movie/upcoming', requiresId: false },
	{ proxyPath: 'tv/airing_today', requiresId: false },
	{ proxyPath: 'tv/on_the_air', requiresId: false },
	{ proxyPath: 'tv/popular', requiresId: false },
	{ proxyPath: 'tv/top_rated', requiresId: false },
	{ proxyPath: 'genre/movie/list', requiresId: false },
	{ proxyPath: 'genre/tv/list', requiresId: false },
	{ proxyPath: 'discover/movie', requiresId: false },
	{ proxyPath: 'discover/tv', requiresId: false },
];

const getMediaData = async (req: Request, res: Response, pathToGet: string) => {
	const currentPath = req.originalUrl;

	const { lang } = req;

	const { with_genres, page, include_adult } = req.query as Record<string, string | undefined>;

	let api_url_req: string = '';

	api_url_req = endpointVerifier(currentPath, pathToGet, api_key, lang, include_adult, page);

	try {
		const {
			data,
		}: {
			data:
				| MovieDetailInterface
				| TVDetailInterface
				| MovieSimilarInterface
				| TVSimilarInterface
				| MediaVideosInterface
				| MediaImagesInterface
				| MediaReviewInterface
				| NowPlayingMoviesListInterface
				| PopularMoviesInterface
				| TopRatedMoviesListInterface
				| UpcomingMoviesListInterface
				| AiringTodayTvSeriesListInterface
				| OnTheAirTvSeriesListInterface
				| PopularTvSeriesInterface
				| TopRatedTvSeriesListInterface
				| PreviewCategoriesMediaInterface
				| CategoryMediaPreviewDiscoverInterface;
		} = await axios.get(api_url_req);
		res.json(data);
	} catch (error) {
		const axiosError = error as AxiosError;

		if (axios.isAxiosError(axiosError)) {
			const errorMessage = `Request failed: ${axiosError.message}`;
			console.error(errorMessage);

			if (axiosError.response) {
				console.error(`Status: ${axiosError.response.status}`);
				console.error(`Response data: ${JSON.stringify(axiosError.response.data)}`);
			}
		} else {
			console.error('An unexpected error occurred:', error);
		}
	}
};

mediaRoutes.forEach(({ proxyPath, requiresId }) => {
	MediaData.get(`/${proxyPath}`, (req: Request, res: Response) => {
		const id = requiresId ? req.params.id : undefined;

		let pathToGet = proxyPath;
		if (id) pathToGet = pathToGet.replace(':id', id);

		console.log('pathToGet', pathToGet);

		getMediaData(req, res, pathToGet);
	});
});

export { MediaData };
