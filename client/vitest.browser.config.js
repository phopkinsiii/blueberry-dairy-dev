import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true, // Enables global test functions like describe/it/expect
		environment: 'jsdom', // Allows React component testing with DOM support
		browser: {
			enabled: true, // Only relevant if you use Vitest's browser testing later
			provider: 'preview',
			instances: [],
		},
	},
});
