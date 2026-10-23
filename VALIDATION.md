# Validation

Last local check: 24 October 2026.

`npm run build` and `npm test` passed for the English, Chinese and French edition:

- 33 content pages, the language redirect and a shared 404 page.
- 949 internal links, assets and linked anchors.
- Language metadata and links to the same page in each language.
- Article fields, French interface strings and source labels.
- Emergency phone links, email links, QQ/Instagram/Douyin destinations and translated invitation text.
- One analytics script per content page; none on the redirect.
- Language preferences, checklist status, menu and theme event handlers in a simulated document.
- Six Chengdu ride ideas, source links, complete translated fields, photo credits and local WebP file sizes.
- The homepage project origins: all six chapters, introductory paragraphs, section links and closing text in all three languages.

The custom-domain and GitHub project-path builds passed. The current route update is checked locally before publishing; GitHub Actions deployment is checked separately.

These checks do not establish visual correctness on a phone or in a browser. No real-device review or independent French-language review has been completed. Automated translation checks find missing fields, not errors in meaning.

Internal link checks do not monitor external websites. The content includes source review dates, but local road access and the Chengdu route suggestions have not been verified in the field. The policy text has not received a professional legal review.

Social links use the accounts supplied by Zhou. Instagram uses a profile URL, QQ uses its contact endpoint and Douyin uses the profile share link supplied by Zhou. No signed-in account or messaging permission checks were performed.
