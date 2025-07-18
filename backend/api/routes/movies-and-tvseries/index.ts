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
import { EndpointVerifierInterface } from '../../utils/endpointVerifier';

dotenv.config();

const api_key: string | undefined = process.env.API_KEY;

const MediaData = express.Router();

const getMediaData = async (req: Request, res: Response, type?: string) => {
	const currentPath = req.originalUrl;

	const { lang } = req;

	// console.log(currentPath);

	const { id } = req.params;

	const { with_genres, page } = req.query;
	// if (with_genres) {
	// 	api_url += `&with_genres=${with_genres}`;
	// }

	if (type !== 'movie' && type !== 'tv') {
		res.status(400).json({ error: 'Invalid endpoint: mediaType must be "movie" or "tv"' });
	}

	let api_url_req: string = '';

	const endpoints: EndpointVerifierInterface[] = [
		{
			// Media details endpoints
			paths: [`${type}/${id}`],
			lang: lang,
		},
		{
			// Media dynamic endpoints
			paths: [
				`${type}/${id}/reviews`,
				`${type}/${id}/similar`,
				`${type}/${id}/images`,
				`${type}/${id}/videos`,
			],
			lang: lang,
		},
		{
			// Media lists endpoints
			paths: [
				`${type}/now_playing`,
				`${type}/popular`,
				`${type}/top_rated`,
				`${type}/upcoming`,
				`${type}/airing_today`,
				`${type}/on_the_air`,
			],
			lang: lang,
		},
		{
			// genre
			paths: [`genre/${type}/list`],
			lang: lang,
		},
		{
			// discover
			paths: [`discover/${type}`],
			lang: lang,
		},
	];

	api_url_req = endpointVerifier(currentPath, endpoints, api_key);

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
		if (
			axios.isAxiosError(axiosError) &&
			axiosError.response &&
			axiosError.response.status === 404
		) {
			if (typeof type === 'string') {
				res.status(404).json({
					message: `${type.charAt(0).toUpperCase() + type.slice(1)} not found`,
					error: axiosError.message,
				});
			}
		} else {
			res.status(500).json({
				message: `An error occurred while fetching ${type} details`,
				error: axiosError.message,
			});
		}
	}
};

const mediaRoutes: Array<{ type: 'movie' | 'tv'; path: string }> = [
	// id required endpoints
	{ type: 'movie', path: ':id' },
	{ type: 'tv', path: ':id' },
	{ type: 'movie', path: ':id/similar' },
	{ type: 'tv', path: ':id/similar' },
	{ type: 'movie', path: ':id/videos' },
	{ type: 'tv', path: ':id/videos' },
	{ type: 'movie', path: ':id/images' },
	{ type: 'tv', path: ':id/images' },
	{ type: 'movie', path: ':id/reviews' },
	{ type: 'tv', path: ':id/reviews' },

	// not id required endpoints
	{ type: 'movie', path: 'now_playing' },
	{ type: 'movie', path: 'popular' },
	{ type: 'movie', path: 'top_rated' },
	{ type: 'movie', path: 'upcoming' },
	{ type: 'tv', path: 'airing_today' },
	{ type: 'tv', path: 'on_the_air' },
	{ type: 'tv', path: 'popular' },
	{ type: 'tv', path: 'top_rated' },
];

const mediaRoutesGenresAndDiscover: Array<{ type: 'movie' | 'tv'; path: string }> = [
	// genres
	{ type: 'movie', path: 'genre/movie/list' },
	{ type: 'tv', path: 'genre/tv/list' },

	//discover
	{ type: 'movie', path: 'discover/movie' },
	{ type: 'tv', path: 'discover/tv' },
];

mediaRoutes.forEach(({ type, path }) => {
	MediaData.get(`/${type}/${path}`, (req: Request, res: Response) => {
		getMediaData(req, res, type);
	});
});

mediaRoutesGenresAndDiscover.forEach(({ type, path }) => {
	MediaData.get(`/${path}`, (req: Request, res: Response) => {
		getMediaData(req, res, type);
	});
});

export { MediaData };
