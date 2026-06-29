---
title: generateMetadata missing on dynamic route
description: Add per-page title and description to dynamic Next.js App Router routes.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Dynamic routes without `generateMetadata()` serve the same generic title and description on every page. A blog with 200 posts all titled "My Site" tells search engines there is one page, not 200.

## How to fix it

Add `generateMetadata()` to the dynamic route file. It receives the same `params` as the page component.

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  return <article><h1>{post.title}</h1></article>
}
```

:::tip
You can share the data fetch between `generateMetadata` and the page component using `React.cache`. This avoids a double fetch without any extra state.
:::

## Verify the fix

View source on two different pages at the same dynamic route. Confirm that `<title>` and `<meta name="description">` differ between them. Then re-run `orino audit`.

## Related fixes

- [generateStaticParams missing on dynamic route](/fixes/crawlability/nextjs-missing-generate-static-params)
- [CSR-only page component](/fixes/crawlability/nextjs-csr-page)
- [robots.ts or robots.txt missing](/fixes/crawlability/nextjs-robots-missing)
