# Dynamic Projects

[← Documentation index](index.md)

## How It Works

During the Astro build, [`src/lib/github.ts`](../src/lib/github.ts) fetches up to six pinned repositories and the first 100 recently updated public, non-fork repositories, filters ownership/fork/profile metadata, and attempts to enrich each included entry with a GitHub Pages URL.

The major Workbench cards are the eligible `jonathanperis` profile pins, in pin order. The ledger below them is labeled "Other GitHub repos" and lists the remaining eligible recently updated repositories. This is a build-time snapshot; the deployed browser does not call GitHub APIs.

## Data Flow

1. `src/pages/index.astro` calls `fetchRepos()` from `src/lib/github.ts`.
2. The `QUERY` constant requests `pinnedItems(first: 6, types: REPOSITORY)` and `repositories(first: 100, privacy: PUBLIC, orderBy: { field: UPDATED_AT, direction: DESC }, isFork: false)`. Both select the same repository fields, including `owner { login }` and `isFork` for filtering; the source owns the complete query.
3. Eligible pinned nodes become `pinned: true` entries in profile pin order. Eligible recent repositories not among the pins become the ledger, in recent-update order.
4. For each included repository, `github.ts` also checks the REST Pages endpoint: `GET /repos/jonathanperis/{repo}/pages`, with at most six lookups in flight.
5. The response is mapped to `GitHubRepo[]` and passed to `src/components/sections/Workbench.astro`.
6. At build time, this data is rendered into the static HTML.

GraphQL and Pages requests use a 10-second `AbortSignal.timeout`. GraphQL `errors` entries are logged with a `[github]` prefix; partial data is still used when the repository list is present.

## Limits and Ordering

There is no pagination. The ledger is capped at the first 100 API results **before** owner, metadata, and pin filtering, so the displayed total may be lower. Pins come directly from `pinnedItems`, so a pin outside the 100 most recently updated repositories still becomes a Workbench card.

`Workbench.astro` partitions the result into `pinnedRepos` and `otherRepos` by the `pinned` flag.

## Filtering

The repository query excludes forks via `isFork: false`; the shared `isPortfolioRepo()` filter, applied to both pins and recent repositories, also rejects forks and requires `owner.login` to match `jonathanperis` so collaborator repositories do not appear.

The code also excludes repositories that should not appear as Workbench cards or in the ledger:

- `jonathanperis.github.io` — this portfolio repo
- `.github` — organization/profile metadata
- `jonathanperis` — profile/readme metadata

Pinned repositories are removed from the "Other GitHub repos" ledger so they are not duplicated below the major Workbench cards.

## GitHub Pages Links

`pagesUrl` is the preferred live link and comes from the GitHub Pages REST API. If a repo's homepage is a path under `https://jonathanperis.github.io/` (for example `https://jonathanperis.github.io/<repo>/`), that is used as a fallback Pages URL. The bare origin is this portfolio and is ignored.

If a repository has a non-Pages homepage, the UI can show it separately as `homepage`.

## Fallback

| Condition | Result |
|---|---|
| Missing `GITHUB_TOKEN` | Return the checked-in `FALLBACK` list without API requests. |
| GraphQL HTTP failure, missing/empty repository array, or fetch/mapping exception (including the 10 s timeout) | Return `FALLBACK`; build logs include the failure. |
| Individual Pages lookup returns 404, another non-success status, no URL, times out, or throws | Keep fetched repository data and its standard Pages homepage fallback, if present. |

Fallback content is a maintained snapshot (six pinned repositories plus two ledger entries), not a live reflection of current pins, descriptions, or star counts. Token permissions and API availability affect enrichment; the presence of a token does not guarantee every Pages lookup succeeds.

## Updating Projects

To update the live repository ledger:

1. Push or update the target GitHub repository.
   Update profile pins to control major-card selection and order (up to six cards).
2. Enable GitHub Pages on that repo if it should expose a live Pages link.
3. Push any change to this portfolio, or manually run the Pages workflow, so the build fetches fresh GitHub data.

Manual release runs must target `main`; see [Deployment](deployment.md). For local inspection with live data, follow [Getting Started](getting_started.md).
