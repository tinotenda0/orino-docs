---
title: Organization schema missing
description: Adds Organization structured data to the homepage so search engines and AI crawlers can identify your business name, logo, and URL.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

No Organization or LocalBusiness schema was found on the homepage. This schema is how you formally declare your business identity to search engines. Without it, Google infers your brand name and logo from page content alone, which is inconsistent across different search platforms. AI search engines like Perplexity and ChatGPT use Organisation schema as a trust signal when deciding which sources to reference in generated answers.

## How to fix it

Add an Organization JSON-LD block to the homepage. At minimum, include `name`, `url`, and `logo`. Add `sameAs` links while you are here.

### Next.js App Router

```tsx
// app/page.tsx
export default function HomePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Your Company Name',
    url: 'https://yoursite.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://yoursite.com/logo.png',
      width: 200,
      height: 60,
    },
    sameAs: [
      'https://www.linkedin.com/company/your-company',
      'https://twitter.com/yourcompany',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main>
        <h1>Your Company Name</h1>
      </main>
    </>
  )
}
```

### Next.js Pages Router

```tsx
// pages/index.tsx
import Head from 'next/head'

export default function HomePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Your Company Name',
    url: 'https://yoursite.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://yoursite.com/logo.png',
      width: 200,
      height: 60,
    },
    sameAs: [
      'https://www.linkedin.com/company/your-company',
      'https://twitter.com/yourcompany',
    ],
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <main>
        <h1>Your Company Name</h1>
      </main>
    </>
  )
}
```

### Astro

```astro
---
// src/pages/index.astro
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Your Company Name',
  url: 'https://yoursite.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://yoursite.com/logo.png',
    width: 200,
    height: 60,
  },
  sameAs: [
    'https://www.linkedin.com/company/your-company',
    'https://twitter.com/yourcompany',
  ],
}
---
<html>
  <head>
    <script type="application/ld+json" set:html={JSON.stringify(schema)} />
  </head>
  <body>
    <main>
      <h1>Your Company Name</h1>
    </main>
  </body>
</html>
```

### SvelteKit

```svelte
<!-- src/routes/+page.svelte -->
<script>
  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Your Company Name',
    url: 'https://yoursite.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://yoursite.com/logo.png',
      width: 200,
      height: 60,
    },
    sameAs: [
      'https://www.linkedin.com/company/your-company',
      'https://twitter.com/yourcompany',
    ],
  })
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${schemaJson}</script>`}
</svelte:head>

<main>
  <h1>Your Company Name</h1>
</main>
```

### Nuxt

```vue
<!-- pages/index.vue -->
<script setup>
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Your Company Name',
      url: 'https://yoursite.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yoursite.com/logo.png',
        width: 200,
        height: 60,
      },
      sameAs: [
        'https://www.linkedin.com/company/your-company',
        'https://twitter.com/yourcompany',
      ],
    }),
  }],
})
</script>

<template>
  <main>
    <h1>Your Company Name</h1>
  </main>
</template>
```

:::note
Use `LocalBusiness` instead of `Organization` if your site represents a physical location. The required properties are the same. You can also add `address`, `telephone`, and `openingHours` to qualify for local knowledge panel features.
:::

## Verify the fix

Re-run `orino audit`. The `schema-organization-missing` check should pass. You can also view source on the homepage and confirm the JSON-LD block is present and contains the correct `@type`.

## Related fixes

- [Organization schema incomplete](./schema-organization-incomplete)
- [Organization schema missing sameAs links](./schema-same-as-missing)
- [Article schema missing on blog posts](./schema-article-missing)
- [BreadcrumbList missing on deep pages](./schema-breadcrumb-missing)
