<script lang="ts">
	import { renderersKey } from '$lib/contexts/renderers';
	import type { Renderers } from '$lib/types';
	import type { marked } from 'marked';
	import { getContext } from 'svelte';

	export let type = 'paragraph';
	export let raw: string;
	export let pre: boolean | undefined = undefined;
	export let text: string;
	export let tokens: marked.Token[];

	const renderers: Renderers = getContext(renderersKey);

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
		<svelte:component this={renderers[token.type]} {...token} />
	{/each}
</p>
