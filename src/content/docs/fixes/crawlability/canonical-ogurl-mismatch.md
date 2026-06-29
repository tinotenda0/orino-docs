---
title: Canonical and og:url mismatch
description: Resolves a conflict between rel="canonical" and og:url pointing to different URLs on the same page.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

When `rel="canonical"` and `og:url` point to different URLs, you are sending contradictory signals. The canonical tells search engines which URL to rank. The `og:url` tells social platforms and AI crawlers what the official URL is. If they disagree, you get fragmented link equity and inconsistent previews when the page is shared.

The fix is to set both to the same absolute URL.

## How to fix it

Derive both values from a single URL variable so they can never drift apart.

### Next.js App Router

The `metadata` export accepts both fields. Set `alternates.canonical` and `openGraph.url` to the same value:

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const url = `https://yourdomain.com/blog/${params.slug}`
  return {
    alternates: { canonical: url },
    openGraph: { url },
  }
}
```

### Next.js Pages Router

Set both tags explicitly inside `next/head`:

```tsx
import Head from 'next/head'

export default function BlogPost({ slug }: { slug: string }) {
  const url = `https://yourdomain.com/blog/${slug}`
  return (
    <>
      <Head>
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
      </Head>
    </>
  )
}
```

### SvelteKit

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data
  const url = `https://yourdomain.com/blog/${data.slug}`
</script>

<svelte:head>
  <link rel="canonical" href={url} />
  <meta property="og:url" content={url} />
</svelte:head>
```

### Nuxt

```ts
// pages/blog/[slug].vue
const route = useRoute()
const url = `https://yourdomain.com/blog/${route.params.slug}`

useHead({
  link: [{ rel: 'canonical', href: url }],
  meta: [{ property: 'og:url', content: url }],
})
```

### Astro

Pass a single `canonical` prop and use it for both tags in your layout:

```astro
---
// src/layouts/Layout.astro
const { canonical } = Astro.props
---
<head>
  <link rel="canonical" href={canonical} />
  <meta property="og:url" content={canonical} />
</head>
```

:::caution
The most common cause of this mismatch is setting the canonical in one place and `og:url` in another. Centralise both in a single layout component and pass the URL in as a prop.
:::

## Verify the fix

Check both tags are present and identical:

```bash
curl -s https://yourdomain.com/ | grep -E 'canonical|og:url'
```

Both values must be the same absolute URL. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [Canonical tag missing](/fixes/crawlability/canonical-missing)
- [Canonical uses relative URL](/fixes/crawlability/canonical-relative-url)
