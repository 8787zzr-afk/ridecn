# Deployment

## Current setup

- Repository: [8787zzr-afk/ridecn](https://github.com/8787zzr-afk/ridecn)
- Production branch: `main`
- Hosting: GitHub Pages
- Domain: [ridecn.net](https://ridecn.net), registered with Tencent Cloud
- Analytics: Cloudflare Web Analytics

Cloudflare Web Analytics is separate from the hosting service.

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds and tests the site, then publishes `dist/`. It runs on pushes to `main` and can also be started manually from Actions. The repository’s Pages source is GitHub Actions.

The workflow reads the site address and base path from the Pages configuration. `SITE_URL` sets canonical URLs, language alternates, image metadata and the sitemap. `BASE_PATH` is empty for the custom domain; a project site can use `/ridecn`.

```sh
SITE_URL=https://ridecn.net npm run build
npm test
```

For a project-path build:

```sh
BASE_PATH=/ridecn SITE_URL=https://8787zzr-afk.github.io/ridecn npm run build
BASE_PATH=/ridecn npm test
```

Updates are made to source files and committed to `main`. Generated files in `dist/` are ignored by Git and replaced at each build. Deployment results appear in the repository’s Actions tab.

## Domain and HTTPS

The current custom domain is configured through GitHub Pages. Domain registration remains with Tencent Cloud. The domain’s DNS records must point to the chosen host, and the custom domain must also be set in the hosting configuration. HTTPS certificate status is shown in the Pages settings.

Existing mail and verification records are separate from website records. A hosting migration needs to preserve any records still in use.

## Cloudflare Pages alternative

The same static output can be hosted on Cloudflare Pages. This is an alternative deployment, not the current host.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | None |
| Root directory | Repository root |
| Build command | `npm run build` |
| Output directory | `dist` |
| `NODE_VERSION` | `22` |
| `SITE_URL` | The deployment’s public HTTPS address |
| `BASE_PATH` | Empty for a root-domain deployment |

A custom domain is added in the Pages project before its DNS configuration is completed. The required DNS and certificate settings depend on the hosting provider. The hosting section of each privacy policy also needs to reflect a migration.

Cloudflare documentation: [Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## Analytics

The content-page template includes one Cloudflare Web Analytics script. The language redirect and 404 page do not load it. Automatic script injection would need to be checked for duplication if the hosting configuration changes.

Statistics are available in the owner’s Cloudflare dashboard. They start after installation and are not an exact count of individual people. Script blocking and network failures can leave visits unrecorded.
