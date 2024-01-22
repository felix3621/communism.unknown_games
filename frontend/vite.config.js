import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		proxy: {
			'/api': 'http://localhost:3000',
			'/socket': 'ws://localhost:3001'
		}
	},
	plugins: [sveltekit()]
});
