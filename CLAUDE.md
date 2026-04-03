# jonathanperis.github.io — Claude Code Guide

Personal developer portfolio built with Next.js 16, deployed as a static site to GitHub Pages.

**Live:** https://jonathanperis.github.io/

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 16.2 | App Router, static export |
| React 19.2 | Component rendering |
| TypeScript 5 | Type safety |
| Tailwind CSS 4 | Utility-first styling |
| GitHub GraphQL API | Fetch pinned repos at build time |
| Google Analytics 4 | Traffic tracking |

---

## Build Commands

```sh
npm run dev       # Dev server on :3000
npm run build     # Static export to ./out
npm run lint      # ESLint (Next.js web vitals + TypeScript)
npm start         # Production server (local only)
```

---

## Architecture

```
Server Components (RSC)
├── app/page.tsx           # Async: fetches GitHub repos, renders Portfolio
├── app/layout.tsx         # Root: metadata, fonts, GA, JSON-LD
└── app/resume/layout.tsx  # Resume metadata

Client Components ("use client")
├── Portfolio              # Main interactive UI (terminal, typing, scroll)
├── ResumePage             # Print-optimized resume with PDF download
├── Analytics              # GA4 script injection
└── JsonLd                 # Schema.org structured data

Data Layer
├── lib/github.ts          # GraphQL API + fallback repos
└── lib/data.ts            # PROFILE, SKILLS, EXPERIENCES, FEATURED_PROJECTS
```

---

## Key Patterns

- **Static export** — `output: "export"` in next.config.ts, no server at runtime
- **Build-time data fetching** — GitHub API called during `npm run build`
- **Fallback data** — Hardcoded repos in `github.ts` if API fails
- **Terminal easter egg** — CLI emulator with Konami code trigger
- **Typing animation** — Custom `useTyping()` hook for role cycling
- **Print optimization** — Resume page with A4 CSS, black/white media queries
- **SEO** — JSON-LD (Schema.org Person), OG/Twitter meta, sitemap.xml
- **Cache headers** — Static assets: `max-age=31536000, immutable`

---

## Project Structure

```
jonathanperis.github.io/
├── app/
│   ├── page.tsx                # Home page (server component)
│   ├── portfolio.tsx           # Main UI (client component)
│   ├── layout.tsx              # Root layout + metadata
│   ├── globals.css             # Tailwind + custom theme + animations
│   ├── components/
│   │   ├── analytics.tsx       # GA4 integration
│   │   └── json-ld.tsx         # Structured data
│   ├── lib/
│   │   ├── github.ts           # GitHub GraphQL client + fallback
│   │   └── data.ts             # Static profile/skills/experience data
│   └── resume/
│       ├── layout.tsx          # Resume layout
│       └── page.tsx            # Print-optimized resume
├── public/
│   ├── cv_jonathan_peris.pdf   # Downloadable CV
│   ├── manifest.json           # PWA manifest
│   ├── robots.txt / sitemap.xml
│   └── favicon.svg / apple-touch-icon.png
├── next.config.ts              # Static export, cache headers
├── tsconfig.json               # strict, ES2017, @/* alias
├── postcss.config.mjs          # Tailwind CSS v4
└── .github/workflows/deploy.yml # GitHub Pages deploy on push to main
```

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `GITHUB_TOKEN` | GitHub API auth (provided by Actions) |
| `NEXT_PUBLIC_GA_ID` | GA4 tracking ID (G-35CN95481D) |

---

## CI/CD

- **Trigger:** Push to main or manual dispatch
- **Pipeline:** `npm ci` → `npm run build` → Upload `./out` → Deploy to GitHub Pages
- **Dependabot:** Weekly npm + GitHub Actions updates
