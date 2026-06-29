---
title: JSON-LD invalid
description: Fixes syntax errors in structured data script blocks that cause search engines to silently discard your schema.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

At least one `<script type="application/ld+json">` block on the page contains a JSON syntax error. Search engines and AI crawlers silently skip any block they cannot parse. Every piece of structured data on that page is effectively invisible until the syntax is fixed.

## How to fix it

The CLI output includes the parse error message, which typically names the line or character position of the problem. The most common causes are listed below.

**Missing comma between properties:**

```json
{
  "@context": "https://schema.org"
  "@type": "Organization"
}
```

Fix: add the missing comma after each property except the last.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization"
}
```

**Trailing comma after the last property:**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
}
```

Fix: remove the comma after the last property.

**Single quotes instead of double quotes:**

```json
{
  '@context': 'https://schema.org',
  '@type': 'Organization'
}
```

Fix: JSON requires double quotes for all strings and property names.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization"
}
```

**Unescaped special characters in strings:**

If a property value contains a double quote, backslash, or control character, it must be escaped with a backslash. The most common case is a description that contains a quotation mark.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "description": "Learn what "schema" means and why it matters."
}
```

Fix:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "description": "Learn what \"schema\" means and why it matters."
}
```

:::tip
Use `JSON.stringify()` to generate the JSON from a JavaScript object rather than writing JSON by hand. This eliminates all syntax errors at the source. See any of the framework examples in [Organization schema missing](./schema-organization-missing) for how to do this.
:::

:::danger
Do not build JSON-LD by concatenating strings. String concatenation is the most common source of schema breakage, especially when content from a CMS contains quotes, newlines, or special characters.
:::

## Verify the fix

Re-run `orino audit`. The `schema-invalid-json` check should pass. You can also run `JSON.parse()` on the block content in your browser console to confirm it parses without error.

## Related fixes

- [Duplicate schema blocks found](./schema-duplicate-type)
- [Organization schema missing](./schema-organization-missing)
- [Organization schema incomplete](./schema-organization-incomplete)
