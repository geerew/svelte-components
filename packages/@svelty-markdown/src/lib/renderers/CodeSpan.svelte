<script lang="ts">
	import type { Renderers } from '$lib';

	export let type = 'codespan';
	export let raw: string;
	export let text: string;
	export let renderers: Renderers;

	// Disable warning about unused variables
	type;
	text;
	renderers;
</script>

<code>{raw.substring(1, raw.length - 1)}</code>
