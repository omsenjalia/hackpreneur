import Link from "next/link";
import { db } from "@/src/db";
import { projects, milestones, mentors, matches } from "@/src/db/schema";
import { AppFrame } from "./components";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projectRows, milestoneRows, mentorRows, matchRows] = await Promise.all([
    db.select().from(projects).all(),
    db.select().from(milestones).all(),
    db.select().from(mentors).all(),
    db.select().from(matches).all(),
  ]);
  const completed = milestoneRows.filter((item) => item.status === "done").length;
  const nextStepByProject = new Map<string, (typeof milestoneRows)[number]>();
  for (const step of milestoneRows.filter((item) => item.status !== "done").sort((a, b) => a.dueDate.localeCompare(b.dueDate))) {
    if (!nextStepByProject.has(step.projectId)) nextStepByProject.set(step.projectId, step);
  }
  const overviewProjects = projectRows.slice(0, 4);

  return <AppFrame current="/"><main className="shell home-shell">
    <section className="home-hero">
      <div className="home-hero-copy">
        <h1>The work starts <em>after the applause.</em></h1>
        <p className="home-context">Your private founder workspace</p>
        <p className="lead">Keep the idea moving: capture what you built, choose the next milestone, and find the people who can help.</p>
      </div>
      <div className="home-actions">
        <Link className="button" href="/projects/new">＋ Start a project</Link>
        <Link className="button secondary" href="/projects">View projects</Link>
      </div>
    </section>

    <section className="stats" aria-label="Workspace overview">
      <article className="stat"><strong>{projectRows.length}</strong><span>Projects</span><span className="stat-caption">Ideas with a place to grow</span></article>
      <article className="stat"><strong>{completed}</strong><span>Milestones completed</span><span className="stat-caption">Progress recorded here</span></article>
      <article className="stat"><strong>{mentorRows.length}</strong><span>Mentor profiles</span><span className="stat-caption">People you have added</span></article>
      <article className="stat"><strong>{matchRows.length}</strong><span>Saved matches</span><span className="stat-caption">No one is contacted</span></article>
    </section>

    <section className="home-board" aria-label="Workspace activity">
      <div className="home-panel">
        <div className="panel-heading"><h2>Projects in motion</h2><Link href="/projects">All projects <span aria-hidden="true">↗</span></Link></div>
        {overviewProjects.length ? <div className="project-rows">{overviewProjects.map((project) => {
          const nextStep = nextStepByProject.get(project.id);
          return <article className="project-row" key={project.id}>
            <div className="project-row-title"><Link href={`/projects/${project.id}`}>{project.title}</Link><small>{project.domain} · {project.stage}</small></div>
            <div className="project-next"><strong>{nextStep?.title ?? "No next step planned"}</strong><small>{nextStep ? `Due ${nextStep.dueDate}` : "Open milestones to choose one"}</small></div>
            <span className="tag">{nextStep ? "In progress" : "Needs a step"}</span>
          </article>;
        })}</div> : <div className="placeholder"><strong>Your next chapter starts with one project.</strong><p>Add a project to keep its goals, milestones, and mentor needs in one place.</p><Link className="button empty-action" href="/projects/new">Create your first project</Link></div>}
      </div>
      <aside className="home-side">
        <section className="home-panel" style={{ background: "#edf3ee" }}>
          <h2 className="next-action-title">Turn the idea into a plan.</h2>
          <p className="next-action-copy">A short readiness check can surface what to tackle next, without sharing your project anywhere.</p>
          <div className="quick-links"><Link href={projectRows.length ? `/readiness?projectId=${encodeURIComponent(projectRows[0].id)}` : "/projects/new"}><span>{projectRows.length ? "Review project readiness" : "Create a project first"}</span><span aria-hidden="true">→</span></Link><Link href="/mentors"><span>Browse mentor profiles</span><span aria-hidden="true">→</span></Link><Link href="/milestones"><span>Plan milestones</span><span aria-hidden="true">→</span></Link></div>
        </section>
        <section className="home-panel">
          <div className="panel-heading"><h2>Workspace note</h2></div>
          <p className="next-action-copy">Everything here is stored in this local workspace. Your records are not published, and match suggestions never send introductions.</p>
        </section>
      </aside>
    </section>
    <section className="home-lower">
      <div className="panel-heading"><h2>Make room for the next version.</h2><Link href="/dashboard">See workspace insights <span aria-hidden="true">↗</span></Link></div>
      <p className="next-action-copy">Projects change when teams test assumptions, get useful feedback, and keep showing up. HACKPRENEUR keeps those next steps visible.</p>
    </section>
  </main></AppFrame>;
}
