<script lang="ts">
	import { Markdown } from '$lib';
	import Uppercase from '$lib/extensions/renderers/Uppercase.svelte';
	import { uppercaseTokenizer } from '$lib/extensions/tokenizers/uppercase';
	import type { marked } from 'marked';

	const source = `^___uppercase___^`;

	function parsed(event: CustomEvent<marked.Token[] | marked.TokensList>) {
		console.log(event.detail);
	}
</script>

<Markdown
	{source}
	debug={true}
	tokenizers={[uppercaseTokenizer]}
	renderers={{ uppercase: Uppercase }}
	on:parsed={parsed}
/>
