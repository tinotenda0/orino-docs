---
title: FAQPage schema missing on informational pages
description: Adds FAQPage structured data to /faq, /guide, /how-to, /learn, and /help pages to maximise AI citation potential.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Pages at paths matching `/faq`, `/guide`, `/how-to`, `/learn`, or `/help` have no FAQPage schema. FAQPage is the most directly useful schema type for AI search: Perplexity, ChatGPT search, and Google's AI Overviews all pull structured question-and-answer content from FAQPage blocks when generating responses. Without it, your answers are available only as unstructured prose, which is harder to extract and less likely to be cited.

## How to fix it

Add a FAQPage block to each informational page. Each question must include the full answer text in the `text` field.

:::tip
Write complete answers in the `text` field. AI search engines quote this field directly when citing sources. Truncated or summary answers reduce citation quality.
:::

### Next.js App Router

```tsx
// app/faq/page.tsx
export default function FAQPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is your refund policy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer a full refund within 30 days of purchase. Contact support@yoursite.com to request a refund and we will process it within 5 business days.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I cancel my subscription?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Go to Account Settings, click Billing, then click Cancel Subscription. Your access continues until the end of the current billing period.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main>
        <h1>Frequently Asked Questions</h1>
      </main>
    </>
  )
}
```

### Next.js Pages Router

```tsx
// pages/faq.tsx
import Head from 'next/head'

export default function FAQPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is your refund policy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer a full refund within 30 days of purchase. Contact support@yoursite.com to request a refund and we will process it within 5 business days.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I cancel my subscription?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Go to Account Settings, click Billing, then click Cancel Subscription. Your access continues until the end of the current billing period.',
        },
      },
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
        <h1>Frequently Asked Questions</h1>
      </main>
    </>
  )
}
```

### Astro

```astro
---
// src/pages/faq.astro
const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is your refund policy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer a full refund within 30 days of purchase. Contact support@yoursite.com to request a refund and we will process it within 5 business days.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I cancel my subscription?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go to Account Settings, click Billing, then click Cancel Subscription. Your access continues until the end of the current billing period.',
      },
    },
  ],
}
---
<html>
  <head>
    <script type="application/ld+json" set:html={JSON.stringify(schema)} />
  </head>
  <body>
    <main>
      <h1>Frequently Asked Questions</h1>
    </main>
  </body>
</html>
```

### SvelteKit

```svelte
<!-- src/routes/faq/+page.svelte -->
<script>
  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is your refund policy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer a full refund within 30 days of purchase. Contact support@yoursite.com to request a refund and we will process it within 5 business days.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I cancel my subscription?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Go to Account Settings, click Billing, then click Cancel Subscription. Your access continues until the end of the current billing period.',
        },
      },
    ],
  })
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${schemaJson}</script>`}
</svelte:head>

<main>
  <h1>Frequently Asked Questions</h1>
</main>
```

### Nuxt

```vue
<!-- pages/faq.vue -->
<script setup>
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is your refund policy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We offer a full refund within 30 days of purchase. Contact support@yoursite.com to request a refund and we will process it within 5 business days.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I cancel my subscription?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Go to Account Settings, click Billing, then click Cancel Subscription. Your access continues until the end of the current billing period.',
          },
        },
      ],
    }),
  }],
})
</script>

<template>
  <main>
    <h1>Frequently Asked Questions</h1>
  </main>
</template>
```

## Verify the fix

Paste the FAQ or guide page URL into [Google's Rich Results Test](https://search.google.com/test/rich-results) and confirm FAQPage is listed as a detected type. Re-run `orino audit` to confirm `schema-faqpage-missing` passes.

## Related fixes

- [Article schema missing on blog posts](./schema-article-missing)
- [Organization schema missing](./schema-organization-missing)
- [Organization schema missing sameAs links](./schema-same-as-missing)
