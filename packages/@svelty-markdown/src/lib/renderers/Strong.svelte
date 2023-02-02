<script lang="ts">
	import type { Renderers } from '$lib';
	import type { marked } from 'marked';

	export let type = 'strong';
	export let raw: string;
	export let text: string;
	export let tokens: marked.Token[];
	export let renderers: Renderers = {};

	// Disable warning about unused variables
	type;
	raw;
	text;
</script>

<!-- 
	strong will always have more tokens to render, for
	example, text || em
-->
<strong>
	{#each tokens as token}
		<svelte:component this={renderers[token.type]} {...token} {renderers} />
	{/each}
</strong>
