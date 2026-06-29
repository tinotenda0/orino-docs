---
title: Page appears CSR-only to crawlers
description: Enable server-side rendering so AI crawlers and search engines can read your page content.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

The HTML response for your homepage contains fewer than 100 characters of visible text after scripts and styles are removed. Your site is rendering content exclusively in the browser (client-side rendering). AI crawlers — including GPTBot, OAI-SearchBot, and PerplexityBot — do not execute JavaScript. They receive an effectively empty page.

This is the most severe GEO issue you can have. A crawler that sees no content cannot cite you for anything.

## How to fix it

The fix depends on your framework. The goal is to return real content in the initial HTML response, before any JavaScript runs.

### Next.js

In the App Router, pages are server components by default. The most common cause of accidental CSR-only rendering is placing `'use client'` on a root layout or top-level page component.

Move `'use client'` down to only the components that require browser APIs or interactivity:

```tsx
// app/page.tsx — keep this a server component, no 'use client' here
import { HeroSection } from '@/components/HeroSection'
import { InteractiveWidget } from '@/components/InteractiveWidget'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <InteractiveWidget />
    </>
  )
}
```

```tsx
// components/InteractiveWidget.tsx
'use client'

export function InteractiveWidget() {
  // browser-only logic lives here, not in the page
}
```

### Nuxt

Check `nuxt.config.ts` for `ssr: false` and remove it. SSR is enabled by default in Nuxt:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  // Remove this line — SSR is on by default
  // ssr: false,
})
```

### SvelteKit

Check `src/routes/+layout.ts` or individual `+page.ts` files for `export const ssr = false` and remove it:

```ts
// src/routes/+layout.ts
// Remove this line:
// export const ssr = false
```

SvelteKit renders on the server by default when `ssr` is not explicitly disabled.

### Astro

Astro generates static HTML by default. If you have `output: 'server'` set and pages that appear blank, ensure your page components return markup in the frontmatter data fetch, not deferred to client scripts:

```astro
---
// src/pages/index.astro
const data = await fetchData() // runs at build or request time, not in the browser
---

<main>
  <h1>{data.title}</h1>
  <p>{data.description}</p>
</main>
```

:::danger
If you migrated from a plain React SPA (Create React App or Vite) to a meta-framework, verify that your framework is actually configured for SSR output. A common mistake is running a pure client-side React app inside a Next.js or Nuxt project structure without the framework's SSR actually engaged.
:::

## Verify the fix

After deploying, fetch the raw HTML and look for paragraph content:

```sh
curl -s https://yourdomain.com/ | grep -o '<p[^>]*>[^<]\{20,\}</p>' | head -5
```

You should see `<p>` tags containing real text. If the output is empty, the page is still CSR-only. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [no-quick-answer-block](./no-quick-answer-block)
- [faqpage-missing-geo-impact](./faqpage-missing-geo-impact)
- [llms-txt-missing](./llms-txt-missing)
