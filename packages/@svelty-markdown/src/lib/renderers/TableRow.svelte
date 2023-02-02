<script lang="ts">
	import type { MarkedTableCell, MarkedTableCellAlignment, Renderers } from '$lib';

	export let row: MarkedTableCell[];
	export let align: MarkedTableCellAlignment[];
	export let isHead: boolean;
	export let renderers: Renderers = {};
</script>

<!-- table_row will render cells -->
<tr>
	{#each row as cell, index}
		<svelte:component
			this={renderers['table_cell']}
			{...cell}
			{renderers}
			{isHead}
			align={align[index]}
		/>
	{/each}
</tr>
