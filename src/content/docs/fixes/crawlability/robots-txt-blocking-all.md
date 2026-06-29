---
title: robots.txt blocking all crawlers
description: Resolves Disallow:/ in robots.txt, which blocks all search engines from crawling the entire site.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

`Disallow: /` under `User-agent: *` tells every crawler to avoid every path on your site. No pages will be indexed. If this is your production domain, your site is invisible to search engines.

This configuration is standard on staging environments and is the most common way it ends up on production: a staging robots.txt gets deployed without being changed.

## How to fix it

Open your robots.txt and remove or replace the blocking rule.

A minimal robots.txt that permits all crawlers:

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

If you want to block specific paths only (admin panels, API routes), disallow those explicitly:

```
User-agent: *
Disallow: /admin/
Disallow: /api/

Sitemap: https://yourdomain.com/sitemap.xml
```

:::caution
If the current `Disallow: /` is intentional because you are auditing a staging domain, do not remove it. Confirm you are running `orino audit` against your production URL, not staging.
:::

### File locations by framework

| Framework | robots.txt location |
|---|---|
| Next.js App Router | `app/robots.ts` (compiled) or `public/robots.txt` |
| Next.js Pages Router | `public/robots.txt` |
| SvelteKit | `static/robots.txt` |
| Nuxt | `public/robots.txt` |
| Astro | `public/robots.txt` |
| Plain HTML | `robots.txt` at project root |

## Verify the fix

Check the live robots.txt content:

```bash
curl https://yourdomain.com/robots.txt
```

Confirm there is no `Disallow: /` under `User-agent: *`. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [robots.txt missing](/fixes/crawlability/robots-txt-present)
- [noindex on public page](/fixes/crawlability/noindex-on-public-page)
- [/_next/static/ blocked in robots.txt](/fixes/crawlability/robots-txt-blocking-next-static)
