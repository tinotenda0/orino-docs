---
title: Viewport meta tag missing
description: No viewport meta tag was found. Mobile browsers will render this site at desktop width.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

Without a viewport meta tag, mobile browsers default to rendering the page at 980px wide and scaling it down to fit the screen. The result is tiny, unreadable text and broken layouts. Google uses mobile-first indexing, meaning the mobile version of your site is what gets crawled and ranked. A missing viewport tag is one of the clearest signals that a page is not mobile-ready.

## How to fix it

Add the standard viewport meta tag to the `<head>` of every page.

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

`width=device-width` tells the browser to match the screen width. `initial-scale=1` sets a 1:1 ratio between CSS pixels and device pixels. These two values together are the correct baseline for any responsive site.

:::danger
Do not add `maximum-scale=1` or `user-scalable=no`. These prevent users from zooming, which is an accessibility violation and can get your site penalised in accessibility audits.
:::

### Next.js App Router

The App Router adds the viewport tag automatically when you export a `viewport` object from `app/layout.tsx`. Next.js 14+ recommends using the `viewport` export over putting it in `metadata`.

```tsx
// app/layout.tsx
import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  )
}
```

### Next.js Pages Router

Add it to `_app.tsx` so it appears on every page, or to `_document.tsx` in the `<Head>`.

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

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
```

### SvelteKit

Add it to `src/app.html`.

```html
<!-- src/app.html -->
<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    %sveltekit.body%
  </body>
</html>
```

### Nuxt

Add it to `nuxt.config.ts`. Nuxt includes the viewport tag by default, but if it was removed, add it back here.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'en-GB' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
})
```

### Astro

Add it to your layout's `<head>`.

```astro
---
// src/layouts/Layout.astro
---
<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <slot name="head" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### Plain HTML

```html
<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
</html>
```

## Verify the fix

```bash
curl -s https://example.com | grep -i viewport
```

You should see `content="width=device-width, initial-scale=1"` in the output. Re-run the audit:

```bash
npx orino-cli audit --url https://example.com
```

## Related fixes

- [lang attribute missing](/fixes/metadata/html-lang-missing)
- [Title missing](/fixes/metadata/title-missing)
