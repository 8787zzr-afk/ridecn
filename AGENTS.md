# RideCN maintenance instructions

- For every change to this repository or website, add a dated entry to CHANGELOG.md in the same commit. Add a separate entry for each update, including multiple updates on the same date. Use Asia/Shanghai dates, newest entries first.
- Describe actual changes and validation. Ordinary content or maintenance changes must not be described as security vulnerability fixes. Mention a vulnerability fix only when an identified vulnerability was actually fixed; describe the specific issue when appropriate.
- Keep English, Simplified Chinese and French content consistent. French translations are in src/fr.mjs and src/fr-ui.json; update all three languages together. Project contact is Zhou at 8787zzr@gmail.com. Email links open the visitor’s email application; never imply that a mailto click has sent a message.
- Update the privacy notice when changing collection, contact handling or analytics behavior.
- Run npm run build and npm test for website changes, plus checks relevant to the change. Report verification limitations accurately.

## Complete localization is required

- Every published language must cover every page and section, including navigation, footer, forms, buttons, status/error messages, accessibility labels, image alt text, SEO metadata, source explanations, legal policies and update notices.
- When changing any content or feature, update all currently published languages in the same release. When adding a language, translate the entire website before making it selectable; do not publish partial translations or silently fall back to another language.
- Names (RideCN, Zhou), email addresses, URLs, source document titles where necessary, and intentionally bilingual emergency phrases may remain in their original form. Explain source links in the selected language.
- Run translation completeness checks and inspect the actual deployed pages in every published language. Automated presence checks do not replace a human-quality review of meaning and natural phrasing.
