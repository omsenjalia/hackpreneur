import Link from "next/link";
import {cookies} from "next/headers";
import {eq} from "drizzle-orm";
import {AppFrame,PageHeading} from "../components";
import {db} from "@/src/db";
import {readinessChecks} from "@/src/db/schema";
import {readinessQuestions} from "@/src/readiness/rules";
import {ReadinessChecklist} from "./checklist";
export const dynamic="force-dynamic";
export default async function Readiness(){const role=(await cookies()).get("demo_role")?.value??"team";const saved=await db.select().from(readinessChecks).where(eq(readinessChecks.projectId,"project-1")).get();const answers=saved?JSON.parse(saved.answers) as boolean[]:Array(readinessQuestions.length).fill(false);return <AppFrame current="/milestones"><main className="shell"><PageHeading eyebrow="Team self-check · demo" title="How ready is your project?">Answer a short checklist to understand your next steps. This score is a team self-assessment, not an independent endorsement or verification.</PageHeading>{role==="team"?<ReadinessChecklist initialAnswers={answers}/>:<div className="placeholder">Readiness checks can be edited by the Team demo role. Switch roles using the selector above.</div>}<p style={{marginTop:24}}><Link className="button secondary" href="/milestones">Open milestone tracker →</Link></p></main></AppFrame>}
