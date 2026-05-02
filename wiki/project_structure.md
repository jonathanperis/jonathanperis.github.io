# Project Structure

```
jonathanperis.github.io/
├── app/
│   ├── page.tsx                 # Server Component — fetches pinned repos, renders Portfolio
│   ├── portfolio.tsx            # Client Component — main UI (hero, about, experience, projects)
│   ├── layout.tsx               # Root layout: metadata, fonts, SEO, analytics, JSON-LD
│   ├── globals.css              # Theme colors, animations, card/tag/timeline styles
│   ├── resume/
│   │   ├── page.tsx             # Print-optimized resume (shared data from lib/data.ts)
│   │   └── layout.tsx           # Resume page metadata
│   ├── lib/
│   │   ├── data.ts              # Single source of truth: profile, experiences, skills, education
│   │   └── github.ts            # GitHub GraphQL client: fetches pinned repos at build time
│   └── components/
│       ├── analytics.tsx        # GA4 conditional loader (reads NEXT_PUBLIC_GA_ID)
│       └── json-ld.tsx          # Schema.org Person structured data
├── public/
│   ├── sitemap.xml              # Sitemap for search engines
│   ├── robots.txt               # Crawler directives
│   ├── manifest.json            # PWA manifest
│   ├── favicon.svg              # SVG favicon (JP monogram)
│   └── apple-touch-icon.png     # iOS icon
├── .github/workflows/
│   └── deploy.yml               # GitHub Actions: build → GitHub Pages
├── next.config.ts               # Static export, cache headers
├── tsconfig.json
└── package.json
```

## Key Files

| File | Role |
|---|---|
| `lib/data.ts` | All profile data — experiences, skills, education, socials. Shared by portfolio and resume. |
| `lib/github.ts` | Fetches pinned repos via GitHub GraphQL API. Falls back to hardcoded data if no token. |
| `portfolio.tsx` | The entire interactive UI — hero, typing animation, about, experience timeline, project cards, terminal easter egg. |
| `resume/page.tsx` | Print-optimized resume. "Download PDF" button triggers browser print dialog. |
| `globals.css` | Custom theme tokens, dot grid, scroll progress, cursor blink, git timeline, glass cards, terminal overlay. |
