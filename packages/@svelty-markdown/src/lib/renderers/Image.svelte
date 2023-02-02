<script lang="ts">
	import type { Renderers } from '$lib/types';
	import { decode } from 'he';

	export let type: 'image';
	export let raw: string;
	export let href: string;
	export let title: string;
	export let text: string;
	export let renderers: Renderers;

	// Disable warning about unused variables
	type;
	raw;
	renderers;

	// Decode(incase it contains encodings)
	const decodedTitle = decode(title);
	const decodedText = decode(text);
</script>

<img src={href} title={decodedTitle} alt={decodedText} />
