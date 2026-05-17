---
name: Portfolio Site Architecture
description: Astro 6 static export, React 19 hydrated portfolio island, GitHub GraphQL/REST build-time repository data, terminal UI theme, SEO/analytics strategy
type: project
---

## Rendering Strategy

- **Astro pages/layouts**: `src/pages/index.astro` fetches repository data at build time and renders the React portfolio island with `client:load`; `src/pages/resume.astro` renders the print-optimized resume route.
- **Hydrated React island**: `src/components/Portfolio.tsx` owns the interactive homepage UI, scroll/reveal effects, project workbench, contact actions, and terminal easter egg.
- **Static export**: `astro.config.ts` sets `output: "static"` and `outDir: "out"`; `main-release.yml` uploads that artifact for GitHub Pages.

**Why:** Build-time data fetching keeps the deployed site as static HTML/CSS/JS while preserving live GitHub profile/repository data when CI provides `GITHUB_TOKEN`.

**How to apply:** New dynamic repository/profile data should be resolved during `bun run build` through `src/lib/github.ts` or committed static sources in `src/lib/data.ts`; the browser bundle should not depend on runtime GitHub API calls.

## GitHub API Integration

`src/lib/github.ts` fetches repositories with `GITHUB_TOKEN` when available:

- GraphQL `user(login: OWNER).pinnedItems(first: 6, types: REPOSITORY)` preserves GitHub profile pinned-project order.
- GraphQL `repositories(first: 100, ownerAffiliations: OWNER, privacy: PUBLIC, isFork: false)` builds the owned public repo ledger.
- REST `GET /repos/jonathanperis/{repo}/pages` enriches repositories with live GitHub Pages URLs.
- `FALLBACK_REPOS` keeps local builds and PR checks deterministic when API calls fail or no token is present.
- `EXCLUDED_REPOS` removes metadata/profile repositories; pinned repos are excluded from the lower ledger to avoid duplicates.

## Data Architecture

`src/lib/data.ts` exports shared static content:

- `PROFILE` — name, title, email, location, site, and GitHub identity.
- `AVAILABILITY` — hiring/engagement status rendered in the portfolio and terminal.
- `SKILLS` — categorized technology list.
- `EXPERIENCES` — professional roles and highlights.
- `FEATURED_PROJECTS` — hand-authored project cards.
- `EDUCATION` — BTech from UNIESP.
- `SOCIALS` — platform links.

The same data feeds the homepage, resume route, terminal snippets, and `JsonLd.astro` structured data.

## UI Features

- Low-glare dark terminal/workbench aesthetic with Tailwind CSS 4 and custom global styles in `src/styles/globals.css`.
- Scroll progress indicator via `useScrollProgress()`.
- Reveal-on-scroll sections via `useReveal()` and `Reveal`.
- Print-optimized resume at `/resume/`.
- Konami-code terminal overlay with commands handled by `runCmd()` in `Portfolio.tsx`: `help`, `about`, `stack`, `contact`, `neofetch`, `git log`, `ls`, `cat availability.txt`, `whoami`, `pwd`, `date`, `sudo hire me`, `echo`, `clear`, `exit`, and `quit`.

## SEO and Analytics

- `src/layouts/RootLayout.astro` emits canonical, Open Graph, Twitter card, icon, manifest, alternate-language, font, and JSON-LD tags.
- `src/components/Analytics.astro` loads Google Analytics 4 only when `PUBLIC_GA_ID` is set.
- `public/robots.txt`, `public/sitemap.xml`, `public/manifest.json`, and icon assets are published with the static artifact.
