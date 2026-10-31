"use client";
import {useState} from "react";

export type DemoRole="team"|"mentor"|"organizer";
export function RoleSwitcher(){const [role,setRole]=useState<DemoRole>(()=>{if(typeof document==="undefined")return "team";const found=document.cookie.match(/(?:^|; )demo_role=(team|mentor|organizer)/);return found?(found[1] as DemoRole):"team"});return <label className="role-control">Demo role <select aria-label="Choose demo role" value={role} onChange={e=>{const next=e.target.value as DemoRole;setRole(next);document.cookie=`demo_role=${next}; Path=/; SameSite=Lax`;window.location.reload();}}><option value="team">Team</option><option value="mentor">Mentor</option><option value="organizer">Organizer</option></select></label>}
