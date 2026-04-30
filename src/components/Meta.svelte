<script>
	import { base } from "$app/paths";

	let {
		title = "Inyoung x Anthropic",
		description = "A visual essay about Inyoung Cheong's path to AI safety and public-interest research at Anthropic.",
		url = "https://inyoungcheong.github.io/kcl-interview",
		keywords = "",
		preloadFont = []
	} = $props();

	const image = $derived(`${url}/images/back.png`);
	const favicon = $derived(`${base}/images/fab_london.png?v=2`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="Inyoung Cheong" />
	<meta name="news_keywords" content={keywords} />

	<meta property="og:title" content={title} />
	<meta property="og:site_name" content="Inyoung Cheong" />
	<meta property="og:url" content={url} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="article" />
	<meta property="og:locale" content="en_US" />

	<meta property="og:image" content={image} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="628" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image:src" content={image} />

	<meta name="robots" content="max-image-preview:large" />

	<link rel="canonical" href={url} />
	<link rel="icon" type="image/png" sizes="32x32" href={favicon} />
	<link rel="shortcut icon" href={favicon} />
	<link rel="apple-touch-icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />

	{#each preloadFont as href}
		<link rel="preload" {href} as="font" type="font/woff2" crossorigin />
	{/each}
</svelte:head>
