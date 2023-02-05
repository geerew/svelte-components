<script lang="ts">
	import { renderersKey } from '$lib/contexts/renderers';
	import type { Renderers } from '$lib/types';
	import { decode } from 'he';
	import type { marked } from 'marked';
	import { getContext } from 'svelte';

	export let type = 'text';
	export let raw: string;
	export let text: string;
	export let tokens: marked.Token[] | undefined = undefined;

	const renderers: Renderers = getContext(renderersKey);

	// Disable warning about unused variables
	type;
	raw;

	console.log(text);

	// Decode the text (incase it contains encodings)
	const decoded = decode(text);
	console.log('de', decoded);
</script>

<!-- 
	text may have more tokens to render, for example,
	a list
-->
{#if tokens && tokens.length > 0}
	{#each tokens as token}
		<svelte:component this={renderers[token.type]} {...token} />
	{/each}
{:else}
	{decoded}
{/if}
