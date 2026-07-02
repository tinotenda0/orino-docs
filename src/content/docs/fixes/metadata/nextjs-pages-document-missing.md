---
title: _document.tsx missing
description: No pages/_document.tsx found. The html and body elements cannot be customised.
sidebar:
  badge:
    text: Info
    variant: note
---

## What this means

In the Next.js Pages Router, `pages/_document.tsx` lets you customise the `<Html>`, `<Head>`, `<Main>`, and `<NextScript>` elements that Next.js renders for every page. The most common reason to create one is to set the `lang` attribute on the `<html>` element, which cannot be done from `_app.tsx` or individual page files.

Without a `_document.tsx`, your pages have no `lang` attribute, which affects accessibility and language detection.

## How to fix it

Create `pages/_document.tsx` with the `lang` attribute set on `<Html>`.

```tsx
// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en-GB">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

:::note
The `<Head>` component inside `_document.tsx` is different from the `next/head` `<Head>`. The `_document` version is for tags that must appear once across all pages and cannot change between navigations: things like font preconnects or custom meta charset. Use `next/head` in `_app.tsx` and individual pages for everything else.
:::

You can also add global scripts or font preloads here:

```tsx
// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en-GB">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

## Verify the fix

```bash
curl -s https://example.com | grep -i '<html'
```

You should see `lang="en-GB"` on the `<html>` element. Re-run the audit:

```bash
npx orino-cli audit
```

## Related fixes

- [lang attribute missing](/fixes/metadata/html-lang-missing)
- [_app.tsx missing Head component](/fixes/metadata/nextjs-pages-app-missing-head)
- [Page missing Head component](/fixes/metadata/nextjs-pages-missing-head-on-page)
