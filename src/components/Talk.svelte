<script>
	import { onMount, tick } from "svelte";
	import { base } from "$app/paths";
	import TalkScene from "$components/TalkScene.svelte";
	import ProgressDots from "$components/ProgressDots.svelte";
	import { scenes } from "$data/scenes.js";

	let activeIndex = $state(0);
	let sceneEls = [];
	let scrollLocked = false;
	let unlockTimer;
	let londonVideoEl = $state();

	let londonVisible = $derived(activeIndex <= 1);

	$effect(() => {
		if (!londonVideoEl) return;
		if (londonVisible) {
			londonVideoEl.play().catch(() => {});
		} else {
			londonVideoEl.pause();
		}
	});

	const lastIndex = $derived(scenes.length - 1);

	function clampIndex(index) {
		return Math.max(0, Math.min(lastIndex, index));
	}

	async function goTo(index, behavior = "smooth") {
		const nextIndex = clampIndex(index);
		activeIndex = nextIndex;
		scrollLocked = true;
		clearTimeout(unlockTimer);
		await tick();
		sceneEls[nextIndex]?.scrollIntoView({ behavior, block: "start" });
		unlockTimer = setTimeout(() => {
			scrollLocked = false;
		}, behavior === "auto" ? 80 : 620);
	}

	function next() {
		goTo(activeIndex + 1);
	}

	function previous() {
		goTo(activeIndex - 1);
	}

	function handleKeydown(event) {
		if (["ArrowRight", "ArrowDown", " "].includes(event.key)) {
			event.preventDefault();
			next();
			return;
		}

		if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
			event.preventDefault();
			previous();
		}
	}

	function handleClick(event) {
		if (event.target.closest("a, button")) return;
		next();
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (scrollLocked) return;
				const visibleEntry = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

				if (!visibleEntry) return;
				const nextIndex = Number(visibleEntry.target.dataset.index);
				if (!Number.isNaN(nextIndex)) activeIndex = nextIndex;
			},
			{ threshold: [0.52, 0.72, 0.9] }
		);

		for (const el of sceneEls) {
			if (el) observer.observe(el);
		}

		window.addEventListener("keydown", handleKeydown);
		window.addEventListener("click", handleClick);

		return () => {
			clearTimeout(unlockTimer);
			observer.disconnect();
			window.removeEventListener("keydown", handleKeydown);
			window.removeEventListener("click", handleClick);
		};
	});
</script>

<div class="london-bg" class:visible={londonVisible} aria-hidden="true">
	<video bind:this={londonVideoEl} muted loop playsinline preload="metadata">
		<source src="{base}/video/london.mp4" type="video/mp4" />
	</video>
</div>

<section class="talk" aria-label="Research talk presentation">
	{#each scenes as scene, index}
		<div class="snap" data-index={index} data-scene-id={scene.id} bind:this={sceneEls[index]}>
			<TalkScene {scene} active={index === activeIndex} onNext={() => goTo(index + 1)} />
		</div>
	{/each}

	<ProgressDots count={scenes.length} activeIndex={activeIndex} onSelect={goTo} />
</section>

<style>
	.talk {
		min-height: 100svh;
		background: #050505;
		color: #fff;
		scroll-snap-type: y mandatory;
	}

	:global(html) {
		scroll-snap-type: y mandatory;
	}

	.snap {
		min-height: 100svh;
		scroll-snap-align: start;
		scroll-snap-stop: always;
	}

	.london-bg {
		position: fixed;
		inset: 0;
		z-index: 0;
		opacity: 0;
		transition: opacity 900ms ease;
		pointer-events: none;
	}

	.london-bg.visible {
		opacity: 1;
	}

	.london-bg video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
		filter: saturate(0.7) contrast(1.1) brightness(0.55);
	}
</style>
