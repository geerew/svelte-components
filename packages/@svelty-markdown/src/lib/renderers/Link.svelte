<script lang="ts">
	import type { Renderers } from '$lib';
	import type { marked } from 'marked';

	export let type: 'link';
	export let raw: string;
	export let href: string;
	export let title: string;
	export let text: string;
	export let tokens: marked.Token[];
	export let renderers: Renderers;

	// Disable warning about unused variables
	type;
	raw;
	text;
</script>

<a {href} {title}>
	{#each tokens as token}
		<svelte:component this={renderers[token.type]} {...token} {renderers} />
	{/each}
</a>
