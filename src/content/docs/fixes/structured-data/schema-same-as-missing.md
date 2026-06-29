---
title: Organization schema missing sameAs links
description: Adds sameAs links to Organization schema to verify your entity in Google's Knowledge Graph and AI search platforms.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

An Organization block exists on the homepage but has no `sameAs` array, or the array is empty. Google's Knowledge Graph uses `sameAs` links to confirm that your schema entity is the same organisation as the one on LinkedIn, X (formerly Twitter), Wikidata, or Companies House. AI search engines rely on these cross-references when deciding how much authority to attribute to a source. Without `sameAs`, your organisation's identity is harder to verify and easier to confuse with others that share a similar name.

## How to fix it

Add a `sameAs` array to the Organization block. Include every official profile URL for your business. The more authoritative the source (Wikidata, LinkedIn, official government registries), the stronger the signal.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company Name",
  "url": "https://yoursite.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://yoursite.com/logo.png"
  },
  "sameAs": [
    "https://www.linkedin.com/company/your-company",
    "https://twitter.com/yourcompany",
    "https://github.com/yourcompany",
    "https://www.wikidata.org/wiki/Q12345678"
  ]
}
```

:::tip
Wikidata and Companies House (or your national business registry equivalent) carry more authority than social profiles. Add them if your organisation has entries there.
:::

:::note
Only include URLs that you control or that definitively represent your organisation. A LinkedIn page for a different company with a similar name will do more harm than no entry at all.
:::

## Verify the fix

Re-run `orino audit`. The `schema-same-as-missing` check should pass. You can also view source and confirm the `sameAs` array is present and non-empty in the JSON-LD block.

## Related fixes

- [Organization schema missing](./schema-organization-missing)
- [Organization schema incomplete](./schema-organization-incomplete)
- [FAQPage schema missing on informational pages](./schema-faqpage-missing)
