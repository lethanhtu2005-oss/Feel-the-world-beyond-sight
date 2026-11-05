# WayEcho partner portal approved flow

Footer `Cổng Đối tác Liên thông` -> `/partner` -> three descriptive partner cards -> exactly one primary action per card -> role-specific demo sign-in dialog -> existing role workspace (`/guide`, `/volunteer`, `/business`).

- Preserves the explanatory descriptions, key benefits and features on all three cards.
- Removes the duplicated role selector and permanently visible demo sign-in panel.
- Sign-in fields are visual placeholders only; no credentials needed for the demo.
- Uses the existing PartnerEnter authorization/redirect implementation.
- Leaves Header and Footer source untouched, including existing Footer `/partner` link.
- Existing operational and accessibility/ethics content below the cards remains intact.

Verification scope: static source inspection and available Node tests; complete Next.js build/browser E2E not available because packages could not be restored from offline npm cache.
