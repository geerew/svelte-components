<script lang="ts">
	import type { Renderers } from '$lib/types';

	export let type = 'codespan';
	export let raw: string;
	export let text: string;
	export let renderers: Renderers;

	// Disable warning about unused variables
	type;
	raw;
	renderers;
</script>

<code>{text}</code>
