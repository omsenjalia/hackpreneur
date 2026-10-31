import Link from "next/link";
import {AppFrame,PageHeading,SectionTitle} from "../components";
import {listMentors} from "@/src/db/queries";
import {DirectoryGrid} from "../mentors/directory-grid";
export const dynamic="force-dynamic";
export default async function Directory(){const people=await listMentors();return <AppFrame current="/directory"><main className="shell"><PageHeading eyebrow="The community" title="Find support that fits">Browse synthetic mentors, incubators, communities, and potential pilot users. Each suggested fit should have a visible explanation.</PageHeading><SectionTitle>Community directory</SectionTitle><DirectoryGrid people={people}/><p style={{marginTop:30}}><Link className="button secondary" href="/mentors">Open mentor directory →</Link></p></main></AppFrame>}
