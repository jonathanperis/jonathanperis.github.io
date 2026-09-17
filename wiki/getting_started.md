# Getting Started

[← Documentation index](index.md)

## Prerequisites

- [Node.js](https://nodejs.org/) **22.12.0 or later**, as required by the current Astro package (GitHub Actions selects Node 22)
- [Bun](https://bun.sh/) for dependency installation and scripts
- Optional: [GitHub CLI](https://cli.github.com/) (`gh`) to provide a local `GITHUB_TOKEN` when testing dynamic project fetching

## Installation

```bash
git clone https://github.com/jonathanperis/jonathanperis.github.io.git
cd jonathanperis.github.io
bun install --frozen-lockfile
```

The frozen install uses the committed `bun.lock`. Use `bun install` when intentionally changing dependencies, then review the lockfile diff. Declared dependency ranges and commands live in [`package.json`](../package.json).

## Development

### Without dynamic projects (fallback data)

```bash
bun run dev
```

### With dynamic projects (live GitHub data)

```bash
GITHUB_TOKEN=$(gh auth token) bun run dev
```

Open [http://localhost:4321](http://localhost:4321).

During development, the Astro page fetch runs on server-side page rendering. In production, project data is baked into the build and refreshes only after a rebuild/deployment.

### Background development server

```bash
bun run dev:bg
bun run dev:status
bun run dev:logs
bun run dev:stop
```

These scripts manage Astro's background dev server. Stop the server you started when finished.

## Build

```bash
bun run build
```

Produces a static Astro export in the `out/` directory.

### With dynamic projects and analytics

```bash
GITHUB_TOKEN=$(gh auth token) PUBLIC_GA_ID=G-35CN95481D bun run build
```

`GITHUB_TOKEN` enables live GitHub GraphQL/REST data. `PUBLIC_GA_ID` controls whether GA4 tags are emitted into the built HTML.

## Lint / Type Check

```bash
bun run lint
```

The `lint` script runs `astro check` using `@astrojs/check` and TypeScript strict settings.

### Match the PR checks

```bash
bun install --frozen-lockfile
bun audit
bun run lint
bun run build
```

The PR workflow supplies `GITHUB_TOKEN` and `PUBLIC_GA_ID`; a plain local build uses fallback projects and omits GA4 unless those variables are provided. The release workflow runs the frozen install and build; it does not repeat the PR audit/type-check steps.

## Preview

```bash
bun run preview
```

Astro previews the already-built `out/` output locally.

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `GITHUB_TOKEN` | No (fallback data is used when absent) | Fetches pinned names and the public repo ledger through GitHub GraphQL; resolves Pages URLs through REST |
| `PUBLIC_GA_ID` | No | Google Analytics 4 measurement ID used by `src/components/Analytics.astro` |

## Troubleshooting

- **Fallback projects appear:** this is expected without `GITHUB_TOKEN`. With a token, inspect `[github]` build logs; GraphQL HTTP failures, unusable responses, or fetch exceptions also select fallback data.
- **A live link is missing:** an individual Pages lookup can fail independently of repository discovery. Standard `https://jonathanperis.github.io/<repo>/` homepage URLs remain a fallback; token presence alone does not guarantee Pages API access.
- **A repo or pin is absent:** the query has a first-100 limit and owner/metadata filters. See [Dynamic Projects](dynamic_projects.md).
- **Preview is stale:** `bun run preview` serves the existing `out/` artifact. Run `bun run build` first.
