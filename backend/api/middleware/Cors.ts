import cors from 'cors';

const allowedOrigins = [
	'https://movies-ks-frontend.vercel.app',
	'https://movies-ks-frontend-git-develop-kellbis-projects.vercel.app',
	'https://movies-ks-backend.vercel.app',
	'https://movies-ks-backend-git-master-kellbis-projects.vercel.app',
	'https://movies-ks-backend-git-develop-kellbis-projects.vercel.app',
];

export const CorsOptions: cors.CorsOptions = {
	origin: allowedOrigins,
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

export const CorsMiddleware = cors(CorsOptions);
