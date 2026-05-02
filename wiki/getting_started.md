# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/) v20 or later
- [npm](https://www.npmjs.com/)
- [GitHub CLI](https://cli.github.com/) (`gh`) — for local development with dynamic projects

## Installation

```bash
git clone https://github.com/jonathanperis/jonathanperis.github.io.git
cd jonathanperis.github.io
npm install
```

## Development

### Without dynamic projects (fallback data)

```bash
npm run dev
```

### With dynamic projects (live GitHub data)

```bash
GITHUB_TOKEN=$(gh auth token) npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Produces a static export in the `out/` directory.

### With dynamic projects

```bash
GITHUB_TOKEN=$(gh auth token) npm run build
```

## Lint

```bash
npm run lint
```

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `GITHUB_TOKEN` | No (has fallback) | Fetches pinned repos via GraphQL at build time |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics 4 measurement ID |
