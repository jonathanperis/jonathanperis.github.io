# jonathanperis.github.io Wiki

Personal developer portfolio for **Jonathan Peris** — Software Engineer with 12+ years of experience in .NET, Azure, backend architecture, and reliable delivery.

**Live site:** [jonathanperis.github.io](https://jonathanperis.github.io)

## Current Implementation Snapshot

- **Framework:** Astro 6 static site with React 19 interactive islands.
- **Package manager:** Bun for install, lint, dev, build, and preview.
- **Source tree:** `src/pages`, `src/components`, `src/layouts`, `src/lib`, and `src/styles`.
- **Build output:** `out/`, uploaded as a GitHub Pages artifact by `main-release.yml`.
- **Data source:** `src/lib/data.ts` for profile/resume data; `src/lib/github.ts` for GitHub repository discovery.
- **Production URL:** `https://jonathanperis.github.io/`.

## Features

- Developer-themed dark UI with terminal/system-console aesthetic
- Scroll progress bar and reveal animations
- Dynamic Workbench pinned-repo cards and "Other GitHub repos" ledger fetched at build time via GitHub GraphQL + Pages REST APIs
- Print-optimized resume page generated from shared data (`/resume`)
- Interactive terminal easter egg triggered by Konami code
- SEO optimized: JSON-LD, sitemap, robots.txt, Open Graph, Twitter cards, canonical URLs, and alternate language link
- Google Analytics 4 integration through `PUBLIC_GA_ID`
- PWA-ready with manifest and icons

## Wiki Pages

- [Architecture](architecture)
- [Getting Started](getting_started)
- [Project Structure](project_structure)
- [Dynamic Projects](dynamic_projects)
- [Resume Page](resume_page)
- [SEO & Analytics](seo_and_analytics)
- [Easter Egg](easter_egg)
- [Deployment](deployment)
