<script lang="ts">
	import type { Renderers } from '$lib/types';
	import type { marked } from 'marked';

	export let type = 'del';
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
	del will always have more tokens to render, for
	example, text || em || strong
-->
<del>
	{#each tokens as token}
		<svelte:component this={renderers[token.type]} {...token} {renderers} />
	{/each}
</del>
