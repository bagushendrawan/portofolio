import {
  Docker,
  Elastic,
  Kubernetes,
  N8n,
  NextJs,
  OpenAI,
  PostgreSQL,
  Python,
} from "developer-icons";
import technologies from "../../../content/technologies.json";

const developerIcons = {
  Python,
  LLM: OpenAI,
  PostgreSQL,
  Docker,
  Elasticsearch: Elastic,
  "Next.js": NextJs,
  Kubernetes,
  N8N: N8n,
};

const localBrandIconClasses: Record<string, string> = {
  LangChain: "tech-logo--langchain",
  LangGraph: "tech-logo--langgraph",
  Qdrant: "tech-logo--qdrant",
};

export function TechLogo({ name }: { name: string }) {
  const DeveloperIcon = developerIcons[name as keyof typeof developerIcons];
  if (DeveloperIcon) {
    return (
      <DeveloperIcon
        className="tech-logo developer-tech-logo"
        size={24}
        aria-hidden="true"
        focusable="false"
      />
    );
  }

  const item = technologies.find((t) => t.name === name);
  return item?.icon ? (
    <img
      className={`tech-logo ${localBrandIconClasses[name] ?? ""}`}
      src={item.icon}
      alt=""
      width="24"
      height="24"
    />
  ) : null;
}
export const tech = technologies.map((t) => t.name);
export const homeTechnologies = technologies
  .filter((t) => t.showOnHome)
  .map((t) => t.name);
