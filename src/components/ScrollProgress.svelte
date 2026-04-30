<script>
	import { onMount, tick } from "svelte";

	const SVG_WIDTH = 42;
	const TOP_INSET = 76;
	const SIDE_X = 31;
	const CURVE_RADIUS = 16;
	const MIN_THUMB = 34;
	const SEGMENTS = 36;

	let trackPath;
	let thumbPath;
	let pathD = $state("");
	let thumbD = $state("");
	let viewHeight = $state(640);
	let progress = $state(0);
	let pathLength = 1;
	let thumbLength = MIN_THUMB;
	let dragging = $state(false);
	let pointerId = null;

	const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

	function getScrollMetrics() {
		const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
		const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
		return { scrollable, scrollTop };
	}

	async function updatePath() {
		viewHeight = Math.max(window.innerHeight, 420);
		const bottom = viewHeight - TOP_INSET;
		const top = TOP_INSET;
		const cornerX = SIDE_X - CURVE_RADIUS;
		const startX = 18;

		pathD = `
			M ${startX} ${top}
			L ${cornerX} ${top}
			A ${CURVE_RADIUS} ${CURVE_RADIUS} 0 0 1 ${SIDE_X} ${top + CURVE_RADIUS}
			L ${SIDE_X} ${bottom - CURVE_RADIUS}
			A ${CURVE_RADIUS} ${CURVE_RADIUS} 0 0 1 ${cornerX} ${bottom}
			L ${startX} ${bottom}
		`;

		await tick();
		if (!trackPath) return;

		pathLength = trackPath.getTotalLength();
		const visibleRatio = clamp(window.innerHeight / document.documentElement.scrollHeight, 0.08, 1);
		thumbLength = Math.max(MIN_THUMB, pathLength * visibleRatio);
		updateThumb();
	}

	function updateThumb() {
		if (!trackPath || pathLength <= 0) return;

		const { scrollable, scrollTop } = getScrollMetrics();
		const scrollRatio = clamp(scrollTop / scrollable, 0, 1);
		progress = Math.round(scrollRatio * 100);
		const startOffset = (pathLength - thumbLength) * scrollRatio;
		const endOffset = startOffset + thumbLength;
		const points = [];

		for (let i = 0; i <= SEGMENTS; i += 1) {
			const t = startOffset + ((endOffset - startOffset) / SEGMENTS) * i;
			const point = trackPath.getPointAtLength(t);
			points.push(`${point.x} ${point.y}`);
		}

		thumbD = `M ${points[0]} ${points.slice(1).map((point) => `L ${point}`).join(" ")}`;
	}

	function handlePointerMove(event) {
		if (!dragging || event.pointerId !== pointerId) return;
		const ratio = clamp(event.clientY / window.innerHeight, 0, 1);
		const { scrollable } = getScrollMetrics();
		window.scrollTo({ top: ratio * scrollable, behavior: "auto" });
		updateThumb();
	}

	function stopDragging(event) {
		if (!dragging || event.pointerId !== pointerId) return;
		dragging = false;
		try {
			thumbPath?.releasePointerCapture(pointerId);
		} catch {
			// Pointer capture may already be gone if the browser cancels the gesture.
		}
		pointerId = null;
	}

	function startDragging(event) {
		event.preventDefault();
		dragging = true;
		pointerId = event.pointerId;
		thumbPath?.setPointerCapture(pointerId);
	}

	function handleKeydown(event) {
		const keySteps = {
			ArrowDown: window.innerHeight * 0.12,
			ArrowUp: window.innerHeight * -0.12,
			PageDown: window.innerHeight * 0.72,
			PageUp: window.innerHeight * -0.72,
			Home: -document.documentElement.scrollHeight,
			End: document.documentElement.scrollHeight
		};

		if (!(event.key in keySteps)) return;
		event.preventDefault();
		window.scrollBy({ top: keySteps[event.key], behavior: "smooth" });
	}

	onMount(() => {
		updatePath();
		window.addEventListener("scroll", updateThumb, { passive: true });
		window.addEventListener("resize", updatePath);
		window.addEventListener("pointermove", handlePointerMove);
		window.addEventListener("pointerup", stopDragging);
		window.addEventListener("pointercancel", stopDragging);

		return () => {
			window.removeEventListener("scroll", updateThumb);
			window.removeEventListener("resize", updatePath);
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("pointerup", stopDragging);
			window.removeEventListener("pointercancel", stopDragging);
		};
	});
</script>

<svg
	class="scroll-progress"
	viewBox={`0 0 ${SVG_WIDTH} ${viewHeight}`}
	aria-hidden="true"
>
	<path bind:this={trackPath} class="track" d={pathD} />
	<path
		bind:this={thumbPath}
		class:dragging
		class="thumb"
		d={thumbD}
		role="scrollbar"
		tabindex="0"
		aria-label="Page scroll progress"
		aria-controls="content"
		aria-orientation="vertical"
		aria-valuemin="0"
		aria-valuemax="100"
		aria-valuenow={progress}
		onpointerdown={startDragging}
		onkeydown={handleKeydown}
	/>
</svg>

<style>
	.scroll-progress {
		position: fixed;
		top: 0;
		right: 0.45rem;
		z-index: 30;
		width: 42px;
		height: 100svh;
		pointer-events: none;
		filter: drop-shadow(0 1px 2px rgba(7, 9, 8, 0.3));
	}

	.track,
	.thumb {
		fill: none;
		stroke-linecap: butt;
	}

	.track {
		stroke: rgba(7, 9, 8, 0.22);
		stroke-width: 2;
	}

	.thumb {
		pointer-events: auto;
		cursor: grab;
		stroke: #fffaf6;
		stroke-width: 4;
		filter:
			drop-shadow(1px 1px 0 rgba(7, 9, 8, 0.9))
			drop-shadow(0 0 4px rgba(255, 250, 246, 0.34));
		transition:
			stroke-width 160ms ease,
			stroke 160ms ease;
	}

	.thumb:hover,
	.thumb:focus-visible,
	.thumb.dragging {
		stroke: #ffb199;
		stroke-width: 5.5;
		cursor: grabbing;
	}

	@media (max-width: 768px) {
		.scroll-progress {
			right: 0;
			width: 34px;
			opacity: 0.82;
		}

		.track {
			stroke-width: 1.8;
		}

		.thumb {
			stroke-width: 3.5;
		}
	}
</style>
