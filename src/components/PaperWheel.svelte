<script>
	import { base } from "$app/paths";
	import { papers } from "$data/papers.js";

	let { active = false } = $props();

	const initialPaperIndex = Math.max(
		0,
		papers.findIndex((paper) => paper.src.includes("Michigan_Technology_Law_Review_2026"))
	);

	let selectedIndex = $state(initialPaperIndex);
	let paused = $state(false);
	let expanded = $state(false);
	let lastTime = 0;
	let rafId;
	let touchStartX = null;
	let touchStartY = null;

	const asset = (path) => `${base}${path}`;
	const selectedPaper = $derived(papers[selectedIndex]);
	const selectedMeta = $derived(selectedPaper ? makeMeta(selectedPaper) : {});
	const hasFeatureVideo = $derived(selectedPaper?.src.includes("Michigan_Technology_Law_Review_2026"));

	$effect(() => {
		if (typeof document === "undefined") return;

		document.body.classList.toggle("paper-modal-open", expanded);

		return () => {
			document.body.classList.remove("paper-modal-open");
		};
	});

	$effect(() => {
		if (!active || paused) return;

		function animate(time) {
			if (!lastTime) lastTime = time;
			const delta = time - lastTime;
			lastTime = time;

			if (delta > 3200) {
				selectedIndex = (selectedIndex + 1) % papers.length;
				lastTime = time;
			}

			rafId = requestAnimationFrame(animate);
		}

		rafId = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(rafId);
			lastTime = 0;
		};
	});

	function getPaperStyle(index) {
		let distance = index - selectedIndex;
		const half = papers.length / 2;
		if (distance > half) distance -= papers.length;
		if (distance < -half) distance += papers.length;
		const abs = Math.abs(distance);
		const x = distance * 11.6;
		const y = Math.min(abs, 4) * 0.34 + Math.min(abs * abs, 10) * 0.07;
		const scale = Math.max(0.54, 1.42 - abs * 0.18);
		const opacity = abs > 5 ? 0 : Math.max(0.12, 1 - abs * 0.145);
		const blur = Math.max(0, abs - 2.7) * 0.46;
		const z = 60 - abs;
		const rotate = distance * -1.8;
		const tint = papers[index]?.tag === "law" ? "rgba(239, 132, 54, 0.52)" : "rgba(118, 178, 206, 0.5)";

		return [
			`--paper-x: ${x}vw`,
			`--paper-y: ${y}rem`,
			`--paper-r: ${rotate}deg`,
			`--paper-scale: ${scale}`,
			`--paper-opacity: ${opacity}`,
			`--paper-blur: ${blur}px`,
			`--paper-z: ${z}`,
			`--paper-tint: ${tint}`
		].join("; ");
	}

	function selectPaper(index, event) {
		event.stopPropagation();
		selectedIndex = index;
		paused = true;
		expanded = true;
	}

	function previousPaper(event) {
		event.stopPropagation();
		selectedIndex = (selectedIndex - 1 + papers.length) % papers.length;
		paused = true;
	}

	function nextPaper(event) {
		event.stopPropagation();
		selectedIndex = (selectedIndex + 1) % papers.length;
		paused = true;
	}

	function closeExpanded(event) {
		event?.stopPropagation();
		expanded = false;
	}

	function handleWheel(event) {
		event.preventDefault();
		event.stopPropagation();
		selectedIndex = (selectedIndex + Math.sign(event.deltaY || 1) + papers.length) % papers.length;
		paused = true;
	}

	function stopNavigation(event) {
		event.stopPropagation();
	}

	function handleTouchStart(event) {
		const touch = event.touches?.[0];
		if (!touch) return;
		touchStartX = touch.clientX;
		touchStartY = touch.clientY;
	}

	function handleTouchMove(event) {
		const touch = event.touches?.[0];
		if (!touch || touchStartX == null || touchStartY == null) return;
		const dx = touch.clientX - touchStartX;
		const dy = touch.clientY - touchStartY;
		if (Math.abs(dx) > 18 && Math.abs(dx) > Math.abs(dy) + 6) {
			event.preventDefault();
		}
	}

	function handleTouchEnd(event) {
		const touch = event.changedTouches?.[0];
		if (!touch || touchStartX == null) return;
		const dx = touch.clientX - touchStartX;
		if (Math.abs(dx) >= 40) {
			selectedIndex = (selectedIndex + (dx < 0 ? 1 : -1) + papers.length) % papers.length;
			paused = true;
		}
		touchStartX = null;
		touchStartY = null;
	}

	function makeMeta(paper) {
		const raw = paper.src
			.split("/")
			.pop()
			.replace(/\.[^.]+$/, "")
			.replace(/_/g, " ");
		const year = raw.match(/\b(20\d{2})\b/)?.[1] ?? "";
		const venue = raw
			.replace(/\b20\d{2}\b/g, "")
			.replace(/\s+/g, " ")
			.trim()
			.replace(/\bACM FAccT\b/, "ACM FAccT")
			.replace(/\bAAAI ACM AIES\b/, "AAAI/ACM AIES")
			.replace(/\bICLR BiAlign workshop\b/, "ICLR BiAlign Workshop")
			.replace(/\bICML GenLaw workshop\b/, "ICML GenLaw Workshop")
			.replace(/\bNeurIPS MP2 workshop\b/, "NeurIPS MP2 Workshop")
			.replace(/\bCHIWORK AI disclosure workshop\b/, "CHIWORK AI Disclosure Workshop");

		return {
			tag: paper.tag ?? "",
			venue,
			year
		};
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<div
	class="paper-flow"
	role="region"
	aria-label="Interactive publication flow"
	onclick={stopNavigation}
	onwheel={handleWheel}
	ontouchstart={handleTouchStart}
	ontouchmove={handleTouchMove}
	ontouchend={handleTouchEnd}
	onmouseenter={() => (paused = true)}
	onmouseleave={() => {
		paused = false;
		lastTime = 0;
	}}
>
	<div class="flow-line" aria-hidden="true"></div>
	<div class="papers">
		{#each papers as paper, index}
			<button
				type="button"
				class="paper-card"
				class:selected={index === selectedIndex}
				style={getPaperStyle(index)}
				onclick={(event) => selectPaper(index, event)}
				aria-label={`Preview ${makeMeta(paper).venue}`}
			>
				<img src={asset(paper.src)} alt="" loading="lazy" />
			</button>
		{/each}
	</div>

	{#if selectedPaper}
		<button class="side-step side-step-left" type="button" aria-label="Previous paper" onclick={previousPaper}></button>
		<button class="side-step side-step-right" type="button" aria-label="Next paper" onclick={nextPaper}></button>
	{/if}

	{#if expanded && selectedPaper}
		<div class="paper-modal" role="dialog" aria-modal="true" aria-label={selectedMeta.venue}>
			<button class="modal-backdrop" type="button" aria-label="Close paper preview" onclick={closeExpanded}></button>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="modal-card" class:with-video={hasFeatureVideo} onclick={(event) => event.stopPropagation()}>
				<button class="modal-close" type="button" aria-label="Close paper preview" onclick={closeExpanded}>Close</button>
				<img class="modal-paper" src={asset(selectedPaper.src)} alt="" />
				{#if hasFeatureVideo}
					<div class="feature-video">
						<video controls playsinline preload="none">
							<source src={asset("/video/iaseai_short.mp4")} type="video/mp4" />
						</video>
						<a
							class="full-video-chip"
							href="https://youtu.be/BWVG_IsB4rI"
							target="_blank"
							rel="noopener"
							onclick={(event) => event.stopPropagation()}
						>
							Full video
						</a>
					</div>
				{/if}
				<div class="modal-caption">
					<div>
						{#if selectedMeta.tag}
							<span class="paper-tag">{selectedMeta.tag}</span>
						{/if}
						<p>
							{selectedMeta.venue}{#if selectedMeta.year} <span>({selectedMeta.year})</span>{/if}
						</p>
					</div>
					<a
						class="open-chip"
						href={selectedPaper.href}
						target="_blank"
						rel="noopener"
						onclick={(event) => event.stopPropagation()}
					>
						Open
					</a>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.paper-flow {
		position: absolute;
		inset: 0;
		overflow: hidden;
		background:
			radial-gradient(ellipse at 50% 35%, rgba(255, 250, 246, 0.18), transparent 29%),
			radial-gradient(ellipse at 28% 44%, rgba(239, 132, 54, 0.11), transparent 34%),
			radial-gradient(ellipse at 72% 40%, rgba(118, 178, 206, 0.1), transparent 36%),
			linear-gradient(180deg, rgba(255, 250, 246, 0.05), transparent 38%),
			#050505;
		touch-action: pan-y;
	}

	.paper-flow::before,
	.paper-flow::after {
		content: "";
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.paper-flow::before {
		background:
			linear-gradient(90deg, rgba(255, 250, 246, 0.018) 1px, transparent 1px),
			linear-gradient(0deg, rgba(255, 250, 246, 0.014) 1px, transparent 1px);
		background-size: 5.5rem 5.5rem;
		mask-image: radial-gradient(ellipse at 50% 36%, black 0%, transparent 64%);
		opacity: 0.46;
	}

	.paper-flow::after {
		background:
			linear-gradient(180deg, transparent 0%, rgba(5, 5, 5, 0.02) 34%, rgba(5, 5, 5, 0.72) 74%, #050505 100%),
			radial-gradient(ellipse at 50% 37%, transparent 0 35%, rgba(0, 0, 0, 0.34) 66%, rgba(0, 0, 0, 0.72) 100%);
	}

	.flow-line {
		position: absolute;
		left: 50%;
		top: 32.5%;
		width: min(78vw, 1120px);
		height: min(13vw, 168px);
		border-top: 1px solid rgba(255, 250, 246, 0.22);
		border-bottom: 1px solid rgba(255, 250, 246, 0.07);
		border-radius: 50%;
		transform: translate(-50%, -50%) rotate(-2.5deg);
		box-shadow: 0 24px 80px rgba(255, 250, 246, 0.05);
		opacity: 0.72;
		pointer-events: none;
	}

	.papers {
		position: absolute;
		left: 50%;
		top: 32.5%;
		width: 0;
		height: 0;
	}

	.paper-card {
		position: absolute;
		left: 0;
		top: 0;
		z-index: var(--paper-z);
		width: clamp(7.4rem, 13.2vw, 13.2rem);
		aspect-ratio: 0.72;
		padding: 0;
		border: 0;
		background: transparent;
		opacity: var(--paper-opacity);
		filter: blur(var(--paper-blur));
		transform:
			translate(-50%, -50%)
			translate(var(--paper-x), var(--paper-y))
			rotate(var(--paper-r))
			scale(var(--paper-scale));
		transition:
			transform 620ms cubic-bezier(0.2, 0.72, 0.18, 1),
			opacity 420ms ease,
			filter 420ms ease;
		cursor: pointer;
		pointer-events: auto;
	}

	.paper-card img {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: cover;
		object-position: top center;
		background: #fff;
		box-shadow:
			0 24px 64px rgba(0, 0, 0, 0.56),
			0 0 0 1px rgba(255, 250, 246, 0.1);
		transition:
			box-shadow 420ms ease,
			filter 420ms ease;
	}

	.paper-card.selected img,
	.paper-card:hover img {
		box-shadow:
			0 34px 110px rgba(0, 0, 0, 0.72),
			0 0 0 1px rgba(255, 250, 246, 0.68),
			0 0 42px var(--paper-tint);
		filter: saturate(1.03) contrast(1.02);
	}

	.paper-card::after {
		content: "";
		position: absolute;
		inset: -0.42rem;
		z-index: -1;
		background: radial-gradient(ellipse, var(--paper-tint), transparent 66%);
		opacity: 0;
		filter: blur(13px);
		transition: opacity 420ms ease;
	}

	.paper-card.selected::after {
		opacity: 0.28;
	}

	.side-step {
		position: absolute;
		top: 26%;
		z-index: 68;
		width: min(18vw, 15rem);
		height: min(32vh, 17rem);
		border: 0;
		background: transparent;
		cursor: pointer;
		pointer-events: auto;
	}

	.side-step::before {
		content: "";
		position: absolute;
		top: 50%;
		width: 2.4rem;
		height: 2.4rem;
		border-top: 1px solid rgba(255, 250, 246, 0.28);
		border-left: 1px solid rgba(255, 250, 246, 0.28);
		opacity: 0.44;
		transition:
			opacity 220ms ease,
			transform 220ms ease,
			border-color 220ms ease;
	}

	.side-step:hover::before,
	.side-step:focus-visible::before {
		opacity: 0.84;
		border-color: rgba(255, 250, 246, 0.74);
	}

	.side-step-left {
		left: 0;
	}

	.side-step-left::before {
		left: 2.6rem;
		transform: translateY(-50%) rotate(-45deg) translateX(0.35rem);
	}

	.side-step-left:hover::before,
	.side-step-left:focus-visible::before {
		transform: translateY(-50%) rotate(-45deg) translateX(0);
	}

	.side-step-right {
		right: 0;
	}

	.side-step-right::before {
		right: 2.6rem;
		transform: translateY(-50%) rotate(135deg) translateX(0.35rem);
	}

	.side-step-right:hover::before,
	.side-step-right:focus-visible::before {
		transform: translateY(-50%) rotate(135deg) translateX(0);
	}


	.modal-caption > div {
		min-width: 0;
	}

	.paper-tag {
		font-size: 0.64rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: rgba(255, 250, 246, 0.62);
	}

	.open-chip {
		flex: 0 0 auto;
		align-self: center;
		border: 1px solid rgba(255, 250, 246, 0.3);
		padding: 0.42rem 0.62rem;
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.13em;
		text-transform: uppercase;
		color: rgba(255, 250, 246, 0.88);
		text-decoration: none;
	}

	.open-chip:hover {
		border-color: rgba(255, 250, 246, 0.72);
		color: #fffaf6;
	}

	.paper-modal {
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: grid;
		place-items: center;
		background: rgba(0, 0, 0, 0.66);
		backdrop-filter: blur(10px);
	}

	.modal-backdrop {
		position: absolute;
		inset: 0;
		border: 0;
		background: transparent;
		cursor: zoom-out;
	}

	.modal-card {
		position: relative;
		z-index: 1;
		display: grid;
		justify-items: center;
		width: min(52vw, 640px);
		max-width: calc(100vw - 3rem);
		transform: translateY(-1.5vh);
	}

	.modal-card.with-video {
		grid-template-columns: minmax(18rem, 0.72fr) minmax(24rem, 1fr);
		grid-template-areas:
			"paper video"
			"caption caption";
		align-items: center;
		column-gap: clamp(1.2rem, 3vw, 2.8rem);
		width: min(78vw, 1160px);
	}

	.modal-paper {
		grid-area: paper;
		width: min(34vw, 420px);
		max-width: calc(100vw - 3rem);
		max-height: 72vh;
		object-fit: contain;
		background: #fff;
		box-shadow:
			0 34px 110px rgba(0, 0, 0, 0.72),
			0 0 0 1px rgba(255, 250, 246, 0.28);
	}

	.with-video .modal-paper {
		justify-self: end;
		width: min(27vw, 360px);
		max-height: 68vh;
	}

	.feature-video {
		grid-area: video;
		position: relative;
		justify-self: start;
		width: min(42vw, 660px);
		aspect-ratio: 16 / 9;
		border: 1px solid rgba(255, 250, 246, 0.18);
		background: #050505;
		box-shadow:
			0 34px 110px rgba(0, 0, 0, 0.72),
			0 0 0 1px rgba(255, 250, 246, 0.08);
		overflow: hidden;
	}

	.feature-video video {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: cover;
	}

	.full-video-chip {
		position: absolute;
		right: 0.72rem;
		top: 0.72rem;
		border: 1px solid rgba(255, 250, 246, 0.28);
		background: rgba(5, 5, 5, 0.66);
		backdrop-filter: blur(10px);
		padding: 0.42rem 0.62rem;
		font-family: var(--font-sans);
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.13em;
		text-transform: uppercase;
		color: rgba(255, 250, 246, 0.9);
		text-decoration: none;
	}

	.full-video-chip:hover,
	.full-video-chip:focus-visible {
		border-color: rgba(255, 250, 246, 0.72);
		color: #fffaf6;
	}

	.modal-caption {
		grid-area: caption;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		width: min(44vw, 600px);
		max-width: calc(100vw - 3rem);
		margin-top: 0.8rem;
		padding: 0.8rem 0.9rem;
		border: 1px solid rgba(255, 250, 246, 0.18);
		background: rgba(5, 5, 5, 0.72);
		backdrop-filter: blur(12px);
		box-shadow: 0 18px 48px rgba(0, 0, 0, 0.42);
		font-family: var(--font-sans);
		color: rgba(255, 250, 246, 0.86);
	}

	.with-video .modal-caption {
		width: min(62vw, 820px);
	}

	.modal-caption p {
		margin: 0.18rem 0 0;
		font-family: var(--font-serif);
		font-size: clamp(1rem, 1.24vw, 1.22rem);
		font-style: italic;
		line-height: 1.2;
		color: #fffaf6;
	}

	.modal-close {
		position: absolute;
		right: calc(50% - min(17vw, 210px));
		top: -2.7rem;
		border: 1px solid rgba(255, 250, 246, 0.22);
		background: rgba(5, 5, 5, 0.72);
		padding: 0.4rem 0.6rem;
		font-family: var(--font-sans);
		font-size: 0.66rem;
		font-weight: 700;
		letter-spacing: 0.13em;
		text-transform: uppercase;
		color: rgba(255, 250, 246, 0.84);
		cursor: pointer;
	}

	@media (max-width: 780px) {
		.paper-flow {
			background:
				radial-gradient(ellipse at 50% 28%, rgba(255, 250, 246, 0.16), transparent 32%),
				radial-gradient(ellipse at 24% 36%, rgba(239, 132, 54, 0.1), transparent 38%),
				radial-gradient(ellipse at 76% 34%, rgba(118, 178, 206, 0.09), transparent 40%),
				linear-gradient(180deg, rgba(255, 250, 246, 0.04), transparent 40%),
				#050505;
		}

		.flow-line {
			top: 25%;
			width: 92vw;
			height: 24vw;
		}

		.papers {
			top: 25%;
		}

		.paper-card {
			width: clamp(5rem, 26vw, 7rem);
		}

		.side-step {
			top: 12%;
			width: 28vw;
			height: 34vh;
		}

		.side-step::before {
			width: 1.7rem;
			height: 1.7rem;
		}

		.side-step-left::before {
			left: 1rem;
		}

		.side-step-right::before {
			right: 1rem;
		}

		.modal-paper {
			width: min(84vw, 330px);
			max-height: 58svh;
		}

		.modal-card.with-video {
			grid-template-columns: 1fr;
			grid-template-areas:
				"paper"
				"video"
				"caption";
			row-gap: 0.8rem;
			width: calc(100vw - 1.6rem);
			transform: translateY(0);
		}

		.with-video .modal-paper {
			justify-self: center;
			width: min(52vw, 230px);
			max-height: 38svh;
		}

		.feature-video {
			justify-self: center;
			width: min(88vw, 420px);
		}

		.modal-caption {
			width: calc(100vw - 1.6rem);
			padding: 0.64rem 0.7rem;
			align-items: flex-start;
			gap: 0.55rem;
		}

		.modal-caption p {
			font-size: clamp(0.92rem, 4.2vw, 1.08rem);
		}

		.modal-close {
			right: 0;
			top: -2.45rem;
		}
	}
</style>
