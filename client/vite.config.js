console.log('✅ vite.config.js is running — Tailwind v4 + static copy active');

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { resolve } from 'path';

console.log('✅ Output dir:', resolve('dist'));

export default defineConfig({
	base: '/',
	plugins: [
		react(),
		tailwindcss(),
		viteStaticCopy({
			targets: [
				{
					src: 'public/_redirects', // ✅ this file should exist
					dest: '.', // ✅ goes to dist/_redirects
				},
				{
					src: 'public/200.html', // ✅ fallback page
					dest: '.', // ✅ goes to dist/200.html
				},
			],
		}),
	],
});
