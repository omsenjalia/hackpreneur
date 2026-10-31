import { AppFrame, PageHeading, SectionTitle } from "../components";
import { matchingRules } from "@/src/matching/score";

export default function Matching() {
  return <AppFrame current="/matching"><main className="shell">
    <PageHeading eyebrow="Matching" title="How project matching works">Suggestions use only the project needs and mentor expertise saved in this workspace.</PageHeading>
    <SectionTitle>Scoring rules</SectionTitle>
    <ol className="rule-list">{matchingRules.map((rule) => <li key={rule}>{rule}</li>)}</ol>
    <p className="safety-note" style={{ marginTop: 22 }}>Matching runs locally. Saving a match does not send a message or share a contact.</p>
  </main></AppFrame>;
}
