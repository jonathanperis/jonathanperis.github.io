# jonathanperis.github.io

Personal portfolio website for **Jonathan Peris** — a senior software engineer specializing in robust, scalable back-end systems and full-stack applications using .NET and modern cloud technologies.

**Live site:** [jonathanperis.github.io](https://jonathanperis.github.io)

---

## About

Source code for my personal portfolio and resume website. It showcases professional experience, open-source projects, technical skills, and social links. Built with a focus on performance, accessibility, and clean design — heavily inspired by [Brittany Chiang's](https://brittanychiang.com/) portfolio.

### Sections

- **About** — Summary of skills and current role
- **Experience** — Full career history from tech support to .NET architecture
- **Projects** — Highlighted open-source repos (cpnucleo, rinha de backend implementations, blazor-mudblazor-starter, super-mango-game)

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
│   ├── layout.tsx       # Root layout with metadata, fonts, and Open Graph config
│   ├── page.tsx         # Main page component (About, Experience, Projects)
│   └── globals.css      # Global styles, custom theme colors, and Tailwind directives
├── public/              # Static assets (CV PDF, favicon, Open Graph image)
├── .github/workflows/
│   └── deploy.yml       # GitHub Actions workflow for GitHub Pages deployment
├── next.config.ts       # Next.js configuration (static export)
├── tsconfig.json        # TypeScript configuration
└── package.json
```

## Deployment

Automatically deployed to [GitHub Pages](https://pages.github.com/) via GitHub Actions on every push to the `master` branch. The workflow builds the Next.js static export and uploads it using the `deploy-pages` action.

## License

Licensed under the **Apache License 2.0** — see the [LICENSE](LICENSE) file for details.
