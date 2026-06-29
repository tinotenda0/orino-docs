---
title: PerplexityBot blocked in robots.txt (HTML project)
description: Remove the PerplexityBot block from your robots.txt file so your site can appear in Perplexity answers.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

Orino found `Disallow: /` under `User-agent: PerplexityBot` in your project's `robots.txt` file. Perplexity.ai is one of the highest-citation-volume AI search engines. Blocking PerplexityBot makes your content invisible to every Perplexity query once deployed, regardless of how relevant it is.

This check runs during disk-only audits — when Orino scans a plain HTML project without fetching a live URL. It reads the `robots.txt` file directly from your project directory.

## How to fix it

Open `robots.txt` in your project root and remove the PerplexityBot block:

```txt
# Remove these lines
User-agent: PerplexityBot
Disallow: /
```

To allow PerplexityBot site-wide, delete both lines. To restrict specific paths:

```txt
User-agent: PerplexityBot
Disallow: /api/
Disallow: /admin/
```

## Verify the fix

Check the file in your project:

```sh
grep -A 3 "PerplexityBot" robots.txt
```

No output means PerplexityBot falls back to your wildcard rules. `Disallow: /` means the block is still active. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [html-gptbot-blocked](./html-gptbot-blocked)
- [html-oai-searchbot-blocked](./html-oai-searchbot-blocked)
- [html-claudebot-blocked](./html-claudebot-blocked)
- [llms-txt-missing](./llms-txt-missing)
