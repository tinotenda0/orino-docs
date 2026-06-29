---
title: sitemap missing (Nuxt)
description: Add a sitemap to this Nuxt site using @nuxtjs/sitemap or a static file.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

No `@nuxtjs/sitemap` module, no `server/routes/sitemap.xml.ts` endpoint, and no static `public/sitemap.xml`. Without a sitemap, search engines cannot efficiently discover your pages, and newly published content may take weeks to appear in results.

## How to fix it

`@nuxtjs/sitemap` is the recommended approach. It generates the sitemap automatically from your routes and integrates with `@nuxtjs/robots`.

```bash
npm install @nuxtjs/sitemap
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/sitemap'],
  site: {
    url: 'https://example.com',
  },
})
```

The sitemap is available at `/sitemap.xml` after the next build or server start.

For dynamic content, tell the module where to source additional URLs.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/sitemap'],
  site: {
    url: 'https://example.com',
  },
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },
})
```

For a simple static site with no module, `public/sitemap.xml` works fine.

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

Confirm the response is valid XML with `<urlset>` or `<sitemapindex>` as the root element. Then re-run `orino audit`.

## Related fixes

- [robots.txt missing in /public](/fixes/crawlability/nuxt-robots-missing)
- [/_nuxt/ blocked in robots.txt](/fixes/crawlability/nuxt-robots-blocking-static)
- [Dynamic route missing useAsyncData or useFetch](/fixes/crawlability/nuxt-missing-page-data)
