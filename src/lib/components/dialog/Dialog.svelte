<script lang="ts">
	import { createDialog } from '$lib/stores';

	export let dialog = createDialog();

	export let backdrop = true;
	export let title = 'Example Dialog';
	export let body =
		"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
</script>

<!-- Button slot to open the dialog-->
<slot name="button">
	<!-- Fallback -->
	<button
		type="button"
		class="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus-visible:ring-2 focus-visible:ring-gray-400"
		on:click={dialog.open}>Open dialog</button
	>
</slot>

<!-- Dialog -->
{#if $dialog.expanded}
	<!-- Backdrop -->
	{#if backdrop || $$slots.backdrop}
		<!-- Fallback -->
		<slot name="backdrop">
			<div class="fixed inset-0 z-40 bg-black/25" />
		</slot>
	{/if}

	<!-- Modal slot -->
	<slot>
		<!-- Fallback -->
		<div
			class="h-modal fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-center overflow-y-auto p-10 md:inset-0 md:h-full"
		>
			<div class="relative flex max-h-full w-full max-w-lg">
				<!-- Content-->
				<div
					class="mx-auto flex max-h-[20rem] min-h-[15rem] w-96 flex-col rounded-2xl bg-white shadow"
					use:dialog.modal
				>
					<!-- Header -->
					<slot name="header">
						<!-- Fallback -->
						<div
							class="flex items-center justify-between rounded-t border-b p-4"
						>
							<h3 class="text-xl font-medium">
								{title}
							</h3>
						</div>
					</slot>

					<!-- Body -->
					<slot name="body">
						<!-- Fallback -->
						<div
							class="flex-1 space-y-6 overflow-y-auto overscroll-contain p-6"
						>
							{body}
						</div>
						<div
							class="flex items-center space-x-2 rounded-b border-t p-6"
						>
							<button
								class="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500"
								on:click={dialog.close}>Close</button
							>
							<!--  -->
						</div>
					</slot>

					<!-- Footer -->
					<slot name="footer" />
				</div>
			</div>
		</div>
	</slot>
{/if}
