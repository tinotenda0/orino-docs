---
title: /_app/ blocked in robots.txt
description: Remove the Disallow rule that prevents crawlers from loading SvelteKit's built assets.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

SvelteKit outputs all compiled JavaScript and CSS under `/_app/`. A `Disallow: /_app/` rule in `robots.txt` tells Googlebot not to fetch those files. Without them, Googlebot cannot render your pages. They appear blank in Google's renderer and get indexed with no content.

## How to fix it

Remove the `Disallow: /_app/` rule.

```txt
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

If you need to block specific paths, list them explicitly rather than using a broad prefix.

:::caution
This error is usually caused by copying a robots.txt from a different framework. Next.js blocks `/_next/`, Nuxt blocks `/_nuxt/`, Astro blocks `/_astro/`. Changing the path prefix without understanding what it blocks is the common cause of this issue.
:::

## Verify the fix

```bash
curl https://yourdomain.com/robots.txt
```

Confirm there is no `Disallow: /_app/` line. Then re-run `orino audit`.

## Related fixes

- [robots.txt missing in /static](/fixes/crawlability/sveltekit-robots-missing)
- [CSR-only SvelteKit route](/fixes/crawlability/sveltekit-csr-page)
- [sitemap missing](/fixes/crawlability/sveltekit-sitemap-missing)
