---
title: robots.txt missing in /public (Nuxt)
description: Add a robots.txt file to /public or use the @nuxtjs/robots module for this Nuxt site.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

Nuxt serves static assets from `/public`. Without `public/robots.txt` (and no `@nuxtjs/robots` module installed), no `/robots.txt` is served. Crawlers have no guidance on what to index.

## How to fix it

The simplest option is a static file.

```txt
// public/robots.txt
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

For more control — environment-aware rules, automatic sitemap registration — use `@nuxtjs/robots`.

```bash
npm install @nuxtjs/robots
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/robots'],
  robots: {
    groups: [
      {
        userAgent: ['*'],
        allow: ['/'],
      },
    ],
    sitemap: 'https://example.com/sitemap.xml',
  },
})
```

:::tip
If you also install `@nuxtjs/sitemap`, it registers the sitemap URL in robots.txt automatically. You only need to configure `@nuxtjs/robots` separately if you have custom disallow rules.
:::

## Verify the fix

```bash
curl -I https://yourdomain.com/robots.txt
```

Confirm the response is `200 OK`. Then re-run `orino audit`.

## Related fixes

- [sitemap missing](/fixes/crawlability/nuxt-sitemap-missing)
- [/_nuxt/ blocked in robots.txt](/fixes/crawlability/nuxt-robots-blocking-static)
- [Dynamic route missing useAsyncData or useFetch](/fixes/crawlability/nuxt-missing-page-data)
