import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	build: {
		outDir: 'dist',
		assetsDir: 'assets',
	},
	root: './',
	publicDir: true,
	server: {
		host: '0.0.0.0',
	},
});
