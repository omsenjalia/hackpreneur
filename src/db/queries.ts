import "server-only";
import { db } from "./index";
import { projects, mentors, milestones } from "./schema";

export const listProjects = () => db.select().from(projects).all();
export const listMentors = () => db.select().from(mentors).all();
export const listMilestones = () => db.select().from(milestones).all();
