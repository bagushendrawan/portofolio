# Bagus Hendrawan — Portfolio

A standalone **Next.js App Router + React + TypeScript** portfolio. Includes the four pages, Fireside dark/light themes, saved theme preference, gentle motion, project filtering and pagination, notebook search, Markdown reading dialogs, resume, and local technology logos.

## Run locally

Use Node.js **22.13+** (Node 22 LTS recommended) and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. For another port:

```bash
npm run dev -- --port 3100
```

## Check and build

```bash
npm run content:check
npm run typecheck
npm run build
npm start
```

`build` uses standard Next.js with webpack for predictable cross-platform builds. No Sites, Cloudflare, Vinext, database, API keys, or account connection is required. `npm start` serves the production build on port 3000.

## Structure

```text
content/
  projects/                 One JSON file per project
  notebook/
    orientation/            Markdown lessons with YAML metadata
    programming-foundation/
  technologies.json         Stack names, local logo paths, homepage visibility
public/
  icon.png                  Personal B logo
  bagus-hendrawan-resume.pdf
  tech/                     Local brand SVGs and source credits
src/
  app/                      Home, projects, notebook, about routes and global styles
  components/
    portfolio/              Portfolio UI and reusable visual components
    ui/                     Dialog, checkbox and button primitives
    theme-provider.tsx
  lib/content.ts            Server-side content entry point
  types/content.ts          Content interfaces
scripts/
  content.mjs               Shared recursive loader and Zod validation
  check-content.mjs         Content validation CLI
 templates/                 Copyable project and lesson examples
```

## Add a project

1. Copy `templates/project.json` to `content/projects/21-my-project.json`.
2. Choose a unique numeric `id` and lowercase hyphenated `slug`.
3. Edit `name`, `desc`, `role`, `affiliation`, and `stack`.
4. Optionally add a screenshot under `public/projects/`, then set `image` to `/projects/my-project.webp` and write meaningful `imageAlt` text.
5. Set `url` to the real website URL, or keep `null` to show the email CTA.
6. Set `featured: true` to include the project in the banner. The first **three** featured projects by `order` appear there.
7. Run `npm run content:check`.

Project filters, counts, and pagination update from the files automatically. Lower `order` values appear first. The filename is for organization; `order` controls display order. `draft: true` hides an entry but still validates it. `isPlaceholder: true` shows the sample-description notice in its dialog. Missing images use the existing concept preview.

Roles and affiliations are unrestricted nonempty strings; their filter options are derived from published projects. Stack names must match entries in `content/technologies.json` exactly. Selecting several stacks matches projects that include **all** selected stacks.

## Add a notebook lesson

1. Copy `templates/notebook.md` anywhere under `content/notebook/`, including a new subfolder.
2. Set a unique `id` and `slug`, a `title`, `topic`, and numeric `order` in the YAML frontmatter.
3. Write the lesson below the closing `---` using Markdown.
4. Run `npm run content:check`.

All subfolders are scanned recursively. Topics are derived from published lesson metadata, so a new topic automatically appears in the topic filter. Search includes the title and full lesson text. Supported Markdown includes headings, lists, links, images, fenced code blocks, blockquotes, and GitHub-style tables and task lists. Raw HTML is not rendered. The title is displayed by the reader dialog, so a top-level `#` heading in the body is hidden to avoid duplication.

Use absolute public image paths such as `![Diagram](/notebook/diagram.png)`. Use external URLs for reference links; Notion-export-relative links do not automatically become application routes. Lessons currently open in dialogs, not individual URL pages.

## Add a technology

Add a local SVG under `public/tech/` and an entry to `content/technologies.json`:

```json
{ "name": "My Stack", "icon": "/tech/my-stack.svg", "showOnHome": true }
```

Use the exact `name` in project `stack` arrays. Logos are monochrome to fit both themes. Brand credits are in `public/tech/SOURCES.txt`.

## Edit personal information and appearance

- Resume: replace `public/bagus-hendrawan-resume.pdf`.
- Social URLs: `src/components/portfolio/social-links.tsx`.
- Hero, biography, contact/footer text, testimonials: `src/components/portfolio/portfolio.tsx`.
- Work history: `src/components/portfolio/experience.tsx`.
- Education: `src/components/portfolio/education.tsx`.
- Theme colors, layout and motion: `src/app/globals.css`.
- Browser title and description: `src/app/layout.tsx`.

The existing 20 project descriptions and testimonials remain illustrative. Replace them before using them as verified case studies or endorsements. The bootcamp detail is still a placeholder. The included PDF contains the original resume contact details.

## Content updates and deployment

Content is read on the server and included when pages are built. During development, refresh the page after editing content (restart the dev server if adding a new file is not detected). For production, rebuild and redeploy after changes. Files are not editable through the website.

Deploy to any host that supports a standard Node.js Next.js application (for example Vercel or a Node server). The config includes content files in Next's output tracing. The project has no authentication; if you deploy it on a public host, it is public unless you configure access controls there.

The ZIP intentionally excludes `node_modules`, `.next`, Git history, credentials, hosting metadata, and build caches. Install dependencies with `npm ci` using the included lockfile.
