# Architecture

## Overview

The site is an **Astro 6** static export deployed to **GitHub Pages**. Astro performs build-time data fetching in `src/pages/index.astro`, renders static HTML into `out/`, and hydrates the React portfolio UI with `client:load` for browser-only interactivity.

There is no Next.js App Router or React Server Component layer in the current codebase.

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
    -> GitHub GraphQL: profile pinned repositories + owned public non-fork repositories
    -> GitHub REST: /repos/jonathanperis/{repo}/pages for live Pages URLs
    -> fallback repository data when no token or API failure occurs
    -> <Portfolio projects={projects} client:load />

Runtime (static HTML + hydrated React):
  Portfolio.tsx
    -> renders baked-in project data
    -> manages scroll progress, reveal state, terminal state, command history, and CTA analytics events
```

## Key Design Decisions

- **Astro static export** — `astro.config.ts` sets `outDir: 'out'`; GitHub Pages serves the generated static artifact.
- **Interactive island boundary** — `Portfolio.tsx` is hydrated with `client:load`; SEO-critical metadata and document shell remain Astro-rendered.
- **Single source of truth** — `src/lib/data.ts` contains profile, skills, education, experience, socials, and availability data shared by the portfolio, resume, and JSON-LD.
- **Dynamic-but-build-time projects** — `src/lib/github.ts` fetches GitHub data during `bun run build`; no GitHub API calls happen from the deployed browser page.
- **Graceful fallback** — If `GITHUB_TOKEN` is missing or GitHub APIs fail, hardcoded fallback project data keeps local builds and PR checks deterministic.
- **Analytics opt-in by environment** — GA4 scripts are emitted only when `PUBLIC_GA_ID` is present.
