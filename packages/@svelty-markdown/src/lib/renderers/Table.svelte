<script lang="ts">
	import type { MarkedTableCell, MarkedTableCellAlignment, Renderers } from '$lib';
	import TableBody from './TableBody.svelte';
	import TableHeader from './TableHeader.svelte';

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
