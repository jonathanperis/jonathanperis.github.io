# jonathanperis.github.io

> Personal developer portfolio built with Next.js — dynamically fetches GitHub projects, dark terminal aesthetic, print-optimized resume

[![CI](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/main-release.yml/badge.svg)](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/main-release.yml) [![CodeQL](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/codeql.yml/badge.svg)](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/codeql.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**[Visit →](https://jonathanperis.github.io/)**

---

## About

Next.js 16 App Router portfolio with a static export for GitHub Pages. It fetches pinned repositories from the GitHub GraphQL API at build time and renders them in a terminal-themed UI.

The site includes a print-optimized resume page, SEO metadata, analytics, and a Konami code easter egg. The same shared data powers the on-page resume and the dedicated `/resume` route.

It is built to stay simple to deploy: build locally, export statically, and publish through GitHub Actions.

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16 | App Router site with static export |
| React | 19 | UI rendering |
| TypeScript | Latest | Type safety |
| Tailwind CSS | v4 | Styling system |
| GitHub GraphQL API | v4 | Fetches pinned repos at build time |
| Google Analytics 4 | GA4 | Traffic and engagement analytics |

## Features

- Dynamic projects from GitHub GraphQL API (pinned repos)
- Terminal-themed dark UI with typing animations and scroll effects
- Print-optimized resume page with download support
- PWA manifest and SEO optimizations
- Konami code easter egg
- Static export deployed to GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+, npm

### Quick Start

```bash
git clone https://github.com/jonathanperis/jonathanperis.github.io.git
cd jonathanperis.github.io
npm install
npm run dev
```

Open http://localhost:3000

## CI/CD

The `main-release.yml` workflow builds the site with Node 20, runs `npm ci` and `npm run build`, then uploads the static export to GitHub Pages with `actions/deploy-pages`.

The `codeql.yml` workflow runs on push, pull request, and a weekly schedule to analyze the JavaScript/TypeScript codebase.

## License

MIT — see [LICENSE](LICENSE)
