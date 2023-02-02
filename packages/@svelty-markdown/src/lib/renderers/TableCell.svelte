<script lang="ts">
	import type { Renderers } from '$lib';
	import type { MarkedTableCellAlignment } from '$lib/types';
	import type { marked } from 'marked';

	export let text: string;
	export let tokens: marked.Token[];
	export let align: MarkedTableCellAlignment;
	export let isHead: boolean;
	export let renderers: Renderers = {};

	// Disable warning about unused variables
	text;

	// Is this a head cell (th) or body cell (td)
	const cellTag = isHead ? 'th' : 'td';
</script>

<!-- 
	table_cell will always have more tokens to render, for
	example, text
-->
{#each tokens as token}
	<svelte:element this={cellTag} align={align ? align : undefined}>
		<svelte:component this={renderers[token.type]} {...token} {renderers} />
	</svelte:element>
{/each}
