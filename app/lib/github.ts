export type PinnedRepo = {
  title: string;
  description: string;
  url: string;
  lang: string;
  langColor: string;
  stars: number;
  playUrl?: string;
};

const PLAY_URLS: Record<string, string> = {
  "super-mango-game": "https://jonathanperis.github.io/super-mango-game/",
};

const EXCLUDE_REPOS = ["jonathanperis.github.io"];

const FALLBACK: PinnedRepo[] = [
  { title: "cpnucleo", description: "Modern .NET sample — clean architecture, testing, DI, and Docker containerization.", url: "https://github.com/jonathanperis/cpnucleo", lang: "C#", langColor: "#178600", stars: 8 },
  { title: "super-mango-game", description: "A classic side-scrolling platformer built with C and SDL2 — playable in the browser via WebAssembly.", url: "https://github.com/jonathanperis/super-mango-game", lang: "C", langColor: "#555555", stars: 0, playUrl: "https://jonathanperis.github.io/super-mango-game/" },
  { title: "rinha2-back-end-dotnet", description: "High-performance Rinha de Backend challenge in C# with PostgreSQL and Nginx.", url: "https://github.com/jonathanperis/rinha2-back-end-dotnet", lang: "C#", langColor: "#178600", stars: 3 },
  { title: "blazor-mudblazor-starter", description: "Blazor + MudBlazor starter template with pre-configured components.", url: "https://github.com/jonathanperis/blazor-mudblazor-starter", lang: "C#", langColor: "#178600", stars: 1 },
  { title: "rinha2-back-end-go", description: "Rinha de Backend in Go — high-performance with PostgreSQL and Nginx.", url: "https://github.com/jonathanperis/rinha2-back-end-go", lang: "Go", langColor: "#00ADD8", stars: 1 },
];

const QUERY = `{
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
}`;

export async function fetchPinnedRepos(): Promise<PinnedRepo[]> {
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
    const nodes = json?.data?.user?.pinnedItems?.nodes;

    if (!Array.isArray(nodes) || nodes.length === 0) {
      console.error("[github] No pinned repos found in response");
      return FALLBACK;
    }

    return nodes
      .filter((n: { name: string }) => !EXCLUDE_REPOS.includes(n.name))
      .map((n: { name: string; description: string; url: string; stargazerCount: number; primaryLanguage: { name: string; color: string } | null }) => ({
        title: n.name,
        description: n.description || "",
        url: n.url,
        lang: n.primaryLanguage?.name || "",
        langColor: n.primaryLanguage?.color || "#888",
        stars: n.stargazerCount,
        playUrl: PLAY_URLS[n.name],
      }));
  } catch (err) {
    console.error("[github] Fetch failed:", err);
    return FALLBACK;
  }
}
