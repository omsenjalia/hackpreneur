# Technical decisions

| Area | Decision | Rationale |
| --- | --- | --- |
| Runtime | Next.js App Router with TypeScript | Server-rendered workspace pages with typed route handlers. |
| Styling | Tailwind CSS plus a small shared CSS system | Consistent, responsive components and deliberate accessible focus states. |
| Storage | Local SQLite through Drizzle ORM | Data remains in the local workspace and can be used without a hosted database. |
| Initial data | Empty database by default; optional synthetic seed via `npm run db:seed` | Keeps new workspaces honest and lets teams opt into clearly marked demo records for walkthroughs and tests. |
| Identity | No account or authentication service | This build is explicitly local-only; the interface does not simulate user roles. |
| Messaging | Not connected | Match choices and reminders remain local records; no email, SMS, or external contact is sent. |
| Matching | Deterministic, explainable scoring | Users can inspect the criteria; it does not claim AI-based judgment or guaranteed outcomes. |
| Reviews | Local self-report and workspace review states | A review state is not presented as third-party verification or certification. |
| Hosting | Vercel (Node serverless) with an ephemeral `/tmp` SQLite file | The app is a Node server over a SQLite file. Vercel runs Node; Cloudflare Workers cannot load the `better-sqlite3` native addon. `/tmp` is the only writable path, so the deployed instance is a demonstration rather than a shared workspace. Real persistence needs a networked database. |
| Runtime schema | Compiled DDL in `src/db/schema-sql.ts`, applied on import | Serverless hosts never run `predev` / `prestart`, and `drizzle-kit` is a devDependency absent at runtime. The DDL is generated from `schema.ts` by `npm run db:schema-sql`, and a test fails if it goes stale. |

## Matching

The matching rules are maintained in `src/matching/score.ts`. Projects must be enabled for matching and mentors must be available. Exact need/expertise overlap adds three points; shared domain and availability each add one. At least one need or domain overlap is required.
