---
title: robots.txt missing
description: Resolves a missing /robots.txt file, which leaves crawlers with no instructions about which paths to access.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

Every site should have a robots.txt file at `/robots.txt`. Without one, crawlers have no guidance about which paths to index and which to skip. Most crawlers will index everything by default, but you lose the ability to protect internal routes, reduce crawl budget waste on low-value pages, and point crawlers to your sitemap.

## How to fix it

Create a robots.txt in the location your framework serves static files from.

### Next.js App Router

The recommended approach is `app/robots.ts`, which Next.js compiles to `/robots.txt` automatically at build time:

```ts
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://yourdomain.com/sitemap.xml',
  }
}
```

Alternatively, place a static `public/robots.txt` in your project root.

### Next.js Pages Router

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### SvelteKit

Create `static/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### Nuxt

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

For programmatic control over multiple environments, use the `@nuxtjs/robots` module.

### Astro

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### Plain HTML

Place `robots.txt` in the root directory of your site, alongside `index.html`:

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

## Verify the fix

Check the file is accessible at its standard path:

```bash
curl -I https://yourdomain.com/robots.txt
```

The response should return `200 OK`. Check the content is correct:

```bash
curl https://yourdomain.com/robots.txt
```

Re-run `orino audit` to confirm the check passes.

## Related fixes

- [robots.txt blocking all crawlers](/fixes/crawlability/robots-txt-blocking-all)
- [/_next/static/ blocked in robots.txt](/fixes/crawlability/robots-txt-blocking-next-static)
- [sitemap.xml missing](/fixes/crawlability/sitemap-present)
