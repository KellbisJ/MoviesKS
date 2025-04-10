import { RequestHandler } from 'express';
import helmet from 'helmet';

const helmetMiddleware: RequestHandler = helmet({
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: [
				"'self'",
				'trusted-scripts.com',
				'https://www.youtube.com',
				'https://s.ytimg.com',
			],
			styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
			imgSrc: ["'self'", 'https://image.tmdb.org', 'https://i.ytimg.com', 'data:'],
			connectSrc: [
				"'self'",
				'https://api.themoviedb.org/3',
				'https://movies-ks-frontend.vercel.app',
				'https://movies-ks-frontend-git-develop-kellbis-projects.vercel.app',
				'https://movies-ks-backend.vercel.app',
				'https://movies-ks-backend-git-develop-kellbis-projects.vercel.app',
				'https://movies-ks-backend-git-master-kellbis-projects.vercel.app',
			],
			fontSrc: ["'self'", 'fonts.gstatic.com'],
			objectSrc: ["'none'"],
			frameAncestors: ["'self'"],
			frameSrc: [
				"'self'",
				'https://www.youtube.com',
				'https://youtube.com',
				'https://youtube-nocookie.com',
			],
			childSrc: ["'self'", 'https://www.youtube.com'],
			formAction: ["'self'"],
			upgradeInsecureRequests: [],
		},
	},
	frameguard: { action: 'sameorigin' },
	referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
});

const customHeadersMiddleware: RequestHandler = (req, res, next) => {
	res.setHeader(
		'Permissions-Policy',
		'camera=(), geolocation=(), microphone=(), payment=(), fullscreen=(self)'
	);
	res.setHeader('X-Content-Type-Options', 'nosniff');
	res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
	res.setHeader('X-DNS-Prefetch-Control', 'off');

	next();
};

const securityHeadersMiddleware: RequestHandler = (req, res, next) => {
	helmetMiddleware(req, res, () => {
		customHeadersMiddleware(req, res, next);
	});
};

export { securityHeadersMiddleware };
