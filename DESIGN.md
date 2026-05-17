# DESIGN.md — Jonathan Peris Portfolio Overhaul

_Last audited: 2026-05-17T00:17:09Z_

## Design intent

The redesign should feel like the same site, only sharper. Preserve the dark technical operator aesthetic, but make every console metaphor earn its place by improving clarity, proof, or conversion.

The current visual language is strong enough to keep:

- dark green-black background,
- subtle grid/noise overlays,
- terminal/YAML/system-status language,
- route-like navigation,
- monospace metadata,
- neon green accent system,
- restrained cards and borders,
- hidden shell/easter egg.

The overhaul should not introduce a generic SaaS/agency visual system. It should turn the existing “small systems manual” direction into a premium, legible, proof-led portfolio.

## Design diagnosis

### Strengths

- Memorable hero: large `Jonathan Peris` wordmark-like heading creates a strong first impression.
- Distinct aesthetic: backend-console mood fits Jonathan’s .NET/Azure/backend architecture positioning.
- Clear availability: `Open to remote roles + consulting` appears immediately.
- Strong technical signals: .NET, Azure, production systems, architecture, delivery discipline.
- Good base interaction model: route nav, resume CTA, LinkedIn CTA, social links, hidden terminal.
- Avoids common portfolio clichés: no stock illustrations, generic gradient hero, or empty “passionate developer” language.

### Weaknesses to address

- Hero copy can be more outcome-specific.
- Current YAML card is attractive but partially redundant.
- `View resume` is visually primary while `contact` is secondary; this may not match consulting goals.
- Stylized labels can obscure meaning for non-engineer visitors.
- Some sections are sparse relative to the page length.
- Card modules risk becoming repetitive if every section has the same rhythm.
- Workbench/repository sections need stronger proof framing.
- Very dim labels and small monospace text may reduce readability.

## Brand attributes

Use these as design filters:

- Senior, not flashy.
- Technical, not cryptic.
- Calm under production pressure.
- Pragmatic architecture over architecture theater.
- Dark, precise, operational, slightly playful.
- Brazilian remote-first engineer comfortable with US teams.
- Reliable systems manual, not startup landing page.

## Visual principles

### 1. Console as structure, not decoration

Use terminal/YAML/repo metaphors only where they help visitors parse content.

Good uses:

- hero operating profile,
- capability maps,
- experience logs,
- case files,
- contact packet,
- hidden shell.

Risky uses:

- decorative fake code with no new information,
- obscure labels without plain-English support,
- too many `status: healthy` cards saying the same thing.

### 2. Proof before atmosphere in lower sections

The hero can carry atmosphere. The rest of the page must carry evidence:

- outcomes,
- domains,
- stacks,
- shipped artifacts,
- project purpose,
- production constraints,
- repository links.

### 3. Hybrid labels

Keep technical labels, but pair them with plain-English intent.

Examples:

```text
TRACE 01 — Profile packet / how I work
TRACE 02 — Capability map / what I help with
TRACE 03 — Experience trace / selected roles
TRACE 04 — Workbench / public proof
TRACE 05 — Contact packet / open channel
```

### 4. Conversion without salesiness

The site can ask for action directly without breaking the aesthetic.

Use:

- `Start conversation`,
- `Contact on LinkedIn`,
- `Email Jonathan`,
- `View resume.pdf`,
- `Open GitHub`.

Avoid over-cute CTAs where clarity matters. `run contact.sh` can be a flourish, but the accessible label should be clear.

## Information architecture

Recommended page order:

1. Hero / operating profile.
2. Profile packet / how Jonathan works.
3. Capability map / what Jonathan helps with.
4. Experience trace / selected roles and domains.
5. Workbench / public proof and case files.
6. Repository tail / curated artifacts.
7. Contact packet / final CTA.
8. Footer / social links / hidden shell clue.

## Hero design specification

### Current hero pattern

Left:

- availability pill,
- huge name,
- role line,
- one-sentence lede,
- resume/contact buttons,
- operating signal strip.

Right:

- YAML deploy ledger card.

This layout should remain, but the copy hierarchy should change.

### Recommended hero wireframe

```text
┌────────────────────────────────────────────────────────────────────┐
│ jp.                                 /profile /trace /workbench CTA │
├────────────────────────────────────────────────────────────────────┤
│ [available: remote roles + select consulting]                      │
│                                                                    │
│ Jonathan Peris                           ┌─ operating-profile.yaml │
│ Backend architecture for                 │ status: available       │
│ production .NET systems.                 │ best_for:               │
│                                          │  - .NET modernization   │
│ I help teams clarify boundaries,         │  - Azure delivery       │
│ ship safer releases, and keep            │  - reliability work     │
│ critical systems operable after launch.  │ signals:                │
│                                          │  - 12+ yrs production   │
│ [Start conversation] [View resume.pdf]   │  - remote BR -> US      │
│                                          └─────────────────────────│
│ [12+ yrs] [.NET/Azure] [Remote] [Architecture + delivery]          │
└────────────────────────────────────────────────────────────────────┘
```

### Hero A/B variants

#### Variant A — Resume-first

Primary button: `View resume`
Secondary button: `Contact on LinkedIn`

Best for recruiter traffic.

#### Variant B — Contact-first

Primary button: `Start conversation`
Secondary button: `View resume.pdf`

Best for consulting and high-intent referrals.

#### Variant C — Split intent

Primary button group:

- `Hiring? View resume`
- `Need architecture help? Contact`

Best when audience is mixed and traffic is not yet segmented.

## Color system

Current tokens already use OKLCH and should remain broadly intact.

### Existing mood

- Background: near-black green.
- Surface: dark green-grey.
- Border: muted green-grey.
- Text: off-white/green-white.
- Accent: neon green.
- Support accents: cyan, purple, amber, rose.

### Adjustments

1. Increase contrast for muted body copy and tiny labels.
2. Reserve brightest green for primary actions and active status.
3. Use support accents by content type, not randomly:
   - green: primary CTA / availability / status,
   - cyan: cloud/platform/delivery,
   - purple: architecture/modeling,
   - amber: experience/timeline,
   - rose: warnings, constraints, incident/reliability notes.

### Suggested semantic roles

```css
--intent-primary: var(--color-green);
--intent-platform: var(--color-cyan);
--intent-architecture: var(--color-purple);
--intent-delivery: var(--color-amber);
--intent-risk: var(--color-rose);
```

## Typography

### Keep

- DM Sans for readable body/display text.
- JetBrains Mono/Fira Code for metadata, tags, route labels, YAML, and shell affordances.

### Improve

- Increase paragraph line-height where text is long.
- Avoid making important content too dim or too small.
- Use monospace as accent, not as the default reading mode.

### Hierarchy target

- H1: extremely large, but responsive with controlled wrapping.
- Section H2: large enough to reset attention after hero.
- Card H3: clear, plain-language titles.
- Metadata: small but contrast-safe.

## Layout rhythm

### Current risk

Some vertical gaps feel atmospheric but can read as unfinished. The page has enough total content, but rhythm should be tightened so each scroll reveals meaningful proof.

### Recommended rhythm

- Hero: spacious, cinematic.
- Profile: medium density, editorial.
- Capability: denser grid; easy to scan.
- Experience: timeline/log rhythm.
- Workbench: larger case-file cards with varied spans.
- Repository tail: compact list/table.
- Contact packet: strong final block.

## Component specifications

### Availability pill

Purpose: immediate status.

Content examples:

```text
available: remote roles + select consulting
operator status: available
remote-first / Brazil -> US teams
```

Design:

- Green dot plus text.
- High enough contrast to read quickly.
- Should not be the only place availability appears.

### Operating profile card

Replace or evolve `deploy-ledger.yaml`.

Recommended content:

```yaml
operator: Jonathan Peris
mode: senior backend / consulting
best_for:
  - production .NET systems
  - Azure delivery discipline
  - architecture recovery
  - reliability after launch
signals:
  - 12+ years production software
  - finance / automotive / education
  - remote Brazil to US teams
```

Design:

- Keep code-block/YAML style.
- Use syntax-style color accents sparingly.
- Add line-height for readability.
- Avoid duplicating hero signals verbatim.

### Signal strip

Current signals are useful. Keep but refine.

Recommended copy:

- `12+ yrs` / `shipping production software`
- `.NET + Azure` / `primary backend lane`
- `Remote` / `Brazil -> US teams`
- `Systems` / `architecture + delivery ownership`

### Section label

Current `TRACE NN` works. Add hybrid naming.

Design:

```text
TRACE 02
Capability map / what I help with
```

Use metadata label plus plain-language subtitle where useful.

### Profile proof strip

Add below profile paragraphs.

Layout:

```text
[boundaries] [tests + CI/CD] [production ownership] [remote teams]
```

or compact rows:

```text
01 define boundaries that reduce operational cost
02 ship with tests and delivery feedback loops
03 document systems so the next engineer can operate them
04 keep architecture pragmatic under production constraints
```

### Capability card

Move from pure skill list to problem-oriented cards.

Card schema:

```text
/path/backend-architecture
title: Architecture recovery
helps_with: unclear ownership, service boundaries, modularization
stack: CQRS, DDD, clean architecture, .NET APIs
```

### Experience trace entry

Recommended schema:

```text
00  Jul 2023 — Present
Software Engineer @ Derivative Path
Domain: financial platforms
Stack: .NET 8, SQL Server, CQRS, Azure DevOps
Impact: backend modules for accounting/fiscal workflows; maintainable delivery in production platform
```

Design:

- Keep timeline/log feel.
- Make company/role clear.
- Add domain chips if possible.
- Avoid long paragraphs without scan anchors.

### Workbench case file

Current project cards should become proof-first cards.

Schema:

```text
CASE 01 / runtime lab
Speedy Bird
signal: cross-platform native UI experiment
proof: Lynx + TypeScript + CI/CD + browser deploy
actions: Source / Live
```

Use `signal`, `proof`, `stack`, and `actions` consistently.

### Repository tail

Design as a compact repo index.

Schema:

```text
repo: blazor-mudblazor-starter
summary: Blazor + MudBlazor starter template
signal: reusable frontend/backend starter
stack: C# / Blazor
links: source / site
```

Consider showing fewer repos with better labels rather than more raw rows.

### Contact packet

Add a strong final CTA before footer.

Wireframe:

```text
/contact_packet.yaml
status: available for remote roles + select consulting
best_fit:
  - backend architecture
  - .NET/Azure modernization
  - delivery/reliability cleanup
channels:
  - LinkedIn
  - email
artifact: resume.pdf

[Start conversation] [View resume] [Open GitHub]
```

## Interaction design

### Navigation

- Keep sticky/nav route styling.
- Add visible contact action or make `resume.pdf` less monopolizing depending on CTA experiment.
- Active section indication would improve orientation on long page.

### Hidden shell

Keep as an easter egg. It reinforces the brand and adds personality.

Requirements:

- Must not block normal keyboard navigation.
- Must have accessible dialog labeling.
- Should respect reduced motion if animated.
- Analytics event `shell_open` can measure whether it is discovered.

### Project links

Project cards should clearly separate:

- Source,
- Live/demo,
- Docs if available.

Use descriptive labels for accessibility, not only “Source” repeated without context.

## Responsive design

Test breakpoints:

- 390px mobile,
- 768px tablet,
- 1024px small laptop,
- 1440px desktop.

### Mobile order

1. Nav/logo/compact CTA.
2. Availability pill.
3. Name.
4. Value proposition.
5. Primary/secondary CTA.
6. Signal strip.
7. Operating profile card.
8. Profile/capability/proof.

### Mobile concerns

- H1 must not cause awkward overflow.
- YAML card should wrap cleanly or become a compact card.
- Nav links may need horizontal scroll, menu, or reduced labels.
- CTA buttons should stack with clear tap targets.
- Cards should not rely on hover-only affordances.

## Accessibility checklist

- Maintain semantic headings in page order.
- Ensure `aria-label`s on icon-only links.
- Ensure focus-visible states on all links/buttons.
- Keep touch targets at least 44px where practical.
- Avoid low-contrast dim metadata for important text.
- Do not rely solely on green to communicate state.
- Honor `prefers-reduced-motion` for reveal and cursor effects.
- Terminal dialog should trap or cycle focus appropriately and close with Escape.
- Repeated “Source” and “Live” links should include context via accessible labels.

## A/B test design details

### Variant implementation approach

Start lightweight:

- Derive variant from query param, e.g. `?variant=contact-first`.
- Store in `localStorage` for repeat consistency.
- Include variant in every `trackEvent` payload.
- Keep default as current or safest variant.

Possible variants:

```ts
const VARIANTS = {
  cta: "resume-first" | "contact-first" | "split-intent",
  heroCopy: "stack" | "production-dotnet" | "legible-traffic",
  card: "bio-ledger" | "best-for" | "case-status",
  labels: "stylized" | "hybrid",
  workbench: "project-grid" | "case-files" | "repo-tree",
};
```

### Experiment cards

#### Experiment A — CTA order

Control:

```text
[View resume] [Contact on LinkedIn]
```

Variant:

```text
[Start conversation] [View resume.pdf]
```

Success metric:

- Contact click rate.
- Resume click rate.
- Total CTA click rate.

#### Experiment B — Hero copy

Control:

```text
Backend architecture / .NET / Azure
```

Variant 1:

```text
Backend architecture for production .NET systems
```

Variant 2:

```text
Backend systems that stay legible under real traffic
```

Success metric:

- First-viewport CTA clicks.
- Bounce rate.
- Scroll to profile/capability sections.

#### Experiment C — Operating card

Control:

```yaml
operator/location/status/focus/runtime
```

Variant:

```yaml
mode/best_for/signals
```

Success metric:

- Hero CTA clicks.
- Scroll depth to Workbench.
- Time on page.

#### Experiment D — Label clarity

Control:

```text
Profile packet
Capability map
Experience trace
Workbench
```

Variant:

```text
Profile packet / how I work
Capability map / what I help with
Experience trace / selected roles
Workbench / public proof
```

Success metric:

- Scroll depth by section.
- Nav click rate.
- Reduced bounce from non-GitHub referrers.

#### Experiment E — Workbench proof framing

Control:

- Current project card grid.

Variant:

- Case-file cards with `signal`, `proof`, and explicit action labels.

Success metric:

- Project source/live click-through.
- Scroll depth past Workbench.
- Contact clicks after Workbench.

#### Experiment F — Final contact packet

Control:

- Footer with social icons only.

Variant:

- Full-width terminal/YAML contact card above footer.

Success metric:

- Footer/contact click-through.
- Resume clicks after scroll >75%.

## Content examples

### Hero copy candidates

```text
Backend architecture for production .NET systems.
```

```text
I help teams clarify boundaries, ship safer releases, and keep critical systems operable after launch.
```

```text
.NET / Azure systems that stay legible under real traffic.
```

### Capability cards

```text
Architecture recovery
For teams with unclear service ownership, tangled domains, or fragile modernization paths.
```

```text
Delivery discipline
CI/CD, tests, release loops, and documentation that keep architecture honest after launch.
```

```text
Production backend systems
C#, .NET, SQL Server, PostgreSQL, Azure, Docker, and APIs designed for ownership.
```

```text
Remote technical leadership
Brazil-to-US collaboration, async clarity, and engineering decisions written down.
```

### Final CTA

```text
If your backend needs clearer boundaries, safer delivery, or calmer production ownership:
[Start conversation] [View resume.pdf]
```

## QA checklist for implementation

Before merging an overhaul:

- Run typecheck/build with Bun in this repo.
- Inspect desktop, tablet, and mobile in browser.
- Verify no horizontal overflow at 390px.
- Verify resume route and external social/project links.
- Verify analytics events still fire and include variant labels.
- Verify hidden shell still opens/closes and returns focus.
- Verify reduced motion behavior.
- Confirm Lighthouse/accessibility issues are not introduced.

## Design success criteria

The redesign succeeds if:

- The site still feels unmistakably like a dark systems-console portfolio.
- A recruiter can understand Jonathan’s role and download the resume quickly.
- A consulting lead can understand what backend problems Jonathan helps solve.
- Workbench cards communicate proof, not only project names.
- The page ends with an intentional contact path.
- A/B variants can be tested without duplicating the whole page.
