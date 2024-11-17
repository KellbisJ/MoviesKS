import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': {
				target: 'https://api.themoviedb.org/3',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
});
// creating a proxy to avoid CORS problem
// this will redirect all the requests starting with /api to the target url
// and remove /api from the path before sending the request to the target url
// this is done to avoid 404 error as the target url does not have /api in its path
