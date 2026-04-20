// Generates and inserts 640 city_pages rows (32 services × 20 cities)
const https = require("https");

const SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxneHJucGp3YW9pcHFqZmhqcWtjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjYxNjc5MCwiZXhwIjoyMDkyMTkyNzkwfQ.ikVXvzAdWTQVZCf0EJSdFbgwRWwTdXLkH4RoAPYYeNU";

const CITIES = [
  { slug: "new-york-ny", display: "New York, NY", short: "New York", vibe: "competitive New York market", industry: "finance, media, and DTC brands" },
  { slug: "los-angeles-ca", display: "Los Angeles, CA", short: "Los Angeles", vibe: "fast-moving LA market", industry: "entertainment, e-commerce, and tech" },
  { slug: "chicago-il", display: "Chicago, IL", short: "Chicago", vibe: "demanding Chicago business environment", industry: "finance, manufacturing, and logistics" },
  { slug: "houston-tx", display: "Houston, TX", short: "Houston", vibe: "high-growth Houston economy", industry: "energy, healthcare, and logistics" },
  { slug: "dallas-tx", display: "Dallas, TX", short: "Dallas", vibe: "rapidly expanding Dallas–Fort Worth market", industry: "technology, finance, and healthcare" },
  { slug: "atlanta-ga", display: "Atlanta, GA", short: "Atlanta", vibe: "emerging Atlanta business scene", industry: "tech, logistics, and Fortune 500 headquarters" },
  { slug: "miami-fl", display: "Miami, FL", short: "Miami", vibe: "dynamic Miami startup ecosystem", industry: "finance, real estate, and Latin American trade" },
  { slug: "seattle-wa", display: "Seattle, WA", short: "Seattle", vibe: "tech-forward Seattle market", industry: "cloud computing, aerospace, and e-commerce" },
  { slug: "boston-ma", display: "Boston, MA", short: "Boston", vibe: "innovation-driven Boston economy", industry: "biotech, healthcare, and higher education" },
  { slug: "san-francisco-ca", display: "San Francisco, CA", short: "San Francisco", vibe: "hyper-competitive San Francisco market", industry: "venture-backed startups, SaaS, and AI" },
  { slug: "austin-tx", display: "Austin, TX", short: "Austin", vibe: "rapidly scaling Austin startup ecosystem", industry: "tech, creator economy, and enterprise software" },
  { slug: "denver-co", display: "Denver, CO", short: "Denver", vibe: "growing Denver business community", industry: "outdoor brands, technology, and professional services" },
  { slug: "minneapolis-mn", display: "Minneapolis, MN", short: "Minneapolis", vibe: "competitive Minneapolis–Saint Paul market", industry: "retail, healthcare, and financial services" },
  { slug: "phoenix-az", display: "Phoenix, AZ", short: "Phoenix", vibe: "fast-growing Phoenix metro economy", industry: "real estate, finance, and semiconductor manufacturing" },
  { slug: "philadelphia-pa", display: "Philadelphia, PA", short: "Philadelphia", vibe: "established Philadelphia business market", industry: "healthcare, education, and professional services" },
  { slug: "san-diego-ca", display: "San Diego, CA", short: "San Diego", vibe: "innovation-rich San Diego economy", industry: "biotech, defense, and clean energy" },
  { slug: "nashville-tn", display: "Nashville, TN", short: "Nashville", vibe: "booming Nashville growth market", industry: "healthcare, music, and hospitality" },
  { slug: "charlotte-nc", display: "Charlotte, NC", short: "Charlotte", vibe: "surging Charlotte business ecosystem", industry: "banking, fintech, and professional services" },
  { slug: "portland-or", display: "Portland, OR", short: "Portland", vibe: "sustainability-focused Portland market", industry: "outdoor brands, tech, and small business" },
  { slug: "washington-dc", display: "Washington, DC", short: "Washington DC", vibe: "policy-adjacent Washington DC economy", industry: "government contracting, nonprofits, and professional services" },
];

const SERVICES = [
  {
    slug: "ai-ad-creative-production-service",
    name: "AI Ad Creative Production",
    keyword: "ai ad creative production agency",
    tagline: "Stop losing ROAS to creative fatigue — get 10+ fresh variants per concept at the speed of your testing cadence.",
    cityContext: (c) => `${c.short}'s ${c.industry} sector runs some of the most competitive paid ad auctions in the country.`,
    headline: (c) => `AI Ad Creative Production for ${c.display} Brands`,
    intro: (c) =>
      `${c.short}'s ${c.industry} sector runs some of the most competitive paid ad auctions in the country. Creative fatigue is the silent ROAS killer — most brands refresh once a month when they should refresh weekly. We produce 10+ variants per concept at your testing cadence, flat fee, so ${c.short} brands never run dry.`,
    meta: (c) =>
      `AI ad creative production for ${c.short} brands. 10+ variants per concept, flat fee. Beat creative fatigue and protect ROAS in ${c.display}.`,
  },
  {
    slug: "ai-customer-support-agent-setup-service",
    name: "AI Customer Support Agent Setup",
    keyword: "ai customer support agent implementation service",
    tagline: "Hit 50–70% AI resolution rates instead of the 15–25% set-and-forget average.",
    cityContext: (c) => `${c.short} companies in ${c.industry} are rapidly adopting AI support tools — but most sit at 15–25% resolution rates.`,
    headline: (c) => `AI Customer Support Agent Setup in ${c.display}`,
    intro: (c) =>
      `${c.short} companies in ${c.industry} are rapidly adopting AI support tools — but most sit at 15–25% resolution rates. Proper setup and ongoing knowledge-base tuning is the difference between a tool that pays for itself and one that creates more tickets than it closes. We handle the full implementation for ${c.short} businesses, from configuration to continuous optimization.`,
    meta: (c) =>
      `AI customer support agent setup for ${c.short} companies. We configure, tune, and optimize your AI agent to hit 50–70% resolution rates in ${c.display}.`,
  },
  {
    slug: "ai-legacy-system-modernization-assessment",
    name: "AI Legacy System Modernization Assessment",
    keyword: "legacy code modernization consulting service",
    tagline: "30-day strategic assessment: what to refactor, rewrite, and leave alone — at a flat fee SMBs can afford.",
    cityContext: (c) => `${c.short}'s ${c.industry} sector is filled with engineering teams carrying 8–15+ year-old codebases.`,
    headline: (c) => `Legacy System Modernization Assessment in ${c.display}`,
    intro: (c) =>
      `${c.short}'s ${c.industry} sector is filled with engineering teams carrying 8–15+ year-old codebases that slow every feature sprint. Big-four modernization consultants quote $500K–$2M for this work. We do the strategic assessment in 30 days — what to refactor, what to rewrite, what to leave alone — at a flat fee that ${c.short} mid-market companies can actually budget for.`,
    meta: (c) =>
      `Legacy system modernization assessment for ${c.short} engineering teams. 30-day strategic roadmap at a flat fee. Serving ${c.display} companies.`,
  },
  {
    slug: "ai-mvp-development-service",
    name: "AI MVP Development",
    keyword: "ai mvp development agency",
    tagline: "Production-quality MVPs in 2–4 weeks at flat fees starting at $1,999.",
    cityContext: (c) => `${c.short}'s startup ecosystem is moving fast — founders who wait 12 weeks for a traditional agency lose their window.`,
    headline: (c) => `AI MVP Development for ${c.display} Founders`,
    intro: (c) =>
      `${c.short}'s startup ecosystem is moving fast — founders who wait 12 weeks for a traditional agency lose their window. We use AI-augmented development to ship production-quality MVPs in 2–4 weeks, starting at $1,999. ${c.short} founders get code they own, code they can scale, without the agency markup.`,
    meta: (c) =>
      `AI MVP development for ${c.short} founders. Ship in 2–4 weeks, flat fee from $1,999. Production-quality code you own. Serving ${c.display}.`,
  },
  {
    slug: "ai-prompt-engineering-service-for-marketers",
    name: "AI Prompt Engineering for Marketers",
    keyword: "custom ai prompt library for marketing teams",
    tagline: "Custom prompt libraries tailored to your brand voice so AI output is ready-to-use, not a starting point.",
    cityContext: (c) => `Marketing teams across ${c.short}'s ${c.industry} sector are using AI daily but getting generic output that needs heavy editing.`,
    headline: (c) => `AI Prompt Engineering for ${c.display} Marketing Teams`,
    intro: (c) =>
      `Marketing teams across ${c.short}'s ${c.industry} sector are using AI daily but getting generic output that needs heavy editing. The missing piece is a custom prompt library built around your brand voice, campaigns, and conversion goals. We build it in one week — so your ${c.short} team stops editing AI drafts and starts shipping them.`,
    meta: (c) =>
      `Custom AI prompt libraries for ${c.short} marketing teams. Brand-specific, conversion-optimized, ready to deploy. Serving ${c.display}.`,
  },
  {
    slug: "ai-regulatory-compliance-copilot-setup-service",
    name: "AI Regulatory Compliance Copilot Setup",
    keyword: "ai compliance monitoring setup for law firms",
    tagline: "Custom AI compliance copilots trained on your jurisdiction, practice type, and regulatory footprint — in 2 weeks.",
    cityContext: (c) => `Regulated professionals in ${c.short} — law firms, healthcare practices, financial advisors — face a relentless volume of regulatory updates.`,
    headline: (c) => `AI Compliance Copilot Setup for ${c.display} Firms`,
    intro: (c) =>
      `Regulated professionals in ${c.short} — law firms, healthcare practices, financial advisors — face a relentless volume of regulatory updates specific to ${c.display} and their industry. Missing one can mean six-figure fines. We build a custom AI compliance copilot trained on your jurisdiction and practice type in 2 weeks. Flat fee. You own it after handoff.`,
    meta: (c) =>
      `AI compliance copilot setup for ${c.short} law firms, healthcare practices, and financial advisors. Jurisdiction-specific, 2-week delivery. ${c.display}.`,
  },
  {
    slug: "ai-startup-security-audit-trust-badge-service",
    name: "AI Startup Security Audit & Trust Badge",
    keyword: "startup soc2 security audit service",
    tagline: "Ethical hacker-driven security audit + dated trust badge starting at $499. Unblock enterprise deals before SOC 2.",
    cityContext: (c) => `${c.short}'s AI startup scene is crowded — enterprise buyers in ${c.industry} demand trust signals before contracts move forward.`,
    headline: (c) => `AI Startup Security Audit for ${c.display} Companies`,
    intro: (c) =>
      `${c.short}'s AI startup scene is crowded — enterprise buyers in ${c.industry} demand trust signals before contracts move forward. SOC 2 takes 6–12 months and $45K–$70K. Our security audit covers OWASP LLM Top 10, penetration testing, and data handling review, issuing a dated trust badge starting at $499. ${c.short} founders use it to unblock deals while SOC 2 is in progress.`,
    meta: (c) =>
      `AI startup security audit for ${c.short} companies. OWASP LLM Top 10, pen test, trust badge from $499. Unblock enterprise deals in ${c.display}.`,
  },
  {
    slug: "ai-strategy-roadmap-service",
    name: "AI Strategy Roadmap",
    keyword: "ai implementation roadmap consulting service",
    tagline: "30-day AI strategy roadmap for Series A/B companies — use case prioritization, vendor selection, ROI modeling.",
    cityContext: (c) => `Series A and B companies in ${c.short} are under board pressure to show an AI strategy — but most lack the internal expertise to build one.`,
    headline: (c) => `AI Strategy Roadmap for ${c.display} Companies`,
    intro: (c) =>
      `Series A and B companies in ${c.short} are under board pressure to show an AI strategy — but most lack the internal expertise to build one. Big-4 consultants charge $150K–$500K for this. We deliver a 30-day AI roadmap covering use case prioritization, vendor selection, ROI modeling, and governance, at a flat fee built for ${c.short}'s growth-stage market.`,
    meta: (c) =>
      `AI strategy roadmap for ${c.short} Series A/B companies. 30 days, flat fee. Use case prioritization, vendor selection, ROI modeling. ${c.display}.`,
  },
  {
    slug: "ai-vibe-code-cleanup-refactoring-service",
    name: "AI Vibe Code Cleanup & Refactoring",
    keyword: "ai generated code cleanup and refactoring service",
    tagline: "Prioritize and refactor AI-generated technical debt before your fundraise or SOC 2 audit.",
    cityContext: (c) => `${c.short} startups that shipped on Cursor or Claude Code are now facing fundraise due diligence with codebases full of AI-generated debt.`,
    headline: (c) => `AI Code Cleanup & Refactoring for ${c.display} Startups`,
    intro: (c) =>
      `${c.short} startups that shipped on Cursor or Claude Code are now facing fundraise due diligence with codebases full of AI-generated debt. We prioritize the debt, refactor in safe batches, and leave your team with a codebase that passes scrutiny. Built for ${c.short} B2B AI companies on a pre-Series A timeline.`,
    meta: (c) =>
      `AI-generated code cleanup and refactoring for ${c.short} startups. Pre-fundraise and pre-SOC 2 codebase remediation. Serving ${c.display}.`,
  },
  {
    slug: "ai-website-redesign-service",
    name: "AI Website Redesign",
    keyword: "affordable ai website redesign service",
    tagline: "Production-quality website redesign in 24 hours, starting at $199. Real redesign, not a template.",
    cityContext: (c) => `Small businesses in ${c.short} know their website is losing them customers — but $5,000–$15,000 agency redesigns and 4-6 week timelines are out of reach.`,
    headline: (c) => `Affordable AI Website Redesign in ${c.display}`,
    intro: (c) =>
      `Small businesses in ${c.short} know their website is losing them customers — but $5,000–$15,000 agency redesigns and 4–6 week timelines are out of reach. We use AI-accelerated design to ship production-quality website refreshes in 24 hours, starting at $199. Not a template — a real redesign tailored to your brand, deployed to your existing domain.`,
    meta: (c) =>
      `Affordable AI website redesign for ${c.short} small businesses. Production-quality in 24 hours from $199. Real redesign, not a template. ${c.display}.`,
  },
  {
    slug: "cold-email-deliverability-messaging-audit-service",
    name: "Cold Email Deliverability & Messaging Audit",
    keyword: "cold email deliverability audit service",
    tagline: "Fix both problems — deliverability and messaging — and get from 2% to 8–12% reply rates.",
    cityContext: (c) => `Founders and sales teams in ${c.short} running cold outbound are often hitting 2% reply rates without knowing if the problem is deliverability or messaging.`,
    headline: (c) => `Cold Email Audit for ${c.display} Sales Teams`,
    intro: (c) =>
      `Founders and sales teams in ${c.short} running cold outbound are often hitting 2% reply rates without knowing if the problem is deliverability or messaging. Half the time it's technical — you're landing in spam. The other half it's copy. We audit both, rebuild what's broken, and monitor for 90 days. ${c.short} sales teams using this hit 8–12% reply rates.`,
    meta: (c) =>
      `Cold email deliverability and messaging audit for ${c.short} sales teams. Fix spam placement and copy. Get to 8–12% reply rates in ${c.display}.`,
  },
  {
    slug: "crm-data-cleanup-service",
    name: "CRM Data Cleanup",
    keyword: "crm data cleaning service hubspot salesforce",
    tagline: "Fix duplicates, enrich missing fields, and restore your pipeline in 48 hours.",
    cityContext: (c) => `B2B companies in ${c.short} running on HubSpot, Salesforce, or Pipedrive lose millions annually to dirty CRM data — and most don't realize it.`,
    headline: (c) => `CRM Data Cleanup for ${c.display} B2B Companies`,
    intro: (c) =>
      `B2B companies in ${c.short} running on HubSpot, Salesforce, or Pipedrive lose millions annually to dirty CRM data — Gartner puts the average at $12.9M–$15M. Contact data decays 22.5–70% per year. We fix duplicates, enrich missing fields, standardize formats, and deliver a clean pipeline in 48 hours. Serving ${c.short} companies with 5,000+ contacts.`,
    meta: (c) =>
      `CRM data cleanup for ${c.short} B2B companies on HubSpot, Salesforce, or Pipedrive. Dedupe, enrich, standardize — 48-hour turnaround. ${c.display}.`,
  },
  {
    slug: "esg-compliance-strategy-service",
    name: "ESG Compliance Strategy",
    keyword: "esg compliance consulting for mid-market companies",
    tagline: "90-day ESG compliance roadmap, reporting infrastructure, and disclosure strategy — flat fee.",
    cityContext: (c) => `Mid-market companies in ${c.short} doing business in the EU, UK, California, or New York face mandatory ESG disclosure obligations that are already in effect.`,
    headline: (c) => `ESG Compliance Strategy for ${c.display} Companies`,
    intro: (c) =>
      `Mid-market companies in ${c.short} doing business in the EU, UK, California, or New York face mandatory ESG disclosure obligations — CSRD, California SB 253, and NY climate regulations are already in effect or taking effect by 2026. We build your compliance roadmap, reporting infrastructure, and disclosure strategy in 90 days, flat fee. Built for ${c.short} mid-market operations.`,
    meta: (c) =>
      `ESG compliance strategy for ${c.short} mid-market companies. 90-day roadmap covering CSRD, SB 253, and NY climate requirements. ${c.display}.`,
  },
  {
    slug: "first-100-customers-launch-agency",
    name: "First 100 Customers Launch Agency",
    keyword: "startup customer acquisition agency first 100 customers",
    tagline: "Build the acquisition system — cold outbound, founder content, community, and referral loops — in 90 days.",
    cityContext: (c) => `Pre-seed and seed-stage B2B SaaS founders in ${c.short} need validated traction before their next raise, and ${c.short}'s competitive ecosystem makes early acquisition harder.`,
    headline: (c) => `First 100 Customers for ${c.display} Startups`,
    intro: (c) =>
      `Pre-seed and seed-stage B2B SaaS founders in ${c.short} need validated traction before their next raise — and ${c.short}'s competitive ${c.industry} ecosystem makes early acquisition harder without a system. We build the full acquisition engine: cold outbound, founder-led content, community infiltration, and referral loops in 90 days. ${c.short} founders leave with a repeatable channel, not a one-time campaign.`,
    meta: (c) =>
      `First 100 customers for ${c.short} B2B SaaS startups. 90-day acquisition system: outbound, content, community, and referrals. ${c.display}.`,
  },
  {
    slug: "founder-branding-storytelling-service",
    name: "Founder Branding & Storytelling",
    keyword: "founder brand story writing service",
    tagline: "Story-led brand pages that convert 30% better — done in 5 days, flat fee.",
    cityContext: (c) => `Founders in ${c.short}'s ${c.industry} market are competing for attention — and most About pages read like LinkedIn profiles instead of conversion assets.`,
    headline: (c) => `Founder Brand Storytelling for ${c.display} Founders`,
    intro: (c) =>
      `Founders in ${c.short}'s ${c.industry} market are competing for attention — and most About pages read like LinkedIn profiles instead of conversion assets. Story-led brand pages convert 30% better than feature pages. We write the story your customers actually want to read — done in 5 days, flat fee. Built for ${c.short} bootstrapped and early-stage founders.`,
    meta: (c) =>
      `Founder brand story writing for ${c.short} founders. Convert 30% better with story-led brand pages. 5-day turnaround, flat fee. ${c.display}.`,
  },
  {
    slug: "google-business-profile-optimization-service",
    name: "Google Business Profile Optimization",
    keyword: "google maps ranking service for local businesses",
    tagline: "Optimize your Google Business Profile, build citations, and automate review collection.",
    cityContext: (c) => `Local businesses in ${c.short} are missing out on high-intent foot traffic — 76% of local searches result in a same-day visit, and Google Maps rank determines who gets them.`,
    headline: (c) => `Google Business Profile Optimization in ${c.display}`,
    intro: (c) =>
      `Local businesses in ${c.short} are missing out on high-intent foot traffic — 76% of local searches result in a same-day visit, and Google Maps rank determines who wins. We optimize your Google Business Profile, build local citations, and automate review collection so ${c.short} businesses capture that demand instead of giving it to competitors.`,
    meta: (c) =>
      `Google Business Profile optimization for ${c.short} local businesses. Improve Google Maps ranking, citations, and reviews. Serving ${c.display}.`,
  },
  {
    slug: "industry-specific-marketing-funnel-service",
    name: "Industry-Specific Marketing Funnel",
    keyword: "hipaa compliant marketing funnel for healthcare and legal",
    tagline: "Compliance-aware funnels for legal, healthcare, and fintech — deployed in 7 days.",
    cityContext: (c) => `Marketing agencies in ${c.short} serving legal, healthcare, and fintech clients need compliance-aware funnel templates that survive regulatory review.`,
    headline: (c) => `HIPAA-Compliant Marketing Funnels for ${c.display} Agencies`,
    intro: (c) =>
      `Marketing agencies in ${c.short} serving legal, healthcare, and fintech clients need compliance-aware funnel templates that survive regulatory review — generic templates don't cut it. HIPAA fines hit $2.19M per violation. We build ${c.short} agencies fully compliant, industry-specific funnels that deploy in 7 days and are ready to white-label.`,
    meta: (c) =>
      `HIPAA-compliant marketing funnels for ${c.short} healthcare, legal, and fintech agencies. 7-day deployment, white-label ready. ${c.display}.`,
  },
  {
    slug: "landing-page-production-service",
    name: "Landing Page Production",
    keyword: "landing page design and production agency",
    tagline: "High-converting landing pages that ship in 24 hours at flat fees — not six-week agency timelines.",
    cityContext: (c) => `Small businesses and e-commerce brands in ${c.short} need landing pages that convert — not six-week agency timelines and $10K quotes.`,
    headline: (c) => `Landing Page Production for ${c.display} Businesses`,
    intro: (c) =>
      `Small businesses and e-commerce brands in ${c.short} need landing pages that convert — not six-week agency timelines and $10K quotes. Most landing pages convert at 4–5%. Top performers hit 11%+. We ship in 24 hours at flat fees that make A/B testing affordable for ${c.short} brands, not just enterprise marketing teams.`,
    meta: (c) =>
      `Landing page design and production for ${c.short} businesses. 24-hour delivery, flat fee, 11%+ conversion benchmarks. ${c.display}.`,
  },
  {
    slug: "linkedin-ghostwriting-service",
    name: "LinkedIn Ghostwriting",
    keyword: "linkedin ghostwriting service for executives",
    tagline: "Executive LinkedIn presence without the 10 hours a week — ghostwritten in your voice, proven ROI.",
    cityContext: (c) => `B2B executives in ${c.short}'s ${c.industry} sector need LinkedIn presence for pipeline — but most don't have 10 hours a week to maintain one.`,
    headline: (c) => `LinkedIn Ghostwriting for ${c.display} Executives`,
    intro: (c) =>
      `B2B executives in ${c.short}'s ${c.industry} sector need LinkedIn presence for pipeline — but most at $250K+ compensation don't have 10 hours a week to maintain one. We ghostwrite in your voice, handle strategic engagement, and prove ROI. ${c.short} executives use us to build audience without touching the keyboard.`,
    meta: (c) =>
      `LinkedIn ghostwriting for ${c.short} executives and founders. Ghost-written in your voice, proven pipeline ROI. Serving ${c.display}.`,
  },
  {
    slug: "llm-seo-optimization-service",
    name: "LLM SEO Optimization",
    keyword: "generative engine optimization service",
    tagline: "Get found in ChatGPT, Claude, and Gemini — AI referral traffic grew 527% YoY.",
    cityContext: (c) => `B2B SaaS and professional services firms in ${c.short} are invisible when buyers search their category in ChatGPT or Gemini — and losing deals they don't even know about.`,
    headline: (c) => `LLM SEO & AI Search Optimization for ${c.display} Businesses`,
    intro: (c) =>
      `B2B SaaS and professional services firms in ${c.short} are invisible when buyers search their category in ChatGPT or Gemini — and losing deals they don't know about. AI referral traffic grew 527% year-over-year. We optimize your brand's presence across LLM search so ${c.short} buyers find you when they ask AI tools who to hire.`,
    meta: (c) =>
      `LLM SEO and AI search optimization for ${c.short} B2B companies. Get found in ChatGPT, Claude, and Gemini. Serving ${c.display}.`,
  },
  {
    slug: "local-business-growth-consulting",
    name: "Local Business Growth Consulting",
    keyword: "local business growth consultant",
    tagline: "Identify the 3–5 highest-leverage revenue levers for your business — 90 days, flat fee.",
    cityContext: (c) => `Local service businesses and SMBs in ${c.short} with $500K–$5M in revenue don't need McKinsey — they need focused advice on the handful of levers that actually move their numbers.`,
    headline: (c) => `Local Business Growth Consulting in ${c.display}`,
    intro: (c) =>
      `Local service businesses and SMBs in ${c.short} with $500K–$5M in revenue don't need McKinsey — they need focused advice on the handful of levers that actually move their numbers. We combine AI-driven diagnostics with 1:1 consulting to identify your 3–5 highest-leverage growth moves. Flat fees, concrete targets, 90-day engagements built for the ${c.short} market.`,
    meta: (c) =>
      `Local business growth consulting for ${c.short} SMBs. 90-day engagement, flat fee, revenue-focused strategy. Serving ${c.display}.`,
  },
  {
    slug: "mystery-cx-audit-service",
    name: "Mystery CX Audit",
    keyword: "mystery shopper customer experience audit service",
    tagline: "Raw video and transcripts of where your team actually drops the ball — not survey data.",
    cityContext: (c) => `CEOs and heads of CX at growth-stage B2B companies in ${c.short} suspect their dashboards are lying about customer experience quality.`,
    headline: (c) => `Mystery CX Audit for ${c.display} B2B Companies`,
    intro: (c) =>
      `CEOs and heads of CX at growth-stage B2B companies in ${c.short} suspect their dashboards are lying — and they're usually right. We send trained mystery shoppers into your sales calls, support chats, and onboarding flows, then deliver raw video and transcripts showing where your team drops the ball. Pattern analysis, not one-off incidents. Built for ${c.short} operators in Vistage, EO, and peer groups.`,
    meta: (c) =>
      `Mystery CX audit for ${c.short} B2B companies. Mystery shoppers, raw video, pattern analysis. From $1,500/month. ${c.display}.`,
  },
  {
    slug: "on-demand-community-moderation-service",
    name: "On-Demand Community Moderation",
    keyword: "on demand community moderation service",
    tagline: "Trained human moderators plus tooling — flat monthly fee, no $60K–$90K headcount.",
    cityContext: (c) => `Founders and community leaders at B2B SaaS and creator brands in ${c.short} are hitting the limits of what a single community manager can handle.`,
    headline: (c) => `On-Demand Community Moderation for ${c.display} Brands`,
    intro: (c) =>
      `Founders and community leaders at B2B SaaS and creator brands in ${c.short} hit the same wall: communities of 2K–25K that one person can't moderate well. Full-time moderators cost $60K–$90K loaded. Volunteer mods burn out in 4 months. We deliver trained human moderators plus playbook and tooling at a flat monthly fee — built for ${c.short} scale.`,
    meta: (c) =>
      `On-demand community moderation for ${c.short} B2B SaaS and creator brands. Trained moderators, flat monthly fee. ${c.display}.`,
  },
  {
    slug: "pitch-deck-investor-communication-service",
    name: "Pitch Deck & Investor Communication",
    keyword: "pitch deck design and investor communication service",
    tagline: "Investor-ready pitch decks, monthly updates, and board packages in 14 days — flat fee.",
    cityContext: (c) => `Founders in ${c.short} raising seed to Series B are competing for capital in one of the most crowded funding environments in years.`,
    headline: (c) => `Pitch Deck & Investor Communication for ${c.display} Founders`,
    intro: (c) =>
      `Founders in ${c.short} raising seed to Series B are competing for capital in one of the most crowded funding environments in years — 65% of venture value now flows to AI companies. Your deck decides whether the first meeting becomes a partner meeting. We build investor-ready pitch decks, update templates, and board packages in 14 days, flat fee. Written by someone who has read hundreds of decks from the partner side.`,
    meta: (c) =>
      `Pitch deck design and investor communication for ${c.short} founders raising seed to Series B. 14-day delivery, flat fee. ${c.display}.`,
  },
  {
    slug: "productized-micro-consulting-for-smbs",
    name: "Productized Micro-Consulting for SMBs",
    keyword: "on demand business strategy consulting for small business",
    tagline: "Senior strategic thinking on your 1–2 most pressing decisions — 90-minute sprints at SMB prices.",
    cityContext: (c) => `SMB owners in ${c.short} need strategic thinking on specific decisions but can't afford $5K–$20K/month fractional executives or $800/hour consulting partners.`,
    headline: (c) => `On-Demand Business Strategy Consulting in ${c.display}`,
    intro: (c) =>
      `SMB owners in ${c.short} need strategic thinking on specific decisions but can't afford $5K–$20K/month fractional executives or $800/hour consulting partners. Most decisions only need 90 minutes of focused senior thinking. Our productized micro-consulting sprints solve exactly that — at prices built for ${c.short}'s small business market.`,
    meta: (c) =>
      `On-demand business strategy consulting for ${c.short} SMBs. 90-minute sprints, SMB pricing. Senior strategic thinking without the retainer. ${c.display}.`,
  },
  {
    slug: "quickbooks-desktop-migration-service",
    name: "QuickBooks Desktop Migration",
    keyword: "quickbooks desktop to online migration service",
    tagline: "Full data preservation, sandbox verification, flat fee, under 3 weeks.",
    cityContext: (c) => `Small and medium businesses in ${c.short} on QuickBooks Desktop are running out of time — Intuit is ending Desktop support in phases through 2027.`,
    headline: (c) => `QuickBooks Desktop Migration for ${c.display} Businesses`,
    intro: (c) =>
      `Small and medium businesses in ${c.short} on QuickBooks Desktop are running out of time — Intuit is ending Desktop support in phases through 2027. A bad migration means corrupted data and accounting headaches. We migrate your books to QuickBooks Online with full data preservation, sandbox verification, and a flat fee that ${c.short} SMBs can actually plan around. Under 3 weeks.`,
    meta: (c) =>
      `QuickBooks Desktop to Online migration for ${c.short} businesses. Full data preservation, sandbox verified, flat fee, 3 weeks. ${c.display}.`,
  },
  {
    slug: "saas-onboarding-experience-design-service",
    name: "SaaS Onboarding Experience Design",
    keyword: "saas user onboarding design service",
    tagline: "Redesign onboarding to hit time-to-first-value under 7 days and cut first-90-day churn.",
    cityContext: (c) => `B2B SaaS companies in ${c.short} at $1M–$15M ARR are losing users in the first week — and most treat onboarding as an afterthought.`,
    headline: (c) => `SaaS Onboarding Design for ${c.display} Startups`,
    intro: (c) =>
      `B2B SaaS companies in ${c.short} at $1M–$15M ARR are losing users in the first week — 75% abandon within 7 days, and 60–70% of annual churn happens in the first 90 days. Most treat onboarding as an afterthought. We redesign it from activation trigger to first value moment in 30 days, flat fee. ${c.short} SaaS teams leave with a documented playbook, not just a mockup.`,
    meta: (c) =>
      `SaaS onboarding design for ${c.short} B2B companies. 30-day redesign, flat fee. Cut first-week churn and hit time-to-value under 7 days. ${c.display}.`,
  },
  {
    slug: "short-form-video-strategy-service-for-b2b",
    name: "Short-Form Video Strategy for B2B",
    keyword: "b2b short form video strategy service",
    tagline: "Content calendar, scripts, production system, and distribution playbook — 30 days, flat fee.",
    cityContext: (c) => `B2B marketing leaders and founders in ${c.short} know their buyers are on TikTok, LinkedIn video, and YouTube Shorts — but lack a systematic content strategy.`,
    headline: (c) => `B2B Short-Form Video Strategy for ${c.display} Companies`,
    intro: (c) =>
      `B2B marketing leaders and founders in ${c.short} know their buyers are on TikTok, LinkedIn video, and YouTube Shorts — but most treat it as a "content project" instead of a distribution strategy. We build your content calendar, script templates, production system, and distribution playbook in 30 days, flat fee. ${c.short} B2B brands leave with a running system, not a one-off video.`,
    meta: (c) =>
      `B2B short-form video strategy for ${c.short} companies. Content calendar, scripts, distribution playbook — 30-day setup. ${c.display}.`,
  },
  {
    slug: "startup-pivot-advisory-service",
    name: "Startup Pivot Advisory",
    keyword: "startup pivot consultant advisory service",
    tagline: "Disciplined pivot methodology — not gut feel — from advisors who've seen what works.",
    cityContext: (c) => `Seed to Series A founders in ${c.short} hitting growth plateaus face a high-stakes decision: iterate, pivot, or stop.`,
    headline: (c) => `Startup Pivot Advisory for ${c.display} Founders`,
    intro: (c) =>
      `Seed to Series A founders in ${c.short} hitting growth plateaus face a high-stakes decision: iterate, pivot, or stop. 75% of successful startups pivoted at least once — but startups that pivoted more than twice raised 2.5x less than those who pivoted methodically. We bring a disciplined pivot framework, not gut feel, to ${c.short} founders who need a structured way to make this call.`,
    meta: (c) =>
      `Startup pivot advisory for ${c.short} founders at seed to Series A. Disciplined methodology, not gut feel. ${c.display}.`,
  },
  {
    slug: "startup-shutdown-and-wind-down-service",
    name: "Startup Shutdown & Wind-Down",
    keyword: "startup dissolution and wind down service",
    tagline: "Managed wind-down — legal filings, creditor sequencing, employee obligations, asset monetization.",
    cityContext: (c) => `Founders in ${c.short} winding down failed or pivoting startups need a managed process that avoids the $200K+ bankruptcy route.`,
    headline: (c) => `Startup Wind-Down Service for ${c.display} Founders`,
    intro: (c) =>
      `Founders in ${c.short} winding down failed or pivoting startups need a managed process — not the $200K+ bankruptcy route or the $75K–$150K ABC option. We handle legal filings, creditor sequencing, employee obligations, and asset monetization at a fraction of those costs. Flat fee, 90 days. Built for ${c.short} founders who need to wind down cleanly and move on.`,
    meta: (c) =>
      `Startup wind-down and dissolution for ${c.short} founders. Legal filings, creditor sequencing, flat fee, 90 days. ${c.display}.`,
  },
  {
    slug: "t2d3-growth-advisory-service",
    name: "T2D3 Growth Advisory",
    keyword: "b2b saas growth advisory consultant series a",
    tagline: "60-day T2D3 implementation playbook — hiring sequence, GTM motion, unit economics, board KPIs.",
    cityContext: (c) => `B2B SaaS founders and CROs in ${c.short} scaling from Series A to Series B need the T2D3 playbook built for their specific GTM motion and market.`,
    headline: (c) => `T2D3 Growth Advisory for ${c.display} SaaS Companies`,
    intro: (c) =>
      `B2B SaaS founders and CROs in ${c.short} scaling from Series A to Series B at $3M–$30M ARR need more than a growth framework — they need it built for their GTM motion and market. We deliver the T2D3 implementation playbook in 60 days: hiring sequence, go-to-market motion, unit economics model, and board-level KPIs. Built for ${c.short}'s ${c.industry} market.`,
    meta: (c) =>
      `T2D3 growth advisory for ${c.short} B2B SaaS companies at Series A. 60-day implementation playbook, flat fee. ${c.display}.`,
  },
  {
    slug: "vsl-video-sales-letter-production-service",
    name: "VSL Video Sales Letter Production",
    keyword: "video sales letter production service",
    tagline: "Script, produce, and deploy your VSL in 7 days — flat fee.",
    cityContext: (c) => `Digital marketers and course creators in ${c.short} running paid traffic need VSLs that convert — and 7-day turnaround at a flat fee makes testing affordable.`,
    headline: (c) => `VSL Production for ${c.display} Marketers & Course Creators`,
    intro: (c) =>
      `Digital marketers and course creators in ${c.short} running paid traffic know VSLs convert at 2–3x the rate of text-only sales pages — but most don't have a production partner who can move fast. We write the script, produce the video, and deploy in 7 days, flat fee. ${c.short} marketers use us to launch new offers without the agency timeline.`,
    meta: (c) =>
      `VSL production for ${c.short} digital marketers and course creators. Script, produce, deploy in 7 days, flat fee. ${c.display}.`,
  },
];

async function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const options = {
      hostname: "lgxrnpjwaoipqjfhjqkc.supabase.co",
      path,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SERVICE_KEY,
        Authorization: "Bearer " + SERVICE_KEY,
        "Content-Length": Buffer.byteLength(data),
        Prefer: "return=minimal",
      },
    };
    const req = https.request(options, (res) => {
      let b = "";
      res.on("data", (d) => (b += d));
      res.on("end", () => resolve({ status: res.statusCode, body: b }));
    });
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  const rows = [];
  for (const svc of SERVICES) {
    for (const city of CITIES) {
      rows.push({
        service_slug: svc.slug,
        city_slug: city.slug,
        city_headline: svc.headline(city),
        city_intro: svc.intro(city),
        meta_description: svc.meta(city),
      });
    }
  }

  console.log(`Inserting ${rows.length} rows in batches of 50...`);

  // Insert in batches of 50
  const BATCH = 50;
  let inserted = 0;
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const res = await post("/rest/v1/city_pages", batch);
    if (res.status === 201 || res.status === 200) {
      inserted += batch.length;
      process.stdout.write(`\r${inserted}/${rows.length} inserted...`);
    } else {
      console.error(`\nBatch ${i / BATCH + 1} failed: ${res.status} ${res.body.slice(0, 200)}`);
      process.exit(1);
    }
  }
  console.log(`\nDone! ${inserted} rows inserted.`);
}

main().catch(console.error);
