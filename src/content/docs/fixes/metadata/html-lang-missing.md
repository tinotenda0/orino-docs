---
title: lang attribute missing
description: The <html> element has no lang attribute. It is required for accessibility and language detection.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

The `lang` attribute on the `<html>` element tells browsers, screen readers, and search engines what language the page is written in. Without it, screen readers cannot select the correct voice profile, and search engines may misidentify the language and serve the page to the wrong audience.

The check also flags an empty `lang=""` attribute. Setting the attribute but leaving it blank is no better than omitting it.

## How to fix it

Set `lang` to a valid BCP 47 language tag. For UK English, that is `en-GB`. For US English, `en-US`. For a general English page, `en` is acceptable.

### Next.js App Router

Next.js App Router sets the `lang` attribute via the `<html>` element in `app/layout.tsx`.

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  )
}
```

### Next.js Pages Router

Create `pages/_document.tsx` to customise the `<html>` element.

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

If you do not have a `_document.tsx`, the `lang` attribute is not set on the page HTML. See [_document.tsx missing](/fixes/metadata/nextjs-pages-document-missing).

### SvelteKit

SvelteKit does not have a server-rendered `<html>` tag in a Svelte component. Set the lang attribute in `src/app.html`, the HTML shell file.

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

Set the `lang` attribute using `useHead()` or the Nuxt config. The config approach applies it to every page automatically.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en-GB',
      },
    },
  },
})
```

Or in `app.vue` using `useHead()`:

```vue
<!-- app.vue -->
<script setup>
useHead({
  htmlAttrs: { lang: 'en-GB' },
})
</script>
```

### Astro

Set `lang` directly on the `<html>` element in your layout file.

```astro
---
// src/layouts/Layout.astro
---
<!doctype html>
<html lang="en-GB">
  <head>
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
  <head>...</head>
  <body>...</body>
</html>
```

:::note
If your site serves multiple languages, each language-specific page should have the correct `lang` value for that language, not just the default. Use `hreflang` links for multilingual SEO.
:::

## Verify the fix

```bash
curl -s https://example.com | grep -i '<html'
```

Confirm the `lang` attribute appears with a valid value, such as `lang="en-GB"`. Re-run the audit:

```bash
npx orino-cli audit --url https://example.com
```

## Related fixes

- [Viewport meta tag missing](/fixes/metadata/viewport-missing)
- [_document.tsx missing](/fixes/metadata/nextjs-pages-document-missing)
