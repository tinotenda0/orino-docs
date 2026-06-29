---
title: robots.txt missing in /static (SvelteKit)
description: Create a robots.txt file in /static so crawlers have instructions for this SvelteKit site.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

SvelteKit serves static assets from the `/static` directory. Without a `static/robots.txt`, no `/robots.txt` is served. Crawlers operate without guidance and may index internal paths, API endpoints, or staging content.

## How to fix it

Create `static/robots.txt`.

```txt
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

Replace `https://example.com` with your actual domain. Add `Disallow` rules for any paths that should not be indexed.

:::tip
Do not disallow `/_app/` — that directory contains SvelteKit's compiled JavaScript and CSS. Blocking it prevents Googlebot from rendering your pages. See [/_app/ blocked in robots.txt](/fixes/crawlability/sveltekit-robots-blocking-static).
:::

## Verify the fix

```bash
curl -I https://yourdomain.com/robots.txt
```

Confirm the response is `200 OK`. Then re-run `orino audit`.

## Related fixes

- [sitemap missing](/fixes/crawlability/sveltekit-sitemap-missing)
- [/_app/ blocked in robots.txt](/fixes/crawlability/sveltekit-robots-blocking-static)
- [CSR-only SvelteKit route](/fixes/crawlability/sveltekit-csr-page)
