<script>
	import { setContext } from "svelte";
	import Meta from "$components/Meta.svelte";
	import Index from "$components/Index.svelte";
	import copy from "$data/copy.json";
	import version from "$utils/version.js";

	version();

	const preloadFont = [];

	const { title, description, url, keywords } = copy.meta;
	setContext("copy", copy);
</script>

<Meta {title} {description} {url} {preloadFont} {keywords} />
<Index />
