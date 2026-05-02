# Dynamic Projects

## How It Works

The projects section is **not hardcoded** — it fetches your **pinned repositories** from GitHub at build time using the GraphQL API.

## Data Flow

1. `page.tsx` (Server Component) calls `fetchPinnedRepos()` from `lib/github.ts`
2. `github.ts` sends a GraphQL query to the GitHub API:

```graphql
{
  user(login: "jonathanperis") {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          stargazerCount
          primaryLanguage { name color }
        }
      }
    }
  }
}
```

3. The response is mapped to `PinnedRepo[]` and passed to `portfolio.tsx` as a prop
4. At build time, this data is baked into the static HTML

## Filtering

- `jonathanperis.github.io` (this repo) is automatically excluded from the list
- Only pinned repos are shown — pin/unpin repos on GitHub to control what appears

## Play URLs

Some projects have a "Play in browser" button. This is configured in `github.ts`:

```typescript
const PLAY_URLS: Record<string, string> = {
  "super-mango-game": "https://jonathanperis.github.io/super-mango-game/",
};
```

## Fallback

If `GITHUB_TOKEN` is not available (e.g., local dev without it), hardcoded fallback data is used so the site always builds.

## Updating Projects

To update the projects on the live site:
1. Pin/unpin repos on your GitHub profile
2. Push any change to trigger a deploy
3. The build fetches fresh data from GitHub
