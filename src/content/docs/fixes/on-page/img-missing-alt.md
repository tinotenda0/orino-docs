---
title: Images missing alt text
description: Images on the page have no alt attribute, excluding them from Google Image search and failing basic accessibility requirements.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

One or more images are missing the `alt` attribute entirely. This is different from `alt=""` — an empty attribute is a valid way to mark a decorative image, telling screen readers to skip it. A completely absent `alt` is an error.

Google cannot understand what an image contains without alt text, so those images are excluded from Google Image search results. Missing `alt` also fails WCAG 1.1.1, meaning screen reader users receive no information about the image content.

## How to fix it

For every image, decide whether it conveys meaning or is purely decorative, then handle it accordingly.

**Meaningful image — describe the content:**
```html
<img src="/team/sarah-chen.jpg" alt="Sarah Chen, Head of Design" />
```

**Decorative image — add an empty alt explicitly:**
```html
<img src="/decorative-wave.svg" alt="" />
```

Framework-specific examples follow the same logic with different components:

### Next.js

```tsx
import Image from 'next/image'

// Meaningful — the alt prop is required by Next.js TypeScript types
<Image src="/team/sarah-chen.jpg" alt="Sarah Chen, Head of Design" width={400} height={400} />

// Decorative — pass an empty string
<Image src="/wave.svg" alt="" width={200} height={50} />
```

### Astro

```astro
<!-- Meaningful -->
<img src="/team/sarah-chen.jpg" alt="Sarah Chen, Head of Design" />

<!-- Or using the Astro Image component -->
<Image src={sarahChenImage} alt="Sarah Chen, Head of Design" />

<!-- Decorative -->
<img src="/wave.svg" alt="" />
```

### SvelteKit

```svelte
<!-- Meaningful -->
<img src="/team/sarah-chen.jpg" alt="Sarah Chen, Head of Design" />

<!-- Meaningful — using enhanced:img -->
<enhanced:img src="/team/sarah-chen.jpg" alt="Sarah Chen, Head of Design" />

<!-- Decorative -->
<img src="/wave.svg" alt="" />
```

### Nuxt

```vue
<!-- Meaningful -->
<NuxtImg src="/team/sarah-chen.jpg" alt="Sarah Chen, Head of Design" />

<!-- Decorative — plain img is fine for SVG icons -->
<img src="/wave.svg" alt="" />
```

### Plain HTML

```html
<!-- Meaningful -->
<img src="/team/sarah-chen.jpg" alt="Sarah Chen, Head of Design" />

<!-- Decorative -->
<img src="/wave.svg" alt="" />
```

:::tip
A good alt description answers: if this image failed to load, what would the user be missing? Keep it under 125 characters and do not start with "Image of" or "Photo of" — that is redundant.
:::

## Verify the fix

Re-run the audit:

```bash
npx @bynaree/orino audit --url https://yourdomain.com
```

The check finds every `<img>` on the homepage where the `alt` attribute is absent. Once all images carry an explicit `alt` (even `alt=""`), the check passes.

## Related fixes

- [Generic image filenames](/fixes/on-page/image-generic-filename)
- [Generic anchor text](/fixes/on-page/generic-anchor-text)
- [Thin content](/fixes/on-page/thin-content)
