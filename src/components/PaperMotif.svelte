<script>
	import { base } from "$app/paths";
	import { papers } from "$data/papers.js";

	let { motif, activeBeat = 0, activeMedia } = $props();

	const intensityMap = {
		low: { opacity: 0.46, scale: 0.82 },
		medium: { opacity: 0.58, scale: 0.88 },
		high: { opacity: 0.74, scale: 0.96 }
	};

	let failed = $state(new Set());
	let visiblePapers = $derived(papers.filter((paper) => !failed.has(paper.src)));
	let visible = $derived(activeMedia?.type !== "video" && visiblePapers.length > 0);
	let intensity = $derived(motif?.intensity ?? "low");
	let tone = $derived(intensityMap[intensity] ?? intensityMap.low);
	let currentIndex = $derived(visiblePapers.length ? ((activeBeat + (motif?.offset ?? 0)) % visiblePapers.length) : 0);
	let currentPaper = $derived(visiblePapers[currentIndex]);
	let currentMeta = $derived(currentPaper ? makeMeta(currentPaper) : {});
	let expanded = $state(false);

	const asset = (path) => `${base}${path}`;

	function markFailed(src) {
		failed = new Set([...failed, src]);
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

	function expandPaper(event) {
		event.preventDefault();
		expanded = true;
	}

	function closeExpanded() {
		expanded = false;
	}
</script>

<div class="paper-motif" class:visible>
	{#if visiblePapers.length && currentPaper}
		<button
			type="button"
			class="paper-card"
			class:clickable={!!currentPaper?.href}
			onclick={expandPaper}
			style={`--paper-opacity: ${tone.opacity}; --paper-scale: ${tone.scale};`}
		>
			<img
				class="paper"
				src={asset(currentPaper.src)}
				alt=""
				onerror={() => markFailed(currentPaper.src)}
			/>
			<div class="caption">
				{#if currentMeta.tag}
					<span class="tag">{currentMeta.tag}</span>
				{/if}
				<span class="venue">
					{currentMeta.venue}{#if currentMeta.year} ({currentMeta.year}){/if}
				</span>
				{#if currentPaper.href}
					<span class="open-link">Open ↗</span>
				{/if}
			</div>
		</button>
	{/if}
</div>

{#if expanded && currentPaper}
	<div class="paper-modal" role="dialog" aria-modal="true" aria-label={currentMeta.venue}>
		<button class="modal-backdrop" type="button" aria-label="Close paper preview" onclick={closeExpanded}></button>
		<div class="modal-card">
			<button class="modal-close" type="button" aria-label="Close paper preview" onclick={closeExpanded}>Close</button>
			<img class="modal-paper" src={asset(currentPaper.src)} alt="" />
			<div class="modal-meta">
				<div>
					{#if currentMeta.tag}
						<span class="tag">{currentMeta.tag}</span>
					{/if}
					<p class="modal-title">
						{currentMeta.venue}{#if currentMeta.year} ({currentMeta.year}){/if}
					</p>
				</div>
				{#if currentPaper.href}
					<a class="modal-open" href={currentPaper.href} target="_blank" rel="noopener">Open Paper ↗</a>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.paper-motif {
		position: absolute;
		inset: 0;
		z-index: 2;
		overflow: hidden;
		background: transparent;
		opacity: 0;
		transition: opacity 600ms ease;
		pointer-events: none;
	}

	.paper-motif.visible {
		opacity: 1;
	}

	.paper-card {
		border: 0;
		padding: 0;
		background: transparent;
		position: absolute;
		right: clamp(1.2rem, 7vw, 7rem);
		top: 50%;
		width: min(34vw, 430px);
		opacity: var(--paper-opacity);
		transform: translateY(-50%) translateX(0.4rem) scale(var(--paper-scale));
		text-decoration: none;
		pointer-events: auto;
		cursor: zoom-in;
		transition:
			opacity 780ms ease,
			transform 980ms ease;
	}

	.visible .paper-card {
		transform: translateY(-50%) translateX(0) scale(var(--paper-scale));
	}

	.paper {
		width: 100%;
		max-height: 64vh;
		display: block;
		object-fit: contain;
		filter: brightness(1.04) contrast(1);
		box-shadow:
			0 28px 72px rgba(0, 0, 0, 0.44),
			0 0 0 1px rgba(255, 255, 255, 0.16);
	}

	.clickable .paper {
		cursor: zoom-in;
	}

	.clickable:hover .paper {
		filter: brightness(1.12) contrast(1.02);
	}

	.caption {
		display: grid;
		justify-items: end;
		gap: 0.38rem;
		margin: 0.8rem 0 0;
		font-family: var(--font-sans);
		font-size: 0.68rem;
		letter-spacing: 0.16em;
		line-height: 1.45;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.7);
		text-align: right;
		text-shadow: 0 1px 12px rgba(0, 0, 0, 0.88);
	}

	.tag {
		color: rgba(255, 218, 204, 0.96);
	}

	.venue {
		max-width: min(34vw, 430px);
	}

	.open-link {
		display: inline-block;
		padding: 0.28rem 0.48rem;
		border: 1px solid rgba(255, 218, 204, 0.54);
		background: rgba(255, 218, 204, 0.12);
		color: rgba(255, 245, 240, 0.96);
		letter-spacing: 0.12em;
		text-shadow: none;
	}

	.paper-modal {
		position: fixed;
		inset: 0;
		z-index: 20;
		display: grid;
		place-items: center;
		padding: 3vh 3vw;
		box-sizing: border-box;
	}

	.modal-backdrop {
		position: absolute;
		inset: 0;
		border: 0;
		background: rgba(0, 0, 0, 0.78);
		backdrop-filter: blur(10px);
		cursor: zoom-out;
	}

	.modal-card {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 1rem;
		width: min(82vw, 920px);
		max-height: 94vh;
	}

	.modal-paper {
		width: 100%;
		max-height: 78vh;
		object-fit: contain;
		background: #fff;
		box-shadow:
			0 34px 100px rgba(0, 0, 0, 0.62),
			0 0 0 1px rgba(255, 255, 255, 0.2);
	}

	.modal-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding: 0.9rem 1rem;
		background: rgba(7, 9, 8, 0.82);
		border: 1px solid rgba(255, 218, 204, 0.24);
		font-family: var(--font-sans);
		color: #fff;
	}

	.modal-title {
		margin: 0.25rem 0 0;
		font-size: 0.78rem;
		letter-spacing: 0.13em;
		line-height: 1.45;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.82);
	}

	.modal-open {
		flex: 0 0 auto;
		padding: 0.7rem 0.9rem;
		border: 1px solid rgba(255, 218, 204, 0.72);
		background: rgba(255, 218, 204, 0.18);
		color: #fff5f0;
		font-family: var(--font-sans);
		font-size: 0.78rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		text-decoration: none;
	}

	.modal-open:hover {
		background: rgba(255, 218, 204, 0.32);
		border-color: rgba(255, 245, 240, 0.92);
	}

	.modal-close {
		justify-self: end;
		border: 1px solid rgba(255, 255, 255, 0.3);
		background: rgba(7, 9, 8, 0.74);
		color: rgba(255, 255, 255, 0.86);
		padding: 0.48rem 0.7rem;
		font-family: var(--font-sans);
		font-size: 0.66rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		cursor: pointer;
	}

	.clickable:hover .open-link {
		background: rgba(255, 218, 204, 0.26);
		border-color: rgba(255, 245, 240, 0.82);
	}

	@media (max-width: 768px) {
		.paper-card {
			top: 20vh;
			right: 0.35rem;
			width: min(36vw, 150px);
			opacity: calc(var(--paper-opacity) * 0.58);
			transform: translateY(-50%) translateX(0) scale(calc(var(--paper-scale) * 0.92));
		}

		.paper {
			max-height: 28vh;
		}

		.caption {
			font-size: 0.48rem;
			letter-spacing: 0.1em;
			line-height: 1.35;
			gap: 0.28rem;
		}

		.venue {
			max-width: min(42vw, 170px);
		}

		.open-link {
			padding: 0.2rem 0.36rem;
		}

		.paper-modal {
			padding: 1rem;
		}

		.modal-card {
			width: 100%;
			max-height: 94vh;
			gap: 0.65rem;
		}

		.modal-paper {
			max-height: 66vh;
		}

		.modal-meta {
			display: grid;
			gap: 0.75rem;
			padding: 0.78rem;
		}

		.modal-title {
			font-size: 0.66rem;
			letter-spacing: 0.1em;
		}

		.modal-open {
			justify-self: start;
			font-size: 0.68rem;
			padding: 0.58rem 0.72rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.paper-motif,
		.paper-card {
			transition: none;
		}

		.paper-card {
			opacity: min(var(--paper-opacity), 0.28);
		}
	}
</style>
