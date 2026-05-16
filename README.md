# jonathanperis.github.io

> Personal developer portfolio built with Astro, React, TypeScript, and Tailwind CSS. Includes GitHub project data, a dark terminal aesthetic, and a print-optimized resume.

[![Build Check](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/build-check.yml/badge.svg)](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/build-check.yml) [![Main Release](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/main-release.yml/badge.svg)](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/main-release.yml) [![CodeQL](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/codeql.yml/badge.svg)](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/codeql.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**[Live demo →](https://jonathanperis.github.io/)** | **[Documentation →](CLAUDE.md)**

---

## About

Astro 6 portfolio with static output for GitHub Pages. It fetches pinned repositories from the GitHub GraphQL API at build time and renders them in a terminal-themed UI.

The site includes a print-optimized resume page, SEO metadata, analytics, and a Konami code easter egg. Shared data powers the on-page portfolio and the dedicated `/resume` route.

It is built to stay simple to deploy: build locally, output static assets, and publish through GitHub Actions.

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Astro | 6 | Static site framework and routing |
| React | 19 | Interactive UI rendering |
| TypeScript | 6 | Type safety |
| Tailwind CSS | v4 | Styling system |
| GitHub GraphQL API | v4 | Fetches pinned repos at build time |
| Google Analytics 4 | GA4 | Traffic and engagement analytics |

## Features

- Dynamic projects from GitHub GraphQL API, with fallback data
- Terminal-themed dark UI with typing animations and scroll effects
- Print-optimized resume page with download support
- PWA manifest and SEO optimizations
- Konami code easter egg
- Static output deployed to GitHub Pages

## Getting Started

### Prerequisites

- Node.js 22+ for local builds; the workspace mise default is Node 24
- Bun

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

MIT - see [LICENSE](LICENSE)
