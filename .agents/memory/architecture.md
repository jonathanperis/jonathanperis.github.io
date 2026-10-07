---
name: Portfolio Site Architecture
description: Astro 7 static export from Astro components with small inline scripts, Career Metro Map UI (build-time SVG, CSS-only line filter), GitHub GraphQL/REST build-time repository data, build-time terminal commands, SEO/analytics strategy
type: project
---

Maintained alongside the [architecture guide](../../wiki/architecture.md) and [documentation maintenance map](../../wiki/index.md#keeping-documentation-current). Paths in links below are relative to this memory file.

## Rendering Strategy

- **Astro pages/layouts**: `src/pages/index.astro` fetches repository data at build time and composes `ScrollProgress`, `SiteSign`, `StatusStrip`, the `src/components/sections/` components (`MetroMap`, `StationIndex`, `Connections`, `LineGuide`, `ServiceNotes`, `CustomerInfo`), `SiteFooter`, and `Terminal`; `src/pages/resume.astro` renders the print-optimized resume route.
- **No UI framework runtime**: All markup is server-rendered Astro, including the SVG metro map. Client JavaScript is about 3 KB, inlined: the `StatusStrip.astro` clock, `ScrollProgress.astro` (rAF fallback when `animation-timeline: scroll()` is unsupported), `Terminal.astro`, and the `Analytics.astro` click listener.
- **CSS-only interactivity**: The map legend is a radio group (`#line-all`, `#line-1`…`#line-5`); `:has()` rules in `globals.css` dim `[data-lines]` map and Station Index elements not served by the chosen line. SiteSign roundels are `<label for="line-N">`. Stations link to `#stn-<id>`, repo stops to `#repo-<name>`; targets flash via `:target`. No content depends on JavaScript.
- **Static export**: `astro.config.ts` relies on Astro's default static output, sets `outDir: "out"` and `trailingSlash: "always"`; `main-release.yml` uploads that artifact for GitHub Pages.
- **Hosting boundary**: Keep runtime GitHub API calls, server-side caches, SSR adapters, and UI framework islands outside the current static architecture. Existing background dev-server scripts are documented in the setup guide.

**Why:** Build-time data fetching keeps the deployed site as static HTML/CSS/JS while preserving live GitHub profile/repository data when CI provides `GITHUB_TOKEN`.

**How to apply:** New dynamic repository/profile data should be resolved during `bun run build` through `src/lib/github.ts` or committed static sources in `src/lib/data.ts`; the browser bundle should not depend on runtime GitHub API calls.

## GitHub API Integration

`src/lib/github.ts` fetches repositories with `GITHUB_TOKEN` when available:

- GraphQL `user(login: "jonathanperis").pinnedItems(first: 6, types: REPOSITORY)` supplies the Connections board rows and the map's Side Projects line directly, in pin order, so a pin outside the recent-100 list still renders.
- GraphQL `repositories(first: 100, privacy: PUBLIC, orderBy: { field: UPDATED_AT, direction: DESC }, isFork: false)` supplies the "Later departures" ledger (minus pins). `isPortfolioRepo()` filters `owner.login`, forks, and `EXCLUDE_REPOS` for both lists; there is no pagination.
- REST `GET /repos/jonathanperis/{repo}/pages` enriches repositories with live GitHub Pages URLs (concurrency 6). A homepage under `https://jonathanperis.github.io/<path>` is the fallback Pages URL; the bare origin is ignored.
- Every request uses a 10 s `AbortSignal.timeout`; GraphQL `errors` are logged.
- `FALLBACK` is used when no token exists or the GraphQL fetch fails/is unusable. Individual Pages lookup failures preserve fetched repo data and standard Pages homepage fallbacks.
- `EXCLUDE_REPOS` removes metadata/profile repositories; pinned repos are excluded from the lower ledger to avoid duplicates.

## Data Architecture

`src/lib/data.ts` exports shared static content:

- `YEARS_OF_EXPERIENCE` — `"12+"`, used by metadata, the map title block, resume, and terminal.
- `PROFILE` — name, title, email, structured `address` (locality, region, country, countryCode), derived `location`, site, and GitHub identity.
- `AVAILABILITY` — hiring/engagement status rendered in the status strip, Customer Information, and terminal.
- `ENGINEERING_PRINCIPLES` — rendered as Service Notes advisories.
- `SKILLS` — categorized technology list feeding the Line Guide, map skill ticks, resume, and JSON-LD; `SKILL_GROUPS` — labels for the terminal `stack` command.
- `EXPERIENCES` — professional roles and highlights; `CURRENT_ROLE` — the entry whose period ends with `Present`.
- `EDUCATION` — BTech from UNIESP.
- `SOCIALS` — platform links with display `handle`s (Customer Information) and icons.

`src/lib/metro.ts` layers the map on top: `LINES` 1–8 (1 Career, 2 .NET, 3 Azure, 4 Architecture, 5 Side Projects; 6 Languages, 7 Data, 8 Frontend in the Line Guide only), `MAP_LINES`, `GUIDE_LINES`, and `STATIONS` with hand-placed coordinates. `role(company, periodStart)` looks roles up in `EXPERIENCES` and throws at build time when one is missing; the two 2018–2021 T-Systems roles share a station. `src/lib/metro-geometry.ts` holds the build-time path math.

The same data feeds the homepage sections, resume route, terminal command table, metadata descriptions, and `JsonLd.astro` (employer from `CURRENT_ROLE`, address from `PROFILE.address`). The SiteSign subtitle, map lede, station captions, advisory lines, Customer Information copy, and some terminal strings are presentation literals and need review when facts change. The public CV PDF is a checked-in print of `/resume/`; regenerate it when resume data or layout changes.

## UI Features

- "Career Metro Map" transit-signage design (Vignelli / São Paulo Metrô): paper `#fbfaf6`, ink, black sign bands, line colors `--color-line-1`…`8` in `src/styles/globals.css` with Tailwind CSS 4; roundels for lines 4/6/7/8 use ink numerals for contrast. Details in `DESIGN.md`.
- Self-hosted Overpass and Overpass Mono through the Astro Fonts API (`fonts` in `astro.config.ts`); no runtime Google Fonts request.
- Scroll progress via CSS `animation-timeline: scroll()` in `ScrollProgress.astro`/`globals.css` (a Career-red bar), with a rAF fallback.
- CSS motion-path train rides the Career line once on load (`@supports (offset-path: …)`); pulsing "You are here" ring only without reduced motion. Below 1100px the map scrolls horizontally, starting at "You are here".
- Print-optimized resume at `/resume/` with a small inline "Print / Save as PDF" script.
- Konami-code terminal in `Terminal.astro` as a native `<dialog>` (`showModal()`). Static output comes from `buildCommandTable()` in `src/lib/terminal-commands.ts` at build time, embedded as `<script type="application/json" id="terminal-commands">`; `runCommand()` in `src/lib/terminal.ts` resolves input with `Object.hasOwn` and handles `date`, `echo`, `clear`, `exit`/`quit`. Commands: `help`, `about`, `stack`, `contact`, `neofetch`, `git log`, `ls`, `cat availability.txt`, `whoami`, `pwd`, `date`, `sudo hire me`, `echo`, `clear`, `exit`, and `quit`.

## SEO and Analytics

- `src/layouts/RootLayout.astro` emits canonical, Open Graph (1024x1024 image with alt), Twitter `summary` card, icon, manifest, alternate-language, self-hosted font, and JSON-LD tags. Canonical, Open Graph URL, and English alternate URL share the page-specific URL derived from the configured site.
- `src/components/Analytics.astro` loads Google Analytics 4 only when `PUBLIC_GA_ID` is set and always includes a delegated click listener for `data-track-event`/`data-track-label` attributes.
- Custom events are `cta_click` (`nav_resume`, `info_resume`, `info_pdf`, `info_email`, `resume_print`), `social_click` with a social label, and `project_click` with a repository name. A/B variants and expanded custom events remain proposals.
- Astro generates `sitemap-index.xml` and `sitemap-0.xml`; robots advertises the generated index. `public/sitemap.xml` is a compatibility index pointing to the generated URL list.
- Manifest (theme `#161616`, background `#fbfaf6`) and red "JP" roundel icons, including `icon-192.png`/`icon-512.png`, are published; no service worker/offline implementation is present.

## Documentation Boundary

`wiki/` contains repository Markdown and is not an Astro route. GitHub Wiki is disabled. PRODUCT/DESIGN distinguish implemented behavior from proposed UI and measurement work. Commands, dependency ranges, toolchain pins (`packageManager`, `engines`, `.node-version`), and workflows remain authoritative in `package.json`, `bun.lock`, `.node-version`, and `.github/workflows/`.
