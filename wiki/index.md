# jonathanperis.github.io Documentation

Personal developer portfolio for **Jonathan Peris** — Software Engineer with 12+ years of experience in .NET, Azure, backend architecture, and reliable delivery.

**Live site:** [jonathanperis.github.io](https://jonathanperis.github.io)

These are repository-hosted Markdown documents in `wiki/`. GitHub Wiki is disabled; Astro publishes the portfolio and resume, not these documentation pages.

[Project README](../README.md) · [Agent guide](../AGENTS.md) · [Product direction](../PRODUCT.md) · [Design direction](../DESIGN.md)

## Current Implementation Snapshot

- **Framework:** Astro 7 static site with React 19 interactive islands.
- **Package manager:** Bun for install, lint, dev, build, and preview.
- **Source tree:** `src/pages`, `src/components`, `src/layouts`, `src/lib`, and `src/styles`.
- **Build output:** `out/`, uploaded as a GitHub Pages artifact by `main-release.yml`.
- **Data source:** `src/lib/data.ts` for profile/resume data; `src/lib/github.ts` for GitHub repository discovery.
- **Production URL:** `https://jonathanperis.github.io/`.

## Features

- Developer-themed dark UI with terminal/system-console aesthetic
- Scroll progress bar and reveal animations
- Dynamic Workbench pinned-repo cards and "Other GitHub repos" ledger fetched at build time via GitHub GraphQL + Pages REST APIs
- Print-optimized resume page generated from shared data (`/resume/`)
- Interactive terminal easter egg triggered by Konami code
- SEO optimized: JSON-LD, sitemap, robots.txt, Open Graph, Twitter cards, canonical URLs, and alternate language link
- Google Analytics 4 integration through `PUBLIC_GA_ID`
- Web app manifest and icons (no offline implementation)

## Guides

- [Getting Started](getting_started.md)
- [Architecture](architecture.md)
- [Project Structure](project_structure.md)
- [Dynamic Projects](dynamic_projects.md)
- [Resume Page](resume_page.md)
- [SEO & Analytics](seo_and_analytics.md)
- [Easter Egg](easter_egg.md)
- [Deployment](deployment.md)

## Keeping Documentation Current

Update the relevant guide in the same change as its source. Link to configuration rather than copying full queries or resolved dependency versions.

| Change | Authoritative source | Documentation to revisit |
|---|---|---|
| Dependencies, commands, runtime support | [`package.json`](../package.json), [`bun.lock`](../bun.lock), installed package engine requirements | README, Getting Started, AGENTS |
| CI, release, dependency updates | [Workflows](../.github/workflows/), [`renovate.json`](../renovate.json), shared Renovate preset | README, Deployment, AGENTS |
| Rendering or source-tree changes | [`astro.config.ts`](../astro.config.ts), [`src/`](../src/) | Architecture, Project Structure, [agent memory](../.agents/memory/architecture.md) |
| Project discovery | [`src/lib/github.ts`](../src/lib/github.ts), [`Portfolio.tsx`](../src/components/Portfolio.tsx) | Dynamic Projects, Architecture, agent memory |
| Career/profile content | [`src/lib/data.ts`](../src/lib/data.ts), presentation literals, independent PDF | Resume Page; inspect terminal, metadata, JSON-LD, and PDF for related changes |
| Metadata, sitemap, analytics | Layout, Astro components, sitemap integration, [`public/`](../public/) | SEO & Analytics |
| UI or experiment status | Portfolio component and global CSS | PRODUCT, DESIGN, Easter Egg |

Before completing an update, resolve relative Markdown links, compare exact commands and symbols with source, and run the repository checks in [Getting Started](getting_started.md). Record browser-only or external-service checks separately from source/build verification. Last documentation/source audit: **2026-09-17**.
