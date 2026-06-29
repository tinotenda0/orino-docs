---
title: FAQPage schema missing on informational pages
description: Add FAQPage JSON-LD to your informational pages so AI systems know what questions they answer.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Your site has informational pages (routes containing `/faq`, `/guide`, `/how-to`, `/learn`, or `/help`) but no `FAQPage` JSON-LD schema. FAQPage schema tells AI systems exactly what questions your pages answer, in structured form they can extract directly. Without it, they have to infer relevance from unstructured prose — which they do poorly compared to explicit markup.

FAQPage is the highest-impact schema type for GEO. AI Overviews and Perplexity citations both weight explicit Q&A content heavily.

## How to fix it

Add `FAQPage` JSON-LD to the pages that contain question-and-answer content. Each question requires a `Question` with a complete `acceptedAnswer`.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I reset my password?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Go to the login page and click 'Forgot password'. Enter your email address and you will receive a reset link within two minutes."
      }
    },
    {
      "@type": "Question",
      "name": "What payment methods do you accept?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We accept Visa, Mastercard, American Express, and PayPal. All payments are processed via Stripe."
      }
    }
  ]
}
</script>
```

Place this in the `<head>` of each FAQ, guide, or how-to page. The `text` field must be a self-contained answer — AI systems extract it verbatim, so "see above" or "as described below" are useless.

### Next.js (App Router)

```tsx
// app/faq/page.tsx
export default function FaqPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I reset my password?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Go to the login page and click Forgot password. Enter your email and you will receive a reset link within two minutes.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* page content */}
    </>
  )
}
```

### Nuxt

```vue
<!-- pages/faq.vue -->
<script setup>
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I reset my password?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Go to the login page and click Forgot password. Enter your email and you will receive a reset link within two minutes.',
            },
          },
        ],
      }),
    },
  ],
})
</script>
```

### SvelteKit

```svelte
<!-- src/routes/faq/+page.svelte -->
<script>
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I reset my password?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Go to the login page and click Forgot password. Enter your email and you will receive a reset link within two minutes."
        }
      }
    ]
  })
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${faqSchema}</script>`}
</svelte:head>
```

### Astro

```astro
---
// src/pages/faq.astro
const faqSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I reset my password?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Go to the login page and click Forgot password. Enter your email and you will receive a reset link within two minutes."
      }
    }
  ]
})
---

<head>
  <script type="application/ld+json" set:html={faqSchema} />
</head>
```

## Verify the fix

Use Google's Rich Results Test to validate the schema:

```
https://search.google.com/test/rich-results?url=https://yourdomain.com/faq
```

You should see "FAQ" listed as a detected rich result type. You can also check the raw HTML:

```sh
curl -s https://yourdomain.com/faq | grep -c 'FAQPage'
```

A result of `1` or more confirms the schema is present. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [llms-txt-missing](./llms-txt-missing)
- [no-quick-answer-block](./no-quick-answer-block)
- [csr-only-rendering](./csr-only-rendering)
