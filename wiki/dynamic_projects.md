# Dynamic Projects

## How It Works

The Workbench repository data is dynamic. During the Astro build, `src/lib/github.ts` fetches Jonathan's GitHub profile pinned repositories plus owned public, non-fork repositories from GitHub, excludes profile/portfolio metadata repos, and enriches each entry with its live GitHub Pages URL when Pages is enabled.

The major Workbench cards are the repositories currently pinned on the `jonathanperis` GitHub profile. The ledger below them is labeled "Other GitHub repos" and lists the remaining owned public, non-fork repositories.

## Data Flow

1. `src/pages/index.astro` calls `fetchRepos()` from `src/lib/github.ts`.
2. `github.ts` sends a GraphQL query to GitHub for pinned repository items and public repositories ordered by recent update:

```graphql
{
  user(login: "jonathanperis") {
    pinnedItems(first: 100, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
        }
      }
    }
    repositories(first: 100, privacy: PUBLIC, orderBy: { field: UPDATED_AT, direction: DESC }, isFork: false) {
      nodes {
        name
        description
        url
        homepageUrl
        stargazerCount
        updatedAt
        primaryLanguage { name color }
      }
    }
  }
}
```

3. The mapper marks repos that appear in `pinnedItems` as `pinned: true` and preserves the GitHub profile pinned order for the major cards.
4. For each included repository, `github.ts` also checks the REST Pages endpoint: `GET /repos/jonathanperis/{repo}/pages`.
5. The response is mapped to `GitHubRepo[]` and passed to the React `Portfolio` component.
6. At build time, this data is baked into the static HTML.

## Filtering

The GitHub query excludes forks via `isFork: false`; the mapper also requires `owner.login` to match `jonathanperis` so collaborator repositories do not appear.

The code also excludes repositories that should not appear in the public Workbench ledger:

- `jonathanperis.github.io` — this portfolio repo
- `.github` — organization/profile metadata
- `jonathanperis` — profile/readme metadata

Pinned repositories are removed from the "Other GitHub repos" ledger so they are not duplicated below the major Workbench cards.

## GitHub Pages Links

`pagesUrl` is the preferred live link and comes from the GitHub Pages REST API. If a repo uses a standard `https://jonathanperis.github.io/<repo>/` homepage value, that is used as a fallback Pages URL.

If a repository has a non-Pages homepage, the UI can show it separately as `homepage`.

## Fallback

If `GITHUB_TOKEN` is not available, hardcoded fallback data is used so the site always builds locally and in constrained environments.

## Updating Projects

To update the live repository ledger:

1. Push or update the target GitHub repository.
2. Enable GitHub Pages on that repo if it should expose a live Pages link.
3. Push any change to this portfolio, or manually run the Pages workflow, so the build fetches fresh GitHub data.
