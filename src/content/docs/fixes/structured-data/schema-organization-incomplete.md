---
title: Organization schema incomplete
description: Adds missing required properties to Organization schema so Google and AI crawlers can correctly identify your business.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

An Organization block exists on the homepage but is missing one or more of the required properties: `name`, `url`, or `logo`. Google uses these three fields to populate knowledge panels and brand summaries in search results. Missing any one of them means your organisation may not appear correctly in branded searches or AI-generated descriptions.

## How to fix it

Add the missing properties to the existing Organization block. A complete minimum block looks like this:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company Name",
  "url": "https://yoursite.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://yoursite.com/logo.png",
    "width": 200,
    "height": 60
  }
}
```

The `logo` field must be an `ImageObject`, not a plain URL string. Google will reject a bare string value.

:::note
The `url` property should be the canonical URL of your homepage, matching the value in your sitemap and canonical tags.
:::

The CLI output names which specific property is missing. If more than one is flagged, add all of them before re-running.

## Verify the fix

Re-run `orino audit`. The `schema-organization-incomplete` check should pass. All three properties (`name`, `url`, `logo`) must be present for the check to clear.

## Related fixes

- [Organization schema missing](./schema-organization-missing)
- [Organization schema missing sameAs links](./schema-same-as-missing)
- [JSON-LD invalid](./schema-invalid-json)
- [Duplicate schema blocks found](./schema-duplicate-type)
