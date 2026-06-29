---
title: Meta description missing
description: No meta description was found. Google will generate a snippet automatically, usually from navigation or irrelevant page content.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

When a page has no meta description, Google picks a snippet from the page body. This auto-generated text is often a navigation element, a cookie notice, or a sentence fragment that has nothing to do with what the page is about. You lose control of the text that appears under your title in search results, which directly affects whether people click through.

The meta description is not a direct ranking factor, but it is a conversion factor. A well-written description increases click-through rate.

## How to fix it

### Next.js App Router

Add a `description` to the `metadata` export in your root layout or page file.

```tsx
// app/layout.tsx
export const metadata = {
  title: 'My Site',
  description: 'One or two sentences describing what this site is about and who it is for.',
}
```

For per-page descriptions:

```tsx
// app/about/page.tsx
export const metadata = {
  title: 'About',
  description: 'We build accessible web applications for financial services clients in the UK.',
}
```

### Next.js Pages Router

Add a `<meta name="description">` inside `<Head>` on each page.

```tsx
// pages/about.tsx
import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>About | My Site</title>
        <meta name="description" content="We build accessible web applications for financial services clients in the UK." />
      </Head>
      <main>Content</main>
    </>
  )
}
```

You can also set a site-wide default in `_app.tsx`, but per-page overrides are better for SEO.

### SvelteKit

```svelte
<!-- src/routes/about/+page.svelte -->
<svelte:head>
  <title>About | My Site</title>
  <meta name="description" content="We build accessible web applications for financial services clients in the UK." />
</svelte:head>

<main>Content</main>
```

### Nuxt

```vue
<!-- pages/about.vue -->
<script setup>
useHead({
  title: 'About | My Site',
  meta: [
    { name: 'description', content: 'We build accessible web applications for financial services clients in the UK.' },
  ],
})
</script>
```

Or with `useSeoMeta` for a cleaner API:

```vue
<script setup>
useSeoMeta({
  title: 'About | My Site',
  description: 'We build accessible web applications for financial services clients in the UK.',
})
</script>
```

### Astro

Add a `description` prop to your layout and render it as a `<meta>` tag.

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
  </head>
  <body><slot /></body>
</html>
```

```astro
---
// src/pages/about.astro
import Layout from '../layouts/Layout.astro'
---
<Layout
  title="About | My Site"
  description="We build accessible web applications for financial services clients in the UK."
>
  <main>Content</main>
</Layout>
```

### Plain HTML

```html
<head>
  <title>About | My Site</title>
  <meta name="description" content="We build accessible web applications for financial services clients in the UK." />
</head>
```

:::tip
Keep descriptions between 120 and 155 characters. Go below 120 and Google may supplement with body text. Go over 155 and it truncates. Write for the human reader. A description that sounds useful will outperform a keyword-stuffed one.
:::

## Verify the fix

```bash
curl -s https://example.com | grep -i 'meta name.*description'
```

Re-run the audit to confirm:

```bash
npx orino audit https://example.com
```

## Related fixes

- [Meta description too long](/fixes/metadata/description-too-long)
- [og:description missing](/fixes/metadata/og-description-missing)
- [Title missing](/fixes/metadata/title-missing)
