---
title: /_next/static/ blocked in robots.txt
description: Resolves a robots.txt rule that prevents Googlebot from loading the JavaScript and CSS files Next.js needs to render pages.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

This check applies to Next.js projects only.

If your robots.txt contains `Disallow: /_next/` without an explicit `Allow: /_next/static/`, Googlebot cannot download the JavaScript and CSS files it needs to render your pages. The version Google sees will be blank or broken, even though the raw HTML response looks fine to you.

## How to fix it

Add an `Allow: /_next/static/` rule above the `Disallow: /_next/` rule. The more specific `Allow` takes precedence over the broader `Disallow`:

```
User-agent: *
Allow: /_next/static/
Disallow: /_next/

Sitemap: https://yourdomain.com/sitemap.xml
```

If you have no reason to block any of `/_next/`, the simpler fix is to remove the disallow entirely:

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### Next.js App Router

Update `app/robots.ts` to include the allow rule:

```ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/_next/static/'],
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://yourdomain.com/sitemap.xml',
  }
}
```

### Next.js Pages Router

Edit `public/robots.txt` directly using the text example above.

:::caution
The `/_next/data/` path and other `/_next/` internals are fine to disallow. The critical rule is that `/_next/static/` must be reachable so asset files can be loaded.
:::

## Verify the fix

Check the live robots.txt:

```bash
curl https://yourdomain.com/robots.txt
```

Confirm `Allow: /_next/static/` appears before any `Disallow: /_next/` rule. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [robots.txt blocking all crawlers](/fixes/crawlability/robots-txt-blocking-all)
- [robots.txt missing](/fixes/crawlability/robots-txt-present)
