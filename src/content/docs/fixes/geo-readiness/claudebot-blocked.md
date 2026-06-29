---
title: ClaudeBot blocked in robots.txt
description: Unblock ClaudeBot so Anthropic can index your content.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Your `robots.txt` has `Disallow: /` under `User-agent: ClaudeBot`. ClaudeBot is Anthropic's web crawler. Blocking it prevents Anthropic from indexing your content, which reduces the likelihood of your site being surfaced in Claude's responses.

## How to fix it

Remove the ClaudeBot block from your `robots.txt`:

```txt
# Remove these lines
User-agent: ClaudeBot
Disallow: /
```

Delete those two lines to allow ClaudeBot site-wide. To exclude specific paths:

```txt
User-agent: ClaudeBot
Disallow: /private/
```

## Verify the fix

After deploying:

```sh
curl -s https://yourdomain.com/robots.txt | grep -A 3 "ClaudeBot"
```

No result means ClaudeBot falls back to your wildcard rules. `Disallow: /` means the block is still active. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [gptbot-blocked](./gptbot-blocked)
- [oai-searchbot-blocked](./oai-searchbot-blocked)
- [perplexitybot-blocked](./perplexitybot-blocked)
- [llms-txt-missing](./llms-txt-missing)
