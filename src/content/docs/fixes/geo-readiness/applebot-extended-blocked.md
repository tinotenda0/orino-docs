---
title: Applebot-Extended blocked in robots.txt
description: Applebot-Extended opts your content out of Apple Intelligence model training.
sidebar:
  badge:
    text: Info
    variant: note
---

## What this means

Your `robots.txt` has `Disallow: /` under `User-agent: Applebot-Extended`. Applebot-Extended controls whether content Applebot has already fetched may be used to train Apple's foundation models, which power Apple Intelligence. Applebot itself, which powers Siri and Spotlight search, is unaffected.

This is reported as **Info** and does not affect your score: opting out of model training is a legitimate choice. Leave the block in place if it was deliberate.

## How to fix it

Remove the Applebot-Extended block from your `robots.txt`:

```txt
# Remove these lines
User-agent: Applebot-Extended
Disallow: /
```

To keep Applebot-Extended out of specific sections only, disallow those paths instead:

```txt
User-agent: Applebot-Extended
Disallow: /private/
```

If Applebot-Extended is listed alongside other agents in a grouped block (several `User-agent` lines followed by one `Disallow: /`), remove just its `User-agent` line.

## Verify the fix

After deploying:

```sh
curl -s https://yourdomain.com/robots.txt | grep -A 3 "Applebot-Extended"
```

No result means Applebot-Extended falls back to your wildcard rules. `Disallow: /` means the block is still active. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [claudebot-blocked](./claudebot-blocked)
- [claude-searchbot-blocked](./claude-searchbot-blocked)
- [google-extended-blocked](./google-extended-blocked)
- [llms-txt-missing](./llms-txt-missing)
