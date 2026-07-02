---
title: og:title missing
description: No og:title meta tag was found. Social share previews will have no title.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

When a URL is shared on LinkedIn, Slack, Discord, or iMessage, the platform fetches the page and reads its Open Graph tags to build a preview card. Without `og:title`, most platforms fall back to the page `<title>`, which may display incorrectly or not at all. Some platforms show nothing at all.

## How to fix it

Add `<meta property="og:title" content="..." />` to the `<head>` of your page. The value is usually the same as your `<title>` tag, but you have slightly more flexibility. OG titles are not truncated as aggressively as search titles.

### Next.js App Router

Add an `openGraph.title` to your `metadata` export.

```tsx
// app/layout.tsx
export const metadata = {
  title: 'My Site',
  description: 'Site description.',
  openGraph: {
    title: 'My Site',
    description: 'Site description.',
    url: 'https://example.com',
    images: [{ url: 'https://example.com/og.png' }],
  },
}
```

Next.js renders this as `<meta property="og:title" content="My Site" />` automatically.

### Next.js Pages Router

```tsx
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>My Site</title>
        <meta property="og:title" content="My Site" />
        <meta property="og:description" content="Site description." />
        <meta property="og:image" content="https://example.com/og.png" />
        <meta property="og:url" content="https://example.com" />
      </Head>
      <main>Content</main>
    </>
  )
}
```

### SvelteKit

```svelte
<svelte:head>
  <title>My Site</title>
  <meta property="og:title" content="My Site" />
  <meta property="og:description" content="Site description." />
  <meta property="og:image" content="https://example.com/og.png" />
  <meta property="og:url" content="https://example.com" />
</svelte:head>
```

### Nuxt

```vue
<script setup>
useSeoMeta({
  title: 'My Site',
  description: 'Site description.',
  ogTitle: 'My Site',
  ogDescription: 'Site description.',
  ogImage: 'https://example.com/og.png',
  ogUrl: 'https://example.com',
})
</script>
```

### Astro

```astro
---
// src/layouts/Layout.astro
interface Props {
  title: string
  description: string
  ogImage?: string
}
const { title, description, ogImage = 'https://example.com/og.png' } = Astro.props
---
<!doctype html>
<html lang="en-GB">
  <head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
  </head>
  <body><slot /></body>
</html>
```

### Plain HTML

```html
<head>
  <title>My Site</title>
  <meta property="og:title" content="My Site" />
  <meta property="og:description" content="Site description." />
  <meta property="og:image" content="https://example.com/og.png" />
  <meta property="og:url" content="https://example.com" />
</head>
```

## Verify the fix

```bash
curl -s https://example.com | grep -i 'og:title'
```

You can also test the full Open Graph preview using the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

Re-run the audit:

```bash
npx orino-cli audit --url https://example.com
```

## Related fixes

- [og:description missing](/fixes/metadata/og-description-missing)
- [og:image missing](/fixes/metadata/og-image-missing)
- [og:image relative URL](/fixes/metadata/og-image-relative-url)
- [og:url and canonical mismatch](/fixes/metadata/og-url-canonical-mismatch)
