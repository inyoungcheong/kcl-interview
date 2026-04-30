<script>
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import PaperMotif from "$components/PaperMotif.svelte";
	import { base } from "$app/paths";

	let { scene, index } = $props();

	const asset = (path) => `${base}${path}`;

	let activeBeat = $state(0);
	let beatEls = [];
	let mediaEl;
	let videoEl = $state();
	let sceneVisible = $state(false);
	let userEnabledSound = $state(false);
	const activeMedia = $derived(
		scene.beats[activeBeat]?.media ??
			scene.media.items?.[Math.min(activeBeat, scene.media.items.length - 1)] ??
			scene.media
	);

	$effect(() => {
		if (activeMedia.type !== "video" || !activeMedia.allowSound) userEnabledSound = false;
	});

	$effect(() => {
		if (!videoEl) return;

		if (activeMedia.type === "video" && sceneVisible) {
			const playPromise = videoEl.play();
			if (playPromise) playPromise.catch(() => {});
		} else {
			videoEl.pause();
			videoEl.currentTime = 0;
		}
	});

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					const next = Number(entry.target.dataset.beat);
					if (!Number.isNaN(next)) activeBeat = next;
				}
			},
			{ threshold: 0.55 }
		);

		const mediaObserver = new IntersectionObserver(
			([entry]) => {
				sceneVisible = !!entry?.isIntersecting;
				if (!entry?.isIntersecting) userEnabledSound = false;
			},
			{
				threshold: 0,
				rootMargin: "-18% 0px -18% 0px"
			}
		);

		for (const el of beatEls) {
			if (el) observer.observe(el);
		}

		if (mediaEl) mediaObserver.observe(mediaEl);

		return () => {
			observer.disconnect();
			mediaObserver.disconnect();
		};
	});
</script>

<section class={`scene scene-${index} ${scene.variant ?? ""}`}>
	<div bind:this={mediaEl} class={`scene-media align-${activeMedia.align ?? scene.media.align ?? "center"}`}>
		{#if scene.motif?.type === "papers"}
			<PaperMotif motif={scene.motif} {activeBeat} {activeMedia} />
		{/if}
		{#key activeMedia.src}
			<div
				class={`media-frame fit-${activeMedia.fit ?? scene.media.fit ?? "cover"} frame-${activeMedia.frame ?? "standard"} tone-${activeMedia.tone ?? scene.media.tone ?? "standard"}`}
				style={`--media-width: ${activeMedia.width ?? scene.media.width ?? "86vw"}; --media-position: ${activeMedia.position ?? scene.media.position ?? "center center"};`}
				transition:fade={{ duration: scene.variant === "archive" ? 620 : 520 }}
			>
				{#if activeMedia.type === "photo"}
					<img src={asset(activeMedia.src)} alt="" />
				{:else if activeMedia.type === "video"}
					<video
						bind:this={videoEl}
						muted={!userEnabledSound || !activeMedia.allowSound}
						loop
						playsinline
						preload="metadata"
					>
						<source src={asset(activeMedia.src)} type="video/mp4" />
					</video>
					{#if activeMedia.allowSound}
						<button
							class="sound-button"
							class:enabled={userEnabledSound}
							onclick={() => (userEnabledSound = !userEnabledSound)}
							aria-pressed={userEnabledSound}
						>
							{userEnabledSound ? "Mute" : "Sound"}
						</button>
					{/if}
				{:else if activeMedia.type === "black"}
					<div class="black-frame"></div>
				{/if}
			</div>
		{/key}
	</div>

	<div class="scene-copy" aria-label={scene.kicker}>
		{#each scene.beats as beat, beatIndex}
			<div
				class={`beat ${beat.placement ?? "bottom-left"}`}
				class:active={beatIndex === activeBeat}
				data-beat={beatIndex}
				bind:this={beatEls[beatIndex]}
			>
				<div class="beat-inner" transition:fade={{ duration: 450 }}>
					{#if beatIndex === 0}
						<span class="kicker">{scene.kicker}</span>
					{/if}
					<p>{beat.text}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.scene {
		position: relative;
		min-height: calc((var(--beat-count, 3) + 1) * 82vh);
		background: #070908;
		color: #fff;
	}

	.scene-media {
		position: sticky;
		top: 0;
		height: 100vh;
		display: flex;
		align-items: center;
		padding: 6vh 5vw;
		box-sizing: border-box;
		overflow: hidden;
	}

	.align-left {
		justify-content: flex-start;
	}

	.align-center {
		justify-content: center;
	}

	.align-right {
		justify-content: flex-end;
	}

	.media-frame {
		position: relative;
		z-index: 1;
		width: min(var(--media-width), 1320px);
		height: min(82vh, 780px);
		background: #101312;
		box-shadow: 0 28px 90px rgba(0, 0, 0, 0.36);
		overflow: hidden;
	}

	.frame-full {
		width: 100vw;
		height: 100vh;
		box-shadow: none;
		background: #070908;
	}

	.media-frame::after {
		content: "";
		position: absolute;
		inset: 0;
		pointer-events: none;
		background:
			linear-gradient(to bottom, rgba(0, 0, 0, 0.34), transparent 30%, rgba(0, 0, 0, 0.34)),
			linear-gradient(to right, rgba(0, 0, 0, 0.28), transparent 34%, rgba(0, 0, 0, 0.28));
	}

	.tone-dark::after {
		background:
			linear-gradient(to bottom, rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.48), rgba(0, 0, 0, 0.68)),
			linear-gradient(to right, rgba(0, 0, 0, 0.64), rgba(0, 0, 0, 0.18) 54%, rgba(0, 0, 0, 0.38));
	}

	img,
	video,
	.black-frame {
		width: 100%;
		height: 100%;
		display: block;
	}

	.black-frame {
		background: #070908;
	}

	.fit-cover img,
	.fit-cover video {
		object-fit: cover;
		object-position: var(--media-position);
	}

	.fit-contain img,
	.fit-contain video {
		object-fit: contain;
		object-position: var(--media-position);
		background: #050505;
	}

	.silent {
		min-height: 118vh;
	}

	.sound-button {
		position: absolute;
		right: 1rem;
		bottom: 1rem;
		z-index: 3;
		border: 1px solid rgba(255, 255, 255, 0.58);
		background: rgba(8, 10, 10, 0.64);
		color: #fff;
		padding: 0.45rem 0.7rem;
		font-family: var(--font-sans);
		font-size: 0.68rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		cursor: pointer;
	}

	.sound-button.enabled {
		background: rgba(254, 241, 236, 0.9);
		color: #070908;
		border-color: rgba(254, 241, 236, 0.9);
	}

	.scene-copy {
		position: relative;
		z-index: 3;
		margin-top: -100vh;
		pointer-events: none;
	}

	.beat {
		min-height: 82vh;
		display: flex;
		box-sizing: border-box;
		padding: 10vh 7vw;
		opacity: 0.12;
		filter: blur(1px);
		transition:
			opacity 650ms ease,
			filter 650ms ease;
	}

	.beat.active {
		opacity: 1;
		filter: blur(0);
	}

	.beat-inner {
		position: relative;
		max-width: min(560px, 82vw);
		padding: 1.1rem 1.2rem 1.15rem;
	}

	.beat-inner::before {
		content: "";
		position: absolute;
		inset: -0.35rem -0.55rem;
		z-index: -1;
		background:
			radial-gradient(ellipse at center, rgba(0, 0, 0, 0.56) 0%, rgba(0, 0, 0, 0.38) 42%, transparent 72%);
		filter: blur(10px);
	}

	.kicker {
		display: block;
		margin-bottom: 0.85rem;
		font-family: var(--font-sans);
		font-size: 0.68rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.86);
		text-shadow:
			0 1px 4px rgba(0, 0, 0, 0.9),
			0 0 18px rgba(0, 0, 0, 0.82);
	}

	p {
		margin: 0;
		font-family: var(--font-serif);
		font-size: clamp(1.32rem, 2.4vw, 2.45rem);
		line-height: 1.38;
		color: #fff;
		text-shadow:
			0 1px 2px rgba(0, 0, 0, 0.95),
			0 2px 12px rgba(0, 0, 0, 0.86),
			0 0 34px rgba(0, 0, 0, 0.72);
	}

	.opening .beat-inner {
		max-width: min(820px, 84vw);
	}

	.opening p {
		font-size: clamp(1.7rem, 4vw, 4.6rem);
		line-height: 1.08;
	}

	.archive .scene-media {
		padding: 8vh 7vw;
	}

	.archive .scene-media:has(.frame-full) {
		padding: 0;
	}

	.archive .media-frame {
		height: min(58vh, 560px);
		background: #070908;
		box-shadow:
			0 20px 70px rgba(0, 0, 0, 0.48),
			0 0 0 1px rgba(254, 241, 236, 0.16);
	}

	.archive .frame-full {
		height: 100vh;
		box-shadow: none;
	}

	.archive .media-frame::after {
		background:
			linear-gradient(to bottom, rgba(0, 0, 0, 0.18), transparent 34%, rgba(0, 0, 0, 0.28)),
			linear-gradient(to right, rgba(0, 0, 0, 0.14), transparent 42%, rgba(0, 0, 0, 0.16));
	}

	.archive .frame-full::after {
		display: none;
	}

	.archive .beat {
		min-height: 78vh;
		padding: 11vh 8vw;
	}

	.archive .beat-inner {
		max-width: min(700px, 82vw);
	}

	.archive p {
		font-size: clamp(1.42rem, 3.1vw, 3.15rem);
		line-height: 1.16;
	}

	.archive .kicker {
		color: rgba(254, 241, 236, 0.72);
	}

	.landscape {
		min-height: 150vh;
		background: #070908;
	}

	.landscape .scene-media {
		padding: 0;
	}

	.landscape .media-frame {
		width: 100vw;
		height: 100vh;
		box-shadow: none;
		background: #070908;
	}

	.landscape .media-frame::after {
		background:
			linear-gradient(to bottom, rgba(0, 0, 0, 0.26), transparent 34%, rgba(0, 0, 0, 0.62)),
			linear-gradient(to right, rgba(0, 0, 0, 0.46), transparent 48%);
	}

	.landscape .beat {
		min-height: 95vh;
		padding: 12vh 8vw;
		align-items: flex-end;
	}

	.landscape .beat-inner {
		max-width: min(780px, 82vw);
		padding: 0;
	}

	.landscape .beat-inner::before {
		inset: -1.8rem -1.4rem;
		background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.58), transparent 72%);
	}

	.landscape p {
		font-size: clamp(2rem, 5vw, 5.8rem);
		line-height: 1.02;
		letter-spacing: 0;
	}

	.landscape .kicker {
		margin-bottom: 1rem;
		color: rgba(254, 241, 236, 0.72);
	}

	.quiet.landscape {
		min-height: 120vh;
	}

	.quiet.landscape .black-frame {
		background: #070908;
	}

	.pause {
		min-height: calc((var(--beat-count, 5) + 1) * 92vh);
		background: #070908;
	}

	.pause .scene-media {
		padding: 0;
	}

	.pause .frame-full::after {
		display: none;
	}

	.pause .black-frame {
		background:
			radial-gradient(circle at 18% 50%, rgba(254, 241, 236, 0.035), transparent 30%),
			#070908;
	}

	.pause .beat {
		min-height: 92vh;
		padding: 14vh 10vw;
	}

	.pause .beat-inner {
		max-width: min(860px, 82vw);
		padding: 0;
	}

	.pause .beat-inner::before {
		inset: -1.4rem -1rem;
		background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.44), transparent 70%);
	}

	.pause p {
		font-size: clamp(1.7rem, 3.8vw, 4.45rem);
		line-height: 1.08;
		letter-spacing: 0;
	}

	.pause .kicker {
		margin-bottom: 1.2rem;
		color: rgba(254, 241, 236, 0.58);
	}

	.anthropic-note {
		min-height: calc((var(--beat-count, 4) + 1) * 76vh);
	}

	.anthropic-note .beat {
		min-height: 76vh;
	}

	.anthropic-note .beat-inner {
		max-width: min(940px, 84vw);
	}

	.anthropic-note p {
		font-size: clamp(1.45rem, 3vw, 3.45rem);
		line-height: 1.16;
	}

	.top-left,
	.center-left,
	.bottom-left {
		justify-content: flex-start;
		text-align: left;
	}

	.top-right,
	.center-right,
	.bottom-right {
		justify-content: flex-end;
		text-align: right;
	}

	.top-left,
	.top-right {
		align-items: flex-start;
	}

	.center-left,
	.center-right {
		align-items: center;
	}

	.bottom-left,
	.bottom-right {
		align-items: flex-end;
	}

	@media (max-width: 768px) {
		.scene {
			min-height: calc((var(--beat-count, 3) + 1) * 74vh);
		}

		.scene-media {
			padding: 4vh 0;
			align-items: center;
			justify-content: center;
		}

		.media-frame {
			width: 100vw;
			height: 68vh;
		}

		.archive .scene-media {
			padding: 5vh 1rem;
			align-items: center;
		}

		.archive .media-frame {
			width: min(92vw, var(--media-width));
			height: 54vh;
		}

		.archive .frame-full {
			width: 100vw;
			height: 100vh;
		}

		.scene-copy {
			margin-top: -86vh;
		}

		.beat {
			min-height: 74vh;
			padding: 8vh 0.85rem;
			align-items: flex-end;
			justify-content: flex-start;
			text-align: left;
		}

		.beat-inner {
			max-width: 92vw;
			padding: 1rem;
		}

		p {
			font-size: clamp(1.28rem, 7vw, 2rem);
			line-height: 1.32;
		}

		.archive p {
			font-size: clamp(1.42rem, 9vw, 2.45rem);
			line-height: 1.16;
		}

		.landscape {
			min-height: 130vh;
		}

		.landscape .beat {
			min-height: 86vh;
			padding: 10vh 1.2rem;
		}

		.landscape p {
			font-size: clamp(2rem, 12vw, 3.5rem);
			line-height: 1.03;
		}

		.pause .beat {
			min-height: 82vh;
			padding: 10vh 1.2rem;
		}

		.pause p {
			font-size: clamp(1.48rem, 9vw, 2.75rem);
			line-height: 1.14;
		}

	}

	@media (prefers-reduced-motion: reduce) {
		.beat {
			opacity: 1;
			filter: none;
			transition: none;
		}
	}
</style>
