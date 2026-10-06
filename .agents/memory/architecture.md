---
name: Portfolio Site Architecture
description: Astro 7 static export from Astro components with small bundled scripts, GitHub GraphQL/REST build-time repository data, build-time terminal commands, terminal UI theme, SEO/analytics strategy
type: project
---

Maintained alongside the [architecture guide](../../wiki/architecture.md) and [documentation maintenance map](../../wiki/index.md#keeping-documentation-current). Paths in links below are relative to this memory file.

## Rendering Strategy

- **Astro pages/layouts**: `src/pages/index.astro` fetches repository data at build time and composes `ScrollProgress`, `SiteNav`, the `src/components/sections/` components (`Hero`, `Profile`, `Capabilities`, `Trace`, `Workbench`), `SiteFooter`, and `Terminal`; `src/pages/resume.astro` renders the print-optimized resume route.
- **No UI framework runtime**: All markup is server-rendered Astro. Interactivity comes from component `<script>` blocks that Astro bundles and inlines (about 3 KB total): `Reveal.astro` (IntersectionObserver), `ScrollProgress.astro` (rAF fallback when `animation-timeline: scroll()` is unsupported), `Terminal.astro`, and the `Analytics.astro` click listener.
- **Progressive enhancement**: An inline script in `RootLayout.astro` sets `html.js`; reveal content is hidden only under that class, so no-JS visitors see everything. Hero copy is not wrapped in `Reveal`.
- **Static export**: `astro.config.ts` relies on Astro's default static output, sets `outDir: "out"` and `trailingSlash: "always"`; `main-release.yml` uploads that artifact for GitHub Pages.
- **Hosting boundary**: Keep runtime GitHub API calls, server-side caches, SSR adapters, and UI framework islands outside the current static architecture. Existing background dev-server scripts are documented in the setup guide.

**Why:** Build-time data fetching keeps the deployed site as static HTML/CSS/JS while preserving live GitHub profile/repository data when CI provides `GITHUB_TOKEN`.

**How to apply:** New dynamic repository/profile data should be resolved during `bun run build` through `src/lib/github.ts` or committed static sources in `src/lib/data.ts`; the browser bundle should not depend on runtime GitHub API calls.

## GitHub API Integration

`src/lib/github.ts` fetches repositories with `GITHUB_TOKEN` when available:

- GraphQL `user(login: "jonathanperis").pinnedItems(first: 6, types: REPOSITORY)` supplies the Workbench cards directly, in pin order, so a pin outside the recent-100 list still renders.
- GraphQL `repositories(first: 100, privacy: PUBLIC, orderBy: { field: UPDATED_AT, direction: DESC }, isFork: false)` supplies the ledger (minus pins). `isPortfolioRepo()` filters `owner.login`, forks, and `EXCLUDE_REPOS` for both lists; there is no pagination.
- REST `GET /repos/jonathanperis/{repo}/pages` enriches repositories with live GitHub Pages URLs (concurrency 6). A homepage under `https://jonathanperis.github.io/<path>` is the fallback Pages URL; the bare origin is ignored.
- Every request uses a 10 s `AbortSignal.timeout`; GraphQL `errors` are logged.
- `FALLBACK` is used when no token exists or the GraphQL fetch fails/is unusable. Individual Pages lookup failures preserve fetched repo data and standard Pages homepage fallbacks.
- `EXCLUDE_REPOS` removes metadata/profile repositories; pinned repos are excluded from the lower ledger to avoid duplicates.

## Data Architecture

`src/lib/data.ts` exports shared static content:

- `YEARS_OF_EXPERIENCE` — `"12+"`, used by metadata, hero, resume, and terminal.
- `PROFILE` — name, title, email, structured `address` (locality, region, country, countryCode), derived `location`, site, and GitHub identity.
- `AVAILABILITY` — hiring/engagement status rendered in the portfolio and terminal.
- `OPERATING_SIGNALS` and `ENGINEERING_PRINCIPLES` — hero signals and profile principle rows.
- `SKILLS` — categorized technology list; `SKILL_GROUPS` — label/path metadata for the capability map and terminal `stack`.
- `EXPERIENCES` — professional roles and highlights; `CURRENT_ROLE` — the entry whose period ends with `Present`.
- `EDUCATION` — BTech from UNIESP.
- `SOCIALS` — platform links.

The same data feeds the homepage sections, resume route, terminal command table, metadata descriptions, and `JsonLd.astro` (employer from `CURRENT_ROLE`, address from `PROFILE.address`). Hero copy and some terminal strings are still presentation literals and need review when facts change. The independent public CV PDF has unresolved career differences; the owner deferred reconciliation.

## UI Features

- Low-glare dark terminal/workbench aesthetic with Tailwind CSS 4 and custom global styles in `src/styles/globals.css`.
- Self-hosted DM Sans and JetBrains Mono through the Astro Fonts API (`fonts` in `astro.config.ts`); no runtime Google Fonts request.
- Scroll progress via CSS `animation-timeline: scroll()` in `ScrollProgress.astro`/`globals.css`, with a rAF fallback.
- Reveal-on-scroll via `Reveal.astro`; list stagger delays are capped at six steps.
- Print-optimized resume at `/resume/` with a bundled "Print / Save as PDF" script.
- Konami-code terminal in `Terminal.astro` as a native `<dialog>` (`showModal()`). Static output comes from `buildCommandTable()` in `src/lib/terminal-commands.ts` at build time, embedded as `<script type="application/json" id="terminal-commands">`; `runCommand()` in `src/lib/terminal.ts` resolves input with `Object.hasOwn` and handles `date`, `echo`, `clear`, `exit`/`quit`. Commands: `help`, `about`, `stack`, `contact`, `neofetch`, `git log`, `ls`, `cat availability.txt`, `whoami`, `pwd`, `date`, `sudo hire me`, `echo`, `clear`, `exit`, and `quit`.

## SEO and Analytics

- `src/layouts/RootLayout.astro` emits canonical, Open Graph (1024x1024 image with alt), Twitter `summary` card, icon, manifest, alternate-language, self-hosted font, and JSON-LD tags. Canonical, Open Graph URL, and English alternate URL share the page-specific URL derived from the configured site.
- `src/components/Analytics.astro` loads Google Analytics 4 only when `PUBLIC_GA_ID` is set and bundles a delegated click listener for `data-track-event`/`data-track-label` attributes.
- Custom events are `cta_click` (`nav_resume`, `hero_resume`, `hero_linkedin`, `resume_print`) and `social_click` with a social label. A/B variants and expanded custom events remain proposals.
- Astro generates `sitemap-index.xml` and `sitemap-0.xml`; robots advertises the generated index. `public/sitemap.xml` is a compatibility index pointing to the generated URL list.
- Manifest (theme/background `#09090b`) and icons, including `icon-192.png`/`icon-512.png`, are published; no service worker/offline implementation is present.

## Documentation Boundary

`wiki/` contains repository Markdown and is not an Astro route. GitHub Wiki is disabled. PRODUCT/DESIGN distinguish implemented behavior from proposed UI and measurement work. Commands, dependency ranges, toolchain pins (`packageManager`, `engines`, `.node-version`), and workflows remain authoritative in `package.json`, `bun.lock`, `.node-version`, and `.github/workflows/`.
