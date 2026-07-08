---
title: Duplicate meta descriptions
description: Two or more pages share the same meta description, weakening each page's search snippet.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Two or more of your pages have the same meta description. The description is the snippet Google shows under the title in search results. When several pages share one description, none of them describes its own content accurately, so Google is more likely to ignore the tag and generate its own snippet from the page body — usually a worse result than a description written for that page.

Duplicate descriptions almost always come from a single template applied site-wide without per-page overrides.

:::note
This check compares descriptions across pages. For plain HTML projects, Orino compares every HTML file in the project. For live-URL audits, run with [`--pages`](/docs/cli-reference#multi-page-auditing) to fetch a sample of pages and compare them. Without `--pages`, only the homepage is fetched, so the check reports as skipped rather than guessing — cross-page uniqueness cannot be verified from one page.
:::

## How to fix it

Write a distinct meta description for every page that summarises that specific page. Keep each between 120 and 155 characters.

:::caution
If your CMS or framework generates descriptions from a single template with no per-page value, every page inherits the same text. Set a real description on each page, or derive it from page-specific content (an excerpt, summary field, or the first paragraph).
:::

### Next.js App Router

Set a unique `description` in each page's `metadata` export rather than relying on a single value in the root layout.

```tsx
// app/about/page.tsx
export const metadata = {
  title: 'About',
  description: 'Meet the team behind Acme and the accessibility-first process we use on every build.',
}

// app/services/page.tsx
export const metadata = {
  title: 'Services',
  description: 'Web app development, accessibility audits, and performance work for UK financial services teams.',
}
```

For dynamic routes, generate the description from the page's own data:

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  return { description: post.excerpt }
}
```

### Next.js Pages Router

Set a `<meta name="description">` in `<Head>` on every page, with a value specific to that page.

```tsx
// pages/about.tsx
import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <meta name="description" content="Meet the team behind Acme and how we work." />
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
  <meta name="description" content="Meet the team behind Acme and how we work." />
</svelte:head>
```

Derive it from `load` data for dynamic routes so each page gets its own value.

### Nuxt

```vue
<!-- pages/about.vue -->
<script setup>
useSeoMeta({
  description: 'Meet the team behind Acme and how we work.',
})
</script>
```

### Astro

Pass a distinct `description` prop to your layout on each page.

```astro
---
// src/pages/about.astro
import Layout from '../layouts/Layout.astro'
---
<Layout description="Meet the team behind Acme and how we work.">
  <main>Content</main>
</Layout>
```

### Plain HTML

```html
<!-- about.html -->
<meta name="description" content="Meet the team behind Acme and how we work." />

<!-- services.html -->
<meta name="description" content="Web app development and accessibility audits for UK teams." />
```

## Verify the fix

Compare the descriptions across your pages:

```bash
curl -s https://example.com | grep -i 'name="description"'
curl -s https://example.com/about | grep -i 'name="description"'
```

Each should return a different value. Re-run the audit with multiple pages to confirm:

```bash
npx orino-cli audit --url https://example.com --pages 10
```

## Related fixes

- [Meta description missing](/fixes/metadata/description-missing)
- [Meta description too long](/fixes/metadata/description-too-long)
- [Duplicate page titles](/fixes/metadata/title-duplicate)
