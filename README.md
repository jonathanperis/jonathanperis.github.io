# jonathanperis.github.io

> Personal developer portfolio built with Astro — dynamically fetches GitHub projects, dark terminal aesthetic, print-optimized resume

[![Build Check](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/build-check.yml/badge.svg)](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/build-check.yml) [![Main Release](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/main-release.yml/badge.svg)](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/main-release.yml) [![CodeQL](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/codeql.yml/badge.svg)](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/codeql.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**[Live demo →](https://jonathanperis.github.io/)** | **[Contributor guide →](CLAUDE.md)** | **[Wiki →](wiki/index.md)**

---

## About

Astro portfolio with a static export for GitHub Pages. It fetches the repositories pinned on Jonathan's GitHub profile plus owned public, non-fork repositories from the GitHub GraphQL API at build time, resolves live GitHub Pages links through the REST API, and renders them in a terminal-themed UI.

The site includes a print-optimized `/resume` route, SEO metadata, JSON-LD, GA4 analytics, a PWA manifest, and a Konami-code terminal easter egg. Profile, skills, education, availability, social links, and experience data live in `src/lib/data.ts` and power both the portfolio and resume.

## Tech Stack

| Technology | Version / source | Purpose |
|-----------|------------------|---------|
| Astro | `^6` | Static site build and GitHub Pages export |
| React | `^19` | Interactive portfolio UI (`client:load`) |
| TypeScript | `^6` with `astro/tsconfigs/strict` | Type safety |
| Tailwind CSS | `^4` via `@tailwindcss/vite` | Styling system |
| GitHub GraphQL + REST APIs | GraphQL + REST `2022-11-28` | Fetches repositories and live Pages URLs at build time |
| Google Analytics 4 | `PUBLIC_GA_ID` | Traffic and engagement analytics |
| Bun | Workflow/local package manager | Install, lint, and build commands |

## Features

- Workbench major cards sourced from GitHub profile pinned repositories
- Dynamic "Other GitHub repos" ledger from GitHub GraphQL API (owned public, non-fork repos)
- Live GitHub Pages links resolved at build time via GitHub REST API
- Terminal-themed dark UI with scroll/reveal effects and responsive project cards
- Print-optimized `/resume` route with browser PDF download support
- PWA manifest, sitemap, robots.txt, Open Graph, Twitter, and JSON-LD metadata
- Google Analytics 4 loaded only when `PUBLIC_GA_ID` is set
- Konami-code terminal easter egg
- Static export deployed to GitHub Pages from `out/`

## Getting Started

### Prerequisites

- Node.js 22+
- Bun
- Optional: GitHub CLI (`gh`) for providing a local `GITHUB_TOKEN`

### Quick Start

```bash
git clone https://github.com/jonathanperis/jonathanperis.github.io.git
cd jonathanperis.github.io
bun install
bun run dev
```

Open <http://localhost:4321>.

To build with live repository data instead of fallback data:

```bash
GITHUB_TOKEN=$(gh auth token) bun run build
```

## CI/CD

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `build-check.yml` | Pull requests to `main`, manual dispatch | Bun install, `astro check`, and Astro build |
| `main-release.yml` | Push to `main`, manual dispatch | Build `out/`, upload Pages artifact, deploy GitHub Pages |
| `codeql.yml` | Push, PRs, weekly Monday 06:00 UTC | JavaScript/TypeScript security analysis |

Dependabot monitors npm and GitHub Actions dependencies weekly.

## License

MIT — see [LICENSE](LICENSE)
