---
title: sitemap missing (SvelteKit)
description: Add a sitemap to this SvelteKit site so search engines can discover all pages.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

No `static/sitemap.xml` and no dynamic sitemap endpoint at `src/routes/sitemap.xml/+server.ts`. Without a sitemap, search engines rely on link discovery alone. Pages with no inbound links may never be indexed.

## How to fix it

For sites where URLs are not known at build time, create a dynamic endpoint that generates the sitemap on request.

```ts
// src/routes/sitemap.xml/+server.ts
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
  const pages = await getPages()

  const urls = pages
    .map(p => `  <url><loc>https://example.com${p.path}</loc></url>`)
    .join('\n')

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
```

For fully static sites, a `static/sitemap.xml` file is simpler and requires no code.

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

- [robots.txt missing in /static](/fixes/crawlability/sveltekit-robots-missing)
- [/_app/ blocked in robots.txt](/fixes/crawlability/sveltekit-robots-blocking-static)
- [Dynamic route missing +page.server.ts](/fixes/crawlability/sveltekit-missing-page-server)
