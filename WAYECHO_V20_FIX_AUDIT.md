# WayEcho V20 - Fix audit (03/11/2026)

## Automated verification
`node --test tests/*.test.mjs` => **56 pass / 0 fail**. Previous V19: 33 pass / 6 fail / 39 total; the repaired JSON dependency made additional P0-B tests runnable (56 total).

## Changes
- Restore blog destination references with conservative placeholders for Văn Miếu and Hoàng thành Thăng Long; no invented coordinates or unverified image, no guarantee of wheelchair/blind accessibility. These destinations are outside the narrow Old Quarter primary area and should be split/retired from the Old Quarter-focused content plan.
- Repair Node JSON import via generated JS dataset (`data/oldQuarterServicesData.js`) so runtime can exercise booking and permissions tests. Keep original JSON as data source for review.
- Restore explicitly marked internal DEMO legacy catalog IDs `demo-hotel`/`demo-restaurant` used in pre-existing booking tests and account records; NOT actual hotels/restaurants. Check UX before publishing these.
- Add native Gallery `<dialog>` with `showModal`, close button and photo credit; keep direct link to related article/destination.
- Add SOSLink to business header, preserving global SOS access.
- Restore discoverable navigation text for `Khám phá`, `Cẩm nang`, `/booking` while preserving current five menu groups and warm design.

## Not production-verified
- No Next.js installation was available in this build container, therefore `next build` and browser-level visual/interaction verification were NOT run.
- Existing customer/guide/admin interactions were tested at API level only; actual deployment, third-party service availability, WebRTC camera, voice speech recognition/voices, geolocation and AI vision were not end-to-end verified.
- Escrow, bank payout and payment webhooks remain DEMO. Production financial operations require a licensed provider, verified contracts and persistent transactional data store.
- Current real-photo URLs, business addresses, licensing, and accessibility evidence are not verified for all venues. Don't claim real-world accessibility based on sample fields.
- Cross-device concurrency, signed sessions, safe production secrets, WebRTC TURN and cloud persistence need integration/system tests.

## Minimum release gates
1. Install and pin dependencies, run `npm ci`, `npm run build` and `npm test` in CI.
2. Run Playwright tests for desktop and mobile, keyboard, screen-reader, and SOS.
3. Verify all third-party image URLs and licenses; replace broken links and match each exact venue.
4. Persist bookings securely in PostgreSQL or equivalent, enforce identity and authorization by roles.
5. Verify live video connection, explicit consent, disconnect, recordings/privacy policy and STUN/TURN.
6. Verify payment partner workflows via sandbox, callbacks, disputes, refunds and reconciliation; never enable collection using DEMO flows.
