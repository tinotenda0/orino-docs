---
title: Root layout missing svelte:head
description: The root +layout.svelte has no svelte:head block. Site-wide default metadata is not being set.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

In SvelteKit, `src/routes/+layout.svelte` is the root layout that wraps every page. Adding a `<svelte:head>` block here is the correct place to set site-wide default metadata: a fallback description, Open Graph defaults, and the canonical charset and viewport.

The check found that `src/routes/+layout.svelte` exists but has no `<svelte:head>` block.

## How to fix it

Add a `<svelte:head>` block to `src/routes/+layout.svelte` with your site-wide defaults. Individual pages can still add their own `<svelte:head>` to override these values.

```svelte
<!-- src/routes/+layout.svelte -->
<svelte:head>
  <meta name="description" content="Default site description. Override this in each page." />
  <meta property="og:image" content="https://example.com/og.png" />
  <meta property="og:type" content="website" />
</svelte:head>

<slot />
```

:::note
SvelteKit merges `<svelte:head>` content from layout and page. If a page sets the same tag as the layout, the page version takes precedence. This makes the root layout a reliable fallback without blocking per-page overrides.
:::

A more complete root layout with navigation might look like:

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import Navigation from '$lib/components/Navigation.svelte'
</script>

<svelte:head>
  <meta name="description" content="Acme - Architecture and interior design across London." />
  <meta property="og:site_name" content="Acme" />
  <meta property="og:image" content="https://example.com/og.png" />
  <meta property="og:type" content="website" />
</svelte:head>

<Navigation />
<slot />
```

Each page then adds its own title and description:

```svelte
<!-- src/routes/about/+page.svelte -->
<svelte:head>
  <title>About | Acme</title>
  <meta name="description" content="Learn about our studio and approach." />
  <meta property="og:title" content="About | Acme" />
</svelte:head>

<main>
  <h1>About</h1>
</main>
```

## Verify the fix

```bash
curl -s https://example.com | grep -i 'og:image'
```

Re-run the audit to confirm:

```bash
npx orino audit .
```

## Related fixes

- [Page missing svelte:head](/fixes/metadata/sveltekit-page-missing-head)
- [Page missing title in svelte:head](/fixes/metadata/sveltekit-page-missing-title)
- [Meta description missing](/fixes/metadata/description-missing)
