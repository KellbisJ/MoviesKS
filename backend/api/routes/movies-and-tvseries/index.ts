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
} from './types';
import { endpointVerifier } from '../../utils/endpointVerifier';
import { LanguageISOCode } from '../configurations/languages/types';
import { api_url, EndpointSection } from '..';
import { EndpointVerifierInterface } from '../../utils/endpointVerifier';

dotenv.config();

const endpointsMoviesAndTvAll: EndpointSection[] = [
	'MOVIES',
	'MOVIE LISTS',
	'TV SERIES',
	'TV SERIES LISTS',
	'TV SEASONS',
	'TV EPISODES',
	'TV EPISODE GROUPS',
];

const api_key: string | undefined = process.env.API_KEY;

const MediaData = express.Router();

const getMediaData = async (req: Request, res: Response, type: string) => {
	const currentPath = req.originalUrl;

	const { lang } = req;

	console.log(currentPath);

	const { id } = req.params;

	const { page } = req.query;

	if (type !== 'movie' && type !== 'tv') {
		res.status(400).json({ error: 'Invalid endpoint: mediaType must be "movie" or "tv"' });
	}

	let api_url_req: string = '';

	const endpoints: EndpointVerifierInterface[] = [
		{
			// Associated with TV SERIES and MOVIES section, only media details endpoints
			endpoint: ['movie', 'tv'],
			mediaTypeRequired: false,
			idRequired: true,
			mediaId: id,
			lang: lang,
		},
		{
			// Associated with TV SERIES and MOVIES section, but dynamic endpoints
			endpoint: ['reviews', 'similar', 'videos', 'images'],
			mediaTypeRequired: true,
			idRequired: true,
			mediaType: type,
			mediaId: id,
			lang: lang,
		},
		{
			// Associated with MOVIE LISTS and TV SERIES LISTS endpoints
			endpoint: [
				'now_playing',
				'popular',
				'top_rated',
				'upcoming',
				'airing_today',
				'on_the_air',
				'popular',
				'top_rated',
			],
			mediaTypeRequired: true,
			idRequired: false,
			mediaType: type,
			lang: lang,
		},
	];

	api_url_req = endpointVerifier(currentPath, endpointsMoviesAndTvAll, endpoints, api_key);

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
				| TopRatedTvSeriesListInterface;
		} = await axios.get(api_url_req);
		res.json(data);
	} catch (error) {
		const axiosError = error as AxiosError;
		if (
			axios.isAxiosError(axiosError) &&
			axiosError.response &&
			axiosError.response.status === 404
		) {
			res.status(404).json({
				message: `${type.charAt(0).toUpperCase() + type.slice(1)} not found`,
				error: axiosError.message,
			});
		} else {
			res.status(500).json({
				message: `An error occurred while fetching ${type} details`,
				error: axiosError.message,
			});
		}
	}
};

// MEDIA DETAIL
MediaData.get('/movie/:id', (req: Request, res: Response) => {
	getMediaData(req, res, 'movie');
});

MediaData.get('/tv/:id', (req: Request, res: Response) => {
	getMediaData(req, res, 'tv');
});

// MEDIA DETAIL SIMILAR
MediaData.get('/movie/:id/similar', (req: Request, res: Response) => {
	getMediaData(req, res, 'movie');
});

MediaData.get('/tv/:id/similar', (req: Request, res: Response) => {
	getMediaData(req, res, 'tv');
});

// MEDIA VIDEOS
MediaData.get('/movie/:id/videos', (req: Request, res: Response) => {
	getMediaData(req, res, 'movie');
});

MediaData.get('/tv/:id/videos', (req: Request, res: Response) => {
	getMediaData(req, res, 'tv');
});

// MEDIA IMAGES
MediaData.get('/movie/:id/images', (req: Request, res: Response) => {
	getMediaData(req, res, 'movie');
});

MediaData.get('/tv/:id/images', (req: Request, res: Response) => {
	getMediaData(req, res, 'tv');
});

// MEDIA REVIEWS
MediaData.get('/movie/:id/reviews', (req: Request, res: Response) => {
	getMediaData(req, res, 'movie');
});

MediaData.get('/tv/:id/reviews', (req: Request, res: Response) => {
	getMediaData(req, res, 'tv');
});

// MEDIA LISTS

// MOVIE
MediaData.get('/movie/now_playing', (req, res) => getMediaData(req, res, 'movie'));
MediaData.get('/movie/popular', (req, res) => getMediaData(req, res, 'movie'));
MediaData.get('/movie/top_rated', (req, res) => getMediaData(req, res, 'movie'));
MediaData.get('/movie/upcoming', (req, res) => getMediaData(req, res, 'movie'));

MediaData.get('/tv/airing_today', (req, res) => getMediaData(req, res, 'tv'));
MediaData.get('/tv/on_the_air', (req, res) => getMediaData(req, res, 'tv'));
MediaData.get('/tv/popular', (req, res) => getMediaData(req, res, 'tv'));
MediaData.get('/tv/top_rated', (req, res) => getMediaData(req, res, 'tv'));

// TV
// MEDIA LISTS
export { MediaData, endpointsMoviesAndTvAll };
