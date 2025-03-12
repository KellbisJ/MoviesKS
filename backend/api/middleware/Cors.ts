import cors from 'cors';

const allowedOrigins = [
	'https://movies-ks-frontend.vercel.app',
	'https://movies-ks-backend.vercel.app',
	'https://movies-ks-backend-git-master-kellbis-projects.vercel.app',
	'https://movies-ks-backend-git-types-kellbis-projects.vercel.app',
	'https://movies-ks-frontend-git-types-kellbis-projects.vercel.app',
];

export const CorsOptions: cors.CorsOptions = {
	origin: (origin, callback) => {
		if (process.env.NODE_ENV === 'development') {
			callback(null, true);
		} else if (process.env.NODE_ENV === 'preview' || process.env.NODE_ENV === 'production') {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error(`Not allowed by CORS: ${origin}`));
			}
		}
	},
	credentials: true,
};

export const CorsMiddleware = cors(CorsOptions);
