import {NextResponse} from "next/server";
import {eq} from "drizzle-orm";
import {db} from "@/src/db";
import {feedback,milestones} from "@/src/db/schema";
export async function POST(_request:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;const item=await db.select().from(feedback).where(eq(feedback.id,id)).get();if(!item)return NextResponse.json({error:"Feedback entry not found."},{status:404});const milestoneId=`milestone-${crypto.randomUUID()}`;await db.insert(milestones).values({id:milestoneId,projectId:item.projectId,title:item.nextStep,description:"",dueDate:new Date(Date.now()+7*86400000).toISOString().slice(0,10),status:"todo",source:"custom",progressClaim:"self_reported",verifiedBy:null,verifiedAt:null});return NextResponse.json({id:milestoneId},{status:201});}
