---
title: Duplicate schema blocks found
description: Removes or merges duplicate JSON-LD blocks of the same @type to prevent knowledge graph conflicts.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

Two or more `<script type="application/ld+json">` blocks on the same page declare the same `@type` without a unique `@id` on each block. Google cannot reconcile two conflicting representations of the same entity type. One block will be used and one discarded, but which one wins is unpredictable. This is a common side effect of third-party plugins or analytics scripts adding their own schema blocks alongside yours.

## How to fix it

You have two options depending on whether the duplicate blocks represent the same entity or genuinely different entities.

### Option 1: Merge into one block

This is the right fix in most cases. Combine all properties from both blocks into a single schema block and remove the duplicate.

Before:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Acme Corp"
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Acme Corp",
  "url": "https://acmecorp.com",
  "logo": { "@type": "ImageObject", "url": "https://acmecorp.com/logo.png" }
}
```

After:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Acme Corp",
  "url": "https://acmecorp.com",
  "logo": { "@type": "ImageObject", "url": "https://acmecorp.com/logo.png" }
}
```

### Option 2: Add @id to each block

Use this only when both blocks represent genuinely distinct entities of the same type, for example a parent company and a subsidiary. Each `@id` must be a unique IRI.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://acmecorp.com/#org",
  "name": "Acme Corp",
  "url": "https://acmecorp.com"
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://acmecorp.com/labs/#org",
  "name": "Acme Labs",
  "url": "https://acmecorp.com/labs"
}
```

:::caution
Do not use `@id` to sidestep this check for blocks that actually represent the same entity. Google will still encounter conflicting data and produce unreliable knowledge graph entries.
:::

## Verify the fix

Re-run `orino audit`. The `schema-duplicate-type` check should pass. You can also inspect the page source and count `<script type="application/ld+json">` tags to confirm only one block exists per type.

## Related fixes

- [JSON-LD invalid](./schema-invalid-json)
- [Organization schema missing](./schema-organization-missing)
- [Organization schema incomplete](./schema-organization-incomplete)
