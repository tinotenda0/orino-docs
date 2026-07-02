---
title: URL contains underscores or uppercase
description: One or more route paths use underscores or uppercase letters, reducing keyword visibility in Google's index.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Your URL paths contain underscores (`_`) or uppercase letters. Google treats hyphens as word separators when it parses URLs — "about-us" is indexed as two words, "about" and "us". It does not split on underscores, so "about_us" is indexed as the single token "aboutus".

Uppercase letters introduce a related problem: a page accessible at both `/About-Us` and `/about-us` can appear to be two separate URLs, creating potential duplicate content issues and splitting any link equity between them.

The convention for web URLs is lowercase, hyphen-separated. This check flags any route that departs from it.

:::note
Dynamic parameter placeholders such as `[productId]`, `[...slug]`, or `[[...slug]]` are part of your framework's routing syntax, not the final URL — they are excluded from this check. Only literal path segments are flagged.
:::

## How to fix it

Rename routes to use lowercase and hyphens. The approach differs per framework.

### Next.js App Router

Rename the folder inside `app/`:

```
app/about_us/page.tsx     →  app/about-us/page.tsx
app/OurTeam/page.tsx      →  app/our-team/page.tsx
app/case_studies/page.tsx →  app/case-studies/page.tsx
```

### Next.js Pages Router

Rename the file inside `pages/`:

```
pages/about_us.tsx     →  pages/about-us.tsx
pages/OurTeam.tsx      →  pages/our-team.tsx
pages/case_studies.tsx →  pages/case-studies.tsx
```

### Astro

Rename the file or folder inside `src/pages/`:

```
src/pages/about_us.astro          →  src/pages/about-us.astro
src/pages/OurTeam/index.astro     →  src/pages/our-team/index.astro
src/pages/case_studies.astro      →  src/pages/case-studies.astro
```

### SvelteKit

Rename the route directory inside `src/routes/`:

```
src/routes/about_us/+page.svelte  →  src/routes/about-us/+page.svelte
src/routes/OurTeam/+page.svelte   →  src/routes/our-team/+page.svelte
```

### Nuxt

Rename the file inside `pages/`:

```
pages/about_us.vue     →  pages/about-us.vue
pages/OurTeam.vue      →  pages/our-team.vue
pages/case_studies.vue →  pages/case-studies.vue
```

### Plain HTML

Rename the HTML file:

```
about_us.html     →  about-us.html
OurTeam.html      →  our-team.html
```

:::danger
When you rename a live route, the old URL stops working. Before deploying, set up a 301 redirect from the old path to the new one. Without a redirect, any indexed URLs or existing inbound links will return 404, and you will lose whatever ranking the old URL had.
:::

## Verify the fix

Re-run the audit:

```bash
npx orino-cli audit
```

The check scans all detected route paths for underscores and uppercase in path segments. Once renamed — with redirects in place — the check passes.

## Related fixes

- [Pages deeper than 3 clicks](/fixes/architecture/crawl-depth-too-deep)
- [Homepage missing links to key sections](/fixes/architecture/homepage-missing-links)
- [Generic image filenames](/fixes/on-page/image-generic-filename)
