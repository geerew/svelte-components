<script lang="ts">
	import type { Renderers } from '$lib/types';
	import { decode } from 'he';
	import type { marked } from 'marked';

	export let type = 'text';
	export let raw: string;
	export let text: string;
	export let tokens: marked.Token[] | undefined = undefined;
	export let renderers: Renderers;

	// Disable warning about unused variables
	type;
	raw;

	// Decode the text (incase it contains encodings)
	const decoded = decode(text);
</script>

<!-- 
	text may have more tokens to render, for example,
	a list
-->
{#if tokens && tokens.length > 0}
	{#each tokens as token}
		<svelte:component this={renderers[token.type]} {...token} {renderers} />
	{/each}
{:else}
	{decoded}
{/if}
