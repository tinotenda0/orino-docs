---
title: getStaticPaths missing on dynamic route (Pages Router)
description: Add getStaticPaths to dynamic Pages Router routes so Next.js can pre-render them at build time.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

A dynamic route (`pages/blog/[slug].tsx`) with no `getStaticPaths()` and no `getServerSideProps()` means Next.js has no list of paths to build. Pages may 404 in production, or render on demand with no static optimisation.

## How to fix it

Add `getStaticPaths()` alongside `getStaticProps()` to pre-render all paths at build time.

```tsx
// pages/blog/[slug].tsx
import type { GetStaticPaths, GetStaticProps } from 'next'

type Post = { slug: string; title: string; body: string }

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts()
  return {
    paths: posts.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{ post: Post }> = async ({ params }) => {
  const post = await getPost(params!.slug as string)
  if (!post) return { notFound: true }
  return { props: { post } }
}

export default function BlogPost({ post }: { post: Post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.body}</div>
    </article>
  )
}
```

If paths cannot be known at build time, use `getServerSideProps()` instead. It renders on each request rather than at build time.

:::caution
`fallback: false` returns a 404 for any path not returned by `getStaticPaths`. If your content changes frequently, use `fallback: 'blocking'` or `fallback: true` with a loading state.
:::

## Verify the fix

Run `next build`. Dynamic routes with `getStaticPaths()` appear in the output as pre-rendered pages. Confirm none show a 404. Then re-run `orino audit`.

## Related fixes

- [robots.txt missing in /public](/fixes/crawlability/nextjs-pages-robots-missing)
- [sitemap.xml missing in /public](/fixes/crawlability/nextjs-pages-sitemap-missing)
