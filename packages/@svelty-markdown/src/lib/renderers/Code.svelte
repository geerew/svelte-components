<script lang="ts">
	import type { Renderers } from '$lib/types';

	export let type: 'code';
	export let raw: string;
	export let codeBlockStyle: 'indented' | undefined = undefined;
	export let lang: string | undefined = undefined;
	export let text: string;
	export let renderers: Renderers;

	// Disable warning about unused variables
	type;
	text;
	codeBlockStyle;
	renderers;
</script>

<pre class={lang}><code>{raw}</code></pre>
