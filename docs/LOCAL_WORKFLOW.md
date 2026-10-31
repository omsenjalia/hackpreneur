# Local walkthrough

This walkthrough uses information entered by the person testing the application. Start with a new local database; there are no example records.

1. **Start empty:** Run `npm run db:push` and `npm run dev`. Open the home page and confirm the project list and insights show their empty states.
2. **Add a project:** Create a project using information you have permission to store. Review its profile and privacy settings.
3. **Add milestones:** Open the milestone tracker for that project, add a next step, and update its status. The review status records activity in this workspace only.
4. **Readiness:** Complete the self-assessment and review the score and next-step suggestions. These reflect the answers entered, not an external endorsement.
5. **Add mentor records:** Create a mentor profile only with appropriate permission. Enable local matching and use project needs and mentor expertise to inspect any resulting suggestions.
6. **Feedback and activity:** Add feedback and, if useful, turn its next step into a milestone. Review local changes in Activity.

## Scope

HACKPRENEUR stores data in a local SQLite database. There is no sign-in, shared hosted workspace, email/SMS delivery, or external introduction flow. A saved match or review is a local record, not a message or third-party verification. Do not present this local application as a deployed or secured public service.
