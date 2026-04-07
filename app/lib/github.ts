export type GitHubRepo = {
  title: string;
  description: string;
  url: string;
  lang: string;
  langColor: string;
  stars: number;
  homepageUrl?: string;
};

const EXCLUDE_REPOS = ["jonathanperis.github.io", "jonathanperis"];

const FALLBACK: GitHubRepo[] = [
  { title: "cpnucleo", description: "Modern .NET sample — clean architecture, testing, DI, and Docker containerization.", url: "https://github.com/jonathanperis/cpnucleo", lang: "C#", langColor: "#178600", stars: 8, homepageUrl: "https://jonathanperis.github.io/cpnucleo/" },
  { title: "super-mango-editor", description: "A classic side-scrolling platformer built with C and SDL2 — playable in the browser via WebAssembly.", url: "https://github.com/jonathanperis/super-mango-editor", lang: "C", langColor: "#555555", stars: 0, homepageUrl: "https://jonathanperis.github.io/super-mango-editor/" },
  { title: "rinha2-back-end-dotnet", description: "High-performance Rinha de Backend challenge in C# with PostgreSQL and Nginx.", url: "https://github.com/jonathanperis/rinha2-back-end-dotnet", lang: "C#", langColor: "#178600", stars: 3, homepageUrl: "https://jonathanperis.github.io/rinha2-back-end-dotnet/" },
  { title: "rinha2-back-end-k6", description: "K6 load testing suite for the Rinha de Backend challenge.", url: "https://github.com/jonathanperis/rinha2-back-end-k6", lang: "JavaScript", langColor: "#f1e05a", stars: 0, homepageUrl: "https://jonathanperis.github.io/rinha2-back-end-k6/" },
  { title: "blazor-mudblazor-starter", description: "Blazor + MudBlazor starter template with pre-configured components.", url: "https://github.com/jonathanperis/blazor-mudblazor-starter", lang: "C#", langColor: "#178600", stars: 1, homepageUrl: "https://jonathanperis.github.io/blazor-mudblazor-starter/" },
  { title: "rinha2-back-end-go", description: "Rinha de Backend in Go — high-performance with PostgreSQL and Nginx.", url: "https://github.com/jonathanperis/rinha2-back-end-go", lang: "Go", langColor: "#00ADD8", stars: 1 },
];

const QUERY = `{
  user(login: "jonathanperis") {
    repositories(first: 100, privacy: PUBLIC, orderBy: { field: UPDATED_AT, direction: DESC }, isFork: false) {
      nodes {
        name
        description
        url
        homepageUrl
        stargazerCount
        primaryLanguage { name color }
      }
    }
  }
}`;

type RepoNode = {
  name: string;
  description: string;
  url: string;
  homepageUrl?: string;
  stargazerCount: number;
  primaryLanguage: { name: string; color: string } | null;
};

export async function fetchRepos(): Promise<GitHubRepo[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.log("[github] No GITHUB_TOKEN — using fallback project data");
    return FALLBACK;
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY }),
      next: { revalidate: false },
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

    return nodes
      .filter((n: RepoNode) => !EXCLUDE_REPOS.includes(n.name))
      .map((n: RepoNode) => ({
        title: n.name,
        description: n.description || "",
        url: n.url,
        lang: n.primaryLanguage?.name || "",
        langColor: n.primaryLanguage?.color || "#888",
        stars: n.stargazerCount,
        homepageUrl: n.homepageUrl || undefined,
      }));
  } catch (err) {
    console.error("[github] Fetch failed:", err);
    return FALLBACK;
  }
}
