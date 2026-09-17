# Project Structure

[← Documentation index](index.md)

```text
jonathanperis.github.io/
├── src/
│   ├── pages/
│   │   ├── index.astro              # Home page: fetches repos, renders Portfolio with client:load
│   │   └── resume.astro             # Print-optimized resume route
│   ├── components/
│   │   ├── Portfolio.tsx            # Main interactive UI, Workbench, terminal easter egg
│   │   ├── Analytics.astro          # GA4 conditional loader (reads PUBLIC_GA_ID)
│   │   └── JsonLd.astro             # Schema.org Person structured data
│   ├── layouts/
│   │   └── RootLayout.astro         # HTML shell, metadata, fonts, JSON-LD, analytics slot
│   ├── lib/
│   │   ├── data.ts                  # Shared profile, availability, experience, skills, socials
│   │   └── github.ts                # GitHub GraphQL + REST client with fallback repo data
│   └── styles/
│       └── globals.css              # Tailwind import, theme tokens, animations, layout styles
├── public/
│   ├── cv_jonathan_peris.pdf        # Independent CV asset; reconciliation deferred
│   ├── manifest.json                # Web app metadata and icons
│   ├── robots.txt                   # Advertises generated sitemap-index.xml
│   ├── sitemap.xml                  # Compatibility index pointing to generated sitemap-0.xml
│   ├── favicon.svg                  # SVG favicon
│   └── apple-touch-icon.png         # iOS icon
├── wiki/                            # Repository documentation; not a deployed route
├── README.md / AGENTS.md             # Project entry point and agent guide
├── PRODUCT.md / DESIGN.md            # Implementation status and proposed enhancements
├── .agents/memory/                  # Concise architecture reference
├── .github/workflows/
│   ├── build-check.yml              # PR check: frozen install + audit + lint + build
│   ├── main-release.yml             # GitHub Pages deploy on push to main
│   └── codeql.yml                   # JavaScript/TypeScript and Actions analysis
├── renovate.json                    # Extends the shared dependency-update preset
├── astro.config.ts                  # Astro site URL, outDir, React/sitemap/Tailwind integrations
├── tsconfig.json                    # Astro strict TS config and @/* alias
├── package.json                     # Bun scripts and dependencies
└── bun.lock                         # Bun lockfile
```

## Key Files

| File | Role |
|---|---|
| `src/lib/data.ts` | Shared profile data — availability, operating signals, engineering principles, experiences, skills, education, socials, and legacy featured-project records. Some profile literals also live in presentation components and metadata. |
| `src/lib/github.ts` | Fetches pinned names and the first 100 recent public non-fork repositories, filters owners/metadata, resolves Pages URLs, and handles GraphQL/Pages fallbacks. |
| `src/components/Portfolio.tsx` | Interactive home UI — hero, profile packet, capability map, experience trace, Workbench project cards, social/contact surface, and terminal easter egg. |
| `src/pages/resume.astro` | Print-optimized resume page and scoped print CSS. The "Download PDF" button triggers the browser print dialog. |
| `src/layouts/RootLayout.astro` | Shared page shell with canonical links, Open Graph/Twitter tags, fonts, JSON-LD, manifest, icons, and analytics. |
| `src/styles/globals.css` | Tailwind v4 import plus custom dark theme tokens, grid/scanline effects, cards, timeline, responsive/reduced-motion rules, and terminal overlay styles. |

Generated `.astro/`, `out/`, and installed `node_modules/` are ignored. `out/` contains both pages, bundled assets, copied public files, and generated `sitemap-index.xml`/`sitemap-0.xml`; it is deployed by Actions rather than committed.
