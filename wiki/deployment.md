# Deployment

## GitHub Actions

The site deploys automatically through `.github/workflows/main-release.yml` on every push to `main` and can also be run manually with `workflow_dispatch`.

### Pipeline Steps

1. **Checkout** — Clone the repository (`actions/checkout@v6`)
2. **Setup Node** — Node.js 22 (`actions/setup-node@v6`)
3. **Setup Bun** — Bun latest (`oven-sh/setup-bun@v2`)
4. **Configure Pages** — `actions/configure-pages@v6`
5. **Install** — `bun install`
6. **Build** — `bun run build` with environment variables:
   - `GITHUB_TOKEN` — Fetches public repositories and Pages URLs (auto-provided by GitHub Actions)
   - `PUBLIC_GA_ID` — Google Analytics measurement ID (`G-35CN95481D`)
7. **Upload** — Uploads `out/` as the Pages artifact (`actions/upload-pages-artifact@v5`)
8. **Deploy** — Deploys to GitHub Pages (`actions/deploy-pages@v5`)

### Environment Variables

| Variable | Source | Purpose |
|---|---|---|
| `GITHUB_TOKEN` | `secrets.GITHUB_TOKEN` / Actions token | GitHub GraphQL and REST APIs for public repo + Pages data |
| `PUBLIC_GA_ID` | Workflow env | GA4 measurement ID consumed by `src/components/Analytics.astro` |

## Static Export

Astro builds the site into the `out/` directory configured in `astro.config.ts`. The deployed artifact is pure static HTML/CSS/JS plus files from `public/`; no server runtime is required on GitHub Pages.

## CI Workflows

| Workflow | Trigger | What it does |
|---|---|---|
| `build-check.yml` | Pull requests to `main`, manual dispatch | `bun install`, `bun run lint`, `bun run build` |
| `main-release.yml` | Pushes to `main`, manual dispatch | Builds and deploys the Pages artifact |
| `codeql.yml` | Pushes, PRs, weekly Monday 06:00 UTC | Runs CodeQL JavaScript/TypeScript analysis |

## Manual Local Build

```bash
GITHUB_TOKEN=$(gh auth token) PUBLIC_GA_ID=G-35CN95481D bun run build
```

Then preview the generated artifact locally:

```bash
bun run preview
```

Publishing is handled by GitHub Actions; do not commit `out/`.

## Domain

The site is served at `https://jonathanperis.github.io` via GitHub Pages with automatic HTTPS.
