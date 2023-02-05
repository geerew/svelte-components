<script lang="ts">
	import type { Renderers } from '$lib';
	import { renderersKey } from '$lib/contexts/renderers';
	import type { MarkedListItem } from '$lib/types';
	import { getContext } from 'svelte';

	export let type: 'list';
	export let raw: string;
	export let ordered: boolean;
	export let start: number | '';
	export let loose: boolean;
	export let items: MarkedListItem[];

	const renderers: Renderers = getContext(renderersKey);

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
		<svelte:component this={renderers[item.type]} {...item} />
	{/each}
</svelte:element>
