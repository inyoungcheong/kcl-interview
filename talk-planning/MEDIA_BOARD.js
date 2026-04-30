// Working board for choosing slide visuals.
// Edit this file freely: move asset paths into sceneSlots, add notes, or rank options.
// Nothing here affects the live app until we copy choices into src/data/scenes.js.

export const videos = [
	{
		id: "lawyer-1",
		src: "/video/lawyer1.mp4",
		tags: ["lawyer", "legal-advice", "study", "professional-inputs"],
		notes: "Research Thread I study video 1. Show before PolicyPad."
	},
	{
		id: "lawyer-2",
		src: "/video/lawyer2.mp4",
		tags: ["lawyer", "legal-advice", "study", "professional-inputs"],
		notes: "Research Thread I study video 2. Show before PolicyPad."
	},
	{
		id: "policypad",
		src: "/video/policypad.mp4",
		tags: ["policypad", "tool", "demo", "policy", "professional-inputs"],
		notes: "Tool pair for legal advice / professional inputs thread."
	},
	{
		id: "public-defender-1",
		src: "/video/publicdefender1.mp4",
		tags: ["public-defender", "interview", "study", "participatory-design"],
		notes: "Research Thread II study video 1. Show before BriefBank."
	},
	{
		id: "public-defender-2",
		src: "/video/publicdefender2.mp4",
		tags: ["public-defender", "interview", "study", "professional-practice"],
		notes: "Research Thread II study video 2. Show before BriefBank."
	},
	{
		id: "briefbank",
		src: "/video/briefbank.mp4",
		tags: ["briefbank", "public-defender", "tool", "demo", "retrieval"],
		notes: "Tool pair for public defender thread."
	},
	{
		id: "agent-1",
		src: "/video/agent1.mp4",
		tags: ["agent", "loyalty", "evaluation", "agency-law"],
		notes: "Research Thread III video 1. Show before research record."
	},
	{
		id: "agent-2",
		src: "/video/agent2.mp4",
		tags: ["agent", "loyalty", "evaluation", "consumer-reports"],
		notes: "Research Thread III video 2. Show before research record."
	},
	{
		id: "emotional-back",
		src: "/video/emotional_back.mp4",
		tags: ["consumer-reports", "community", "participatory-design", "abstract"],
		notes: "Current Research Thread III / Consumer Reports background."
	},
	{
		id: "papers",
		src: "/video/papers.mp4",
		tags: ["papers", "research", "archive", "evidence"],
		notes: "Available for paper-chain if collage type is replaced."
	},
	{
		id: "coding",
		src: "/video/coding.mp4",
		tags: ["building", "code", "process"],
		notes: "Opening overlay video."
	},
	{
		id: "assembly-back",
		src: "/video/assembly_back.mp4",
		tags: ["law", "government", "institution"],
		notes: "Unused for now; free speech thread removed."
	},
	{
		id: "vavaprompter",
		src: "/video/vavaprompter.mp4",
		tags: ["tool", "demo", "claude", "interface"],
		notes: "Unused after PolicyPad was added."
	}
];

export const images = [
	{
		id: "main",
		src: "/images/main.jpeg",
		tags: ["portrait", "personal"],
		notes: "Opening scene portrait."
	},
	{
		id: "policy",
		src: "/images/policy.png",
		tags: ["policy", "government", "document"],
		notes: "Unused."
	}
];

export const paperImages = [
	"/images/papers/ACM_FAccT_2026.png",
	"/images/papers/CHI_2026.png",
	"/images/papers/COLM_2025.png",
	"/images/papers/Michigan_Technology_Law_Review_2026.png",
	"/images/papers/AI_and_Ethics_2024.png",
	"/images/papers/ACM_FAccT_2024.png",
	"/images/papers/AAAI_ACM_AIES_2025.png",
	"/images/papers/AAAI_ACM_AIES_2024.png",
	"/images/papers/ICML_GenLaw_workshop_2023.png",
	"/images/papers/NeurIPS_MP2_workshop_2023.png",
	"/images/papers/University_of_Cincinnati_Law_Review_2024.png"
];

export const sceneSlots = [
	{
		scene: 1,
		id: "opening",
		current: { type: "portrait", src: "/images/main.jpeg" },
		candidateAssets: ["/images/main.jpeg", "/images/back.png"],
		desiredFeeling: "Personal, direct, elegant. Name + talk title.",
		layoutNotes: "Circular portrait, right side. Coding video texture behind.",
		decision: "main.jpeg portrait plus coding overlay."
	},
	{
		scene: 2,
		id: "trajectory",
		current: { type: "venn", labels: ["Government", "Law", "Computer Science"], center: "AI governance" },
		candidateAssets: [],
		desiredFeeling: "Positioning, not biography. Speaker explains communications/data protection authority aloud.",
		layoutNotes: "Centered visual. No explanatory sentence on screen.",
		decision: "Use Venn visual for now."
	},
	{
		scene: 3,
		id: "legal-advice-intro",
		current: { type: "black" },
		candidateAssets: ["/images/uw.png", "/images/openai.svg"],
		desiredFeeling: "Hard reset into Research Thread I.",
		layoutNotes: "Black title card. Logo strip only, no institution names: UW + OpenAI.",
		decision: "Black title card."
	},
	{
		scene: 4,
		id: "legal-advice-study-1",
		current: { type: "video", src: "/video/lawyer1.mp4", fit: "contain", loop: false, shade: "subtle" },
		candidateAssets: ["/video/lawyer1.mp4"],
		desiredFeeling: "Lawyer study as my research. Professional inputs first, PolicyPad second.",
		layoutNotes: "Caption: Cheong et al., (A)I am not a lawyer..., ACM FAccT '26.",
		decision: "lawyer1.mp4."
	},
	{
		scene: 5,
		id: "legal-advice-study-2",
		current: { type: "video", src: "/video/lawyer2.mp4", fit: "contain", loop: false, shade: "subtle" },
		candidateAssets: ["/video/lawyer2.mp4"],
		desiredFeeling: "Second lawyer study video before PolicyPad.",
		layoutNotes: "Same caption as lawyer1. Caption title is truncated to one line.",
		decision: "lawyer2.mp4."
	},
	{
		scene: 6,
		id: "policypad",
		current: { type: "video", src: "/video/policypad.mp4", fit: "contain", shade: "subtle", playbackRate: 1.4 },
		candidateAssets: ["/video/policypad.mp4"],
		desiredFeeling: "Tool pair after legal advice study. Professional inputs become AI policy.",
		layoutNotes: "Caption: Feng et al., PolicyPad: Collaborative Prototyping of LLM Policies, ACM CHI '26.",
		decision: "policypad.mp4."
	},
	{
		scene: 7,
		id: "public-defender-intro",
		current: { type: "black" },
		candidateAssets: ["/images/princeton.png", "/images/njopd.jpg"],
		desiredFeeling: "Hard reset into Research Thread II.",
		layoutNotes: "Black title card. Logo strip only, no institution names: Princeton + NJ OPD.",
		decision: "Black title card."
	},
	{
		scene: 8,
		id: "public-defender-study-1",
		current: { type: "video", src: "/video/publicdefender1.mp4", fit: "contain", loop: false, shade: "subtle" },
		candidateAssets: ["/video/publicdefender1.mp4"],
		desiredFeeling: "Public defender study as my research. Practitioners first, BriefBank second.",
		layoutNotes: "Caption: Cheong et al., How can AI augment access to justice?, ACM FAccT '26.",
		decision: "publicdefender1.mp4."
	},
	{
		scene: 9,
		id: "public-defender-study-2",
		current: { type: "video", src: "/video/publicdefender2.mp4", fit: "contain", loop: false, shade: "subtle" },
		candidateAssets: ["/video/publicdefender2.mp4"],
		desiredFeeling: "Second public defender study video before BriefBank.",
		layoutNotes: "Same caption as publicdefender1.",
		decision: "publicdefender2.mp4."
	},
	{
		scene: 10,
		id: "briefbank",
		current: { type: "video", src: "/video/briefbank.mp4", fit: "contain", shade: "subtle", playbackRate: 1.6 },
		candidateAssets: ["/video/briefbank.mp4"],
		desiredFeeling: "Tool pair after public defender study.",
		layoutNotes: "Caption: Stammbach et al., Legal retrieval for public defenders, under review at TMLR.",
		decision: "briefbank.mp4."
	},
	{
		scene: 11,
		id: "loyalty-eval",
		current: { type: "black" },
		candidateAssets: [
			"/images/princeton.png",
			"/images/stanford.png",
			"/images/harvard.webp",
			"/images/consumerreports.png"
		],
		desiredFeeling: "Research Thread III. Legal duties become AI evaluations.",
		layoutNotes: "Centered title plus logo strip only: Princeton + Stanford + Harvard + Consumer Reports.",
		decision: "Black title card, followed by agent1 and agent2."
	},
	{
		scene: 12,
		id: "agent-eval-1",
		current: { type: "video", src: "/video/agent2.mp4", fit: "contain", loop: false, shade: "subtle" },
		candidateAssets: ["/video/agent2.mp4"],
		desiredFeeling: "Agents preprint as evidence for loyalty evaluation thread.",
		layoutNotes: "Caption: Cheong et al., Agents aren't ready to be agents, preprint.",
		decision: "agent1.mp4."
	},
	{
		scene: 13,
		id: "agent-eval-2",
		current: { type: "video", src: "/video/agent1.mp4", fit: "contain", loop: false, shade: "subtle" },
		candidateAssets: ["/video/agent1.mp4"],
		desiredFeeling: "Consumer Reports loyalty encoding blog as applied version of the agent evaluation thread.",
		layoutNotes: "Caption: Cheong, Encoding Loyalty into AI Agents' Behavior, blog post, 2026.",
		decision: "agent2.mp4."
	},
	{
		scene: 14,
		id: "paper-chain",
		current: { type: "paper-wheel", papers: "interactive publication wheel" },
		candidateAssets: paperImages,
		desiredFeeling: "Research record as evidence. Saturn-ring paper orbit with clickable previews.",
		layoutNotes: "Comes after Thread III. Drag or wheel to rotate; click a paper to bring it forward and show link.",
		decision: "paper-wheel, using current paperImages data."
	},
	{
		scene: 15,
		id: "kcl-fit",
		current: { type: "black" },
		candidateAssets: [],
		desiredFeeling: "Clean landing. Contribute to participatory data empowerment clinic; Consumer Reports belongs here as future/KCL fit.",
		layoutNotes: "center aligned. Final scene. Mentions Consumer Reports in text.",
		decision: "Black."
	}
];
