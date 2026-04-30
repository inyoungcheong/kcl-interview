<script>
	import { onMount } from "svelte";
	import { base } from "$app/paths";

	let canvas;
	let raf;
	let resizeObserver;

	function draw(ctx, width, height, time) {
		const scale = window.devicePixelRatio || 1;
		const w = width / scale;
		const h = height / scale;
		const cell = Math.max(34, Math.min(74, w / 16));
		const rows = Math.ceil(h / cell) + 2;
		const cols = Math.ceil(w / cell) + 2;
		const breath = Math.sin(time * 0.0011) * 0.5 + 0.5;

		ctx.clearRect(0, 0, w, h);

		const gradient = ctx.createRadialGradient(w * 0.5, h * 0.25, 0, w * 0.5, h * 0.45, w * 0.9);
		gradient.addColorStop(0, "#1a0f12");
		gradient.addColorStop(0.42, "#0c0b11");
		gradient.addColorStop(1, "#070908");
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, w, h);

		ctx.save();
		ctx.globalCompositeOperation = "screen";

		for (let row = 0; row < rows; row += 1) {
			for (let col = 0; col < cols; col += 1) {
				const x = col * cell - cell * 0.5 + Math.sin(time * 0.00034 + row) * 18;
				const y = row * cell - cell * 0.5 + Math.cos(time * 0.0003 + col) * 14;
				const pulse = Math.sin(time * 0.001 + row * 0.7 + col * 0.35) * 0.5 + 0.5;
				const alpha = 0.035 + pulse * 0.11;
				const size = cell * (0.42 + breath * 0.16 + pulse * 0.08);

				ctx.strokeStyle = `rgba(255, 154, 156, ${alpha})`;
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.rect(x, y, size, size);
				ctx.stroke();

				ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.7})`;
				ctx.beginPath();
				ctx.rect(x + 3, y - 2, size, size);
				ctx.stroke();
			}
		}

		ctx.restore();
	}

	function resize() {
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		const scale = window.devicePixelRatio || 1;
		canvas.width = Math.max(1, Math.floor(rect.width * scale));
		canvas.height = Math.max(1, Math.floor(rect.height * scale));
		const ctx = canvas.getContext("2d");
		ctx.setTransform(scale, 0, 0, scale, 0, 0);
	}

	onMount(() => {
		const ctx = canvas.getContext("2d");
		resize();
		resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(canvas);

		const render = (time) => {
			draw(ctx, canvas.width, canvas.height, time);
			raf = requestAnimationFrame(render);
		};

		raf = requestAnimationFrame(render);

		return () => {
			cancelAnimationFrame(raf);
			resizeObserver?.disconnect();
		};
	});
</script>

<section class="finale" aria-label="Final note">
	<canvas bind:this={canvas}></canvas>
	<div class="finale-copy">
		<img src={`${base}/images/heart.svg`} alt="" />
		<p class="eyebrow">Final Note</p>
		<h2>That is the work I hope to continue at Anthropic.</h2>
	</div>
</section>

<style>
	.finale {
		position: relative;
		min-height: 82vh;
		display: grid;
		place-items: center;
		overflow: hidden;
		background: #070908;
		color: #fef1ec;
	}

	canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.finale::after {
		content: "";
		position: absolute;
		inset: 0;
		background:
			radial-gradient(circle at 50% 45%, rgba(255, 154, 156, 0.16), transparent 28%),
			linear-gradient(to bottom, rgba(7, 9, 8, 0.1), rgba(7, 9, 8, 0.74));
		pointer-events: none;
	}

	.finale-copy {
		position: relative;
		z-index: 2;
		width: min(920px, calc(100% - 2rem));
		display: grid;
		justify-items: center;
		text-align: center;
		padding: clamp(2rem, 7vw, 5rem);
		border: 1px solid rgba(254, 241, 236, 0.2);
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05));
		backdrop-filter: blur(16px) saturate(1.12);
		-webkit-backdrop-filter: blur(16px) saturate(1.12);
		box-shadow:
			0 24px 90px rgba(0, 0, 0, 0.42),
			inset 0 0 0 1px rgba(255, 255, 255, 0.08);
	}

	img {
		width: clamp(44px, 7vw, 72px);
		height: auto;
		margin-bottom: 1.4rem;
		filter:
			invert(1)
			drop-shadow(2px 0 0 rgba(0, 240, 255, 0.52))
			drop-shadow(-2px 0 0 rgba(255, 79, 216, 0.46));
	}

	.eyebrow {
		margin: 0 0 1rem;
		font-family: var(--font-sans);
		font-size: 0.72rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: rgba(254, 241, 236, 0.72);
	}

	h2 {
		max-width: 780px;
		margin: 0;
		font-family: var(--font-serif);
		font-size: clamp(2.4rem, 7vw, 6rem);
		font-weight: 400;
		line-height: 1.02;
		color: #fef1ec;
		text-shadow:
			2px 0 0 rgba(0, 240, 255, 0.26),
			-2px 0 0 rgba(255, 79, 216, 0.24),
			0 12px 34px rgba(0, 0, 0, 0.5);
	}
</style>
