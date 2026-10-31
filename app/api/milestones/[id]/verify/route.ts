import {NextResponse} from "next/server";
import {eq} from "drizzle-orm";
import {db} from "@/src/db";
import {milestones,auditLog} from "@/src/db/schema";
export async function POST(_request:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;const item=await db.select().from(milestones).where(eq(milestones.id,id)).get();if(!item)return NextResponse.json({error:"Milestone not found."},{status:404});if(item.status!=="done")return NextResponse.json({error:"Mark this milestone complete before verifying it."},{status:400});await db.update(milestones).set({progressClaim:"verified",verifiedBy:"local-workspace",verifiedAt:new Date().toISOString()}).where(eq(milestones.id,id));await db.insert(auditLog).values({id:`audit-${crypto.randomUUID()}`,actorId:"local-workspace",action:"outcome_verified",entity:"milestone",entityId:id,before:item.progressClaim,after:"verified",at:new Date().toISOString()});return NextResponse.json({ok:true});}
