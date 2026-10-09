---
title: CCBot blocked in robots.txt
description: CCBot feeds Common Crawl, a major source of LLM training data.
sidebar:
  badge:
    text: Info
    variant: note
---

## What this means

Your `robots.txt` has `Disallow: /` under `User-agent: CCBot`. CCBot is Common Crawl's crawler. Common Crawl publishes an open web archive that many large language models are trained on, so blocking it reduces how much models know about your site out of the box.

This is reported as **Info** and does not affect your score: opting out of training datasets is a legitimate choice. Leave the block in place if it was deliberate.

## How to fix it

Remove the CCBot block from your `robots.txt`:

```txt
# Remove these lines
User-agent: CCBot
Disallow: /
```

To keep CCBot out of specific sections only, disallow those paths instead:

```txt
User-agent: CCBot
Disallow: /private/
```

If CCBot is listed alongside other agents in a grouped block (several `User-agent` lines followed by one `Disallow: /`), remove just its `User-agent` line.

## Verify the fix

After deploying:

```sh
curl -s https://yourdomain.com/robots.txt | grep -A 3 "CCBot"
```

No result means CCBot falls back to your wildcard rules. `Disallow: /` means the block is still active. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [claudebot-blocked](./claudebot-blocked)
- [claude-searchbot-blocked](./claude-searchbot-blocked)
- [google-extended-blocked](./google-extended-blocked)
- [llms-txt-missing](./llms-txt-missing)
