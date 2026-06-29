---
title: robots.ts or robots.txt missing (App Router)
description: Create a robots file so crawlers have instructions for this Next.js App Router site.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

No `app/robots.ts` and no `public/robots.txt`. Without a robots file, crawlers have no guidance. Googlebot may crawl and attempt to index API routes, admin paths, or staging content.

## How to fix it

The preferred approach for App Router is `app/robots.ts`. Next.js generates and serves it at `/robots.txt` automatically.

```ts
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://example.com/sitemap.xml',
  }
}
```

Replace `https://example.com` with your actual domain. Add paths to `disallow` for any routes you want to keep out of search results.

:::tip
`app/robots.ts` is better than a static file when you need environment variables — for example, using `process.env.NEXT_PUBLIC_SITE_URL` as the sitemap URL so the value differs between staging and production.
:::

## Verify the fix

```bash
curl -I https://yourdomain.com/robots.txt
```

Confirm the response is `200 OK`. View the response body to confirm the content is correct. Then re-run `orino audit`.

## Related fixes

- [sitemap.ts or sitemap.xml missing](/fixes/crawlability/nextjs-sitemap-missing)
- [CSR-only page component](/fixes/crawlability/nextjs-csr-page)
- [generateMetadata missing on dynamic route](/fixes/crawlability/nextjs-missing-generate-metadata)
