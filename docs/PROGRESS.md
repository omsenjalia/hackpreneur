# Build status

## Current implementation

- Responsive project-continuation workspace using Next.js, TypeScript, Tailwind CSS, Drizzle ORM, and local SQLite.
- Database starts empty by default. `npm run db:seed` optionally adds repeatable, clearly synthetic demo teams, projects, mentors, milestones, feedback, readiness checks, consents, and explainable matches; it does not clear or overwrite workspace data.
- Users can create project and mentor profiles, manage milestones, complete readiness reviews, add structured feedback, and review workspace activity.
- Matching is deterministic and explainable, and only uses profiles saved in the current local database.
- Matching, reminder, and review actions are local records. No external messages or introductions are sent.
- UI uses a restrained ink/navy and teal palette with neutral surfaces, responsive layouts, and visible focus treatment.

## Scope and limitations

This repository implements a local single-workspace application. It does not configure user authentication, multi-user access, external messaging, or cloud storage. The local review state is not a third-party certification. No production-security or hosted-service claim is made.

It does deploy to Vercel as a Node serverless app. Storage there is an ephemeral per-instance SQLite file in `/tmp`, so a deployment demonstrates the interface rather than providing a durable shared workspace. Cloudflare Pages/Workers are not supported: `better-sqlite3` is a native addon and cannot load in that runtime. See the README's "Deploying" section.

## Verification

- `npm run db:push` applied to a fresh local database; project, mentor, milestone, and feedback tables contained zero records before browser checks.
- `npm test`: matching/readiness and synthetic-seed integration tests passed; the seed test runs twice against an isolated temporary SQLite database and checks idempotency, consent, foreign keys, and preservation of workspace-owned records.
- `tests/runtime-bootstrap.test.ts` boots the real `src/db/index.ts` in a child process and checks the deployed code paths: a cold database gets its schema with no `drizzle-kit` and no `prestart`, `SEED_DEMO_DATA` seeds once and not again on a warm database, a read-only working directory falls back to the OS temp directory and seeds, and an unusable explicit `DB_FILE_NAME` fails loudly instead of relocating.
- `tests/schema-sql.test.ts` regenerates the DDL and fails if `src/db/schema-sql.ts` has drifted from `src/db/schema.ts`.
- Deployment rehearsal: the production build output was served from a read-only working directory with no `data/` directory present, reproducing Vercel's `/var/task`. All ten routes returned HTTP 200 and `POST /api/projects` returned 201. Before the runtime bootstrap, every route in that configuration returned HTTP 500.
- `npm run lint`: passed without warnings.
- `npm run build`: optimized production build and TypeScript checks passed.
- Browser checks: home, projects, directory, mentors, dashboard, milestones, readiness, matching, and activity returned HTTP 200. Empty states displayed, project and mentor creation worked, no runtime errors were reported, and the 390 px mobile viewport had no horizontal overflow.
- Temporary browser-created records were removed; the local database was confirmed empty after the flow.
- The guarded `db:clear` command was tested against a temporary database path.
