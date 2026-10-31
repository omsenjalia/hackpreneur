"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
export function ProjectForm(){const router=useRouter();const [error,setError]=useState("");const [busy,setBusy]=useState(false);return <form className="project-form card" onSubmit={async e=>{e.preventDefault();setBusy(true);setError("");const data=new FormData(e.currentTarget);try{const response=await fetch("/api/projects",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(data))});const result=await response.json();if(!response.ok)throw new Error(result.error??"Could not save the project.");router.push(`/projects/${result.id}`);router.refresh();}catch(err){setError(err instanceof Error?err.message:"Could not save the project.");setBusy(false);}}}>
<label>Project name<input required minLength={3} maxLength={80} name="title" autoComplete="off"/></label>
<label>Team name<input required minLength={2} maxLength={80} name="teamName" autoComplete="organization"/></label>
<label>Summary<textarea required minLength={10} maxLength={300} name="summary" rows={3}/></label>
<label>Problem statement<textarea required minLength={10} maxLength={500} name="problem" rows={3}/></label>
<label>Domain<select name="domain" defaultValue=""><option value="" disabled>Select a domain</option><option value="healthcare">Healthcare</option><option value="environment">Environment</option><option value="education">Education</option><option value="hackathon-tools">Tools and platforms</option></select></label>
<label>Technologies<input name="techTags" placeholder="Comma-separated technologies"/></label>
<label>Needs<input name="needs" placeholder="Comma-separated needs"/></label>
<label>Repository link<input name="repoUrl" type="url"/></label>
<label>Product link<input name="demoUrl" type="url"/></label>
<label>Project visibility<select name="visibility" defaultValue="private"><option value="private">Private in this workspace</option><option value="mentors_only">Available for local matching</option></select></label>
<label className="consent-check"><input type="checkbox" name="consent" value="yes"/> Include this project in local mentor match suggestions</label>
{error&&<p role="alert" className="field-error">{error}</p>}<button className="button" disabled={busy}>{busy?"Saving…":"Save project"}</button></form>}
