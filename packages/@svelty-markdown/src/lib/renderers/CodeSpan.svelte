<script lang="ts">
	export let type = 'codespan';
	export let raw: string;
	export let text: string;

	// Disable warning about unused variables
	type;
	raw;
</script>

<code>{text}</code>
