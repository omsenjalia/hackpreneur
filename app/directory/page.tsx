import {AppFrame,PageHeading,SectionTitle} from "../components";
import {listMentors} from "@/src/db/queries";
import {DirectoryGrid} from "../mentors/directory-grid";
export const dynamic="force-dynamic";
export default async function Directory(){const people=await listMentors();return <AppFrame current="/directory"><main className="shell"><PageHeading eyebrow="Directory" title="People and organizations">Search profiles you have added to the local workspace.</PageHeading><SectionTitle>{people.length?`${people.length} profiles`:"Directory"}</SectionTitle>{people.length?<DirectoryGrid people={people}/>:<div className="placeholder"><strong>No directory profiles</strong><p>Profiles you add in Mentors will appear here.</p></div>}</main></AppFrame>}
