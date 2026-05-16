# PRODUCT.md

## Product

`jonathanperis.github.io` is Jonathan Peris's public developer portfolio and proof-of-work hub. It should help hiring managers, technical interviewers, engineering leaders, collaborators, and consulting prospects understand who Jonathan is, what he is strong at, and why he is credible for backend/system architecture work.

The site is not a generic resume template. It is a compact technical artifact that should feel like it belongs to an engineer who builds production systems, cares about delivery, and can still make the interface memorable.

## Primary Outcomes

1. **Convert qualified visitors into conversations.** Make it easy for the right person to contact Jonathan for remote roles, backend/platform engineering work, or selected architecture consulting.
2. **Communicate seniority quickly.** Within the first screen, make clear: 12+ years, .NET/Azure/fintech depth, remote collaboration, and production ownership.
3. **Show proof, not just claims.** Use work history, featured repositories, live project links, and concise engineering principles to demonstrate taste and execution.
4. **Keep the portfolio maintainable.** The content model, components, and design tokens should be simple enough for future agents and humans to update safely.

## Audience

### Hiring managers and recruiters

They need a fast answer to: "Is this person relevant for a senior software engineering role?" The page should foreground current role, availability, location/remote context, contact links, resume, and technology fit.

### Engineering leaders and staff/principal engineers

They need evidence of judgment. The site should emphasize systems thinking, reliability, boundaries, delivery discipline, and concrete project/work examples instead of buzzword density.

### Technical interviewers

They need scannable signals: stack, past domains, architecture vocabulary, repository links, and enough implementation detail to start a deeper technical conversation.

### Consulting prospects and collaborators

They need to know where Jonathan can help: backend architecture, .NET modernization, fintech/business systems, cloud delivery, and pragmatic implementation.

## Positioning

Jonathan is a production-focused software engineer with 12+ years of experience, centered on .NET, fintech/business systems, cloud delivery, and clean architecture. The strongest positioning is:

> Senior backend/platform engineer for teams that need durable business systems, clear architecture boundaries, and reliable delivery.

Supporting signals:

- Current software engineering work at Derivative Path on financial modules: General Ledger, Hedge Accounting, Fiscal Calendar, and DerivativeEDGE.
- Deep .NET ecosystem experience: .NET Core+, ASP.NET Core, Entity Framework, MAUI, Blazor.
- Architecture vocabulary backed by years of delivery: CQRS, DDD, microservices, hexagonal architecture, clean architecture, SAGA pattern.
- DevOps/cloud literacy: Azure, Azure DevOps, Docker, Kubernetes, CI/CD.
- Curiosity beyond the main lane: Rust, Go, Python, TypeScript, WebAssembly, game/dev experiments, and performance-oriented repositories.

## Brand Personality

- **Competent, not loud.** Confident language, restrained claims, proof-first framing.
- **Systems-minded.** The interface may borrow from terminals, runbooks, traces, manifests, and deployment ledgers.
- **Human but concise.** Keep small personal touches and easter eggs, but do not let them obscure professional clarity.
- **Pragmatic.** Architecture is framed as a way to reduce operational cost, not as decoration.
- **Remote-ready.** Brazil-based, US-team-friendly, async-capable, comfortable with distributed engineering work.

## Content Principles

1. **Lead with the current value proposition.** The hero should quickly communicate role, experience, availability, location/remote fit, and contact path.
2. **Every section earns its space.** Avoid filler sections; each block should answer a likely visitor question.
3. **Prefer specific nouns.** Use concrete domains, modules, stacks, and project names over generic adjectives.
4. **Separate signals from proof.** A short signal chip can say ".NET + Azure"; a nearby section should explain where that shows up in work.
5. **Keep availability current.** The current stance is: open to remote roles and selected backend architecture consulting.
6. **Keep generated repository data subordinate.** Dynamic GitHub projects are useful proof, but the curated workbench/featured list should set the narrative.

## Required User Journeys

### Recruiter fast path

1. Land on homepage.
2. See availability, role, experience, and remote/location context immediately.
3. Click LinkedIn, email/contact, or resume without scrolling deeply.

### Engineering evaluator path

1. Read hero and profile packet.
2. Scan capability map and engineering principles.
3. Inspect experience trace and featured projects.
4. Open GitHub/live project links.

### Curious developer path

1. Notice the console/runbook aesthetic.
2. Open the interactive shell or find the easter egg.
3. Explore repositories and social links.

## Functional Requirements

- Static Astro site deployable to GitHub Pages.
- React-powered interactive portfolio component.
- Build-time GitHub project fetching where configured, with safe fallbacks.
- Resume route and/or resume CTA available from primary navigation.
- Contact/social links available in hero/footer and keyboard/screen-reader accessible.
- Hidden shell/easter egg preserved as progressive enhancement; core content must remain useful without it.
- Analytics events may track outbound/social/resume interactions, but must not block navigation.

## Non-Goals

- Do not become a blog platform unless there is an explicit content strategy.
- Do not over-index on animation at the expense of readability or performance.
- Do not present Jonathan as a full-service agency or generic freelancer marketplace profile.
- Do not hide the resume/contact path behind clever terminal interactions.
- Do not let the site look like a cryptocurrency, cyberpunk, gaming, or hacker-roleplay landing page.

## Product Quality Bar

- **Clarity:** A first-time visitor should understand Jonathan's profile in under 10 seconds.
- **Credibility:** Claims should map to work history, project links, or explicit engineering principles.
- **Accessibility:** Text contrast, focus states, semantic structure, and reduced-motion friendliness matter.
- **Performance:** Static output should remain lightweight; decorative effects should be CSS-first.
- **Maintainability:** Data that changes often belongs in `src/lib/data.ts`; global visual decisions belong in `DESIGN.md` and CSS tokens.
- **Trust:** External links should be accurate, current, and safe (`rel="noreferrer noopener"`).

## Success Signals

- More qualified inbound contact via LinkedIn/email/Workana/GitHub.
- Recruiters can quickly identify Jonathan as a senior .NET/backend engineer.
- Technical reviewers can cite specific projects, architecture choices, and domains.
- Future redesigns remain consistent because `PRODUCT.md` defines product intent and `DESIGN.md` defines visual rules.
