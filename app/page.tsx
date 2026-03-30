import { fetchPinnedRepos } from "./lib/github";
import Portfolio from "./portfolio";

export default async function Page() {
  const projects = await fetchPinnedRepos();
  return <Portfolio projects={projects} />;
}
