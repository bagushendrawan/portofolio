"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sun,
  Moon,
  ArrowUpRight,
  ArrowRight,
  Download,
  Mail,
  Phone,
  Code2,
  BrainCircuit,
  Database,
  Workflow,
  Layers,
  Box,
  BookOpen,
  GraduationCap,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Search,
  Menu,
  X,
  Quote,
  MapPin,
  Terminal,
  Network,
  AudioLines,
  ScanLine,
  Globe,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import type { Project, NotebookEntry, PortfolioView } from "@/types/content";
import { Social } from "./social-links";
import { SectionTitle } from "./section-title";
import { Visual } from "./project-preview";
import { Education } from "./education";
import { Experience } from "./experience";
import { ThemeToggle } from "./theme-toggle";
import { TechLogo, tech, homeTechnologies } from "./tech-logo";
import { Markdown } from "./markdown";
export default function Portfolio({
  view,
  projects,
  notes,
}: {
  view: PortfolioView;
  projects: Project[];
  notes: NotebookEntry[];
}) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !("IntersectionObserver" in window)) return;
    const elements = document.querySelectorAll(
      "main > section, main > .notebook-layout, .experience, .education > div, .footer-grid > div",
    );
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0, rootMargin: "0px 0px -35px 0px" },
    );
    elements.forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight - 35) {
        el.classList.add("reveal");
        observer.observe(el);
      }
    });
    const showAll = () =>
      elements.forEach((el) => el.classList.add("revealed"));
    media.addEventListener("change", showAll);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", showAll);
      elements.forEach((el) => el.classList.remove("reveal", "revealed"));
    };
  }, [view]);
  const [menu, setMenu] = useState(false),
    [roleIndex, setRoleIndex] = useState(0),
    [page, setPage] = useState(1),
    [search, setSearch] = useState(""),
    [role, setRole] = useState("All roles"),
    [aff, setAff] = useState("All affiliations"),
    [stacks, setStacks] = useState<string[]>([]),
    [stackOpen, setStackOpen] = useState(false),
    [selected, setSelected] = useState<Project | null>(null),
    [note, setNote] = useState<NotebookEntry | null>(null),
    [topic, setTopic] = useState("All topics"),
    [slide, setSlide] = useState(0),
    [review, setReview] = useState(0),
    [paused, setPaused] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || paused)
      return;
    const t = setInterval(() => {
      setRoleIndex((v) => (v + 1) % 3);
      setSlide(
        (v) =>
          (v + 1) %
          Math.max(projects.filter((p) => p.featured).slice(0, 3).length, 1),
      );
      setReview((v) => (v + 1) % 3);
    }, 5500);
    return () => clearInterval(t);
  }, [paused, projects]);
  const filtered = projects.filter(
    (p) =>
      (role === "All roles" || p.role === role) &&
      (aff === "All affiliations" || p.affiliation === aff) &&
      (!stacks.length || stacks.every((s) => p.stack.includes(s))) &&
      (p.name + " " + p.desc + " " + p.stack.join(" "))
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  const shown = view === "home" ? projects : filtered;
  const pages = Math.ceil(shown.length / 6);
  const activePage = Math.min(page, Math.max(pages, 1));
  const roles = ["AI Engineer", "Data Scientist", "Full Stack Developer"];
  const banners = projects.filter((p) => p.featured).slice(0, 3);
  const banner = banners[slide % banners.length];
  const reset = () => {
    setSearch("");
    setRole("All roles");
    setAff("All affiliations");
    setStacks([]);
    setPage(1);
  };
  const grid = (
    <>
      <div
        className="project-grid"
        key={[activePage, role, aff, search, stacks.join()].join("-")}
      >
        {shown.slice((activePage - 1) * 6, activePage * 6).map((p) => (
          <button
            className="project-card"
            key={p.id}
            onClick={() => setSelected(p)}
          >
            <Visual p={p} />
            <div className="card-body">
              <span className="card-aff">{p.affiliation}</span>
              <h3>
                {p.name}
                <ArrowUpRight size={19} />
              </h3>
              <p>{p.desc}</p>
              <div className="tags">
                {p.stack.map((s) => (
                  <span key={s}>
                    <TechLogo name={s} />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
      {!shown.length && (
        <div className="empty">
          <Search />
          <h3>No matching projects</h3>
          <p>Try another search or clear the filters.</p>
          <button className="btn" onClick={reset}>
            Clear filters
          </button>
        </div>
      )}
      <div className="pagination">
        <span>
          {shown.length
            ? `${(activePage - 1) * 6 + 1}–${Math.min(activePage * 6, shown.length)} of ${shown.length} projects`
            : "0 projects"}
        </span>
        <div>
          <button
            aria-label="Previous page"
            disabled={activePage === 1}
            onClick={() => setPage(activePage - 1)}
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              className={activePage === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
              aria-label={"Page " + (i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            aria-label="Next page"
            disabled={activePage >= pages}
            onClick={() => setPage(activePage + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
  return (
    <>
      <header className="header">
        <div className="nav-wrap">
          <Link href="/" className="brand">
            <img src="/icon.png" alt="Bagus monogram" />
            <span>
              bagus<span className="accent">.</span>
            </span>
          </Link>
          <nav className={menu ? "open" : ""}>
            {[
              ["Home", "/", "home"],
              ["Projects", "/projects", "projects"],
              ["My Notebook", "/notebook", "notebook"],
              ["About Me", "/about", "about"],
            ].map(([label, href, key]) => (
              <Link
                className={view === key ? "current" : ""}
                key={key}
                href={href}
              >
                {label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <a
            className="btn resume"
            href="/bagus-hendrawan-resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            My Resume <Download size={15} />
          </a>
          <button
            className="mobile-toggle"
            aria-label="Toggle navigation"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main key={view} className="page-enter">
        {view === "home" && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <p className="eyebrow">IDEAS. INTELLIGENCE. IMPACT.</p>
                <h1>
                  Hi, I'm Bagus<span className="accent">.</span>
                  <br />
                  <span className="role" key={roleIndex}>
                    {roles[roleIndex]}
                  </span>
                </h1>
                <p className="hero-sub">
                  I turn complex problems into
                  <br />
                  <strong>practical, intelligent experiences.</strong>
                </p>
                <p className="hero-description">
                  Specializing in agentic AI, multimodal systems, and the web.
                  <br />
                  From the first idea to something people actually use.
                </p>
                <div className="hero-actions">
                  <a
                    className="btn primary"
                    href="mailto:bagushendrawan01@gmail.com"
                  >
                    Contact Me <ArrowUpRight size={17} />
                  </a>
                  <Link className="btn" href="/projects">
                    View My Projects <ArrowRight size={17} />
                  </Link>
                </div>
                <Social />
              </div>
              <div className="hero-art">
                <span className="art-index">BH / PERSONAL PORTFOLIO</span>
                <img
                  src="/icon.png"
                  alt="Bagus Hendrawan's orange B circuit monogram"
                />
                <div className="code-note">
                  <span>
                    <i /> building with purpose
                  </span>
                  <code>
                    <em>const</em> bagus = {"{"}
                    <br />
                    &nbsp; focus: <b>"AI Engineer"</b>,<br />
                    &nbsp; mindset: <b>"always learning"</b>
                    <br />
                    {"}"};
                  </code>
                </div>
                <span className="art-caption">
                  Human curiosity. Machine intelligence.
                </span>
              </div>
            </section>
            <section className="tech-section">
              <p className="eyebrow">TECHNOLOGIES I WORK WITH</p>
              <div className="tech-list">
                {homeTechnologies.map((s) => (
                  <div key={s}>
                    <TechLogo name={s} />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </section>
            <section className="about-summary section">
              <div>
                <p className="eyebrow">A LITTLE ABOUT ME</p>
                <h2>
                  Curious by nature.
                  <br />
                  An engineer by craft.
                </h2>
                <p>
                  I'm Bagus Hendrawan, an AI Engineer based in Malaysia. I
                  connect data, intelligent systems, and thoughtful design to
                  build solutions that make a difference.
                </p>
                <Link className="text-link" href="/about">
                  Learn More About Me <ArrowUpRight size={17} />
                </Link>
              </div>
              <div className="stats">
                <div>
                  <Briefcase />
                  <strong>
                    2<span>+</span>
                  </strong>
                  <span>Years of experience</span>
                </div>
                <div>
                  <Code2 />
                  <strong>{projects.length}</strong>
                  <span>Projects & explorations</span>
                </div>
                <div>
                  <BrainCircuit />
                  <strong>
                    3<span>+</span>
                  </strong>
                  <span>Enterprise AI solutions</span>
                </div>
                <div>
                  <BookOpen />
                  <strong>{notes.length}</strong>
                  <span>Notebook lessons</span>
                </div>
              </div>
            </section>
            <section className="section education-section">
              <SectionTitle
                eyebrow="FOUNDATIONS & NEW PERSPECTIVES"
                title="Always a student."
              />
              <Education />
            </section>
            <Experience />
            <section className="section">
              <SectionTitle
                eyebrow="SELECTED WORK"
                title="Ideas, brought to life."
              >
                <Link className="text-link" href="/projects">
                  Explore all projects <ArrowUpRight size={17} />
                </Link>
              </SectionTitle>
              {grid}
            </section>
          </>
        )}
        {view === "projects" && (
          <>
            <section className="page-intro">
              <p className="eyebrow">THE WORK & THE EXPLORATIONS</p>
              <h1>
                Built with purpose<span className="accent">.</span>
              </h1>
              <p>AI systems, data stories, and web experiences.</p>
            </section>
            {banner && (
              <section
                className="feature-banner"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <div>
                  <p className="eyebrow">FEATURED PROJECT / 0{slide + 1}</p>
                  <h2>{banner.name}</h2>
                  <p>{banner.desc}</p>
                  <button
                    className="btn primary"
                    onClick={() => setSelected(banner)}
                  >
                    Explore project <ArrowUpRight size={17} />
                  </button>
                  <div className="dots">
                    {banners.map((p, i) => (
                      <button
                        key={p.id}
                        aria-label={"Show " + p.name}
                        className={slide === i ? "active" : ""}
                        onClick={() => {
                          setSlide(i);
                          setPaused(true);
                        }}
                      />
                    ))}
                  </div>
                </div>
                <Visual key={slide} p={banner} large />
              </section>
            )}
            <section className="section">
              <SectionTitle
                eyebrow="PROJECT INDEX"
                title="Explore the collection."
              />
              <div className="filters">
                <label className="search">
                  <Search size={18} />
                  <input
                    placeholder="Search projects..."
                    aria-label="Search projects"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                  />
                </label>
                <label className="filter-select">
                  Role
                  <select
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                      setPage(1);
                    }}
                  >
                    {["All roles", ...new Set(projects.map((p) => p.role))].map(
                      (s) => (
                        <option key={s}>{s}</option>
                      ),
                    )}
                  </select>
                </label>
                <div className="stack-filter">
                  <button
                    className="btn"
                    aria-expanded={stackOpen}
                    onClick={() => setStackOpen(!stackOpen)}
                  >
                    Stack {stacks.length ? `(${stacks.length})` : "⌄"}
                  </button>
                  {stackOpen && (
                    <div className="stack-pop">
                      {tech.map((s) => (
                        <label key={s}>
                          <Checkbox
                            checked={stacks.includes(s)}
                            onCheckedChange={(v) => {
                              setStacks(
                                v
                                  ? [...stacks, s]
                                  : stacks.filter((t) => t !== s),
                              );
                              setPage(1);
                            }}
                          />
                          {s}
                        </label>
                      ))}
                      <button
                        className="text-link"
                        onClick={() => setStackOpen(false)}
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
                <label className="filter-select">
                  Affiliation
                  <select
                    value={aff}
                    onChange={(e) => {
                      setAff(e.target.value);
                      setPage(1);
                    }}
                  >
                    {[
                      "All affiliations",
                      ...new Set(projects.map((p) => p.affiliation)),
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <button className="text-link" onClick={reset}>
                  Reset
                </button>
              </div>
              {stacks.length > 0 && (
                <div className="tags selected-tags">
                  {stacks.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStacks(stacks.filter((t) => t !== s))}
                    >
                      {s} ×
                    </button>
                  ))}
                </div>
              )}
              {grid}
              <p className="fine-print">
                Project descriptions and concept previews are illustrative.
                Detailed case studies are being prepared.
              </p>
            </section>
          </>
        )}
        {view === "notebook" && (
          <>
            <section className="page-intro notebook-intro">
              <div>
                <p className="eyebrow">LEARN. BUILD. WRITE. REPEAT.</p>
                <h1>
                  My Notebook<span className="accent">.</span>
                </h1>
                <p>
                  A growing collection of notes from my AI engineering journey.
                </p>
              </div>
              <BookOpen size={90} strokeWidth={1} />
            </section>
            <div className="notebook-layout section">
              <aside>
                <p className="eyebrow">LEARNING PATH</p>
                {["All topics", ...new Set(notes.map((n) => n.topic))].map(
                  (t, i) => (
                    <button
                      key={t}
                      className={topic === t ? "active" : ""}
                      onClick={() => setTopic(t)}
                    >
                      <span>{i === 0 ? "↗" : "0" + (i - 1)}</span>
                      {t}
                    </button>
                  ),
                )}
                <div className="notebook-note">
                  <Terminal />
                  <h3>Learning in public.</h3>
                  <p>
                    Real notes, small discoveries, and practical examples. A
                    notebook, always in progress.
                  </p>
                </div>
              </aside>
              <div>
                <label className="search notebook-search">
                  <Search size={18} />
                  <input
                    placeholder="Search topics, notes, or code..."
                    aria-label="Search notebook"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </label>
                <div className="notebook-heading">
                  <h2>
                    {topic === "All topics" ? "The learning collection" : topic}
                  </h2>
                  <span>
                    {
                      notes.filter(
                        (n) =>
                          (topic === "All topics" || n.topic === topic) &&
                          (n.title + " " + n.content)
                            .toLowerCase()
                            .includes(search.toLowerCase()),
                      ).length
                    }{" "}
                    lessons
                  </span>
                </div>
                <div className="note-grid" key={topic + search}>
                  {notes
                    .filter(
                      (n) =>
                        (topic === "All topics" || n.topic === topic) &&
                        (n.title + " " + n.content)
                          .toLowerCase()
                          .includes(search.toLowerCase()),
                    )
                    .map((n) => (
                      <button
                        className="note-card"
                        key={n.id}
                        onClick={() => setNote(n)}
                      >
                        <div>
                          <BookOpen size={22} />
                          <span>{n.topic}</span>
                        </div>
                        <h3>{n.title}</h3>
                        <p>{n.topic}</p>
                        <span className="read-note">
                          Read note <ArrowUpRight size={17} />
                        </span>
                      </button>
                    ))}
                </div>
                {!notes.some(
                  (n) =>
                    (topic === "All topics" || n.topic === topic) &&
                    (n.title + " " + n.content)
                      .toLowerCase()
                      .includes(search.toLowerCase()),
                ) && (
                  <div className="empty">
                    No notes match this search. Try another keyword.
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        {view === "about" && (
          <>
            <section className="about-hero page-intro">
              <div>
                <p className="eyebrow">THE PERSON BEHIND THE PROJECTS</p>
                <h1>
                  Hi, I'm Bagus
                  <br />
                  Hendrawan<span className="accent">.</span>
                </h1>
                <p>AI Engineer. Builder. Lifelong learner.</p>
                <div className="location">
                  <MapPin size={16} /> Petaling Jaya, Malaysia
                </div>
                <Social />
              </div>
              <img src="/icon.png" alt="Bagus B monogram" />
            </section>
            <section className="section about-story">
              <h2>
                From curiosity
                <br />
                to real-world impact.
              </h2>
              <div>
                <p>
                  I focus on the design and development of AI-powered
                  applications, specializing in agentic multimodal AI, web
                  development, and data analytics.
                </p>
                <p>
                  My work spans agentic chatbots, AI-powered document
                  extraction, and custom workflow automation. I enjoy
                  translating business requirements into reliable, scalable, and
                  practical AI solutions.
                </p>
                <p>
                  Alongside my work at Ebdesk Malaysia, I build independent
                  experiments, freelance websites, and keep a notebook of what I
                  learn along the way.
                </p>
                <a
                  className="btn"
                  href="/bagus-hendrawan-resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read my resume <Download size={17} />
                </a>
              </div>
            </section>
            <Experience />
            <section className="section">
              <SectionTitle
                eyebrow="EDUCATION"
                title="A foundation for what's next."
              />
              <Education />
            </section>
          </>
        )}
      </main>
      <footer>
        <div className="footer-grid">
          <div>
            <p className="eyebrow">LET'S BUILD SOMETHING MEANINGFUL</p>
            <h2>
              Have a project
              <br />
              in mind<span className="accent">?</span>
            </h2>
            <p>I'd love to hear what you're working on.</p>
            <a className="btn primary" href="mailto:bagushendrawan01@gmail.com">
              Contact Me <ArrowUpRight size={17} />
            </a>
          </div>
          <div
            className="testimonial"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="review-top">
              <Quote size={28} />
              <span>SAMPLE TESTIMONIAL</span>
            </div>
            <p>
              “
              {
                [
                  "Bagus brings a thoughtful approach to complex problems and makes the technical feel approachable.",
                  "A collaborative builder who connects the big picture with the details that make a product work.",
                  "Curious, resourceful, and focused on turning ideas into practical experiences.",
                ][review]
              }
              ”
            </p>
            <div className="review-bottom">
              <span className="avatar">{["AK", "SL", "MR"][review]}</span>
              <div>
                <strong>{["Alex K.", "Sarah L.", "Michael R."][review]}</strong>
                <small>
                  {
                    [
                      "Project collaborator",
                      "Product partner",
                      "Engineering collaborator",
                    ][review]
                  }{" "}
                  · Example
                </small>
              </div>
              <div className="review-controls">
                <button
                  aria-label="Previous review"
                  onClick={() => {
                    setReview((review + 2) % 3);
                    setPaused(true);
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  aria-label="Next review"
                  onClick={() => {
                    setReview((review + 1) % 3);
                    setPaused(true);
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
          <div className="follow">
            <p className="eyebrow">FIND ME ELSEWHERE</p>
            <h3>Let's stay connected.</h3>
            <Social />
            <a href="mailto:bagushendrawan01@gmail.com">
              <Mail size={15} />
              bagushendrawan01@gmail.com
            </a>
            <a href="tel:+601118641176">
              <Phone size={15} />
              +60 111-8641-176
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Bagus Hendrawan</span>
          <span>
            Made with <b className="next-icon">N</b> Next.js
          </span>
          <a href="#" aria-label="Back to top">
            Back to top ↑
          </a>
        </div>
      </footer>
      <Dialog open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <DialogContent className="project-dialog">
          {selected && (
            <>
              <DialogTitle>{selected.name}</DialogTitle>
              <DialogDescription>
                {selected.affiliation} · {selected.role}
              </DialogDescription>
              <Visual p={selected} />
              <p>{selected.desc}</p>
              <div className="tags">
                {selected.stack.map((s: string) => (
                  <span key={s}>
                    <TechLogo name={s} />
                    {s}
                  </span>
                ))}
              </div>
              {selected.isPlaceholder && (
                <p className="fine-print">
                  Illustrative project summary. A full case study and project
                  imagery will be added here.
                </p>
              )}
              {selected.url ? (
                <a
                  className="btn primary"
                  href={selected.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit website <ArrowUpRight size={17} />
                </a>
              ) : (
                <a
                  className="btn"
                  href={
                    "mailto:bagushendrawan01@gmail.com?subject=" +
                    encodeURIComponent("Tell me about " + selected.name)
                  }
                >
                  Ask about this project <Mail size={17} />
                </a>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={!!note} onOpenChange={(v) => !v && setNote(null)}>
        <DialogContent className="note-dialog">
          {note && (
            <>
              <DialogTitle>{note.title}</DialogTitle>
              <DialogDescription>
                {note.topic} · Bagus's Notebook
              </DialogDescription>
              <Markdown text={note.content} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
