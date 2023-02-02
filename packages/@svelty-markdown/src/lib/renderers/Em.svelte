<script lang="ts">
	import type { Renderers } from '$lib/types';
	import type { marked } from 'marked';

	export let type = 'em';
	export let raw: string;
	export let text: string;
	export let tokens: marked.Token[];
	export let renderers: Renderers = {};

	// Disable warning about unused variables
	raw;
	text;
	type;
</script>

<!-- 
	em will always have more tokens to render, for
	example, text || strong
-->
<em>
	{#each tokens as token}
		<svelte:component this={renderers[token.type]} {...token} {renderers} />
	{/each}
</em>
