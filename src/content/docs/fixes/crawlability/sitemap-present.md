---
title: sitemap.xml missing
description: Resolves a missing or invalid sitemap.xml, which prevents search engines from efficiently discovering your pages.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

A sitemap tells search engines which pages exist, when they were last updated, and how to prioritise them. Without one, crawlers discover pages only by following links. Pages that are poorly linked internally may never be indexed, or may take significantly longer to appear in search results.

This check also flags a sitemap that returns 200 but contains invalid XML (no `<urlset>` or `<sitemapindex>` element).

## How to fix it

Generate a valid sitemap at `/sitemap.xml`.

### Next.js App Router

Create `app/sitemap.ts`:

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  const dynamicPages: MetadataRoute.Sitemap = posts.map(post => ({
    url: `https://yourdomain.com/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...dynamicPages]
}
```

### Next.js Pages Router

Use the `next-sitemap` package:

```bash
npm install next-sitemap
```

Create `next-sitemap.config.js` at the project root:

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://yourdomain.com',
  generateRobotsTxt: true,
}
```

Add a postbuild script in `package.json`:

```json
{
  "scripts": {
    "postbuild": "next-sitemap"
  }
}
```

### SvelteKit

Create a server endpoint at `src/routes/sitemap.xml/+server.ts`:

```ts
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
  const pages = ['', '/about', '/blog']
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(path => `  <url><loc>https://yourdomain.com${path}</loc></url>`).join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
```

### Nuxt

Install and configure `@nuxtjs/sitemap`:

```bash
npm install @nuxtjs/sitemap
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/sitemap'],
  site: {
    url: 'https://yourdomain.com',
  },
})
```

### Astro

Install and configure `@astrojs/sitemap`:

```bash
npm install @astrojs/sitemap
```

```ts
// astro.config.ts
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://yourdomain.com',
  integrations: [sitemap()],
})
```

### Plain HTML

Create `sitemap.xml` at the root of your project:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/about</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

:::tip
After creating your sitemap, submit it in Google Search Console under "Sitemaps". Google will begin processing it within hours.
:::

## Verify the fix

Check that the sitemap is accessible and contains valid XML:

```bash
curl https://yourdomain.com/sitemap.xml
```

The response should be XML containing at least one `<url>` entry inside a `<urlset>` element. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [robots.txt missing](/fixes/crawlability/robots-txt-present)
- [Sitemap contains dead URLs](/fixes/crawlability/sitemap-dead-urls)
- [Sitemap URLs point to redirects](/fixes/crawlability/sitemap-redirects)
