export const scenes = [
	{
		id: "opening",
		eyebrow: "Inyoung Cheong · Princeton CITP · May 5, 2026",
		title: "Regulating AI through Legal and Technical Governance",
		text: "",
		eyebrowColor: "rgba(255, 250, 246, 0.78)",
		titleColor: "rgba(255, 250, 246, 0.97)",
		textColor: "rgba(255, 250, 246, 0.88)",
		background: {
			type: "portrait",
			src: "/images/inyoung-profile.png",
			shade: "none",
			portraitBrightness: 1.14
		},
		align: "left-center",
		transition: "fade"
	},
	{
		id: "trajectory",
		eyebrow: "",
		title: "",
		text: "",
		background: {
			type: "venn",
			labels: ["Government", "Law", "Computer Science"],
			center: "AI governance",
			shade: "none"
		},
		align: "center",
		transition: "slow-fade"
	},
	{
		id: "paper-chain",
		eyebrow: "Research Record",
		title: "22 peer-reviewed publications",
		text: "2 American law review articles. 6 CS conference full papers.",
		nextButtonLabel: "Next page",
		background: {
			type: "paper-wheel",
			shade: "none"
		},
		align: "left-bottom",
		transition: "fade"
	},
	{
		id: "research-map",
		eyebrow: "What I will focus on",
		title: "Three ways of\nconstructing AI governance\ncombining law and technology",
		text: "",
		threads: [
			{
				label: "Construction I",
				title: "Professional inputs into AI policy",
				text: "How lawyers and domain experts can shape policy for AI systems.",
				target: "legal-advice-intro"
			},
			{
				label: "Construction II",
				title: "Public defenders and AI adoption",
				text: "How resource-constrained legal institutions decide whether AI is usable.",
				target: "public-defender-intro"
			},
			{
				label: "Construction III",
				title: "Agency law into AI evaluations",
				text: "How duties such as loyalty, care, and disclosure become testable behavior.",
				target: "loyalty-eval"
			}
		],
		background: { type: "black" },
		align: "center",
		transition: "fade"
	},
	{
		id: "legal-advice-intro",
		eyebrow: "Research Thread I",
		title: "Turning professional inputs into AI policy",
		text: "",
		logos: [
			{ src: "/images/logo1.png", alt: "", scale: 1 }
		],
		background: { type: "black" },
		align: "center",
		transition: "cut"
	},
	{
		id: "legal-advice-study-1",
		eyebrow: "",
		title: "How Attorneys Evaluate AI Legal Advice",
		text: "",
		background: {
			type: "video",
			src: "/video/lawyer1.mp4",
			fit: "contain",
			position: "center center",
			tone: "standard",
			shade: "subtle",
			loop: false
		},
		caption: {
			label: "Cheong et al.",
			title: "(A)I am not a lawyer...",
			venue: "ACM FAccT '26",
			href: "https://dl.acm.org/doi/abs/10.1145/3630106.3659048"
		},
		align: "left-bottom",
		transition: "fade"
	},
	{
		id: "legal-advice-study-2",
		eyebrow: "",
		title: "",
		text: "",
		background: {
			type: "video",
			src: "/video/lawyer2.mp4",
			fit: "contain",
			position: "center center",
			tone: "standard",
			shade: "subtle",
			loop: false
		},
		caption: {
			label: "Cheong et al.",
			title: "(A)I am not a lawyer...",
			venue: "ACM FAccT '26",
			href: "https://dl.acm.org/doi/abs/10.1145/3630106.3659048"
		},
		align: "center",
		transition: "fade"
	},
	{
		id: "policypad",
		eyebrow: "Tool Pair",
		title: "PolicyPad",
		text: "Collaborative prototyping of LLM policies from professional inputs.",
		background: {
			type: "video",
			src: "/video/policypad.mp4",
			fit: "contain",
			position: "center center",
			tone: "standard",
			shade: "subtle",
			playbackRate: 1.4
		},
		caption: {
			label: "Feng et al.",
			title: "PolicyPad: Collaborative Prototyping of LLM Policies",
			venue: "ACM CHI '26",
			href: "https://dl.acm.org/doi/full/10.1145/3772318.3791689"
		},
		align: "left-bottom",
		transition: "fade"
	},
	{
		id: "public-defender-intro",
		eyebrow: "Research Thread II",
		title: "Public defenders and AI adoption",
		text: "",
		logos: [
			{ src: "/images/logo2.png", alt: "", scale: 1 }
		],
		background: { type: "black" },
		align: "center",
		transition: "cut"
	},
	{
		id: "public-defender-study-1",
		eyebrow: "",
		title: "How Public Defenders View AI Adoption in Their Practice",
		text: "",
		background: {
			type: "video",
			src: "/video/publicdefender1.mp4",
			fit: "contain",
			position: "center center",
			tone: "standard",
			shade: "subtle",
			loop: false
		},
		caption: {
			label: "Cheong et al.",
			title: "How can AI augment access to justice?",
			venue: "ACM FAccT '26",
			href: "https://arxiv.org/abs/2510.22933"
		},
		align: "left-bottom",
		transition: "fade"
	},
	{
		id: "public-defender-study-2",
		eyebrow: "",
		title: "",
		text: "",
		background: {
			type: "video",
			src: "/video/publicdefender2.mp4",
			fit: "contain",
			position: "center center",
			tone: "standard",
			shade: "subtle",
			loop: false
		},
		caption: {
			label: "Cheong et al.",
			title: "How can AI augment access to justice?",
			venue: "ACM FAccT '26",
			href: "https://arxiv.org/abs/2510.22933"
		},
		align: "center",
		transition: "fade"
	},
	{
		id: "briefbank",
		eyebrow: "Tool Pair",
		title: "BriefBank",
		text: "A retrieval system for appellate defenders, built from practitioner queries and legal-domain annotation.",
		background: {
			type: "video",
			src: "/video/briefbank.mp4",
			fit: "contain",
			position: "center center",
			tone: "standard",
			shade: "subtle",
			playbackRate: 1.6
		},
		caption: {
			label: "Stammbach et al.",
			title: "Legal retrieval for public defenders",
			venue: "Under review at TMLR",
			href: "https://openreview.net/forum?id=HnbKQGRnDt"
		},
		align: "left-bottom",
		transition: "fade"
	},
	{
		id: "loyalty-eval",
		eyebrow: "Research Thread III",
		title: "Translating agency law duties into AI evaluations",
		text: "Loyalty. Care. Disclosure. Consent.",
		logos: [
			{ src: "/images/logo3.png", alt: "", scale: 1 }
		],
		background: { type: "black" },
		align: "center",
		transition: "cut"
	},
	{
		id: "agent-eval-1",
		eyebrow: "",
		title: "Conceptualizing AI Disloyalty",
		text: "",
		background: {
			type: "video",
			src: "/video/agent2.mp4",
			fit: "contain",
			position: "center center",
			tone: "standard",
			shade: "subtle",
			loop: false,
			playbackRate: 0.72
		},
		caption: {
			label: "Cheong et al.",
			title: "Agents aren't ready to be agents",
			venue: "Preprint",
			href: "https://inyoungcheong.github.io/assets/pdf/agents.pdf"
		},
		align: "left-bottom",
		transition: "fade"
	},
	{
		id: "agent-eval-2",
		eyebrow: "",
		title: "Loyalty Evaluation Framework",
		text: "",
		background: {
			type: "video",
			src: "/video/agent1.mp4",
			fit: "contain",
			position: "center center",
			tone: "standard",
			shade: "subtle",
			loop: false,
			playbackRate: 0.72
		},
		caption: {
			label: "Cheong",
			title: "Encoding Loyalty into AI Agents' Behavior",
			venue: "Blog post, 2026",
			href: "https://innovation.consumerreports.org/encoding-loyalty-principles-into-ai-agents-behavior/"
		},
		align: "left-bottom",
		transition: "fade"
	},
	{
		id: "kcl-fit",
		eyebrow: "What I bring to the Centre for Data Futures",
		title: "",
		text: "Stakeholder coordination across differently situated communities\n\nLaw-grounded technical infrastructure, from prototype to deployment\n\nComparative evidence across jurisdictions",
		background: {
			type: "video",
			src: "/video/london2.mp4",
			fit: "cover",
			position: "center center",
			tone: "dark",
			videoOpacity: 0.26,
			shade: "light"
		},
		align: "center",
		transition: "cut"
	}
];
