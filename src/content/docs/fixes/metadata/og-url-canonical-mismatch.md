---
title: og:url and canonical mismatch
description: The og:url and canonical link values differ. Both should point to the same canonical URL.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

The `og:url` meta tag and the `<link rel="canonical">` tag both declare the preferred URL for this page. When they disagree, you create conflicting signals: social platforms use `og:url` to attribute shares, while search engines use `canonical` to consolidate link equity. The two should always be identical.

A common cause is setting `og:url` to the bare domain (`https://example.com`) while the canonical correctly includes a trailing slash or path (`https://example.com/`).

## How to fix it

Set both `og:url` and `canonical` to the exact same URL. Choose one canonical form, either with or without a trailing slash, and use it everywhere.

```html
<!-- Both must match exactly -->
<link rel="canonical" href="https://example.com/" />
<meta property="og:url" content="https://example.com/" />
```

### Next.js App Router

Use the `metadataBase` and `alternates.canonical` approach. Next.js derives `og:url` from the `openGraph.url` field.

```tsx
// app/layout.tsx
export const metadata = {
  metadataBase: new URL('https://example.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: 'https://example.com/',
  },
}
```

For pages with specific paths:

```tsx
// app/about/page.tsx
export const metadata = {
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    url: 'https://example.com/about',
  },
}
```

### Next.js Pages Router

Set both tags in `<Head>` and ensure they use the same value.

```tsx
import Head from 'next/head'

const CANONICAL = 'https://example.com/about'

export default function About() {
  return (
    <>
      <Head>
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:url" content={CANONICAL} />
      </Head>
      <main>Content</main>
    </>
  )
}
```

### SvelteKit

```svelte
<script>
  const canonical = 'https://example.com/about'
</script>

<svelte:head>
  <link rel="canonical" href={canonical} />
  <meta property="og:url" content={canonical} />
</svelte:head>
```

### Nuxt

```vue
<script setup>
const canonical = 'https://example.com/about'

useHead({
  link: [{ rel: 'canonical', href: canonical }],
})

useSeoMeta({
  ogUrl: canonical,
})
</script>
```

### Astro

```astro
---
// src/layouts/Layout.astro
interface Props {
  title: string
  canonical: string
}
const { title, canonical } = Astro.props
---
<!doctype html>
<html lang="en-GB">
  <head>
    <title>{title}</title>
    <link rel="canonical" href={canonical} />
    <meta property="og:url" content={canonical} />
  </head>
  <body><slot /></body>
</html>
```

### Plain HTML

```html
<head>
  <link rel="canonical" href="https://example.com/about" />
  <meta property="og:url" content="https://example.com/about" />
</head>
```

## Verify the fix

```bash
curl -s https://example.com | grep -iE 'canonical|og:url'
```

Both values should be identical. Re-run the audit:

```bash
npx orino audit https://example.com
```

## Related fixes

- [og:title missing](/fixes/metadata/og-title-missing)
- [og:description missing](/fixes/metadata/og-description-missing)
- [metadataBase not configured](/fixes/metadata/nextjs-metadata-base-missing)
