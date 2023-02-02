<script lang="ts">
	import type { Renderers } from '$lib';
	import type { marked } from 'marked';

	export let type = 'paragraph';
	export let raw: string;
	export let pre: boolean | undefined = undefined;
	export let text: string;
	export let tokens: marked.Token[];
	export let renderers: Renderers = {};

	// Disable warning about unused variables
	type;
	raw;
	pre;
	text;
</script>

<!-- 
	p will always have more tokens to render, for example
	text || em || strong
-->
<p>
	{#each tokens as token}
		<svelte:component this={renderers[token.type]} {...token} {renderers} />
	{/each}
</p>
