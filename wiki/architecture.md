# Architecture

[← Documentation index](index.md)

## Overview

The site is an **Astro 7** static export deployed to **GitHub Pages**. Astro performs build-time data fetching in `src/pages/index.astro`, renders static HTML into `out/`, and hydrates the React portfolio UI with `client:load` for browser-only interactivity.

The source tree is built around two Astro pages and one hydrated React island. The `wiki/` directory is repository documentation, outside the published route tree.

## Component Architecture

```text
src/
├── pages/
│   ├── index.astro          # Build-time repo fetch, renders <Portfolio client:load />
│   └── resume.astro         # Static resume route with print CSS
├── layouts/
│   └── RootLayout.astro     # Shared document shell, metadata, fonts, analytics, JSON-LD
├── components/
│   ├── Portfolio.tsx        # React interactive island: home UI, Workbench, terminal easter egg
│   ├── Analytics.astro      # Emits GA4 scripts only when PUBLIC_GA_ID exists
│   └── JsonLd.astro         # Schema.org Person JSON-LD from shared data
├── lib/
│   ├── data.ts              # Shared profile/resume/social data
│   └── github.ts            # GitHub GraphQL + REST build-time data client
└── styles/
    └── globals.css          # Tailwind v4 and custom design system
```

## Data Flow

```text
Build time:
  src/pages/index.astro
    -> fetchRepos() from src/lib/github.ts
    -> GitHub GraphQL: pinned names + first 100 recently updated public non-fork repositories
    -> filter owner/metadata repos; mark eligible pins and preserve pinned order
    -> GitHub REST: /repos/jonathanperis/{repo}/pages for live Pages URLs
    -> whole-list fallback if no token or GraphQL fetch fails/is unusable
    -> preserve fetched data and homepage fallback on individual Pages lookup failures
    -> <Portfolio projects={projects} client:load />

Runtime (static HTML + hydrated React):
  Portfolio.tsx
    -> renders baked-in project data
    -> manages scroll progress, reveal state, terminal state, command history, and CTA analytics events
```

## Key Design Decisions

- **Astro static export** — [`astro.config.ts`](../astro.config.ts) relies on Astro's default static output, sets `outDir: 'out'` and `trailingSlash: 'always'`; GitHub Pages serves the generated artifact at `/` and `/resume/`.
- **Hosting boundary** — Data fetching belongs to the build. Server adapters and server-side route caches are not part of this static hosting model. Background dev-server commands are documented in [Getting Started](getting_started.md).
- **Interactive island boundary** — `Portfolio.tsx` is hydrated with `client:load`; SEO-critical metadata and document shell remain Astro-rendered.
- **Shared content with explicit exceptions** — [`src/lib/data.ts`](../src/lib/data.ts) supplies profile, skills, education, experience, socials, and availability. Hero/terminal strings, metadata descriptions, and JSON-LD employer/address also have presentation literals. Review those consumers when changing facts. The separate CV PDF is not generated from this data.
- **Dynamic-but-build-time projects** — `src/lib/github.ts` fetches GitHub data during `bun run build`; no GitHub API calls happen from the deployed browser page.
- **Layered fallback** — Missing tokens and failed/unusable GraphQL fetches use `FALLBACK`. Failed Pages enrichment preserves the fetched repository and its standard Pages homepage fallback. Authenticated builds depend on live GitHub data; see [Dynamic Projects](dynamic_projects.md) for limits and ordering.
- **Analytics opt-in by environment** — GA4 scripts are emitted only when `PUBLIC_GA_ID` is present.

- **Crawler URLs** — The sitemap integration owns the route list; canonical, Open Graph, and English alternate URLs share a page-specific URL derived from the configured site. See [SEO & Analytics](seo_and_analytics.md).
- **Legacy project records** — `FEATURED_PROJECTS` remains in `data.ts` but is not consumed by the current Workbench renderer. Workbench uses `GitHubRepo[]` from `fetchRepos()`.
