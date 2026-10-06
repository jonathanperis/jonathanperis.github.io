# Deployment

[← Documentation index](index.md)

## GitHub Actions

The site deploys through [`.github/workflows/main-release.yml`](../.github/workflows/main-release.yml) on pushes to `main`. Manual dispatch is also available, but the build job is guarded by `github.ref == 'refs/heads/main'`, and the deploy job depends on it.

### Pipeline Steps

The workflow has two jobs so that dependency code never runs with deployment permissions.

**`build`** (`contents: read` only, 15 min timeout):

1. **Checkout** — Clone the repository (`actions/checkout@v6`) with persisted credentials disabled
2. **Setup Node** — Version from [`.node-version`](../.node-version) (`actions/setup-node@v6`, `node-version-file`)
3. **Setup Bun** — Version from the `packageManager` field in [`package.json`](../package.json) (`oven-sh/setup-bun@v2`, `bun-version-file`)
4. **Install** — `bun install --frozen-lockfile`
5. **Build** — `bun run build` with environment variables:
   - `GITHUB_TOKEN` — Fetches public repositories and Pages URLs (auto-provided by GitHub Actions)
   - `PUBLIC_GA_ID` — Google Analytics measurement ID (`G-35CN95481D`)
6. **Upload** — Uploads `out/` as the Pages artifact (`actions/upload-pages-artifact@v5`)

**`deploy`** (`needs: build`; only `pages: write` and `id-token: write`; 10 min timeout; runs no repository code):

1. **Configure Pages** — `actions/configure-pages@v6`
2. **Deploy** — Deploys the uploaded artifact to GitHub Pages (`actions/deploy-pages@v5`)

The action versions above are readable major-version labels; workflow `uses` entries are pinned to commit SHAs. Workflow-level permissions are `contents: read`. The `github-pages` concurrency group uses `cancel-in-progress: false`.

The release workflow does not run `bun audit` or `bun run lint`; those checks belong to the PR build workflow. Repository data can fall back when GitHub API access fails, so a successful build alone does not prove live project data was used.

### Environment Variables

| Variable | Source | Purpose |
|---|---|---|
| `GITHUB_TOKEN` | `secrets.GITHUB_TOKEN` / Actions token | GitHub GraphQL and REST APIs for public repo + Pages data |
| `PUBLIC_GA_ID` | Workflow env | GA4 measurement ID consumed by `src/components/Analytics.astro` |

## Static Export

Astro uses its default static output mode, `outDir: 'out'`, and `trailingSlash: 'always'` in [`astro.config.ts`](../astro.config.ts). The deployed artifact is static HTML/CSS, small inlined scripts, self-hosted font files, and files from `public/`; GitHub Pages needs no server runtime or SSR adapter. The built pages are `/` and `/resume/`.

The sitemap integration generates the authoritative route list during builds. See [SEO & Analytics](seo_and_analytics.md) for crawler entry points and URL conventions. The `wiki/` Markdown files are repository documentation and are not part of the site build.

## CI Workflows

| Workflow | Trigger | What it does |
|---|---|---|
| [`build-check.yml`](../.github/workflows/build-check.yml) | Pull requests to `main`, manual dispatch | Frozen install, `bun audit`, `bun run lint`, `bun run build`; cancels superseded runs per PR, 15 min timeout |
| [`main-release.yml`](../.github/workflows/main-release.yml) | Pushes to `main`, manual dispatch on `main` | `build` job (frozen install, build, upload) then `deploy` job (Pages deployment) |
| [`codeql.yml`](../.github/workflows/codeql.yml) | Push/PR to `main`, Monday 06:00 UTC, manual dispatch | Separate JavaScript/TypeScript and Actions analyses with `security-and-quality` queries |

The build and release workflows share one toolchain source: Node from `.node-version` and Bun from `packageManager` in `package.json`. Bump those files, not workflow inputs, to change CI runtime versions.

## Dependency Maintenance

[`renovate.json`](../renovate.json) extends the account's [shared preset](https://github.com/jonathanperis/.github/blob/main/default.json). As reviewed on 2026-09-17, it configures weekly updates, Monday lockfile maintenance, grouped Astro/Tailwind updates, and SHA-pinned GitHub Actions. Major updates and Actions updates require review rather than automerge. Recheck the shared preset when documenting policy changes; it can evolve independently of this repository.

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
