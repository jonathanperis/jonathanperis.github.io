# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/) v22 or later (the GitHub Actions workflows use Node 22)
- [Bun](https://bun.sh/) for dependency installation and scripts
- Optional: [GitHub CLI](https://cli.github.com/) (`gh`) to provide a local `GITHUB_TOKEN` when testing dynamic project fetching

## Installation

```bash
git clone https://github.com/jonathanperis/jonathanperis.github.io.git
cd jonathanperis.github.io
bun install
```

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

## Preview

```bash
bun run preview
```

Astro previews the already-built `out/` output locally.

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `GITHUB_TOKEN` | No (fallback data is used when absent) | Fetches pinned repositories through GitHub GraphQL and resolves Pages URLs through the REST API at build time |
| `PUBLIC_GA_ID` | No | Google Analytics 4 measurement ID used by `src/components/Analytics.astro` |
