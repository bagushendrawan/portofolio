export type PortfolioView = "home" | "projects" | "notebook" | "about";
export interface Project {
  id: number;
  slug: string;
  name: string;
  desc: string;
  affiliation: string;
  role: string;
  stack: string[];
  url: string | null;
  image: string | null;
  imageAlt: string;
  images: string[];
  videos: string[];
  details: string[];
  featured: boolean;
  order: number;
  draft: boolean;
  isPlaceholder: boolean;
}
export interface NotebookEntry {
  id: number;
  slug: string;
  title: string;
  topic: string;
  order: number;
  draft: boolean;
  content: string;
}
