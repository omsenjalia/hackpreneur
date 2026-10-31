# Local walkthrough

Start with a new local database for an empty workspace, or use the opt-in synthetic demo dataset for a walkthrough. Demo records are explicitly marked and are not real people or projects.

1. **Choose a starting state:** Run `npm run db:push` for an empty workspace, or `npm run db:seed` to add demo records. Then run `npm run dev`. The seed is re-runnable and does not overwrite existing records; use a separate database if you want demo data isolated.
2. **Add a project:** Create a project using information you have permission to store. Review its profile and privacy settings.
3. **Add milestones:** Open the milestone tracker for that project, add a next step, and update its status. The review status records activity in this workspace only.
4. **Readiness:** Complete the self-assessment and review the score and next-step suggestions. These reflect the answers entered, not an external endorsement.
5. **Add mentor records:** Create a mentor profile only with appropriate permission. Enable local matching and use project needs and mentor expertise to inspect any resulting suggestions.
6. **Feedback and activity:** Add feedback and, if useful, turn its next step into a milestone. Review local changes in Activity.

## Scope

HACKPRENEUR stores data in a local SQLite database. There is no sign-in, shared hosted workspace, email/SMS delivery, or external introduction flow. A saved match or review is a local record, not a message or third-party verification. Do not present this local application as a deployed or secured public service.
