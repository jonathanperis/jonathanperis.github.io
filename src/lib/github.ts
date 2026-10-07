export type GitHubRepo = {
  title: string;
  description: string;
  url: string;
  lang: string;
  langColor: string;
  stars: number;
  homepageUrl?: string;
  pagesUrl?: string;
  updatedAt?: string;
  pinned?: boolean;
};

const GITHUB_OWNER = "jonathanperis";
const PAGES_ORIGIN = `https://${GITHUB_OWNER}.github.io/`;
const EXCLUDE_REPOS = new Set(["jonathanperis.github.io", ".github", "jonathanperis"]);
const REQUEST_TIMEOUT_MS = 10_000;
const PAGES_LOOKUP_CONCURRENCY = 6;

const FALLBACK: GitHubRepo[] = [
  { title: "cpnucleo", description: "Hands-on .NET 10 project-management learning lab: compare REST/gRPC and EF Core/Dapper with Astro, PostgreSQL, OpenTelemetry, and executable contract tests.", url: "https://github.com/jonathanperis/cpnucleo", lang: "C#", langColor: "#7355dd", stars: 9, homepageUrl: "https://jonathanperis.github.io/cpnucleo/", pagesUrl: "https://jonathanperis.github.io/cpnucleo/", pinned: true },
  { title: "super-mango-editor", description: "C11/raylib platformer and visual level editor. Play in the browser via WebAssembly, build TOML worlds, and learn game development with Sandbox School.", url: "https://github.com/jonathanperis/super-mango-editor", lang: "C", langColor: "#555555", stars: 1, homepageUrl: "https://jonathanperis.github.io/super-mango-editor/", pagesUrl: "https://jonathanperis.github.io/super-mango-editor/", pinned: true },
  { title: "solar-system-simulator", description: "Physics-first orbital mechanics lab in C11 and raylib: native and WebAssembly simulations, reproducible A/B experiments, and a source-backed small-body atlas.", url: "https://github.com/jonathanperis/solar-system-simulator", lang: "C", langColor: "#555555", stars: 0, homepageUrl: "https://jonathanperis.github.io/solar-system-simulator/", pagesUrl: "https://jonathanperis.github.io/solar-system-simulator/", pinned: true },
  { title: "jonlib", description: "Jonlib: graphics and math libraries written in Bend 2, targeting raylib 6.0 parity.", url: "https://github.com/jonathanperis/jonlib", lang: "Python", langColor: "#3572A5", stars: 0, pinned: true },
  { title: "blazor-mudblazor-starter", description: "Local-first .NET 10 learning sandbox for Blazor Server and MudBlazor, with hands-on labs for state, forms, APIs, SQLite, authentication, localization, CSV, and Docker.", url: "https://github.com/jonathanperis/blazor-mudblazor-starter", lang: "C#", langColor: "#7355dd", stars: 2, homepageUrl: "https://jonathanperis.github.io/blazor-mudblazor-starter/docs/", pagesUrl: "https://jonathanperis.github.io/blazor-mudblazor-starter/", pinned: true },
  { title: "speedy-bird-lynx", description: "Flappy Bird-inspired arcade game built with ReactLynx and TypeScript. Android host, Lynx web preview, playable Canvas demo, and Astro docs; iOS source scaffold included. Every pipe makes it faster.", url: "https://github.com/jonathanperis/speedy-bird-lynx", lang: "TypeScript", langColor: "#3178c6", stars: 1, homepageUrl: "https://jonathanperis.github.io/speedy-bird-lynx/", pagesUrl: "https://jonathanperis.github.io/speedy-bird-lynx/", pinned: true },
  { title: "rinha2-back-end-dotnet", description: "High-performance backend for the Rinha de Backend challenge — built with ASP.NET 9, PostgreSQL, Nginx, Native AOT, and Docker", url: "https://github.com/jonathanperis/rinha2-back-end-dotnet", lang: "HTML", langColor: "#e34c26", stars: 3, homepageUrl: "https://jonathanperis.github.io/rinha2-back-end-dotnet/", pagesUrl: "https://jonathanperis.github.io/rinha2-back-end-dotnet/" },
  { title: "rinha4-back-end-c", description: "Rinha de Backend 2026 C implementation with raw HTTP/1, Unix sockets, SCM_RIGHTS load balancing, and exact IVF fraud scoring", url: "https://github.com/jonathanperis/rinha4-back-end-c", lang: "C", langColor: "#555555", stars: 0, homepageUrl: "https://jonathanperis.github.io/rinha4-back-end-c/", pagesUrl: "https://jonathanperis.github.io/rinha4-back-end-c/" },
  { title: "rinha2-back-end-k6", description: "Grafana k6 stress tests for the Rinha de Backend challenge — Dockerized with InfluxDB metrics export", url: "https://github.com/jonathanperis/rinha2-back-end-k6", lang: "JavaScript", langColor: "#f1e05a", stars: 0, homepageUrl: "https://jonathanperis.github.io/rinha2-back-end-k6/", pagesUrl: "https://jonathanperis.github.io/rinha2-back-end-k6/" },
];

const REPO_FIELDS = `
  name
  description
  url
  homepageUrl
  stargazerCount
  updatedAt
  isFork
  owner { login }
  primaryLanguage { name color }
`;

const QUERY = `{
  user(login: "${GITHUB_OWNER}") {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {${REPO_FIELDS}}
      }
    }
    repositories(first: 100, privacy: PUBLIC, orderBy: { field: UPDATED_AT, direction: DESC }, isFork: false) {
      nodes {${REPO_FIELDS}}
    }
  }
}`;

type RepoNode = {
  name: string;
  description: string | null;
  url: string;
  homepageUrl?: string | null;
  stargazerCount: number;
  updatedAt?: string;
  isFork: boolean;
  owner: { login: string };
  primaryLanguage: { name: string; color: string | null } | null;
};

type GraphQLResponse = {
  data?: {
    user?: {
      pinnedItems?: { nodes?: Array<RepoNode | null> };
      repositories?: { nodes?: Array<RepoNode | null> };
    } | null;
  };
  errors?: Array<{ message: string }>;
};

type PagesResponse = {
  html_url?: string;
};

function buildHeaders(token: string) {
  return {
    Authorization: `bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function fetchPagesUrl(repoName: string, token: string): Promise<string | undefined> {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${encodeURIComponent(repoName)}/pages`, {
      headers: buildHeaders(token),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (res.status === 404) return undefined;
    if (!res.ok) {
      console.error(`[github] Pages API responded ${res.status} for ${repoName}`);
      return undefined;
    }

    const pages = (await res.json()) as PagesResponse;
    return pages.html_url || undefined;
  } catch (err) {
    console.error(`[github] Pages lookup failed for ${repoName}:`, err);
    return undefined;
  }
}

/** Runs `task` over `items` with at most `limit` requests in flight, preserving order. */
async function mapWithConcurrency<T, R>(items: T[], limit: number, task: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await task(items[index]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function isPortfolioRepo(n: RepoNode | null): n is RepoNode {
  return !!n && n.owner.login === GITHUB_OWNER && !n.isFork && !EXCLUDE_REPOS.has(n.name);
}

function normalizeRepo(n: RepoNode, pinned: boolean): GitHubRepo {
  const homepageUrl = n.homepageUrl?.trim() || undefined;
  // A homepage under the account Pages origin is a usable fallback Pages link, but the bare origin is this site.
  const isProjectPagesUrl = !!homepageUrl && homepageUrl.startsWith(PAGES_ORIGIN) && homepageUrl.length > PAGES_ORIGIN.length;

  return {
    title: n.name,
    description: n.description || "",
    url: n.url,
    lang: n.primaryLanguage?.name || "",
    langColor: n.primaryLanguage?.color || "#888",
    stars: n.stargazerCount,
    homepageUrl,
    pagesUrl: isProjectPagesUrl ? homepageUrl : undefined,
    updatedAt: n.updatedAt,
    pinned,
  };
}

export async function fetchRepos(): Promise<GitHubRepo[]> {
  const token = import.meta.env.GITHUB_TOKEN;
  if (!token) {
    console.log("[github] No GITHUB_TOKEN — using fallback project data");
    return FALLBACK;
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        ...buildHeaders(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!res.ok) {
      console.error(`[github] API responded ${res.status}`);
      return FALLBACK;
    }

    const json = (await res.json()) as GraphQLResponse;
    if (json.errors?.length) {
      console.error(`[github] GraphQL errors: ${json.errors.map((e) => e.message).join("; ")}`);
    }

    const nodes = json.data?.user?.repositories?.nodes ?? [];

    // Pins come straight from pinnedItems (in pin order), so a pin outside the 100 most recently updated repos still renders.
    const pinned = (json.data?.user?.pinnedItems?.nodes ?? []).filter(isPortfolioRepo).map((n) => normalizeRepo(n, true));
    const pinnedNames = new Set(pinned.map((repo) => repo.title));
    const ledger = nodes
      .filter(isPortfolioRepo)
      .filter((n) => !pinnedNames.has(n.name))
      .map((n) => normalizeRepo(n, false));

    const repos = [...pinned, ...ledger];
    // Pins and the ledger are read independently, so only fall back when neither produced a repo.
    if (repos.length === 0) {
      console.error("[github] No repos found in response");
      return FALLBACK;
    }
    const pagesUrls = await mapWithConcurrency(repos, PAGES_LOOKUP_CONCURRENCY, (repo) => fetchPagesUrl(repo.title, token));

    return repos.map((repo, index) => ({
      ...repo,
      pagesUrl: pagesUrls[index] || repo.pagesUrl,
    }));
  } catch (err) {
    console.error("[github] Fetch failed:", err);
    return FALLBACK;
  }
}
