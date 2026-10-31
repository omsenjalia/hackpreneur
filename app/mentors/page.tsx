import {AppFrame,PageHeading,SectionTitle} from "../components";
import {listMentors} from "@/src/db/queries";
import {DirectoryGrid} from "./directory-grid";
export const dynamic="force-dynamic";
export default async function Mentors(){const people=await listMentors();return <AppFrame current="/mentors"><main className="shell"><PageHeading eyebrow="People and communities" title="Meet your next sounding board">Synthetic directory profiles. Suggestions are not promises of introductions or funding.</PageHeading><SectionTitle>Mentor directory · {people.length} sample profiles</SectionTitle><DirectoryGrid people={people}/></main></AppFrame>}
