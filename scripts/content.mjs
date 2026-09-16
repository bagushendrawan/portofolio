import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase URL slug");
const projectSchema = z.object({
  id: z.number().int().nonnegative(),
  slug,
  name: z.string().min(1),
  desc: z.string().min(1),
  affiliation: z.string().min(1),
  role: z.string().min(1),
  stack: z.array(z.string()).default([]),
  url: z.string().url().nullable().default(null),
  image: z.string().startsWith("/").nullable().default(null),
  imageAlt: z.string().default(""),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  draft: z.boolean().default(false),
  isPlaceholder: z.boolean().default(false),
});
const noteSchema = z.object({
  id: z.number().int().nonnegative(),
  slug,
  title: z.string().min(1),
  topic: z.string().min(1),
  order: z.number().default(0),
  draft: z.boolean().default(false),
});
async function walk(dir, extension) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const paths = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) paths.push(...(await walk(file, extension)));
    else if (entry.name.endsWith(extension)) paths.push(file);
  }
  return paths.sort();
}
function unique(records, kind) {
  for (const key of ["id", "slug"]) {
    const seen = new Set();
    for (const record of records) {
      if (seen.has(record[key]))
        throw Error(`Duplicate ${kind} ${key}: ${record[key]}`);
      seen.add(record[key]);
    }
  }
}
function parse(schema, data, file) {
  const result = schema.safeParse(data);
  if (!result.success)
    throw Error(`Invalid content: ${file}\n${result.error.message}`);
  return result.data;
}
export async function loadContent(root = process.cwd()) {
  const base = path.join(root, "content");
  const technologies = z
    .array(
      z.object({
        name: z.string().min(1),
        icon: z.string().startsWith("/"),
        showOnHome: z.boolean(),
      }),
    )
    .parse(
      JSON.parse(
        await fs.readFile(path.join(base, "technologies.json"), "utf8"),
      ),
    );
  const projects = await Promise.all(
    (await walk(path.join(base, "projects"), ".json")).map(async (file) =>
      parse(projectSchema, JSON.parse(await fs.readFile(file, "utf8")), file),
    ),
  );
  const notes = await Promise.all(
    (await walk(path.join(base, "notebook"), ".md")).map(async (file) => {
      const { data, content } = matter(await fs.readFile(file, "utf8"));
      return { ...parse(noteSchema, data, file), content };
    }),
  );
  unique(projects, "project");
  unique(notes, "notebook");
  const stackNames = new Set(technologies.map((t) => t.name));
  for (const project of projects) {
    for (const name of project.stack)
      if (!stackNames.has(name))
        throw Error(
          `Unknown stack "${name}" in ${project.slug}; add it to content/technologies.json`,
        );
    if (project.image)
      await fs.access(path.join(root, "public", project.image));
  }
  for (const technology of technologies)
    await fs.access(path.join(root, "public", technology.icon));
  return {
    projects: projects
      .filter((p) => !p.draft)
      .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug)),
    notes: notes
      .filter((n) => !n.draft)
      .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug)),
  };
}
