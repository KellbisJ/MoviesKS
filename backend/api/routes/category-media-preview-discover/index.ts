import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';
import { CategoryMediaPreviewDiscoverInterface } from '../../interfaces/category-media-preview-discover';

dotenv.config();

const categoryMediaPreviewDiscoverRouter = express.Router();

const getCategoryMedia = async (req: Request, res: Response, type: string) => {
	const { with_genres, page } = req.query;
	const api_key: string | undefined = process.env.API_KEY;
	const api_Url: string = `https://api.themoviedb.org/3/discover/${type}?api_key=${api_key}&language=es&with_genres=${with_genres}&page=${page}`;

	try {
		const { data }: { data: CategoryMediaPreviewDiscoverInterface } = await axios.get(api_Url);
		res.json(data);
	} catch (error) {
		const axiosError = error as AxiosError;
		if (axiosError) res.status(500).json({ message: `An error occurred while fetching ${type} by category`, error: axiosError.message });
	}
};

categoryMediaPreviewDiscoverRouter.get('/discover/movie', (req: Request, res: Response) => {
	getCategoryMedia(req, res, 'movie');
});

categoryMediaPreviewDiscoverRouter.get('/discover/tv', (req: Request, res: Response) => {
	getCategoryMedia(req, res, 'tv');
});

export { categoryMediaPreviewDiscoverRouter };
