<script lang="ts">
	export let type: 'html';
	export let raw: string;
	export let pre: boolean;
	export let text: string;

	// Disable warning about unused variables
	type;
	raw;
	pre;
</script>

{@html text}
