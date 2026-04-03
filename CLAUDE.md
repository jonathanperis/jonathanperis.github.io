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
└── .github/workflows/
    ├── ci.yml                  # PR build check (lint + build)
    ├── deploy.yml              # GitHub Pages deploy on push to main
    └── codeql.yml              # Security analysis (JS/TS)
```

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `GITHUB_TOKEN` | GitHub API auth (provided by Actions) |
| `NEXT_PUBLIC_GA_ID` | GA4 tracking ID (G-35CN95481D) |

---

## CI/CD

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | Pull requests to main | Lint + build validation |
| `deploy.yml` | Push to main / manual dispatch | Build → upload → deploy to GitHub Pages |
| `codeql.yml` | Push, PRs, weekly (Mon 06:00 UTC) | JavaScript/TypeScript security scanning |

- **Dependabot:** Weekly npm + GitHub Actions updates
- **Merge strategy:** Rebase only (squash and merge commits disabled)
- **Branch protection:** Main branch is protected; all changes go through PRs
- **Auto-merge:** Enabled for Dependabot PRs

---

## Development Workflow

1. **Sync main first:** `git fetch origin main && git checkout main && git pull origin main`
2. Create a feature branch from `main`
3. Make changes and push
4. **Before opening a PR:** fetch and pull main again to ensure no conflicts
5. Open a PR targeting `main` — CI runs lint + build automatically
6. After review and green checks, rebase-merge the PR
7. `deploy.yml` triggers automatically on push to main

---

## Repository Conventions

- **GitHub operations:** Always use `gh` CLI
- **Community health files** (CODE_OF_CONDUCT, CONTRIBUTING, SECURITY, SUPPORT) live in the [`.github` repo](https://github.com/jonathanperis/.github) — do not duplicate them here
- **PR strategy:** Branch + PR for all changes, rebase merge only
- **Commit style:** Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)
