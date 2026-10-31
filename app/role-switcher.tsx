"use client";
import {useEffect,useRef} from "react";

export type DemoRole="team"|"mentor"|"organizer";
export function RoleSwitcher(){const select=useRef<HTMLSelectElement>(null);useEffect(()=>{const found=document.cookie.match(/(?:^|; )demo_role=(team|mentor|organizer)/);if(select.current&&found)select.current.value=found[1];else if(!found)document.cookie="demo_role=team; Path=/; SameSite=Lax";},[]);return <label className="role-control">Demo role <select ref={select} aria-label="Choose demo role" defaultValue="team" onChange={e=>{const next=e.target.value as DemoRole;document.cookie=`demo_role=${next}; Path=/; SameSite=Lax`;window.location.reload();}}><option value="team">Team</option><option value="mentor">Mentor</option><option value="organizer">Organizer</option></select></label>}
