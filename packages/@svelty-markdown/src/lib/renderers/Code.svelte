<script lang="ts">
	import { decode } from 'he';

	export let type: 'code';
	export let raw: string;
	export let codeBlockStyle: 'indented' | undefined = undefined;
	export let lang: string | undefined = undefined;
	export let text: string;

	// Disable warning about unused variables
	type;
	raw;
	codeBlockStyle;

	// Decode the text (incase it contains encodings)
	const decoded = decode(text);
</script>

<pre class={lang}><code>{decoded}</code></pre>
