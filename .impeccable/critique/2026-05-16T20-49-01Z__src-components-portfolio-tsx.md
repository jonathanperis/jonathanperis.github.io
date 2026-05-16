---
target: src/components/Portfolio.tsx
total_score: 28
p0_count: 1
p1_count: 3
timestamp: 2026-05-16T20-49-01Z
slug: src-components-portfolio-tsx
---
# Impeccable critique, jonathanperis.github.io portfolio

## Design health score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 3 | Scroll progress and availability badge work, but hiring status is ambiguous. |
| 2 | Match system and real world | 3 | Developer metaphors fit, but faux-code can be slower for non-technical recruiters. |
| 3 | User control and freedom | 3 | Sticky nav and resume access help, but no explicit contact path. |
| 4 | Consistency and standards | 4 | Strong consistency across cards, tags, labels, colors, and spacing. |
| 5 | Error prevention | 2 | Nested clickable span inside card creates keyboard and interaction risk. |
| 6 | Recognition rather than recall | 3 | Main sections are clear, terminal easter egg requires hidden recall. |
| 7 | Flexibility and efficiency | 3 | Anchors and resume CTA help, but proof and contact are not fast enough. |
| 8 | Aesthetic and minimalist design | 3 | Polished and restrained, but redundant code card, dense prose, and tag repetition reduce clarity. |
| 9 | Error recovery | 2 | Low error surface, but terminal/modal and external links need better states. |
| 10 | Help and documentation | 2 | Resume exists, but intent and opportunity type need clearer guidance. |
| **Total** | | **28/40** | **Solid base, needs sharper proof, conversion, accessibility, and differentiation.** |

## Anti-pattern verdict

**AI slop risk: Medium.** The site is not sloppy, but it uses a familiar developer-portfolio recipe: dark terminal palette, typing role, `const developer = {}` card, availability pill, bento project cards, tag clouds, and terminal easter egg. Execution is tasteful. Differentiation is the problem.

**Deterministic scan:** `npx impeccable detect --json src/components/Portfolio.tsx src/pages/index.astro` returned `[]`, exit 0.

**Manual false negatives from detector:** missing semantic section headings, clickable non-interactive span, terminal modal missing dialog semantics and focus trap, no reduced-motion handling, inconsistent focus-visible treatment, fragile footer icon accessible names, mobile nav risks, hydration cost, no-JS reveal failure mode.

**Visual overlay:** `npx impeccable live --port=7777` exited with `Warning: cannot access live`, so browser overlay injection was not available in this environment.

## Overall impression

The current site already has a coherent, elegant dark developer aesthetic. It says “competent software engineer” quickly. It does not yet say “senior fintech systems builder with specific proof and a clear next action” quickly enough.

The overhaul should preserve the same atmosphere: dark graphite, green terminal accent, mono labels, subtle glow/noise, code/editor references, sticky nav, and the hidden terminal. The redesign should shift emphasis from generic developer signals to Jonathan-specific credibility.

## What's working

1. **Hero hierarchy is strong.** The large serif name, green role line, and short summary create an immediate identity.
2. **The visual system is coherent.** Dark surface, green accent, muted text, tags, and editor metaphors feel unified.
3. **The page has personality.** The terminal easter egg, code block, and developer microcopy give it a memorable baseline without becoming chaotic.

## Priority issues

### [P0] Availability positioning is ambiguous
- **What:** “Available for hire” appears alongside “currently building at Derivative Path.”
- **Why it matters:** Recruiters, clients, and peers may not know if this means full-time roles, freelance, consulting, or future opportunities.
- **Fix:** Replace with a more specific status, for example “Open to remote .NET / fintech opportunities,” “Available for consulting,” or “Open to select backend architecture work.”
- **Suggested command:** `impeccable clarify`

### [P1] Proof is buried under descriptions and technologies
- **What:** The site lists stacks, duties, and projects, but does not surface outcomes, constraints, scale, or business impact near the top.
- **Why it matters:** Hiring decisions need evidence fast. “12+ years,” “fintech,” and “cloud” are credible, but they need proof moments.
- **Fix:** Add a proof strip and make experience/project cards impact-first.
- **Suggested command:** `impeccable layout`, then `impeccable clarify`

### [P1] The aesthetic is cohesive but too category-obvious
- **What:** Dark terminal, typing animation, code identity object, green accent, and bento cards are common for developer portfolios.
- **Why it matters:** The page looks polished, but it risks blending into every other AI-assisted dev portfolio.
- **Fix:** Keep the aesthetic but make the metaphors more specific: `ledger.log`, `architecture.trace`, `release.pipeline`, `career.git`, or `systems.report` instead of generic `developer.ts`.
- **Suggested command:** `impeccable delight`

### [P1] Conversion path is passive
- **What:** Resume is visible in nav, but the hero has no explicit primary action beyond social icons.
- **Why it matters:** Visitors need a clear next step based on intent: hire, validate experience, inspect projects, or contact.
- **Fix:** Use a clear hierarchy: primary resume, secondary LinkedIn/contact, tertiary GitHub/projects.
- **Suggested command:** `impeccable layout`

### [P2] Accessibility and interaction debt
- **What:** Section labels are not headings, footer icons rely on `title`, nested clickable span is not keyboard accessible, modal lacks dialog semantics, no reduced-motion handling, and focus styles are inconsistent.
- **Why it matters:** The site may look good while failing keyboard and assistive-tech users.
- **Fix:** Add semantic headings, repair interactive elements, add `prefers-reduced-motion`, focus-visible styles, modal semantics, and decorative SVG hiding.
- **Suggested command:** `impeccable harden`

### [P2] Content density is not curated enough
- **What:** About, Experience, Featured Projects, and More Projects rely on paragraphs and tags. The user must read too much to find the strongest signal.
- **Why it matters:** Recruiters skim. Senior engineers evaluate signal quality. Both need faster scanning.
- **Fix:** Convert sections into scannable proof modules with strong labels and compact impact statements.
- **Suggested command:** `impeccable distill`

## Persona red flags

### Technical recruiter, 45-second scan
- Sees name, stack, resume, and availability quickly.
- Red flag: “Available for hire” conflicts with current employment.
- Red flag: contact path is implicit, not direct.
- Red flag: impact is buried in long experience paragraphs.

### Engineering manager, credibility review
- Sees relevant domains, .NET, fintech, cloud, CQRS, DDD, microservices.
- Red flag: little visible outcome evidence or scale.
- Red flag: projects mix professional credibility and experiments without category framing.
- Red flag: code block repeats identity instead of proving judgment.

### Keyboard or assistive-tech user
- Red flag: section labels are not semantic headings.
- Red flag: nested `span` action inside project card is not keyboard accessible.
- Red flag: terminal overlay lacks dialog semantics and focus trap.
- Red flag: focus states and reduced-motion behavior need hardening.

## Same-aesthetic overhaul direction

### North star
Make the site feel like a polished terminal-native portfolio for a senior fintech systems engineer. Not louder, more specific.

### Preserve
- Near-black graphite background.
- Green terminal accent.
- Mono labels and code/editor references.
- Large serif name as the brand moment.
- Subtle noise, grid, and glow.
- Sticky compact nav.
- Terminal easter egg, but with proper accessibility.

### Change
- Replace generic developer tropes with career-specific artifacts.
- Add proof earlier.
- Make CTA intent explicit.
- Turn paragraphs into scannable evidence.
- Reduce repeated tag noise.
- Harden accessibility and motion.

## Proposed IA after overhaul

1. **Hero:** name, sharper role, exact opportunity status, two CTAs, proof chips.
2. **Proof console:** compact module with years, domain, current platform work, core stack, remote context.
3. **About:** one short narrative plus engineering principles.
4. **Stack:** structured capability matrix, not tag dump.
5. **Experience:** impact-first timeline with current role expanded and older roles compressed.
6. **Featured work:** categorized project proof, architecture/backend, performance/load, experiments/games.
7. **More projects:** collapsible or lower-emphasis GitHub feed.
8. **Footer:** clear contact, resume, GitHub, LinkedIn.

## A/B testing plan

### Test 1, hero positioning
- **A:** current minimal hero.
- **B:** same hero plus three proof chips: `12+ yrs`, `Fintech systems`, `.NET + Azure`.
- **Metric:** resume clicks, LinkedIn clicks, scroll depth past hero.
- **Recommendation:** Start with B.

### Test 2, availability copy
- **A:** “Available for hire.”
- **B:** “Open to remote .NET / fintech opportunities.”
- **C:** “Available for consulting and select backend architecture work.”
- **D:** “Open to remote roles and select backend architecture consulting.”
- **Metric:** LinkedIn/contact clicks, resume clicks.
- **Recommendation:** Use D for the selected hybrid positioning. It keeps full-time and consulting options open without over-indexing on fintech.

### Selected positioning
Hybrid: open to both full-time remote opportunities and selective backend architecture consulting. The design should keep the hiring signal flexible, but avoid vague copy like “Available for hire” and avoid mentioning fintech roles in the availability line.

### Test 3, code card purpose
- **A:** current `developer.ts` identity object.
- **B:** `impact.log`, command-output proof with domains, constraints, and outcomes.
- **Metric:** scroll to experience, time on page, resume clicks after hero.
- **Recommendation:** Use B. It keeps the aesthetic and adds evidence.

### Test 4, CTA hierarchy
- **A:** nav-only `resume` plus social icons.
- **B:** hero buttons: `View resume` and `Contact on LinkedIn`, social icons secondary.
- **Metric:** CTA click-through rate.
- **Recommendation:** Use B.

### Test 5, project order
- **A:** current order, Speedy Bird first.
- **B:** professional architecture/backend credibility first, experiments after.
- **Metric:** project click distribution, GitHub click-through, scroll depth.
- **Recommendation:** Use B if hiring credibility is the goal.

### Test 6, experience format
- **A:** current paragraph timeline.
- **B:** role cards with one-line scope plus two impact bullets.
- **Metric:** scroll depth through experience, resume clicks after experience.
- **Recommendation:** Use B.

### Test 7, section rhythm
- **A:** current generous spacing and labels.
- **B:** numbered sections with tighter label-to-content spacing and a subtle connector system.
- **Metric:** bounce rate, scroll depth to projects.
- **Recommendation:** Use B.

## Implementation phases

### Phase 1, clarify and convert
- Clarify availability and opportunity type.
- Add hero-level CTA hierarchy.
- Add proof chips.
- Replace generic hero summary with a sharper version.

### Phase 2, reshape content
- Convert About into a concise positioning brief.
- Convert Stack into a capability matrix.
- Convert Experience into impact snapshots.
- Categorize Featured Projects.

### Phase 3, visual refinement
- Replace `developer.ts` with a proof-oriented artifact.
- Add numbered sections and stronger rhythm.
- Add active nav state.
- Tune contrast and typography for small labels.

### Phase 4, harden
- Add semantic headings.
- Fix nested clickable span.
- Add dialog semantics and focus trap to terminal.
- Add reduced-motion CSS.
- Add focus-visible styling.
- Hide decorative SVGs from the accessibility tree.
- Review mobile nav at 320 to 430px.

## Verification notes

- Synced `main` with `origin/main` before evaluation.
- Build passed with mise Node 24 using `bun run build`.
- Plain environment Node 20 fails Astro version support, use mise Node 24.
- `bun run lint` currently prompts to install `@astrojs/check`, so lint status is not established.
- Impeccable context files are missing, no `PRODUCT.md` or `DESIGN.md` found. Run `impeccable teach` and `impeccable document` later for stronger brand-specific guidance.
