# HACKPRENEUR — technical decisions

Research checked 31 October 2026. Versions are latest stable results visible from npm at the time of setup; lockfile will pin exact dependency resolution.

| Area | Choice | Reason |
|---|---|---|
| Framework | Next.js 16.4.3, App Router + TypeScript; Node.js 22.22.3 locally (official minimum Node 20.9); `npx create-next-app@latest` | Current stable package version checked on npm; official docs recommend App Router and the CLI defaults configure TypeScript, Tailwind, ESLint, Turbopack and the `@/*` alias. |
| Styling | Tailwind CSS 4.3.3 (create-next-app current default) plus small authored CSS for the bespoke pastel design | Official Tailwind guide currently uses `@tailwindcss/postcss` and `@import "tailwindcss"`; integrated starter minimizes setup risk. |
| Database / ORM | SQLite + Drizzle ORM 0.45.4 / Drizzle Kit 0.31.11 with better-sqlite3 13.0.3 locally; local DB file is ignored by Git | Drizzle officially supports SQLite through libSQL, `node:sqlite`, and better-sqlite3. SQLite avoids provisioning a local server. Vercel's serverless filesystem is not a durable database, so production persistence must use a hosted compatible service (or another durable hosted DB) before deployment. |
| Authentication | Demo mode with visible role switcher and synthetic seeded identities; no real login | Explicitly allowed by the plan and avoids collecting real personal data or spending build time on auth. Enforce role/consent behavior in app logic and label this as a prototype. |
| Hosting | Vercel Hobby as the tentative Next.js host; verify current eligibility/limits at deployment | Official pricing lists Hobby at $0, but states it is for personal, non-commercial use. It has usage caps; persistent data requires an external hosted database. Recheck plan terms before public use. |
| Data policy | Synthetic records only; no real contact information, no actual messages, no guaranteed introductions | Required by the project safety constraints. |
| Time budget | The request contains `[X]` rather than a number. Sensible default: follow the plan's 9h 20m scheduled phase boxes without treating them as a hard stop; prioritize the runnable end-to-end demo if remaining time becomes constrained. | No architecture-changing clarification needed. |

## Current official references consulted

- Next.js installation and system requirements: https://nextjs.org/docs/app/getting-started/installation (minimum Node.js 20.9; `pnpm create next-app@latest my-app --yes`; defaults include TypeScript, Tailwind, ESLint, App Router, Turbopack, and `@/*`).
- create-next-app CLI reference: https://nextjs.org/docs/15/app/api-reference/cli/create-next-app (npm command `npx create-next-app@latest`; options include `--ts`, `--tailwind`, `--eslint`, `--app`, `--use-npm`).
- Tailwind Next.js guide: https://tailwindcss.com/docs/guides/nextjs (Tailwind v4 PostCSS setup and CSS import).
- Drizzle SQLite guide: https://orm.drizzle.team/docs/get-started-sqlite (SQLite driver choices and setup).
- Vercel pricing: https://vercel.com/pricing (Hobby $0; personal/non-commercial use and caps apply).

## Decisions to revisit

- Choose the durable hosted database after assessing actual deployment target; do not put mutable production data on ephemeral serverless local disk.
- Confirm Vercel Hobby suitability and database provider quotas before any public demo deployment.
- Recheck package versions and instructions immediately before deploy, since they change rapidly.
