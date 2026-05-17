# jonathanperis.github.io — Claude Code Guide

Personal developer portfolio built with Astro 6 and React 19, deployed as a static site to GitHub Pages.

**Live:** https://jonathanperis.github.io/

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Astro 6 | Static site build and GitHub Pages export |
| React 19 | Hydrated interactive portfolio UI |
| TypeScript 6 | Strict type checking through `astro/tsconfigs/strict` |
| Tailwind CSS 4 | Custom low-glare terminal-style design system via `@tailwindcss/vite` |
| GitHub GraphQL + REST APIs | Build-time repository and GitHub Pages URL discovery |
| Google Analytics 4 | Traffic and CTA event tracking when `PUBLIC_GA_ID` is set |
| Bun | Local and CI package manager/script runner |

---

## Build Commands

```sh
bun install       # install dependencies
bun run dev       # Astro dev server on :4321
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

- **Static export** — `astro.config.ts` sets `outDir: 'out'`; GitHub Pages deploys the generated artifact.
- **Build-time GitHub data** — `src/pages/index.astro` calls `fetchRepos()` during `bun run build`; the deployed browser page does not call GitHub APIs.
- **Pinned + ledger model** — `src/lib/github.ts` fetches GitHub profile pinned repos and owned public non-fork repos, excludes metadata repos, preserves pinned order, and removes pinned repos from the lower ledger.
- **Pages URL enrichment** — REST `GET /repos/jonathanperis/{repo}/pages` provides `pagesUrl`; standard `https://jonathanperis.github.io/<repo>/` homepage URLs are fallback Pages links.
- **Fallback data** — Hardcoded repos keep local builds and PR checks working when `GITHUB_TOKEN` is absent.
- **Single profile source** — `src/lib/data.ts` powers the portfolio, resume, terminal snippets, and JSON-LD.
- **Terminal easter egg** — Konami code opens an in-page terminal. `runCmd()` in `Portfolio.tsx` handles `help`, `about`, `stack`, `contact`, `neofetch`, `git log`, `ls`, `cat availability.txt`, `whoami`, `pwd`, `date`, `sudo hire me`, `echo`, `clear`, `exit`, and `quit`.
- **SEO** — `RootLayout.astro` emits canonical, Open Graph, Twitter, icon, manifest, alternate-language, JSON-LD, and font tags; `public/robots.txt` and `public/sitemap.xml` are included.

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
| `build-check.yml` | Pull requests to `main`, manual dispatch | Bun install, `astro check`, Astro build |
| `main-release.yml` | Push to `main`, manual dispatch | Build `out/`, upload artifact, deploy GitHub Pages |
| `codeql.yml` | Push, PRs, weekly Monday 06:00 UTC | JavaScript/TypeScript security scanning |

- **Dependabot:** Weekly npm and GitHub Actions updates
- **Merge strategy:** Rebase only (squash and merge commits disabled)
- **Branch protection:** Main branch is protected; changes go through PRs
- **Community health files:** CODE_OF_CONDUCT, CONTRIBUTING, SECURITY, and SUPPORT live in the [`.github` repo](https://github.com/jonathanperis/.github); do not duplicate them here

---

## Development Workflow

1. Sync main first: `git fetch origin main && git switch main && git pull --ff-only origin main`
2. Create a branch from `main`
3. Make changes and run `bun run lint` and `bun run build`
4. Push the branch and open a PR targeting `main`
5. Watch PR checks and resolve any failures
6. Rebase-merge when checks/review are green and merge is authorized
7. Watch `main-release.yml`, then verify the live GitHub Pages route(s)

---

## Repository Conventions

- Use the `gh` CLI for GitHub operations.
- Use Bun, not npm, for install/build commands in this repo.
- Keep README/wiki/Claude docs aligned with the Astro source tree (`src/...`) and workflow files.
- Commit messages should use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
