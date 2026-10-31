# Frontend direction

## Brief and product inventory

HACKPRENEUR is a local, private workspace for founders continuing projects after demo day. The real objects are teams and project profiles; project domains, technologies and needs; milestones with due dates and self-reported or locally verified progress; mentor and community profiles with expertise and availability; saved match decisions; readiness check-ins; feedback; and privacy consent/activity records. These are the information shown in the app—there are no seeded people, projects, or vanity totals.

The home screen's question is **what can I move forward next?** The most frequent action is to create a project or open its next milestone. Its signature element is the project row paired with the earliest unfinished milestone, computed from the local database. Counts are real and retain honest zeros.

## Chosen direction

Used taste-skill's `draw.mjs --app --kind workspace` for the HACKPRENEUR brief. The drawn direction was **Editorial greeting**. Its quiet, editorial hierarchy and responsive workspace shell fit a founder's daily work better than an analytics-heavy dashboard. The product face is a soft sage canvas, grounded in the local-workspace idea, with a deep teal accent reserved for primary actions and meaningful links. The home composition keeps the greeting, actual record counts, projects-in-motion and next-step actions in view; related records elsewhere use flat, lightly outlined panels.

- **Typography:** self-hosted Instrument Sans for interface text and Instrument Serif for the home statement and page titles.
- **Shell:** persistent labelled sidebar on desktop; compact top bar and an accessible, full-height navigation sheet on narrow screens.
- **Colour:** white workspace, sage-tinted canvas and metric field, dark ink, muted supporting text and a restrained teal action colour. No gradients, glows, decorative metrics, or remote font requests.
- **Interaction:** visible focus, touch-sized mobile controls, reduced-motion support, and existing form/API flows retained.

## Validation

- `npm run lint`, `npm test`, and `npm run build` pass.
- The taste-skill static app lint reports zero FAIL findings.
- Its screenshot inspector was attempted at 1440px and 390px but could not run because this environment has no Chrome, Edge, or Chromium binary. The development preview and route responses were checked instead; a real-browser visual pass remains a follow-up when a browser is available.
