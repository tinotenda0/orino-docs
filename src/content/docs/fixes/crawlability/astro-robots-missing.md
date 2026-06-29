---
title: robots.txt missing in /public (Astro)
description: Add a robots.txt file to /public so crawlers have instructions for this Astro site.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

Astro serves static assets from the `/public` directory. Without a `public/robots.txt`, no `/robots.txt` is served at all. Crawlers operate without guidance and may index paths you did not intend to be public.

## How to fix it

Create `public/robots.txt`.

```txt
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap-index.xml
```

Replace `https://example.com` with your actual domain. If you use `@astrojs/sitemap`, the sitemap lands at `/sitemap-index.xml` by default. If you are using a hand-written `public/sitemap.xml`, change that line to match.

:::tip
Pair this with `@astrojs/sitemap` to generate the sitemap automatically at build time. See [sitemap missing](/fixes/crawlability/astro-sitemap-missing).
:::

## Verify the fix

```bash
curl -I https://yourdomain.com/robots.txt
```

Confirm the response is `200 OK`. Then re-run `orino audit`.

## Related fixes

- [sitemap missing](/fixes/crawlability/astro-sitemap-missing)
- [/_astro/ blocked in robots.txt](/fixes/crawlability/astro-robots-blocking-static)
- [CSR-only Astro page](/fixes/crawlability/astro-csr-page)
