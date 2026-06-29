---
title: Sitemap contains dead URLs
description: Resolves sitemap.xml entries that return 404, wasting crawl budget on pages that no longer exist.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

Every URL in your sitemap should return a 200 response. If Googlebot fetches a sitemap entry and gets a 404, it flags the URL as dead and may not revisit it even after the underlying problem is fixed. A sitemap with dead URLs also dilutes crawl budget across non-existent pages instead of directing it towards the ones that matter.

The check tests each URL in your sitemap and flags any that return a 4xx response or fail to connect.

## How to fix it

The audit output lists each failing URL. For each one, choose one of these actions:

1. **If the page was deleted:** remove the URL from your sitemap.
2. **If the page was moved:** update the sitemap entry to the new URL and set up a 301 redirect from the old path.
3. **If the page should exist:** fix the underlying issue causing the 404.

### Removing a dead URL from a static sitemap

Edit `sitemap.xml` and delete the `<url>` block for the removed page:

```xml
<!-- Remove this entire block -->
<url>
  <loc>https://yourdomain.com/deleted-page</loc>
  <lastmod>2024-01-01</lastmod>
</url>
```

### Updating a dynamically generated sitemap

If your sitemap is generated automatically, fix the data source so it only includes live pages.

**Next.js App Router** — ensure `app/sitemap.ts` only returns published, live content:

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts() // must return only live pages
  return posts.map(post => ({
    url: `https://yourdomain.com/blog/${post.slug}`,
    lastModified: post.updatedAt,
  }))
}
```

**SvelteKit** — update the data source in your `src/routes/sitemap.xml/+server.ts` endpoint to filter out unpublished or deleted content.

**Nuxt with `@nuxtjs/sitemap`** — update the data source referenced in your sitemap configuration so deleted pages are no longer included.

:::tip
Run `orino audit` as part of your deployment pipeline. Catching dead sitemap URLs before they go live is much cheaper than waiting for Google to report them.
:::

## Verify the fix

After updating the sitemap, confirm each previously-failing URL now returns 200:

```bash
curl -o /dev/null -s -w "%{http_code}" https://yourdomain.com/previously-dead-page
```

Confirm the URL no longer appears in your sitemap:

```bash
curl -s https://yourdomain.com/sitemap.xml | grep 'previously-dead-page'
```

Re-run `orino audit` to confirm the check passes.

## Related fixes

- [sitemap.xml missing](/fixes/crawlability/sitemap-present)
- [Sitemap URLs point to redirects](/fixes/crawlability/sitemap-redirects)
