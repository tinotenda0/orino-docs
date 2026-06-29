---
title: Canonical tag missing
description: Resolves missing rel="canonical" on public pages, which leaves Google free to pick which URL to index.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Without a canonical tag, Google decides which version of your URL to index on its own. It might pick the www variant, a query-string copy, or a path with a trailing slash. The canonical tag is how you declare which URL is authoritative. Missing it means you are relying on Google's guess.

## How to fix it

Add an absolute `rel="canonical"` link to every public page pointing to its preferred URL.

### Next.js App Router

Use the static `metadata` export for fixed pages, or `generateMetadata` for dynamic ones:

```tsx
// app/page.tsx
export const metadata = {
  alternates: {
    canonical: 'https://yourdomain.com',
  },
}
```

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    alternates: {
      canonical: `https://yourdomain.com/blog/${params.slug}`,
    },
  }
}
```

### Next.js Pages Router

Use `next/head` inside each page component:

```tsx
import Head from 'next/head'

export default function AboutPage() {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://yourdomain.com/about" />
      </Head>
    </>
  )
}
```

### SvelteKit

Use `<svelte:head>` in each page or layout:

```svelte
<!-- src/routes/about/+page.svelte -->
<svelte:head>
  <link rel="canonical" href="https://yourdomain.com/about" />
</svelte:head>
```

For dynamic pages, use `$page.url.href`:

```svelte
<script>
  import { page } from '$app/stores'
</script>

<svelte:head>
  <link rel="canonical" href={$page.url.href} />
</svelte:head>
```

### Nuxt

Call `useHead` in your page or layout component:

```ts
// pages/about.vue
useHead({
  link: [
    { rel: 'canonical', href: 'https://yourdomain.com/about' },
  ],
})
```

For dynamic pages, use `useRequestURL`:

```ts
// pages/blog/[slug].vue
const url = useRequestURL()
useHead({
  link: [
    { rel: 'canonical', href: url.href },
  ],
})
```

### Astro

Pass the canonical URL through your base layout:

```astro
---
// src/layouts/Layout.astro
const { canonical } = Astro.props
---
<head>
  <link rel="canonical" href={canonical} />
</head>
```

```astro
---
// src/pages/about.astro
import Layout from '../layouts/Layout.astro'
---
<Layout canonical="https://yourdomain.com/about">
  <!-- page content -->
</Layout>
```

:::tip
For dynamic pages, construct the canonical from route parameters rather than hardcoding it. In Astro, `Astro.url.href` gives you the current absolute URL.
:::

## Verify the fix

Check that the canonical appears in the rendered HTML:

```bash
curl -s https://yourdomain.com/ | grep canonical
```

Expected output:

```html
<link rel="canonical" href="https://yourdomain.com/" />
```

Re-run `orino audit` to confirm the check passes.

## Related fixes

- [Canonical uses relative URL](/fixes/crawlability/canonical-relative-url)
- [Canonical and og:url mismatch](/fixes/crawlability/canonical-ogurl-mismatch)
- [noindex on public page](/fixes/crawlability/noindex-on-public-page)
- [sitemap.xml missing](/fixes/crawlability/sitemap-present)
