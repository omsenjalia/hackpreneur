import {NextResponse} from "next/server";
import {eq} from "drizzle-orm";
import {db} from "@/src/db";
import {projects,needs,consents,teams,auditLog} from "@/src/db/schema";

export async function POST(request:Request){
  const body=await request.json().catch(()=>null) as Record<string,unknown>|null;
  if(!body)return NextResponse.json({error:"Enter project details and try again."},{status:400});
  const title=String(body.title??"").trim(),teamName=String(body.teamName??"").trim(),summary=String(body.summary??"").trim(),problem=String(body.problem??"").trim(),domain=String(body.domain??""),visibility=String(body.visibility??"private");
  if(title.length<3||title.length>80||teamName.length<2||teamName.length>80||summary.length<10||summary.length>300||problem.length<10||problem.length>500)return NextResponse.json({error:"Complete the project name, team name, summary, and problem statement."},{status:400});
  if(!["healthcare","environment","education","hackathon-tools"].includes(domain)||!["private","mentors_only"].includes(visibility))return NextResponse.json({error:"Choose a valid domain and visibility."},{status:400});
  const id=`project-${crypto.randomUUID()}`;let teamId="";
  await db.transaction(tx=>{
    const existing=tx.select().from(teams).where(eq(teams.name,teamName)).get();
    teamId=existing?.id??`team-${crypto.randomUUID()}`;
    if(!existing)tx.insert(teams).values({id:teamId,name:teamName,hackathon:"Local workspace"}).run();
    const tags=String(body.techTags??"").split(",").map(v=>v.trim()).filter(Boolean).slice(0,12);
    tx.insert(projects).values({id,teamId,title,summary,problem,techTags:JSON.stringify(tags),repoUrl:String(body.repoUrl??"").trim()||null,demoUrl:String(body.demoUrl??"").trim()||null,stage:"idea",readinessScore:0,visibility:visibility as "private"|"mentors_only",domain,createdAt:new Date().toISOString()}).run();
    const projectNeeds=String(body.needs??"").split(",").map(v=>v.trim()).filter(Boolean).slice(0,8);
    if(projectNeeds.length)tx.insert(needs).values(projectNeeds.map((needTag,i)=>({id:`need-${crypto.randomUUID()}-${i}`,projectId:id,needTag:needTag.slice(0,50),priority:i===0?"high":"medium"}))).run();
    if(body.consent==="yes")tx.insert(consents).values({id:`consent-${crypto.randomUUID()}`,projectId:id,scope:"share_profile",granted:true,grantedAt:new Date().toISOString(),grantedBy:"local-workspace"}).run();
    tx.insert(auditLog).values({id:`audit-${crypto.randomUUID()}`,actorId:"local-workspace",action:"project_created",entity:"project",entityId:id,before:null,after:title,at:new Date().toISOString()}).run();
  });
  return NextResponse.json({id},{status:201});
}
