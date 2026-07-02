---
title: Page missing useHead or useSeoMeta
description: A Nuxt page has no useHead() or useSeoMeta() call. It has no title or meta description.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Every content page in a Nuxt app should call `useHead()` or `useSeoMeta()` to set a page-specific title and description. A page without either composable relies entirely on whatever the root layout defaults provide. That usually means all such pages share the same title and description, which creates duplicate metadata and makes each page invisible to search engines as a distinct entity.

## How to fix it

Add `useHead()` or `useSeoMeta()` to the `<script setup>` block of each page component.

### Using useHead

```vue
<!-- pages/about.vue -->
<script setup>
useHead({
  title: 'About',
  // With a titleTemplate set in app.vue, this renders as "About | Acme"
  meta: [
    { name: 'description', content: 'Learn about our studio, our approach, and the team behind it.' },
  ],
})
</script>

<template>
  <main>
    <h1>About</h1>
  </main>
</template>
```

### Using useSeoMeta

`useSeoMeta` is the recommended option when you are setting Open Graph and Twitter Card tags alongside the standard meta tags. It is fully typed and handles the property/name attribute correctly for each tag.

```vue
<!-- pages/about.vue -->
<script setup>
useSeoMeta({
  title: 'About',
  description: 'Learn about our studio, our approach, and the team behind it.',
  ogTitle: 'About | Acme',
  ogDescription: 'Learn about our studio, our approach, and the team behind it.',
  ogUrl: 'https://example.com/about',
})
</script>

<template>
  <main>
    <h1>About</h1>
  </main>
</template>
```

### Dynamic metadata from server data

For pages that load data before rendering, set the metadata after fetching it.

```vue
<!-- pages/blog/[slug].vue -->
<script setup>
const route = useRoute()
const { data: post } = await useFetch(`/api/posts/${route.params.slug}`)

useSeoMeta({
  title: () => post.value?.title,
  description: () => post.value?.excerpt,
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.excerpt,
})
</script>
```

Using getter functions (`() => post.value?.title`) ensures the metadata updates reactively when the data changes.

## Verify the fix

```bash
curl -s https://example.com/about | grep -i '<title'
```

Confirm the title is page-specific. Re-run the audit:

```bash
npx @bynaree/orino audit
```

## Related fixes

- [Page missing title in useHead](/fixes/metadata/nuxt-page-missing-title)
- [Root layout missing useHead](/fixes/metadata/nuxt-layout-missing-usehead)
- [Meta description missing](/fixes/metadata/description-missing)
