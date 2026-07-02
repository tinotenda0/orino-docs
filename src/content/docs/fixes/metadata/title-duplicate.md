---
title: Duplicate page titles
description: Two or more pages share the same title, making it harder for Google to distinguish between them.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Google uses the title tag to understand what a page is about. When multiple pages share the same title, Google cannot tell them apart from the title alone. It may arbitrarily pick one to rank and demote the others, or rewrite the displayed title using content from the page body instead.

Each page should have a unique, descriptive title that reflects its specific content.

:::note
For plain HTML projects, Orino compares titles across every HTML file in the project. For live-URL audits, only the homepage is currently fetched, so this check reports as skipped rather than guessing — cross-page uniqueness cannot be verified from a single page.
:::

## How to fix it

Give every page a distinct title. The easiest pattern is `Page Name | Brand Name`. The page name changes per page, the brand name stays the same.

:::caution
Avoid using the same template-generated title across multiple pages. If your CMS or framework generates titles from a single template without per-page overrides, every page will likely get the same title.
:::

### Next.js App Router

Set a unique `title` in each page's `metadata` export. The root layout's title template appends the brand automatically.

```tsx
// app/layout.tsx
export const metadata = {
  title: {
    default: 'My Site',
    template: '%s | My Site',
  },
}

// app/about/page.tsx
export const metadata = { title: 'About' }
// → "About | My Site"

// app/services/page.tsx
export const metadata = { title: 'Services' }
// → "Services | My Site"
```

### Next.js Pages Router

Set a `<title>` in `<Head>` for every page file. Do not rely on a global default title from `_app.tsx` for all pages.

```tsx
// pages/about.tsx
import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>About | My Site</title>
      </Head>
      <main>Content</main>
    </>
  )
}
```

### SvelteKit

```svelte
<!-- src/routes/about/+page.svelte -->
<svelte:head>
  <title>About | My Site</title>
</svelte:head>
```

### Nuxt

```vue
<!-- pages/about.vue -->
<script setup>
useHead({ title: 'About | My Site' })
</script>
```

### Astro

Pass a distinct `title` prop to your layout on each page.

```astro
---
// src/pages/about.astro
import Layout from '../layouts/Layout.astro'
---
<Layout title="About | My Site">
  <main>Content</main>
</Layout>
```

### Plain HTML

```html
<!-- about.html -->
<title>About | My Site</title>

<!-- services.html -->
<title>Services | My Site</title>
```

## Verify the fix

Check the titles across your pages manually:

```bash
curl -s https://example.com | grep -i '<title'
curl -s https://example.com/about | grep -i '<title'
```

Both should return different title values. Re-run the audit to confirm:

```bash
npx orino-cli audit --url https://example.com
```

## Related fixes

- [Title missing](/fixes/metadata/title-missing)
- [Title is generic](/fixes/metadata/title-generic)
- [Title too long](/fixes/metadata/title-too-long)
