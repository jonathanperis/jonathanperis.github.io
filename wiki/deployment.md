# Deployment

## GitHub Actions

The site deploys automatically via `.github/workflows/main-release.yml` on pushes to `main` and manual dispatches.

### Pipeline Steps

1. **Checkout** - Clone the repository
2. **Setup mise** - Use the configured Node runtime
3. **Install** - Install Bun dependencies
4. **Build** - `bun run build` with environment variables:
   - `GITHUB_TOKEN` - Fetches pinned repos, auto-provided by GitHub Actions
   - `PUBLIC_GA_ID` - Google Analytics measurement ID
5. **Upload** - Uploads `out/` as the Pages artifact
6. **Deploy** - Deploys to GitHub Pages

### Environment Variables

| Variable | Source | Purpose |
|---|---|---|
| `GITHUB_TOKEN` | `secrets.GITHUB_TOKEN` (auto) | GitHub GraphQL API for pinned repos |
| `PUBLIC_GA_ID` | Repository or workflow configuration | GA4 measurement ID |

## Static Output

Astro generates pure static HTML/CSS/JS in the `out/` directory. No server is required at runtime.

## Manual Build

Use Node 22+ for local builds. The workspace mise default is Node 24, and Astro 6 rejects Node 20.

```bash
/opt/data/.local/bin/mise exec -- bun run build
```

## Domain

The site is served at `https://jonathanperis.github.io` via GitHub Pages with automatic HTTPS.
