import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.ts'],
		// Extend jest-dom matchers
		setupFiles: ['./src/tests/setupTest.ts']
	}
};

export default config;
