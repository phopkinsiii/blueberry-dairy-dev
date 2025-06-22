console.log('✅ vite.config.js is running — Tailwind v4 + static copy active');

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	base: '/',
	plugins: [
		react(),
		tailwindcss(),
		viteStaticCopy({
			targets: [
				{
					src: 'public/_redirects',
					dest: '.', // → dist/_redirects
				},
			],
		}),
	],
});
