# Deployment

## GitHub Actions

The site deploys automatically via `.github/workflows/deploy.yml` on every push to `master`.

### Pipeline Steps

1. **Checkout** — Clone the repository
2. **Setup Node** — Node.js 20 with npm cache
3. **Setup Pages** — Configure GitHub Pages
4. **Install** — `npm ci`
5. **Build** — `npm run build` with environment variables:
   - `GITHUB_TOKEN` — Fetches pinned repos (auto-provided by GitHub Actions)
   - `NEXT_PUBLIC_GA_ID` — Google Analytics measurement ID
6. **Upload** — Uploads `out/` directory as Pages artifact
7. **Deploy** — Deploys to GitHub Pages

### Environment Variables

| Variable | Source | Purpose |
|---|---|---|
| `GITHUB_TOKEN` | `secrets.GITHUB_TOKEN` (auto) | GitHub GraphQL API for pinned repos |
| `NEXT_PUBLIC_GA_ID` | Hardcoded in workflow | GA4 measurement ID |

## Static Export

Next.js is configured with `output: "export"` which generates pure static HTML/CSS/JS in the `out/` directory. No server required.

## Cache Headers

`next.config.ts` defines aggressive caching for static assets:

```typescript
headers: async () => [
  {
    source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|woff|woff2)",
    headers: [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ],
  },
]
```

## Manual Deploy

To deploy manually:

```bash
GITHUB_TOKEN=$(gh auth token) NEXT_PUBLIC_GA_ID=G-GFK73008MT npm run build
# Then push the out/ directory to GitHub Pages
```

## Domain

The site is served at `https://jonathanperis.github.io` via GitHub Pages with automatic HTTPS.
