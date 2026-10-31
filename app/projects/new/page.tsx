import {AppFrame,PageHeading} from "../../components";
import {ProjectForm} from "../project-form";
export default function NewProject(){return <AppFrame current="/projects"><main className="shell"><PageHeading eyebrow="Projects" title="Create a project">Add the project details you want to track. Your information stays in this local workspace.</PageHeading><ProjectForm/></main></AppFrame>}
