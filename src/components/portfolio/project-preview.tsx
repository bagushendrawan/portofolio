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
export function Visual({ p, large = false }: any) {
  if (p.image)
    return (
      <div className={"project-visual" + (large ? " large" : "")}>
        <img
          className="project-cover"
          src={p.image}
          alt={p.imageAlt || p.name}
        />
      </div>
    );
  const Icon =
    p.role === "Data Scientist"
      ? Database
      : p.role === "Fullstack Developer"
        ? Globe
        : p.id === 14
          ? AudioLines
          : BrainCircuit;
  return (
    <div className={"project-visual v" + (p.id % 6) + (large ? " large" : "")}>
      <span className="visual-no">
        {String(p.id + 1).padStart(2, "0")} / PROJECT
      </span>
      <Icon className="visual-icon" strokeWidth={1} />
      <div className="visual-label">
        {p.name}
        <span>{p.role}</span>
      </div>
      <span className="preview-tag">CONCEPT PREVIEW</span>
    </div>
  );
}
