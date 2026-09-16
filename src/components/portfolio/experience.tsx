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
import { SectionTitle } from "./section-title";
export function Experience() {
  return (
    <section className="section">
      <SectionTitle eyebrow="THE JOURNEY" title="Where I've made an impact." />
      <div className="timeline">
        {[
          [
            "Apr 2025 — Present",
            "AI Engineer",
            "Ebdesk Malaysia Sdn Bhd",
            "Building enterprise AI solutions across document intelligence, construction compliance, and election analysis. Working with multimodal extraction, RAG, and optimized LLM inference.",
          ],
          [
            "Aug 2024 — Apr 2025",
            "Data Analyst",
            "Ebdesk Malaysia Sdn Bhd",
            "Delivered 8+ dashboards, maps, and reports. Built data pipelines processing up to 150M raw records and applied statistical and geospatial analysis.",
          ],
          [
            "Sep 2024 — Present",
            "Freelance Web Developer",
            "Independent",
            "Designed and delivered full-stack commercial websites, with SEO, deployment infrastructure, and production monitoring.",
          ],
        ].map(([date, role, company, body]) => (
          <div className="experience" key={role}>
            <span>{date}</span>
            <div>
              <h3>{role}</h3>
              <p className="company">{company}</p>
              <p>{body}</p>
            </div>
            <Briefcase size={22} />
          </div>
        ))}
      </div>
    </section>
  );
}
