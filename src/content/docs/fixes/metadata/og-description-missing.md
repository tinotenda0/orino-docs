---
title: og:description missing
description: No og:description meta tag was found. Social share previews will have no description.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

When your page is shared on social platforms, `og:description` provides the text that appears below the title in the preview card. Without it, most platforms show blank space or generate something from the page body with unpredictable results. A good description increases engagement on shared links.

## How to fix it

Add `<meta property="og:description" content="..." />` to your page `<head>`. The value is usually the same as your `<meta name="description">`, but you can write a more social-oriented version if it fits the context. Slightly shorter and more direct tends to work well.

### Next.js App Router

```tsx
// app/layout.tsx
export const metadata = {
  title: 'My Site',
  description: 'Site description used by search engines.',
  openGraph: {
    title: 'My Site',
    description: 'Social-friendly description for share previews.',
    url: 'https://example.com',
    images: [{ url: 'https://example.com/og.png' }],
  },
}
```

### Next.js Pages Router

```tsx
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <meta name="description" content="Site description used by search engines." />
        <meta property="og:description" content="Social-friendly description for share previews." />
      </Head>
      <main>Content</main>
    </>
  )
}
```

### SvelteKit

```svelte
<svelte:head>
  <meta name="description" content="Site description used by search engines." />
  <meta property="og:description" content="Social-friendly description for share previews." />
</svelte:head>
```

### Nuxt

```vue
<script setup>
useSeoMeta({
  description: 'Site description used by search engines.',
  ogDescription: 'Social-friendly description for share previews.',
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
}
const { title, description } = Astro.props
---
<!doctype html>
<html lang="en-GB">
  <head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
  </head>
  <body><slot /></body>
</html>
```

### Plain HTML

```html
<meta name="description" content="Site description used by search engines." />
<meta property="og:description" content="Social-friendly description for share previews." />
```

## Verify the fix

```bash
curl -s https://example.com | grep -i 'og:description'
```

Re-run the audit to confirm the check passes:

```bash
npx @bynaree/orino audit --url https://example.com
```

## Related fixes

- [Meta description missing](/fixes/metadata/description-missing)
- [og:title missing](/fixes/metadata/og-title-missing)
- [og:image missing](/fixes/metadata/og-image-missing)
