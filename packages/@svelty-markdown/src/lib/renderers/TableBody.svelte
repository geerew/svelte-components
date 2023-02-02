<script lang="ts">
	import type { MarkedTableCell, MarkedTableCellAlignment, Renderers } from '$lib';

	export let rows: MarkedTableCell[][];
	export let align: MarkedTableCellAlignment[];
	export let renderers: Renderers = {};
</script>

<!-- table_body will render 1 or more rows -->
<tbody>
	{#each rows as row}
		<svelte:component this={renderers['table_row']} {row} {renderers} isHead={false} {align} />
	{/each}
</tbody>
