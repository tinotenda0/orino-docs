---
title: Multiple H1 tags
description: The page has more than one H1 tag, which dilutes the primary topic signal and confuses the page's declared subject.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Your page has more than one `<h1>` tag. Multiple H1s make it ambiguous which heading represents the page's primary topic. Google can pick any of them, and the result is a weaker relevance signal than a single, clear H1 would produce.

The fix is straightforward: keep one, demote the rest.

## How to fix it

Identify which H1 most accurately states the page's main topic and keep it. Change all others to `<h2>`, or to whatever heading level fits correctly in the document hierarchy.

**Before:**
```html
<h1>Our Products</h1>
<p>Browse our catalogue of enterprise tools.</p>
<h1>Featured This Month</h1>
```

**After:**
```html
<h1>Our Products</h1>
<p>Browse our catalogue of enterprise tools.</p>
<h2>Featured This Month</h2>
```

The most common cause is a layout or shared component rendering an H1 alongside a page-level H1. Check your layout files first.

### Next.js App Router

If your root layout contains an H1, remove it — only individual pages should declare an H1:

```tsx
// app/layout.tsx — do not put an H1 here
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <nav>...</nav>
        {/* No <h1> in the layout */}
        {children}
      </body>
    </html>
  )
}
```

### Nuxt

The same applies to Nuxt layouts:

```vue
<!-- layouts/default.vue -->
<template>
  <div>
    <AppHeader />
    <!-- No <h1> in the layout -->
    <slot />
  </div>
</template>
```

### SvelteKit

Check `src/routes/+layout.svelte` for any H1 that would render on every page:

```svelte
<!-- src/routes/+layout.svelte -->
<nav>...</nav>
<!-- No <h1> here -->
<slot />
```

:::note
The check reads your live homepage. If the multiple H1s come from a third-party widget, chat tool, or injected script, you may need to override the widget's styles to visually demote their heading without being able to change the markup.
:::

## Verify the fix

Run this in the browser console to count H1s on the current page:

```js
document.querySelectorAll('h1').length
```

The result should be `1`. Then re-run the audit to confirm:

```bash
npx @bynaree/orino audit --url https://yourdomain.com
```

## Related fixes

- [H1 tag missing](/fixes/on-page/missing-h1)
- [Heading hierarchy broken](/fixes/on-page/heading-hierarchy-broken)
- [Thin content](/fixes/on-page/thin-content)
