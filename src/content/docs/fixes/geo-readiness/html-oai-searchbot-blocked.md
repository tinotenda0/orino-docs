---
title: OAI-SearchBot blocked in robots.txt (HTML project)
description: Remove the OAI-SearchBot block from your robots.txt file so your site can appear in ChatGPT answers.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

Orino found `Disallow: /` under `User-agent: OAI-SearchBot` in your project's `robots.txt` file. OAI-SearchBot is ChatGPT's real-time web search crawler. Blocking it means your site cannot appear in ChatGPT's web-search-powered answers once deployed.

This check runs during disk-only audits — when Orino scans a plain HTML project without fetching a live URL. It reads the `robots.txt` file directly from your project directory.

## How to fix it

Open `robots.txt` in your project root and remove the OAI-SearchBot block:

```txt
# Remove these lines
User-agent: OAI-SearchBot
Disallow: /
```

To allow OAI-SearchBot site-wide, delete both lines. To exclude specific paths:

```txt
User-agent: OAI-SearchBot
Disallow: /internal/
```

:::tip
If you blocked `User-agent: *` with `Disallow: /` and only added exceptions for Googlebot and Bingbot, OAI-SearchBot will be blocked by the wildcard. Add it to your allow list explicitly.
:::

## Verify the fix

Check the file in your project:

```sh
grep -A 3 "OAI-SearchBot" robots.txt
```

No output means OAI-SearchBot falls back to your wildcard rules. `Disallow: /` means it is still blocked. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [html-gptbot-blocked](./html-gptbot-blocked)
- [html-perplexitybot-blocked](./html-perplexitybot-blocked)
- [html-claudebot-blocked](./html-claudebot-blocked)
- [llms-txt-missing](./llms-txt-missing)
