import Link from "next/link";
import { Header } from "./navigation";

export function Footer() {
  return <footer className="footer"><span>HACKPRENEUR</span><span>Built for the work after demo day · <Link href="/audit">Activity history</Link></span></footer>;
}

export function SectionTitle({ children }: { children: React.ReactNode }) { return <h2 className="section-title">{children}</h2>; }
export function AppFrame({ current, children }: { current: string; children: React.ReactNode }) {
  return <div className="app-layout"><Header current={current}/><div className="app-content">{children}<Footer/></div></div>;
}
export function PageHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children: string }) {
  return <div className="page-head"><h1>{title}</h1><p className="page-context">{eyebrow}</p><p>{children}</p></div>;
}
