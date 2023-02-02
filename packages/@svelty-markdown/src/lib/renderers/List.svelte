<script lang="ts">
	import type { Renderers } from '$lib';
	import type { MarkedListItem } from '$lib/types';

	export let type: 'list';
	export let raw: string;
	export let ordered: boolean;
	export let start: number | '';
	export let loose: boolean;
	export let items: MarkedListItem[];
	export let renderers: Renderers = {};

	// Disable warning about unused variables
	type;
	raw;
	loose;

	const elemType = ordered ? 'ol' : 'ul';
	const startAttribute = ordered && +start !== 1 ? +start : undefined;
</script>

<!-- 
	list will always have more tokens to render, for example
	text || em || strong
-->
<svelte:element this={elemType} start={startAttribute}>
	{#each items as item}
		<svelte:component this={renderers[item.type]} {...item} {renderers} />
	{/each}
</svelte:element>
