<script>import { twMerge } from "tailwind-merge";
import { CapitalizeFirstLetter } from "../../internal/helpers";
export let path;
export let pathSeparator = "/";
export let capitalizeFirstLetter = true;
export let lastBreadcrumbClass = "text-white";
export let divider = "/";
$:
  breadcrumbs = buildBreadcrumbs(path);
$:
  breadcrumbsClass = twMerge("flex items-center w-full gap-4 text-white", $$props.class);
const buildBreadcrumbs = (path2) => {
  if (!path2)
    return [];
  return typeof path2 === "string" ? path2.split(pathSeparator).filter((i) => i) : path2.filter((i) => i);
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
