---
title: twitter:card missing
description: Add a twitter:card meta tag so shares on X show a rich preview instead of a bare link.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

The page has no `twitter:card` meta tag. When someone shares the URL on X (Twitter), the post falls back to a bare link with no preview image, title, or description. Rich previews get significantly more engagement than naked links.

X reads its own `twitter:*` meta tags first, then falls back to Open Graph tags for the title, description, and image — but only when `twitter:card` is present to opt in to a card format.

## How to fix it

Add a `twitter:card` meta tag to the page `<head>`. `summary_large_image` renders the full-width preview most sites want:

```html
<meta name="twitter:card" content="summary_large_image">
```

If your Open Graph tags are already complete (`og:title`, `og:description`, `og:image`), that single tag is enough — X will reuse them for the card content.

### Next.js App Router

Add a `twitter` entry to your metadata export:

```tsx
// app/layout.tsx
export const metadata = {
  twitter: {
    card: 'summary_large_image',
  },
}
```

### Nuxt

```ts
useSeoMeta({
  twitterCard: 'summary_large_image',
})
```

### Astro / SvelteKit / plain HTML

Add the meta tag directly to the layout or page `<head>`:

```html
<meta name="twitter:card" content="summary_large_image">
```

## Verify the fix

Re-run the audit:

```bash
npx orino-cli audit --url https://yourdomain.com
```

You can also paste the URL into X's Card Validator or share it in a DM to yourself to preview the card.

## Related fixes

- [og:title missing](/fixes/metadata/og-title-missing)
- [og:description missing](/fixes/metadata/og-description-missing)
- [og:image relative URL](/fixes/metadata/og-image-relative-url)
