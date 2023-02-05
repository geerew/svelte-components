<script lang="ts">
	import type { Renderers } from '$lib';
	import { renderersKey } from '$lib/contexts/renderers';
	import type { MarkedTableCell, MarkedTableCellAlignment } from '$lib/types';
	import { getContext } from 'svelte';

	export let rows: MarkedTableCell[][];
	export let align: MarkedTableCellAlignment[];

	const renderers: Renderers = getContext(renderersKey);
</script>

<!-- table_body will render 1 or more rows -->
<tbody>
	{#each rows as row}
		<svelte:component this={renderers['table_row']} {row} isHead={false} {align} />
	{/each}
</tbody>
