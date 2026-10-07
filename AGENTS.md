# jonathanperis.github.io — AGENTS Guide

Standardized repository instructions for agent harnesses working on this Astro 7 static portfolio (Astro components only, no UI framework runtime), deployed to GitHub Pages.

**Live:** https://jonathanperis.github.io/

**Documentation:** [Index](wiki/index.md) · [Setup](wiki/getting_started.md) · [Deployment](wiki/deployment.md) · [Maintenance map](wiki/index.md#keeping-documentation-current)

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Astro 7 | Static site generation, GitHub Pages export, and background dev server support |
| Astro components + client scripts | Static UI, including a build-time SVG metro map; small inlined `<script>`s for the status clock, scroll-progress fallback, terminal, and analytics events |
| Astro Fonts API | Self-hosted Overpass / Overpass Mono, downloaded at build time |
| TypeScript 6 | Strict type checking through `astro/tsconfigs/strict` |
| Tailwind CSS 4 | Transit-signage ("Career Metro Map") design system via `@tailwindcss/vite` |
| GitHub GraphQL + REST APIs | Build-time repository and GitHub Pages URL discovery |
| Google Analytics 4 | Traffic and CTA event tracking when `PUBLIC_GA_ID` is set |
| Bun | Local and CI package manager/script runner, pinned via `packageManager` |

---

## Build Commands

Use Node.js **22.12.0 or later** (`engines`; `.node-version` pins the CI major) and the Bun version in `packageManager`. If `~/.bun/bin/node` shadows a real Node on `PATH`, `astro build` runs under Bun and fails; put real Node first. [`package.json`](package.json) owns the script definitions; `bun.lock` records resolved dependencies.

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
├── src/pages/index.astro        # Build-time fetchRepos(), composes sign, status strip, sections, footer, terminal
├── src/pages/resume.astro       # Print-optimized resume route (light paper/ink theme)
└── src/layouts/RootLayout.astro # HTML shell, metadata, self-hosted fonts, JSON-LD, analytics

Sections (src/components/sections/), in page order
└── MetroMap · StationIndex · Connections · LineGuide · ServiceNotes · CustomerInfo (.astro)

Astro components (src/components/)
├── SiteSign.astro       # Station-sign header: name, line roundels (map filter labels), nav
├── StatusStrip.astro    # "Good service" strip, availability, live Itanhaém clock
├── RouteBullet.astro    # Colored line roundel
├── SectionHead.astro    # Black section sign with roundel/symbol
├── ScrollProgress.astro # CSS scroll-driven bar, JS fallback
├── Terminal.astro       # Native <dialog> "Control room" terminal + Konami listener
├── SiteFooter.astro     # Diagram note, Konami hint, copyright
├── Analytics.astro      # Conditional GA4 loader + delegated data-track-event clicks
└── JsonLd.astro         # Schema.org Person JSON-LD

Data layer
├── src/lib/github.ts            # GitHub GraphQL + REST client with fallback repo data
├── src/lib/data.ts              # PROFILE, AVAILABILITY, ENGINEERING_PRINCIPLES, SKILLS, SKILL_GROUPS, EXPERIENCES, EDUCATION, SOCIALS
├── src/lib/metro.ts             # LINES 1–8, MAP_LINES, GUIDE_LINES, STATIONS (map coordinates; roles looked up from data.ts)
├── src/lib/metro-geometry.ts    # Build-time SVG path math: offsetPolyline, roundedPath, capsule, tick
├── src/lib/terminal-commands.ts # Build-time terminal command table (from data.ts)
└── src/lib/terminal.ts          # Client terminal runtime: runCommand()
```

---

## Key Patterns

- **Static export** — `astro.config.ts` uses Astro's default static output, `outDir: 'out'`, and `trailingSlash: 'always'`. GitHub Pages deploys `/` and `/resume/` from the generated artifact.
- **Hosting boundary** — Keep build-time data fetching and static hosting; SSR adapters and server-side route caches are not part of this implementation.
- **Astro-native UI** — No UI framework integration. Render markup in `.astro` components and add behavior with small `<script>` blocks (about 3 KB inlined in total: clock, terminal, analytics, scroll-progress fallback); keep client JS small and never make content visibility depend on it.
- **Career Metro Map** — `src/lib/metro.ts` maps the career onto transit lines (1 Career, 2 .NET, 3 Azure, 4 Architecture, 5 Side Projects on the map; 6 Languages, 7 Data, 8 Frontend only in the Line Guide). `STATIONS` hold hand-placed coordinates and look up roles from `EXPERIENCES` with `role(company, periodStart)`, which throws at build time if a role is missing; the two 2018–2021 T-Systems roles share one station. `MetroMap.astro` draws the SVG at build time with `metro-geometry.ts`.
- **CSS-only interactivity** — The map legend is a radio group (`#line-all`, `#line-1`…`#line-5`); `:has()` rules in `globals.css` dim `[data-lines]` elements in the map and Station Index that the chosen line does not serve. SiteSign roundels are `<label for="line-N">`. Map stations link to `#stn-<id>` rows and repo stops to `#repo-<name>` rows, which flash via `:target`. The train (CSS motion path) and "You are here" pulse respect `prefers-reduced-motion`.
- **Build-time GitHub data** — `src/pages/index.astro` calls `fetchRepos()` during `bun run build`; the deployed browser page does not call GitHub APIs.
- **Pinned + ledger model** — `src/lib/github.ts` takes the pinned repos (Connections departures board and the map's Side Projects line) directly from the profile `pinnedItems` (pin order, owned non-forks, metadata repos excluded) and builds the "Later departures" ledger from the first 100 recently updated public non-fork repos minus pins; there is no pagination. Requests time out after 10 s and Pages lookups run six at a time.
- **Pages URL enrichment** — REST `GET /repos/jonathanperis/{repo}/pages` provides `pagesUrl`; standard `https://jonathanperis.github.io/<repo>/` homepage URLs are fallback Pages links.
- **Fallback data** — `FALLBACK` covers absent tokens and failed/unusable GraphQL fetches. Individual Pages lookup failures preserve fetched repo data and standard Pages homepage fallbacks.
- **Shared profile data** — `src/lib/data.ts` powers the portfolio, resume, terminal command table, and JSON-LD (`YEARS_OF_EXPERIENCE`, `PROFILE.address`, and `CURRENT_ROLE` are single sources). Check remaining presentation copy in `src/components/` (sign, status strip, sections) and the station captions in `src/lib/metro.ts` when updating profile facts. `public/cv_jonathan_peris.pdf` is a checked-in print of `/resume/` (headless Chrome, A4); regenerate it after resume or `data.ts` changes (see [Resume Page](wiki/resume_page.md#downloadable-pdf)).
- **Terminal easter egg** — Konami code opens a native `<dialog>` terminal. Static output is built at build time by `buildCommandTable()` (`terminal-commands.ts`); `runCommand()` (`terminal.ts`) resolves own-key commands only and handles `help`, `about`, `stack`, `contact`, `neofetch`, `git log`, `ls`, `cat availability.txt`, `whoami`, `pwd`, `date`, `sudo hire me`, `echo`, `clear`, `exit`, and `quit`.
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
│   │   ├── sections/            # MetroMap, StationIndex, Connections, LineGuide, ServiceNotes, CustomerInfo
│   │   ├── Terminal.astro
│   │   ├── SiteSign.astro / StatusStrip.astro / SiteFooter.astro
│   │   ├── RouteBullet.astro / SectionHead.astro / ScrollProgress.astro
│   │   ├── Analytics.astro
│   │   └── JsonLd.astro
│   ├── layouts/
│   │   └── RootLayout.astro
│   ├── lib/
│   │   ├── github.ts
│   │   ├── data.ts
│   │   ├── metro.ts / metro-geometry.ts
│   │   ├── terminal-commands.ts
│   │   └── terminal.ts
│   └── styles/
│       └── globals.css
├── public/
│   ├── cv_jonathan_peris.pdf    # Checked-in print of /resume/
│   ├── manifest.json
│   ├── robots.txt / sitemap.xml
│   └── favicon.svg / apple-touch-icon.png / icon-192.png / icon-512.png
├── wiki/
├── astro.config.ts
├── tsconfig.json
├── package.json                 # packageManager (Bun) + engines (Node)
├── .node-version
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
| `main-release.yml` | Push to `main`, manual dispatch on `main` | `build` job (read-only) builds and uploads `out/`; `deploy` job publishes GitHub Pages |
| `codeql.yml` | Push/PR to `main`, Monday 06:00 UTC, manual dispatch | JavaScript/TypeScript and Actions security-and-quality analysis |

- **Renovate:** `renovate.json` inherits the account's shared preset for weekly dependency updates and SHA-pinned Actions; see the deployment guide for policy details
- **Workflow permissions:** Read-only contents by default in build/release; Pages and OIDC writes scoped to a deploy job that runs no repository code. CodeQL has security-events write permission. Actions are SHA-pinned, and checkout disables persisted credentials
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
