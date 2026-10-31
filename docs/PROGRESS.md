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

## Phase 5 — Explainable matching: next
- Next: centralize scoring, show reasons and explain matching rules; guarantee mentors see no project contact details.

## Phases 6–10 — next
- Readiness, feedback, dashboard, reminders/audit, polish/deploy/docs.
