import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';
import { PopularMoviesInterface, MoviePopularInterface } from '../../interfaces/movie-lists/PopularMovies';
import { PopularTvSeriesInterface, TvSeriePopularInterface } from '../../interfaces/tv-lists/PopularTvSeries';

dotenv.config();

const router = express.Router();

const getMediaListPopular = async (res: Response, type: string) => {
	const api_key: string | undefined = process.env.API_KEY;
	const api_url: string = `https://api.themoviedb.org/3/${type}/popular?api_key=${api_key}&language=es`;

	try {
		const { data }: { data: PopularMoviesInterface | PopularTvSeriesInterface } = await axios.get(api_url);
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

router.get('/movie/popular', (res: Response) => {
	getMediaListPopular(res, 'movie');
});

router.get('/tv/popular', (res: Response) => {
	getMediaListPopular(res, 'tv');
});

export default router;
