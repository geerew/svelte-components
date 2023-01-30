<script>import { twMerge } from "tailwind-merge";
export let text = "";
export let textClass = "";
export let textLink = "";
$:
  highlighterClass = twMerge(
    "relative inline-block before:w-0 before:transition-all before:duration-150 before:ease-out before:hover:absolute before:hover:inset-0 before:hover:block before:hover:w-full before:hover:-skew-y-2 before:hover:bg-red-500",
    $$props.class
  );
$:
  highlighterTextClass = twMerge("relative text-yellow-500 hover:text-white", textClass);
</script>

<span class={highlighterClass}>
	{#if textLink !== ''}
		<a href={textLink} class={highlighterTextClass}><slot>{text}</slot></a>
	{:else}
		<span class={highlighterTextClass}><slot>{text}</slot></span>
	{/if}
</span>
