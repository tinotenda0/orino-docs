---
title: Route missing from sitemap
description: A page exists in your codebase but is not listed in sitemap.xml, so search engines may never discover it.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Orino found a route in your codebase that does not appear in your live `sitemap.xml`. This is one of the few checks only Orino can run — it has both your source route list *and* your live sitemap, so it can diff the two and surface the gap.

A page missing from the sitemap is not necessarily unindexable — search engines can still reach it by following internal links — but it receives no crawl priority from the sitemap and can be missed entirely if it is also weakly linked. For a page you intend to rank, the sitemap is the most direct signal that it exists.

This check runs only in full mode (codebase **and** URL) on Next.js projects, because it needs both sources to compare.

## What is excluded

To avoid false positives, the comparison skips route types whose sitemap presence cannot be inferred from the file system:

- **Dynamic routes** (`[slug]`, `[...slug]`) — Orino cannot know every value a dynamic segment expands to, so it cannot check them against the sitemap.
- **API routes** (`/api/*`) — not indexable pages.
- **Special pages** — `_app`, `_document`, `404`, `500`, `error`, and similar framework internals.
- Routes that already match a sitemap URL once dynamic segments are treated as wildcards.

## How to fix it

Decide whether the flagged route should be indexed.

**If it should be indexed**, add it to your sitemap. In the Next.js App Router, that means adding an entry to `app/sitemap.ts`:

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://example.com/', lastModified: new Date() },
    { url: 'https://example.com/about', lastModified: new Date() },
    // Add the missing route:
    { url: 'https://example.com/pricing', lastModified: new Date() },
  ]
}
```

For Pages Router or static projects, add a `<url>` entry to `public/sitemap.xml`, or regenerate it with your sitemap tool so the route is included.

**If it should not be indexed** — a thank-you page, a gated route, an internal tool — no sitemap entry is needed. If it is also reachable and you do not want it indexed, add a `noindex` directive so its absence from the sitemap is intentional and consistent.

## Verify the fix

Re-run the audit in full mode:

```bash
npx orino-cli audit --dir . --url https://example.com
```

The check normalises both sides — stripping the domain and trailing slashes, lowercasing, and treating `www` and apex as the same host — then reports any codebase route with no matching sitemap URL. Once the route appears in the sitemap, it drops out of the report.

## Related fixes

- [Sitemap URL has no route](/fixes/architecture/sitemap-missing-from-routes)
- [sitemap.xml missing](/fixes/crawlability/sitemap-present)
- [Orphan pages in sitemap](/fixes/architecture/orphan-page)
