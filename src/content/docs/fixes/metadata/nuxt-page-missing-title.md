---
title: Page missing title in useHead
description: A Nuxt page calls useHead() but sets no title. This page has no unique title.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

The page calls `useHead()` or `useSeoMeta()`, which is the right pattern, but does not include a `title` property. Without a title, search engines use whatever the root layout's `titleTemplate` generates from an empty string, or nothing at all. The browser tab shows a blank or generic label.

## How to fix it

Add a `title` property to the existing `useHead()` or `useSeoMeta()` call.

### Updating an existing useHead call

```vue
<!-- Before -->
<script setup>
useHead({
  meta: [
    { name: 'description', content: 'Learn about our studio.' },
  ],
})
</script>

<!-- After -->
<script setup>
useHead({
  title: 'About',
  meta: [
    { name: 'description', content: 'Learn about our studio.' },
  ],
})
</script>
```

### Updating an existing useSeoMeta call

```vue
<!-- Before -->
<script setup>
useSeoMeta({
  description: 'Learn about our studio.',
  ogDescription: 'Learn about our studio.',
})
</script>

<!-- After -->
<script setup>
useSeoMeta({
  title: 'About',
  description: 'Learn about our studio.',
  ogTitle: 'About | Acme',
  ogDescription: 'Learn about our studio.',
})
</script>
```

If you have a `titleTemplate` set in `app.vue`, the `title` value here is the short page-specific part. The template appends the brand name automatically.

```vue
<!-- app.vue sets: useHead({ titleTemplate: '%s | Acme' }) -->

<!-- pages/about.vue -->
<script setup>
useHead({
  title: 'About',
  // Renders as: "About | Acme"
})
</script>
```

:::caution
Do not set `title` to an empty string or `undefined`. Either will cause the template to render incorrectly. If a page genuinely has no meaningful title yet, set a placeholder and track it as a content task.
:::

## Verify the fix

```bash
curl -s https://example.com/about | grep -i '<title'
```

The output should show the page-specific title. Re-run the audit:

```bash
npx @bynaree/orino audit
```

## Related fixes

- [Page missing useHead](/fixes/metadata/nuxt-page-missing-head)
- [Root layout missing useHead](/fixes/metadata/nuxt-layout-missing-usehead)
- [Duplicate titles](/fixes/metadata/title-duplicate)
