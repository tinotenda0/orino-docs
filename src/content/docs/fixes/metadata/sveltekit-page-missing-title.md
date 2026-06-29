---
title: Page missing title in svelte:head
description: A SvelteKit page has a svelte:head block but no title element inside it.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

The page has a `<svelte:head>` block (which is good) but there is no `<title>` element inside it. Without a title, the browser tab and search result listings have no page-specific label. If the root layout sets a default title, every page without its own title shows the same value, creating duplicate titles across the site.

## How to fix it

Add a `<title>` element inside the existing `<svelte:head>` block.

```svelte
<!-- Before -->
<svelte:head>
  <meta name="description" content="Learn about our studio and approach." />
</svelte:head>

<!-- After -->
<svelte:head>
  <title>About | Acme</title>
  <meta name="description" content="Learn about our studio and approach." />
</svelte:head>
```

Keep each title unique and descriptive. The pattern `Page Name | Brand Name` works for most cases.

For pages powered by dynamic data:

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data
</script>

<svelte:head>
  <title>{data.post.title} | Acme Blog</title>
  <meta name="description" content={data.post.excerpt} />
</svelte:head>

<article>
  <h1>{data.post.title}</h1>
</article>
```

:::tip
If you find yourself writing the same ` | Brand Name` suffix on every page, consider a shared Svelte component or a utility function that takes a page title and returns the formatted string. That way, renaming your brand only requires one change.
:::

## Verify the fix

```bash
curl -s https://example.com/about | grep -i '<title'
```

The output should show your page-specific title. Re-run the audit:

```bash
npx orino audit .
```

## Related fixes

- [Page missing svelte:head](/fixes/metadata/sveltekit-page-missing-head)
- [Root layout missing svelte:head](/fixes/metadata/sveltekit-root-layout-missing-head)
- [Duplicate titles](/fixes/metadata/title-duplicate)
