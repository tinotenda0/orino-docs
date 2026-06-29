---
title: generateStaticParams missing on dynamic route
description: Tell Next.js which paths to pre-render at build time for App Router dynamic routes.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Without `generateStaticParams()`, Next.js does not know which paths exist at build time. Pages are rendered on demand without static optimisations, or simply not built at all if the route cannot fall back to server rendering.

## How to fix it

Export `generateStaticParams()` from the route file. It returns an array of param objects matching the route's dynamic segments.

```tsx
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  return <article><h1>{post.title}</h1></article>
}
```

If the route content is fully dynamic — for example, a user-specific dashboard — pre-rendering is not possible. Export `force-dynamic` instead.

```tsx
export const dynamic = 'force-dynamic'
```

:::note
`force-dynamic` opts out of all caching and static generation. Use it only when the content genuinely cannot be pre-rendered, such as authenticated routes that vary per user.
:::

## Verify the fix

Run `next build` and check the output. Routes with `generateStaticParams()` appear as `○ (Static)` or `● (SSG)`. Re-run `orino audit` to clear the flag.

## Related fixes

- [generateMetadata missing on dynamic route](/fixes/crawlability/nextjs-missing-generate-metadata)
- [CSR-only page component](/fixes/crawlability/nextjs-csr-page)
- [sitemap.ts or sitemap.xml missing](/fixes/crawlability/nextjs-sitemap-missing)
