"use client";
import {getCurrentDate} from "@/src/utils/time";
import type {InferSelectModel} from "drizzle-orm";
import {milestones as milestoneTable} from "@/src/db/schema";
type Milestone=InferSelectModel<typeof milestoneTable>;
export function ReminderPanel({milestones}:{milestones:Milestone[]}){const today=getCurrentDate();const overdue=milestones.filter(item=>item.status!=="done"&&item.dueDate<today);return <section className="reminders"><h2>Overdue milestones</h2>{overdue.length?<><p>Review these next steps and update their status when ready.</p><ul>{overdue.map(item=><li key={item.id}><strong>{item.title}</strong> · due {item.dueDate}</li>)}</ul></>:<p>No overdue milestones.</p>}</section>}
