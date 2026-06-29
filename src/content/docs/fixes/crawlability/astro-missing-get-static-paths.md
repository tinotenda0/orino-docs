---
title: getStaticPaths missing on dynamic Astro route
description: Add getStaticPaths to dynamic Astro pages so they can be pre-rendered at build time.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Astro is a static site generator by default. A file like `src/pages/blog/[slug].astro` signals a dynamic route, but without `getStaticPaths()` Astro has no list of URLs to build. The route does not appear in the output at all.

## How to fix it

Export `getStaticPaths()` from the component frontmatter. It returns an array of `{ params, props }` objects — one per page.

```astro
---
// src/pages/blog/[slug].astro
export async function getStaticPaths() {
  const posts = await getPosts()
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }))
}

const { post } = Astro.props
---

<html lang="en">
  <head>
    <title>{post.title}</title>
    <meta name="description" content={post.excerpt} />
  </head>
  <body>
    <h1>{post.title}</h1>
    <p>{post.excerpt}</p>
  </body>
</html>
```

If the content is truly dynamic — real-time data, user-generated content — switch to server-side rendering instead.

```ts
// astro.config.ts
import { defineConfig } from 'astro/config'
import node from '@astrojs/node'

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
})
```

With `output: 'server'`, dynamic routes are rendered on request and `getStaticPaths()` is not required.

## Verify the fix

Run `npx astro build` and confirm the output directory contains the expected HTML files for each path. Then re-run `orino audit`.

## Related fixes

- [sitemap missing](/fixes/crawlability/astro-sitemap-missing)
- [robots.txt missing in /public](/fixes/crawlability/astro-robots-missing)
- [CSR-only Astro page](/fixes/crawlability/astro-csr-page)
