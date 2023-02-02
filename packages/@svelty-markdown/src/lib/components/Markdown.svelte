<script lang="ts">
	import type { Renderers } from '$lib/types';
	import { defaultRenderers } from '$lib/renderers';
	import { marked } from 'marked';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher<{ parsed: marked.Token[] | marked.TokensList }>();

	// String to parse
	export let source: string;

	// Array of custom tokenizers
	export let tokenizers: marked.TokenizerExtension[] = [];

	// Custom renderers, whereby the key is a string and
	// the value is a svelte component. This is combined
	// with the default renderers
	export let renderers: Renderers = {};

	// Overriding marked options
	export let options: marked.MarkedOptions = {};

	export let isInline = false;

	export let debug = false;

	// Set the marked options, combining marked defaults with
	// passed in options
	marked.setOptions({ ...marked.getDefaults(), ...options });

	// Set the custom tokenizers
	marked.use({ extensions: tokenizers });

	// Update the marked options
	$: marked.setOptions({ ...marked.defaults, ...options });

	// Update the custom tokenizers. The options need to be
	// defaulted first or the tokenizers duplicate
	$: {
		marked.setOptions({ ...marked.getDefaults(), ...options });
		marked.use({ extensions: tokenizers });
	}

	let tokens: marked.Token[] | marked.TokensList;

	$: {
		// Create a new lexer
		let lexer = new marked.Lexer(marked.defaults);

		// Parse tokens
		tokens = isInline ? lexer.inlineTokens(source) : lexer.lex(source);
	}

	$: {
		// Dispatch `parsed` when the tokens was changed
		dispatch('parsed', tokens);
	}

	// Combine the default renderers and additional/overriding
	// renderers
	$: renderers = { ...defaultRenderers, ...renderers };

	onMount(async () => {
		// On mount, dispatch `parsed`
		dispatch('parsed', tokens);
	});
</script>

<!-- Debug -> Show the tokens -->
{#if debug}
	<div style="font-family:monospace; font-size:small; white-space:pre">
		{JSON.stringify(tokens, null, 2)}
	</div>
{/if}

<!-- Render using svelte:component -->
{#if tokens.length > 0}
	{#each tokens as token}
		<svelte:component this={renderers[token.type]} {...token} {renderers} />
	{/each}
{/if}
