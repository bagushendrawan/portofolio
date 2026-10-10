"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/types/content";
import { Visual } from "./project-preview";

export function ProjectGallery({ project }: { project: Project }) {
  const images = Array.from(new Set([
    ...(project.image ? [project.image] : []),
    ...project.images,
  ])).map((src) => ({ src, type: "image" as const }));
  const media = [
    ...project.videos.map((src) => ({ src, type: "video" as const })),
    ...images,
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (media.length < 2 || media[active]?.type === "video") return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % media.length),
      4500,
    );
    return () => window.clearInterval(timer);
  }, [active, media.length, media[active]?.type]);

  if (!media.length) return <Visual p={project} />;

  return (
    <section className="project-gallery" aria-label={`${project.name} screenshots`}>
      <div className="gallery-stage">
        {media[active].type === "video" ? (
          <video className="gallery-image" controls preload="metadata">
            <source src={media[active].src} type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        ) : (
          <img
            src={media[active].src}
            alt={`${project.name} screenshot ${active + 1} of ${media.length}`}
            className="gallery-image"
          />
        )}
      </div>
      {media.length > 1 && (
        <div className="gallery-thumbnails" aria-label="Choose a screenshot">
          {media.map((item, index) => (
            <button
              type="button"
              key={item.src}
              aria-label={`Show ${project.name} ${item.type === "video" ? "demo video" : `screenshot ${index + 1}`}`}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            >
              {item.type === "video" ? (
                <span className="gallery-video-thumb">▶ Demo</span>
              ) : (
                <img src={item.src} alt="" loading="lazy" />
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
