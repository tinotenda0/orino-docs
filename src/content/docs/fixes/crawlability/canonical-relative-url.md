---
title: Canonical uses relative URL
description: Resolves a canonical tag using a relative URL, which Google may silently ignore.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

A canonical like `<link rel="canonical" href="/about">` is technically invalid. The spec requires canonical hrefs to be absolute URLs. Google may process relative canonicals in some cases, but it can also silently ignore them, which means you get none of the URL consolidation benefit. This is a simple fix with a real impact.

## How to fix it

Replace the relative path with the full absolute URL.

### Next.js App Router

The `alternates.canonical` field accepts a string. Always use the full URL:

```tsx
// app/about/page.tsx
export const metadata = {
  alternates: {
    canonical: 'https://yourdomain.com/about',
  },
}
```

### Next.js Pages Router

```tsx
import Head from 'next/head'

export default function AboutPage() {
  return (
    <>
      <Head>
        {/* Wrong */}
        {/* <link rel="canonical" href="/about" /> */}
        {/* Correct */}
        <link rel="canonical" href="https://yourdomain.com/about" />
      </Head>
    </>
  )
}
```

### SvelteKit

For static pages, use the full URL directly:

```svelte
<svelte:head>
  <link rel="canonical" href="https://yourdomain.com/about" />
</svelte:head>
```

For dynamic pages, `$page.url.href` is always absolute:

```svelte
<script>
  import { page } from '$app/stores'
</script>

<svelte:head>
  <link rel="canonical" href={$page.url.href} />
</svelte:head>
```

### Nuxt

```ts
// pages/about.vue
useHead({
  link: [
    { rel: 'canonical', href: 'https://yourdomain.com/about' },
  ],
})
```

For dynamic pages, `useRequestURL()` returns the full absolute URL:

```ts
const url = useRequestURL()
useHead({
  link: [
    { rel: 'canonical', href: url.href },
  ],
})
```

### Astro

`Astro.url` is always an absolute URL object. Use it as the fallback when no explicit canonical is passed:

```astro
---
// src/layouts/Layout.astro
const canonical = Astro.props.canonical ?? Astro.url.href
---
<head>
  <link rel="canonical" href={canonical} />
</head>
```

:::caution
If you are building the canonical with string concatenation, make sure you are starting from the base URL (`https://yourdomain.com`) rather than just a path string (`/about`). A leading slash produces a relative URL.
:::

## Verify the fix

Check the canonical value in the response HTML:

```bash
curl -s https://yourdomain.com/ | grep canonical
```

The `href` attribute must start with `https://` or `http://`. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [Canonical tag missing](/fixes/crawlability/canonical-missing)
- [Canonical and og:url mismatch](/fixes/crawlability/canonical-ogurl-mismatch)
