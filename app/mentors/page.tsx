import {AppFrame,PageHeading,SectionTitle} from "../components";
import {listMentors} from "@/src/db/queries";
import {DirectoryGrid} from "./directory-grid";
import {MentorForm} from "./mentor-form";
export const dynamic="force-dynamic";
export default async function Mentors(){const people=await listMentors();return <AppFrame current="/mentors"><main className="shell"><PageHeading eyebrow="Directory" title="Mentors and communities">Manage the profiles available to your local matching workspace.</PageHeading><SectionTitle>{people.length?`${people.length} profiles`:"Mentor profiles"}</SectionTitle>{people.length?<DirectoryGrid people={people}/>:<div className="placeholder"><strong>No profiles added</strong><p>Add a real mentor or organization profile to make it available for matching.</p></div>}<div style={{marginTop:28}}><MentorForm/></div></main></AppFrame>}
