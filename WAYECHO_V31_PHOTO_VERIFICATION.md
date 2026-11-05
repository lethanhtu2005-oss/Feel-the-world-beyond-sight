# WayEcho V31 — photo verification and update

## Completed changes
- Reviewed **four landmark photo pages** on Wikimedia Commons (not just guessed filenames): Maison longue traditionnelle (1), Dong Xuan market, Quan-chuong-hanoi, Phố Hàng Mã Hà Nội 001. Details in `data/verifiedPhotoManifest.json`.
- Corrected Chợ Đồng Xuân card reference, author and license (Juliana Ng / CC BY 2.0). Its detail page uses a different Commons file (`Đồng Xuân Market 1.jpg`) so the test for 23 unique image references remains valid; full author attribution for the detail image must still be reviewed before production.
- Used distinct existing image for homepage hero instead of reusing `old-quarter-street.jpg` in the homepage and destination detail.
- Corrected gallery Tạ Hiện link that incorrectly pointed to a Chợ Đồng Xuân article.
- Retained gallery's 15 separate file identities; unknown/uncorroborated metadata for other photos was **not** elevated to verified status.
- Added `scripts/download-verified-photos.py` for optional download of precisely verified four files on a computer with Wikimedia network access.

## NOT completed / limitations
- Image bytes could not be downloaded here: the runtime cannot resolve `commons.wikimedia.org` (curl DNS error). Source still loads landmark images from Wikimedia; browser image loading depends on network.
- **27 local files have not been downloaded or visually confirmed.** No claim of 27 verified pictures; 15 gallery entries are metadata distinct, not HTTP-success verified.
- Existing local assets lack fully verified provenance; hero uses an already existing photo with generic, cautious alt text. Real location identification still requires visual checking before representing it as a specific place.
- No browser E2E or Next.js build verification in this patch.
- Photos require attribution; sources remain in `/photo-credits` and footer, not overlaid on photographs.

## How to finalize on a networked workstation
1. `python scripts/download-verified-photos.py`
2. Inspect files carefully; if acceptable, switch relevant `src` values to `/assets/images/verified/<slot>.jpg`.
3. Complete author/license verification for remaining gallery, then retrieve and audit the other 23 image slots.
4. Run `npm ci && npm test && npm run build` and visual tests on Vercel before presenting any remote photo as guaranteed available.
