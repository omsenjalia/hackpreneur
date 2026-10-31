import {NextResponse} from "next/server";
import {eq} from "drizzle-orm";
import {db} from "@/src/db";
import {milestones} from "@/src/db/schema";
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){const {id}=await params;const body=await request.json().catch(()=>null) as {status?:string}|null;if(!body||!["todo","doing","done"].includes(body.status??""))return NextResponse.json({error:"Choose a valid milestone status."},{status:400});const found=await db.select().from(milestones).where(eq(milestones.id,id)).get();if(!found)return NextResponse.json({error:"Milestone not found."},{status:404});await db.update(milestones).set({status:body.status as "todo"|"doing"|"done",progressClaim:body.status==="done"?"self_reported":found.progressClaim}).where(eq(milestones.id,id));return NextResponse.json({ok:true});}
