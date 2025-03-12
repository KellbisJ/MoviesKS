import { RequestHandler } from 'express';
import helmet from 'helmet';

export const SecurityHeaders: RequestHandler = helmet({
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: ["'self'"],
			objectSrc: ["'none'"],
		},
	},
	referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
});
