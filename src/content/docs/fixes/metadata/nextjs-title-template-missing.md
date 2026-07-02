---
title: Title template not configured
description: No title template in the root layout. Inner pages cannot append the brand name automatically.
sidebar:
  badge:
    text: Info
    variant: note
---

## What this means

In Next.js App Router, you can set a `title.template` in the root layout's `metadata` export. The template uses `%s` as a placeholder for the per-page title. Without it, each page that exports a `title` string gets that string verbatim, with no brand name appended.

This is not a breaking problem, but it means either your inner pages are missing the brand name in their titles, or you are duplicating "| Brand" on every individual page export.

## How to fix it

Add a `title` object with `default` and `template` fields to the root layout's `metadata` export.

```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'Acme - Architecture and Interior Design',
    template: '%s | Acme',
  },
  description: 'Architecture and interior design across London and the South East.',
}
```

- `default` is used when a page does not export its own title.
- `template` is applied to pages that do export a title. `%s` is replaced with the page's title.

Inner pages then set only the short page title:

```tsx
// app/about/page.tsx
export const metadata = {
  title: 'About',
  // Renders as: "About | Acme"
}

// app/services/page.tsx
export const metadata = {
  title: 'Services',
  // Renders as: "Services | Acme"
}
```

:::note
If a page exports a `title` as a plain string, it inherits the root template. If a page exports `title` as an object with its own `template`, that overrides the root template. Use this to customise the format for blog posts or other content types.
:::

## Verify the fix

```bash
curl -s https://example.com/about | grep -i '<title'
```

The output should include your brand name appended to the page title. Re-run the audit:

```bash
npx orino-cli audit
```

## Related fixes

- [Root layout missing metadata export](/fixes/metadata/nextjs-root-metadata-missing)
- [Title missing](/fixes/metadata/title-missing)
- [Title too long](/fixes/metadata/title-too-long)
