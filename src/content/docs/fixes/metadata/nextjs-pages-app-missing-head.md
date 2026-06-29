---
title: _app.tsx missing Head component
description: pages/_app.tsx has no Head component. Site-wide default metadata is not being set.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

In the Next.js Pages Router, `pages/_app.tsx` wraps every page. It is the right place to set site-wide default metadata: the viewport tag, a default description, and default Open Graph tags that apply to all pages unless a specific page overrides them.

The check found that `_app.tsx` exists but does not import or use the `<Head>` component from `next/head`.

## How to fix it

Import `Head` from `next/head` and add default metadata tags inside it. Pages that need different values can still override them with their own `<Head>`. Next.js merges and deduplicates `<Head>` content, with page-level tags taking precedence.

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Default site description. Override this per page." />
        <meta property="og:image" content="https://example.com/og.png" />
        <meta property="og:type" content="website" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
```

Individual pages still need their own `<Head>` for page-specific metadata like `<title>` and per-page descriptions. See [Page missing Head component](/fixes/metadata/nextjs-pages-missing-head-on-page).

:::tip
The `_app.tsx` `<Head>` is a good place for the viewport tag and OG image, since those rarely change between pages. Put `<title>` and `<meta name="description">` on each page individually so every page has a unique title and description.
:::

## Verify the fix

```bash
curl -s https://example.com | grep -iE 'viewport|og:image'
```

Both tags should appear in the output. Re-run the audit:

```bash
npx orino audit .
```

## Related fixes

- [Page missing Head component](/fixes/metadata/nextjs-pages-missing-head-on-page)
- [_document.tsx missing](/fixes/metadata/nextjs-pages-document-missing)
- [Viewport meta tag missing](/fixes/metadata/viewport-missing)
