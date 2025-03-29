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
	// server: {
	// 	host: '0.0.0.0',
	// }, // this for allow to see your project on local from your mobile media, Idk why the data can be accessed on mobile, if anyone can solve and explain why, I will be glad and thankful.
});
