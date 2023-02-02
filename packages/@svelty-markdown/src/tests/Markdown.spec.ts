import Markdown from '$lib';
import { render, screen } from '@testing-library/svelte';

describe('Markdown Initialization', async () => {
	it('accepts string', async () => {
		render(Markdown, { source: `# Test Heading` });

		const elem = screen.getByText('Test Heading');
		expect(elem).toBeInTheDocument();
		expect(elem).toBeInstanceOf(HTMLHeadingElement);
	});
});
