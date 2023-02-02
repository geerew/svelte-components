<script lang="ts">
	import Markdown from '$lib/components/Markdown.svelte';
	import type { marked } from 'marked';

	const source = ``;

	function parsed(event: CustomEvent<marked.Token[] | marked.TokensList>) {
		console.log(event.detail);
	}
</script>

<Markdown {source} debug={true} />
