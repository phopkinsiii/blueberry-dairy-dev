console.log('✅ vite.config.js is running — Tailwind v4 + static copy active');

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	base: '/',
	plugins: [
		react(),
		tailwindcss(),
	],
});
