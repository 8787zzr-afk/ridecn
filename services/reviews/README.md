# RideCN review service

Public, anonymous review submission and owner-only moderation. Hosted by ChatGPT Sites as a Cloudflare Worker with a private R2 binding named `BUCKET`.

- Public pages: `/en/`, `/zh/`, `/fr/`; embed using `?embed=1`.
- Moderation: `/{language}/admin/`. Sign in with the ChatGPT account `8787zzr@gmail.com`.
- Every moderation request checks the platform-verified identity email server-side. Anonymous and other users are rejected.
- Public reads only return approved entries. Image reads also check the parent review; object storage is never directly public.
- Public submissions require a name, 10–2,000 characters, consent and no more than three re-encoded JPEG photos, each at most 1 MiB. Browser input accepts JPEG/PNG/WebP up to 10 MiB and converts it using canvas. SVG and original filenames are not stored.
- A temporary daily IP hash limits submissions. Rate limiting is best effort (R2 counters are not atomic); moderation is mandatory regardless of rate limits.
- Rejected/deleted reviews have their images and stored review removed. Pending entries older than 90 days are removed opportunistically during listing. Cleanup is not a scheduled retention guarantee.
- No email service, paid API, visitor registration or invented seed reviews.

Run `node scripts/check-reviews.mjs`, `bash scripts/build.sh` and `node scripts/validate-artifact.mjs`. Tests use a fake private bucket and simulated verified identity headers; they do not replace a real owner sign-in check. Do not accept arbitrary identity headers when porting this service outside Sites: the hosting platform must validate and strip/replace them.

Site identity lives in `.openai/hosting.json`. Preserve its project ID and `BUCKET` name across updates to retain data. Publish through the Sites source workflow; GitHub Pages publishes the separate static frontend only.

中文：访客填写姓名、评价并可附图片，所有内容先进入私有待审核区。管理页使用创办人的 ChatGPT 账号登录，只有审核通过的评价及图片公开。拒绝或删除会移除评价及图片，无法撤销。

Français : Le visiteur indique un nom et un avis, avec des photos facultatives. Tout envoi reste privé avant modération. Seul le compte ChatGPT du créateur peut publier ou supprimer les avis. La suppression retire aussi les photos et est irréversible.
