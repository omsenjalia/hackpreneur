import {desc} from "drizzle-orm";
import {AppFrame,PageHeading,SectionTitle} from "../components";
import {db} from "@/src/db";
import {auditLog} from "@/src/db/schema";
export const dynamic="force-dynamic";
export default async function Audit(){const events=await db.select().from(auditLog).orderBy(desc(auditLog.at)).all();return <AppFrame current="/audit"><main className="shell"><PageHeading eyebrow="Workspace history" title="Activity">A record of project, privacy, matching, and review changes.</PageHeading><SectionTitle>{events.length?`${events.length} recorded changes`:"Recent activity"}</SectionTitle>{events.length?<div className="table-wrap"><table><thead><tr><th>When</th><th>Action</th><th>Record</th><th>Change</th></tr></thead><tbody>{events.map(event=><tr key={event.id}><td>{new Date(event.at).toLocaleString()}</td><td>{event.action.replaceAll("_"," ")}</td><td>{event.entity} · {event.entityId.slice(0,18)}</td><td>{event.before??"—"} → {event.after??"—"}</td></tr>)}</tbody></table></div>:<div className="placeholder">Changes made in this workspace will appear here.</div>}</main></AppFrame>}
