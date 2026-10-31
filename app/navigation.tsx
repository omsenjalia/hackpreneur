"use client";

import Link from "next/link";
import { useState } from "react";

type IconName = "home" | "projects" | "people" | "steps" | "compass" | "chart" | "history";
const primaryLinks: [string, string][] = [["Home", "/"], ["Projects", "/projects"], ["Mentors", "/mentors"], ["Milestones", "/milestones"]];
const extraLinks: [string, string, IconName][] = [
  ["Readiness", "/readiness", "compass"],
  ["Directory", "/directory", "people"],
  ["Matching rules", "/matching", "steps"],
  ["Insights", "/dashboard", "chart"],
  ["Activity history", "/audit", "history"],
];
const mobileGroups: { label: string; links: [string, string, IconName][] }[] = [
  { label: "Workspace", links: [["Overview", "/", "home"], ["Projects", "/projects", "projects"], ["Mentors", "/mentors", "people"], ["Directory", "/directory", "people"]] },
  { label: "Project planning", links: [["Milestones", "/milestones", "steps"], ["Readiness", "/readiness", "compass"], ["Matching rules", "/matching", "steps"]] },
  { label: "Review", links: [["Insights", "/dashboard", "chart"], ["Activity history", "/audit", "history"]] },
];

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-6h6v6"/></>,
    projects: <><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h8M8 17h4"/></>,
    people: <><circle cx="9" cy="8" r="3"/><path d="M3.5 20v-1.5A4.5 4.5 0 0 1 8 14h2a4.5 4.5 0 0 1 4.5 4.5V20M16 5.5a3 3 0 0 1 0 5.8M17 14h.5a4 4 0 0 1 4 4v2"/></>,
    steps: <><circle cx="5" cy="6" r="1.5"/><circle cx="5" cy="12" r="1.5"/><circle cx="5" cy="18" r="1.5"/><path d="M10 6h10M10 12h10M10 18h10"/></>,
    compass: <><circle cx="12" cy="12" r="9"/><path d="m15.8 8.2-2.3 5.3-5.3 2.3 2.3-5.3z"/></>,
    chart: <><path d="M4 19V5M4 19h17"/><path d="m7 15 4-4 3 2 5-6"/></>,
    history: <><path d="M3 12a9 9 0 1 0 2.6-6.4L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function MobileNavigation({ current, onNavigate }: { current: string; onNavigate: () => void }) {
  return <nav className="mobile-nav" aria-label="Main navigation">
    {mobileGroups.map((group) => <div className="mobile-nav-group" key={group.label}>
      <p>{group.label}</p>
      {group.links.map(([label, href, icon]) => {
        const active = current === href || (href !== "/" && current.startsWith(`${href}/`));
        return <Link className="mobile-nav-link" key={href} href={href} aria-current={active ? "page" : undefined} onClick={onNavigate}>
          <Icon name={icon}/><span>{label}</span><span className="mobile-nav-arrow" aria-hidden="true">↗</span>
        </Link>;
      })}
    </div>)}
  </nav>;
}

export function Header({ current }: { current: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const moreActive = extraLinks.some(([, href]) => current === href || current.startsWith(`${href}/`));
  const closeMenu = () => setMenuOpen(false);
  return <>
    <header className="topbar">
      <Link className="brand" href="/" aria-label="Hackpreneur home"><span className="brand-mark" aria-hidden="true"><i/><i/><i/></span><span>HACKPRENEUR</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {primaryLinks.map(([label, href]) => <Link className="nav-link" key={href} href={href} aria-current={current === href || (href !== "/" && current.startsWith(`${href}/`)) ? "page" : undefined}>{label}</Link>)}
        <details className="nav-more"><summary aria-current={moreActive ? "page" : undefined}>More <span aria-hidden="true">⌄</span></summary><div className="nav-dropdown">{extraLinks.map(([label, href]) => <Link key={href} href={href} aria-current={current === href || current.startsWith(`${href}/`) ? "page" : undefined}>{label}</Link>)}</div></details>
      </nav>
      <div className="topbar-actions">
        <Link className="nav-cta" href="/projects/new">Add your project <span aria-hidden="true">＋</span></Link>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <span/><span/>
        </button>
      </div>
    </header>
    <div className={`mobile-menu${menuOpen ? " is-open" : ""}`} id="mobile-navigation" aria-hidden={!menuOpen}>
      <div className="mobile-menu-heading"><div><span>HACKPRENEUR</span><small>Local founder workspace</small></div><span className="mobile-menu-spark" aria-hidden="true"/></div>
      <MobileNavigation current={current} onNavigate={closeMenu}/>
      <Link className="mobile-create" href="/projects/new" onClick={closeMenu}>＋ Add your project</Link>
      <p className="mobile-privacy"><span aria-hidden="true"/> Your data stays on this device.</p>
    </div>
  </>;
}
