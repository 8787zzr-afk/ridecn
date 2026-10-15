# RideCN

当前网站：https://ridecn.net · 联系人：Zhou · 邮箱：8787zzr@gmail.com

每次更新请同步维护 [CHANGELOG.md](CHANGELOG.md)，维护规则见 [AGENTS.md](AGENTS.md)。以下首次交付和部署历史中的未配置说明，以当前网站及更新日志为准。

Your Independent Guide to Cycling in China  
Ride Safely. Explore Freely. Discover China.

独立高中生发起的非商业教育信息项目。英文默认，简体中文完整对应。

## 访问统计 / Website analytics

全部中英文内容页面包含 Cloudflare Web Analytics。站长可在 Cloudflare 的 Web Analytics 中选择 ridecn.net 查看访问统计；部署之前的数据不能补记。语言跳转入口及 404 不加载统计。不要同时启用另一份自动注入脚本，以免重复统计。浏览器或网络拦截可能导致漏记，访问量不等于准确人数。隐私政策已同步中英文。

All English and Chinese content pages include Cloudflare Web Analytics. Select ridecn.net in Cloudflare Web Analytics to review statistics. Earlier visits cannot be recovered. The redirect and 404 are excluded. Avoid duplicate automatic injection. Blockers or network failures may prevent measurement; visits are not an exact count of people. Both privacy notices describe the service.

## 当前交付与边界

- 11 类页面 × 2 种语言，共 22 个静态内容页面；另有语言入口、404、站点地图。
- 页面：Home、Road Rules、Safety & Emergency、Chengdu、Travel Essentials、About、Disclaimer、Privacy、Terms、Sources、Contact。
- `/en/` 与 `/zh/` 独立 URL；语言切换保留当前页面。
- 响应式布局、移动菜单、深浅色切换、紧急电话 `tel:`、本地准备清单、纠错报告生成器。
- 网站没有注册、数据库或表单提交。联系与纠错通过 Zhou 的邮箱进行；访问统计使用 Cloudflare Web Analytics，详见上方说明及双语隐私政策。
- 成都内容是区域及准备指南，不是实测路线。未发布虚构距离、爬升、GPX 或实时状态。
- 当前 Sites 地址与正式域名是两个独立部署；**没有声称 ridecn.net 已绑定，也没有创建你个人 GitHub 账户中的 ridecn 仓库。**
- Sites 预览保持私密，托管平台可能要求登录；独立 Cloudflare 静态部署本身不需要访客登录。

## 技术选择

本版采用 **Node.js 静态页面生成器 + 原生 JavaScript/CSS**，而非需求中“推荐”的 Next.js/TypeScript/Tailwind。原因是全部功能均为静态内容和轻量本地交互，减少依赖与维护成本。输出为真正独立 HTML，禁用 JavaScript 仍可阅读及导航；主题、移动菜单、清单和报告工具需要 JavaScript。

没有 npm 第三方依赖，无运行时 API、数据库或服务器费用要求。若后续改用 Next.js，`src/content.mjs` 中的双语结构与来源记录可以直接迁移。

## 本地运行

需要 Node.js 20 或更新版本（建议 Node 22 LTS）。

```sh
npm install
npm run dev
```

访问 `http://localhost:3000`。本地服务启动前自动生成页面；编辑内容后重启开发命令。端口可用 `PORT` 环境变量改变。

```sh
npm run build
npm test
```

构建输出为 `dist/`，可直接部署到 Cloudflare Pages。无需另外购买服务器。

## 项目结构

```text
src/content.mjs          完整中英文文章、来源、核实日期
scripts/build.mjs        页面模板、SEO、导航、页脚、静态构建
scripts/dev.mjs          本地静态开发服务器
scripts/check.mjs        内部链接/锚点/元数据/电话链接检查
public/assets/style.css 响应式视觉与主题
public/assets/app.js    菜单、主题、语言偏好、清单、报告生成
public/assets/china-road.jpg 本地授权照片
public/assets/favicon.svg   原创图标
public/_headers         Cloudflare Pages 安全响应头
package.json
package-lock.json
README.md
ASSETS.md
VALIDATION.md
```

源码包附带 `dist/` 方便直接部署。Git 忽略 `dist/`，自动部署时重新构建。Sites 内部项目标识、Git 数据、凭证均不包含在可下载源码包内。

## 上传 GitHub

1. 登录自己的 GitHub，创建名为 `ridecn` 的仓库。可以先选 Private；网站的公开程度由 Cloudflare Pages 决定。
2. 解压源码包，上传项目内容；**package.json 必须位于仓库根目录**，不要再多包一层文件夹。
3. 不上传任何密钥、证件、私人联系方式或本地 Git 配置。使用命令行时可执行：

```sh
git init
git add .
git commit -m "Build bilingual RideCN guide"
git branch -M main
# 在 GitHub 新仓库页面复制你真实仓库的 HTTPS URL：
git remote add origin <YOUR_REPOSITORY_HTTPS_URL>
git push -u origin main
```

`<YOUR_REPOSITORY_HTTPS_URL>` 是说明占位符，须替换后执行，不是已创建的仓库。

手机可用 GitHub 网页上传文件，但需保留目录结构；文件较多时建议电脑上传或使用有 Git 支持的工具。

## Cloudflare Pages 自动部署

在 Cloudflare 的 Workers & Pages 中创建 Pages 项目，连接 GitHub 后选择自己的 `ridecn` 仓库。

| 设置 | 值 |
| --- | --- |
| Production branch | main |
| Framework preset | None |
| Root directory | 仓库根目录 |
| Build command | npm run build |
| Build output directory | dist |
| Environment variable | NODE_VERSION = 22 |
| Environment variable | SITE_URL = https://ridecn.net |

首次测试若还没绑定域名，可以先将 `SITE_URL` 设置为 Cloudflare 给出的真实 `https://项目名.pages.dev` 地址，正式绑定后改为 `https://ridecn.net` 并重新部署。这个变量生成 canonical、hreflang、Open Graph 图片地址与 sitemap；不要在未绑定前对外宣称域名可用。

先在真实 Pages 预览域名检查两种语言、页面、菜单、主题和电话链接。构建没有外部依赖和 API 密钥要求。平台套餐、配额以实际 Cloudflare 账户为准。

## 绑定腾讯云购买的 ridecn.net

注册商可以继续保留为腾讯云。绑定 apex 根域名到 Cloudflare Pages 通常需要让 Cloudflare 托管该域名 DNS。

1. 在 Cloudflare 添加 `ridecn.net` 站点。先核对和保存腾讯云当前所有 DNS 记录，尤其邮箱 MX、TXT 等；不要直接删除原有记录。
2. 根据 Cloudflare 的域名接入流程确认 DNSSEC 处理要求，使用其实际提供的两条 nameserver。
3. 在腾讯云域名管理修改 DNS 服务器为这两条实际值。**不要复制别人的 nameserver。** 等待 Cloudflare 显示域名 Active。
4. 在 **Pages 项目 → Custom domains** 中添加 `ridecn.net`，跟随向导创建/确认 DNS 记录。不要仅手工添加 CNAME 而不在 Pages 中关联域名。
5. 可在同一项目添加 `www.ridecn.net`，并按偏好设置到根域名的重定向；它不是默认已配置的功能。
6. 等待自定义域名和证书都显示正常，确认 `https://ridecn.net/en/` 与 `/zh/` 可打开。Cloudflare 提供 HTTPS 证书；有证书验证问题时检查 DNS/CAA 和控制台提示，不要随意禁用安全功能。
7. 确认 SITE_URL 为正式域名，重新部署，并检查 canonical 与 sitemap。

官方文档：
- https://developers.cloudflare.com/pages/configuration/custom-domains/
- https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/

界面和套餐可能变化，请以控制台与官方文档为准。当前交付不包含腾讯云、Cloudflare 或 GitHub 的账户授权与 DNS 操作。

## 上线前真实配置

1. **隐私政策**：从 Sites 迁移后，修改 `src/content.mjs` 的两种语言托管说明，准确说明实际 Cloudflare 服务、技术日志、隐私入口及自己能控制的范围；不承诺无法执行的日志删除/保留时限。不可继续保留“此预览通过 ChatGPT Sites 托管”的表述。参考 https://www.cloudflare.com/privacypolicy/ 及实际服务配置。
2. **纠错渠道**：只有真正开通且准备管理的邮箱/公开 Issues 才能加入。公开 GitHub Issues 提醒不要提交个人数据；隐私问题应有私密渠道。配置后替换当前未开通提示，不要把本地生成按钮误称为发送按钮。
3. **Sources & Updates**：正式域名核验成功后更新真实部署状态。内容变更后重新查阅相应来源，逐项更新核实日期，不能仅自动刷新日期制造“已核实”。
4. **法律文本**：本版不保证消除责任。需要时请专业人员审阅；保留不能依法排除责任的例外。
5. **浏览器验收**：在真实 iPhone、Android 和电脑测试响应式布局、语言切换、菜单键盘操作、深浅模式、长内容以及 404。

## 更新内容

修改 `src/content.mjs`，保持每个条目的中英文同步；新增城市可参考 `chengdu` 页面对象，同时更新 `scripts/build.mjs` 的导航 `labels`。新增页面后更新测试中的页面数量。新增路线需记录核实方法、日期、道路类别和风险，不能用猜测数值。

运行 `npm run build && npm test`，提交并 push 到 main；GitHub 连接的 Pages 会自动重新构建。失败时查看构建日志，修复后重新推送。不要仅修改 `dist/`：下次构建会覆盖它。

## 版本

v1.0 · 2026-10-15。详细验证范围见 VALIDATION.md。照片许可见 ASSETS.md。

## GitHub Pages 自动部署（2026-10-15 新增）

源码现用于 `8787zzr-afk/ridecn`。`.github/workflows/deploy-pages.yml` 在 main 更新时构建、检查并发布，无需服务器或自建密钥。

仓库管理员需要在 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。当前连接器不提供修改此管理员设置的操作。如首次流水线在 Configure Pages 失败，完成设置后在 Actions 中 Re-run all jobs。

默认项目地址为 `https://8787zzr-afk.github.io/ridecn/`，仅在 Pages 部署成功后有效。工作流从实际 Pages 配置读取域名和子路径，因此将来正式配置自定义域名后会自动生成对应路径。

- `BASE_PATH=/ridecn` 用于 GitHub 项目子目录；根域名部署留空。
- `SITE_URL` 为完整网站根地址（项目地址包含 `/ridecn`）。
- 隐私说明已改为 GitHub Pages 的平台日志行为。
- `ridecn.net` 尚未绑定。GitHub Pages 与 Cloudflare Pages 是两个可选托管方案，无需同时使用。
- 本仓库 README 较早的“未创建 GitHub 仓库”和 Sites 隐私描述仅记录首次交付状态，以本节为准。
