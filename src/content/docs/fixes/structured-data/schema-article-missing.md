---
title: Article schema missing on blog posts
description: Adds Article or BlogPosting structured data to blog post pages so search engines and AI crawlers can identify your content type.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Blog routes matching `/blog/*`, `/posts/*`, or `/articles/*` have no Article or BlogPosting schema block. Search engines use this schema to generate rich snippets in results, displaying the headline, author, and publish date. AI search engines like Perplexity treat it as a primary signal for assessing content relevance and freshness when choosing sources to cite.

## How to fix it

Add a `BlogPosting` schema block to each blog post page. Use `Article` if you publish editorial or news content where `BlogPosting` feels too informal.

### Next.js App Router

```tsx
// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Person', name: post.author },
    image: post.coverImage,
    url: `https://yoursite.com/blog/${params.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <article>
        <h1>{post.title}</h1>
      </article>
    </>
  )
}
```

### Next.js Pages Router

```tsx
// pages/blog/[slug].tsx
import Head from 'next/head'

export default function BlogPost({ post }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Person', name: post.author },
    image: post.coverImage,
    url: `https://yoursite.com/blog/${post.slug}`,
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <article>
        <h1>{post.title}</h1>
      </article>
    </>
  )
}
```

### Astro

```astro
---
// src/pages/blog/[slug].astro
const { post } = Astro.props

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  datePublished: post.publishedAt,
  dateModified: post.updatedAt,
  author: { '@type': 'Person', name: post.author },
  image: post.coverImage,
  url: Astro.url.href,
}
---
<html>
  <head>
    <script type="application/ld+json" set:html={JSON.stringify(schema)} />
  </head>
  <body>
    <article>
      <h1>{post.title}</h1>
    </article>
  </body>
</html>
```

### SvelteKit

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data

  $: schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.post.title,
    datePublished: data.post.publishedAt,
    dateModified: data.post.updatedAt,
    author: { '@type': 'Person', name: data.post.author },
    image: data.post.coverImage,
    url: `https://yoursite.com/blog/${data.post.slug}`,
  })
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${schemaJson}</script>`}
</svelte:head>

<article>
  <h1>{data.post.title}</h1>
</article>
```

### Nuxt

```vue
<!-- pages/blog/[slug].vue -->
<script setup>
const route = useRoute()
const { data: post } = await useAsyncData(() => fetchPost(route.params.slug))

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.value.title,
      datePublished: post.value.publishedAt,
      dateModified: post.value.updatedAt,
      author: { '@type': 'Person', name: post.value.author },
      image: post.value.coverImage,
      url: useRequestURL().href,
    }),
  }],
})
</script>

<template>
  <article>
    <h1>{{ post.title }}</h1>
  </article>
</template>
```

## Verify the fix

Re-run `orino audit` and check the structured-data section. The `schema-article-missing` check should pass. For richer confirmation, paste the blog post URL into [Google's Rich Results Test](https://search.google.com/test/rich-results) and confirm Article is listed as a detected type.

## Related fixes

- [Article schema missing dateModified](./schema-article-no-datemodified)
- [FAQPage schema missing on informational pages](./schema-faqpage-missing)
- [Organization schema missing](./schema-organization-missing)
- [BreadcrumbList missing on deep pages](./schema-breadcrumb-missing)
