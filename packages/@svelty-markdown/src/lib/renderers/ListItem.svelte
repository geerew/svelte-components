<script lang="ts">
	import type { Renderers } from '$lib/types';
	import type { marked } from 'marked';

	export let type: 'list_item';
	export let raw: string;
	export let task: boolean;
	export let checked: boolean | undefined = undefined;
	export let loose: boolean;
	export let text: string;
	export let tokens: marked.Token[];
	export let renderers: Renderers;

	// Disable warning about unused variables
	type;
	raw;
	loose;
	text;

	const checkedAttribute = task && checked ? true : undefined;
</script>

<!-- 
	list_item will always have more tokens to render, for
	example text || em || strong
-->
<li>
	{#if task}
		<input type="checkbox" checked={checkedAttribute} />
	{/if}
	{#each tokens as token}
		<svelte:component this={renderers[token.type]} {...token} {renderers} />
	{/each}
</li>
