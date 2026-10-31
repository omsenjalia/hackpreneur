import {AppFrame,PageHeading} from "../../components";
import {ProjectForm} from "../project-form";
export default function NewProject(){return <AppFrame current="/projects"><main className="shell"><PageHeading eyebrow="New profile · demo mode" title="Tell us what you’re building">Start with the idea and what you need next. Visibility starts private unless you choose otherwise, and sharing needs your explicit consent.</PageHeading><ProjectForm/></main></AppFrame>}
