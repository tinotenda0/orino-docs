---
title: noindex on public page
description: Resolves a noindex directive on a public page, which makes it completely invisible to search engines.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

`noindex` tells search engines not to include a page in their index. On staging this is intentional. On your production homepage it is a critical problem: the page cannot rank for anything. The check looks for `noindex` in both the `<meta name="robots">` tag and the `X-Robots-Tag` HTTP response header.

The most common cause is a staging-environment robots directive that was accidentally deployed to production.

## How to fix it

Find where `noindex` is being set and remove it.

### Next.js App Router

Search `app/layout.tsx` and any `page.tsx` files for a robots metadata field:

```tsx
// app/layout.tsx — remove noindex or set explicitly to index
export const metadata = {
  robots: {
    index: true,
    follow: true,
  },
}
```

If environment-based logic is setting `noindex` in staging and `index` in production, confirm the production environment variable is set correctly.

### Next.js Pages Router

Search for `noindex` in any `<Head>` components across your pages and `_app.tsx`:

```tsx
// Remove this from any page or _app.tsx
<meta name="robots" content="noindex" />
```

### SvelteKit

Search all `+layout.svelte` and `+page.svelte` files:

```svelte
<!-- Remove this from any layout or page -->
<svelte:head>
  <meta name="robots" content="noindex" />
</svelte:head>
```

### Nuxt

Check `app.vue`, layouts, and any page that calls `useSeoMeta` or `useHead`:

```ts
// Remove or correct this
useSeoMeta({ robots: 'noindex' })

// Change to:
useSeoMeta({ robots: 'index, follow' })
```

### Astro

Check your base layout for a robots meta tag:

```astro
<!-- Remove this from Layout.astro or any page -->
<meta name="robots" content="noindex" />
```

### X-Robots-Tag header

If `noindex` is coming from an HTTP header rather than a meta tag, check your server or middleware config. In Next.js, check `next.config.js` for a custom headers configuration:

```js
// next.config.js — remove any noindex from the headers array
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Remove this line:
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
    ]
  },
}
```

:::caution
Always verify your production environment separately before launch. Environment-conditional noindex logic is a reliable source of this mistake.
:::

## Verify the fix

Check the response for any noindex directive:

```bash
# Check meta tag
curl -s https://yourdomain.com/ | grep -i 'robots'

# Check response header
curl -I https://yourdomain.com/ | grep -i 'x-robots'
```

Neither output should contain `noindex`. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [Canonical tag missing](/fixes/crawlability/canonical-missing)
- [robots.txt blocking all crawlers](/fixes/crawlability/robots-txt-blocking-all)
