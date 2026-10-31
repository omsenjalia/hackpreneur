import Link from "next/link";
import { db } from "@/src/db";
import { projects, milestones, matches } from "@/src/db/schema";
import { AppFrame, SectionTitle } from "./components";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projectRows, milestoneRows, matchRows] = await Promise.all([
    db.select().from(projects).all(),
    db.select().from(milestones).all(),
    db.select().from(matches).all(),
  ]);
  const milestonesDone = milestoneRows.filter((item) => item.status === "done").length;
  const verifiedOutcomes = milestoneRows.filter((item) => item.status === "done" && item.progressClaim === "verified").length;
  const mentorsMatched = new Set(matchRows.filter((item) => item.status === "team_accepted" || item.status === "mentor_accepted").map((item) => item.mentorId)).size;
  const nextStepByProject = new Map<string, (typeof milestoneRows)[number]>();
  for (const step of milestoneRows.filter((item) => item.status !== "done").sort((a, b) => a.dueDate.localeCompare(b.dueDate))) {
    if (!nextStepByProject.has(step.projectId)) nextStepByProject.set(step.projectId, step);
  }
  const stats = [
    { count: projectRows.length, label: "Projects tracked", caption: "Ideas with a place to grow", tone: "lilac" },
    { count: milestonesDone, label: "Milestones done", caption: "Progress recorded here", tone: "peach" },
    { count: mentorsMatched, label: "Mentors matched", caption: "Accepted, locally saved matches", tone: "mint" },
    { count: verifiedOutcomes, label: "Verified outcomes", caption: "Reviewed in this workspace", tone: "lemon" },
  ];
  const roles = [
    { label: "For teams", title: "Keep building together.", copy: "Shape the project profile, make the next milestone clear, and keep useful feedback close.", href: "/projects", action: "Explore projects", tone: "lilac" },
    { label: "For mentors", title: "Make your experience count.", copy: "Browse mentor profiles and see how expertise can connect with real project needs.", href: "/mentors", action: "Meet the community", tone: "peach" },
    { label: "For organizers", title: "See what moves forward.", copy: "Review project progress with self-reported and verified outcomes kept distinct.", href: "/dashboard", action: "View outcomes", tone: "mint" },
  ];

  return <AppFrame current="/"><main className="shell home-shell">
    <section className="home-hero">
      <div className="hero-spark hero-spark-one" aria-hidden="true"/>
      <div className="hero-spark hero-spark-two" aria-hidden="true"/>
      <h1>Don’t let your hackathon<br/><span>project die.</span></h1>
      <p className="prototype-note"><span className="status-dot"/> Prototype · local workspace</p>
      <p className="lead">Give a good idea somewhere to go next. Track milestones, learn from feedback, and meet people who can help move it forward.</p>
      <div className="home-actions"><Link className="button" href="/projects/new">Start your project <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/projects">Explore the workspace <span aria-hidden="true">→</span></Link></div>
      <div className="hero-orbit hero-orbit-one" aria-hidden="true"/><div className="hero-orbit hero-orbit-two" aria-hidden="true"/>
    </section>

    <section className="stats" aria-label="Live workspace statistics">
      {stats.map((stat) => <article className={`stat stat-${stat.tone}`} key={stat.label}>
        <span className="stat-label">{stat.label}</span><strong>{stat.count}</strong><span className="stat-caption">{stat.caption}</span>
      </article>)}
    </section>

    <section className="role-section">
      <SectionTitle>One workspace. A few ways to keep going.</SectionTitle>
      <div className="role-grid">{roles.map((role, index) => <article className={`role-card role-${role.tone}`} key={role.label}>
        <p className="role-label">{role.label}</p>
        <h3>{role.title}</h3>
        <p className="role-copy">{role.copy}</p>
        <Link className="role-link" href={role.href}>{role.action}<span aria-hidden="true">↗</span></Link>
        <span className={`role-shape role-shape-${index + 1}`} aria-hidden="true"/>
      </article>)}</div>
    </section>

    <section className="recent-section">
      <div className="recent-heading"><SectionTitle>Projects in motion</SectionTitle><Link href="/projects">View all projects <span aria-hidden="true">→</span></Link></div>
      {projectRows.length ? <div className="recent-projects">{projectRows.slice(0, 3).map((project) => {
        const nextStep = nextStepByProject.get(project.id);
        return <Link className="recent-project" href={`/projects/${project.id}`} key={project.id}>
          <span className="recent-project-mark" aria-hidden="true"/><span className="recent-project-main"><strong>{project.title}</strong><small>{project.domain} · {project.stage}</small></span>
          <span className="recent-project-step"><strong>{nextStep?.title ?? "No next milestone yet"}</strong><small>{nextStep ? `Due ${nextStep.dueDate}` : "Choose a practical next step"}</small></span><span className="recent-arrow" aria-hidden="true">↗</span>
        </Link>;
      })}</div> : <div className="empty-projects"><p>Your next chapter starts with one project.</p><span>Add a project to set milestones, invite feedback, and find a next step.</span><Link className="text-link" href="/projects/new">Create your first project →</Link></div>}
    </section>
    <p className="home-privacy"><span aria-hidden="true"/> Your workspace is local. No messages or introductions are sent automatically.</p>
  </main></AppFrame>;
}
