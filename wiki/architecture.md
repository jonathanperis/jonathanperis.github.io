# Architecture

[← Documentation index](index.md)

## Overview

The site is an **Astro 7** static export deployed to **GitHub Pages**. Astro performs build-time data fetching in `src/pages/index.astro`, renders static HTML into `out/`, and ships only small bundled client `<script>`s (reveal observer, scroll-progress fallback, terminal, analytics click tracking) for browser interactivity. There is no UI framework runtime.

The source tree is built around two Astro pages composed from Astro components. The `wiki/` directory is repository documentation, outside the published route tree.

## Component Architecture

```text
src/
├── pages/
│   ├── index.astro          # Build-time repo fetch; composes nav, sections, footer, terminal
│   └── resume.astro         # Static resume route with print CSS
├── layouts/
│   └── RootLayout.astro     # Shared document shell, metadata, self-hosted fonts, analytics, JSON-LD
├── components/
│   ├── sections/
│   │   ├── Hero.astro         # Availability, CTAs, operating signals, deploy ledger
│   │   ├── Profile.astro      # Profile packet + engineering principles
│   │   ├── Capabilities.astro # SKILL_GROUPS capability map
│   │   ├── Trace.astro        # EXPERIENCES timeline
│   │   └── Workbench.astro    # Pinned repo cards + "Other GitHub repos" ledger
│   ├── Reveal.astro         # Reveal-on-scroll wrapper + IntersectionObserver script
│   ├── ScrollProgress.astro # CSS scroll-driven progress bar with rAF fallback
│   ├── SectionLabel.astro   # Numbered section heading
│   ├── SiteNav.astro        # Route-style primary navigation
│   ├── SiteFooter.astro     # Social links + shell hint
│   ├── SocialLink.astro     # Icon link with social_click tracking attributes
│   ├── Terminal.astro       # Konami-code <dialog> terminal
│   ├── Analytics.astro      # GA4 scripts when PUBLIC_GA_ID exists + delegated event tracking
│   └── JsonLd.astro         # Schema.org Person JSON-LD from shared data
├── lib/
│   ├── data.ts              # Shared profile/resume/social data
│   ├── github.ts            # GitHub GraphQL + REST build-time data client
│   ├── terminal-commands.ts # Build-time static terminal command table
│   └── terminal.ts          # Client-side command resolver
└── styles/
    └── globals.css          # Tailwind v4 and custom design system
```

## Data Flow

```text
Build time:
  src/pages/index.astro
    -> fetchRepos() from src/lib/github.ts
    -> GitHub GraphQL: pinnedItems(first: 6) + first 100 recently updated public non-fork repositories
    -> filter owner/fork/metadata repos; pins keep pin order; ledger = recent repos minus pins
    -> GitHub REST: /repos/jonathanperis/{repo}/pages for live Pages URLs (concurrency 6)
    -> whole-list fallback if no token or GraphQL fetch fails/is unusable
    -> preserve fetched data and homepage fallback on individual Pages lookup failures
    -> <Workbench projects={projects} /> renders static HTML
  src/components/Terminal.astro
    -> buildCommandTable() from src/lib/terminal-commands.ts (derived from data.ts)
    -> embedded as <script type="application/json" id="terminal-commands">

Runtime (static HTML + bundled scripts):
  Reveal.astro          -> IntersectionObserver adds .shown
  ScrollProgress.astro  -> rAF fallback only when animation-timeline: scroll() is unsupported
  Terminal.astro        -> Konami listener, <dialog>.showModal(), runCommand() from src/lib/terminal.ts
  Analytics.astro       -> delegated click listener for data-track-event / data-track-label
```

## Key Design Decisions

- **Astro static export** — [`astro.config.ts`](../astro.config.ts) relies on Astro's default static output, sets `outDir: 'out'` and `trailingSlash: 'always'`; GitHub Pages serves the generated artifact at `/` and `/resume/`.
- **Hosting boundary** — Data fetching belongs to the build. Server adapters and server-side route caches are not part of this static hosting model. Background dev-server commands are documented in [Getting Started](getting_started.md).
- **Zero-framework UI** — Every section is server-rendered Astro markup. Client behavior lives in component `<script>` blocks that Astro bundles and inlines (about 3 KB of JavaScript in total). SEO-critical metadata and the document shell remain Astro-rendered.
- **Progressive enhancement** — An inline script in `RootLayout.astro` adds `html.js`; reveal content is hidden only under that class, so visitors without JavaScript see everything. The hero copy is never wrapped in `Reveal`, and list stagger delays are capped at six steps.
- **Self-hosted fonts** — The Astro Fonts API (`fonts` in `astro.config.ts`, `fontProviders.google()`) downloads DM Sans and JetBrains Mono at build time; `<Font>` tags in the layout preload the latin subset. There is no runtime request to Google Fonts.
- **Shared content with explicit exceptions** — [`src/lib/data.ts`](../src/lib/data.ts) supplies profile, address, years of experience, skills and skill groups, education, experience, socials, and availability. Terminal command output and JSON-LD are derived from it. Hero copy, the hero LinkedIn URL, and some terminal strings remain presentation literals; review them when changing facts. The separate CV PDF is not generated from this data.
- **Dynamic-but-build-time projects** — `src/lib/github.ts` fetches GitHub data during `bun run build`; no GitHub API calls happen from the deployed browser page.
- **Layered fallback** — Missing tokens and failed/unusable GraphQL fetches use `FALLBACK`. Failed Pages enrichment preserves the fetched repository and its standard Pages homepage fallback. Authenticated builds depend on live GitHub data; see [Dynamic Projects](dynamic_projects.md) for limits and ordering.
- **Analytics opt-in by environment** — GA4 scripts are emitted only when `PUBLIC_GA_ID` is present; tracked elements declare `data-track-event`/`data-track-label` attributes.

- **Crawler URLs** — The sitemap integration owns the route list; canonical, Open Graph, and English alternate URLs share a page-specific URL derived from the configured site. See [SEO & Analytics](seo_and_analytics.md).
