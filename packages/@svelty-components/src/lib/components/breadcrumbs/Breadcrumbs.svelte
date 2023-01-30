<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { CapitalizeFirstLetter } from '$lib/internal/helpers';

	// Breadcrumbs (eg 'this/path' or ['this', 'path'])
	export let path: string | string[];

	// How to split the path (if it's a string)
	export let pathSeparator = '/';

	// Capitalize the first letter
	export let capitalizeFirstLetter = true;

	// Class override for the last (active) breadcrumb
	export let lastBreadcrumbClass = 'text-white';

	// How to divide the breadcrumbs
	export let divider = '/';

	// Build breadcrumbs (when path changes)
	$: breadcrumbs = buildBreadcrumbs(path);

	// Set the breadcrumbs class by combining defaults and the
	// passed in class
	$: breadcrumbsClass = twMerge('flex items-center w-full gap-4 text-white', $$props.class);

	// Build the breadcrumbs
	const buildBreadcrumbs = (path: string | string[]): string[] => {
		if (!path) return [];

		return typeof path === 'string'
			? path.split(pathSeparator).filter((i) => i)
			: path.filter((i) => i);
	};
</script>

<div class={breadcrumbsClass}>
	{#each breadcrumbs as part, index}
		{@const breadcrumb = capitalizeFirstLetter ? CapitalizeFirstLetter(part) : part}
		{@const isLastBreadcrumb = breadcrumbs.length === index + 1}

		<!-- Breadcrumb -->
		<div class={isLastBreadcrumb ? lastBreadcrumbClass : ''}>
			{breadcrumb}
		</div>

		<!-- Divider  -->
		{#if !isLastBreadcrumb}
			<slot name="divider">
				<!-- Fallback -->
				<div class="">{divider}</div>
			</slot>
		{/if}
	{/each}
</div>
