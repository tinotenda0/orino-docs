---
title: Dynamic route missing useAsyncData or useFetch
description: Add server-side data fetching to dynamic Nuxt pages so crawlers receive the full page content.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

A dynamic Nuxt page (`pages/blog/[slug].vue`) without `useAsyncData()` or `useFetch()` fetches its data on the client only. Googlebot and AI crawlers receive the page template with no content — no title, no body text, nothing to index.

## How to fix it

Use `useAsyncData()` or `useFetch()` inside `<script setup>`. Both composables run on the server during SSR, so the data is present in the initial HTML response.

```vue
<!-- pages/blog/[slug].vue -->
<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(
  `post-${route.params.slug}`,
  () => $fetch(`/api/posts/${route.params.slug}`)
)
</script>

<template>
  <article>
    <h1>{{ post?.title }}</h1>
    <p>{{ post?.excerpt }}</p>
  </article>
</template>
```

`useFetch` is a shorthand that combines `useAsyncData` with `$fetch`. Use it when you do not need to customise the cache key.

```vue
<script setup lang="ts">
const route = useRoute()
const { data: post } = await useFetch(`/api/posts/${route.params.slug}`)
</script>
```

:::note
Data fetched inside `onMounted()` runs in the browser only. Move all content-critical fetches to `useAsyncData()` or `useFetch()` at the top level of `<script setup>` so they run on the server.
:::

## Verify the fix

```bash
curl https://yourdomain.com/blog/your-post-slug | grep '<h1'
```

Confirm the response body contains the actual post title. Then re-run `orino audit`.

## Related fixes

- [sitemap missing](/fixes/crawlability/nuxt-sitemap-missing)
- [robots.txt missing in /public](/fixes/crawlability/nuxt-robots-missing)
- [/_nuxt/ blocked in robots.txt](/fixes/crawlability/nuxt-robots-blocking-static)
