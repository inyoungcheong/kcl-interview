<script>
	import { base } from "$app/paths";
	import PaperWheel from "$components/PaperWheel.svelte";

	let { background = { type: "black" }, active = false } = $props();
	let videoEl = $state();
	let portraitOverlayEl = $state();
	let vennOverlayEl = $state();

	const asset = (path) => `${base}${path}`;

	$effect(() => {
		if (videoEl) {
			videoEl.playbackRate = background.playbackRate ?? 1;
			if (active) {
				const playPromise = videoEl.play();
				if (playPromise) playPromise.catch(() => {});
			} else {
				videoEl.pause();
			}
		}

		if (portraitOverlayEl) {
			portraitOverlayEl.playbackRate = background.overlayVideo?.playbackRate ?? 0.7;
			if (active) {
				const playPromise = portraitOverlayEl.play();
				if (playPromise) playPromise.catch(() => {});
			} else {
				portraitOverlayEl.pause();
			}
		}

		if (vennOverlayEl) {
			vennOverlayEl.playbackRate = background.overlayVideo?.playbackRate ?? 0.8;
			if (active) {
				const playPromise = vennOverlayEl.play();
				if (playPromise) playPromise.catch(() => {});
			} else {
				vennOverlayEl.pause();
			}
		}
	});
</script>

<div
	class={`media media-${background.type ?? "black"} tone-${background.tone ?? "standard"} fit-${background.fit ?? "cover"}`}
	style={`--media-position: ${background.position ?? "center center"}; --video-opacity: ${background.videoOpacity ?? 1}; --portrait-overlay-opacity: ${background.overlayVideo?.opacity ?? 0.14}; --portrait-image-brightness: ${background.portraitBrightness ?? 1}; --portrait-overlay-saturation: ${background.overlayVideo?.saturation ?? 0.35}; --portrait-overlay-contrast: ${background.overlayVideo?.contrast ?? 1.02}; --portrait-overlay-brightness: ${background.overlayVideo?.brightness ?? 0.62}; --portrait-overlay-grayscale: ${background.overlayVideo?.grayscale ?? 0.42}; --venn-overlay-opacity: ${background.overlayVideo?.opacity ?? 0.2}; --venn-overlay-saturation: ${background.overlayVideo?.saturation ?? 0.36}; --venn-overlay-contrast: ${background.overlayVideo?.contrast ?? 1.04}; --venn-overlay-brightness: ${background.overlayVideo?.brightness ?? 0.4}; --venn-overlay-grayscale: ${background.overlayVideo?.grayscale ?? 0.5};`}
>
	{#if background.type === "video"}
		<video bind:this={videoEl} muted loop={background.loop ?? true} playsinline preload="metadata">
			<source src={asset(background.src)} type="video/mp4" />
		</video>
	{:else if background.type === "image"}
		<img src={asset(background.src)} alt="" />
	{:else if background.type === "paper-collage"}
		<div class="paper-collage" aria-hidden="true">
			{#each background.papers ?? [] as paper, index}
				<img src={asset(paper)} alt="" style={`--i: ${index};`} />
			{/each}
		</div>
	{:else if background.type === "paper-wheel"}
		<PaperWheel {active} />
	{:else if background.type === "portrait"}
		{#if background.overlayVideo?.src}
			<video bind:this={portraitOverlayEl} class="portrait-overlay" muted loop playsinline preload="metadata">
				<source src={asset(background.overlayVideo.src)} type="video/mp4" />
			</video>
		{/if}
		<div class="portrait-wrap" aria-hidden="true">
			<img src={asset(background.src)} alt="" />
		</div>
	{:else if background.type === "venn"}
		<div class="venn" aria-hidden="true">
			{#if background.overlayVideo?.src}
				<video bind:this={vennOverlayEl} class="venn-overlay" muted loop playsinline preload="metadata">
					<source src={asset(background.overlayVideo.src)} type="video/mp4" />
				</video>
			{/if}
			<div class="venn-circle circle-government">
				<span>{background.labels?.[0] ?? "Government"}</span>
			</div>
			<div class="venn-circle circle-law">
				<span>{background.labels?.[1] ?? "Law"}</span>
			</div>
			<div class="venn-circle circle-cs">
				<span>{background.labels?.[2] ?? "Computer Science"}</span>
			</div>
			<div class="venn-center">{background.center ?? "AI governance"}</div>
		</div>
	{:else}
		<div class="black"></div>
	{/if}
</div>

<style>
	.media {
		position: absolute;
		inset: 0;
		z-index: 0;
		background: #050505;
	}

	.media-portrait,
	.media-venn {
		background: transparent;
	}

	video,
	.media > img,
	.black {
		width: 100%;
		height: 100%;
		display: block;
	}

	video,
	.media > img {
		object-position: var(--media-position);
	}

	.fit-cover video,
	.fit-cover > img {
		object-fit: cover;
	}

	.media-video video {
		opacity: var(--video-opacity);
	}

	.fit-contain video,
	.fit-contain > img {
		object-fit: contain;
		background: #050505;
	}

	.tone-dark video,
	.tone-dark > img {
		filter: saturate(0.82) contrast(1.08) brightness(0.72);
	}

	.black {
		background:
			radial-gradient(circle at 20% 72%, rgba(255, 250, 246, 0.05), transparent 30%),
			#050505;
	}

	.paper-collage {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		background:
			radial-gradient(circle at 78% 28%, rgba(255, 250, 246, 0.1), transparent 26%),
			#050505;
		overflow: hidden;
	}

	.paper-collage img {
		position: absolute;
		width: min(28vw, 360px);
		max-height: 62vh;
		object-fit: contain;
		background: #fff;
		box-shadow: 0 26px 80px rgba(0, 0, 0, 0.52);
		opacity: 0.55;
		transform: translate(var(--x), var(--y)) rotate(var(--r));
	}

	.paper-collage img:nth-child(1) {
		--x: 23vw;
		--y: -17vh;
		--r: 7deg;
	}

	.paper-collage img:nth-child(2) {
		--x: 35vw;
		--y: 16vh;
		--r: -5deg;
	}

	.paper-collage img:nth-child(3) {
		--x: 4vw;
		--y: -5vh;
		--r: -2deg;
	}

	.paper-collage img:nth-child(4) {
		--x: 49vw;
		--y: -1vh;
		--r: 2deg;
	}

	.paper-collage img:nth-child(5) {
		--x: 15vw;
		--y: 23vh;
		--r: 4deg;
	}

	.venn {
		--venn-d: min(27vw, 330px);
		/* Triangle centroid at center; vertices = gov (upper-left), law (upper-right), cs (bottom). */
		--venn-k: min(5.15vw, 62px);

		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		transform: translateY(-6.6vh);
		background: radial-gradient(circle at 50% 52%, rgba(255, 250, 246, 0.07), transparent 34%);
	}

	.venn-overlay {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
		opacity: var(--venn-overlay-opacity);
		filter:
			grayscale(var(--venn-overlay-grayscale))
			saturate(var(--venn-overlay-saturation))
			contrast(var(--venn-overlay-contrast))
			brightness(var(--venn-overlay-brightness));
		pointer-events: none;
	}

	.venn::before {
		content: "";
		position: absolute;
		inset: 0;
		background:
			radial-gradient(circle at 24% 18%, rgba(255, 250, 246, 0.04), transparent 40%),
			radial-gradient(circle at 74% 66%, rgba(255, 250, 246, 0.03), transparent 42%),
			repeating-linear-gradient(
				-22deg,
				rgba(255, 250, 246, 0.018) 0,
				rgba(255, 250, 246, 0.018) 1px,
				transparent 1px,
				transparent 15px
			);
		opacity: 0.24;
		mix-blend-mode: soft-light;
		pointer-events: none;
		z-index: 1;
	}

	.venn::after {
		content: "";
		position: absolute;
		left: 50%;
		top: 50%;
		width: min(24vw, 280px);
		aspect-ratio: 1;
		transform: translate(-50%, -50%);
		border-radius: 999px;
		background: radial-gradient(circle, rgba(255, 250, 246, 0.04), rgba(255, 250, 246, 0.01) 48%, transparent 74%);
		filter: blur(6px);
		pointer-events: none;
		z-index: 1;
	}

	.venn-circle {
		position: absolute;
		left: 50%;
		top: 50%;
		width: var(--venn-d);
		aspect-ratio: 1;
		border: 2.5px solid rgba(255, 250, 246, 0.82);
		border-radius: 999px;
		background: rgba(255, 250, 246, 0.07);
		box-shadow: none;
		opacity: 0;
		animation: venn-in 1450ms ease-out both;
		z-index: 2;
	}

	.venn-circle span {
		position: absolute;
		display: block;
		width: max-content;
		max-width: min(78%, 14rem);
		font-family: var(--font-sans);
		font-size: clamp(0.86rem, 1.1vw, 1.08rem);
		font-weight: 600;
		letter-spacing: 0.11em;
		line-height: 1.2;
		text-transform: uppercase;
		color: rgba(255, 250, 246, 1);
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.9);
		pointer-events: none;
	}

	.circle-government {
		transform: translate(-50%, -50%) translate(calc(var(--venn-k) * -1.732), calc(var(--venn-k) * -1));
		animation-delay: 220ms;
	}

	.circle-government span {
		right: calc(100% + 0.6rem);
		top: 22%;
		left: auto;
		text-align: right;
		white-space: nowrap;
	}

	.circle-law {
		transform: translate(-50%, -50%) translate(calc(var(--venn-k) * 1.732), calc(var(--venn-k) * -1));
		animation-delay: 860ms;
	}

	.circle-law span {
		left: calc(100% + 0.6rem);
		right: auto;
		top: 22%;
		text-align: left;
		white-space: nowrap;
	}

	.circle-cs {
		transform: translate(-50%, -50%) translate(0, calc(var(--venn-k) * 2));
		animation-delay: 1520ms;
	}

	.circle-cs span {
		left: 50%;
		top: calc(100% + 2rem);
		bottom: auto;
		transform: translateX(-50%);
		text-align: center;
		white-space: nowrap;
	}

	.venn-center {
		position: relative;
		z-index: 3;
		margin-top: 0;
		max-width: min(52vw, 22rem);
		padding: 0 0.5rem;
		border: 0;
		background: transparent;
		font-family: var(--font-serif);
		font-size: clamp(1.6rem, 3.4vw, 4rem);
		font-weight: 400;
		letter-spacing: 0.01em;
		font-style: italic;
		line-height: 1.06;
		text-align: center;
		text-wrap: balance;
		color: rgba(255, 250, 246, 1);
		text-shadow: 0 2px 16px rgba(0, 0, 0, 0.9);
		box-shadow: none;
		opacity: 0;
		animation: center-in 1200ms ease-out 2250ms both;
	}

	@keyframes venn-in {
		from {
			opacity: 0;
			filter: blur(6px);
		}
		to {
			opacity: 1;
			filter: blur(0);
		}
	}

	@keyframes center-in {
		from {
			opacity: 0;
			transform: translateY(0.35rem);
			filter: blur(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
			filter: blur(0);
		}
	}

	@media (max-width: 780px) {
		.paper-collage img {
			width: min(44vw, 210px);
			opacity: 0.42;
		}

		.paper-collage img:nth-child(1) {
			--x: 14vw;
			--y: -22vh;
		}

		.paper-collage img:nth-child(2) {
			--x: 24vw;
			--y: 18vh;
		}

		.paper-collage img:nth-child(3) {
			--x: -22vw;
			--y: 1vh;
		}

		.paper-collage img:nth-child(4) {
			--x: 38vw;
			--y: -3vh;
		}

		.paper-collage img:nth-child(5) {
			--x: -5vw;
			--y: 27vh;
		}

		.portrait-wrap {
			right: 0;
			top: auto;
			bottom: 0;
			transform: none;
			width: min(58vw, 240px);
			opacity: 0.38;
		}

		.venn {
			--venn-d: min(52vw, 240px);
			--venn-k: min(8.2vw, 42px);
			transform: translateY(-3.9vh);
		}

		.venn-circle span {
			font-size: clamp(0.62rem, 2.8vw, 0.78rem);
			max-width: 6.6rem;
			letter-spacing: 0.08em;
			white-space: normal;
			line-height: 1.28;
		}

		.circle-government span {
			left: 12%;
			top: 24%;
			right: auto;
			text-align: left;
		}

		.circle-law span {
			right: 12%;
			top: 24%;
			left: auto;
			text-align: right;
		}

		.circle-cs span {
			left: 50%;
			top: auto;
			bottom: 18%;
			transform: translateX(-50%);
			text-align: center;
		}

		.venn-center {
			font-size: clamp(1.05rem, 6.5vw, 2rem);
			max-width: min(72vw, 16rem);
		}
	}

	.portrait-wrap {
		position: absolute;
		right: 8vw;
		top: 50%;
		transform: translateY(-50%);
		width: min(27vw, 340px);
		aspect-ratio: 1 / 1;
		border-radius: 50%;
		overflow: hidden;
		box-shadow: 0 0 0 1px rgba(255, 250, 246, 0.16), 0 32px 90px rgba(0, 0, 0, 0.5);
	}

	.portrait-overlay {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
		opacity: var(--portrait-overlay-opacity);
		filter:
			grayscale(var(--portrait-overlay-grayscale))
			saturate(var(--portrait-overlay-saturation))
			contrast(var(--portrait-overlay-contrast))
			brightness(var(--portrait-overlay-brightness));
		pointer-events: none;
	}

	.portrait-wrap img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center top;
		filter: brightness(var(--portrait-image-brightness));
	}

	@media (max-width: 780px) {
		.portrait-wrap {
			right: 0;
			top: auto;
			bottom: 0;
			transform: none;
			width: min(58vw, 240px);
			opacity: 0.38;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.venn-circle,
		.venn-center {
			opacity: 1;
			animation: none;
		}
	}
</style>
