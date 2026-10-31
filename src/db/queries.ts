import "server-only";
import { db } from "./index";
import { projects, mentors, milestones, consents } from "./schema";
import { and, eq, inArray } from "drizzle-orm";

/** Small centralized read API; page code should call these rather than assembling SQL. */
export const listProjects = () => db.select().from(projects).all();
export const listMentors = () => db.select().from(mentors).all();
export const listMilestones = () => db.select().from(milestones).all();

export async function listVisibleProjects(role:"team"|"mentor"|"organizer") {
  if(role==="organizer") return db.select().from(projects).all();
  if(role==="team") return db.select().from(projects).where(eq(projects.teamId,"team-1")).all();
  const allowed=(await db.select({projectId:consents.projectId}).from(consents).where(and(eq(consents.scope,"share_profile"),eq(consents.granted,true)))).map(row=>row.projectId);
  if(!allowed.length) return [];
  return db.select().from(projects).where(and(inArray(projects.visibility,["public","mentors_only"]),inArray(projects.id,allowed))).all();
}
