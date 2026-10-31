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

## Phase 3 — Roles, consent, visibility: next
- Next: visible demo role switcher and explicit prototype-only role-aware visibility/consent UX; no real authentication.

## Phases 4–10 — next
- Core pages, matching, readiness, feedback, dashboard, reminders/audit, polish/deploy/docs.
