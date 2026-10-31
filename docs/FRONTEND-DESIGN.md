# Frontend direction

## Brief and product inventory

HACKPRENEUR is a local workspace for founders continuing projects after demo day. The app's real objects are teams and project profiles; domains, technologies and needs; milestones with due dates and self-reported or locally verified progress; mentor/community profiles; saved match decisions; readiness checks; feedback; and privacy/activity records. The database starts empty: counts and project rows on the home screen come from saved records and show honest zeroes.

The home screen answers **what helps a project keep going after demo day?** Its signature element is a project row paired with the earliest unfinished milestone, computed from local data. The most frequent actions—starting a project, reviewing readiness and visiting mentors—are directly reachable.

## Chosen direction

Applied the attached HACKPRENEUR design brief and used taste-skill's `draw.mjs --app --kind workspace --keep palette,type`. It dealt **Achromatic ledger** first; that direction's no-colour chrome and no-sidebar shell conflict with the supplied brand, so I redrew to **Accent ladder** (seed `1896289174`) and then followed the build plan's explicit palette and floating-pill navigation. The drawn style itself warns against violet, so retaining `#7C5CFF` is a deliberate, user-directed brand override. Its shared move—pastel tints, outlined controls, and a restrained set of colors—fits this community workspace.

- **Canvas and palette:** off-white `#FAFAF7` with a faint CSS dot field; violet `#7C5CFF` top navigation with a thick `#14142B` outline; mint `#5EEAD4` action; lilac, peach, mint and lemon tiles. The nav labels are bold and large for contrast.
- **Type:** self-hosted DM Sans, matching the build plan's friendly geometric-sans direction without a remote font request.
- **Shell:** floating pill navbar on desktop with four core routes and a keyboard-operable “More” menu; compact mobile pill with an accessible navigation sheet; deep-navy footer.
- **Content:** an honest prototype/local-workspace note; live projects, completed milestones, distinct accepted mentor matches and verified milestones; three audience paths; project rows with their next unfinished milestone.
- **Components:** centered section titles with rules, lightly outlined rounded cards, pastel tags, rounded-square initials, and CSS-drawn corner shapes. Existing forms, routes and API behaviors are preserved.

The dot pattern and brand-violet navbar intentionally diverge from taste-skill's no-gradient/no-violet app defaults because both are explicit requirements in the attached brief. No sample people or vanity counts were introduced.

## Validation

- `npm run lint`, `npm test` (4 tests), and `npm run build` pass.
- Taste-skill's static app lint reports 0 FAIL and 0 WARN.
- Main app routes and both local SVG assets return HTTP 200 in the development preview.
- The screenshot inspector was attempted for desktop and phone widths, but this environment has no Chrome, Edge or Chromium binary; the real-browser visual pass remains outstanding.
