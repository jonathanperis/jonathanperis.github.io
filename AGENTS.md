# jonathanperis.github.io — AGENTS Guide

Standardized repository instructions for agent harnesses working on this Astro 7 and React 19 static portfolio, deployed to GitHub Pages.

**Live:** https://jonathanperis.github.io/

**Documentation:** [Index](wiki/index.md) · [Setup](wiki/getting_started.md) · [Deployment](wiki/deployment.md) · [Maintenance map](wiki/index.md#keeping-documentation-current)

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Astro 7 | Static site generation, GitHub Pages export, and background dev server support |
| React 19 | Hydrated interactive portfolio UI |
| TypeScript 6 | Strict type checking through `astro/tsconfigs/strict` |
| Tailwind CSS 4 | Custom low-glare terminal-style design system via `@tailwindcss/vite` |
| GitHub GraphQL + REST APIs | Build-time repository and GitHub Pages URL discovery |
| Google Analytics 4 | Traffic and CTA event tracking when `PUBLIC_GA_ID` is set |
| Bun | Local and CI package manager/script runner |

---

## Build Commands

Use Node.js **22.12.0 or later** and Bun. [`package.json`](package.json) owns the script definitions; `bun.lock` records resolved dependencies.

```sh
bun install --frozen-lockfile # install committed dependency versions
bun audit         # dependency audit used by PR CI
bun run dev       # Astro dev server on :4321
bun run dev:bg    # Astro 7 background dev server for agent-assisted work
bun run dev:status # check background dev server status
bun run dev:logs  # read background dev server logs
bun run dev:stop  # stop the background dev server
bun run lint      # astro check
bun run build     # static export to ./out
bun run preview   # preview the built ./out artifact
```

For live repository data during local builds:

```sh
GITHUB_TOKEN=$(gh auth token) PUBLIC_GA_ID=G-35CN95481D bun run build
```

---

## Architecture

```text
Astro pages/layouts
├── src/pages/index.astro        # Build-time fetchRepos(), renders Portfolio with client:load
├── src/pages/resume.astro       # Print-optimized resume route
└── src/layouts/RootLayout.astro # HTML shell, metadata, fonts, JSON-LD, analytics

Interactive island
└── src/components/Portfolio.tsx # Main React UI: hero, profile, stack, experience, Workbench, terminal

Astro components
├── src/components/Analytics.astro # Conditional GA4 loader from PUBLIC_GA_ID
└── src/components/JsonLd.astro    # Schema.org Person JSON-LD

Data layer
├── src/lib/github.ts # GitHub GraphQL + REST client with fallback repo data
└── src/lib/data.ts   # PROFILE, AVAILABILITY, SKILLS, EXPERIENCES, EDUCATION, SOCIALS
```

---

## Key Patterns

- **Static export** — `astro.config.ts` uses Astro's default static output, `outDir: 'out'`, and `trailingSlash: 'always'`. GitHub Pages deploys `/` and `/resume/` from the generated artifact.
- **Hosting boundary** — Keep build-time data fetching and static hosting; SSR adapters and server-side route caches are not part of this implementation.
- **Build-time GitHub data** — `src/pages/index.astro` calls `fetchRepos()` during `bun run build`; the deployed browser page does not call GitHub APIs.
- **Pinned + ledger model** — `src/lib/github.ts` queries the first 100 recently updated public non-fork repos, filters owners and metadata repos, and marks the intersection with pinned names. It preserves pinned order and removes pins from the lower ledger; there is no pagination. `FEATURED_PROJECTS` in `data.ts` is legacy data without a current renderer.
- **Pages URL enrichment** — REST `GET /repos/jonathanperis/{repo}/pages` provides `pagesUrl`; standard `https://jonathanperis.github.io/<repo>/` homepage URLs are fallback Pages links.
- **Fallback data** — `FALLBACK` covers absent tokens and failed/unusable GraphQL fetches. Individual Pages lookup failures preserve fetched repo data and standard Pages homepage fallbacks.
- **Shared profile data** — `src/lib/data.ts` powers the portfolio, resume, and parts of the terminal/JSON-LD. Check presentation literals in `Portfolio.tsx`, `RootLayout.astro`, `resume.astro`, and `JsonLd.astro` when updating profile facts. The separate public PDF has unresolved differences; career reconciliation is deferred by the owner.
- **Terminal easter egg** — Konami code opens an in-page terminal. `runCmd()` in `Portfolio.tsx` handles `help`, `about`, `stack`, `contact`, `neofetch`, `git log`, `ls`, `cat availability.txt`, `whoami`, `pwd`, `date`, `sudo hire me`, `echo`, `clear`, `exit`, and `quit`.
- **SEO** — `RootLayout.astro` derives canonical, Open Graph URL, and English alternate URL from the page canonical path and configured site. Astro generates `sitemap-index.xml` and `sitemap-0.xml`; robots advertises the generated index. `public/sitemap.xml` preserves the old entry point as a compatibility index, without handwritten route entries or timestamps.
- **Documentation status** — `wiki/` is repository Markdown, not a deployed documentation route; GitHub Wiki is disabled. PRODUCT/DESIGN distinguish implemented UI from proposals. Update related docs using the maintenance map above.

---

## Project Structure

```text
jonathanperis.github.io/
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   └── resume.astro
│   ├── components/
│   │   ├── Portfolio.tsx
│   │   ├── Analytics.astro
│   │   └── JsonLd.astro
│   ├── layouts/
│   │   └── RootLayout.astro
│   ├── lib/
│   │   ├── github.ts
│   │   └── data.ts
│   └── styles/
│       └── globals.css
├── public/
│   ├── cv_jonathan_peris.pdf
│   ├── manifest.json
│   ├── robots.txt / sitemap.xml
│   └── favicon.svg / apple-touch-icon.png
├── wiki/
├── astro.config.ts
├── tsconfig.json
├── package.json
└── .github/workflows/
    ├── build-check.yml
    ├── main-release.yml
    └── codeql.yml
```

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `GITHUB_TOKEN` | GitHub API auth for GraphQL repo data and REST Pages URL lookup; provided by Actions |
| `PUBLIC_GA_ID` | GA4 tracking ID consumed by `src/components/Analytics.astro` (`G-35CN95481D` in workflows) |

---

## CI/CD

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `build-check.yml` | Pull requests to `main`, manual dispatch | Frozen Bun install, `bun audit`, `astro check`, Astro build |
| `main-release.yml` | Push to `main`, manual dispatch on `main` | Frozen install, build `out/`, upload artifact, deploy GitHub Pages |
| `codeql.yml` | Push/PR to `main`, Monday 06:00 UTC, manual dispatch | JavaScript/TypeScript and Actions security-and-quality analysis |

- **Renovate:** `renovate.json` inherits the account's shared preset for weekly dependency updates and SHA-pinned Actions; see the deployment guide for policy details
- **Workflow permissions:** Read-only contents by default in build/release; Pages and OIDC writes scoped to the deploy job. CodeQL has security-events write permission. Actions are SHA-pinned, and checkout disables persisted credentials
- **Merge strategy:** Rebase only (squash and merge commits disabled)
- **Branch protection:** Main branch is protected; changes go through PRs
- **Community health files:** CODE_OF_CONDUCT, CONTRIBUTING, SECURITY, and SUPPORT live in the [`.github` repo](https://github.com/jonathanperis/.github); do not duplicate them here

---

## Development Workflow

1. Sync main first: `git fetch origin main && git switch main && git pull --ff-only origin main`
2. Create a descriptive `feature/<slug>` branch from current `main`
3. Make changes and run `bun run lint` and `bun run build`
4. When requested, commit, push the branch, and open a PR targeting `main`
5. Watch PR checks and resolve any failures
6. Rebase-merge when checks/review are green and merge is authorized
7. After an authorized merge, watch `main-release.yml` and verify the live GitHub Pages route(s). Browser UI testing requires explicit user authorization

---

## Repository Conventions

- Use the `gh` CLI for GitHub operations.
- Use Bun, not npm, for install/build commands in this repo.
- Keep README/wiki/AGENTS docs aligned with the Astro source tree (`src/...`) and workflow files.
- Commit messages should use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
