import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';
import { LanguagesInterface } from './types';

dotenv.config();

const ConfigurationsAPI = express.Router();

const api_key: string | undefined = process.env.API_KEY;

const searchMedia = async (req: Request, res: Response) => {
	// const language = req.lang.languageContext;

	let api_url: string = `
https://api.themoviedb.org/3/configuration/languages?api_key=${api_key}`;

	try {
		const { data }: { data: LanguagesInterface[] } = await axios.get(api_url);
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

ConfigurationsAPI.get('/configurations/languages', (req: Request, res: Response) => {
	searchMedia(req, res);
});

export { ConfigurationsAPI };
