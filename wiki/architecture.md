# Architecture

## Overview

The site is a **Next.js 16** static export deployed to **GitHub Pages**. It uses a Server Component / Client Component split to fetch data at build time while keeping all interactive UI client-side.

## Component Architecture

```
app/
├── page.tsx              # Server Component — fetches pinned repos
├── portfolio.tsx          # Client Component — full interactive UI
├── resume/
│   ├── page.tsx           # Client Component — print-optimized resume
│   └── layout.tsx         # Server Component — resume metadata
├── lib/
│   ├── data.ts            # Shared data (single source of truth)
│   └── github.ts          # GitHub GraphQL API client
├── components/
│   ├── analytics.tsx      # Google Analytics 4
│   └── json-ld.tsx        # Schema.org structured data
├── layout.tsx             # Root layout, metadata, fonts, SEO
└── globals.css            # Theme, animations, styles
```

## Data Flow

```
Build Time:
  page.tsx (Server) → github.ts → GitHub GraphQL API
                    → fetches pinned repos
                    → passes to portfolio.tsx as props

Runtime (Static HTML):
  portfolio.tsx (Client) → renders UI with baked-in data
                         → typing animation, scroll effects, terminal
```

## Key Design Decisions

- **Server/Client split** — Data fetching happens at build time (Server Component), UI interactions are client-side
- **Single source of truth** — `lib/data.ts` contains all profile data shared between portfolio and resume
- **Static export** — `output: "export"` in next.config.ts generates pure static HTML for GitHub Pages
- **Graceful fallback** — If `GITHUB_TOKEN` is missing, hardcoded project data is used
