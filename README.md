# RideCN

[English](https://ridecn.net/en/) · [简体中文](https://ridecn.net/zh/) · [Français](https://ridecn.net/fr/)

RideCN is a cycling information website created by Zhou, a Chinese high school student and road cyclist. It covers road rules, emergency contacts and travel preparation for visitors to China. Chengdu is the first city covered.

The project is independent and non-commercial. Articles link to their sources and distinguish legal requirements from safety recommendations. The Chengdu guide describes places and planning considerations; it does not contain field-verified routes or GPX tracks.

RideCN 由中国高中生、公路自行车爱好者 Zhou 创建，为来华骑行者整理道路规则、紧急联系方式和出行准备信息，成都是目前收录的第一座城市。

这是一个独立、非商业项目。文章标明来源，区分法律要求与安全建议。成都指南介绍当地环境和规划注意事项，目前不提供实地核实的路线或 GPX 文件。

RideCN est un site d’information sur le vélo créé par Zhou, un lycéen chinois pratiquant le cyclisme sur route. Il présente les règles de circulation, les contacts d’urgence et la préparation d’un voyage en Chine. Chengdu est la première ville couverte.

Le projet est indépendant et non commercial. Les articles citent leurs sources et distinguent les obligations légales des recommandations de sécurité. Le guide de Chengdu présente les lieux et les points à considérer pour préparer une sortie ; il ne propose pas d’itinéraires vérifiés sur le terrain ni de fichiers GPX.

Contact / 联系 / Contact : [8787zzr@gmail.com](mailto:8787zzr@gmail.com)

## Website

The site has 11 page types in English, Simplified Chinese and French. Each language has its own URL, and switching languages keeps the current page. The interface includes a mobile menu, light and dark themes, emergency phone links and a ride preparation checklist.

GitHub Pages hosts the site at [ridecn.net](https://ridecn.net). Cloudflare Web Analytics provides visit and performance statistics. There are no user accounts or submission forms. Language and theme preferences stay in the visitor’s browser; the checklist resets on reload.

网站提供英文、简体中文和法语，共 33 个内容页面。语言切换保留当前页面，支持移动菜单、深浅色主题、紧急电话拨号和出发前清单。网站托管于 GitHub Pages，访问统计使用 Cloudflare Web Analytics。不设用户账户或提交表单，语言和主题偏好保存在访客浏览器中，清单刷新后重置。

Le site comprend 33 pages de contenu en anglais, chinois simplifié et français. Le changement de langue conserve la page actuelle. Il propose un menu mobile, des thèmes clair et sombre, des liens d’appel d’urgence et une liste de préparation. Il est hébergé sur GitHub Pages et utilise Cloudflare Web Analytics. Il n’y a ni compte utilisateur ni formulaire d’envoi. Les préférences restent dans le navigateur ; la liste se réinitialise au rechargement.

## Development

Node.js 20 or later. The project uses a static generator, JavaScript and CSS, with no third-party npm dependencies.

```sh
npm install
npm run dev
```

Local address: `http://localhost:3000`. Restart the development command after editing content. `PORT` sets a different port.

```sh
SITE_URL=https://ridecn.net npm run build
npm test
```

The build writes static files to `dist/`. The deployed workflow uses Node.js 22.

| Path | Contents |
| --- | --- |
| `src/content.mjs` | English and Chinese articles, sources and review dates |
| `src/fr.mjs` | French articles and source labels |
| `src/fr-ui.json` | French interface text |
| `src/purpose.json` | Homepage project origins in all three languages |
| `scripts/build.mjs` | Page templates, navigation, metadata and static output |
| `scripts/dev.mjs` | Local server |
| `scripts/check.mjs` | Page, link, translation and analytics checks |
| `scripts/check-interactions.mjs` | Tests for interface event handlers |
| `public/assets/` | Styles, browser scripts, images and icons |
| `.github/workflows/deploy-pages.yml` | GitHub Pages build and deployment |

## Maintenance

Content changes cover all three published languages. Source review dates record actual checks, not simply the date of a deployment. Each update is recorded in [CHANGELOG.md](CHANGELOG.md).

内容更新同步英文、中文和法语。来源核实日期对应实际查阅记录，不随部署自动更新。每次更新记录在 [CHANGELOG.md](CHANGELOG.md)。

Les modifications de contenu concernent les trois langues publiées. Les dates de vérification correspondent aux sources réellement consultées, et non à chaque déploiement. Les changements sont consignés dans [CHANGELOG.md](CHANGELOG.md).

[Deployment](DEPLOYMENT.md) · [Validation](VALIDATION.md) · [Image credits](ASSETS.md)

## Scope

RideCN is not affiliated with any government or emergency service. Its content is general information, not professional advice. Current local laws and official instructions take priority. The website’s disclaimer, privacy policy and terms are available in each language.

RideCN 不隶属政府或紧急救援机构，内容供一般信息参考，不构成专业建议。现行当地法律和官方指令优先适用。网站的免责声明、隐私政策和使用条款均提供三种语言版本。

RideCN n’est affilié à aucun gouvernement ni service d’urgence. Son contenu est informatif et ne constitue pas un conseil professionnel. Les lois locales en vigueur et les instructions officielles priment. L’avertissement, la politique de confidentialité et les conditions d’utilisation sont disponibles dans les trois langues.

Chengdu ride descriptions, source records and image credits are maintained together in `src/chengdu-routes.mjs`. Each text field includes `en`, `zh` and `fr`; adding another language requires translating the full module and extending its validation. Reported distances are not field-verified tracks.

成都骑行介绍、资料来源和图片署名统一维护在 `src/chengdu-routes.mjs`。每个文本字段包含 `en`、`zh`、`fr`；新增语言时须完整翻译该模块并扩展校验。报道距离不代表实地核实的轨迹。

Les descriptions des sorties à Chengdu, leurs sources et les crédits photographiques sont regroupés dans `src/chengdu-routes.mjs`. Chaque champ contient `en`, `zh` et `fr` ; l’ajout d’une langue exige de traduire tout le module et d’étendre sa validation. Les distances publiées ne constituent pas des tracés vérifiés sur le terrain.

## Rider reviews / 骑友评价 / Avis des cyclistes

The reviews page embeds the separately hosted moderation service. Backend source and management instructions: `services/reviews/README.md`. Run `npm run test:reviews` for its local authorization and submission tests. Frontend GitHub pushes do not redeploy this backend.

评价页接入独立托管的审核服务。后端源码与管理说明见 `services/reviews/README.md`。使用 `npm run test:reviews` 检查提交与审核权限；GitHub 前端更新不会自动部署这个后端。

La page d’avis intègre un service de modération hébergé séparément. Code serveur et instructions : `services/reviews/README.md`. Lancez `npm run test:reviews` pour les contrôles locaux. Les mises à jour GitHub du site statique ne redéploient pas ce serveur.
