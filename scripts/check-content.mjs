import { loadContent } from "./content.mjs";
try {
  const { projects, notes } = await loadContent();
  console.log(
    `Content OK: ${projects.length} projects, ${notes.length} notebook lessons. IDs, slugs, schemas, stacks, and local assets validated.`,
  );
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
