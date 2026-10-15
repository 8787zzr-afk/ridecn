# Validation

Last local check: 16 October 2026.

`npm run build` and `npm test` passed for the English, Chinese and French edition:

- 33 content pages, the language redirect and a shared 404 page.
- 916 internal links, assets and linked anchors.
- Language metadata and links to the same page in each language.
- Article fields, French interface strings and source labels.
- Emergency phone links and contact email links.
- One analytics script per content page; none on the redirect.
- Language preferences, checklist status, menu and theme event handlers in a simulated document.

The custom-domain and GitHub project-path builds passed. GitHub Actions successfully deployed the French edition in commit `531e804`.

These checks do not establish visual correctness on a phone or in a browser. No real-device review or independent French-language review has been completed. Automated translation checks find missing fields, not errors in meaning.

Internal link checks do not monitor external websites. The content includes source review dates, but local road access and the Chengdu route suggestions have not been verified in the field. The policy text has not received a professional legal review.
