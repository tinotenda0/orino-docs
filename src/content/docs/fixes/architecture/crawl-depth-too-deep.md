---
title: Pages deeper than 3 clicks
description: One or more pages require more than 3 clicks from the homepage to reach, reducing how often Googlebot crawls and re-indexes them.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Googlebot discovers pages by following links. The deeper a page sits in your site's link graph — measured in clicks from the homepage — the less often it is crawled and the less authority it inherits. Pages requiring more than 3 clicks tend to be revisited infrequently, which means updates to those pages take longer to appear in search results.

This check builds a live link graph from your site and reports any page where the shortest path from the homepage exceeds 3 links.

## How to fix it

The goal is to reduce the minimum number of clicks required to reach the deep pages. There are several effective approaches, depending on what the page is:

**Add the page to the main navigation.** Navigation links render on every page, so a link in the nav brings a page to depth 1 immediately. Only the most important pages warrant this treatment.

**Add a direct link from a shallower page.** If a page sits at depth 5, look at which pages sit at depth 2 or 3 on the path to it. Adding a direct link from a depth-2 page drops the target to depth 3.

**Create a hub page for a related cluster.** If you have a group of deep pages on the same topic, create a hub or index page at depth 2 that links to all of them. The whole cluster drops to depth 3.

**Add "related content" links on higher-level pages.** A relevant blog post or product page at depth 2 can link to deeper pages on related topics. This is both good architecture and useful for readers.

:::note
The check measures the shortest path through your live site's actual links — not your intended URL structure. A page at `/blog/2022/january/my-post` might be depth 2 if the blog index links to it directly, or depth 4 if it only appears in an archive. Audit the actual link graph, not just the URL.
:::

## Verify the fix

Re-run the audit after deploying the new links:

```bash
npx orino audit https://yourdomain.com
```

The check crawls your live site up to 3 levels deep from the homepage. Once every page in the sitemap is reachable within 3 clicks, the check passes.

## Related fixes

- [Orphan pages in sitemap](/fixes/architecture/orphan-page)
- [Homepage missing links to key sections](/fixes/architecture/homepage-missing-links)
- [Thin content](/fixes/on-page/thin-content)
