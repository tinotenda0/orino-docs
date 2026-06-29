---
title: H1 tag missing
description: The page has no H1 tag, so Google cannot identify what this page is primarily about.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

The page has no `<h1>` tag. Google uses the H1 as the primary topic signal for a page — without it, the page has no declared subject, which makes it harder to rank for any keyword and harder for AI search engines to determine what the page should be cited for.

Every page, including the homepage, needs exactly one H1.

## How to fix it

Add a single H1 that states the page's main topic. It does not need to match the `<title>` tag word-for-word, but it should be clearly related and include the primary keyword.

### Next.js App Router

```tsx
// app/page.tsx
export default function HomePage() {
  return (
    <main>
      <h1>Design systems for product teams</h1>
      {/* rest of page */}
    </main>
  )
}
```

### Next.js Pages Router

```tsx
// pages/index.tsx
export default function HomePage() {
  return (
    <main>
      <h1>Design systems for product teams</h1>
    </main>
  )
}
```

### Astro

```astro
---
// src/pages/index.astro
---
<main>
  <h1>Design systems for product teams</h1>
</main>
```

### SvelteKit

```svelte
<!-- src/routes/+page.svelte -->
<main>
  <h1>Design systems for product teams</h1>
</main>
```

### Nuxt

```vue
<!-- pages/index.vue -->
<template>
  <main>
    <h1>Design systems for product teams</h1>
  </main>
</template>
```

### Plain HTML

```html
<!doctype html>
<html lang="en-GB">
  <head>
    <title>Design systems for product teams | Orino</title>
  </head>
  <body>
    <main>
      <h1>Design systems for product teams</h1>
    </main>
  </body>
</html>
```

:::caution
The check reads your live rendered page, not source files. If your framework renders an H1 conditionally — behind a feature flag, inside a `<Suspense>` boundary, or via client-side hydration — confirm it is present in the actual HTML before declaring the fix done.
:::

## Verify the fix

```bash
curl -s https://yourdomain.com | grep -i '<h1'
```

You should see your H1 in the output. Or re-run the audit:

```bash
npx orino audit https://yourdomain.com
```

The `missing-h1` check should now pass.

## Related fixes

- [Multiple H1 tags](/fixes/on-page/multiple-h1)
- [Heading hierarchy broken](/fixes/on-page/heading-hierarchy-broken)
- [Thin content](/fixes/on-page/thin-content)
