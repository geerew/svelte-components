<script lang="ts">
	import { renderersKey } from '$lib/contexts/renderers';
	import type { Renderers } from '$lib/types';
	import type { marked } from 'marked';
	import { getContext } from 'svelte';

	export let type: 'link';
	export let raw: string;
	export let href: string;
	export let title: string;
	export let text: string;
	export let tokens: marked.Token[];

	const renderers: Renderers = getContext(renderersKey);

	// Disable warning about unused variables
	type;
	raw;
	text;
</script>

<a {href} {title}>
	{#each tokens as token}
		<svelte:component this={renderers[token.type]} {...token} />
	{/each}
</a>
