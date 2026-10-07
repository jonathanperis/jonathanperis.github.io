# PRODUCT.md — Jonathan Peris Portfolio

_Implementation status reviewed: 2026-10-07 (source/configuration review of the Career Metro Map redesign). The May 2026 overhaul proposals written for the previous dark terminal UI are superseded; see [Superseded proposals](#superseded-proposals)._

[Documentation index](wiki/index.md) · [Architecture](wiki/architecture.md) · [Design direction](DESIGN.md)

## Implementation status

This document combines the current product baseline with the proposals that still apply. The status table is the implementation reference; sections marked _proposal_ describe future work rather than shipped functionality.

| Area | Current implementation | Remaining proposal or validation |
|---|---|---|
| Header and status | Station-sign header (name, title, subtitle, line roundels 1–5 that act as map-filter labels, nav: Stations, Connections, Lines, Information, Resume); "Good service" status strip with availability, location, and live Itanhaém clock | Contact entry in the header nav (Information is reachable; no direct contact CTA) |
| Career map | Build-time SVG map: Career line through nine stations (ten roles), .NET, Azure, and Architecture lines, Side Projects line of pinned repos; CSS-only line filter; "You are here" terminus | Browser validation of legibility and hit targets at small widths |
| Experience | Station Index: roles newest first with periods, locations, descriptions, served lines, and tags; education as "Depot" | Owner-approved impact statements; PDF reconciliation is deferred |
| Projects | Connections departures board of GitHub profile pins (up to six, pin order) with Source/Live site/Homepage links and stars; "Later departures" `<details>` ledger | Authored proof per project (`signal`/`proof`); contextual accessible names for repeated links |
| Skills | Line Guide: six skill lines with computed interchanges | Problem-oriented capability framing |
| Principles | Service Notes: three engineering principles as advisories | Outcome-specific proof |
| Contact | Customer Information: availability, location, email, six social rows with handles, resume and PDF links | Contextual contact measurement |
| Analytics | `cta_click` (`nav_resume`, `info_resume`, `info_pdf`, `info_email`, `resume_print`), `social_click`, `project_click`, declared with `data-track-event`/`data-track-label` | Variant parameters, query selection, persistence, shell/scroll events |
| Accessibility foundations | Semantic sections with labeled headings, focus-visible outlines, labeled native `<dialog>` terminal, labeled map stops, ink numerals on light line colors, content and filter work without JavaScript, CSS reduced-motion rules | Browser validation of contrast, focus, hit targets, screen-reader output, and print |

Operational details belong in the [wiki guides](wiki/index.md). These notes do not establish that A/B tests or a browser accessibility audit have been completed.

## Product summary

Jonathan Peris Portfolio is a personal technical website for a senior backend/.NET/Azure engineer. It should make Jonathan easy to evaluate for remote senior engineering roles, backend architecture consulting, and technical leadership work.

The site presents the career as a transit system: roles are stations on a Career line, recurring skills are colored lines that join along the way, pinned repositories are a Side Projects line and a departures board, and principles are service notes. The metaphor organizes real data rather than decorating it, and plain labels (Stations, Connections, Lines, Information, Resume) keep it readable for non-engineers.

## Current product state

Page order on `/`:

1. Station-sign header and service-status strip.
2. Career system map with title block, lede, and line-filter legend.
3. Station Index (experience).
4. Connections (pinned repositories) and Later departures (other public repositories).
5. Line Guide (skills by line).
6. Service Notes (engineering principles).
7. Customer Information (contact, resume, PDF).
8. Footer with the Konami hint; hidden "Control room" terminal.

`/resume/` is a separate print-optimized page in the same light paper/ink style.

## Primary audiences

### 1. Senior engineering recruiters and hiring managers

They need to answer quickly: what role Jonathan fits, whether he is senior enough for architecture and ownership, which stack he operates in, whether he has production and distributed-team experience, and where the resume/contact path is.

### 2. Technical leaders and founders evaluating consulting help

They need to answer: what backend problems Jonathan helps with, whether the work is coding, architecture, delivery, or team enablement, whether he understands reliability and maintainability, whether he can work remotely across Brazil/US contexts, and how to start a conversation.

### 3. Engineers and technical peers

They need to answer: whether the craft is credible, whether the public repos are interesting, whether the site feels intentional, and whether they can inspect code, docs, and experiments.

## Product goals

1. Communicate role, stack, availability, and location in the first viewport.
2. Keep resume and contact actions reachable from the top and the end of the page.
3. Make the metro metaphor carry information: lines, stations, and interchanges reflect actual roles and skills.
4. Show proof of production-oriented backend work through experience, repository artifacts, and principles.
5. Support fast scanning for recruiters while keeping technical depth for engineers.
6. Keep the page static, light on JavaScript, and usable without it.

## Non-goals

- Do not replace the site with a generic corporate SaaS template.
- Do not add stock illustrations, headshot-first hero patterns, or generic "passionate developer" copy.
- Do not let the transit metaphor hide plain facts; dates, roles, and links must stay readable as text.
- Do not overfit for a single public project; the site represents Jonathan's overall career and operating style.
- Do not remove the hidden terminal unless analytics or usability testing shows it causes confusion.

## Positioning

### Current positioning

> Software Engineer — backend architecture, .NET, Azure. Fintech focus.

> I build backend systems that can be understood, operated, and changed after they meet production traffic.

The first line is the station-sign subtitle; the second is the map lede.

### Positioning variants for testing (proposal)

- **A — recruiter/senior-role focused:** "Senior .NET engineer for production backend systems." Subcopy: 12+ years building financial, automotive, education, healthcare, retail, and infrastructure software with clean boundaries, tests, and delivery discipline.
- **B — consulting/problem focused:** "Backend architecture for teams that need calmer production systems." Subcopy: helping .NET/Azure teams clarify service boundaries, improve delivery paths, and keep critical systems operable after launch.
- **C — current tone refined:** "Backend systems that stay legible under real traffic."

## Core user journeys

### Journey 1 — Recruiter evaluation

1. Land on the homepage; read name, title, subtitle, and the "Good service" availability line.
2. Click **Resume** in the header, or scan the map and Station Index.
3. Contact through Customer Information (email, LinkedIn).

Measured today: `cta_click` `nav_resume`, `info_resume`, `info_pdf`, `info_email`; `social_click`.

### Journey 2 — Consulting lead

1. Land on the homepage; read the map lede and Customer Information availability.
2. Review Line Guide and Service Notes for problem fit.
3. Contact through Customer Information.

Measured today: `info_email` and `social_click`. Section reach is not measured.

### Journey 3 — Engineer peer inspection

1. Follow the Side Projects line from the map to the Connections board.
2. Open repository, live site, or homepage links; expand Later departures.
3. Discover the hidden terminal.

Measured today: `project_click` on repository-name links only. Source/Live/Homepage links, ledger links, and terminal activation are not measured.

## Open proposals

These still apply to the metro design and are not implemented.

- **Contact emphasis** — test whether a contact action in the header or map title block increases contact clicks compared with the current resume-first header link.
- **Proof on the board** — add authored `signal`/`proof` copy to pinned repositories, emphasizing what each shows (architecture discipline, performance, cross-platform experiments, documentation, release automation).
- **Impact in the Station Index** — add owner-approved impact statements per role; keep domain, stack, and production context scannable.
- **Problem-oriented skills** — complement the Line Guide with short "what I help with" framing (architecture recovery, backend delivery, cloud operations, team enablement).
- **Experiment infrastructure** — lightweight query/local variants (e.g. `?variant=contact-first`), persisted per visitor if needed and included in analytics events. Avoid a heavy experimentation platform unless traffic warrants it.

## Analytics events

Implemented: `cta_click { label }` with `nav_resume`, `info_resume`, `info_pdf`, `info_email`, and `resume_print`; `social_click { label }` from Customer Information social rows; `project_click { label }` with the repository name from the Connections board. Elements opt in with `data-track-event`/`data-track-label`, handled by a delegated listener in `Analytics.astro`. The exact inventory is in [SEO & Analytics](wiki/seo_and_analytics.md#implemented-custom-events).

Future extensions should keep existing labels and add only measurements a selected experiment needs. The listener sends only `label` today; the fields below are proposed:

```text
cta_click { label, location, variant }
nav_click { label, variant }
project_click { label, action, variant }
repo_click { name, variant }
contact_click { channel, location, variant }
shell_open { method, variant }
scroll_depth { bucket, variant }
```

## Superseded proposals

The 2026-05-17 overhaul plan assumed the previous dark terminal UI and proposed refining it: a sharper identity hero with a `deploy-ledger.yaml`/`best_for` card, route-style `/profile /trace /workbench` navigation with `TRACE NN` labels, Workbench case-file cards, and a YAML `contact_packet` footer. The Career Metro Map redesign replaced that UI, so those specifications no longer apply. Its intent survives where noted above; the final contact block is now Customer Information. The original text is available in git history.

## Validation still pending

- First viewport communicates role, audience, value, and action in under 10 seconds (not measured).
- Contrast, keyboard focus, labels, hit targets, reduced motion, and print output checked in a browser at 390px, 768px, 1024px, and 1440px (requires explicit authorization).
- Any A/B variant is documented and measurable before it ships.
