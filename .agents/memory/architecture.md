---
name: Portfolio Site Architecture
description: Astro 7 static export, React 19 hydrated portfolio island, GitHub GraphQL/REST build-time repository data, terminal UI theme, SEO/analytics strategy
type: project
---

Maintained alongside the [architecture guide](../../wiki/architecture.md) and [documentation maintenance map](../../wiki/index.md#keeping-documentation-current). Paths in links below are relative to this memory file.

## Rendering Strategy

- **Astro pages/layouts**: `src/pages/index.astro` fetches repository data at build time and renders the React portfolio island with `client:load`; `src/pages/resume.astro` renders the print-optimized resume route.
- **Hydrated React island**: `src/components/Portfolio.tsx` owns the interactive homepage UI, scroll/reveal effects, project workbench, contact actions, and terminal easter egg.
- **Static export**: `astro.config.ts` relies on Astro's default static output, sets `outDir: "out"` and `trailingSlash: "always"`; `main-release.yml` uploads that artifact for GitHub Pages.
- **Hosting boundary**: Keep runtime GitHub API calls, server-side caches, and SSR adapters outside the current static architecture. Existing background dev-server scripts are documented in the setup guide.

**Why:** Build-time data fetching keeps the deployed site as static HTML/CSS/JS while preserving live GitHub profile/repository data when CI provides `GITHUB_TOKEN`.

**How to apply:** New dynamic repository/profile data should be resolved during `bun run build` through `src/lib/github.ts` or committed static sources in `src/lib/data.ts`; the browser bundle should not depend on runtime GitHub API calls.

## GitHub API Integration

`src/lib/github.ts` fetches repositories with `GITHUB_TOKEN` when available:

- GraphQL `user(login: "jonathanperis").pinnedItems(first: 100, types: REPOSITORY)` supplies pin names/order. Only pins also present in the eligible fetched repo list become cards.
- GraphQL `repositories(first: 100, privacy: PUBLIC, orderBy: { field: UPDATED_AT, direction: DESC }, isFork: false)` supplies the recent public repo list. The mapper filters `owner.login`; there is no pagination.
- REST `GET /repos/jonathanperis/{repo}/pages` enriches repositories with live GitHub Pages URLs.
- `FALLBACK` is used when no token exists or the GraphQL fetch fails/is unusable. Individual Pages lookup failures preserve fetched repo data and standard Pages homepage fallbacks.
- `EXCLUDE_REPOS` removes metadata/profile repositories; pinned repos are excluded from the lower ledger to avoid duplicates.

## Data Architecture

`src/lib/data.ts` exports shared static content:

- `PROFILE` — name, title, email, location, site, and GitHub identity.
- `AVAILABILITY` — hiring/engagement status rendered in the portfolio and terminal.
- `OPERATING_SIGNALS` and `ENGINEERING_PRINCIPLES` — hero signals and profile principle rows.
- `SKILLS` — categorized technology list.
- `EXPERIENCES` — professional roles and highlights.
- `FEATURED_PROJECTS` — legacy hand-authored records; the current renderer does not consume them.
- `EDUCATION` — BTech from UNIESP.
- `SOCIALS` — platform links.

The same data feeds the homepage, resume route, some terminal snippets, and `JsonLd.astro`. Hero/terminal copy, page descriptions, JSON-LD employer/address, and other presentation literals also need review when facts change. The independent public CV PDF has unresolved career differences; the owner deferred reconciliation.

## UI Features

- Low-glare dark terminal/workbench aesthetic with Tailwind CSS 4 and custom global styles in `src/styles/globals.css`.
- Scroll progress indicator via `useScrollProgress()`.
- Reveal-on-scroll sections via `useReveal()` and `Reveal`.
- Print-optimized resume at `/resume/`.
- Konami-code terminal overlay with commands handled by `runCmd()` in `Portfolio.tsx`: `help`, `about`, `stack`, `contact`, `neofetch`, `git log`, `ls`, `cat availability.txt`, `whoami`, `pwd`, `date`, `sudo hire me`, `echo`, `clear`, `exit`, and `quit`.

## SEO and Analytics

- `src/layouts/RootLayout.astro` emits canonical, Open Graph, Twitter card, icon, manifest, alternate-language, font, and JSON-LD tags. Canonical, Open Graph URL, and English alternate URL share the page-specific URL derived from the configured site.
- `src/components/Analytics.astro` loads Google Analytics 4 only when `PUBLIC_GA_ID` is set.
- Custom events are `cta_click` with nav/hero labels and `social_click` with a social label. A/B variants and expanded custom events remain proposals.
- Astro generates `sitemap-index.xml` and `sitemap-0.xml`; robots advertises the generated index. `public/sitemap.xml` is a compatibility index pointing to the generated URL list.
- Manifest and icons are published; no service worker/offline implementation is present.

## Documentation Boundary

`wiki/` contains repository Markdown and is not an Astro route. GitHub Wiki is disabled. PRODUCT/DESIGN distinguish implemented behavior from proposed UI and measurement work. Commands, dependency ranges, and workflows remain authoritative in `package.json`, `bun.lock`, and `.github/workflows/`.
