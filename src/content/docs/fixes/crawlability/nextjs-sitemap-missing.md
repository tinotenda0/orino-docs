---
title: sitemap.ts or sitemap.xml missing (App Router)
description: Add a sitemap so search engines can discover all pages in this Next.js App Router site.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

No `app/sitemap.ts` and no `public/sitemap.xml`. Search engines rely on crawl discovery alone. Newly published pages can take weeks to be indexed, and pages with no inbound links may never appear in search results.

## How to fix it

Create `app/sitemap.ts`. Next.js generates and serves the sitemap at `/sitemap.xml` automatically.

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://example.com/about',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ]
}
```

For sites with many dynamic pages, fetch from your CMS or database inside `sitemap()`.

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()
  return [
    { url: 'https://example.com', lastModified: new Date() },
    ...posts.map(post => ({
      url: `https://example.com/blog/${post.slug}`,
      lastModified: post.updatedAt,
    })),
  ]
}
```

## Verify the fix

```bash
curl https://yourdomain.com/sitemap.xml
```

Confirm the response is valid XML with `<urlset>` as the root element and lists your pages. Then re-run `orino audit`.

## Related fixes

- [robots.ts or robots.txt missing](/fixes/crawlability/nextjs-robots-missing)
- [generateStaticParams missing on dynamic route](/fixes/crawlability/nextjs-missing-generate-static-params)
- [generateMetadata missing on dynamic route](/fixes/crawlability/nextjs-missing-generate-metadata)
