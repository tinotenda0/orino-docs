---
title: Frameworks
description: Which frameworks Orino supports and what gets checked.
---

Orino runs two layers of checks: URL-based checks that work on any live site regardless of framework, and codebase checks that are framework-specific and only run when Orino can read your source files. URL checks need a live URL. Codebase checks need a `--dir` path pointing to the project root.

## Supported frameworks

| Framework | Router/Variant | Minimum Version |
|-----------|----------------|-----------------|
| Next.js | App Router | 13 |
| Next.js | Pages Router | 12 |
| Astro | | 2 |
| SvelteKit | | 1 |
| Nuxt | | 3 |
| Plain HTML / Static | | n/a |

## How detection works

Orino reads `package.json` in the project directory to identify the framework from its dependencies. It then checks for the presence of specific config files or directory structures to confirm detection and, for Next.js, to determine the router variant.

- **Next.js App Router:** `next` in dependencies plus `app/layout.tsx` or `src/app/layout.tsx` present
- **Next.js Pages Router:** `next` in dependencies plus `pages/_app.tsx`, `pages/index.tsx`, or their `src/pages/` equivalents
- **Astro:** `astro` in dependencies plus `astro.config.ts`, `astro.config.mjs`, or `astro.config.js` (checked at project root and inside `src/`)
- **SvelteKit:** `@sveltejs/kit` in dependencies plus `svelte.config.js` or `svelte.config.ts` (checked at project root and inside `src/`)
- **Nuxt:** `nuxt` in dependencies plus `nuxt.config.ts`, `nuxt.config.js`, or `nuxt.config.mjs`
- **Plain HTML / Static:** no recognised framework package in dependencies, and at least one `.html` file found in the project tree

Orino checks both project-root and `src/`-prefixed paths for every framework. If detection is wrong, pass `--framework` with one of the supported values to override it.

:::note
If both App Router and Pages Router signals are present in the same project, App Router takes precedence.
:::

## What is framework-specific vs universal

**Universal checks (URL-based, any site)**

These run whenever Orino has a live URL, regardless of whether codebase access is available.

- Canonical tag presence and validity
- Meta title and description
- Open Graph tags (og:title, og:description, og:image, og:url)
- Structured data validity and schema types via JSON-LD
- Core Web Vitals via PageSpeed Insights (LCP, CLS, INP, TTFB)
- Heading structure and H1 presence
- Image alt attributes
- Content length
- AI crawler access in robots.txt (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot)
- llms.txt presence

**Framework-specific checks (codebase, requires `--dir`)**

- **Next.js App Router:** `generateMetadata` on dynamic routes, `generateStaticParams` on dynamic routes, `'use client'` at the page level (CSR-only risk), `app/robots.ts` and `app/sitemap.ts` presence, root layout `metadata` export, `metadataBase` configuration
- **Next.js Pages Router:** `getStaticPaths` on dynamic routes, `<Head>` component usage per page, `_app.tsx` and `_document.tsx` presence
- **Astro:** `getStaticPaths` on dynamic `.astro` routes, layout-level `<title>`, description, and `og:image` checks, raw `<img>` vs Astro `<Image>` component usage
- **SvelteKit:** `+page.server.ts` on dynamic routes, `<svelte:head>` usage per page and in root layout, `ssr = false` detection
- **Nuxt:** `useAsyncData` or `useFetch` on dynamic routes, `useHead` and `useSeoMeta` usage, raw `<img>` vs `<NuxtImg>` usage, `ssr: false` in `definePageMeta`
- **Plain HTML:** per-file `<title>`, meta description, `lang` attribute, and viewport meta tag checks, since there is no shared layout to inspect

## Running without codebase access

If you only have a URL and no access to source files, pass `--no-codebase`:

```bash
npx @bynaree/orino audit --url https://example.com --no-codebase
```

Framework-specific findings are skipped entirely. Every universal check still runs, including performance, schema validation, metadata, and GEO readiness.

:::tip
`--no-codebase` is useful for auditing competitors, staging environments you cannot check out locally, or any site where you only have a URL.
:::

## Unsupported frameworks

If Orino cannot identify a supported framework, it falls back to URL-only analysis automatically rather than exiting with an error. Every URL-based check still runs, so you still get performance data, metadata results, and GEO readiness signals.

Remix and Gatsby are not currently supported. For projects on these frameworks, URL-only analysis covers the checks that matter most. Use `--url` with your deployed URL and Orino will run the full set of universal checks.
