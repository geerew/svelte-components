<script lang="ts">
	import type { Renderers } from '$lib';
	import { decode } from 'html-entities';

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

	const decodedTitle = decode(title) || title;
	const decodedText = decode(text) || text;
</script>

<img src={href} title={decodedTitle} alt={decodedText} />
