---
title: Article schema missing dateModified
description: Adds dateModified to Article or BlogPosting schema so AI search engines can assess whether your content is current.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

An Article or BlogPosting schema block exists on a blog post, but has no `dateModified` field. Perplexity weights content freshness heavily when ranking sources for citations. Without `dateModified`, your content may be treated as stale even when it has been recently updated and remains more accurate than newer competitors.

## How to fix it

Add `dateModified` to the schema block as an ISO 8601 date-time string. Update this value whenever you make meaningful changes to the content, not just minor typo fixes.

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Your Article Title",
  "datePublished": "2024-01-15T10:00:00Z",
  "dateModified": "2024-06-20T14:30:00Z",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "image": "https://yoursite.com/images/article-cover.jpg",
  "url": "https://yoursite.com/blog/your-article-slug"
}
```

In most frameworks, `dateModified` comes from your CMS or content layer. Pass it into the schema object the same way you pass `datePublished`.

:::note
`datePublished` and `dateModified` should both be present. `datePublished` is the original publish date and never changes. `dateModified` is the last meaningful edit date and should change when you update the content.
:::

:::tip
If your content has never been edited since publication, set `dateModified` equal to `datePublished`. An explicit value is always better than omitting the field.
:::

## Verify the fix

Re-run `orino audit`. The `schema-article-no-datemodified` check should pass. You can also inspect the page source and confirm the `dateModified` field is present in the JSON-LD block.

## Related fixes

- [Article schema missing on blog posts](./schema-article-missing)
- [FAQPage schema missing on informational pages](./schema-faqpage-missing)
- [Organization schema missing](./schema-organization-missing)
