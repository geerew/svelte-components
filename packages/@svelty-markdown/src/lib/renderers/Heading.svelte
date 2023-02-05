<script lang="ts">
	import { renderersKey } from '$lib/contexts/renderers';
	import { sluggerKey } from '$lib/contexts/slugger';
	import type { Renderers } from '$lib/types';
	import type { marked, Slugger } from 'marked';
	import { getContext } from 'svelte';

	export let type: 'heading';
	export let raw: string;
	export let depth: number;
	export let text: string;
	export let tokens: marked.Token[];

	// Get the contexts
	const slugger: Slugger = getContext(sluggerKey);
	const renderers: Renderers = getContext(renderersKey);

	// Disable warning about unused variables
	raw;
	text;
	type;

	/**
	 * Create a slug but first
	 *
	 *  - lowercase
	 *  - remove leading/trailing spaces and new lines
	 *  - change multiple spaces to 1
	 *  - remove all chars except for [a-z] and spaces
	 *  - remove the first space
	 */
	const slug = slugger.slug(
		raw
			.toLowerCase()
			.trim()
			.replace(/ +(?= )/g, '')
			.replace(/[^!\/a-z ].*?/gi, '')
			.replace(/^ /, '')
	);

	const heading = `h${depth}`;
</script>

<!-- 
	heading will always have more tokens to render, for
	example, text
-->
<!--  -->
<svelte:element this={heading} id="#{slug}">
	{#each tokens as token}
		<svelte:component this={renderers[token.type]} {...token} />
	{/each}
</svelte:element>
