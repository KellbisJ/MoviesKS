import { PreviewMoviesInterface } from '../../interfaces/trending-preview-movies';
import { PreviewTvInterface } from '../../interfaces/trending-preview-tv';

import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';

import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const getTrendingMedia = async (req: Request, res: Response, type: string) => {
	const { page } = req.query;
	const api_key: string | undefined = process.env.API_KEY;
	let api_url: string = `https://api.themoviedb.org/3/trending/${type}/day?api_key=${api_key}&language=es`;

	if (page) {
		api_url += `&page=${page}`;
	}

	try {
		const { data }: { data: PreviewMoviesInterface | PreviewTvInterface } = await axios.get(api_url);
		res.json(data);
	} catch (error) {
		const axiosError = error as AxiosError;
		if (axios.isAxiosError(axiosError) && axiosError.response && axiosError.response.status === 404) {
			res.status(404).json({ message: `No trending ${type} found`, error: axiosError.message });
		} else {
			res.status(500).json({ message: `An error occurred while fetching trending ${type}`, error: axiosError.message });
		}
	}
};

router.get('/trending/movie/day', (req: Request, res: Response) => {
	getTrendingMedia(req, res, 'movie');
});

router.get('/trending/tv/day', (req: Request, res: Response) => {
	getTrendingMedia(req, res, 'tv');
});

export default router;
