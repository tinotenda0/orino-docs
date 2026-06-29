---
title: Root layout missing useHead
description: Neither layouts/default.vue nor app.vue uses useHead(). Site-wide default metadata is not set.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

In Nuxt, site-wide default metadata should be set in `app.vue` or `layouts/default.vue` using `useHead()` or `useSeoMeta()`. The check found that neither file uses either composable. Pages that do not set their own metadata will have no title, no description, and no Open Graph tags.

You can also configure global head tags in `nuxt.config.ts`, but the check looks specifically for runtime composable usage, which is the recommended approach for dynamic metadata.

## How to fix it

Add `useHead()` or `useSeoMeta()` to `app.vue` or `layouts/default.vue`. Use `titleTemplate` to automatically append the brand name to all page titles.

### Using app.vue

```vue
<!-- app.vue -->
<script setup>
useHead({
  htmlAttrs: { lang: 'en-GB' },
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Acme` : 'Acme - Architecture and Interior Design'
  },
  meta: [
    { name: 'description', content: 'Default site description. Override this per page.' },
    { property: 'og:image', content: 'https://example.com/og.png' },
    { property: 'og:type', content: 'website' },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

### Using layouts/default.vue

```vue
<!-- layouts/default.vue -->
<script setup>
useHead({
  htmlAttrs: { lang: 'en-GB' },
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Acme` : 'Acme - Architecture and Interior Design'
  },
  meta: [
    { property: 'og:image', content: 'https://example.com/og.png' },
  ],
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
```

### Using useSeoMeta for a cleaner API

`useSeoMeta` is the recommended approach for Open Graph and Twitter Card tags. It is type-safe and avoids common property name mistakes.

```vue
<!-- app.vue -->
<script setup>
useSeoMeta({
  ogImage: 'https://example.com/og.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useHead({
  htmlAttrs: { lang: 'en-GB' },
  titleTemplate: '%s | Acme',
})
</script>
```

:::tip
`titleTemplate` set in `app.vue` or the default layout applies to every page. Individual pages that call `useHead({ title: 'About' })` will get "About | Acme" automatically. Pages that do not set a title get the fallback from the template function.
:::

## Verify the fix

```bash
curl -s https://example.com | grep -iE '<html|<title|og:image'
```

Confirm the `lang` attribute, title, and OG image appear. Re-run the audit:

```bash
npx orino audit .
```

## Related fixes

- [Page missing useHead](/fixes/metadata/nuxt-page-missing-head)
- [Page missing title in useHead](/fixes/metadata/nuxt-page-missing-title)
- [lang attribute missing](/fixes/metadata/html-lang-missing)
