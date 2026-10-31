import { scoreMatches } from "@/src/matching/score";
import { getReadinessLevel, readinessQuestions } from "@/src/readiness/rules";

type ProjectFixture = {
  title: string;
  summary: string;
  problem: string;
  domain: string;
  stage: string;
  technologies: string[];
  needs: [string, string];
  nextSteps: [string, string];
};

const projectFixtures: ProjectFixture[] = [
  { title: "DEMO: Care Queue", summary: "A prototype for making clinic check-ins easier to follow.", problem: "Small clinics need a clearer way to tell patients when their turn is coming.", domain: "healthcare", stage: "pilot", technologies: ["Next.js", "SQLite"], needs: ["UI feedback", "privacy review"], nextSteps: ["Test the check-in flow with five clinic visitors", "Review the patient data fields with a privacy checklist"] },
  { title: "DEMO: Flood Watch", summary: "A community concept for sharing neighborhood flood observations.", problem: "Residents need timely local observations when heavy rain changes road conditions.", domain: "environment", stage: "prototype", technologies: ["TypeScript", "MapLibre"], needs: ["sensor testing", "pilot users"], nextSteps: ["Compare the rainfall alert against two public readings", "Ask a neighborhood group to review the alert wording"] },
  { title: "DEMO: Class Loop", summary: "A lightweight feedback space for classroom project teams.", problem: "Teachers need a low-friction way to gather student feedback between lessons.", domain: "education", stage: "idea", technologies: ["React", "SQLite"], needs: ["teacher feedback", "user research"], nextSteps: ["Sketch a teacher's first five minutes in the tool", "Review the question set with two educators"] },
  { title: "DEMO: Team Board", summary: "A small project board for hackathon teams after the event.", problem: "Teams lose track of ownership and next actions once the hackathon schedule ends.", domain: "hackathon-tools", stage: "testing", technologies: ["Next.js", "Drizzle"], needs: ["matching logic", "accessibility"], nextSteps: ["Keyboard-test the task creation flow", "Compare suggested expertise tags with team needs"] },
  { title: "DEMO: Care Notes", summary: "A sample workflow for keeping follow-up notes organized.", problem: "Care teams need a consistent, privacy-aware handoff for non-clinical follow-ups.", domain: "healthcare", stage: "prototype", technologies: ["TypeScript", "PostgreSQL"], needs: ["API review", "data safety"], nextSteps: ["Map the minimum fields needed for a follow-up", "Review the API boundary with a security checklist"] },
  { title: "DEMO: River Report", summary: "A shared map concept for recording local river conditions.", problem: "Community groups need a repeatable way to log and compare river observations.", domain: "environment", stage: "pilot", technologies: ["React", "MapLibre"], needs: ["map UX", "pilot users"], nextSteps: ["Walk through the map legend with three volunteers", "Document how a field observation is checked"] },
  { title: "DEMO: Read Right", summary: "A reading-practice prototype designed for short classroom sessions.", problem: "Learners need short exercises that teachers can adapt without complex setup.", domain: "education", stage: "testing", technologies: ["Next.js", "SQLite"], needs: ["accessibility", "teacher feedback"], nextSteps: ["Check the reading flow with a screen reader", "Ask a teacher to review one lesson template"] },
  { title: "DEMO: DemoDay Kit", summary: "A checklist concept for turning a hackathon demo into a plan.", problem: "Teams need a useful handoff from a demo presentation to their next work session.", domain: "hackathon-tools", stage: "prototype", technologies: ["React", "Drizzle"], needs: ["onboarding", "privacy review"], nextSteps: ["Ask a new team to complete the first-run checklist", "Remove any project fields not needed for a mentor suggestion"] },
  { title: "DEMO: Sample Care", summary: "A mock service directory for comparing local care options.", problem: "Families need clearer details when comparing nearby support services.", domain: "healthcare", stage: "idea", technologies: ["TypeScript", "SQLite"], needs: ["data validation", "user research"], nextSteps: ["List which directory fields need a source note", "Review the service filters with a community group"] },
  { title: "DEMO: Green Ledger", summary: "A classroom exercise for tracking small sustainability experiments.", problem: "Student groups need a simple record of what they changed and observed.", domain: "environment", stage: "prototype", technologies: ["React", "SQLite"], needs: ["data validation", "teacher feedback"], nextSteps: ["Agree on a consistent unit for each activity", "Test a weekly summary with one student group"] },
  { title: "DEMO: Class Notes", summary: "A sample space for sharing class notes with clear ownership.", problem: "Project teams need to find the latest notes without exposing private details.", domain: "education", stage: "pilot", technologies: ["Next.js", "TypeScript"], needs: ["UI feedback", "accessibility"], nextSteps: ["Check note sharing with keyboard-only navigation", "Ask two learners to find and update a shared note"] },
  { title: "DEMO: Team Pulse", summary: "A weekly check-in concept for teams continuing after demo day.", problem: "Student teams need a small, predictable ritual to keep a project moving.", domain: "hackathon-tools", stage: "idea", technologies: ["React", "SQLite"], needs: ["user research", "onboarding"], nextSteps: ["Interview three teams about their weekly check-in", "Test a one-minute project update form"] },
];

const mentorFixtures = [
  { name: "Demo Mentor 01", org: "Example Health Lab", type: "mentor", expertiseTags: ["UI feedback", "privacy review", "care workflows"], domains: ["healthcare"], availability: "Demo availability: weekly", availableForMatching: true },
  { name: "Demo Mentor 02", org: "Example Civic Lab", type: "community", expertiseTags: ["sensor testing", "pilot users", "field research"], domains: ["environment"], availability: "Demo availability: fortnightly", availableForMatching: true },
  { name: "Demo Mentor 03", org: "Example Learning Studio", type: "mentor", expertiseTags: ["teacher feedback", "user research", "lesson design"], domains: ["education"], availability: "Demo availability: weekly", availableForMatching: true },
  { name: "Demo Mentor 04", org: "Example Product Circle", type: "incubator", expertiseTags: ["matching logic", "accessibility", "onboarding"], domains: ["hackathon-tools"], availability: "Demo availability: monthly", availableForMatching: true },
  { name: "Demo Mentor 05", org: "Example Health Lab", type: "mentor", expertiseTags: ["API review", "data safety", "privacy review"], domains: ["healthcare"], availability: "Demo availability: monthly", availableForMatching: true },
  { name: "Demo Mentor 06", org: "Example River Group", type: "pilot user", expertiseTags: ["map UX", "pilot users", "sensor testing"], domains: ["environment"], availability: "Demo availability: fortnightly", availableForMatching: true },
  { name: "Demo Mentor 07", org: "Example Learning Studio", type: "community", expertiseTags: ["accessibility", "teacher feedback", "user research"], domains: ["education"], availability: "Demo availability: monthly", availableForMatching: true },
  { name: "Demo Mentor 08", org: "Example Product Circle", type: "mentor", expertiseTags: ["onboarding", "product discovery", "matching logic"], domains: ["hackathon-tools"], availability: "Not accepting demo matches", availableForMatching: false },
  { name: "Demo Mentor 09", org: "Example Data Clinic", type: "incubator", expertiseTags: ["data validation", "database design", "API review"], domains: ["healthcare", "environment"], availability: "Demo availability: weekly", availableForMatching: true },
  { name: "Demo Mentor 10", org: "Example Access Lab", type: "mentor", expertiseTags: ["accessibility", "UI feedback", "screen readers"], domains: ["education", "hackathon-tools"], availability: "Demo availability: monthly", availableForMatching: true },
  { name: "Demo Mentor 11", org: "Example Green Studio", type: "community", expertiseTags: ["data validation", "field research", "pitch feedback"], domains: ["environment"], availability: "Demo availability: fortnightly", availableForMatching: true },
  { name: "Demo Mentor 12", org: "Example Research Desk", type: "pilot user", expertiseTags: ["user research", "interview planning", "teacher feedback"], domains: ["education"], availability: "Not accepting demo matches", availableForMatching: false },
  { name: "Demo Mentor 13", org: "Example Build Collective", type: "mentor", expertiseTags: ["database design", "testing", "onboarding"], domains: ["hackathon-tools", "healthcare"], availability: "Demo availability: monthly", availableForMatching: true },
  { name: "Demo Mentor 14", org: "Example Community Works", type: "community", expertiseTags: ["pilot users", "service design", "map UX"], domains: ["environment", "healthcare"], availability: "Demo availability: weekly", availableForMatching: true },
  { name: "Demo Mentor 15", org: "Example Classroom Network", type: "incubator", expertiseTags: ["teacher feedback", "accessibility", "onboarding"], domains: ["education"], availability: "Demo availability: fortnightly", availableForMatching: true },
  { name: "Demo Mentor 16", org: "Example Launch Circle", type: "mentor", expertiseTags: ["pitch feedback", "product discovery", "privacy review"], domains: ["hackathon-tools", "environment"], availability: "Demo availability: monthly", availableForMatching: true },
] as const;

const readinessPatterns = [
  [true, true, true, true, true, true, false, true],
  [true, true, true, false, false, true, false, false],
  [true, false, true, false, false, false, true, false],
  [true, true, true, true, false, true, true, false],
  [false, true, false, false, true, false, false, false],
  [true, true, true, true, true, false, true, true],
] as const;

function isoDateFrom(now: Date, dayOffset: number): string {
  const date = new Date(now);
  date.setUTCDate(date.getUTCDate() + dayOffset);
  return date.toISOString().slice(0, 10);
}

export function buildDemoData(now = new Date()) {
  const teams = projectFixtures.map((_, index) => ({
    id: `demo-team-${String(index + 1).padStart(2, "0")}`,
    name: `DEMO Team ${String(index + 1).padStart(2, "0")}`,
    hackathon: "Synthetic HACKPRENEUR demo event",
  }));

  const projects = projectFixtures.map((fixture, index) => ({
    id: `demo-project-${String(index + 1).padStart(2, "0")}`,
    teamId: teams[index].id,
    title: fixture.title,
    summary: fixture.summary,
    problem: fixture.problem,
    techTags: JSON.stringify(fixture.technologies),
    repoUrl: `https://example.com/demo/repositories/project-${String(index + 1).padStart(2, "0")}`,
    demoUrl: `https://example.com/demo/projects/project-${String(index + 1).padStart(2, "0")}`,
    stage: fixture.stage,
    readinessScore: index < readinessPatterns.length
      ? Math.round(readinessPatterns[index].filter(Boolean).length * 100 / readinessQuestions.length)
      : 0,
    visibility: index < 8 ? "mentors_only" as const : "private" as const,
    domain: fixture.domain,
    createdAt: new Date(now.getTime() - (28 - index * 2) * 86400000).toISOString(),
  }));

  const needs = projectFixtures.flatMap((fixture, index) => fixture.needs.map((needTag, needIndex) => ({
    id: `demo-need-${String(index + 1).padStart(2, "0")}-${needIndex + 1}`,
    projectId: projects[index].id,
    needTag,
    priority: needIndex === 0 ? "high" : "medium",
  })));

  const mentors = mentorFixtures.map((mentor, index) => ({
    id: `demo-mentor-${String(index + 1).padStart(2, "0")}`,
    ...mentor,
    expertiseTags: JSON.stringify(mentor.expertiseTags),
    domains: JSON.stringify(mentor.domains),
  }));

  const milestones = projectFixtures.flatMap((fixture, index) => {
    const firstStatus = ["done", "done", "doing", "todo"][index % 4] as "todo" | "doing" | "done";
    const secondStatus = index % 4 === 0 ? "done" as const : index % 2 === 0 ? "todo" as const : "doing" as const;
    const firstVerified = firstStatus === "done" && index % 4 === 0;
    const firstDueOffset = firstStatus === "done" ? -8 + (index % 4) : index % 4 === 3 ? -2 : 4 + index;
    const secondDueOffset = secondStatus === "done" ? -4 : 6 + index;
    const firstId = `demo-milestone-${String(index + 1).padStart(2, "0")}-01`;
    const secondId = `demo-milestone-${String(index + 1).padStart(2, "0")}-02`;
    return [
      {
        id: firstId,
        projectId: projects[index].id,
        title: fixture.nextSteps[0],
        description: `Synthetic demo task for ${fixture.title.replace("DEMO: ", "")}.`,
        dueDate: isoDateFrom(now, firstDueOffset),
        status: firstStatus,
        source: "suggested" as const,
        progressClaim: firstVerified ? "verified" as const : "self_reported" as const,
        verifiedBy: firstVerified ? "demo-organizer" : null,
        verifiedAt: firstVerified ? new Date(now.getTime() - (2 + index) * 86400000).toISOString() : null,
      },
      {
        id: secondId,
        projectId: projects[index].id,
        title: fixture.nextSteps[1],
        description: `Follow-up example milestone for ${fixture.title.replace("DEMO: ", "")}.`,
        dueDate: isoDateFrom(now, secondDueOffset),
        status: secondStatus,
        source: "custom" as const,
        progressClaim: "self_reported" as const,
        verifiedBy: null,
        verifiedAt: null,
      },
    ];
  });

  const consents = projects.slice(0, 8).map((project, index) => ({
    id: `demo-consent-${String(index + 1).padStart(2, "0")}`,
    projectId: project.id,
    scope: "share_profile",
    granted: index < 6,
    grantedAt: index < 6 ? new Date(now.getTime() - (10 - index) * 86400000).toISOString() : null,
    grantedBy: project.teamId,
  }));

  const readinessChecks = readinessPatterns.map((answers, index) => ({
    id: `demo-readiness-${String(index + 1).padStart(2, "0")}`,
    projectId: projects[index].id,
    answers: JSON.stringify(answers),
    level: getReadinessLevel([...answers]),
    updatedAt: new Date(now.getTime() - (6 + index) * 86400000).toISOString(),
  }));

  const feedback = [0, 2, 4, 6, 8, 10].map((projectIndex, index) => ({
    id: `demo-feedback-${String(index + 1).padStart(2, "0")}`,
    projectId: projects[projectIndex].id,
    authorName: `DEMO Reviewer ${String(index + 1).padStart(2, "0")}`,
    strengths: "The project describes a clear user need and a practical first test.",
    weaknesses: "The next experiment and its success criteria could be more specific.",
    nextStep: projectFixtures[projectIndex].nextSteps[0],
    rating: 3 + (index % 3),
    createdAt: new Date(now.getTime() - (index + 1) * 86400000).toISOString(),
  }));

  const matches = projects.slice(0, 6).flatMap((project, projectIndex) => {
    const consent = consents[projectIndex];
    if (!consent.granted) return [];
    const projectNeeds = needs.filter((need) => need.projectId === project.id).map((need) => need.needTag);
    const suggestions = scoreMatches({ id: project.id, domain: project.domain, stage: project.stage, needs: projectNeeds }, mentors.map((mentor) => ({
      id: mentor.id,
      name: mentor.name,
      org: mentor.org,
      type: mentor.type,
      expertiseTags: JSON.parse(mentor.expertiseTags) as string[],
      domains: JSON.parse(mentor.domains) as string[],
      availableForMatching: mentor.availableForMatching,
    })), true);
    const suggestion = suggestions[0];
    if (!suggestion) return [];
    return [{
      id: `demo-match-${String(projectIndex + 1).padStart(2, "0")}`,
      projectId: project.id,
      mentorId: suggestion.mentor.id,
      score: suggestion.score,
      reasons: JSON.stringify(suggestion.reasons),
      status: projectIndex % 3 === 0 ? "team_accepted" : projectIndex % 3 === 1 ? "declined" : "suggested",
    }];
  });

  const auditLog = [
    { id: "demo-audit-01", actorId: "demo-organizer", action: "visibility_changed", entity: "project", entityId: projects[6].id, before: "private", after: "mentors_only", at: new Date(now.getTime() - 14 * 86400000).toISOString() },
    { id: "demo-audit-02", actorId: "demo-team-01", action: "consent_changed", entity: "project", entityId: projects[0].id, before: "false", after: "true", at: new Date(now.getTime() - 10 * 86400000).toISOString() },
    { id: "demo-audit-03", actorId: "demo-team-01", action: "match_status_changed", entity: "match", entityId: matches[0].id, before: "suggested", after: "team_accepted", at: new Date(now.getTime() - 4 * 86400000).toISOString() },
    { id: "demo-audit-04", actorId: "demo-organizer", action: "outcome_verified", entity: "milestone", entityId: "demo-milestone-01-01", before: "self_reported", after: "verified", at: new Date(now.getTime() - 2 * 86400000).toISOString() },
    { id: "demo-audit-05", actorId: "demo-organizer", action: "outcome_verified", entity: "milestone", entityId: "demo-milestone-05-01", before: "self_reported", after: "verified", at: new Date(now.getTime() - 6 * 86400000).toISOString() },
  ];

  return { teams, projects, needs, mentors, milestones, consents, readinessChecks, feedback, matches, auditLog };
}

export const DEMO_RECORD_COUNTS = { teams: 12, projects: 12, mentors: 16, needs: 24, milestones: 24, consents: 8, readinessChecks: 6, feedback: 6, matches: 6, auditLog: 5 } as const;
