import Link from "next/link";
import {cookies} from "next/headers";
import {eq} from "drizzle-orm";
import {AppFrame,PageHeading,SectionTitle} from "../components";
import {db} from "@/src/db";
import {milestones} from "@/src/db/schema";
import {MilestoneList} from "./milestone-list";
export const dynamic="force-dynamic";
export default async function Milestones(){const role=(await cookies()).get("demo_role")?.value??"team";const rows=await db.select().from(milestones).where(eq(milestones.projectId,"project-1")).all();return <AppFrame current="/milestones"><main className="shell"><PageHeading eyebrow="Keep the momentum" title="One next step at a time">Track practical progress after demo day. Team updates are self-reported until a mentor or organizer verifies them.</PageHeading><p><Link className="button secondary" href="/readiness">Start with a readiness check →</Link></p><SectionTitle>Your next steps · {rows.length}</SectionTitle>{role==="team"?<MilestoneList milestones={rows}/>:<div className="placeholder">Switch to the Team demo role to see its private sample project milestones.</div>}</main></AppFrame>}
