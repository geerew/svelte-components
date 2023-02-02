<script lang="ts">
	import type { Renderers } from '$lib';
	import type { MarkedTableCell, MarkedTableCellAlignment } from '$lib/types';

	export let type: 'table';
	export let raw: string;
	export let align: MarkedTableCellAlignment[];
	export let header: MarkedTableCell[];
	export let rows: MarkedTableCell[][];
	export let renderers: Renderers = {};

	// Disable warning about unused variables
	type;
	raw;
</script>

<table>
	<!-- Table head -->
	<svelte:component this={renderers['table_header']} {header} {renderers} {align} />

	<!-- Table body -->
	<svelte:component this={renderers['table_body']} {rows} {renderers} {align} />
</table>
