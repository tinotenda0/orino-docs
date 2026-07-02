---
title: Title too long
description: The page title exceeds 60 characters and will be truncated in Google search results.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Google truncates titles at roughly 60 characters in desktop search results (a little longer on mobile). Anything beyond that is replaced with an ellipsis. Users see a cut-off title that may lose the most important words, usually the brand name at the end.

The check flags titles over 60 characters and treats titles over 80 characters as a more significant problem.

## How to fix it

Rewrite the title to be 50-60 characters. Put the most important words first. If you include a brand name, put it at the end after a separator.

```
Good: About Our Architecture Services | Acme
      (44 characters)

Too long: Everything You Need to Know About Our Architecture Design Services | Acme Studio
           (84 characters)
```

The brand name separator is typically `|` or `-`. Either is fine.

:::tip
Use a title character counter before publishing. Any plain text editor with a character count works. The ideal range is 50-60 characters, leaving a small buffer for Google's pixel-width calculations.
:::

### Next.js App Router

```tsx
// app/about/page.tsx
export const metadata = {
  title: 'About Our Architecture Services',
}
```

If you have a title template set in the root layout, the page title is just the short part. The template appends the brand name automatically.

```tsx
// app/layout.tsx
export const metadata = {
  title: {
    default: 'Acme Studio',
    template: '%s | Acme Studio',
  },
}

// app/about/page.tsx
export const metadata = {
  title: 'About Our Architecture Services',
  // Renders as: "About Our Architecture Services | Acme Studio"
}
```

### Next.js Pages Router

```tsx
<Head>
  <title>About Our Architecture Services | Acme</title>
</Head>
```

### SvelteKit

```svelte
<svelte:head>
  <title>About Our Architecture Services | Acme</title>
</svelte:head>
```

### Nuxt

```vue
<script setup>
useHead({ title: 'About Our Architecture Services | Acme' })
</script>
```

### Astro

```astro
<Layout title="About Our Architecture Services | Acme">
```

### Plain HTML

```html
<title>About Our Architecture Services | Acme</title>
```

## Verify the fix

```bash
curl -s https://example.com | grep -i '<title'
```

Count the characters in the output. Alternatively, paste the title into Google's [Rich Results Test](https://search.google.com/test/rich-results) or use a SERP snippet preview tool to see exactly how it renders.

Re-run the audit to confirm the check passes:

```bash
npx orino-cli audit --url https://example.com
```

## Related fixes

- [Title missing](/fixes/metadata/title-missing)
- [Title is generic](/fixes/metadata/title-generic)
- [Title template not configured](/fixes/metadata/nextjs-title-template-missing)
