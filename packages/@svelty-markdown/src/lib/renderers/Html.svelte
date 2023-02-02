<script lang="ts">
	import type { Renderers } from '$lib';

	export let type: 'html';
	export let raw: string;
	export let pre: boolean;
	export let text: string;
	export let renderers: Renderers;

	// Disable warning about unused variables
	type;
	raw;
	pre;
	renderers;
</script>

{@html text}
