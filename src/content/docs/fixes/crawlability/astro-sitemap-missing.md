---
title: sitemap missing (Astro)
description: Add a sitemap so search engines can discover all pages in this Astro site.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

No `@astrojs/sitemap` integration, no sitemap endpoint in `src/pages/`, and no static `public/sitemap.xml`. Without a sitemap, search engines rely on link discovery alone, which is unreliable for sites with more than a handful of pages.

## How to fix it

`@astrojs/sitemap` is the right approach. It generates a sitemap automatically from your routes at build time and requires no manual maintenance.

```bash
npx astro add sitemap
```

That command installs the package and adds it to `astro.config.ts`. You must also set `site` in the config — the integration cannot generate absolute URLs without it.

```ts
// astro.config.ts
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap()],
})
```

After the next build, the sitemap appears at `/sitemap-index.xml`.

:::note
Update `public/robots.txt` to reference the correct URL: `Sitemap: https://example.com/sitemap-index.xml`.
:::

## Verify the fix

```bash
curl https://yourdomain.com/sitemap-index.xml
```

Confirm the response is valid XML. Then re-run `orino audit`.

## Related fixes

- [robots.txt missing in /public](/fixes/crawlability/astro-robots-missing)
- [/_astro/ blocked in robots.txt](/fixes/crawlability/astro-robots-blocking-static)
- [getStaticPaths missing on dynamic Astro route](/fixes/crawlability/astro-missing-get-static-paths)
