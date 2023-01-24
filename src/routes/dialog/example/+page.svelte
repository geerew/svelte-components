<script lang="ts">
	import { Dialog } from '$lib/components';
	import type { DialogReturn } from '$lib/stores';

	// Allows us to bind to the created Dialog, giving
	// access to open, close, etc
	let dialog: DialogReturn;
</script>

<div class="h-screen w-screen">
	<Dialog bind:dialog>
		<!-- Button to open dialog -->
		<div
			slot="button"
			class="flex h-full flex-col items-center justify-center"
		>
			<button
				class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
				on:click={dialog.open}
			>
				Open dialog
			</button>
			<!-- on:click={dialog.open} -->
		</div>
	</Dialog>
</div>
