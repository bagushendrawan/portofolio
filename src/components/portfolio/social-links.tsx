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
function Github({ size = 19 }: any) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5a12 12 0 0 0-3.793 23.385c.6.111.82-.261.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.071 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 6.006 0c2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.119 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.216.694.825.576A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}
function Linkedin({ size = 19 }: any) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.1-.02-2.52-1.54-2.52-1.54 0-1.78 1.2-1.78 2.44v4.73H9.53V9.2h2.83v1.3h.04c.39-.74 1.36-1.53 2.79-1.53 2.98 0 3.56 1.96 3.56 4.5v5.28Z" />
    </svg>
  );
}
function Instagram({ size = 19 }: any) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
    </svg>
  );
}
const social = [
  { label: "GitHub", Icon: Github, url: "https://github.com/bagushendrawan" },
  {
    label: "LinkedIn",
    Icon: Linkedin,
    url: "https://www.linkedin.com/in/bagus-hendrawan/",
  },
  {
    label: "Instagram",
    Icon: Instagram,
    url: "https://www.instagram.com/bag_user/",
  },
  { label: "Email", Icon: Mail, url: "mailto:bagushendrawan01@gmail.com" },
];
export function Social() {
  return (
    <div className="social">
      {social.map(({ label, Icon, url }) => (
        <a
          key={label}
          href={url}
          aria-label={label}
          target={url.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
        >
          <Icon size={19} />
        </a>
      ))}
    </div>
  );
}
