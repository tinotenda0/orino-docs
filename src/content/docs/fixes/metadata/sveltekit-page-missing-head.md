---
title: Page missing svelte:head
description: A SvelteKit page has no svelte:head block. It has no title or meta description.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Every SvelteKit page that does not include a `<svelte:head>` block has no page-specific title or description. Without a title tag, search engines cannot identify the page topic. Any default metadata set in the root layout applies to all such pages equally, which typically means duplicate titles across the site.

The check reports this for every non-dynamic page file that is missing `<svelte:head>`.

## How to fix it

Add a `<svelte:head>` block to each page component with at minimum a `<title>` and a `<meta name="description">`.

```svelte
<!-- src/routes/about/+page.svelte -->
<svelte:head>
  <title>About | Acme</title>
  <meta name="description" content="Learn about our studio, our approach, and the team behind it." />
  <meta property="og:title" content="About | Acme" />
  <meta property="og:description" content="Learn about our studio, our approach, and the team behind it." />
  <meta property="og:url" content="https://example.com/about" />
</svelte:head>

<main>
  <h1>About</h1>
  <p>Page content here.</p>
</main>
```

For pages that load data from a server, you can pass the title and description from the page's `load` function so the metadata reflects the actual content.

```ts
// src/routes/blog/[slug]/+page.server.ts
export async function load({ params }) {
  const post = await getPost(params.slug)
  return { post }
}
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data
</script>

<svelte:head>
  <title>{data.post.title} | Acme Blog</title>
  <meta name="description" content={data.post.excerpt} />
  <meta property="og:title" content="{data.post.title} | Acme Blog" />
  <meta property="og:description" content={data.post.excerpt} />
</svelte:head>

<article>
  <h1>{data.post.title}</h1>
</article>
```

## Verify the fix

```bash
curl -s https://example.com/about | grep -i '<title'
```

Confirm the title is page-specific. Re-run the audit:

```bash
npx orino audit .
```

## Related fixes

- [Page missing title in svelte:head](/fixes/metadata/sveltekit-page-missing-title)
- [Root layout missing svelte:head](/fixes/metadata/sveltekit-root-layout-missing-head)
- [Title missing](/fixes/metadata/title-missing)
