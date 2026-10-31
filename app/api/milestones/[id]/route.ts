import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {and,eq} from "drizzle-orm";
import {db} from "@/src/db";
import {milestones} from "@/src/db/schema";
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){if(((await cookies()).get("demo_role")?.value??"team")!=="team")return NextResponse.json({error:"Only the Team demo role can update this milestone."},{status:403});const {id}=await params;const body=await request.json().catch(()=>null) as {status?:string}|null;if(!body||!["todo","doing","done"].includes(body.status??""))return NextResponse.json({error:"Choose a valid milestone status."},{status:400});const found=await db.select().from(milestones).where(and(eq(milestones.id,id),eq(milestones.projectId,"project-1"))).get();if(!found)return NextResponse.json({error:"Milestone not found."},{status:404});await db.update(milestones).set({status:body.status as "todo"|"doing"|"done",progressClaim:body.status==="done"?"self_reported":found.progressClaim}).where(eq(milestones.id,id));return NextResponse.json({ok:true});}
