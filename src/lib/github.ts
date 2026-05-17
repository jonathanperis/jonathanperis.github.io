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
};

const GITHUB_OWNER = "jonathanperis";
const EXCLUDE_REPOS = new Set(["jonathanperis.github.io", ".github", "jonathanperis"]);

const FALLBACK: GitHubRepo[] = [
  { title: "cpnucleo", description: "Modern .NET sample — clean architecture, testing, DI, and Docker containerization.", url: "https://github.com/jonathanperis/cpnucleo", lang: "C#", langColor: "#178600", stars: 8, homepageUrl: "https://jonathanperis.github.io/cpnucleo/", pagesUrl: "https://jonathanperis.github.io/cpnucleo/" },
  { title: "super-mango-editor", description: "A classic side-scrolling platformer built with C and SDL2 — playable in the browser via WebAssembly.", url: "https://github.com/jonathanperis/super-mango-editor", lang: "C", langColor: "#555555", stars: 0, homepageUrl: "https://jonathanperis.github.io/super-mango-editor/", pagesUrl: "https://jonathanperis.github.io/super-mango-editor/" },
  { title: "rinha4-back-end-dotnet", description: "Rinha de Backend 2025 implementation in .NET with docs and benchmark reports.", url: "https://github.com/jonathanperis/rinha4-back-end-dotnet", lang: "C#", langColor: "#178600", stars: 0, homepageUrl: "https://jonathanperis.github.io/rinha4-back-end-dotnet/", pagesUrl: "https://jonathanperis.github.io/rinha4-back-end-dotnet/" },
  { title: "rinha2-back-end-dotnet", description: "High-performance Rinha de Backend challenge in C# with PostgreSQL and Nginx.", url: "https://github.com/jonathanperis/rinha2-back-end-dotnet", lang: "C#", langColor: "#178600", stars: 3, homepageUrl: "https://jonathanperis.github.io/rinha2-back-end-dotnet/", pagesUrl: "https://jonathanperis.github.io/rinha2-back-end-dotnet/" },
  { title: "rinha2-back-end-k6", description: "K6 load testing suite for the Rinha de Backend challenge.", url: "https://github.com/jonathanperis/rinha2-back-end-k6", lang: "JavaScript", langColor: "#f1e05a", stars: 0, homepageUrl: "https://jonathanperis.github.io/rinha2-back-end-k6/", pagesUrl: "https://jonathanperis.github.io/rinha2-back-end-k6/" },
  { title: "blazor-mudblazor-starter", description: "Blazor + MudBlazor starter template with pre-configured components.", url: "https://github.com/jonathanperis/blazor-mudblazor-starter", lang: "HTML", langColor: "#e34c26", stars: 1, homepageUrl: "https://jonathanperis.github.io/blazor-mudblazor-starter/", pagesUrl: "https://jonathanperis.github.io/blazor-mudblazor-starter/" },
  { title: "rinha4-back-end-c", description: "Rinha de Backend 2025 C implementation with GitHub Pages documentation.", url: "https://github.com/jonathanperis/rinha4-back-end-c", lang: "C", langColor: "#555555", stars: 0, homepageUrl: "https://jonathanperis.github.io/rinha4-back-end-c/", pagesUrl: "https://jonathanperis.github.io/rinha4-back-end-c/" },
  { title: "rinha2-back-end-go", description: "Rinha de Backend in Go — high-performance with PostgreSQL and Nginx.", url: "https://github.com/jonathanperis/rinha2-back-end-go", lang: "PLpgSQL", langColor: "#336790", stars: 1, homepageUrl: "https://jonathanperis.github.io/rinha2-back-end-go/", pagesUrl: "https://jonathanperis.github.io/rinha2-back-end-go/" },
];

const QUERY = `{
  user(login: "${GITHUB_OWNER}") {
    repositories(first: 100, privacy: PUBLIC, orderBy: { field: UPDATED_AT, direction: DESC }, isFork: false) {
      nodes {
        name
        description
        url
        homepageUrl
        stargazerCount
        updatedAt
        owner { login }
        primaryLanguage { name color }
      }
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
  owner: { login: string };
  primaryLanguage: { name: string; color: string } | null;
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
    const res = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${repoName}/pages`, {
      headers: buildHeaders(token),
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

function normalizeRepo(n: RepoNode): GitHubRepo {
  const homepageUrl = n.homepageUrl?.trim() || undefined;

  return {
    title: n.name,
    description: n.description || "",
    url: n.url,
    lang: n.primaryLanguage?.name || "",
    langColor: n.primaryLanguage?.color || "#888",
    stars: n.stargazerCount,
    homepageUrl,
    pagesUrl: homepageUrl?.startsWith(`https://${GITHUB_OWNER}.github.io/`) ? homepageUrl : undefined,
    updatedAt: n.updatedAt,
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
    });

    if (!res.ok) {
      console.error(`[github] API responded ${res.status}`);
      return FALLBACK;
    }

    const json = await res.json();
    const nodes = json?.data?.user?.repositories?.nodes;

    if (!Array.isArray(nodes) || nodes.length === 0) {
      console.error("[github] No repos found in response");
      return FALLBACK;
    }

    const repos = nodes
      .filter((n: RepoNode) => n.owner.login === GITHUB_OWNER && !EXCLUDE_REPOS.has(n.name))
      .map(normalizeRepo);

    const pagesUrls = await Promise.all(repos.map((repo) => fetchPagesUrl(repo.title, token)));

    return repos.map((repo, index) => ({
      ...repo,
      pagesUrl: pagesUrls[index] || repo.pagesUrl,
    }));
  } catch (err) {
    console.error("[github] Fetch failed:", err);
    return FALLBACK;
  }
}
