import express, { Request, Response, NextFunction } from 'express';
import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';
import {
	NowPlayingMoviesListInterface,
	PopularMoviesInterface,
	TopRatedMoviesListInterface,
	UpcomingMoviesListInterface,
} from '../../interfaces/movie-lists';
import {
	AiringTodayTvSeriesListInterface,
	OnTheAirTvSeriesListInterface,
	PopularTvSeriesInterface,
	TopRatedTvSeriesListInterface,
} from '../../interfaces/tv-series-lists';

dotenv.config();

const mediaListRouter = express.Router();

enum ListTypeMovies {
	nowPlaying = 'now_playing',
	popular = 'popular',
	topRated = 'top_rated',
	upcoming = 'upcoming',
}

enum ListTypeTvSeries {
	airingToday = 'airing_today',
	onTheAir = 'on_the_air',
	popular = 'popular',
	top_rated = 'top_rated',
}

const getMediaLists = async (req: Request, res: Response, type: string, listType: ListTypeMovies | ListTypeTvSeries) => {
	const { page } = req.query;

	const api_key: string | undefined = process.env.API_KEY;

	let api_url: string = `https://api.themoviedb.org/3/${type}/${listType}?api_key=${api_key}&language=es`;

	if (page) {
		api_url += `&page=${page}`;
	}

	try {
		const { data } = await axios.get<
			| NowPlayingMoviesListInterface
			| PopularMoviesInterface
			| TopRatedMoviesListInterface
			| UpcomingMoviesListInterface
			| AiringTodayTvSeriesListInterface
			| OnTheAirTvSeriesListInterface
			| PopularTvSeriesInterface
			| TopRatedTvSeriesListInterface
		>(api_url);
		res.json(data);
	} catch (error) {
		const axiosError = error as AxiosError;
		if (axios.isAxiosError(axiosError) && axiosError.response && axiosError.response.status === 404) {
			res.status(404).json({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} not found`, error: axiosError.message });
		} else {
			res.status(500).json({ message: `An error occurred while fetching ${type} details`, error: axiosError.message });
		}
	}
};

mediaListRouter.get(`/movie/${ListTypeMovies.nowPlaying}`, (req, res) => getMediaLists(req, res, 'movie', ListTypeMovies.nowPlaying));
mediaListRouter.get(`/movie/${ListTypeMovies.popular}`, (req, res) => getMediaLists(req, res, 'movie', ListTypeMovies.popular));
mediaListRouter.get(`/movie/${ListTypeMovies.topRated}`, (req, res) => getMediaLists(req, res, 'movie', ListTypeMovies.topRated));
mediaListRouter.get(`/movie/${ListTypeMovies.upcoming}`, (req, res) => getMediaLists(req, res, 'movie', ListTypeMovies.upcoming));

mediaListRouter.get(`/tv/${ListTypeTvSeries.airingToday}`, (req, res) => getMediaLists(req, res, 'tv', ListTypeMovies.nowPlaying));
mediaListRouter.get(`/tv/${ListTypeTvSeries.onTheAir}`, (req, res) => getMediaLists(req, res, 'tv', ListTypeMovies.popular));
mediaListRouter.get(`/tv/${ListTypeTvSeries.popular}`, (req, res) => getMediaLists(req, res, 'tv', ListTypeMovies.topRated));
mediaListRouter.get(`/tv/${ListTypeTvSeries.top_rated}`, (req, res) => getMediaLists(req, res, 'tv', ListTypeMovies.upcoming));

export { mediaListRouter };
