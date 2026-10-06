# Project Structure

[← Documentation index](index.md)

```text
jonathanperis.github.io/
├── src/
│   ├── pages/
│   │   ├── index.astro              # Home page: fetches repos, composes nav, sections, footer, terminal
│   │   └── resume.astro             # Print-optimized resume route
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.astro           # Availability, CTAs, operating signals, deploy-ledger.yaml
│   │   │   ├── Profile.astro        # Profile packet and engineering principles
│   │   │   ├── Capabilities.astro   # Capability map from SKILL_GROUPS
│   │   │   ├── Trace.astro          # Experience timeline
│   │   │   └── Workbench.astro      # Pinned repo cards and "Other GitHub repos" ledger
│   │   ├── Analytics.astro          # GA4 conditional loader + delegated data-track-event clicks
│   │   ├── JsonLd.astro             # Schema.org Person structured data
│   │   ├── Reveal.astro             # Reveal-on-scroll wrapper (IntersectionObserver)
│   │   ├── ScrollProgress.astro     # Scroll-driven progress bar with rAF fallback
│   │   ├── SectionLabel.astro       # Numbered section heading
│   │   ├── SiteFooter.astro         # Footer social links and shell hint
│   │   ├── SiteNav.astro            # Route-style primary navigation
│   │   ├── SocialLink.astro         # Social icon link with social_click tracking
│   │   └── Terminal.astro           # Konami-code <dialog> terminal
│   ├── layouts/
│   │   └── RootLayout.astro         # HTML shell, metadata, self-hosted fonts, JSON-LD, analytics
│   ├── lib/
│   │   ├── data.ts                  # Shared profile, address, availability, experience, skills, socials
│   │   ├── github.ts                # GitHub GraphQL + REST client with fallback repo data
│   │   ├── terminal-commands.ts     # Build-time terminal command table from data.ts
│   │   └── terminal.ts              # Client-side terminal command resolver
│   └── styles/
│       └── globals.css              # Tailwind import, theme tokens, animations, layout styles
├── public/
│   ├── cv_jonathan_peris.pdf        # Independent CV asset; reconciliation deferred
│   ├── manifest.json                # Web app metadata and icons
│   ├── robots.txt                   # Advertises generated sitemap-index.xml
│   ├── sitemap.xml                  # Compatibility index pointing to generated sitemap-0.xml
│   ├── profile-image-sharing.jpeg   # 1024x1024 Open Graph / Twitter share image
│   ├── favicon.svg                  # SVG favicon
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
| `src/lib/data.ts` | Shared profile data — `YEARS_OF_EXPERIENCE`, `PROFILE` (with structured `address` and derived `location`), availability, operating signals, engineering principles, `SKILLS`/`SKILL_GROUPS`, experiences and `CURRENT_ROLE`, education, and socials. Some profile literals also live in presentation components. |
| `src/lib/github.ts` | Fetches up to six pinned repositories and the first 100 recent public non-fork repositories, filters owners/forks/metadata, resolves Pages URLs, and handles GraphQL/Pages fallbacks. |
| `src/components/sections/*.astro` | Home page sections — hero, profile packet, capability map, experience trace, and Workbench project cards — rendered to static HTML. |
| `src/components/Terminal.astro` + `src/lib/terminal*.ts` | Konami-code terminal: build-time command table, native `<dialog>`, and client-side command resolver. |
| `src/pages/resume.astro` | Print-optimized resume page and scoped print CSS. The "Print / Save as PDF" button triggers the browser print dialog. |
| `src/layouts/RootLayout.astro` | Shared page shell with the `html.js` marker script, canonical links, Open Graph/Twitter tags, self-hosted fonts, JSON-LD, manifest, icons, and analytics. |
| `src/styles/globals.css` | Tailwind v4 import plus custom dark theme tokens, grid/scanline effects, cards, timeline, scroll-driven progress, `html.js` reveal states, responsive/reduced-motion rules, and terminal dialog styles. |

Generated `.astro/`, `out/`, and installed `node_modules/` are ignored. `out/` contains both pages, bundled assets, self-hosted font files, copied public files, and generated `sitemap-index.xml`/`sitemap-0.xml`; it is deployed by Actions rather than committed.
