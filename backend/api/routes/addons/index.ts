import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';
import { LanguagesInterface } from './types';
import { EndpointVerifierInterface } from '../../utils/endpointVerifier';
import { endpointVerifier } from '../../utils/endpointVerifier';

dotenv.config();

const ConfigurationsAPI = express.Router();

const api_key: string | undefined = process.env.API_KEY;

// configurations

const searchMedia = async (req: Request, res: Response) => {
	// const language = req.lang.languageContext;
	const currentPath = req.originalUrl;

	let api_url: string = '';

	const endpoints: EndpointVerifierInterface[] = [
		{
			paths: ['configuration/languages'],
		},
		{
			paths: ['configuration/primary_translations'],
		},
	];

	api_url = endpointVerifier(currentPath, endpoints, api_key);
	try {
		const { data }: { data: LanguagesInterface[] | string[] } = await axios.get(api_url);
		res.json(data);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			if (axiosError.response) {
				const responseData = axiosError.response.data as { status_message: string };

				res.status(axiosError.response.status).json({
					message: `Error: ${responseData.status_message}`,
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

ConfigurationsAPI.get('/configuration/languages', (req: Request, res: Response) => {
	searchMedia(req, res);
});
ConfigurationsAPI.get('/configuration/primary_translations', (req: Request, res: Response) => {
	searchMedia(req, res);
});

export { ConfigurationsAPI };
