# HACKPRENEUR demo script (about 3–4 minutes)

## Before the demo

```bash
npm run db:reset
npm run dev
```

Use the top-right role selector. Sample data is fictional. No network delivery or introductions are triggered.

## Walkthrough

1. **Landing (20 sec):** “Projects often stop after demo day. HACKPRENEUR gives teams a practical next chapter.” Point out synthetic-data and no-guarantees notice.
2. **Create a profile (35 sec):** Team → Projects → Create a project profile. Enter fictional demo information, select Private and leave sharing unchecked. Save; open its detail page. Show needs, milestones and visibility.
3. **Privacy and consent (25 sec):** On the Team project card choose “Mentors only,” then check the explicit profile-sharing box. Explain that sharing is opt-in, and no contact details are exposed. For the seeded `CareCircle` profile, leave private/consent off to show that mentors do not see it.
4. **Readiness (30 sec):** Open Milestones → Readiness check. Mark a few items and save. Explain that Idea / Prototype / Pilot-ready comes from the team's own answers, not an external endorsement. Add one suggested next step.
5. **Matching (35 sec):** Open a consented project detail. Point to “Why matched”, score breakdown, and the matching-rules page. Say: “These are suggestions; there is no guaranteed introduction or funding.” Record a request only as a demo preference; no message is sent.
6. **Feedback (30 sec):** Switch to Mentor. Open a consented project and leave structured feedback. Switch back to Team and use “Add next step to milestones.”
7. **Self-report then verification (30 sec):** Team marks an unfinished milestone done. Point out “Self-reported.” Switch to Organizer and verify it; it moves to the verified category.
8. **Organizer view (30 sec):** Open Dashboard and show the separate self-reported and verified numbers, continuation definition, stage counts, and project check-in table. Open the Audit trail and point out consent/visibility/verification history. Finish at Milestones to show an overdue reminder labelled “Simulated: no message is sent.”

## Screenshot checklist

- [ ] Landing page at desktop width
- [ ] Mobile landing/navigation
- [ ] Team project with visibility and consent controls
- [ ] Project detail “Why matched” box and no-guarantees copy
- [ ] How matching works rules
- [ ] Readiness result and suggested milestones
- [ ] Structured feedback and milestone conversion
- [ ] Self-reported versus verified dashboard numbers
- [ ] Simulated reminder and organizer audit trail

## Honesty notes

The prototype uses local SQLite and synthetic records. Demo roles are not real authentication. A “Request intro” action stores a preference only. Do not present a preview URL as a production deployment, do not show a real person's information, and do not claim that a real message, introduction, or funding flow happened.
