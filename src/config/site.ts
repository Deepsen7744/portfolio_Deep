/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — the single place to edit portfolio content.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  • Any link set to `null` is hidden from the UI (no dead buttons).
 *  • Items with `verified: false` are shown in development with an amber
 *    "verify" marker and are HIDDEN in production builds. Flip to `true`
 *    once you have confirmed the fact.
 *  • Resume: drop your PDF at `public/resume.pdf` (or change `resume.file`).
 *    Resume buttons appear automatically once the file exists.
 *  • Project screenshots: put images in `public/projects/` and set `image`.
 *    Without an image, a designed mockup is rendered instead.
 */

export type SocialKey = "github" | "linkedin" | "email";

export interface Experience {
  company: string;
  role: string;
  start: string;
  end: string;
  /** Set false while dates/details still need confirming. */
  verified: boolean;
  summary?: string;
  highlights: string[];
  tech: string[];
}

export interface SkillGroup {
  id: string;
  label: string;
  blurb: string;
  skills: string[];
}

export type MockupVariant = "meeting" | "vault" | "resume" | "realtime";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  /** Only facts you can stand behind. Shown in the details modal. */
  highlights?: string[];
  stack: string[];
  github: string | null;
  /** Only set when a real, working demo URL exists. */
  demo: string | null;
  /** Path under /public, e.g. "/projects/chainvault.png". */
  image: string | null;
  mockup: MockupVariant;
  accent: "blue" | "violet" | "cyan" | "pink";
}

export interface Achievement {
  value: string;
  label: string;
  detail: string;
  verified: boolean;
}

export interface Education {
  degree: string;
  field?: string;
  /** Leave undefined if you prefer not to list it. */
  institution?: string;
  period: string;
}

export const site = {
  name: "Deep Sen",
  shortName: "DS",
  role: "AI Engineer & Full-Stack Developer",
  titles: ["AI Engineer", "Full-Stack Developer", "GenAI Enthusiast"],
  tagline: "An engineer who builds intelligent products.",
  /** Used for canonical URLs, sitemap and Open Graph. Set NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  location: null as string | null,

  /** Toggle the green "available" pill in the hero. */
  availability: {
    open: true,
    label: "Available for opportunities",
  },

  hero: {
    eyebrow: "Hello, I'm Deep Sen",
    headline: "Building Intelligent Solutions for the Real World.",
    intro:
      "I build intelligent applications, scalable backend systems, and AI-powered products that solve real-world problems.",
  },

  about: {
    heading: "Turning Ideas Into Intelligent Products.",
    paragraphs: [
      "I am a Computer Science postgraduate from NIT Jamshedpur with experience in software development, backend engineering, and Generative AI.",
      "My experience includes building AI-powered applications, developing REST APIs, integrating LLMs, implementing RAG pipelines, and working with enterprise identity management systems.",
      "I enjoy transforming complex technical problems into practical, scalable solutions.",
    ],
    background: [
      "Enterprise identity & access management at Texas Instruments",
      "LLM, RAG and semantic search work at Aunexa Technologies",
      "AI meeting assistant & backend APIs at PsychDeskHQ",
    ],
    interests: [
      "Generative AI",
      "RAG pipelines",
      "LLM agents",
      "Backend systems",
      "Semantic search",
      "Identity & security",
    ],
  },

  /** Leave as null until you have the real URL/address. */
  socials: {
    github: null as string | null,
    linkedin: null as string | null,
    email: null as string | null,
  },

  resume: {
    /** File inside /public. Buttons render only if it exists. */
    file: "resume.pdf",
    downloadName: "Deep-Sen-Resume.pdf",
  },

  experience: [
    {
      company: "PsychDeskHQ",
      role: "Software Developer / AI Developer",
      start: "Apr 2026",
      end: "Present",
      verified: false, // ← confirm dates before publishing
      highlights: [
        "Developed meeting assistant functionality.",
        "Integrated audio transcription workflows.",
        "Built AI-powered meeting summaries.",
        "Developed backend APIs for scheduling and sessions.",
        "Worked on retrieval-augmented generation workflows.",
      ],
      tech: ["Node.js", "Express.js", "PostgreSQL", "AWS S3", "Whisper", "OpenAI APIs", "LangChain", "RAG"],
    },
    {
      company: "Yuva-X / Aunexa Technologies",
      role: "AI/ML Intern",
      start: "Sep 2025",
      end: "Dec 2025",
      verified: true,
      highlights: [
        "Developed AI-powered course recommendation functionality.",
        "Implemented semantic search using embeddings.",
        "Built an AI quiz generation system.",
        "Worked with LangChain-based AI agents.",
      ],
      tech: ["Python", "LangChain", "OpenAI APIs", "RAG", "ChromaDB", "SQL", "Vector Databases"],
    },
    {
      company: "Texas Instruments",
      role: "Backend Developer Intern",
      start: "Jan 2025",
      end: "Jul 2025",
      verified: true,
      highlights: [
        "Worked on SCIM 2.0-based provisioning and OAuth 2.0 integrations.",
        "Improved access certification processes.",
        "Resolved 25+ Active Directory provisioning issues.",
        "Developed and maintained SailPoint workflows.",
      ],
      tech: ["Java", "C++", "SQL", "REST APIs", "OAuth 2.0", "LDAP", "SailPoint IdentityIQ", "SCIM", "AWS"],
    },
  ] satisfies Experience[],

  skills: [
    {
      id: "ai",
      label: "AI / ML",
      blurb: "LLM applications, retrieval and semantic search.",
      skills: ["Generative AI", "LLMs", "LangChain", "RAG", "OpenAI APIs", "ChromaDB", "Vector Databases", "Embeddings"],
    },
    {
      id: "backend",
      label: "Backend",
      blurb: "APIs, data modelling and services.",
      skills: ["Node.js", "Express.js", "REST APIs", "PostgreSQL", "MongoDB"],
    },
    {
      id: "frontend",
      label: "Frontend",
      blurb: "Interfaces that feel fast and considered.",
      skills: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
    },
    {
      id: "languages",
      label: "Programming",
      blurb: "Languages I write production code in.",
      skills: ["Java", "C++", "Python", "JavaScript", "TypeScript", "SQL"],
    },
    {
      id: "cloud",
      label: "Cloud / Tools",
      blurb: "Shipping, auth and the daily toolbelt.",
      skills: ["AWS", "Git", "GitHub", "Docker", "Postman", "OAuth 2.0"],
    },
  ] satisfies SkillGroup[],

  projects: [
    {
      slug: "psychdeskhq-meeting-assistant",
      title: "PsychDeskHQ Meeting Assistant",
      tagline: "Recordings in. Searchable knowledge out.",
      description:
        "AI-powered meeting assistant that transforms meeting recordings into searchable transcripts, summaries, and insights.",
      highlights: [
        "Audio transcription workflow built on Whisper.",
        "AI-generated meeting summaries.",
        "Retrieval-augmented generation over meeting content.",
        "Backend APIs for scheduling and sessions.",
      ],
      stack: ["Node.js", "Express", "PostgreSQL", "AWS S3", "Whisper", "OpenAI", "LangChain"],
      github: null,
      demo: "https://clinic.psychdesk.in/auth",
      image: null,
      mockup: "meeting",
      accent: "blue",
    },
    {
      slug: "chainvault",
      title: "ChainVault",
      tagline: "Documents you can prove.",
      description:
        "Blockchain-based secure document management system with decentralized storage and verification.",
      stack: ["React", "Node.js", "Express", "MongoDB", "Solidity", "Ethereum", "IPFS", "MetaMask"],
      github: null,
      demo: "https://chain-vault-five.vercel.app/",
      image: null,
      mockup: "vault",
      accent: "violet",
    },
    {
      slug: "resume-arcade",
      title: "Resume Arcade",
      tagline: "Resume feedback, powered by LLMs.",
      description:
        "AI-powered resume analysis and improvement platform using LLMs and semantic search.",
      stack: ["Django", "Python", "OpenAI APIs", "FAISS"],
      github: null,
      demo: null,
      image: null,
      mockup: "resume",
      accent: "cyan",
    },
    {
      slug: "doubt-buster",
      title: "Doubt Buster",
      tagline: "Ask. Connect. Solve — live.",
      description:
        "Real-time doubt-solving platform with live communication and collaborative functionality.",
      stack: ["WebRTC", "Socket.io", "Node.js"],
      github: null,
      demo: "https://doubt-buster.vercel.app/",
      image: null,
      mockup: "realtime",
      accent: "pink",
    },
  ] satisfies Project[],

  achievements: [
    {
      value: "NIT",
      label: "NIT Jamshedpur Postgraduate",
      detail: "Master of Computer Applications, class of 2025.",
      verified: true,
    },
    {
      value: "3★",
      label: "CodeChef Programmer",
      detail: "Rated 3-star on CodeChef competitive programming.",
      verified: true,
    },
    {
      value: "1000+",
      label: "DSA Problems Solved",
      detail: "Across competitive programming and interview platforms.",
      verified: false, // ← verify before publishing
    },
    {
      value: "Top 300",
      label: "ML Summer School 2024",
      detail: "Selected among the top 300 participants.",
      verified: false, // ← verify before publishing
    },
  ] satisfies Achievement[],

  education: [
    {
      degree: "MCA",
      field: "Master of Computer Applications",
      institution: "NIT Jamshedpur",
      period: "2023 – 2025",
    },
    {
      degree: "B.Sc.",
      field: "Mathematics and Physics",
      period: "2021",
    },
  ] satisfies Education[],

  contact: {
    heading: "Have an Interesting Project in Mind?",
    description: "Let's connect and build something meaningful together.",
  },
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

/** In production, unverified content is hidden. */
export const showUnverified = process.env.NODE_ENV !== "production";
