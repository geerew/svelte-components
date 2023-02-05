<script lang="ts">
	import type { Renderers } from '$lib';
	import { renderersKey } from '$lib/contexts/renderers';
	import type { MarkedTableCell, MarkedTableCellAlignment } from '$lib/types';
	import { getContext } from 'svelte';

	export let row: MarkedTableCell[];
	export let align: MarkedTableCellAlignment[];
	export let isHead: boolean;

	const renderers: Renderers = getContext(renderersKey);
</script>

<!-- table_row will render cells -->
<tr>
	{#each row as cell, index}
		<svelte:component this={renderers['table_cell']} {...cell} {isHead} align={align[index]} />
	{/each}
</tr>
