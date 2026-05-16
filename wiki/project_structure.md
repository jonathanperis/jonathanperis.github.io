# Project Structure

```
jonathanperis.github.io/
├── src/
│   ├── pages/
│   │   ├── index.astro           # Fetches pinned repos, renders Portfolio
│   │   └── resume.astro          # Print-optimized resume route
│   ├── components/
│   │   ├── Portfolio.tsx         # Main interactive UI
│   │   ├── Analytics.astro       # GA4 conditional loader
│   │   └── JsonLd.astro          # Schema.org Person structured data
│   ├── layouts/
│   │   └── RootLayout.astro      # Metadata, fonts, SEO, analytics, JSON-LD
│   ├── lib/
│   │   ├── data.ts               # Profile, availability, skills, experiences, projects
│   │   └── github.ts             # GitHub GraphQL client and fallback data
│   └── styles/
│       └── globals.css           # Theme colors, animations, cards, terminal overlay
├── public/
│   ├── sitemap.xml               # Sitemap for search engines
│   ├── robots.txt                # Crawler directives
│   ├── manifest.json             # PWA manifest
│   ├── favicon.svg               # SVG favicon
│   ├── apple-touch-icon.png      # iOS icon
│   └── cv_jonathan_peris.pdf     # Downloadable CV
├── .github/workflows/
│   ├── build-check.yml           # PR validation
│   ├── main-release.yml          # GitHub Pages deploy
│   └── codeql.yml                # Security analysis
├── astro.config.ts               # Astro integration and output configuration
├── tsconfig.json
├── package.json
└── bun.lock
```

## Key Files

| File | Role |
|---|---|
| `src/lib/data.ts` | All profile data, availability, experiences, skills, education, socials, and featured projects. |
| `src/lib/github.ts` | Fetches pinned repos via GitHub GraphQL API and falls back to hardcoded data if no token is available. |
| `src/components/Portfolio.tsx` | Interactive UI: hero, typing animation, about, experience timeline, project cards, terminal easter egg. |
| `src/pages/resume.astro` | Print-optimized resume route. |
| `src/styles/globals.css` | Theme tokens, dot grid, scroll progress, cursor blink, timeline, cards, terminal overlay. |
