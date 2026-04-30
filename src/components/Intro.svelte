<script>
	let { onEnter } = $props();
</script>

<div class="overlay" onclick={onEnter} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && onEnter()}>
	<div class="overlay-content">
		<p class="eyebrow">Inyoung Cheong</p>
		<h1>A story about government,<br />code, and why AI safety<br />is personal.</h1>
		<button class="enter-btn" onclick={onEnter}>
			<span>Begin</span>
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
				<path d="M10 3v14M10 17l-5-5M10 17l5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
			</svg>
		</button>
		<p class="audio-note">🔊 Audio on for the full experience</p>
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background: #3a4f4f;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: var(--z-modal);
		cursor: pointer;
	}

	.overlay-content {
		text-align: center;
		max-width: 600px;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	.eyebrow {
		font-family: var(--font-sans);
		font-size: var(--14px);
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--accent);
		margin: 0;
	}

	h1 {
		font-family: var(--font-serif);
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 400;
		color: var(--text-light);
		line-height: 1.2;
		margin: 0;
	}

	.enter-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: transparent;
		border: 1px solid var(--accent);
		color: var(--accent);
		font-family: var(--font-sans);
		font-size: var(--14px);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 0.75rem 2rem;
		cursor: pointer;
		transition: background 0.2s, color 0.2s;
		margin-top: 0.5rem;
	}

	.enter-btn:hover {
		background: var(--accent);
		color: #fff;
	}

	.audio-note {
		font-family: var(--font-sans);
		font-size: var(--12px);
		color: var(--text-muted-light);
		margin: 0;
	}
</style>
