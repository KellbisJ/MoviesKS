import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';
import { MovieDetailInterface, TVDetailInterface } from '../../interfaces/detail-media';
import { MovieSimilarInterface, TVSimilarInterface } from '../../interfaces/similar-media';
import { MediaVideosInterface } from '../../interfaces/videos-media';

dotenv.config();

const api_key: string | undefined = process.env.API_KEY;

const MediaData = express.Router();

const getMediaData = async (req: Request, res: Response, type: string) => {
	const currentPath = req.originalUrl;

	const language = req.lang.languageContext;

	console.log(currentPath);

	const { id } = req.params;

	const { page } = req.query;

	if (type !== 'movie' && type !== 'tv') {
		res.status(400).json({ error: 'Invalid endpoint: mediaType must be "movie" or "tv"' });
	}

	let api_url: string = '';

	const isSimilarEndpoint = (path: string, type: string) =>
		path.includes(`/${type}/`) && path.includes('/similar');

	const isVideosEndpoint = (path: string, type: string) =>
		path.includes(`/${type}/`) && path.includes('/videos');

	const isImagesEndpoint = (path: string, type: string) =>
		path.includes(`/${type}/`) && path.includes('/images');

	const isDetailEndpoint = (path: string, type: string) => path.includes(`/${type}/`);

	if (isSimilarEndpoint(currentPath, type)) {
		api_url = `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${api_key}&language=${language}`;
	} else if (isVideosEndpoint(currentPath, type)) {
		api_url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${api_key}&language=${
			language || 'es'
		}`;
		if (page) {
			api_url += page;
		}
	} else if (isImagesEndpoint(currentPath, type)) {
		api_url = `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${api_key}&language=${language}`;
	} else if (isDetailEndpoint(currentPath, type)) {
		api_url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${api_key}&language=${language}`;
	} else {
		res.status(400).json({ error: 'Invalid endpointt' });
		return;
	}

	try {
		const {
			data,
		}: {
			data:
				| MovieDetailInterface
				| TVDetailInterface
				| MovieSimilarInterface
				| TVSimilarInterface
				| MediaVideosInterface;
		} = await axios.get(api_url);
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

export { MediaData };
