---
title: Homepage missing links to key sections
description: Top-level sections of the site are in the sitemap but not linked from the homepage, reducing the authority passed to those sections.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Your homepage does not link to one or more top-level sections of your site. These sections appear in your sitemap — they exist and you want them indexed — but there is no link from the homepage pointing to them.

The homepage is your highest-authority page. A direct link from it passes PageRank to the destination, boosts that section's crawl priority, and makes the site structure legible to both search engines and users. Sections not linked from the homepage miss out on all of that.

This check compares your sitemap against the internal links found on the live homepage. Any top-level path (a path with a single segment, like `/features` or `/pricing`) that is in the sitemap but absent from the homepage is flagged.

## How to fix it

Add links to the missing sections. The most natural place is your main navigation — if a section is important enough to be in the sitemap, it should generally be reachable without hunting for it.

Start by auditing your sitemap against your navigation:

```bash
curl -s https://yourdomain.com/sitemap.xml | grep -oP '(?<=<loc>)[^<]+'
```

Compare the top-level paths in that output to the links rendered in your site's navigation. Any path with a single segment that does not appear in the nav is a candidate to add.

If a section genuinely should not appear in the navigation — for example, a legacy section being gradually phased out — reconsider whether it should still be in the sitemap. A page in the sitemap signals that you want it crawled and ranked. If you do not, remove it from the sitemap rather than leaving it unlinked.

:::tip
A footer link counts as an internal link for this check. Covering important sections in both the navigation and the footer is good practice and gives the homepage two link paths to each section.
:::

## Verify the fix

Re-run the audit:

```bash
npx @bynaree/orino audit --url https://yourdomain.com
```

The check compares all top-level paths in the sitemap against the internal links in the homepage HTML. Once the missing sections are linked, the check passes.

## Related fixes

- [Orphan pages in sitemap](/fixes/architecture/orphan-page)
- [Pages deeper than 3 clicks](/fixes/architecture/crawl-depth-too-deep)
- [URL contains underscores or uppercase](/fixes/on-page/url-underscores)
