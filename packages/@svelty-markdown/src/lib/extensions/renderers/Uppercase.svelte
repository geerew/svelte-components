<script lang="ts">
	import type { Renderers } from '$lib/types';
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
	<svelte:component this={renderers[token.type]} {...token} {renderers} />
{/each}
