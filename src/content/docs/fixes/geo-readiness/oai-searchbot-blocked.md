---
title: OAI-SearchBot blocked in robots.txt
description: Unblock OAI-SearchBot so your site can appear in ChatGPT's web-search-powered answers.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

Your `robots.txt` blocks `OAI-SearchBot` with `Disallow: /`. OAI-SearchBot is ChatGPT's real-time web search crawler — the bot that powers citations when a user asks ChatGPT something with web search enabled. Blocking it means your site cannot appear in those answers, regardless of how relevant your content is.

This is distinct from GPTBot, which crawls for training data. You can block GPTBot (to opt out of training) while keeping OAI-SearchBot allowed for real-time citations. Blocking OAI-SearchBot removes you from live ChatGPT results entirely.

## How to fix it

Remove the OAI-SearchBot block from your `robots.txt`:

```txt
# Remove these lines
User-agent: OAI-SearchBot
Disallow: /
```

To allow OAI-SearchBot site-wide, delete both lines. To exclude only specific paths:

```txt
User-agent: OAI-SearchBot
Disallow: /internal/
Disallow: /staging/
```

:::tip
If you blocked `User-agent: *` with `Disallow: /` and added exceptions only for Googlebot and Bingbot, OAI-SearchBot is almost certainly missing from your allow list. Add it explicitly rather than relying on inheritance from `*`.
:::

## Verify the fix

After deploying:

```sh
curl -s https://yourdomain.com/robots.txt | grep -A 3 "OAI-SearchBot"
```

No result means OAI-SearchBot falls back to your wildcard rules. `Disallow: /` means it is still blocked. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [gptbot-blocked](./gptbot-blocked)
- [perplexitybot-blocked](./perplexitybot-blocked)
- [claudebot-blocked](./claudebot-blocked)
- [llms-txt-missing](./llms-txt-missing)
