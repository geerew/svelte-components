<script lang="ts">
	import { renderersKey } from '$lib/contexts/renderers';
	import type { Renderers } from '$lib/types';
	import type { marked } from 'marked';
	import { getContext } from 'svelte';

	export let type = 'em';
	export let raw: string;
	export let text: string;
	export let tokens: marked.Token[];

	const renderers: Renderers = getContext(renderersKey);

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
		<svelte:component this={renderers[token.type]} {...token} />
	{/each}
</em>
