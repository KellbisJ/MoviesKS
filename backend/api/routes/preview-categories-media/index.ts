import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';
import { PreviewCategoriesMediaInterface } from '../../interfaces/preview-categories-media';

dotenv.config();

const previewCategoriesMediaRouter = express.Router();

const getCategoryList = async (req: Request, res: Response, type: string) => {
	const api_key: string | undefined = process.env.API_KEY;
	const api_url: string = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${api_key}&language=es`;

	try {
		const { data }: { data: PreviewCategoriesMediaInterface } = await axios.get(api_url);
		res.json(data);
	} catch (error) {
		const axiosError = error as AxiosError;
		if (axios.isAxiosError(axiosError)) {
			res.status(500).json({ message: `An error occurred while fetching ${type} categories`, error: axiosError.message });
		}
	}
};

previewCategoriesMediaRouter.get('/genre/movie/list', (req: Request, res: Response) => {
	getCategoryList(req, res, 'movie');
});

previewCategoriesMediaRouter.get('/genre/tv/list', (req: Request, res: Response) => {
	getCategoryList(req, res, 'tv');
});

export { previewCategoriesMediaRouter };
