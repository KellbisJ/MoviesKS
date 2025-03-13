import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';
import { MediaVideosInterface } from '../../interfaces/videos-media';

dotenv.config();

const mediaImagesRouter = express.Router();

const getMediaImages = async (req: Request, res: Response, type: string) => {
	const { id } = req.params;
	const api_key: string | undefined = process.env.API_KEY;
	const api_url: string = `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${api_key}&language=es`;

	try {
		const { data }: { data: MediaVideosInterface } = await axios.get(api_url);
		res.json(data);
	} catch (error) {
		const axiosError = error as AxiosError;
		if (axios.isAxiosError(axiosError) && axiosError.response && axiosError.response.status === 404) {
			res.status(404).json({ message: `Videos from ${type} not found`, error: axiosError.message });
		} else {
			res.status(500).json({ message: `An error occurred while fetching videos ${type}`, error: axiosError.message });
		}
	}
};

mediaImagesRouter.get('/movie/:id/images', (req: Request, res: Response) => {
	getMediaImages(req, res, 'movie');
});

mediaImagesRouter.get('/tv/:id/images', (req: Request, res: Response) => {
	getMediaImages(req, res, 'tv');
});

export { mediaImagesRouter };
