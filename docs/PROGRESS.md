# Build progress

## Phase 0 — Research and decisions: complete
- Confirmed official Next.js and Tailwind setup guidance; checked current npm versions and local Node/npm.
- Recorded stack, database/hosting caveats, synthetic-data policy, and time-budget default in `docs/DECISIONS.md`.
- Environment: Node.js 22.22.3; npm 10.9.8.
- Checks: docs reviewed; ready to scaffold.

## Phase 1 — Skeleton and design system: complete
- Scaffolded Next.js 16 App Router, TypeScript, Tailwind CSS, ESLint.
- Built responsive pill navigation, prototype/synthetic-data banner, section headings, stat tiles, cards, buttons, footer, patterned background, and accessible focus treatments.
- Added working routes for Home, Projects, Mentors, Milestones, Dashboard, and Directory. Unfinished areas are explicitly labelled as prototypes; dashboard stats are blank until they are data-driven.
- Removed remote Google font loading after the production build showed this environment cannot reach fonts.googleapis.com; system sans-serif fallback keeps builds reproducible.
- Checks: `npm run lint` and `npm run build` both pass; all six routes are statically generated.

## Phase 2 — Data model and seed data: complete
- Added Drizzle ORM schema for users, teams, projects, milestones, needs, mentors, matches, consents, feedback, reminders, and audit log.
- Added repeatable synthetic seed script and centralized database read helpers.
- `npm run db:reset` applies schema and refreshes local sample data; second run verified successfully. Counts verified: 12 projects, 18 mentors, 36 milestones, 2 feedback entries.
- Checks: `npm run db:reset`, `npm run lint`, and `npm run build` pass.
- Caveat: SQLite is local prototype storage. Serverless deployment will require durable hosted storage, per Phase 0 decisions.

## Phase 3 — Roles, consent, visibility: complete
- Added visible Team / Mentor / Organizer demo role selector. The choice is carried in a demo cookie and refreshes the current view.
- Projects list reads synthetic SQLite records and applies role-based visibility: Team sees its sample project; organizers see all; mentors see only `public`/`mentors_only` projects with granted profile-sharing consent.
- Team project includes editable visibility and a clear profile-sharing consent checkbox; server route rejects privacy changes for non-team roles. Contact details are not disclosed.
- Verified via live requests: mentor without demo-team role is rejected from editing (403); team consent updates succeed; consented project becomes visible to mentor after setting `mentors_only`; unconsented/private cases are excluded.
- Checks: `npm run lint` and `npm run build` pass.
- Safety note: demo role cookie is not authentication or a production authorization boundary; no actual personal contact details are stored.

## Phase 4 — Core pages: complete
- Projects list and detail read from SQLite; team can create a project profile with validation, domain, needs, visibility and optional profile-sharing consent.
- Project detail shows team, needs, stage/readiness, milestones and feedback. Team project list is scoped to its seeded team; mentor list remains consent and visibility gated.
- Mentor and community directories show synthetic records and provide search plus type filters.
- Checks: `npm run lint` and `npm run build` pass. Verified a temporary synthetic project could be created, appeared in team list and detail, and the seed reset restored the database. Mentor directory renders 18 seeded profiles.

## Phase 5 — Explainable matching: complete
- Added a single pure scoring module with visible rules: +3 exact need/expertise tag, +1 domain overlap, +1 accepting-introductions; unavailable mentors and unconsented projects are excluded.
- Project detail pages show up to four suggested matches with score breakdown, evidence-based “Why matched” reasons, and the no-guarantees notice. Contact details are never displayed.
- Added public “How matching works” page. Team can record a demo request or dismiss a match; request records a preference only and sends no message.
- Checks: `npm run lint` and `npm run build` pass. Confirmed an unconsented project receives no suggestions and a consented project shows the explanation UI.

## Phase 6 — Readiness check and milestone recommender: complete
- Added eight yes/no readiness questions with a clear self-assessment disclaimer. Scoring: 0–2 Idea, 3–5 Prototype, 6–8 Pilot-ready.
- Each unchecked answer maps to a concrete suggested milestone. Team can add each recommendation to the milestone tracker; updates persist in SQLite.
- Milestone tracker reads actual records and lets Team mark unfinished work done as self-reported.
- Checks: `npm run db:reset`, API check-in tests (confirmed `Idea` tier and persisted record), milestone insertion/count test, `npm run lint`, and `npm run build` all pass.

## Phase 7 — Feedback repository: complete
- Added a structured mentor/organizer feedback form (strengths, improvements, one next step, 1–5 rating); feedback is persisted.
- Team can turn a feedback next step into a suggested milestone in one click. Consent is enforced for mentor feedback; organizer can leave feedback for any project.
- Checks: `npm run lint` and `npm run build` pass. Live API test saved feedback as mentor and converted its next step to a milestone as team; seed reset restored synthetic baseline.

## Phase 8 — Organizer dashboard: complete
- Added organizer-only data-driven dashboard: project stage counts, continuation definition, milestone completion rate, matches and accepted suggestions, feedback count, latest recorded activity, and stalled indicator.
- Self-reported completed milestones and verified completed milestones are distinct figures and badges. Verification is a separate mentor/organizer action; it requires a completed milestone and mentor consent when applicable.
- Verified milestones move from `self_reported` to `verified`; they are not double-counted. Dashboard contains only synthetic data.
- Checks: `npm run db:reset`, `npm run lint`, and `npm run build` pass. Live test changed a milestone to done, verified it as organizer, confirmed DB claim became `verified`, and confirmed the dashboard rendered both separate counts.

## Phase 9 — Simulated reminders and audit trail: next
- Next: generated in-app overdue/stale reminders, visible simulation label, and organizer audit entries for consent, visibility, verification, and match status.

## Phase 10 — Polish, deploy, documentation: next
- Accessibility and mobile pass, deploy feasibility, README, architecture diagram, demo script.
