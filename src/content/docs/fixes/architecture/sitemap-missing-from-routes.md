---
title: Sitemap URL has no route
description: A URL in your sitemap.xml has no matching route in your codebase — often a deleted page still lingering in the sitemap.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Orino found a URL in your live `sitemap.xml` that has no corresponding route in your codebase. Because Orino holds both your source route list and your live sitemap, it can spot URLs the sitemap still advertises but your app no longer serves.

The usual causes are:

- **A deleted page still in the sitemap.** You removed the route but the sitemap was not regenerated, so it still points crawlers at a URL that now 404s or redirects.
- **A page generated outside the framework routing system** — proxied content, a rewrite, or a separate service mounted under the same domain.

Either way, a sitemap should only list live, canonical URLs. Dead or redirecting entries waste crawl budget and can erode trust in the sitemap as a whole.

This check runs only in full mode (codebase **and** URL) on Next.js projects.

## What is excluded

To avoid false positives on content that is legitimately generated outside file-based routing, the comparison skips:

- **Dynamic-looking URLs** — paths containing numbers or content-ID-style slugs that a dynamic route would produce.
- **CMS-style paths** under `/blog/`, `/posts/`, or `/articles/`, which are almost always served by a single dynamic route rather than one file per page.
- URLs that match a codebase route once dynamic segments (`[slug]`) are treated as wildcards.

## How to fix it

Check what the flagged URL currently returns:

```bash
curl -sI https://example.com/old-page
```

**If the page is genuinely gone**, remove it from your sitemap. In the App Router, delete the entry from `app/sitemap.ts`; for static sitemaps, remove the `<url>` from `public/sitemap.xml` or regenerate it. If the old URL still gets traffic or has backlinks, add a 301 redirect to the closest live page so that link equity is preserved.

**If the page should exist but the route was lost**, restore the route in your codebase so the sitemap entry is valid again.

**If the URL is served outside your framework** (a rewrite or proxy) and is intentional, this is a benign report — the page is real, it just is not file-based. Suppress it in your [config file](/docs/configuration) with an `ignore` rule so it stops appearing:

```json
{
  "ignore": ["sitemap-missing-from-routes"]
}
```

## Verify the fix

Re-run the audit in full mode:

```bash
npx orino-cli audit --dir . --url https://example.com
```

The check normalises both sides — stripping the domain and trailing slashes, lowercasing, and treating `www` and apex as the same host — then reports any sitemap URL with no matching route. Once the stale URL is removed from the sitemap (or the route is restored), it drops out of the report.

## Related fixes

- [Route missing from sitemap](/fixes/architecture/routes-missing-from-sitemap)
- [Sitemap contains dead URLs](/fixes/crawlability/sitemap-dead-urls)
- [Sitemap URLs point to redirects](/fixes/crawlability/sitemap-redirects)
