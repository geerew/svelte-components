<script lang="ts">
	import type { Renderers } from '$lib';
	import type { marked } from 'marked';

	export let type: 'heading';
	export let raw: string;
	export let depth: number;
	export let text: string;
	export let tokens: marked.Token[];
	export let renderers: Renderers = {};

	// Disable warning about unused variables
	raw;
	text;
	type;

	const heading = `h${depth}`;
</script>

<!-- 
	heading will always have more tokens to render, for
	example, text
-->
<svelte:element this={heading}>
	{#each tokens as token}
		<svelte:component this={renderers[token.type]} {...token} {renderers} />
	{/each}
</svelte:element>
