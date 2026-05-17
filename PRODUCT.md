# PRODUCT.md — Jonathan Peris Portfolio

_Last audited: 2026-05-17T00:17:09Z_

## Product summary

Jonathan Peris Portfolio is a personal technical website for a senior backend/.NET/Azure engineer. It should make Jonathan easy to evaluate for remote senior engineering roles, backend architecture consulting, and technical leadership work while preserving the current dark systems-console aesthetic.

The site is not a generic resume page. It is a compact “systems manual” for Jonathan’s operating style: reliability before theater, boundaries with a reason, and delivery as part of architecture.

## Current product state

The current homepage already has a strong identity:

- Dark green-black operator console mood.
- Route-like navigation: `/profile`, `/trace`, `/workbench`.
- Large identity-first hero with `Jonathan Peris` as the anchor.
- Availability signal: “Open to remote roles + consulting.”
- Clear stack signal: backend architecture / .NET / Azure.
- YAML/status-card metaphor: `deploy-ledger.yaml` and `healthy`.
- Hidden terminal/easter egg that reinforces the developer persona.
- Profile, capability, experience, featured work, repository tail, and footer/social sections.

The next product move is an overhaul that keeps this aesthetic but makes it more purposeful, proof-led, and conversion-oriented.

## Primary audiences

### 1. Senior engineering recruiters and hiring managers

They need to answer quickly:

- What role is Jonathan best suited for?
- Is he senior enough for architecture and ownership?
- What stack does he operate in?
- Has he worked with production systems and distributed teams?
- Where is the resume/contact path?

### 2. Technical leaders and founders evaluating consulting help

They need to answer:

- What kinds of backend problems can Jonathan help with?
- Is this mostly coding, architecture, delivery, or team enablement?
- Does he understand reliability, operations, and maintainability?
- Can he work remotely across Brazil/US team contexts?
- How do we start a conversation?

### 3. Engineers and technical peers

They need to answer:

- Is the craft credible?
- Are the public repos and projects interesting?
- Does the site feel technically intentional or decorative?
- Can they inspect code, docs, and experiments?

## Product goals

1. Increase clarity in the first viewport without flattening the personality.
2. Make contact and resume actions obvious throughout the page.
3. Turn the console aesthetic from decoration into information architecture.
4. Show proof of production-oriented backend work through case-file language, repository artifacts, and anonymized outcomes.
5. Improve scanning for recruiters while keeping enough technical depth for engineers.
6. Preserve the current dark systems/manual aesthetic.
7. Provide A/B testing hooks for message, CTA, and layout experiments.

## Non-goals

- Do not replace the site with a bright corporate SaaS template.
- Do not add stock illustrations, generic headshot-first hero patterns, or generic “passionate developer” copy.
- Do not make the interface so terminal-like that non-engineering visitors cannot understand it.
- Do not overfit for a single public project; the site should represent Jonathan’s overall career and operating style.
- Do not remove the hidden shell/easter egg unless analytics or usability testing shows it causes confusion.

## Positioning

### Current positioning

> Backend architecture / .NET / Azure

> I build backend systems that can be understood, operated, and changed after they meet production traffic.

This is strong and on-brand. It should be tightened into a more outcome-forward promise.

### Recommended positioning variants for testing

#### Variant A — recruiter/senior-role focused

> Senior .NET engineer for production backend systems.

Subcopy:

> 12+ years building financial, automotive, education, healthcare, retail, and infrastructure software with clean boundaries, tests, and delivery discipline.

#### Variant B — consulting/problem focused

> Backend architecture for teams that need calmer production systems.

Subcopy:

> I help .NET/Azure teams clarify service boundaries, improve delivery paths, and keep critical systems operable after launch.

#### Variant C — current aesthetic refined

> Backend systems that stay legible under real traffic.

Subcopy:

> .NET, Azure, SQL, CQRS, DDD, CI/CD, and production ownership — applied with enough pragmatism to survive the next incident.

## Core user journeys

### Journey 1 — Recruiter evaluation

1. Land on homepage.
2. Understand identity, role, availability, stack, location, and remote status in under 10 seconds.
3. Click `resume.pdf` or `View resume`.
4. Optionally inspect experience trace and featured work.
5. Contact on LinkedIn/email.

Success metrics:

- Resume click-through rate.
- LinkedIn click-through rate.
- Scroll depth to `Experience trace`.
- Time to first CTA click.

### Journey 2 — Consulting lead

1. Land on homepage.
2. Understand backend problems Jonathan solves.
3. Read capability map and workbench case files.
4. See proof of reliability/delivery/architecture mindset.
5. Click contact CTA.

Success metrics:

- Contact click-through rate.
- Scroll depth to `Workbench`.
- Clicks on case-file/project cards.
- Return visits from same referrer.

### Journey 3 — Engineer peer inspection

1. Land on homepage.
2. Explore Workbench/public repos.
3. Inspect GitHub/source/live links.
4. Discover hidden shell or deeper technical details.

Success metrics:

- Source link clicks.
- Live project clicks.
- Repository tail clicks.
- Hidden shell activation, if measurable.

## Product audit findings

### What works

- Strong, coherent identity: dark terminal/manual aesthetic matches backend architecture positioning.
- Large hero is memorable and not generic.
- Availability, stack, years of experience, remote status, and operating style are visible.
- CTA buttons are clear in the hero.
- The copy avoids many portfolio clichés.
- Route-style IA and YAML card are distinctive and technically aligned.

### Friction points

- The first viewport leads with name and mood before a sharper outcome promise.
- The YAML card repeats bio/status data instead of communicating stronger value or service fit.
- `View resume` is primary, but consulting/contact intent is secondary.
- Section labels such as `Profile packet`, `Trace`, and `Workbench` are stylish but may need plain-English reinforcement.
- Workbench and repository areas should become stronger proof sections, not just project/repo lists.
- Small muted text and dense monospace areas may be low contrast for some users.
- Repeated dark cards can flatten the page if every section uses the same module style.

## Overhaul strategy

Keep the current aesthetic; increase the product clarity.

### 1. Hero: sharpen the promise

The hero should answer:

- Who is this?
- What does he specialize in?
- What problem does he solve?
- What action should I take?

Recommended hero content architecture:

```text
[availability/status pill]
Jonathan Peris
Backend architecture for production .NET systems.
I help teams clarify boundaries, ship safer releases, and keep critical systems operable after launch.
[Start conversation] [View resume.pdf]
[12+ yrs] [.NET/Azure] [Remote BR→US] [Architecture + delivery]
```

### 2. YAML/status card: make it strategic

Replace repeated bio content with a stronger operating profile:

```yaml
operator: Jonathan Peris
mode: senior backend / consulting
best_for:
  - .NET systems with unclear boundaries
  - Azure delivery pipelines that need discipline
  - teams modernizing production services
  - reliability work after the first incident
signals:
  - 12+ years production software
  - finance / automotive / education / healthcare
  - remote Brazil to US teams
```

### 3. Navigation: keep routes, add clarity

Current:

```text
/profile /trace /workbench resume.pdf
```

Recommended test:

```text
/profile /capabilities /trace /workbench contact
```

or keep the current labels but add plain-language titles inside sections:

```text
TRACE 01 — Profile packet / how I work
TRACE 02 — Capability map / what I help with
TRACE 03 — Experience trace / selected roles
TRACE 04 — Workbench / public proof
TRACE 05 — Contact packet / open channel
```

### 4. Profile: narrative plus scan layer

Keep the two paragraphs, then add a compact proof strip:

- Defines service boundaries and ownership models.
- Ships production software with tests and CI/CD feedback loops.
- Works across finance, automotive, education, healthcare, retail, insurance, and infrastructure.
- Remote-first with Brazil-to-US team experience.

### 5. Capability map: make it buyer-friendly

Reframe from pure skill taxonomy into “problems I help solve”:

- Architecture recovery: service boundaries, modularization, CQRS/DDD where useful.
- Backend delivery: .NET APIs, SQL-backed systems, tests, release discipline.
- Cloud operations: Azure, CI/CD, Docker/Kubernetes, observability paths.
- Team enablement: documentation, ownership, handoff clarity, pragmatic standards.

### 6. Experience trace: add impact shape

Each role should show:

- Role/company/domain.
- Stack.
- Responsibility/impact.
- Production context.

Use concise log/case language, not only resume paragraphs.

### 7. Workbench: convert projects into proof

Use a case-file card structure:

```text
CASE 01 / runtime lab
Speedy Bird
signal: cross-platform native UI experiment
proof: Lynx + TypeScript + CI/CD + browser deploy
actions: Source / Live
```

For public technical repos, emphasize what each proves about Jonathan:

- architecture discipline,
- performance engineering,
- cross-platform experimentation,
- documentation quality,
- release automation.

### 8. Repository tail: curate, do not dump

The repository tail should feel intentional. Prefer a curated “latest artifacts” or “lab index” over an unweighted list.

Add filtering or grouping later if needed:

- architecture samples,
- performance labs,
- game/runtime experiments,
- docs/reference builds.

### 9. Footer: final conversion card

End with a clear final action:

```yaml
contact_packet:
  status: available for remote roles + select consulting
  best_channel: LinkedIn / email
  artifact: resume.pdf
```

Buttons:

- Start conversation
- View resume
- Open GitHub

## A/B testing plan

Use lightweight URL/query variants or configuration flags first. Avoid shipping a heavy experimentation platform unless traffic volume warrants it.

### Experiment 1 — CTA priority

- A: Primary `View resume`; secondary `Contact on LinkedIn`.
- B: Primary `Start conversation`; secondary `View resume.pdf`.

Hypothesis: B improves consulting/contact clicks; A may perform better for recruiter traffic.

Measure:

- `cta_click` by label.
- LinkedIn/email clicks.
- Resume clicks.
- Scroll depth.

### Experiment 2 — Hero value proposition

- A: `Backend architecture / .NET / Azure`.
- B: `Backend architecture for production .NET systems`.
- C: `Backend systems that stay legible under real traffic`.

Hypothesis: B improves recruiter comprehension; C preserves stronger brand personality.

Measure:

- CTA click rate from first viewport.
- Bounce rate.
- Time on page.

### Experiment 3 — YAML card content

- A: Current deploy ledger bio/status card.
- B: Strategic `best_for`/`signals` card.
- C: Mini case-file/status report card.

Hypothesis: B improves perceived relevance for consulting leads without changing the visual aesthetic.

### Experiment 4 — Section labels

- A: Current stylized labels only: `Profile packet`, `Capability map`, `Experience trace`.
- B: Hybrid labels: `Profile packet / how I work`, `Capability map / what I help with`.

Hypothesis: B improves comprehension for non-engineer visitors while retaining the console aesthetic.

### Experiment 5 — Workbench framing

- A: Current project cards.
- B: Case-file cards with `signal`, `proof`, and `actions`.
- C: Repository-tree interface with expandable cards.

Hypothesis: B increases proof comprehension; C may increase technical visitor exploration.

### Experiment 6 — Proof density

- A: Current narrative density.
- B: Add proof chips and anonymized outcomes.

Hypothesis: B improves trust and scroll depth, especially for hiring managers.

### Experiment 7 — Final CTA block

- A: Current small footer/social links.
- B: Full-width `contact_packet` terminal card before footer.

Hypothesis: B increases contact clicks from users who scroll past Workbench.

## Analytics events to keep/add

Existing `trackEvent` usage should be extended consistently.

Recommended events:

```text
cta_click { label, location, variant }
nav_click { label, variant }
project_click { slug, action, variant }
repo_click { name, variant }
contact_click { channel, location, variant }
resume_click { location, variant }
shell_open { method, variant }
scroll_depth { bucket, variant }
```

## Implementation roadmap

### Phase 1 — Documentation and measurement

- Update `PRODUCT.md` and `DESIGN.md` with this audit and design plan.
- Ensure current analytics labels distinguish hero/nav/footer CTA locations.
- Keep current visual implementation untouched except documentation.

### Phase 2 — Same-aesthetic hero overhaul

- Test contact-first vs resume-first CTA order.
- Replace YAML card content with `best_for`/`signals` content.
- Add a `/contact` or equivalent route/action in nav.

### Phase 3 — Proof-led middle and lower page

- Add profile proof strip.
- Reframe capability map as problems Jonathan helps solve.
- Convert workbench cards to case-file cards.
- Add final `contact_packet` CTA.

### Phase 4 — A/B test infrastructure

- Add query/local variant support, e.g. `?v=contact-first`.
- Persist variant per visitor with localStorage if needed.
- Include variant in analytics events.

### Phase 5 — Polish and accessibility

- Improve text contrast for dim labels.
- Validate focus states and hit targets.
- Test 390px, 768px, 1024px, and desktop widths.
- Respect `prefers-reduced-motion` for reveal/typing effects.

## Definition of done for the overhaul

- First viewport communicates role, audience, value, and action in under 10 seconds.
- Contact and resume CTAs are visible in hero and near page end.
- Workbench reads as proof, not just decoration.
- Repository tail is curated and understandable.
- The page still feels like Jonathan’s dark systems manual.
- Accessibility checks pass for contrast, keyboard focus, labels, and reduced motion.
- A/B variants are documented and measurable.
