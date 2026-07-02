---
title: Orphan pages in sitemap
description: Pages listed in your sitemap are not linked from any other page, leaving crawlers with no path to reach them.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

One or more pages appear in your sitemap but no other page on the site links to them. Search engines primarily discover pages by following links. A sitemap entry tells Google that a page exists, but without internal links pointing to it, the page receives no crawl priority and inherits no authority from the rest of your site.

These pages exist in your sitemap but are practically invisible to crawlers between scheduled sitemaps re-reads — which happen far less often than link-following.

## How to fix it

Add internal links to the orphan pages from relevant content elsewhere on the site. The right location depends on what the page is about:

- **Blog post:** link from related posts, a featured articles section, or the blog index.
- **Landing page:** link from the homepage, a related product or service page, or the navigation.
- **Case study:** link from your case studies index and from the relevant service or industry page.
- **Documentation page:** add it to your docs navigation and link to it from related pages in the same section.

If you cannot find a natural place to link to the page, that is a signal the page's topic is not well connected to the rest of your site. Either improve the page so it fits, or remove it from the sitemap — there is no benefit in sitemapping a page you are not actively promoting and that earns no links.

:::caution
Do not add links just to satisfy this check. A forced, out-of-context link harms the reader experience and will not fool Google. The fix is architectural — make the link natural by improving the surrounding content or the page itself.
:::

## Verify the fix

Re-run the audit:

```bash
npx @bynaree/orino audit --url https://yourdomain.com
```

The check builds a link graph from your live site (up to 3 levels deep from the homepage) and identifies any sitemap URL that does not appear in any page's outbound links. Once at least one internal link points to each orphan page, they drop out of the report.

## Related fixes

- [Homepage missing links to key sections](/fixes/architecture/homepage-missing-links)
- [Pages deeper than 3 clicks](/fixes/architecture/crawl-depth-too-deep)
- [Thin content](/fixes/on-page/thin-content)
