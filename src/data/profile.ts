/**
 * Single source of truth for every word and number on this page.
 *
 * Provenance, so nothing here is a guess:
 *  - Roles, orgs, dates, locations: LinkedIn /in/utkarshsingx
 *  - Repos, stars, languages, homepages: GitHub REST API, 2026-10-31
 *  - Contribution figures: GitHub GraphQL contributions API for
 *    2025-11-01 → 2026-10-31. Re-pull with `npm run refresh:stats`.
 *
 * One field is inferred rather than confirmed and is marked UNVERIFIED.
 */

export const profile = {
  name: "Utkarsh Singh",
  handle: "utkarshsingx",
  role: "Platform Engineer",
  tagline: "Multi-tenant platforms, assessment engines and AI systems.",
  location: "Greater Noida, Uttar Pradesh, India",
  timezone: "IST · GMT+5:30",
  // Confirmed 2026-10-31: this is the address on his Netlify account.
  email: "hauntedutkarsh@gmail.com",
  // UNVERIFIED — no institution named on the live site.
  education: "Computer science · Greater Noida, IN",
  available: "Open to platform / backend / AI-infra conversations",
  links: {
    github: "https://github.com/utkarshsingx",
    linkedin: "https://www.linkedin.com/in/utkarshsingx",
    twitter: "https://twitter.com/utkarshsingx",
    writing: "https://utkarshreads.me",
    youtube: "https://www.youtube.com/@utkarshsingx",
    fieldReport: "https://utkarshsingx.github.io/",
  },
} as const;

export const intro = {
  headline: ["I build the systems", "behind multi-tenant", "learning platforms"],
  body:
    "Backends, assessment engines and AI tutors for products that several organisations " +
    "use at once — where one badly scoped query leaks another tenant's data and one " +
    "unguarded deploy drops a live class. Three products in parallel, shipped from " +
    "schema to deploy.",
  principle: "Ship it, then prove it.",
};

/** §About — the claims worth leading with. */
export const achievements = [
  {
    metric: "Intern → Lead",
    label: "in seven months",
    detail:
      "Joined AI Linc as an intern in Sept 2025, SWE by December, Lead Software Engineer by April 2026. Now own the Django backend and most of what runs on it.",
  },
  {
    metric: "~6M",
    label: "API requests served",
    detail:
      "Prephasz, the campus-placement platform I founded the engineering for, has been live since June 2026 — drive days above 200,000 requests and thousands of graded mock attempts.",
  },
  {
    metric: "3,000",
    label: "concurrent students, certified",
    detail:
      "Diagnosed a live-drive outage caused by a rate limiter keyed on the load-balancer IP, then load-test certified 3,000 concurrent students with k6.",
  },
  {
    metric: "0 → SaaS",
    label: "compliance platform from a blank repo",
    detail:
      "Core team at Audix GRC: a cross-framework control engine on the Secure Controls Framework, nine cloud/identity connectors, database-level tenant isolation and an MCP server exposing live compliance data read-only.",
  },
];

export const principles = [
  "End to end — schema → API → UI → deploy",
  "Multi-tenant by default; isolation is not a feature",
  "Evidence over vibes — measure before shipping",
  "Boring infrastructure under interesting products",
];

/** §Experience — LinkedIn, newest first. */
export type Role = {
  org: string;
  title: string;
  kind: string;
  start: string;
  end: string;
  place: string;
  summary: string;
  stack: string[];
  promotions?: string[];
};

export const roles: Role[] = [
  {
    org: "Audix GRC",
    title: "Software Engineer",
    kind: "full-time",
    start: "Jun 2026",
    end: "Present",
    place: "Remote",
    summary:
      "Compliance automation that turns a company's existing cloud, identity and device tools into continuously collected evidence, mapping each control to every framework it satisfies — SOC 2, ISO 27001, PCI DSS. Core team, blank repo to multi-tenant SaaS. Built the cross-framework control engine, the connector layer (AWS, Azure, GCP, Okta, Entra ID, GitHub, Intune, Wiz), a monitoring engine that returns inconclusive instead of a false pass, database-level tenant isolation with a read-only auditor role, a public Trust Center, and an MCP server.",
    stack: ["Multi-tenant SaaS", "MCP server", "RBAC", "Connectors", "MFA · TOTP", "Audit log"],
  },
  {
    org: "Prephasz by ZSkillup",
    title: "Lead Software Engineer",
    kind: "founding engineer",
    start: "May 2026",
    end: "Present",
    place: "Pune · Remote",
    summary:
      "Multi-tenant campus-placement preparation platform for engineering colleges, built end to end: PostgreSQL schema, NestJS API, Next.js frontend, AWS infrastructure. Four role workspaces on college-scoped tenancy; an assessment engine with server-authoritative timers and idempotent grading; browser-side proctoring with TensorFlow.js; a Judge0-backed coding IDE; IRT adaptive quizzes and AI mock interviews with Whisper; ECS Fargate with circuit-breaker rollback.",
    stack: ["NestJS · Next.js", "Proctoring", "Judge0", "AWS Fargate", "k6 · 3,000 CCU", "Razorpay"],
  },
  {
    org: "AI Linc",
    title: "Lead Software Engineer",
    kind: "intern → SWE → lead",
    start: "Sep 2025",
    end: "Present",
    place: "Hyderabad · Remote",
    summary:
      "A multi-tenant learning platform serving a fleet of client organisations — colleges, academies and enterprise cohorts — each with its own branding, courses, cohorts and entitlements. Adaptive course journeys and an assessment engine rebuilt for score integrity; an AI tutor taken from text to realtime voice with per-tenant cost metering; a Judge0 coding environment; live classes over Zoom and Google Meet with webhook attendance; certificates, points and streaks; a React Native app shipped per tenant with OTA updates; and an ECS deploy path gated on whether a class is currently live.",
    stack: ["Django · DRF", "Celery · Redis", "React · TS", "Expo", "AI tutor", "Zoom API", "ECS"],
    promotions: ["Lead · Apr 2026", "SWE · Dec 2025", "Intern · Sep 2025"],
  },
  {
    org: "AccrePro",
    title: "Software Engineer",
    kind: "freelance",
    start: "Dec 2025",
    end: "Mar 2026",
    place: "Dubai · Remote",
    summary:
      "Healthcare accreditation and quality platform for hospitals and labs pursuing CBAHI, ISO 15189 and CAP. Built the Root Cause Analysis and Lab Equipment Lifecycle modules: an RCA rules engine with severity, sentinel-event and recurrence rules over a likelihood-by-consequence risk matrix; a template renderer with fishbone and process-map widgets; tokenised action plans for external owners with no account; DocuSign e-signature behind a feature flag; and equipment lifecycle from vendor scoring through IQ/OQ/PQ validation to retirement, with Westgard rules on Levey-Jennings charts.",
    stack: ["React · Ant Design", "Node · Sequelize", "MySQL", "DocuSign", "GCP"],
  },
  {
    org: "Outlier",
    title: "AI Trainer",
    kind: "freelance",
    start: "Jul 2024",
    end: "Jun 2025",
    place: "Remote",
    summary:
      "Trained and evaluated large language models through prompt engineering and reasoning tasks across coding, mathematics and logic. Wrote and refined prompts, then graded model responses for accuracy, coherence and reasoning quality — a year of reading model failures closely, which is where the habit above comes from: a prompt is a program, and an answer that looks right is not the same as an answer that is right.",
    stack: ["Prompt engineering", "Evaluation", "Reasoning"],
  },
];

/** §GitHub — verified against the REST API on 2026-10-31. */
export type Repo = {
  name: string;
  repo: string;
  stars: number;
  language: string;
  blurb: string;
  live?: string;
};

export const repos: Repo[] = [
  {
    name: "picks.",
    repo: "picks.",
    stars: 44,
    language: "TypeScript",
    live: "https://picksbet.vercel.app",
    blurb:
      "A betting platform on Next.js and Django — markets, odds, wallet and settlement. The most-starred thing I have written, and the reason I know what an idempotent payout has to look like.",
  },
  {
    name: "utkarshreads",
    repo: "utkarshreads",
    stars: 1,
    language: "TypeScript",
    live: "https://utkarshreads.me",
    blurb:
      "The digital studio of my thoughts, book reviews and artwork. Posts, a library, a gallery and an archive, with an RSS feed for people who still keep a reader.",
  },
  {
    name: "Hackathon-Evaluator",
    repo: "Hackathon-Evaluator",
    stars: 0,
    language: "TypeScript",
    live: "https://hackathon-evaluator.vercel.app",
    blurb:
      "Scores a hackathon batch the way a panel would, without the panel: rubric grading, engagement signals and a sorted leaderboard out the other end. Written because I had to evaluate several batches in a row.",
  },
  {
    name: "AI-Surveyor",
    repo: "AI-Surveyor",
    stars: 0,
    language: "TypeScript",
    live: "https://ai-surveyor-alpha.vercel.app",
    blurb:
      "Turns a research question into a survey instrument, runs it, and reads the responses back as structure rather than prose. An experiment in letting a model design the questions but never grade its own output.",
  },
  {
    name: "starrytv",
    repo: "starrytv",
    stars: 0,
    language: "TypeScript",
    live: "https://starrytv.vercel.app",
    blurb:
      "A television that wants you to come back to life. No roadmap, no users, no analytics — the build I point at when someone asks whether engineering has to be useful to be worth doing.",
  },
  {
    name: "Zaika-Kitchen",
    repo: "Zaika-Kitchen",
    stars: 8,
    language: "JavaScript",
    live: "https://zaika-kitchen.netlify.app/",
    blurb:
      "A food-delivery storefront in React, and the second-most-starred thing on the account. Early work, kept public because the commit history is an honest record of learning the framework.",
  },
  {
    name: "germany-ms-roadmap",
    repo: "germany-ms-roadmap",
    stars: 0,
    language: "HTML",
    blurb:
      "A tracker for the Winter 2027/28 intake: the dMAT and APS chain, a timeline, seventeen universities, a cost model and the official links behind each claim. Built for one user, documented like it has a thousand.",
  },
  {
    name: "Algorithms-Visualiser",
    repo: "Algorithms-Visualiser",
    stars: 1,
    language: "JavaScript",
    live: "https://codeslayer-algorithm-visualiser.netlify.app",
    blurb:
      "Pathfinding and maze generation rendered step by step, so the algorithm is something you watch rather than something you are told about. Still the clearest thing I have built for explaining a concept.",
  },
];

export const stackGroups = [
  { label: "Backend", items: ["Django · DRF", "NestJS · Node", "Celery · Redis", "PostgreSQL", "REST · JWT"] },
  { label: "Frontend", items: ["React · Next.js", "TypeScript", "Tailwind", "React Native · Expo", "Monaco"] },
  { label: "AI", items: ["LLM APIs", "Realtime voice · STT", "RAG · embeddings", "Token metering", "MCP servers"] },
  { label: "Infra", items: ["AWS ECS · Fargate", "Docker", "GitHub Actions", "S3 · IAM", "k6"] },
];
