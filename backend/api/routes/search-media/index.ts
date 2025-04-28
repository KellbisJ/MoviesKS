import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';
import { SearchMediaInterface } from './types';

dotenv.config();

const api_key: string | undefined = process.env.API_KEY;

const SearchMediaRouter = express.Router();

const searchMedia = async (req: Request, res: Response, type: string) => {
	const { query } = req.params;
	const { page = 1 } = req.query;

	const { lang } = req;

	const api_url: string = `https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(
		query
	)}&api_key=${api_key}&language=${lang}&include_adult=false&page=${page}`;

	try {
		const { data }: { data: SearchMediaInterface } = await axios.get(api_url);
		res.json(data);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			if (axiosError.response) {
				const responseData = axiosError.response.data as { status_message: string };

				res.status(axiosError.response.status).json({
					message: `Error searching ${type}: ${responseData.status_message}`,
					error: axiosError.message,
				});
			} else if (axiosError.request) {
				res
					.status(500)
					.json({ message: 'No response received from the server', error: axiosError.message });
			} else {
				res
					.status(500)
					.json({ message: 'An unexpected error occurred', error: axiosError.message });
			}
		} else {
			res.status(500).json({ message: 'An unexpected error occurred', error: String(error) });
		}
	}
};

SearchMediaRouter.get('/search/movie/:query', (req: Request, res: Response) => {
	searchMedia(req, res, 'movie');
});

SearchMediaRouter.get('/search/tv/:query', (req: Request, res: Response) => {
	searchMedia(req, res, 'tv');
});

export { SearchMediaRouter };
