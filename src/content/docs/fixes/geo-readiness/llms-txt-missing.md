---
title: llms.txt missing
description: Add an llms.txt file so AI systems can find your site's most important content.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Your site has no `llms.txt` at `/llms.txt`. The `llms.txt` standard gives AI systems a curated map of your most important pages. Without it, crawlers either discover your content opportunistically or skip it entirely when building summaries and answers.

With it, you tell AI systems directly which pages matter and why — rather than leaving that inference to a generic crawl.

## How to fix it

Create an `llms.txt` file using Markdown. Include an H1 for your site name, an optional blockquote summary, and sections linking to important pages with brief descriptions.

```txt
# Your Site Name

> One sentence describing what your site does and who it is for.

## Documentation
- [Getting Started](https://yourdomain.com/docs/start): How to install and set up the tool
- [API Reference](https://yourdomain.com/docs/api): Full endpoint and parameter documentation

## Guides
- [Integration Guide](https://yourdomain.com/guides/integration): Step-by-step setup with third-party services
- [Troubleshooting](https://yourdomain.com/guides/troubleshooting): Common errors and how to resolve them

## About
- [About](https://yourdomain.com/about): Background on the project and team
```

Where you save the file depends on your framework:

| Framework | File path | Served at |
|-----------|-----------|-----------|
| Next.js | `public/llms.txt` | `/llms.txt` |
| Astro | `public/llms.txt` | `/llms.txt` |
| Nuxt | `public/llms.txt` | `/llms.txt` |
| SvelteKit | `static/llms.txt` | `/llms.txt` |
| HTML | `llms.txt` (project root) | `/llms.txt` |

:::tip
Include only your most useful pages — 10 to 20 is a good target. A curated list with meaningful descriptions is more valuable to AI systems than a dump of every URL. Descriptions after the colon are read directly; make them specific.
:::

## Verify the fix

After deploying:

```sh
curl -s https://yourdomain.com/llms.txt
```

You should see your Markdown content returned. A `404` or empty response means the file is not in the right directory or not being served correctly. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [faqpage-missing-geo-impact](./faqpage-missing-geo-impact)
- [no-quick-answer-block](./no-quick-answer-block)
- [gptbot-blocked](./gptbot-blocked)
- [csr-only-rendering](./csr-only-rendering)
