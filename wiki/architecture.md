# Architecture

## Overview

The site is an **Astro 6** static site deployed to **GitHub Pages**. Astro handles page routing and static generation, while React powers the interactive portfolio and resume components.

## Component Architecture

```
src/
├── pages/
│   ├── index.astro          # Fetches pinned repos and renders Portfolio
│   └── resume.astro         # Resume page shell
├── components/
│   ├── Portfolio.tsx        # Interactive UI: hero, sections, terminal
│   ├── Analytics.astro      # Google Analytics 4
│   └── JsonLd.astro         # Schema.org structured data
├── layouts/
│   └── RootLayout.astro     # Root layout, metadata, fonts, SEO
├── lib/
│   ├── data.ts              # Shared data, content model, project metadata
│   └── github.ts            # GitHub GraphQL API client
└── styles/
    └── globals.css          # Theme, animations, styles
```

## Data Flow

```
Build Time:
  pages/index.astro → lib/github.ts → GitHub GraphQL API
                    → fetches pinned repos or fallback data
                    → passes projects to Portfolio as props

Runtime (Static HTML):
  Portfolio.tsx → renders UI with baked-in data
                → typing animation, scroll effects, terminal, A/B helper
```

## Key Design Decisions

- **Astro static generation** - Data fetching happens at build time and outputs static assets for GitHub Pages.
- **React islands** - Interactive portfolio behavior stays in `Portfolio.tsx`.
- **Single source of truth** - `src/lib/data.ts` contains profile, availability, experience, skills, and project data shared by portfolio and resume.
- **Graceful fallback** - If `GITHUB_TOKEN` is missing, hardcoded project data is used.
