---
title: Meta description too long
description: The meta description exceeds 155 characters and will be truncated in search results.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Google truncates meta descriptions at roughly 155 characters. Text beyond that is cut off with an ellipsis. The part that gets cut is usually the end of your call-to-action or the differentiating detail you worked hardest to include.

## How to fix it

Rewrite the description to be between 120 and 155 characters. Cut filler first: phrases like "In this page, you will find", "We are pleased to offer", and "At [Company Name], we believe" add no value and waste the budget.

```
Too long (178 characters):
We provide comprehensive and innovative architecture and interior design services
for residential and commercial clients across London and the South East,
with over 20 years of experience.

Better (128 characters):
Architecture and interior design for residential and commercial clients across
London and the South East. 20 years of proven practice.
```

### Next.js App Router

```tsx
// app/about/page.tsx
export const metadata = {
  title: 'About | Acme Architects',
  description: 'Architecture and interior design for residential and commercial clients across London and the South East. 20 years of proven practice.',
}
```

### Next.js Pages Router

```tsx
<Head>
  <meta
    name="description"
    content="Architecture and interior design for residential and commercial clients across London and the South East. 20 years of proven practice."
  />
</Head>
```

### SvelteKit

```svelte
<svelte:head>
  <meta name="description" content="Architecture and interior design for residential and commercial clients across London and the South East. 20 years of proven practice." />
</svelte:head>
```

### Nuxt

```vue
<script setup>
useSeoMeta({
  description: 'Architecture and interior design for residential and commercial clients across London and the South East. 20 years of proven practice.',
})
</script>
```

### Astro

```astro
<Layout description="Architecture and interior design for residential and commercial clients across London and the South East. 20 years of proven practice.">
```

### Plain HTML

```html
<meta name="description" content="Architecture and interior design for residential and commercial clients across London and the South East. 20 years of proven practice." />
```

## Verify the fix

```bash
curl -s https://example.com | grep -i 'meta name.*description'
```

Count the characters in the `content` attribute. It should be 155 or fewer. Re-run the audit to confirm:

```bash
npx @bynaree/orino audit --url https://example.com
```

## Related fixes

- [Meta description missing](/fixes/metadata/description-missing)
- [Title too long](/fixes/metadata/title-too-long)
