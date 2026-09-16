import technologies from "../../../content/technologies.json";
export function TechLogo({ name }: { name: string }) {
  const item = technologies.find((t) => t.name === name);
  return item?.icon ? (
    <img className="tech-logo" src={item.icon} alt="" width="24" height="24" />
  ) : null;
}
export const tech = technologies.map((t) => t.name);
export const homeTechnologies = technologies
  .filter((t) => t.showOnHome)
  .map((t) => t.name);
