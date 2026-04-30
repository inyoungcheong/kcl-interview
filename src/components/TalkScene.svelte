<script>
	import TalkMedia from "$components/TalkMedia.svelte";

let { scene, active = false, onNext = () => {} } = $props();

	function goToThread(event, target) {
		event.stopPropagation();
		if (!target) return;

		document.querySelector(`[data-scene-id="${target}"]`)?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}
</script>

<section
	class={`talk-scene scene-${scene.id ?? "unknown"} align-${scene.align ?? "left-bottom"} transition-${scene.transition ?? "fade"}`}
	style={`--scene-eyebrow-color: ${scene.eyebrowColor ?? "rgba(255, 250, 246, 0.72)"}; --scene-title-color: ${scene.titleColor ?? "#fffaf6"}; --scene-text-color: ${scene.textColor ?? "rgba(255, 250, 246, 0.9)"};`}
>
	<TalkMedia background={scene.background} {active} />

	<div class={`shade shade-${scene.background?.shade ?? "standard"}`}></div>
	{#if scene.eyebrow || scene.title || scene.text}
		<div class="copy">
			{#if scene.eyebrow}
				<p class="eyebrow">{scene.eyebrow}</p>
			{/if}
			{#if scene.title}
				<h1>{scene.title}</h1>
			{/if}
			{#if scene.text}
				<p class="text">{scene.text}</p>
			{/if}
			{#if scene.logos?.length}
				<div class="logo-strip" aria-label="Collaborating institutions">
					{#each scene.logos as logo, index}
						{#if index > 0}
							<span class="logo-connector" aria-hidden="true">x</span>
						{/if}
						<div class="logo-card">
							<img src={logo.src} alt={logo.alt} style={`--logo-scale: ${logo.scale ?? 1};`} />
						</div>
					{/each}
				</div>
			{/if}
			{#if scene.threads?.length}
				<div class="thread-grid" aria-label="Research threads">
					{#each scene.threads as thread}
						<button
							class="thread-item"
							type="button"
							onclick={(event) => goToThread(event, thread.target)}
							aria-label={`Go to ${thread.label}: ${thread.title}`}
						>
							<p class="thread-label">{thread.label}</p>
							<h2>{thread.title}</h2>
							<p>{thread.text}</p>
						</button>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
	{#if scene.caption}
		<div class="caption">
			<span class="caption-label">{scene.caption.label}</span>
			<span class="caption-title">{scene.caption.title}</span>
			<span class="caption-venue">{scene.caption.venue}</span>
			{#if scene.caption.href}
				<a href={scene.caption.href} target="_blank" rel="noopener" onclick={(event) => event.stopPropagation()}>
					Open ↗
				</a>
			{/if}
		</div>
	{/if}
	{#if scene.nextButtonLabel}
		<button
			class="next-page-btn"
			type="button"
			onclick={(event) => {
				event.stopPropagation();
				onNext();
			}}
		>
			{scene.nextButtonLabel}
		</button>
	{/if}
</section>

<style>
	.talk-scene {
		position: relative;
		min-height: 100svh;
		display: grid;
		overflow: hidden;
		background: #050505;
		color: #fffaf6;
		isolation: isolate;
	}

	.shade {
		position: absolute;
		inset: 0;
		z-index: 1;
		background:
			linear-gradient(to bottom, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.54)),
			linear-gradient(to right, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.16) 58%, rgba(0, 0, 0, 0.34));
		pointer-events: none;
	}

	.shade-light {
		background:
			linear-gradient(to right, rgba(0, 0, 0, 0.42), transparent 54%),
			linear-gradient(to bottom, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.18));
	}

	.shade-subtle {
		background:
			radial-gradient(circle at center, transparent 42%, rgba(0, 0, 0, 0.2) 100%),
			linear-gradient(to bottom, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.16));
	}

	.shade-none {
		display: none;
	}

	.copy {
		position: relative;
		z-index: 2;
		width: min(1040px, calc(100vw - 12vw));
		padding: 8vh 6vw;
		box-sizing: border-box;
		transition:
			opacity 220ms ease,
			filter 220ms ease;
	}

	:global(body.paper-modal-open) .scene-paper-chain .copy {
		opacity: 0;
		filter: blur(4px);
		pointer-events: none;
	}

	.align-left-bottom {
		align-items: end;
		justify-items: start;
	}

	.align-left-center {
		align-items: center;
		justify-items: start;
	}

	.align-center {
		align-items: center;
		justify-items: center;
		text-align: center;
	}

	.align-center .copy {
		width: min(920px, calc(100vw - 12vw));
		padding-inline: 0;
	}

	.align-center h1,
	.align-center .text {
		margin-left: auto;
		margin-right: auto;
	}

	.scene-opening,
	.scene-trajectory {
		background: transparent;
	}

	.scene-kcl-fit .copy {
		transform: translateX(0.8vw);
	}

	.scene-loyalty-eval .logo-card {
		width: clamp(14rem, 26vw, 26rem);
		height: clamp(8rem, 13vw, 13rem);
	}

	.scene-research-map .copy {
		width: min(1180px, calc(100vw - 12vw));
	}

	.scene-research-map h1 {
		white-space: pre-line;
	}

	.eyebrow {
		margin: 0 0 1rem;
		font-family: var(--font-sans);
		font-size: clamp(0.68rem, 0.78vw, 0.84rem);
		font-weight: 600;
		letter-spacing: 0.18em;
		line-height: 1.35;
		text-transform: uppercase;
		color: var(--scene-eyebrow-color);
	}

	h1 {
		margin: 0;
		max-width: 980px;
		font-family: "DM Serif Display", var(--font-serif);
		font-size: clamp(2.4rem, 3.8vw, 4.4rem);
		font-style: italic;
		font-weight: 400;
		letter-spacing: 0;
		line-height: 1.1;
		color: var(--scene-title-color);
		text-wrap: balance;
		text-shadow: 0 2px 32px rgba(0, 0, 0, 0.62);
	}

	.text {
		max-width: 780px;
		margin: 1.45rem 0 0;
		font-family: var(--font-serif);
		font-size: clamp(1.25rem, 2vw, 2rem);
		letter-spacing: 0;
		line-height: 1.35;
		color: var(--scene-text-color);
		text-wrap: balance;
		text-shadow: 0 2px 24px rgba(0, 0, 0, 0.72);
	}

	.logo-strip {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 1.2rem;
		margin: 2.8rem auto 0;
		max-width: min(900px, 86vw);
	}

	.logo-connector {
		margin: 0 0.4rem;
		font-family: var(--font-sans);
		font-size: clamp(1rem, 1.4vw, 1.4rem);
		font-weight: 400;
		line-height: 1;
		color: rgba(255, 250, 246, 0.28);
	}

	.logo-card {
		display: grid;
		place-items: center;
		width: clamp(10rem, 18vw, 18rem);
		height: clamp(6rem, 9vw, 9rem);
		padding: 0.5rem 0.8rem;
		box-sizing: border-box;
	}

	.logo-card img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		filter: saturate(0.92) brightness(1.02);
		opacity: 0.9;
		transform: scale(var(--logo-scale));
	}

	.thread-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(0.9rem, 1.6vw, 1.4rem);
		margin: clamp(2rem, 4vw, 3.2rem) auto 0;
		max-width: 1060px;
		text-align: left;
	}

	.thread-item {
		min-width: 0;
		padding: 1.05rem 1rem 1.1rem;
		border-right: 0;
		border-bottom: 0;
		border-left: 0;
		border-top: 1px solid rgba(255, 250, 246, 0.28);
		background: linear-gradient(180deg, rgba(255, 250, 246, 0.055), rgba(255, 250, 246, 0.018));
		box-shadow: 0 18px 54px rgba(0, 0, 0, 0.26);
		color: inherit;
		text-align: left;
		cursor: pointer;
		transition:
			border-color 180ms ease,
			background 180ms ease,
			transform 180ms ease;
	}

	.thread-item:hover,
	.thread-item:focus-visible {
		border-color: rgba(255, 250, 246, 0.58);
		background: linear-gradient(180deg, rgba(255, 250, 246, 0.085), rgba(255, 250, 246, 0.026));
		transform: translateY(-0.12rem);
		outline: none;
	}

	.thread-label {
		margin: 0 0 0.72rem;
		font-family: var(--font-sans);
		font-size: clamp(0.62rem, 0.72vw, 0.74rem);
		font-weight: 700;
		letter-spacing: 0.16em;
		line-height: 1.3;
		text-transform: uppercase;
		color: rgba(255, 250, 246, 0.54);
	}

	.thread-item h2 {
		margin: 0;
		font-family: var(--font-serif);
		font-size: clamp(1.18rem, 1.75vw, 1.72rem);
		font-style: italic;
		font-weight: 400;
		letter-spacing: 0;
		line-height: 1.16;
		color: #fffaf6;
		text-wrap: balance;
	}

	.thread-item p:last-child {
		margin: 0.75rem 0 0;
		font-family: var(--font-sans);
		font-size: clamp(0.82rem, 0.98vw, 0.96rem);
		letter-spacing: 0;
		line-height: 1.55;
		color: rgba(255, 250, 246, 0.68);
	}

	.caption {
		position: absolute;
		left: 2rem;
		bottom: 1.6rem;
		z-index: 3;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.42rem 0.65rem;
		max-width: min(760px, calc(100vw - 4rem));
		padding: 0.68rem 0.82rem;
		border: 1px solid rgba(255, 250, 246, 0.18);
		background: rgba(5, 5, 5, 0.58);
		backdrop-filter: blur(10px);
		font-family: var(--font-sans);
		font-size: clamp(0.62rem, 0.82vw, 0.78rem);
		letter-spacing: 0.08em;
		line-height: 1.35;
		text-transform: uppercase;
		color: rgba(255, 250, 246, 0.72);
		box-shadow: 0 16px 48px rgba(0, 0, 0, 0.34);
	}

	.caption-title {
		flex: 1 1 auto;
		min-width: 8rem;
		max-width: 34rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-family: var(--font-serif);
		font-size: clamp(0.92rem, 1.25vw, 1.16rem);
		font-style: italic;
		letter-spacing: 0;
		line-height: 1.2;
		text-transform: none;
		color: rgba(255, 250, 246, 0.96);
	}

	.caption-label,
	.caption-venue {
		font-weight: 650;
	}

	.caption a {
		flex: 0 0 auto;
		border: 1px solid rgba(255, 250, 246, 0.28);
		padding: 0.28rem 0.45rem;
		color: rgba(255, 250, 246, 0.9);
		text-decoration: none;
	}

	.caption a:hover {
		border-color: rgba(255, 250, 246, 0.72);
		color: #fffaf6;
	}

	.next-page-btn {
		position: absolute;
		right: 1.8rem;
		bottom: 1.4rem;
		z-index: 4;
		padding: 0.34rem 0.62rem;
		border: 1px solid rgba(255, 250, 246, 0.34);
		border-radius: 999px;
		background: rgba(5, 5, 5, 0.48);
		color: rgba(255, 250, 246, 0.88);
		font-family: var(--font-sans);
		font-size: clamp(0.62rem, 0.76vw, 0.72rem);
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		cursor: pointer;
		backdrop-filter: blur(6px);
	}

	.next-page-btn:hover {
		border-color: rgba(255, 250, 246, 0.58);
		color: #fffaf6;
	}

	.transition-cut .copy {
		animation: none;
	}

	.transition-fade .copy,
	.transition-slow-fade .copy {
		animation: copy-in 760ms ease both;
	}

	.transition-slow-fade .copy {
		animation-duration: 1100ms;
	}

	@keyframes copy-in {
		from {
			opacity: 0;
			transform: translateY(0.5rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 780px) {
		.copy,
		.align-center .copy {
			width: min(100%, calc(100vw - 3rem));
			padding: 6.5vh 1.2rem;
			padding-right: 1.8rem;
		}

		h1 {
			font-size: clamp(2rem, 8.5vw, 3.05rem);
			line-height: 1.08;
		}

		.text {
			margin-top: 1rem;
			font-size: clamp(1.05rem, 5vw, 1.48rem);
			line-height: 1.36;
		}

		.caption {
			left: 0.8rem;
			right: 1.6rem;
			bottom: 0.8rem;
			max-width: none;
			padding: 0.58rem 0.65rem;
			gap: 0.34rem 0.5rem;
		}

		.caption-title {
			flex-basis: 100%;
			min-width: 0;
			max-width: none;
			overflow: visible;
			text-overflow: clip;
			white-space: normal;
			font-size: clamp(0.9rem, 4.1vw, 1.08rem);
		}

		.caption a {
			margin-left: auto;
		}

		.next-page-btn {
			right: 0.9rem;
			bottom: 0.85rem;
			font-size: 0.62rem;
		}

		.logo-strip {
			gap: 0.55rem;
			margin-top: 1.45rem;
		}

		.logo-card {
			width: clamp(4.7rem, 26vw, 6.4rem);
			height: 2.8rem;
		}

		.thread-grid {
			grid-template-columns: 1fr;
			gap: 0.7rem;
			margin-top: 1.3rem;
		}

		.thread-item {
			padding: 0.78rem 0.8rem 0.82rem;
		}

		.thread-label {
			margin-bottom: 0.42rem;
			font-size: 0.58rem;
		}

		.thread-item h2 {
			font-size: clamp(1.02rem, 5vw, 1.28rem);
		}

		.thread-item p:last-child {
			margin-top: 0.42rem;
			font-size: clamp(0.74rem, 3.5vw, 0.88rem);
			line-height: 1.42;
		}

		.scene-paper-chain .copy {
			padding-top: 5vh;
		}

		.scene-paper-chain h1 {
			font-size: clamp(2.05rem, 9vw, 3.1rem);
		}

		.scene-paper-chain .text {
			max-width: 18rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.transition-fade .copy,
		.transition-slow-fade .copy {
			animation: none;
		}
	}
</style>
