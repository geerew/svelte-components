<script lang="ts">
	import { renderersKey } from '$lib/contexts/renderers';
	import type { MarkedTableCell, MarkedTableCellAlignment, Renderers } from '$lib/types';
	import { getContext } from 'svelte';

	export let type: 'table';
	export let raw: string;
	export let align: MarkedTableCellAlignment[];
	export let header: MarkedTableCell[];
	export let rows: MarkedTableCell[][];

	const renderers: Renderers = getContext(renderersKey);

	// Disable warning about unused variables
	type;
	raw;
</script>

<table>
	<!-- Table head -->
	<svelte:component this={renderers['table_header']} {header} {align} />

	<!-- Table body -->
	<svelte:component this={renderers['table_body']} {rows} {align} />
</table>
