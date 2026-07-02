---
title: metadataBase not configured
description: No metadataBase in the root layout. og:image URLs will be relative and fail to load on social platforms.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

In Next.js App Router, `metadataBase` is the base URL used to resolve relative image paths in your `metadata` exports. Without it, any `og:image` value that uses a relative path like `/og.png` is rendered into the HTML as a relative URL. Social platforms cannot load relative URLs. They need a full `https://` address.

The check looks for a `metadataBase` property in `app/layout.tsx`.

## How to fix it

Add `metadataBase` to the `metadata` export in `app/layout.tsx`. The value should be the production URL of your site.

```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: 'My Site',
  description: 'Site description.',
  openGraph: {
    images: [{ url: '/og.png' }],
    // With metadataBase, /og.png resolves to https://example.com/og.png
  },
}
```

In most projects, the production URL is available as an environment variable. Use a fallback for local development.

```tsx
// app/layout.tsx
import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL('http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: BASE_URL,
  title: 'My Site',
  openGraph: {
    images: [{ url: '/og.png' }],
  },
}
```

Set `NEXT_PUBLIC_SITE_URL=https://example.com` in your production environment variables (Vercel, Netlify, etc.).

:::caution
Without `metadataBase`, `og:image` in your rendered HTML will be a relative URL. Facebook, Slack, LinkedIn, and most social platforms will silently skip the image when they encounter a relative URL.
:::

## Verify the fix

```bash
curl -s https://example.com | grep -i 'og:image'
```

Confirm the `content` attribute starts with `https://`. Re-run the audit:

```bash
npx orino-cli audit
```

## Related fixes

- [Root layout missing metadata export](/fixes/metadata/nextjs-root-metadata-missing)
- [og:image relative URL](/fixes/metadata/og-image-relative-url)
- [og:image missing](/fixes/metadata/og-image-missing)
