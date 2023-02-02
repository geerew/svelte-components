import { Markdown } from '$lib';
import { render, screen } from '@testing-library/svelte';

describe('Default Renderers', async () => {
	it('blockquote', async () => {
		render(Markdown, { source: `> blockquote` });
		const parent = document.getElementsByTagName('blockquote')[0];
		const elem = screen.getByText('blockquote');
		expect(elem).toBeInTheDocument();
		expect(parent).toContainElement(elem);
	});

	it('br', async () => {
		render(Markdown, {
			source: `line 1  \nline 2`
		});
		expect(document.getElementsByTagName('br')[0]).toBeInTheDocument();
		const parent = document.getElementsByTagName('p')[0];
		const elem = document.getElementsByTagName('br')[0];
		expect(elem).toBeInTheDocument();
		expect(parent).toContainElement(elem);
	});

	it('code', async () => {
		render(Markdown, {
			source: `    line 1
	line 2
	line 3`
		});
		expect(document.getElementsByTagName('pre')).toHaveLength(1);
		expect(document.getElementsByTagName('code')).toHaveLength(1);
		const parent = document.getElementsByTagName('pre')[0];
		const elem = document.getElementsByTagName('code')[0];
		expect(parent).toContainElement(elem);
		// expect(screen.getByText('code')).toBeInTheDocument();
	});

	it('codespan', async () => {
		render(Markdown, {
			source: `\`codespan\``
		});
		expect(screen.getByText('codespan')).toBeInTheDocument();
	});

	it('del', async () => {
		render(Markdown, {
			source: `~~strike-through~~`
		});
		expect(document.getElementsByTagName('del')[0]).toBeInTheDocument();
	});

	it('em', async () => {
		render(Markdown, {
			source: `*italic*\none*italic*two\n_italic_`
		});
		expect(document.getElementsByTagName('em')).toHaveLength(3);
	});

	it('heading', async () => {
		render(Markdown, {
			source: `# h1\n## h2\n### h3\n#### h4\n##### h5\n###### h6\nanother h1\n=========\nanother 2\n--------`
		});
		expect(document.getElementsByTagName('h1')).toHaveLength(2);
		expect(document.getElementsByTagName('h2')).toHaveLength(2);
		expect(document.getElementsByTagName('h3')[0]).toBeInTheDocument();
		expect(document.getElementsByTagName('h4')[0]).toBeInTheDocument();
		expect(document.getElementsByTagName('h5')[0]).toBeInTheDocument();
		expect(document.getElementsByTagName('h6')[0]).toBeInTheDocument();
	});

	it('hr', async () => {
		render(Markdown, {
			source: `***\n---\n\n___`
		});
		expect(document.getElementsByTagName('hr')).toHaveLength(3);
	});

	it('html', async () => {
		render(Markdown, {
			source: `<br />`
		});
		expect(document.getElementsByTagName('br')[0]).toBeInTheDocument();
	});

	it('image', async () => {
		render(Markdown, {
			source: `![test image](/test.jpg "test image title")`
		});
		expect(document.getElementsByTagName('p')[0]).toBeInTheDocument();
		expect(document.getElementsByTagName('img')[0]).toBeInTheDocument();
		const parent = document.getElementsByTagName('p')[0];
		const elem = document.getElementsByTagName('img')[0];
		expect(parent).toContainElement(elem);
		expect(elem).toHaveAttribute('src', '/test.jpg');
		expect(elem).toHaveAttribute('title', 'test image title');
		expect(elem).toHaveAttribute('alt', 'test image');
	});

	it('link', async () => {
		render(Markdown, {
			source: `[link title](http://jest.com)`
		});
		expect(document.getElementsByTagName('p')[0]).toBeInTheDocument();
		expect(document.getElementsByTagName('a')[0]).toBeInTheDocument();
		const parent = document.getElementsByTagName('p')[0];
		const elem = document.getElementsByTagName('a')[0];
		expect(parent).toContainElement(elem);
		expect(elem).toHaveAttribute('href', 'http://jest.com');
		expect(elem).toHaveTextContent('link title');
	});

	test('paragraph', () => {
		render(Markdown, { source: 'paragraph' });
		const elem = screen.getByText('paragraph');
		expect(elem).toBeInTheDocument();
		expect(elem).toBeInstanceOf(HTMLParagraphElement);
	});

	it('strong', async () => {
		render(Markdown, {
			source: `**strong**\none**strong**two\n__strong__`
		});
		expect(document.getElementsByTagName('strong')).toHaveLength(3);
	});

	it('unordered list', async () => {
		render(Markdown, {
			source: `* item 1\n* item 2\n* item 3`
		});
		expect(document.getElementsByTagName('li')).toHaveLength(3);
		expect(document.getElementsByTagName('ul')).toHaveLength(1);
		const parent = document.getElementsByTagName('ul')[0];
		[...document.getElementsByTagName('li')].forEach((elem) => {
			expect(parent).toContainElement(elem);
		});
	});
});
