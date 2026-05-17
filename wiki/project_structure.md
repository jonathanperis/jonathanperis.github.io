# Project Structure

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
│   │   ├── data.ts                  # Single source of truth: profile, availability, experience, skills, socials
│   │   └── github.ts                # GitHub GraphQL + REST client with fallback repo data
│   └── styles/
│       └── globals.css              # Tailwind import, theme tokens, animations, layout styles
├── public/
│   ├── cv_jonathan_peris.pdf        # Downloadable CV asset
│   ├── manifest.json                # PWA manifest
│   ├── robots.txt / sitemap.xml     # SEO crawler files
│   ├── favicon.svg                  # SVG favicon
│   └── apple-touch-icon.png         # iOS icon
├── wiki/                            # Repository wiki Markdown source
├── .github/workflows/
│   ├── build-check.yml              # PR build check: bun install + lint + build
│   ├── main-release.yml             # GitHub Pages deploy on push to main
│   └── codeql.yml                   # JavaScript/TypeScript security analysis
├── astro.config.ts                  # Astro site URL, outDir, React/sitemap/Tailwind integrations
├── tsconfig.json                    # Astro strict TS config and @/* alias
├── package.json                     # Bun scripts and dependencies
└── bun.lock                         # Bun lockfile
```

## Key Files

| File | Role |
|---|---|
| `src/lib/data.ts` | All profile data — availability, operating signals, engineering principles, experiences, skills, education, socials, and legacy featured-project records. Shared by portfolio, resume, and JSON-LD. |
| `src/lib/github.ts` | Fetches profile pinned repositories and owned public non-fork repositories, excludes metadata repos, resolves GitHub Pages URLs, and falls back to hardcoded data when no token is available. |
| `src/components/Portfolio.tsx` | Interactive home UI — hero, profile packet, capability map, experience trace, Workbench project cards, social/contact surface, and terminal easter egg. |
| `src/pages/resume.astro` | Print-optimized resume page. The "Download PDF" button triggers the browser print dialog. |
| `src/layouts/RootLayout.astro` | Shared page shell with canonical links, Open Graph/Twitter tags, fonts, JSON-LD, manifest, icons, and analytics. |
| `src/styles/globals.css` | Tailwind v4 import plus custom dark theme tokens, grid/scanline effects, cards, timeline, resume print styles, and terminal overlay styles. |
