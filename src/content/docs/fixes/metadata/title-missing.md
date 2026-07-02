---
title: Title tag missing
description: No <title> tag was found on the page. It is the single most important on-page SEO element.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

Every HTML page must have a `<title>` tag. Google uses it as the default text in search result links, and browsers use it in tabs and history. A missing title is not a minor omission. It is the clearest possible signal to search engines that a page was not prepared for indexing.

## How to fix it

### Next.js App Router

Export a `metadata` object from `app/layout.tsx` or the individual page file.

```tsx
// app/layout.tsx
export const metadata = {
  title: 'My Site',
}
```

For per-page titles, export `metadata` from the page itself.

```tsx
// app/about/page.tsx
export const metadata = {
  title: 'About | My Site',
}
```

See [nextjs-root-metadata-missing](/fixes/metadata/nextjs-root-metadata-missing) if the root layout has no metadata export at all.

### Next.js Pages Router

Import `Head` from `next/head` and add a `<title>` in every page component.

```tsx
// pages/about.tsx
import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>About | My Site</title>
      </Head>
      <main>Your content</main>
    </>
  )
}
```

### SvelteKit

Add `<svelte:head>` with a `<title>` to each page component.

```svelte
<!-- src/routes/about/+page.svelte -->
<svelte:head>
  <title>About | My Site</title>
</svelte:head>

<main>Your content</main>
```

### Nuxt

Call `useHead()` with a `title` property in each page component.

```vue
<!-- pages/about.vue -->
<script setup>
useHead({ title: 'About | My Site' })
</script>

<template>
  <main>Your content</main>
</template>
```

### Astro

Add a `<title>` inside the layout's `<head>`, passed as a prop from each page.

```astro
---
// src/layouts/Layout.astro
interface Props { title: string }
const { title } = Astro.props
---
<!doctype html>
<html lang="en-GB">
  <head>
    <title>{title}</title>
  </head>
  <body><slot /></body>
</html>
```

```astro
---
// src/pages/about.astro
import Layout from '../layouts/Layout.astro'
---
<Layout title="About | My Site">
  <main>Your content</main>
</Layout>
```

### Plain HTML

```html
<!doctype html>
<html lang="en-GB">
  <head>
    <title>About | My Site</title>
  </head>
  <body>Your content</body>
</html>
```

## Verify the fix

```bash
curl -s https://example.com | grep -i '<title'
```

You should see your `<title>` tag in the output. Alternatively, re-run the audit:

```bash
npx @bynaree/orino audit --url https://example.com
```

The `title-missing` check should now pass.

## Related fixes

- [Title too long](/fixes/metadata/title-too-long)
- [Title is generic](/fixes/metadata/title-generic)
- [Duplicate titles](/fixes/metadata/title-duplicate)
- [Meta description missing](/fixes/metadata/description-missing)
