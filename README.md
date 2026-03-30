# jonathanperis.github.io

Personal portfolio website for **Jonathan Peris** — a software engineer specializing in .NET and Fintech, building enterprise-grade systems with modern cloud-native technologies.

**Live site:** [jonathanperis.github.io](https://jonathanperis.github.io)

---

## About

Developer-themed portfolio and dynamic resume site. Features a dark terminal aesthetic, scroll animations, typing effects, and an interactive easter egg. Projects section is dynamically fetched from GitHub pinned repos at build time.

### Sections

- **About** — Summary of skills and current role
- **Experience** — Full career history (10 roles) with git-log styling
- **Projects** — Pinned GitHub repos fetched dynamically via GraphQL API
- **Resume** — Print-optimized resume page generated from shared data (`/resume`)

### Social Links

GitHub | LinkedIn | X / Twitter | Instagram | Bluesky

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework with App Router and static export |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling with custom theme |
| [GitHub Pages](https://pages.github.com/) | Static site hosting |
| [GitHub Actions](https://github.com/features/actions) | CI/CD — auto-deploys on push to `master` |
| [GitHub GraphQL API](https://docs.github.com/en/graphql) | Fetches pinned repos at build time |
| [Google Analytics 4](https://analytics.google.com/) | Traffic and engagement analytics |

## Features

- **Dynamic projects** — Pinned repos fetched from GitHub at build time (descriptions, stars, language colors)
- **Dynamic resume** — `/resume` route renders a print-optimized resume from shared data, with a "Download PDF" button
- **Typing animation** — Cycles through roles: Software Engineer, Backend Developer, .NET Architect, DevOps Engineer
- **Scroll animations** — Sections fade in as they enter the viewport
- **Scroll progress bar** — Cyan gradient bar at the top of the page
- **Interactive terminal** — Konami code easter egg (`↑↑↓↓←→←→BA`) opens a fake terminal with commands like `neofetch`, `sudo hire me`, `git log`
- **SEO optimized** — JSON-LD structured data, sitemap, robots.txt, Open Graph, Twitter cards, canonical URLs
- **PWA ready** — Web app manifest with theme colors and icons

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or later
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

```bash
git clone https://github.com/jonathanperis/jonathanperis.github.io.git
cd jonathanperis.github.io
npm install
```

### Development

```bash
npm run dev
```

To enable dynamic GitHub projects locally:

```bash
GITHUB_TOKEN=$(gh auth token) npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site locally.

### Build

```bash
npm run build
```

Produces a static export in the `out/` directory.

### Lint

```bash
npm run lint
```

## Project Structure

```
jonathanperis.github.io/
├── app/
│   ├── page.tsx            # Server Component — fetches pinned repos, renders Portfolio
│   ├── portfolio.tsx       # Client Component — main UI (hero, about, experience, projects)
│   ├── layout.tsx          # Root layout with metadata, fonts, SEO, analytics
│   ├── globals.css         # Global styles, theme colors, animations
│   ├── resume/
│   │   ├── page.tsx        # Print-optimized resume page
│   │   └── layout.tsx      # Resume metadata
│   ├── lib/
│   │   ├── data.ts         # Shared data (profile, experiences, skills, education)
│   │   └── github.ts       # GitHub GraphQL API client for pinned repos
│   └── components/
│       ├── analytics.tsx   # Google Analytics 4 component
│       └── json-ld.tsx     # Schema.org Person structured data
├── public/
│   ├── sitemap.xml         # Sitemap for search engines
│   ├── robots.txt          # Crawler directives
│   ├── manifest.json       # PWA manifest
│   ├── favicon.svg         # SVG favicon
│   └── apple-touch-icon.png
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions — builds with GITHUB_TOKEN and GA4
├── next.config.ts          # Static export config with cache headers
├── tsconfig.json
└── package.json
```

## Deployment

Automatically deployed to [GitHub Pages](https://pages.github.com/) via GitHub Actions on every push to the `master` branch. The workflow:

1. Installs dependencies
2. Builds with `GITHUB_TOKEN` (fetches pinned repos) and `NEXT_PUBLIC_GA_ID` (enables analytics)
3. Uploads static export via `deploy-pages` action

### Environment Variables

| Variable | Where | Purpose |
|---|---|---|
| `GITHUB_TOKEN` | Build time | Fetches pinned repos via GraphQL (auto-provided by GitHub Actions) |
| `NEXT_PUBLIC_GA_ID` | Build time | Google Analytics 4 measurement ID |

## License

Licensed under the **Apache License 2.0** — see the [LICENSE](LICENSE) file for details.
