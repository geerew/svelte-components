<script lang="ts">
	import type { MarkedTableCell, MarkedTableCellAlignment, Renderers } from '$lib';

	export let header: MarkedTableCell[];
	export let align: MarkedTableCellAlignment[];
	export let renderers: Renderers = {};
</script>

<!-- table_header will render 1 row -->
<thead>
	<svelte:component this={renderers['table_row']} row={header} {renderers} isHead={true} {align} />
</thead>
