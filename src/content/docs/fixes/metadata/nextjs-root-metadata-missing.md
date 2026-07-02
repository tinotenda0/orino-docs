---
title: Root layout missing metadata export
description: app/layout.tsx has no metadata export. Every page falls back to Next.js defaults.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

In the Next.js App Router, site-wide metadata defaults are set by exporting a `metadata` object from `app/layout.tsx`. Without it, every page that does not have its own `metadata` export inherits Next.js's built-in defaults. Those defaults include the title "Create Next App", a sure sign that your site shipped without proper SEO configuration.

## How to fix it

Export a `metadata` object from `app/layout.tsx`. At minimum, set `title`, `description`, and `metadataBase`.

```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'Acme - Architecture and Interior Design',
    template: '%s | Acme',
  },
  description: 'Architecture and interior design for residential and commercial clients across London and the South East.',
  openGraph: {
    title: 'Acme - Architecture and Interior Design',
    description: 'Architecture and interior design for residential and commercial clients across London and the South East.',
    url: 'https://example.com',
    siteName: 'Acme',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acme - Architecture and Interior Design',
    description: 'Architecture and interior design for residential and commercial clients across London and the South East.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  )
}
```

Individual pages override specific fields by exporting their own `metadata` object. Fields not set at the page level are inherited from the root layout.

```tsx
// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  // Renders as "About | Acme" due to the template in root layout
  description: 'Learn about our studio and approach.',
}
```

:::note
The `title.template` in the root layout affects child pages only. The root layout itself uses `title.default`. This is intentional: your homepage gets the full brand name, inner pages get the short name appended.
:::

## Verify the fix

```bash
curl -s https://example.com | grep -i '<title'
```

You should see your title, not "Create Next App". Re-run the audit:

```bash
npx orino-cli audit
```

## Related fixes

- [metadataBase not configured](/fixes/metadata/nextjs-metadata-base-missing)
- [Title template not configured](/fixes/metadata/nextjs-title-template-missing)
- [Title missing](/fixes/metadata/title-missing)
