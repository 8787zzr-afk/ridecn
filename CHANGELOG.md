# RideCN 更新日志 / Changelog

每次网站或仓库更新均在此记录，最新条目在前。同日的不同更新分别记录。仅记录实际完成的变更，不将普通维护描述为安全漏洞修复。

## 2026-10-15 · 联系与纠错更新 / Contact & corrections

- 新增联系人 Zhou，统一联系邮箱为 8787zzr@gmail.com，用于咨询、问题报告、内容纠错、隐私及版权事宜。
- 中英文联系页采用与现有网站一致的配色与排版，提供可点击邮箱和“给 Zhou 写邮件”按钮。
- 移除原先仅在本地生成报告的工具，以及“联系渠道尚未开通”的过期提示。
- 同步更新免责声明、邮件往来隐私说明和信息更新记录。
- 新增本更新日志及仓库维护规则，要求后续每次修改同步记录。
- 验证：静态构建、内部链接检查、JavaScript 语法检查及双语邮箱链接检查通过；未进行浏览器交互测试。

English: Added Zhou’s email contact across both languages, replaced the local report generator with email links, corrected outdated contact notices, updated correspondence privacy information, and introduced a changelog policy. Build, link, syntax and bilingual email checks passed; browser interaction testing was not performed.

## 2026-10-15 · HTTPS 地址修正 / HTTPS metadata

- 将 canonical、hreflang 和 sitemap 中的网站地址统一为 HTTPS。
- 修正自动部署重复构建文件导致的发布失败，为部署文件使用唯一名称。
- 已完成 ridecn.net 自定义域名上线，HTTP 和 www 跳转已验证。

English: Standardized HTTPS metadata, fixed duplicate deployment artifacts, and verified the custom domain and redirects.

## 2026-10-15 · 首次发布 / Initial release

- 发布 22 个中英文内容页面，涵盖骑行规则、安全求助、成都指南、出行准备及项目政策。
- 实现语言切换、深浅色主题、移动端菜单和骑行准备清单。
- 添加 GitHub Pages 自动构建与部署，支持项目子路径及独立域名。

English: Published 22 bilingual content pages with navigation, themes, a mobile menu, a preparation checklist, and automated GitHub Pages deployment.
