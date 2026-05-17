# jonathanperis.github.io

> Personal developer portfolio built with Astro — dynamically fetches GitHub projects, dark terminal aesthetic, print-optimized resume

[![Build Check](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/build-check.yml/badge.svg)](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/build-check.yml) [![Main Release](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/main-release.yml/badge.svg)](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/main-release.yml) [![CodeQL](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/codeql.yml/badge.svg)](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/codeql.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**[Live demo →](https://jonathanperis.github.io/)** | **[Documentation →](CLAUDE.md)**

---

## About

Astro portfolio with a static export for GitHub Pages. It fetches public, non-fork repositories from the GitHub GraphQL API at build time, resolves live GitHub Pages links through the REST API, and renders them in a terminal-themed UI.

The site includes a print-optimized resume page, SEO metadata, analytics, and a Konami code easter egg. The same shared data powers the on-page resume and the dedicated `/resume` route.

It is built to stay simple to deploy: build locally, export statically, and publish through GitHub Actions.

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Astro | 6 | Static site build and GitHub Pages export |
| React | 19 | Interactive portfolio UI |
| TypeScript | Latest | Type safety |
| Tailwind CSS | v4 | Styling system |
| GitHub GraphQL + REST APIs | v4 / REST | Fetches repositories and live Pages URLs at build time |
| Google Analytics 4 | GA4 | Traffic and engagement analytics |

## Features

- Dynamic Workbench repository ledger from GitHub GraphQL API (public, non-fork repos)
- Live GitHub Pages links resolved at build time via GitHub REST API
- Terminal-themed dark UI with typing animations and scroll effects
- Print-optimized resume page with download support
- PWA manifest and SEO optimizations
- Konami code easter egg
- Static export deployed to GitHub Pages

## Getting Started

### Prerequisites

- Node.js 22+, Bun

### Quick Start

```bash
git clone https://github.com/jonathanperis/jonathanperis.github.io.git
cd jonathanperis.github.io
bun install
bun run dev
```

Open http://localhost:4321

## CI/CD

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `build-check.yml` | Pull requests to main | Lint + build check |
| `main-release.yml` | Push to main / manual | Build and deploy to GitHub Pages |
| `codeql.yml` | Push, PRs, weekly schedule | JavaScript/TypeScript security analysis |

Dependabot monitors npm and GitHub Actions dependencies weekly.

## License

MIT — see [LICENSE](LICENSE)
