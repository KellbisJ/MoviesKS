import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const allowedOrigins = [
	'https://movies-ks-frontend.vercel.app',
	'https://movies-ks-frontend-git-develop-kellbis-projects.vercel.app',
	'https://movies-ks-backend.vercel.app',
	'https://movies-ks-backend-git-develop-kellbis-projects.vercel.app',
];

export const CorsOptions: cors.CorsOptions = {
	origin: (origin, callback) => {
		console.log('origin:', origin);

		if (!origin) return callback(null, true);

		if (process.env.NODE_ENV === 'development') {
			return callback(null, true);
		}
		if (process.env.NODE_ENV === 'test') {
			return callback(null, true);
		}

		if (allowedOrigins.includes(origin)) {
			return callback(null, true);
		}

		callback(new Error(`Origin '${origin}' not allowed by CORS`));
	},
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};
export const CorsMiddleware = cors(CorsOptions);
