import {NextResponse} from "next/server";
import {eq} from "drizzle-orm";
import {db} from "@/src/db";
import {milestones,projects} from "@/src/db/schema";
export async function POST(request:Request){const body=await request.json().catch(()=>null) as {projectId?:string;title?:string}|null;if(!body?.projectId||!body.title||body.title.trim().length<5||body.title.length>180)return NextResponse.json({error:"Enter a project and milestone title."},{status:400});const project=await db.select().from(projects).where(eq(projects.id,body.projectId)).get();if(!project)return NextResponse.json({error:"Project not found."},{status:404});const id=`milestone-${crypto.randomUUID()}`;await db.insert(milestones).values({id,projectId:project.id,title:body.title.trim(),description:"",dueDate:new Date(Date.now()+7*86400000).toISOString().slice(0,10),status:"todo",source:"custom",progressClaim:"self_reported",verifiedBy:null,verifiedAt:null});return NextResponse.json({id},{status:201});}
