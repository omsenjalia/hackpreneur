import Link from "next/link";

const links=[["Overview","/"],["Projects","/projects"],["Mentors","/mentors"],["Milestones","/milestones"],["Insights","/dashboard"],["Directory","/directory"]] as const;
export function Header({current}:{current:string}){return <header className="topbar"><Link className="brand" href="/">HACKPRENEUR<span className="brand-mark">.</span></Link><nav className="navlinks" aria-label="Main navigation">{links.map(([label,href])=><Link key={href} href={href} aria-current={current===href?"page":undefined}>{label}</Link>)}</nav><Link className="nav-cta" href="/projects/new">New project</Link></header>}
export function Footer(){return <footer className="footer"><div className="shell footer-inner"><span>HACKPRENEUR</span><span>Local workspace · <Link href="/audit">Activity history</Link></span></div></footer>}
export function SectionTitle({children}:{children:React.ReactNode}){return <h2 className="section-title">{children}</h2>}
export function AppFrame({current,children}:{current:string;children:React.ReactNode}){return <><Header current={current}/>{children}<Footer/></>}
export function PageHeading({eyebrow,title,children}:{eyebrow:string;title:string;children:string}){return <div className="page-head"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{children}</p></div>}
