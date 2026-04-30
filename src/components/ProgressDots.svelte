<script>
	let { count = 0, activeIndex = 0, onSelect = () => {} } = $props();
</script>

<nav class="progress-dots" aria-label="Presentation progress">
	{#each Array(count) as _, index}
		<button
			type="button"
			class:active={index === activeIndex}
			aria-label={`Go to scene ${index + 1}`}
			aria-current={index === activeIndex ? "step" : undefined}
			onclick={(event) => {
				event.stopPropagation();
				onSelect(index);
			}}
		></button>
	{/each}
</nav>

<style>
	.progress-dots {
		position: fixed;
		right: 1.15rem;
		top: 50%;
		z-index: 20;
		display: grid;
		gap: 0.65rem;
		transform: translateY(-50%);
	}

	button {
		width: 0.5rem;
		height: 0.5rem;
		border: 1px solid rgba(255, 250, 246, 0.54);
		border-radius: 999px;
		padding: 0;
		background: transparent;
		cursor: pointer;
		transition:
			background 180ms ease,
			border-color 180ms ease,
			transform 180ms ease;
	}

	button:hover,
	button:focus-visible,
	button.active {
		background: #fffaf6;
		border-color: #fffaf6;
		transform: scale(1.28);
	}

	@media (max-width: 780px) {
		.progress-dots {
			right: 0.42rem;
			gap: 0.42rem;
		}

		button {
			width: 0.42rem;
			height: 0.42rem;
		}
	}
</style>
