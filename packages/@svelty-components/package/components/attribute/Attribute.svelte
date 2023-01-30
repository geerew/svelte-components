<script>import { twMerge } from "tailwind-merge";
export let text = "";
$:
  snippetClass = twMerge(
    "px-1 font-mono text-sm font-semibold tracking-wide text-white",
    $$props.class
  );
</script>

<code class={snippetClass}>
	<span>`{text}`</span>
</code>
