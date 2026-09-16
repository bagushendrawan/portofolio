// Server-side only: keep filesystem reads outside client components.
import { loadContent } from "../../scripts/content.mjs";
export async function getContent() {
  return loadContent();
}
