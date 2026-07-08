---
title: robots.txt missing
description: Create a robots.txt at the project root for this static HTML site.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

No `robots.txt` at the site root. Crawlers have no guidance on what to index and may crawl draft files, error pages, or internal directories that were never meant to be public.

## How to fix it

Create `robots.txt` in your root directory, at the same level as `index.html`.

```txt
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

Replace `https://example.com` with your actual domain. If you have paths that should not be indexed, add a `Disallow` rule for each one.

```txt
User-agent: *
Allow: /
Disallow: /drafts/
Disallow: /admin/

Sitemap: https://example.com/sitemap.xml
```

## Verify the fix

```bash
curl -I https://yourdomain.com/robots.txt
```

Confirm the response is `200 OK`. Then re-run `orino audit`.

## Related fixes

- [sitemap.xml missing](/fixes/crawlability/html-sitemap-missing)
- [HTML lang attribute missing](/fixes/crawlability/html-missing-lang)
- [Viewport meta tag missing](/fixes/crawlability/viewport-missing)
