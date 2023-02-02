# @svelty/markdown

An extensible markdown parser that renders into Svelte components

It is a typescript reworking of [svelte-markdown](https://github.com/pablo-abc/svelte-markdown) with some enhancements

## Installation

Install with your package manager of choice, for example

```
pnpm add @svelty/markdown
```

## Usage

```html
<script lang="ts">
	import { Markdown } from '$lib';

	const source = `# H1 Header
	
A simple paragraph with some _italic_, **strong** and ~~unpopular~~ text.

Some inline \`code\`

> A little quote to brighten your day

##### Time for a code block

	line one
	line two
		line three
	line four

* list item 1
* list item 2
	5. order list item start at 5
	6. next item, sure why now
* back to unordered unfortunately

Now it's time for some jobs

* [ ] Clean room
* [ ] Seriously, clean room
* [x] Have coffee
* [x] Read book on how to clean room

#### Oh, how the (aligned) turned tables...

| left align | Center Me Please | Righty is alright |
|:---        |:---:             | ---:              |
| <-         | <->              | ->                |
`;
</script>

<Markdown {source} />
```

Will produce the following HTML

```html
<h1>H1 Header</h1>

<p>
	A simple paragraph with some <em>italic</em>, <strong>strong</strong> and
	<del>unpopular</del> text.
</p>

<p>Some inline <code>code</code></p>

<blockquote>
	<p>A little quote to brighten your day</p>
</blockquote>

<h5>Time for a code block</h5>
<pre>
    <code>    line one
    line two
        line three
    line four</code>
</pre>

<ul>
	<li>list item 1</li>
	<li>
		list item 2
		<ol start="5">
			<li>order list item start at 5</li>
			<li>next item, sure why now</li>
		</ol>
	</li>
	<li>back to unordered unfortunately</li>
</ul>

<p>Now it's time for some jobs</p>
<ul>
	<li><input type="checkbox" /> Clean room</li>
	<li><input type="checkbox" /> Seriously, clean room</li>
	<li><input type="checkbox" /> Have coffee</li>
	<li><input type="checkbox" /> Read book on how to clean room</li>
</ul>

<h4>Oh, how the (aligned) turned tables</h4>
<table>
	<thead>
		<tr>
			<th align="left">left align</th>
			<th align="center">Center Me Please</th>
			<th align="right">Righty is alright</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td align="left">&lt;-</td>
			<td align="center">&lt;-&gt;</td>
			<td align="right">-&gt;</td>
		</tr>
	</tbody>
</table>
```

## Props

The `<Markdown .../>` component accepts the following props

- `source` - A string

- `renderers` (_optional_) - A key/value pair of renderers, whereby the key is a string and the value is a Svelte component. Renderers are the backbone of `@svelty/markdown`. The default renderers can be found [here](./src/lib/renderers/). This property allow [overriding](#override-existing-renderer) existing renderers or creating [new](#custom-tokenizer-and-renderer) renderers

- `tokenizers` (_optional_) - An array of custom tokenizers. See [Tokenziers](#custom-tokenizer-and-renderer) for an example of how to create a tokenizer and associate it with a renderer

- `options` (_optional_) - Overriding markedjs [options](https://marked.js.org/using_advanced#options)

- `isInline` (_optional_) - Only parse `source` for inline elements, such as italics, bold, code, etc, as opposed to block elements, such as heading, codespan, hr, etc

- `debug` (_optional_) - When `debug={true}` is passed in, the resulting object will be rendered to the page

## Markdown -> Svelte

When a markdown string is parsed, the result is an easily traversable array of objects

For example, `` `# H1 Header` `` will result in the following

```json
[
	{
		"type": "heading",
		"raw": "# My Header\n",
		"depth": 1,
		"text": "My Header",
		"tokens": [
			{
				"type": "text",
				"raw": "My Header",
				"text": "My Header"
			}
		]
	}
]
```

In the above example, there is 1 token in the array with the type `heading` and a `depth` of 1 (ranging from 1-6 or h1-h6). This `heading` token also contains a tokens array, consisting of 1 token, with the type `text`

With this information, we know to render an `<h1>...</h1>` tag, with the text `My Header`

`@svelty/markdown` iterates through this structure, matching the type with predefined Svelte components. For example, a type of `heading` results in [Heading.svelte](./src/lib/renderers/Heading.svelte) being rendered. `Heading.Svelte` will inturn iterate over child tokens and render the relevant Svelte components accordingly. This is made possible with `<svelte:component ... />` and `<svelte:element ... />`

The types and their associated Svelte components are defined in [index.ts](./src/lib/renderers/index.ts)

## Events

A `parsed` event will be dispatched when the source has be parsed. This give access to the tokens, allowing for additional needs, such as generating a ToC (Table of Contents) from the headings.

```html
<script lang="ts">
	import { Markdown } from '@svelty/markdown';
	import type { marked } from 'marked';

	const source = `# Hello`;

	function parsed(event: CustomEvent<marked.Token[] | marked.TokensList>) {
		console.log(event.detail);
	}
</script>

<Markdown {source} on:parsed="{parsed}" />
```

## Override existing renderer

In this example, `codespan` will be overridden so that the text is red and enclosed in square brackets

_Note: Depending on type being overridden, different exported variables need to be defined. Look at the [Svelte component](./src/lib/renderers/) being overridden for a better understanding of what to export. Not all exported variables will be used within the component, however, they must still be exported for future proofing_

Create a new `codespan` Svelte component:

```html
<!-- CodeSpanOverride.svelte -->
<script lang="ts">
	import type { Renderers } from '$lib';

	export let type = 'codespan';
	export let raw: string;
	export let text: string;
	export let renderers: Renderers;

	// Disable warning about unused variables
	type;
	text;
	renderers;
</script>

<code style="color: red;">[{raw.substring(1, raw.length - 1)}]</code>
```

Add `renderers={}` to `<Markdown .../>`, to override the existing `codespan` type with the new Svelte component

```html
<!-- +page.svelte -->
<script lang="ts">
	import { Markdown } from '@Svelty/markdown';
	import CodeSpanNew from '$lib/CodeSpanNew.svelte';

	const source = 'This is a `codespan` that is red and enclosed in [...]';
</script>

<Markdown {source} renderers={{ codespan: CodeSpanNew }} />
```

## Custom tokenizer and renderer

Tokenizers are used during the parsing of the markdown and define the type, for example, the type will be `heading` when `# ...` is passed in

As a demonstration, we will create a tokenizer to `uppercase` text, when it is enclosed in `^` or `^^`

This tokenizer wll be considered inline, and will contain 1 child token (`text`) at the very least, but may contain more, such as bold, italics, strike-through, etc if there are additional markdown tags within the uppercase tags

For example

As an example

```
`Some ^___text___^ to ^^uppercase^^` will result in **_HELLO_**

Some ^text^ to ^^uppercase^^
```

should result in

Some **_TEXT_** to UPPERCASE

### Tokenizer

The main parts of the tokenizer are name, level (block or inline), start function and tokenizer function

The tokenizer function is responsible for identifying if we have a match (using regex) and builds the data that will be passed to the render (Svelte component)

For example, an uppercase tokenizer may look like

Note: This tokenizer returns the text in uppercase and passes the uppercase variant along for further lexing. Most of the default tokenizers leave the matched text untouched and instead rely upon HTML tags, such as `p`, `em`, `strong`, etc. However, this tokenizer must update the text inline or future lexing will result in that part being in lowercase

```typescript
// $lib/uppercaseTokenizer.ts
import type { marked } from 'marked';

export const uppercaseTokenizer: marked.TokenizerExtension = {
	name: 'uppercase',
	level: 'inline',
	start(src: string) {
		return src.indexOf('^');
	},
	tokenizer(src: string) {
		const rule = /^(\^\^?)(?=[^\s\^])([\s\S]*?[^\s\^])\1(?=[^\^]|$)/;
		const match = rule.exec(src);
		if (match) {
			return {
				type: 'uppercase',
				raw: match[0],
				text: match[2].toUpperCase(),
				tokens: this.lexer.inlineTokens(match[2].toUpperCase())
			};
		}
	}
};
```

With this in place, pass `tokenizers={[uppercaseTokenizer]}` into `<Markdown .../>`

With a source of `^uppercase^`, the parsed object will output

```json
[
	{
		"type": "paragraph",
		"raw": "^uppercase^",
		"text": "^uppercase^",
		"tokens": [
			{
				"type": "uppercase",
				"raw": "^uppercase^",
				"text": "UPPERCASE",
				"tokens": [
					{
						"type": "text",
						"raw": "UPPERCASE",
						"text": "UPPERCASE"
					}
				]
			}
		]
	}
]
```

### New Renderer

With the tokenizer in place, a renderer needs to be provided that matches the type `uppercase`

An example would be

```html
<!-- $lib/Uppercase.svelte -->
<script lang="ts">
	import type { Renderers } from '$lib';
	import type { marked } from 'marked';

	export let type = 'uppercase';
	export let raw: string;
	export let text: string;
	export let tokens: marked.Token[];
	export let renderers: Renderers;

	// Disable warning about unused variables
	type;
	raw;
	text;
</script>

<!-- 
    Making the text uppercase is done within the tokenizer, 
    instead of here. This is so child tokens are in uppercase 
    too 

	uppercase will always have more tokens to render, for
	example, text || em || strong
-->
{#each tokens as token}
<svelte:component this="{renderers[token.type]}" {...token} {renderers} />
{/each}
```

With this in place, pass `renderers={{ uppercase: Uppercase }}` into `<Markdown .../>`

A completed `+page.svelte` might look like

```html
<script lang="ts">
	import { Markdown } from '@svelty/markdown';
	import Uppercase from '$lib/extensions/renderers/Uppercase.svelte';
	import { uppercaseTokenizer } from '$lib/extensions/tokenizers/uppercase';

	const source = `^uppercase^`;
</script>

<Markdown {source} tokenizers={[uppercaseTokenizer]} renderers={{ uppercase: Uppercase }} />
```

## Default renders

This is a list of the default [renderers](./src/lib/renderers)

- `Blockquote` - Block quote (`<blockquote>`)
- `Br` - Line break (`<br />`)
- `Code` - Code block (`<pre><code>`)
- `CodeSpan` - Inline code (`<code>`)
- `Del` - Strike-through (`<del>`)
- `Em` - Emphasis (`<em>`)
- `Heading` - Heading (`<h1>` - `<h6>`)
- `Hr` - Horizontal rule (`<hr>`)
- `Html` - HTML node
- `Image` - Image (`<img>`)
- `Link` - Link (`<a>`)
- `List` - List (ordered and unordered) (`<ul>`/`<ol>`)
- `ListItem` - List item (`<li>`)
- `Paragraph` - Paragraph (`<p>`)
- `Strong` - Bold (`<strong>`)
- `table` - Table (`<table>`)
- `TableBody` - Table body (`<tbody>`)
- `TableCell` - Table cell (`<td>`/`<th>`)
- `TableHeader` - Table head (`<thead>`)
- `TableRow` - Table row (`<tr>`)
- `text` - Text rendered inside of other elements

### Extensions

The extension can be found in `$lib/extensions`

Each renderer will be pared with a tokenizer, unless overriding a default renderer

To use these extension update `<Markdown .../>` to include `renderers` and `tokenizers`

- `Uppercase` - Uppercase text

## Authors

- Michael Bell
