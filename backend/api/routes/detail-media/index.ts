import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';
import { MovieDetailInterface, TVDetailInterface } from '../../interfaces/detail-media';

dotenv.config();

const router = express.Router();

const getMediaDetail = async (req: Request, res: Response, type: string) => {
	const { id } = req.params;
	const api_key: string | undefined = process.env.API_KEY;
	const api_url: string = `https://api.themoviedb.org/3/${type}/${id}?api_key=${api_key}&language=es`;

	try {
		const { data }: { data: MovieDetailInterface | TVDetailInterface } = await axios.get(api_url);
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

router.get('/movie/:id', (req: Request, res: Response) => {
	getMediaDetail(req, res, 'movie');
});

router.get('/tv/:id', (req: Request, res: Response) => {
	getMediaDetail(req, res, 'tv');
});

export default router;
