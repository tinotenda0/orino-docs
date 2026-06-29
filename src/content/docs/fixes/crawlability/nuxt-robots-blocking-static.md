---
title: /_nuxt/ blocked in robots.txt
description: Remove the Disallow rule that prevents crawlers from loading Nuxt's built assets.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

Nuxt outputs all compiled JavaScript and CSS under `/_nuxt/`. A `Disallow: /_nuxt/` rule in `robots.txt` stops Googlebot from fetching those files. Without them, Googlebot cannot render your pages. They appear blank in Google's renderer and are indexed with no content.

## How to fix it

Remove the `Disallow: /_nuxt/` rule.

```txt
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

List only the paths you genuinely need to block. Framework asset directories must remain publicly accessible.

:::caution
This is commonly introduced by copying a robots.txt template from another framework. Each framework uses a different asset path: Next.js uses `/_next/`, SvelteKit uses `/_app/`, Astro uses `/_astro/`. Always check that blocked paths are correct for your framework before deploying.
:::

## Verify the fix

```bash
curl https://yourdomain.com/robots.txt
```

Confirm there is no `Disallow: /_nuxt/` line. Then re-run `orino audit`.

## Related fixes

- [robots.txt missing in /public](/fixes/crawlability/nuxt-robots-missing)
- [sitemap missing](/fixes/crawlability/nuxt-sitemap-missing)
