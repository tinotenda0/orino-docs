---
title: PerplexityBot blocked in robots.txt
description: Unblock PerplexityBot so your site can be cited in Perplexity.ai answers.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

Your `robots.txt` blocks `PerplexityBot` with `Disallow: /`. Perplexity.ai is one of the highest-citation-volume AI search engines — it surfaces sources prominently and users click through. Blocking PerplexityBot makes your content invisible to every Perplexity query, regardless of how relevant it is.

## How to fix it

Remove the PerplexityBot block from your `robots.txt`:

```txt
# Remove these lines
User-agent: PerplexityBot
Disallow: /
```

Delete those two lines to allow PerplexityBot site-wide. To exclude specific paths only:

```txt
User-agent: PerplexityBot
Disallow: /api/
Disallow: /admin/
```

## Verify the fix

After deploying:

```sh
curl -s https://yourdomain.com/robots.txt | grep -A 3 "PerplexityBot"
```

No result means PerplexityBot falls back to your wildcard rules. `Disallow: /` means the block is still active. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [gptbot-blocked](./gptbot-blocked)
- [oai-searchbot-blocked](./oai-searchbot-blocked)
- [claudebot-blocked](./claudebot-blocked)
- [llms-txt-missing](./llms-txt-missing)
