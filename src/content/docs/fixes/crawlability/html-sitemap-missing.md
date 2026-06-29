---
title: sitemap.xml missing
description: Create a sitemap.xml listing all HTML pages so search engines can discover them.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

No `sitemap.xml` at the site root. Search engines rely on link discovery alone. Pages with no inbound links may never be indexed, and new content takes longer to appear in results.

## How to fix it

Create `sitemap.xml` in your root directory, listing every public page.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/about/</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://example.com/contact/</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>0.7</priority>
  </url>
</urlset>
```

Use absolute URLs. If your server normalises URLs to a trailing slash, include the trailing slash in each `<loc>`. Every `<loc>` must match the canonical form of the URL — the same URL you would use as a canonical tag.

Once the sitemap is in place, reference it from `robots.txt`.

```txt
Sitemap: https://example.com/sitemap.xml
```

## Verify the fix

```bash
curl https://yourdomain.com/sitemap.xml
```

Confirm the response is valid XML with `<urlset>` as the root element and that all your pages are listed. Then re-run `orino audit`.

## Related fixes

- [robots.txt missing](/fixes/crawlability/html-robots-missing)
- [HTML lang attribute missing](/fixes/crawlability/html-lang-missing)
- [Viewport meta tag missing](/fixes/crawlability/viewport-missing)
