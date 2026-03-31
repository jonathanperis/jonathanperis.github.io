import { fetchRepos } from "./lib/github";
import Portfolio from "./portfolio";

export default async function Page() {
  const projects = await fetchRepos();
  return <Portfolio projects={projects} />;
}
