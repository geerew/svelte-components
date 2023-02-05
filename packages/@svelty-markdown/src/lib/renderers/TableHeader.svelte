<script lang="ts">
	import type { Renderers } from '$lib';
	import { renderersKey } from '$lib/contexts/renderers';
	import type { MarkedTableCell, MarkedTableCellAlignment } from '$lib/types';
	import { getContext } from 'svelte';

	export let header: MarkedTableCell[];
	export let align: MarkedTableCellAlignment[];

	const renderers: Renderers = getContext(renderersKey);
</script>

<!-- table_header will render 1 row -->
<thead>
	<svelte:component this={renderers['table_row']} row={header} isHead={true} {align} />
</thead>
