import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';
import { PreviewCategoriesMediaInterface } from '../../interfaces/preview-categories-media';
import { CategoryMediaPreviewDiscoverInterface } from '../../interfaces/category-media-preview-discover';

dotenv.config();

const api_key: string | undefined = process.env.API_KEY;
const MediaGenresAndDiscover = express.Router();

const getGenresAndDiscoverData = async (req: Request, res: Response, type: string) => {
	const currentPath = req.originalUrl;
	console.log(currentPath);

	let api_url: string = '';

	if (currentPath.includes('/genre/')) {
		// Only genre list.
		api_url = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${api_key}&language=es`;
	} else if (currentPath.includes('/discover/')) {
		// Discover by genres
		api_url = `https://api.themoviedb.org/3/discover/${type}?api_key=${api_key}&language=es`;
		const { with_genres, page } = req.query;
		if (with_genres) {
			api_url += `&with_genres=${with_genres}`;
		}
		if (page) {
			api_url += `&page=${page}`;
		}
	} else {
		res.status(400).json({ error: 'Invalid endpoint' });
		return;
	}

	try {
		const {
			data,
		}: { data: PreviewCategoriesMediaInterface | CategoryMediaPreviewDiscoverInterface } =
			await axios.get(api_url);
		res.json(data);
	} catch (error) {
		const axiosError = error as AxiosError;
		if (axios.isAxiosError(axiosError)) {
			res.status(500).json({
				message: `An error occurred while fetching ${type} categories`,
				error: axiosError.message,
			});
		}
	}
};

MediaGenresAndDiscover.get('/genre/movie/list', (req: Request, res: Response) => {
	getGenresAndDiscoverData(req, res, 'movie');
});

MediaGenresAndDiscover.get('/genre/tv/list', (req: Request, res: Response) => {
	getGenresAndDiscoverData(req, res, 'tv');
});

MediaGenresAndDiscover.get('/discover/movie', (req: Request, res: Response) => {
	getGenresAndDiscoverData(req, res, 'movie');
});

MediaGenresAndDiscover.get('/discover/tv', (req: Request, res: Response) => {
	getGenresAndDiscoverData(req, res, 'tv');
});

export { MediaGenresAndDiscover };
