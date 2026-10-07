# Architecture

[← Documentation index](index.md)

## Overview

The site is an **Astro 7** static export deployed to **GitHub Pages**. Astro performs build-time data fetching in `src/pages/index.astro`, renders static HTML (including the inline SVG metro map) into `out/`, and ships only small client `<script>`s (status-strip clock, scroll-progress fallback, terminal, analytics click tracking) for browser interactivity. There is no UI framework runtime.

The source tree is built around two Astro pages composed from Astro components. The `wiki/` directory is repository documentation, outside the published route tree.

## Component Architecture

```text
src/
├── pages/
│   ├── index.astro          # Build-time repo fetch; composes sign, status strip, sections, footer, terminal
│   └── resume.astro         # Static resume route with print CSS
├── layouts/
│   └── RootLayout.astro     # Shared document shell, metadata, self-hosted fonts, analytics, JSON-LD
├── components/
│   ├── sections/            # In page order
│   │   ├── MetroMap.astro     # Build-time SVG career map, line-filter legend, train, "You are here"
│   │   ├── StationIndex.astro # EXPERIENCES as stations, newest first, with a vertical strip map
│   │   ├── Connections.astro  # Pinned repos as a departures board + "Later departures" <details>
│   │   ├── LineGuide.astro    # SKILLS by line, with computed interchanges
│   │   ├── ServiceNotes.astro # ENGINEERING_PRINCIPLES as advisories
│   │   └── CustomerInfo.astro # Availability, email, SOCIALS with handles, resume/PDF links
│   ├── SiteSign.astro       # Station-sign header: name, title, line roundels (filter labels), nav
│   ├── StatusStrip.astro    # "Good service", availability, location, live local clock
│   ├── RouteBullet.astro    # Colored line roundel
│   ├── SectionHead.astro    # Black section sign with roundel or symbol slot
│   ├── ScrollProgress.astro # CSS scroll-driven progress bar with rAF fallback
│   ├── SiteFooter.astro     # Diagram note, Konami hint, copyright
│   ├── Terminal.astro       # Konami-code <dialog> terminal ("Control room" console)
│   ├── Analytics.astro      # GA4 scripts when PUBLIC_GA_ID exists + delegated event tracking
│   └── JsonLd.astro         # Schema.org Person JSON-LD from shared data
├── lib/
│   ├── data.ts              # Shared profile/resume/social data
│   ├── metro.ts             # Map vocabulary: LINES, MAP_LINES, GUIDE_LINES, STATIONS, helpers
│   ├── metro-geometry.ts    # Build-time path math for the SVG map
│   ├── github.ts            # GitHub GraphQL + REST build-time data client
│   ├── terminal-commands.ts # Build-time static terminal command table
│   └── terminal.ts          # Client-side command resolver
└── styles/
    └── globals.css          # Tailwind v4, design tokens, route bullets, terminal, line-filter rules
```

## Metro Model

[`src/lib/metro.ts`](../src/lib/metro.ts) adds only map vocabulary; content comes from `data.ts`.

- **Lines** — `LINES` defines lines 1–8: 1 Career, 2 .NET, 3 Azure, 4 Architecture, 5 Side Projects, 6 Languages, 7 Data, 8 Frontend. Skill lines name the `SKILLS` group they carry. `MAP_LINES` (1–5) are drawn on the map; `GUIDE_LINES` (2, 3, 4, 6, 7, 8) appear in the Line Guide. Colors live in `globals.css` (`--color-line-1` … `--color-line-8`).
- **Stations** — `STATIONS` lists stops from origin to terminus with hand-placed coordinates in the map's 1440-wide viewBox, served lines, and a short caption. Each station's roles come from `EXPERIENCES` via `role(company, periodStart)`, which throws during the build if no matching role exists. The two T-Systems do Brasil roles from 2018–2021 merge into one station, so ten roles become nine stations. `TERMINUS` is the last station.
- **Helpers** — `stationPeriod()` spans a station's oldest start to newest end, `stationTags()` merges role tags, and `interchangesFor()` finds skills that sit on more than one Line Guide line (for example Blazor on .NET and Frontend).
- **Geometry** — [`src/lib/metro-geometry.ts`](../src/lib/metro-geometry.ts) provides `offsetPolyline` (parallel lines), `roundedPath` (concentric arc corners), `capsule` (interchange station shapes), and `tick` (stop ticks). It runs only at build time.

`MetroMap.astro` uses the Career route as the reference; .NET and Azure run parallel to it. Azure and Architecture skill ticks come from `SKILLS.cloud` and `SKILLS.architecture`. The Side Projects line carries up to six pinned repositories.

## Data Flow

```text
Build time:
  src/pages/index.astro
    -> fetchRepos() from src/lib/github.ts
    -> GitHub GraphQL: pinnedItems(first: 6) + first 100 recently updated public non-fork repositories
    -> filter owner/fork/metadata repos; pins keep pin order; ledger = recent repos minus pins
    -> GitHub REST: /repos/jonathanperis/{repo}/pages for live Pages URLs (concurrency 6)
    -> whole-list fallback if no token or GraphQL fetch fails/is unusable
    -> preserve fetched data and homepage fallback on individual Pages lookup failures
    -> <MetroMap pins={pins} /> draws pinned repos on the Side Projects line
    -> <Connections projects={projects} /> renders the departures board and "Later departures"
  src/lib/metro.ts + metro-geometry.ts
    -> STATIONS resolve roles from data.ts; SVG paths computed and emitted as static markup
  src/components/Terminal.astro
    -> buildCommandTable() from src/lib/terminal-commands.ts (derived from data.ts)
    -> embedded as <script type="application/json" id="terminal-commands">

Runtime (static HTML + CSS + small inline scripts):
  globals.css           -> line filter via radio inputs + :has(); :target highlights; train/pulse animations
  StatusStrip.astro     -> Intl.DateTimeFormat clock (America/Sao_Paulo), refreshed every 30 s
  ScrollProgress.astro  -> rAF fallback only when animation-timeline: scroll() is unsupported
  Terminal.astro        -> Konami listener, <dialog>.showModal(), runCommand() from src/lib/terminal.ts
  Analytics.astro       -> delegated click listener for data-track-event / data-track-label
```

## Key Design Decisions

- **Astro static export** — [`astro.config.ts`](../astro.config.ts) relies on Astro's default static output, sets `outDir: 'out'` and `trailingSlash: 'always'`; GitHub Pages serves the generated artifact at `/` and `/resume/`.
- **Hosting boundary** — Data fetching belongs to the build. Server adapters and server-side route caches are not part of this static hosting model. Background dev-server commands are documented in [Getting Started](getting_started.md).
- **Zero-framework UI** — Every section is server-rendered Astro markup. Client behavior lives in component `<script>` blocks that Astro processes and inlines (about 3 KB of JavaScript in total, no separate bundled JS files). SEO-critical metadata and the document shell remain Astro-rendered.
- **Interactivity without JavaScript** — The line filter is a radio group in the map legend (`#line-all`, `#line-1` … `#line-5`); `:has()` rules in `globals.css` dim `[data-lines]` elements in the map and Station Index that the chosen line does not serve, and hovering a legend entry previews that line on the map while "All lines" is selected. The SiteSign roundels are `<label for="line-N">` for the same radios. Map stations link to `#stn-<id>` rows and repo stops to `#repo-<name>` rows, which flash via `:target`.
- **Progressive enhancement** — All content is in the HTML; nothing is hidden until a script runs. The status clock is server-rendered as `UTC−3` and upgraded to live local time by script. The train is shown only under `@supports (offset-path: …)`.
- **Build-time failure for map drift** — `role()` in `metro.ts` fails the build if a station references a role that is missing from `data.ts`, instead of drawing a ghost station.
- **Self-hosted fonts** — The Astro Fonts API (`fonts` in `astro.config.ts`, `fontProviders.google()`) downloads Overpass and Overpass Mono at build time; `<Font>` tags in the layout preload the latin subset. There is no runtime request to Google Fonts.
- **Shared content with explicit exceptions** — [`src/lib/data.ts`](../src/lib/data.ts) supplies profile, address, years of experience, availability, engineering principles, skills and skill groups, education, experience, socials (with display handles), and `CURRENT_ROLE`. Terminal command output and JSON-LD are derived from it. The SiteSign subtitle, map lede, station captions in `metro.ts`, Service Notes advisory lines, Customer Information copy, and some terminal strings remain presentation literals; review them when changing facts. The separate CV PDF is not generated from this data.
- **Dynamic-but-build-time projects** — `src/lib/github.ts` fetches GitHub data during `bun run build`; no GitHub API calls happen from the deployed browser page.
- **Layered fallback** — Missing tokens and failed/unusable GraphQL fetches use `FALLBACK`. Failed Pages enrichment preserves the fetched repository and its standard Pages homepage fallback. Authenticated builds depend on live GitHub data; see [Dynamic Projects](dynamic_projects.md) for limits and ordering.
- **Analytics opt-in by environment** — GA4 scripts are emitted only when `PUBLIC_GA_ID` is present; tracked elements declare `data-track-event`/`data-track-label` attributes.
- **Crawler URLs** — The sitemap integration owns the route list; canonical, Open Graph, and English alternate URLs share a page-specific URL derived from the configured site. See [SEO & Analytics](seo_and_analytics.md).
