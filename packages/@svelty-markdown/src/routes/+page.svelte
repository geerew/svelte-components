<script lang="ts">
	import Markdown from '$lib/components/Markdown.svelte';
	import type { marked } from 'marked';

	const source = `# bob`;

	function parsed(event: CustomEvent<marked.Token[] | marked.TokensList>) {
		console.log('parsed', event.detail);
	}

	function rendered(event: CustomEvent<boolean>) {
		console.log('rendered', event.detail);
	}
</script>

<Markdown {source} debug={true} on:parsed={parsed} on:rendered={rendered} />
