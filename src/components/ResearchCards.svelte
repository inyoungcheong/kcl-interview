<script>
	import { base } from "$app/paths";

	const projects = [
		{
			num: "01",
			label: "Public Safety Translation",
			title: "Make safety research usable beyond the lab.",
			video: "/video/work_back.mp4",
			body: [
				"Anthropic produces research that matters far beyond the technical AI safety community. Much of that work is difficult for policymakers, journalists, civil society organizations, and the broader public to interpret without mediation.",
				"I would build interactive explainers that translate Anthropic's safety research into public-facing formats.",
				"These could include visual essays, annotated briefings, interactive policy memos, and short research guides designed for nontechnical audiences. The goal would be to preserve the difficulty of the research while making it easier for different publics to understand why it matters.",
				"This project builds directly on my experience translating technical, legal, and policy questions across institutions."
			],
			links: [
				{ label: "FAccT '26 Paper", href: "https://arxiv.org/abs/2510.22933" },
				{ label: "COLM '25 Survey", href: "https://arxiv.org/html/2411.05025v1" },
				{ label: "Schmidt Science Award", href: "https://www.schmidtsciences.org/ai-at-work/" }
			]
		},
		{
			num: "02",
			label: "Agency Under Pressure",
			title: "Track how AI systems reshape human agency.",
			video: "/video/emotional_back.mp4",
			body: [
				"My central research concern is the gradual erosion of human agency through interaction with AI systems.",
				"I would build a public-facing research series on AI companions, emotional dependency, manipulation, persuasion, and autonomy loss.",
				"This series could combine legal analysis, empirical findings, technical examples, and interactive storytelling to show how these risks emerge in ordinary use.",
				"The Institute would be an ideal place to make these concerns visible before they become normalized."
			],
			links: [
				{ label: "Michigan Tech Law Review", href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5435335" },
				{ label: "NPR Interview", href: "https://open.spotify.com/episode/5dVHC4Bjdbo8ACcoRuxV5V" },
				{ label: "Paris Talk", href: "https://youtu.be/G48hDgad-gE" }
			]
		},
		{
			num: "03",
			label: "Loyalty, Law, and Agents",
			title: "Test whether agents act with loyalty and care.",
			video: "/video/judge2_back.mp4",
			body: [
				"My Loyal Agents project translates more than 400 legal scenarios into testable evaluation criteria for AI agents. The project uses language models to adjudicate ambiguous cases from 13 distinct legal perspectives.",
				"I want to adapt this pipeline to Anthropic's own models.",
				"The broader question is whether legal concepts such as loyalty, care, disclosure, consent, manipulation, and accountability can be translated into evaluation tasks for AI systems.",
				"This would allow us to test not only whether a model follows instructions, but also whether it behaves appropriately when the user's interests, the developer's interests, and the deploying company's interests may diverge."
			],
			links: [
				{ label: "Loyal Agents Workshop", href: "https://loyalagents.org/" },
				{ label: "Consumer Reports Blog", href: "https://innovation.consumerreports.org/encoding-loyalty-principles-into-ai-agents-behavior/" }
			]
		}
	];
</script>

<div class="projects">
	{#each projects as project}
		<article class="project">
			<video muted loop playsinline autoplay preload="metadata" aria-hidden="true">
				<source src={`${base}${project.video}`} type="video/mp4" />
			</video>
			<div class="project-shade"></div>
			<div class="project-num">{project.num}</div>
			<div class="project-main">
				<p class="label">{project.label}</p>
				<h3>{project.title}</h3>
				<div class="body">
					{#each project.body as paragraph}
						<p>{paragraph}</p>
					{/each}
				</div>
				<div class="links" aria-label="Previous work">
					{#each project.links as link}
						<a href={link.href} target="_blank" rel="noopener">{link.label}</a>
					{/each}
				</div>
			</div>
		</article>
	{/each}
</div>

<style>
	.projects {
		width: min(100%, 1120px);
		margin-top: 6vh;
		display: grid;
		gap: 7vh;
	}

	.project {
		position: relative;
		min-height: clamp(720px, 96vh, 980px);
		display: flex;
		align-items: flex-end;
		padding: clamp(1.4rem, 5vw, 4.8rem);
		overflow: hidden;
		background: #070908;
		color: #fff;
	}

	.project-num {
		position: absolute;
		top: clamp(1rem, 3vw, 2rem);
		right: clamp(1rem, 3vw, 2rem);
		z-index: 2;
		font-family: var(--font-serif);
		font-size: clamp(4rem, 12vw, 10rem);
		line-height: 0.9;
		color: rgba(255, 250, 246, 0.22);
	}

	.project-main {
		position: relative;
		z-index: 2;
		max-width: 760px;
		min-width: 0;
	}

	video,
	.project-shade {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	video {
		object-fit: cover;
	}

	.project-shade {
		z-index: 1;
		background:
			linear-gradient(to bottom, rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.72)),
			linear-gradient(to right, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.2) 64%);
	}

	.label {
		margin: 0 0 1rem;
		font-family: var(--font-sans);
		font-size: 0.7rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: rgba(255, 250, 246, 0.72);
		overflow-wrap: anywhere;
	}

	h3 {
		margin: 0;
		font-family: var(--font-serif);
		font-size: clamp(2.2rem, 5.2vw, 4.9rem);
		font-weight: 400;
		line-height: 1.04;
		color: #fffaf6;
		overflow-wrap: break-word;
	}

	.body {
		margin: 1.6rem 0 0;
		display: grid;
		gap: 0.95rem;
	}

	.body p {
		margin: 0;
		font-family: var(--font-sans);
		font-size: clamp(0.98rem, 1.18vw, 1.12rem);
		line-height: 1.68;
		color: rgba(255, 250, 246, 0.84);
		overflow-wrap: break-word;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem 1.35rem;
		margin-top: 1.5rem;
	}

	a {
		font-family: var(--font-sans);
		font-size: 0.8rem;
		color: #fffaf6;
		text-decoration: none;
		border-bottom: 1px solid rgba(255, 250, 246, 0.38);
		padding-bottom: 2px;
	}

	a:hover {
		border-color: #fffaf6;
	}

	@media (max-width: 768px) {
		.projects {
			gap: 1rem;
		}

		.project {
			min-height: auto;
			padding: 5.8rem 1.1rem 1.4rem;
		}

		.project-num {
			font-size: 4rem;
		}

		.body {
			gap: 0.75rem;
		}
	}
</style>
