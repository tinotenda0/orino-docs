---
title: robots.txt missing in /public (Pages Router)
description: Add a robots.txt file to /public for this Next.js Pages Router site.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

Pages Router has no Metadata API for robots. The only way to serve `/robots.txt` is through the `/public` directory. Without it, crawlers have no guidance and may index API routes, admin paths, or staging content.

## How to fix it

Create `public/robots.txt`.

```txt
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

Replace `https://example.com` with your actual domain. Add `Disallow` rules for any paths that should not be indexed.

## Verify the fix

```bash
curl -I https://yourdomain.com/robots.txt
```

Confirm the response is `200 OK`. Then re-run `orino audit`.

## Related fixes

- [sitemap.xml missing in /public](/fixes/crawlability/nextjs-pages-sitemap-missing)
- [getStaticPaths missing on dynamic route](/fixes/crawlability/nextjs-pages-missing-get-static-paths)
