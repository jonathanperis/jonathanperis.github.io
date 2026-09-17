# Dynamic Projects

[← Documentation index](index.md)

## How It Works

During the Astro build, [`src/lib/github.ts`](../src/lib/github.ts) fetches pinned repository metadata and the first 100 recently updated public, non-fork repositories, filters ownership/profile metadata, and attempts to enrich each included entry with a GitHub Pages URL.

The major Workbench cards are the eligible fetched repositories whose names also appear in the `jonathanperis` profile pins. The ledger below them is labeled "Other GitHub repos" and lists the remaining eligible fetched repositories. This is a build-time snapshot; the deployed browser does not call GitHub APIs.

## Data Flow

1. `src/pages/index.astro` calls `fetchRepos()` from `src/lib/github.ts`.
2. The `QUERY` constant requests `pinnedItems(first: 100, types: REPOSITORY)` and `repositories(first: 100, privacy: PUBLIC, orderBy: { field: UPDATED_AT, direction: DESC }, isFork: false)`. Both include `owner { login }` for filtering; the source owns the complete query.
3. The mapper filters eligible nodes, marks matches with pinned names as `pinned: true`, and preserves profile pin order for major cards. Unpinned entries retain recent-update order.
4. For each included repository, `github.ts` also checks the REST Pages endpoint: `GET /repos/jonathanperis/{repo}/pages`.
5. The response is mapped to `GitHubRepo[]` and passed to the React `Portfolio` component.
6. At build time, this data is baked into the static HTML.

## Limits and Ordering

There is no pagination. The repository list is capped at the first 100 API results **before** owner and metadata filtering, so the displayed total may be lower. Pinned results are used to mark/order the fetched list; they are not independently merged into it. A pin outside that list will not become a Workbench card.

`Portfolio.tsx` partitions the result into `pinnedRepos` and `otherRepos`. Legacy `FEATURED_PROJECTS` in `data.ts` does not feed this renderer.

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

| Condition | Result |
|---|---|
| Missing `GITHUB_TOKEN` | Return the checked-in `FALLBACK` list without API requests. |
| GraphQL HTTP failure, missing/empty repository array, or fetch/mapping exception | Return `FALLBACK`; build logs include the failure. |
| Individual Pages lookup returns 404, another non-success status, no URL, or throws | Keep fetched repository data and its standard Pages homepage fallback, if present. |

Fallback content is a maintained snapshot, not a live reflection of current pins, descriptions, or star counts. Token permissions and API availability affect enrichment; the presence of a token does not guarantee every Pages lookup succeeds.

## Updating Projects

To update the live repository ledger:

1. Push or update the target GitHub repository.
   Update profile pins to control major-card selection and order within the eligible fetched list.
2. Enable GitHub Pages on that repo if it should expose a live Pages link.
3. Push any change to this portfolio, or manually run the Pages workflow, so the build fetches fresh GitHub data.

Manual release runs must target `main`; see [Deployment](deployment.md). For local inspection with live data, follow [Getting Started](getting_started.md).
