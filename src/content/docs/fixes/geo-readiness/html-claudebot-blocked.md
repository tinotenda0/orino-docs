---
title: ClaudeBot blocked in robots.txt (HTML project)
description: Remove the ClaudeBot block from your robots.txt file so Anthropic can index your content.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Orino found `Disallow: /` under `User-agent: ClaudeBot` in your project's `robots.txt` file. ClaudeBot is Anthropic's web crawler. Blocking it prevents Anthropic from indexing your content once deployed, which reduces the likelihood of your site appearing in Claude's responses.

This check runs during disk-only audits — when Orino scans a plain HTML project without fetching a live URL. It reads the `robots.txt` file directly from your project directory.

## How to fix it

Open `robots.txt` in your project root and remove the ClaudeBot block:

```txt
# Remove these lines
User-agent: ClaudeBot
Disallow: /
```

To allow ClaudeBot site-wide, delete both lines. To restrict specific paths:

```txt
User-agent: ClaudeBot
Disallow: /private/
```

## Verify the fix

Check the file in your project:

```sh
grep -A 3 "ClaudeBot" robots.txt
```

No output means ClaudeBot falls back to your wildcard rules. `Disallow: /` means the block is still active. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [html-gptbot-blocked](./html-gptbot-blocked)
- [html-oai-searchbot-blocked](./html-oai-searchbot-blocked)
- [html-perplexitybot-blocked](./html-perplexitybot-blocked)
- [llms-txt-missing](./llms-txt-missing)
