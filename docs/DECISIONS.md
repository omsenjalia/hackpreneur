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
| Hosting | No deployment configured | Cloud hosting, shared access, authentication, and production security are outside the local-only scope. |

## Matching

The matching rules are maintained in `src/matching/score.ts`. Projects must be enabled for matching and mentors must be available. Exact need/expertise overlap adds three points; shared domain and availability each add one. At least one need or domain overlap is required.
