# jonathanperis.github.io - Claude Code Guide

Personal developer portfolio built with Astro 6, React 19, TypeScript 6, and Tailwind CSS 4, deployed as a static site to GitHub Pages.

**Live:** https://jonathanperis.github.io/

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Astro 6 | Static site framework and page routing |
| React 19 | Interactive portfolio and resume components |
| TypeScript 6 | Type safety |
| Tailwind CSS 4 | Utility-first styling |
| GitHub GraphQL API | Fetch pinned repos at build time |
| Google Analytics 4 | Traffic tracking |

---

## Build Commands

```sh
bun run dev       # Astro dev server
bun run build     # Static output to ./out
bun run preview   # Preview built output
bun run lint      # Astro check
```

Use Node 22+ for local builds. The workspace mise default is Node 24, and Astro 6 rejects Node 20.

---

## Architecture

```
src/
├── pages/
│   ├── index.astro        # Fetches GitHub repos, renders Portfolio
│   └── resume.astro       # Resume page shell
├── layouts/
│   └── RootLayout.astro   # Metadata, fonts, global CSS, analytics, JSON-LD
├── components/
│   ├── Portfolio.tsx      # Main interactive UI: hero, terminal, sections
│   ├── Analytics.astro    # GA4 script injection
│   └── JsonLd.astro       # Schema.org structured data
├── lib/
│   ├── github.ts          # GraphQL API plus fallback repos
│   └── data.ts            # Profile, availability, skills, experience, projects
└── styles/
    └── globals.css        # Tailwind import, theme tokens, animations, custom UI
```

---

## Key Patterns

- **Static output** - Astro writes the production site to `out/`.
- **Build-time data fetching** - GitHub API is called during `bun run build`.
- **Fallback data** - Hardcoded repos in `github.ts` are used if the API is unavailable.
- **Terminal easter egg** - CLI emulator with Konami code trigger.
- **Typing animation** - Custom `useTyping()` hook for role cycling.
- **Print optimization** - Resume route has print-friendly styling and PDF support.
- **SEO** - JSON-LD, OG/Twitter metadata, sitemap, and robots files.

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `GITHUB_TOKEN` | GitHub API auth, provided by Actions |
| `PUBLIC_GA_ID` | GA4 tracking ID |

---

## CI/CD

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `build-check.yml` | Pull requests to main | Lint + build validation |
| `main-release.yml` | Push to main / manual dispatch | Build, upload, deploy to GitHub Pages |
| `codeql.yml` | Push, PRs, weekly | JavaScript/TypeScript security scanning |

- **Dependabot:** Weekly npm + GitHub Actions updates
- **Merge strategy:** Rebase only
- **Branch protection:** Main branch is protected, all changes go through PRs
- **Auto-merge:** Enabled for Dependabot PRs

---

## Development Workflow

1. Sync main first: `git fetch origin main && git checkout main && git pull origin main`
2. Create a feature branch from `main`
3. Make changes and push
4. Before opening a PR, fetch and pull main again to ensure no conflicts
5. Open a PR targeting `main`, CI runs lint and build
6. After review and green checks, rebase-merge the PR
7. `main-release.yml` triggers automatically on push to main

---

## Repository Conventions

- **GitHub operations:** Always use `gh` CLI
- **Community health files** live in the [`.github` repo](https://github.com/jonathanperis/.github), do not duplicate them here
- **PR strategy:** Branch + PR for all changes, rebase merge only
- **Commit style:** Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)
