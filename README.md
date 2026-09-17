# jonathanperis.github.io

> Personal developer portfolio built with Astro — build-time GitHub projects, dark terminal aesthetic, print-optimized resume

[![Build Check](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/build-check.yml/badge.svg)](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/build-check.yml) [![Main Release](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/main-release.yml/badge.svg)](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/main-release.yml) [![CodeQL](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/codeql.yml/badge.svg)](https://github.com/jonathanperis/jonathanperis.github.io/actions/workflows/codeql.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**[Live site →](https://jonathanperis.github.io/)** | **[Documentation →](wiki/index.md)** | **[Agent guide →](AGENTS.md)**

---

## About

Astro portfolio with a static export for GitHub Pages. It fetches the repositories pinned on Jonathan's GitHub profile plus owned public, non-fork repositories from the GitHub GraphQL API at build time, resolves live GitHub Pages links through the REST API, and renders them in a terminal-themed UI.

The site includes a print-optimized [`/resume/`](https://jonathanperis.github.io/resume/) route, SEO metadata, JSON-LD, optional GA4 analytics, a web app manifest, and a Konami-code terminal easter egg. Shared profile and resume data live in [`src/lib/data.ts`](src/lib/data.ts); some presentation copy, terminal responses, and structured-data fields are maintained separately.

Project data refreshes when the site is rebuilt and deployed. The deployed browser does not fetch GitHub APIs. Without a token, or if the GraphQL fetch fails, the build uses checked-in fallback projects. See [Dynamic Projects](wiki/dynamic_projects.md) for filtering, the 100-repository limit, and Pages URL fallback behavior.

## Tech Stack

| Technology | Version / source | Purpose |
|-----------|------------------|---------|
| Astro | `^7` | Static site generation, GitHub Pages export, and background dev server support |
| React | `^19` | Interactive portfolio UI (`client:load`) |
| TypeScript | `^6` with `astro/tsconfigs/strict` | Type safety |
| Tailwind CSS | `^4` via `@tailwindcss/vite` | Styling system |
| GitHub GraphQL + REST APIs | GraphQL + REST `2022-11-28` | Fetches repositories and live Pages URLs at build time |
| Google Analytics 4 | `PUBLIC_GA_ID` | Traffic and engagement analytics |
| Bun | Workflow/local package manager | Install, lint, and build commands |

Declared version ranges live in [`package.json`](package.json); [`bun.lock`](bun.lock) records resolved dependencies.

## Features

- Workbench major cards sourced from GitHub profile pinned repositories
- Dynamic "Other GitHub repos" ledger from GitHub GraphQL API (owned public, non-fork repos)
- Live GitHub Pages links resolved at build time via GitHub REST API
- Terminal-themed dark UI with scroll/reveal effects and responsive project cards
- Print-optimized `/resume/` route with browser print/save-as-PDF support
- Web app manifest and icons; generated sitemap, robots.txt, Open Graph, Twitter, and JSON-LD metadata
- Google Analytics 4 loaded only when `PUBLIC_GA_ID` is set
- Konami-code terminal easter egg
- Static export deployed to GitHub Pages from `out/`
- Astro 7 background dev server scripts for agent-assisted local inspection

## Getting Started

### Prerequisites

- Node.js **22.12.0 or later**
- Bun
- Optional: GitHub CLI (`gh`) for providing a local `GITHUB_TOKEN`

### Quick Start

```bash
git clone https://github.com/jonathanperis/jonathanperis.github.io.git
cd jonathanperis.github.io
bun install --frozen-lockfile
bun run dev
```

Open <http://localhost:4321>.

For agent-assisted work, Astro 7 can run the dev server in the background and expose status/log subcommands:

```bash
bun run dev:bg
bun run dev:status
bun run dev:logs
bun run dev:stop
```

To build with live repository data instead of fallback data:

```bash
GITHUB_TOKEN=$(gh auth token) bun run build
```

Full command list, optional analytics configuration, and troubleshooting: [Getting Started](wiki/getting_started.md).

## CI/CD

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| [`build-check.yml`](.github/workflows/build-check.yml) | Pull requests to `main`, manual dispatch | Frozen install, `bun audit`, `astro check`, static build |
| [`main-release.yml`](.github/workflows/main-release.yml) | Push to `main`, manual dispatch on `main` | Frozen install, build `out/`, upload artifact, deploy GitHub Pages |
| [`codeql.yml`](.github/workflows/codeql.yml) | Push/PR to `main`, Monday 06:00 UTC, manual dispatch | JavaScript/TypeScript and GitHub Actions security-and-quality analysis |

Actions are pinned by commit SHA. Dependency updates use [`renovate.json`](renovate.json), which inherits the account's [shared Renovate preset](https://github.com/jonathanperis/.github/blob/main/default.json). See [Deployment](wiki/deployment.md) for permissions, scheduling, and release details.

## Documentation and Maintenance

- [Documentation index](wiki/index.md) — setup, architecture, data, resume, SEO, and deployment. These Markdown files are read in the repository; GitHub Wiki is disabled and the site has no documentation route.
- [Product direction](PRODUCT.md) and [design direction](DESIGN.md) — current implementation status and proposed enhancements.
- [Maintenance map](wiki/index.md#keeping-documentation-current) — which documentation to revisit when code or configuration changes.

The manifest supplies app metadata and icons; offline behavior is not implemented. The checked-in CV PDF is independent of the web resume and has unresolved content differences; see [Resume Page](wiki/resume_page.md#independent-pdf-asset).

## License

MIT — see [LICENSE](LICENSE)
