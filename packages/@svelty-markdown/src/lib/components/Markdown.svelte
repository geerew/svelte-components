<script lang="ts">
	import type { Renderers } from '$lib/types';
	import { defaultRenderers } from '$lib/renderers';
	import { marked, Slugger } from 'marked';
	import { afterUpdate, createEventDispatcher, onMount } from 'svelte';
	import { setContext } from 'svelte';
	import { sluggerKey } from '$lib/contexts/slugger';
	import { renderersKey } from '$lib/contexts/renderers';

	// ----------------------
	// Dispatchers
	// ----------------------

	const dispatchParsed = createEventDispatcher<{ parsed: marked.Token[] | marked.TokensList }>();
	const dispatchRendered = createEventDispatcher<{ rendered: boolean }>();

	// ----------------------
	// Exports
	// ----------------------

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

	// ----------------------
	// Reactive setup
	// ----------------------

	// Update the marked options
	$: marked.setOptions({ ...marked.defaults, ...options });

	// Update the custom tokenizers. The options need to be
	// defaulted first or the tokenizers duplicate
	$: {
		marked.setOptions({ ...marked.getDefaults(), ...options });
		marked.use({ extensions: tokenizers });
	}

	let tokens: marked.Token[] | marked.TokensList;

	// Slugger for headings
	$: {
		source ? setContext(sluggerKey, new Slugger()) : undefined;
	}

	// Parse tokens
	$: {
		let lexer = new marked.Lexer(marked.defaults);
		tokens = isInline ? lexer.inlineTokens(source) : lexer.lex(source);
	}

	// Dispatch `parsed` when the tokens was changed
	$: {
		dispatchParsed('parsed', tokens);
	}

	// Combine the default renderers and additional/overriding
	// renderers + set the context (so we don't have to pass the
	// renderers around as props)
	$: renderers = (() => {
		const newRenderers = { ...defaultRenderers, ...renderers };
		setContext(renderersKey, newRenderers);
		return newRenderers;
	})();

	// ----------------------
	// Lifecycle
	// ----------------------

	afterUpdate(async () => {
		dispatchRendered('rendered', true);
	});

	// On mount, dispatchParsed `parsed`
	onMount(async () => {
		if (tokens) dispatchParsed('parsed', tokens);
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
		<svelte:component this={renderers[token.type]} {...token} />
	{/each}
{/if}
