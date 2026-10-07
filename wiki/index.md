# jonathanperis.github.io Documentation

Personal developer portfolio for **Jonathan Peris** — Software Engineer with 12+ years of experience in .NET, Azure, backend architecture, and reliable delivery.

**Live site:** [jonathanperis.github.io](https://jonathanperis.github.io)

These are repository-hosted Markdown documents in `wiki/`. GitHub Wiki is disabled; Astro publishes the portfolio and resume, not these documentation pages.

[Project README](../README.md) · [Agent guide](../AGENTS.md) · [Product direction](../PRODUCT.md) · [Design direction](../DESIGN.md)

## Current Implementation Snapshot

- **Framework:** Astro 7 static site built entirely from Astro components; small inlined client scripts (about 3 KB total) handle the status-strip clock, scroll-progress fallback, terminal, and analytics clicks. The metro map SVG is generated at build time.
- **Toolchain:** Node.js 22.12+ (`.node-version`) and Bun (pinned via `packageManager`) for install, lint, dev, build, and preview.
- **Source tree:** `src/pages`, `src/components`, `src/layouts`, `src/lib`, and `src/styles`.
- **Build output:** `out/`, uploaded as a GitHub Pages artifact by `main-release.yml`.
- **Data source:** `src/lib/data.ts` for profile/resume/terminal data; `src/lib/metro.ts` for the map's lines and stations (roles looked up from `data.ts`); `src/lib/github.ts` for GitHub repository discovery.
- **Production URL:** `https://jonathanperis.github.io/`.

## Features

- "Career Metro Map" UI in a transit-signage style (paper, ink, and São Paulo Metrô line colors): station-sign header, service-status strip, build-time SVG map, Station Index, Line Guide, Service Notes, and Customer Information
- CSS-only line filter (radio group + `:has()`), map-to-index anchor links with `:target` highlights, and a CSS motion-path train that respects reduced motion
- Scroll progress bar (CSS scroll-driven animation with a JavaScript fallback); content stays visible without JavaScript
- Connections departures board (pinned repos) and "Later departures" ledger fetched at build time via GitHub GraphQL + Pages REST APIs
- Print-optimized resume page generated from shared data (`/resume/`)
- Interactive terminal easter egg (native `<dialog>`) triggered by Konami code
- SEO optimized: JSON-LD, sitemap, robots.txt, Open Graph, Twitter cards, canonical URLs, and alternate language link
- Self-hosted Overpass and Overpass Mono through the Astro Fonts API
- Google Analytics 4 integration through `PUBLIC_GA_ID`, with attribute-driven CTA, social, and project events
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
| Dependencies, commands, runtime support | [`package.json`](../package.json), [`bun.lock`](../bun.lock), [`.node-version`](../.node-version), installed package engine requirements | README, Getting Started, AGENTS |
| CI, release, dependency updates | [Workflows](../.github/workflows/), [`renovate.json`](../renovate.json), shared Renovate preset | README, Deployment, AGENTS |
| Rendering or source-tree changes | [`astro.config.ts`](../astro.config.ts), [`src/`](../src/) | Architecture, Project Structure, [agent memory](../.agents/memory/architecture.md) |
| Project discovery | [`src/lib/github.ts`](../src/lib/github.ts), [`Connections.astro`](../src/components/sections/Connections.astro), [`MetroMap.astro`](../src/components/sections/MetroMap.astro) (Side Projects line) | Dynamic Projects, Architecture, agent memory |
| Career/profile content | [`src/lib/data.ts`](../src/lib/data.ts), [`src/lib/metro.ts`](../src/lib/metro.ts) stations and captions, presentation literals, independent PDF | Resume Page, Easter Egg; inspect section components, terminal commands, metadata, JSON-LD, and PDF for related changes |
| Map lines, stations, or geometry | [`src/lib/metro.ts`](../src/lib/metro.ts), [`src/lib/metro-geometry.ts`](../src/lib/metro-geometry.ts), [`MetroMap.astro`](../src/components/sections/MetroMap.astro), line tokens in [`globals.css`](../src/styles/globals.css) | Architecture, DESIGN, agent memory |
| Metadata, sitemap, analytics | Layout, Astro components, sitemap integration, [`public/`](../public/) | SEO & Analytics |
| UI or experiment status | [`src/components/`](../src/components/), [`src/lib/terminal-commands.ts`](../src/lib/terminal-commands.ts), [`src/lib/terminal.ts`](../src/lib/terminal.ts), and global CSS | PRODUCT, DESIGN, Easter Egg |

Before completing an update, resolve relative Markdown links, compare exact commands and symbols with source, and run the repository checks in [Getting Started](getting_started.md). Record browser-only or external-service checks separately from source/build verification. Last documentation/source audit: **2026-10-07**.
