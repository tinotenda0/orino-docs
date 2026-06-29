---
title: GPTBot blocked in robots.txt
description: Remove the GPTBot block from robots.txt so OpenAI can crawl and index your content.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

Your `robots.txt` has `Disallow: /` under `User-agent: GPTBot`. This tells OpenAI's crawler to leave your site entirely, which keeps your content out of OpenAI's training corpus and knowledge systems.

:::note
GPTBot is OpenAI's training crawler, not ChatGPT's real-time search crawler. Blocking GPTBot does not prevent ChatGPT from citing your site via web search. That is controlled by a separate bot, OAI-SearchBot. See [oai-searchbot-blocked](./oai-searchbot-blocked) if that is also blocked.
:::

## How to fix it

Find and remove the GPTBot block in your `robots.txt`:

```txt
# Remove these lines
User-agent: GPTBot
Disallow: /
```

If you want to allow GPTBot site-wide, delete both lines. If you want to exclude only specific paths, use a targeted disallow:

```txt
User-agent: GPTBot
Disallow: /private/
Disallow: /members-only/
```

:::caution
A wildcard block (`User-agent: *` with `Disallow: /`) combined with per-bot `Allow` exceptions is a common cause of accidental blocks. If you use this pattern, add an explicit GPTBot section with `Allow: /` rather than relying on exception ordering.
:::

## Verify the fix

After deploying, run:

```sh
curl -s https://yourdomain.com/robots.txt | grep -A 3 "GPTBot"
```

If the command returns nothing, GPTBot has no specific rule and falls back to your wildcard rules. If it returns `Disallow: /`, the block is still active. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [oai-searchbot-blocked](./oai-searchbot-blocked)
- [perplexitybot-blocked](./perplexitybot-blocked)
- [claudebot-blocked](./claudebot-blocked)
- [llms-txt-missing](./llms-txt-missing)
