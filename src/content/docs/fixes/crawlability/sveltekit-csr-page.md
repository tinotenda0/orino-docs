---
title: CSR-only SvelteKit route
description: Remove ssr = false from SvelteKit pages so they render on the server for crawlers.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

Exporting `ssr = false` from `+page.ts` (or inside a `<script>` block in `+page.svelte`) disables server-side rendering for that entire route. Googlebot and AI crawlers receive an empty page with no content to index.

## How to fix it

Remove the `ssr = false` export.

```ts
// +page.ts — before
export const ssr = false
```

```ts
// +page.ts — after: remove the export entirely
// If you need data, add a load function instead
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch, params }) => {
  const data = await fetch(`/api/content/${params.slug}`).then(r => r.json())
  return { data }
}
```

If you need browser-only behaviour inside the component, use `browser` from `$app/environment` or `onMount` rather than disabling SSR for the whole route.

```svelte
<script lang="ts">
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'

  let chart: unknown

  onMount(async () => {
    const lib = await import('./chart-lib')
    chart = lib.init()
  })
</script>

{#if chart}
  <!-- chart rendered here -->
{:else}
  <p>Loading chart...</p>
{/if}
```

:::danger
`ssr = false` is sometimes used as a shortcut to suppress hydration errors or avoid `window is not defined` issues. Both are solvable without disabling SSR — disabling SSR makes the page invisible to search engines and is never the right fix.
:::

## Verify the fix

```bash
curl https://yourdomain.com/your-page | grep '<h1'
```

Confirm the response body contains actual content. Then re-run `orino audit`.

## Related fixes

- [Dynamic route missing +page.server.ts](/fixes/crawlability/sveltekit-missing-page-server)
- [/_app/ blocked in robots.txt](/fixes/crawlability/sveltekit-robots-blocking-static)
- [sitemap missing](/fixes/crawlability/sveltekit-sitemap-missing)
