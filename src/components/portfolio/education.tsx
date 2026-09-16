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
export function Education() {
  return (
    <div className="education">
      <div>
        <GraduationCap />
        <p className="eyebrow">2020 — 2024</p>
        <h3>Bachelor of Applied Information Systems</h3>
        <p>Politeknik Negeri Media Kreatif</p>
        <small>Game Technology · GPA 3.77 / 4.0</small>
      </div>
      <div>
        <Globe />
        <p className="eyebrow">2023 · STUDENT EXCHANGE</p>
        <h3>University of Missouri–Kansas City</h3>
        <p>Computer Science & Artificial Intelligence</p>
        <small>Kansas City, USA</small>
      </div>
      <div>
        <Code2 />
        <p className="eyebrow">CONTINUOUS LEARNING</p>
        <h3>Web Development Bootcamp</h3>
        <p>Building practical skills for the web.</p>
        <small>Program details to be added</small>
      </div>
    </div>
  );
}
