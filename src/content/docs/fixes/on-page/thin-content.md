---
title: Thin content
description: The page has fewer than 300 visible words, making it unlikely to rank well or be cited by AI search engines.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

The page has under 300 visible words. Thin pages are a persistent ranking problem: they rarely satisfy a search query well enough to rank, and Google crawls them less frequently over time.

For AI search engines — ChatGPT, Perplexity, Gemini — thin content is a more acute problem. These tools look for substantive pages to cite and quote. A page with 80 words of marketing copy will not be quoted.

## How to fix it

Add real content. There is no word count that unlocks rankings — 300 is a floor, not a target. The real question is whether the page fully covers what someone searching for this topic needs to know.

**What actually helps:**

- Expand the page to address the topic properly. A service page should explain what the service includes, who it is for, how it works, and what the process looks like.
- Add an FAQ section covering the specific questions your audience asks.
- Add prose to what is currently a visual-only or CTA-only page.
- Include supporting detail: data, methodology, examples, or evidence.

**What does not help:**

- Padding with repeated keywords or variations
- Adding a "related posts" section and counting the link text as content
- Boilerplate copy that applies equally to any competitor in your space

:::note
A homepage built around a single large CTA may correctly sit under 300 words by design. In that case, the decision is not "add filler" but "decide whether this page should carry more substance, or whether the site's architecture should send traffic to richer inner pages sooner."
:::

## Verify the fix

Re-run the audit:

```bash
npx @bynaree/orino audit --url https://yourdomain.com
```

The check counts words from the rendered HTML after removing `<script>`, `<style>`, `<noscript>`, and `<head>` elements. It counts words longer than two characters. You can estimate the count in the browser console:

```js
document.body.innerText.split(/\s+/).filter(w => w.length > 2).length
```

## Related fixes

- [H1 tag missing](/fixes/on-page/missing-h1)
- [Heading hierarchy broken](/fixes/on-page/heading-hierarchy-broken)
- [Generic anchor text](/fixes/on-page/generic-anchor-text)
