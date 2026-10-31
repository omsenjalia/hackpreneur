import Link from "next/link";
import {RoleSwitcher} from "./role-switcher";

const links = [["Home","/"],["Projects","/projects"],["Mentors","/mentors"],["Milestones","/milestones"],["Dashboard","/dashboard"],["Directory","/directory"]] as const;
export function Header({ current }: { current: string }) { return <header className="topbar"><Link className="brand" href="/">HACKPRENEUR ✳</Link><nav className="navlinks" aria-label="Main navigation">{links.map(([label,href])=><Link key={href} href={href} aria-current={current===href?"page":undefined}>{label}</Link>)}</nav><RoleSwitcher/><Link className="nav-cta" href="/projects">＋ Add project</Link></header>; }
export function Footer(){return <footer className="footer"><div className="shell footer-inner"><span>HACKPRENEUR · Keep good ideas moving.</span><span>Prototype with synthetic data · <Link href="/directory">Community directory</Link> · <Link href="/audit">Audit trail (organizer)</Link></span></div></footer>}
export function Banner(){return <div className="banner shell"><strong>Prototype / synthetic data.</strong> This demo uses sample information only. Matches are suggestions; no introductions or funding are guaranteed.</div>}
export function SectionTitle({children}:{children:React.ReactNode}){return <h2 className="section-title">{children}</h2>}
export function AppFrame({current,children}:{current:string;children:React.ReactNode}){return <><Header current={current}/><Banner/>{children}<Footer/></>}
export function PageHeading({eyebrow,title,children}:{eyebrow:string;title:string;children:string}){return <div className="page-head"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{children}</p></div>}
