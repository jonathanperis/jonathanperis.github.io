# Project Structure

[← Documentation index](index.md)

```text
jonathanperis.github.io/
├── src/
│   ├── pages/
│   │   ├── index.astro              # Home page: fetches repos, composes sign, status strip, sections, footer, terminal
│   │   └── resume.astro             # Print-optimized resume route
│   ├── components/
│   │   ├── sections/
│   │   │   ├── MetroMap.astro       # Build-time SVG career map, line-filter legend, train, "You are here"
│   │   │   ├── StationIndex.astro   # Experience as stations, newest first, vertical strip map
│   │   │   ├── Connections.astro    # Pinned-repo departures board and "Later departures" ledger
│   │   │   ├── LineGuide.astro      # Skills by line with interchanges
│   │   │   ├── ServiceNotes.astro   # Engineering principles as advisories
│   │   │   └── CustomerInfo.astro   # Contact: availability, email, socials, resume/PDF
│   │   ├── Analytics.astro          # GA4 conditional loader + delegated data-track-event clicks
│   │   ├── JsonLd.astro             # Schema.org Person structured data
│   │   ├── RouteBullet.astro        # Colored line roundel
│   │   ├── ScrollProgress.astro     # Scroll-driven progress bar with rAF fallback
│   │   ├── SectionHead.astro        # Black section sign with roundel or symbol
│   │   ├── SiteFooter.astro         # Diagram note, Konami hint, copyright
│   │   ├── SiteSign.astro           # Station-sign header: name, line roundels, primary navigation
│   │   ├── StatusStrip.astro        # Service status, availability, live local clock
│   │   └── Terminal.astro           # Konami-code <dialog> terminal
│   ├── layouts/
│   │   └── RootLayout.astro         # HTML shell, metadata, self-hosted fonts, JSON-LD, analytics
│   ├── lib/
│   │   ├── data.ts                  # Shared profile, address, availability, experience, skills, socials
│   │   ├── metro.ts                 # Metro lines, stations, map coordinates, interchange helpers
│   │   ├── metro-geometry.ts        # Build-time SVG path math (offsets, rounded corners, capsules, ticks)
│   │   ├── github.ts                # GitHub GraphQL + REST client with fallback repo data
│   │   ├── terminal-commands.ts     # Build-time terminal command table from data.ts
│   │   └── terminal.ts              # Client-side terminal command resolver
│   └── styles/
│       └── globals.css              # Tailwind import, design tokens, route bullets, terminal, line filter
├── public/
│   ├── cv_jonathan_peris.pdf        # Independent CV asset; reconciliation deferred
│   ├── manifest.json                # Web app metadata and icons
│   ├── robots.txt                   # Advertises generated sitemap-index.xml
│   ├── sitemap.xml                  # Compatibility index pointing to generated sitemap-0.xml
│   ├── profile-image-sharing.jpeg   # 1024x1024 Open Graph / Twitter share image
│   ├── favicon.svg                  # SVG favicon (red "JP" roundel)
│   ├── apple-touch-icon.png         # iOS icon
│   ├── icon-192.png / icon-512.png  # Manifest PNG icons
│   └── .nojekyll                    # Disables Jekyll processing on GitHub Pages
├── wiki/                            # Repository documentation; not a deployed route
├── README.md / AGENTS.md             # Project entry point and agent guide
├── PRODUCT.md / DESIGN.md            # Implementation status and proposed enhancements
├── .agents/memory/                  # Concise architecture reference
├── .github/workflows/
│   ├── build-check.yml              # PR check: frozen install + audit + lint + build
│   ├── main-release.yml             # GitHub Pages build job + deploy job on push to main
│   └── codeql.yml                   # JavaScript/TypeScript and Actions analysis
├── renovate.json                    # Extends the shared dependency-update preset
├── astro.config.ts                  # Astro site URL, outDir, sitemap/Tailwind, Fonts API config
├── tsconfig.json                    # Astro strict TS config and @/* alias
├── .node-version                    # Node major for version managers and CI
├── package.json                     # Bun scripts, dependencies, packageManager, engines
└── bun.lock                         # Bun lockfile
```

## Key Files

| File | Role |
|---|---|
| `src/lib/data.ts` | Shared profile data — `YEARS_OF_EXPERIENCE`, `PROFILE` (with structured `address` and derived `location`), availability, engineering principles, `SKILLS`/`SKILL_GROUPS`, experiences and `CURRENT_ROLE`, education, and socials (label, display `handle`, link, icon). Some profile literals also live in presentation components and station captions. |
| `src/lib/metro.ts` | Map vocabulary: `LINES` 1–8, `MAP_LINES`, `GUIDE_LINES`, `STATIONS` with hand-placed coordinates, and helpers. Station roles are looked up in `EXPERIENCES` and fail the build if missing. |
| `src/lib/metro-geometry.ts` | Build-time path math for the SVG map: parallel offsets, rounded corners, interchange capsules, stop ticks. |
| `src/lib/github.ts` | Fetches up to six pinned repositories and the first 100 recent public non-fork repositories, filters owners/forks/metadata, resolves Pages URLs, and handles GraphQL/Pages fallbacks. |
| `src/components/sections/*.astro` | Home page sections — metro map, Station Index, Connections, Line Guide, Service Notes, and Customer Information — rendered to static HTML. |
| `src/components/Terminal.astro` + `src/lib/terminal*.ts` | Konami-code terminal: build-time command table, native `<dialog>`, and client-side command resolver. |
| `src/pages/resume.astro` | Print-optimized resume page and scoped print CSS. The "Print / Save as PDF" button triggers the browser print dialog. |
| `src/layouts/RootLayout.astro` | Shared page shell with theme color, canonical links, Open Graph/Twitter tags, self-hosted fonts, JSON-LD, manifest, icons, and analytics. |
| `src/styles/globals.css` | Tailwind v4 import plus paper/ink/sign tokens and line colors 1–8, route bullets, CSS separator dot (`.dsep`), scroll-driven progress, terminal dialog styles, responsive padding, reduced-motion rules, and the `:has()` line-filter rules. Component-specific styles live in each `.astro` file. |

Generated `.astro/`, `out/`, and installed `node_modules/` are ignored. `out/` contains both pages (client scripts are inlined, so there are no separate JS files), built CSS, self-hosted font files, copied public files, and generated `sitemap-index.xml`/`sitemap-0.xml`; it is deployed by Actions rather than committed.
