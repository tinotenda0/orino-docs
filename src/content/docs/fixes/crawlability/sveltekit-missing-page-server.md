---
title: Dynamic route missing +page.server.ts
description: Add server-side data loading to dynamic SvelteKit routes so crawlers receive the full page content.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

A dynamic SvelteKit route (`[slug]/+page.svelte`) without a `+page.server.ts` has no server-side data loading. If the component fetches data client-side, Googlebot and AI crawlers receive the page shell with placeholder content instead of the actual page.

## How to fix it

Create `+page.server.ts` in the same directory as `+page.svelte`. Export a `load` function that returns the data the page needs.

```ts
// src/routes/blog/[slug]/+page.server.ts
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
  const post = await getPost(params.slug)
  if (!post) error(404, 'Post not found')
  return { post }
}
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>

<h1>{data.post.title}</h1>
<p>{data.post.excerpt}</p>
```

The `load` function runs on the server, so the data is present in the initial HTML response. Crawlers receive the full content.

:::note
If data fetching happens inside `onMount` or a reactive `$effect`, it runs in the browser only. Any data fetched that way is invisible to crawlers. Move content-critical fetches to `+page.server.ts`.
:::

## Verify the fix

```bash
curl https://yourdomain.com/blog/your-post-slug | grep '<h1'
```

Confirm the response body includes the actual post title. Then re-run `orino audit`.

## Related fixes

- [CSR-only SvelteKit route](/fixes/crawlability/sveltekit-csr-page)
- [sitemap missing](/fixes/crawlability/sveltekit-sitemap-missing)
- [robots.txt missing in /static](/fixes/crawlability/sveltekit-robots-missing)
