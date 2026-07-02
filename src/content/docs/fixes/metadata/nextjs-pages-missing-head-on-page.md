---
title: Page missing Head component
description: A Pages Router page file has no Head component. It has no unique title or meta description.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

In the Next.js Pages Router, each page component is responsible for its own metadata. A page that does not import and use `<Head>` from `next/head` will have no page-specific title or description. If `_app.tsx` sets a default title, all such pages will share it, which means duplicate titles across your site.

The check reports this for every non-dynamic page that is missing a `<Head>` usage.

## How to fix it

Import `Head` from `next/head` and add a `<title>` and `<meta name="description">` inside it for every page component.

```tsx
// pages/about.tsx
import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>About | Acme</title>
        <meta name="description" content="Learn about our studio, our approach, and the team behind it." />
        <meta property="og:title" content="About | Acme" />
        <meta property="og:description" content="Learn about our studio, our approach, and the team behind it." />
      </Head>
      <main>
        <h1>About</h1>
      </main>
    </>
  )
}
```

```tsx
// pages/services.tsx
import Head from 'next/head'

export default function Services() {
  return (
    <>
      <Head>
        <title>Services | Acme</title>
        <meta name="description" content="Architecture, interior design, and project management for residential and commercial clients." />
        <meta property="og:title" content="Services | Acme" />
        <meta property="og:description" content="Architecture, interior design, and project management for residential and commercial clients." />
      </Head>
      <main>
        <h1>Services</h1>
      </main>
    </>
  )
}
```

:::tip
If you have many pages with a consistent pattern, extract the metadata into a helper that takes `title` and `description` as arguments to avoid repeating the OG tag markup on every page.

```tsx
// components/PageHead.tsx
import Head from 'next/head'

interface Props {
  title: string
  description: string
}

export function PageHead({ title, description }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
  )
}
```
:::

## Verify the fix

```bash
curl -s https://example.com/about | grep -i '<title'
```

Confirm the title is page-specific, not a shared default. Re-run the audit:

```bash
npx @bynaree/orino audit
```

## Related fixes

- [_app.tsx missing Head component](/fixes/metadata/nextjs-pages-app-missing-head)
- [_document.tsx missing](/fixes/metadata/nextjs-pages-document-missing)
- [Duplicate titles](/fixes/metadata/title-duplicate)
