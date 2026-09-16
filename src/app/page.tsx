import Portfolio from "@/components/portfolio/portfolio";
import { getContent } from "@/lib/content";
export default async function Page() {
  const { projects, notes } = await getContent();
  return <Portfolio view="home" projects={projects} notes={notes} />;
}
