---
title: Claude-SearchBot blocked in robots.txt
description: Unblock Claude-SearchBot so your pages can be cited in Claude's web search.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Your `robots.txt` has `Disallow: /` under `User-agent: Claude-SearchBot`. Claude-SearchBot is the crawler Anthropic uses to index pages for Claude's web search. It is separate from ClaudeBot, which collects training data. Blocking Claude-SearchBot makes your pages less likely to be found and cited when Claude answers questions using the web.

## How to fix it

Remove the Claude-SearchBot block from your `robots.txt`:

```txt
# Remove these lines
User-agent: Claude-SearchBot
Disallow: /
```

To keep Claude-SearchBot out of specific sections only, disallow those paths instead:

```txt
User-agent: Claude-SearchBot
Disallow: /private/
```

If Claude-SearchBot is listed alongside other agents in a grouped block (several `User-agent` lines followed by one `Disallow: /`), remove just its `User-agent` line.

## Verify the fix

After deploying:

```sh
curl -s https://yourdomain.com/robots.txt | grep -A 3 "Claude-SearchBot"
```

No result means Claude-SearchBot falls back to your wildcard rules. `Disallow: /` means the block is still active. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [claudebot-blocked](./claudebot-blocked)
- [claude-searchbot-blocked](./claude-searchbot-blocked)
- [google-extended-blocked](./google-extended-blocked)
- [llms-txt-missing](./llms-txt-missing)
