import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';
import {
	MovieDetailInterface,
	TVDetailInterface,
	MovieSimilarInterface,
	TVSimilarInterface,
	MediaVideosInterface,
	MediaImagesInterface,
	MediaReviewInterface,
} from './types';

dotenv.config();

const api_key: string | undefined = process.env.API_KEY;

const MediaData = express.Router();

const getMediaData = async (req: Request, res: Response, type: string) => {
	const currentPath = req.originalUrl;

	const { lang } = req;

	console.log(currentPath);

	const { id } = req.params;

	const { page } = req.query;

	if (type !== 'movie' && type !== 'tv') {
		res.status(400).json({ error: 'Invalid endpoint: mediaType must be "movie" or "tv"' });
	}

	let api_url: string = '';

	function endpointVerifier(
		path: string,
		type: string
	): string | express.Response<any, Record<string, any>> {
		if (path.includes(`/${type}/`) && path.includes('/reviews')) {
			api_url = `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${api_key}&language=${lang}`;
			return 'isReviewsEndpoint';
		}
		if (path.includes(`/${type}/`) && path.includes('/similar')) {
			api_url = `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${api_key}&language=${lang}`;
			return 'isSimilarEndpoint';
		}
		if (path.includes(`/${type}/`) && path.includes('/videos')) {
			api_url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${api_key}&language=${lang}`;
			// 	if (page) {
			// 		api_url += page;
			// 	}
			return 'isVideosEndpoint';
		}
		if (path.includes(`/${type}/`) && path.includes('/images')) {
			api_url = `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${api_key}&language=${lang}`;
			return 'isImagesEndpoint';
		}
		if (path.includes(`/${type}/`)) {
			api_url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${api_key}&language=${lang}`;
			return 'isDetailEndpoint';
		}

		return res.status(400).json({ error: 'Invalid endpointt' });
	}

	endpointVerifier(currentPath, type);

	try {
		const {
			data,
		}: {
			data:
				| MovieDetailInterface
				| TVDetailInterface
				| MovieSimilarInterface
				| TVSimilarInterface
				| MediaVideosInterface
				| MediaImagesInterface
				| MediaReviewInterface;
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

// MEDIA REVIEWS
MediaData.get('/movie/:id/reviews', (req: Request, res: Response) => {
	getMediaData(req, res, 'movie');
});

MediaData.get('/tv/:id/reviews', (req: Request, res: Response) => {
	getMediaData(req, res, 'tv');
});

export { MediaData };
