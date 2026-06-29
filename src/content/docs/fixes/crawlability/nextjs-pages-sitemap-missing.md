---
title: sitemap.xml missing in /public (Pages Router)
description: Add a sitemap to /public or generate one automatically for this Next.js Pages Router site.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

Pages Router does not generate a sitemap automatically. Without one, search engines cannot efficiently discover your pages, and newly published content may take weeks to appear in results.

## How to fix it

The easiest option is `next-sitemap`, which generates `sitemap.xml` automatically after each build.

```bash
npm install next-sitemap
```

```js
// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://example.com',
  generateRobotsTxt: false,
}
```

Add a `postbuild` script so the sitemap regenerates on every deployment.

```json
{
  "scripts": {
    "postbuild": "next-sitemap"
  }
}
```

For small static sites, a hand-written `public/sitemap.xml` is fine.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

## Verify the fix

```bash
curl https://yourdomain.com/sitemap.xml
```

Confirm the response is valid XML with `<urlset>` as the root element. Then re-run `orino audit`.

## Related fixes

- [robots.txt missing in /public](/fixes/crawlability/nextjs-pages-robots-missing)
- [getStaticPaths missing on dynamic route](/fixes/crawlability/nextjs-pages-missing-get-static-paths)
