import Link from "next/link";
import {cookies} from "next/headers";
import {and,eq} from "drizzle-orm";
import {AppFrame,PageHeading,SectionTitle} from "../components";
import {db} from "@/src/db";
import {milestones,consents} from "@/src/db/schema";
import {MilestoneList} from "./milestone-list";
import {ReminderPanel} from "./reminders";
import {CustomMilestone} from "./custom-milestone";
export const dynamic="force-dynamic";
export default async function Milestones(){const role=(await cookies()).get("demo_role")?.value??"team";const rows=await db.select().from(milestones).where(eq(milestones.projectId,"project-1")).all();const consent=await db.select().from(consents).where(and(eq(consents.projectId,"project-1"),eq(consents.scope,"share_profile"),eq(consents.granted,true))).get();const canView=role==="team"||role==="organizer"||(role==="mentor"&&Boolean(consent));return <AppFrame current="/milestones"><main className="shell"><PageHeading eyebrow="Keep the momentum" title="One next step at a time">Track practical progress after demo day. Team updates are self-reported until a mentor or organizer verifies them.</PageHeading><p><Link className="button secondary" href="/readiness">Start with a readiness check →</Link></p><SectionTitle>Your next steps · {rows.length}</SectionTitle>{canView?<MilestoneList milestones={rows} role={role}/>:<div className="placeholder">This project is not shared with mentors. Team consent is required before mentors can see milestones.</div>}{role==="team"&&<CustomMilestone/>}{canView&&<ReminderPanel milestones={rows}/>}</main></AppFrame>}
