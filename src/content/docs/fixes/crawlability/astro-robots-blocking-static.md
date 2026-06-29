---
title: /_astro/ blocked in robots.txt
description: Remove the Disallow rule that prevents crawlers from loading Astro's built JavaScript and CSS assets.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

Astro outputs all compiled JavaScript and CSS under `/_astro/`. A `Disallow: /_astro/` rule in `robots.txt` tells Googlebot not to fetch those files. Without them, Googlebot cannot render your pages. They appear blank in Google's renderer and are indexed with no content.

## How to fix it

Remove the `Disallow: /_astro/` rule. If there are other paths you need to block, list them specifically.

```txt
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap-index.xml
```

If you copied a robots.txt template from a different framework (for example `/_next/` for Next.js or `/_nuxt/` for Nuxt), remove that line — it is irrelevant in an Astro project.

:::caution
A common mistake is blocking all paths that start with an underscore to hide "internal" files. `/_astro/` contains built assets that must be publicly accessible for the site to render. Never block it.
:::

## Verify the fix

```bash
curl https://yourdomain.com/robots.txt
```

Confirm there is no `Disallow: /_astro/` line. Then re-run `orino audit`.

## Related fixes

- [robots.txt missing in /public](/fixes/crawlability/astro-robots-missing)
- [CSR-only Astro page](/fixes/crawlability/astro-csr-page)
