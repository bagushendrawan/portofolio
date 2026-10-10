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
            "Aug 2024 — Present",
            "AI Engineer",
            "Ebdesk Malaysia Sdn Bhd",
            "Designed and engineered AI powered solutions based on client’s problem statements and requirements.",
          ],
         
          [
            "Mar 2024 — Present",
            "Freelance Web Developer",
            "Independent",
            "Designed and Engineered Fullstack web application based on client idea and needs",
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
