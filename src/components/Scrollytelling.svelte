<script>
	import Scene from "$components/Scene.svelte";
	import ResearchCards from "$components/ResearchCards.svelte";
	import ScrollProgress from "$components/ScrollProgress.svelte";
	import { scenes } from "$data/scenes.js";
	import { base } from "$app/paths";
</script>

<div class="page">
	<ScrollProgress />

	<section class="hero">
		<img src="images/back.png" alt="" />
		<div class="hero-shade"></div>
		<div class="hero-copy">
			<p class="eyebrow">Inyoung Cheong / Anthropic</p>
			<h1>Building Public-Interest AI Research at Anthropic</h1>
			<p class="dek">
				A visual essay about moving from government and law into AI safety, and learning to
				translate difficult systems into forms people can scrutinize, understand, and act on.
			</p>
		</div>
	</section>

	{#each scenes as scene, index}
		<div style={`--beat-count: ${scene.beats.length};`}>
			<Scene {scene} {index} />
		</div>
	{/each}

	<section class="chapter research" id="research">
		<p class="eyebrow">What I Would Build</p>
		<h2>Three projects I would start at the Anthropic Institute.</h2>
		<p class="lead">Each one is a challenge I am already working toward.</p>
		<ResearchCards />
	</section>

	<section class="chapter closing" id="forward">
		<p class="eyebrow">Looking Forward</p>
		<div class="chapter-copy">
			<p>
				At the Anthropic Institute, I want to understand what researchers are actively
				grappling with and help build clear channels for sharing those insights with the
				broader external community.
			</p>
			<p>
				I want to turn technical and policy findings into public-facing analysis that
				policymakers, journalists, civil society organizations, and researchers can use in
				real decisions.
			</p>
			<p class="final-line">
				Across government, law, computer science, and public communication, one through line
				remains. I translate difficult problems into forms institutions and publics can
				understand, scrutinize, and act on.
			</p>
		</div>
		<div class="footer-cta">
			<a href="mailto:iycheong@princeton.edu">iycheong@princeton.edu</a>
			<a href="https://inyoungcheong.github.io" target="_blank" rel="noopener">inyoungcheong.github.io</a>
		</div>
	</section>

	<section class="thanks" aria-label="Thank you">
		<video muted loop playsinline autoplay preload="metadata">
			<source src={`${base}/video/sanfran_back.mp4`} type="video/mp4" />
		</video>
		<div class="thanks-shade"></div>
		<div class="thanks-copy">
			<p class="eyebrow">Final Note</p>
			<h2>Thank you for reading.</h2>
		</div>
	</section>
</div>

<style>
	.page {
		min-height: 100vh;
		background: #070908;
		color: #fff;
	}

	.hero {
		position: relative;
		min-height: 94vh;
		overflow: hidden;
		display: flex;
		align-items: flex-end;
		padding: 0 6vw 8vh;
		box-sizing: border-box;
	}

	.hero img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.hero-shade {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.72)),
			radial-gradient(circle at 76% 22%, transparent 0, rgba(0, 0, 0, 0.5) 58%);
	}

	.hero-copy {
		position: relative;
		z-index: 2;
		max-width: 920px;
	}

	.eyebrow {
		margin: 0 0 1.1rem;
		font-family: var(--font-sans);
		font-size: 0.7rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.7);
	}

	h1 {
		margin: 0;
		max-width: 920px;
		font-family: "DM Serif Display", var(--font-serif);
		font-size: clamp(2.5rem, 7vw, 6.4rem);
		font-style: italic;
		font-weight: 700;
		line-height: 0.98;
		color: #fff;
		text-shadow: 0 2px 28px rgba(0, 0, 0, 0.46);
	}

	.dek {
		max-width: 760px;
		margin: 1.5rem 0 0;
		font-family: var(--font-serif);
		font-size: clamp(1.05rem, 1.5vw, 1.35rem);
		line-height: 1.65;
		color: rgba(255, 255, 255, 0.86);
	}

	.chapter {
		display: grid;
		grid-template-columns:
			minmax(1.2rem, 1fr)
			min(720px, calc(100% - 2.4rem))
			minmax(1.2rem, 1fr);
		padding: 14vh 0;
		background: #070908;
	}

	.chapter > * {
		grid-column: 2;
	}

	.chapter-copy p,
	.lead {
		margin: 0 0 1.5rem;
		font-family: var(--font-serif);
		font-size: clamp(1.16rem, 1.6vw, 1.46rem);
		line-height: 1.72;
		color: rgba(255, 255, 255, 0.86);
	}

	.chapter .eyebrow {
		color: rgba(255, 255, 255, 0.62);
	}

	.chapter-copy p,
	.chapter .lead {
		color: rgba(255, 255, 255, 0.84);
	}

	.research {
		grid-template-columns:
			minmax(1.2rem, 1fr)
			min(1120px, calc(100% - 2.4rem))
			minmax(1.2rem, 1fr);
		padding-top: 10vh;
		padding-bottom: 0;
		overflow-x: hidden;
	}

	.research :global(.projects) {
		grid-column: 2;
		justify-self: start;
	}

	h2 {
		margin: 0 0 1rem;
		font-family: var(--font-serif);
		font-size: clamp(2rem, 5vw, 3.8rem);
		font-weight: 400;
		line-height: 1.12;
		color: #fffaf6;
	}

	.final-line {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.18);
		font-style: italic;
	}

	.footer-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 2rem;
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.18);
	}

	a {
		font-family: var(--font-sans);
		font-size: 0.92rem;
		color: #fffaf6;
		text-decoration: none;
		border-bottom: 1px solid rgba(255, 250, 246, 0.36);
	}

	a:hover {
		border-color: #fffaf6;
	}

	.thanks {
		position: relative;
		min-height: 92vh;
		display: flex;
		align-items: flex-end;
		padding: 0 6vw 8vh;
		box-sizing: border-box;
		overflow: hidden;
		background: #070908;
	}

	.thanks video,
	.thanks-shade {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.thanks video {
		object-fit: cover;
	}

	.thanks-shade {
		background:
			linear-gradient(to bottom, rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.72)),
			linear-gradient(to right, rgba(0, 0, 0, 0.66), transparent 60%);
	}

	.thanks-copy {
		position: relative;
		z-index: 2;
		max-width: 820px;
	}

	.thanks h2 {
		color: #fffaf6;
		font-size: clamp(2.8rem, 8vw, 7rem);
		line-height: 0.98;
	}

	@media (max-width: 768px) {
		.hero {
			min-height: 88vh;
			padding: 0 1.1rem 7vh;
		}

		h1 {
			font-size: clamp(2.35rem, 13vw, 4rem);
		}

		.chapter {
			padding: 10vh 0;
		}

		.thanks {
			min-height: 82vh;
			padding: 0 1.1rem 7vh;
		}
	}
</style>
