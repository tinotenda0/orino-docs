---
title: Sitemap URLs point to redirects
description: Resolves sitemap entries that use redirect URLs instead of the final destination URL.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Sitemap URLs should point directly to the final, canonical version of each page. If an entry redirects, Googlebot must follow the redirect before it can process the page. This wastes a small amount of crawl budget on each request, but more importantly it signals that your sitemap is out of sync with your actual URL structure.

## How to fix it

Update each redirecting sitemap entry to use the final destination URL directly.

First, identify which URLs are redirecting:

```bash
orino audit --url https://yourdomain.com
```

For each flagged URL, trace where it ends up:

```bash
curl -IL --max-redirs 10 https://yourdomain.com/old-path
```

Use the final `Location:` value as the updated sitemap entry.

### Static sitemap

Edit `sitemap.xml` and replace the old URL with the final destination:

```xml
<!-- Before -->
<url>
  <loc>https://yourdomain.com/old-path</loc>
</url>

<!-- After -->
<url>
  <loc>https://yourdomain.com/new-path</loc>
</url>
```

### Next.js App Router

Update the URLs returned by `app/sitemap.ts` to use the current canonical paths:

```ts
// app/sitemap.ts
export default function sitemap() {
  return [
    {
      url: 'https://yourdomain.com/new-path', // previously /old-path
      lastModified: new Date(),
    },
  ]
}
```

### SvelteKit

Update the data source in your `src/routes/sitemap.xml/+server.ts` endpoint to use current slugs.

### Nuxt and Astro

Update the data source your sitemap configuration reads from. If slugs changed in your CMS, update the generator to use the new values.

:::note
Sitemap redirects are a housekeeping issue, not an emergency. Google will eventually reach the final URL via the redirect regardless. But an accurate sitemap is a sign of a well-maintained site and removes unnecessary friction from the crawl path.
:::

## Verify the fix

After updating, confirm each previously-redirecting URL now resolves directly to 200:

```bash
curl -o /dev/null -s -w "%{http_code}" https://yourdomain.com/new-path
```

Re-run `orino audit` to confirm the check passes.

## Related fixes

- [Sitemap contains dead URLs](/fixes/crawlability/sitemap-dead-urls)
- [Redirect chain](/fixes/crawlability/redirect-chain)
- [sitemap.xml missing](/fixes/crawlability/sitemap-present)
