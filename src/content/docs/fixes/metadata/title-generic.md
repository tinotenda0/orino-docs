---
title: Title is generic
description: The page title contains a generic phrase that adds no keyword value and reduces click-through rate.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

The check found one of these phrases in the title: "Welcome to", "Home Page", "Click here", "Learn more", "Amazing", "Innovative", "Cutting-edge", "Comprehensive", "World-class", "Leading provider", "We are proud", "Find out", or the title is exactly "Home".

These phrases tell a search user nothing about what the site does. They also waste the limited character budget that could carry actual search terms. A title like "Welcome to Acme" ranks for nothing useful and earns fewer clicks than a specific alternative.

## How to fix it

Replace the generic phrase with a concrete description of what the page offers. Answer the question a potential visitor would search for.

```
Bad:  Welcome to Acme | Leading Provider of Solutions
Good: Commercial Flooring Installation London | Acme

Bad:  Home
Good: Acme - Handmade Ceramic Lighting for Interiors
```

The title should contain your primary keyword phrase and your brand name. Keep it under 60 characters.

### Next.js App Router

```tsx
// app/layout.tsx
export const metadata = {
  title: {
    default: 'Acme - Handmade Ceramic Lighting for Interiors',
    template: '%s | Acme',
  },
}
```

### Next.js Pages Router

```tsx
// pages/index.tsx
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Acme - Handmade Ceramic Lighting for Interiors</title>
      </Head>
      <main>Content</main>
    </>
  )
}
```

### SvelteKit

```svelte
<!-- src/routes/+page.svelte -->
<svelte:head>
  <title>Acme - Handmade Ceramic Lighting for Interiors</title>
</svelte:head>
```

### Nuxt

```vue
<!-- pages/index.vue -->
<script setup>
useHead({ title: 'Acme - Handmade Ceramic Lighting for Interiors' })
</script>
```

### Astro

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro'
---
<Layout title="Acme - Handmade Ceramic Lighting for Interiors">
  <main>Content</main>
</Layout>
```

### Plain HTML

```html
<title>Acme - Handmade Ceramic Lighting for Interiors</title>
```

:::tip
The best titles are specific enough to sound odd out of context. "Handmade Ceramic Lighting for Interiors | Acme" would not make sense on a software company's homepage, and that specificity is exactly what makes it good.
:::

## Verify the fix

```bash
curl -s https://example.com | grep -i '<title'
```

Confirm the title contains no generic phrases. Re-run the audit:

```bash
npx orino audit https://example.com
```

## Related fixes

- [Title missing](/fixes/metadata/title-missing)
- [Title too long](/fixes/metadata/title-too-long)
- [Duplicate titles](/fixes/metadata/title-duplicate)
