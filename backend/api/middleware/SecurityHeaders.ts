import { RequestHandler } from 'express';
import helmet from 'helmet';

export const SecurityHeaders: RequestHandler = (req, res, next) => {
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				scriptSrc: ["'self'", 'trusted-scripts.com', 'https://www.youtube.com', 'https://s.ytimg.com'],
				styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
				imgSrc: ["'self'", 'https://image.tmdb.org', 'https://i.ytimg.com', 'data:'],
				connectSrc: ["'self'", 'https://api.themoviedb.org/3'],
				fontSrc: ["'self'", 'fonts.gstatic.com'],
				objectSrc: ["'none'"],
				frameAncestors: ["'none'"],
				frameSrc: ["'self'", 'https://www.youtube.com', 'https://youtube.com', 'https://youtube-nocookie.com'],
				childSrc: ["'self'", 'https://www.youtube.com'],
				formAction: ["'self'"],
				upgradeInsecureRequests: [],
			},
		},
		referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
	})(req, res, () => {});

	res.setHeader('Permissions-Policy', 'camera=(), geolocation=(), microphone=(), payment=(), fullscreen=(self)');
	res.setHeader('X-Content-Type-Options', 'nosniff');
	res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
	res.setHeader('X-DNS-Prefetch-Control', 'off');

	next();
};
