---
title: Google-Extended blocked in robots.txt
description: Unblock Google-Extended if you want your content used by Gemini.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Your `robots.txt` has `Disallow: /` under `User-agent: Google-Extended`. Google-Extended is not a separate crawler. It is a control token that tells Google whether content fetched by Googlebot may be used for Gemini apps and for grounding Gemini models.

Blocking it does **not** affect Google Search rankings or AI Overviews, which rely on Googlebot. It does mean Gemini is less able to draw on or cite your content.

## How to fix it

Remove the Google-Extended block from your `robots.txt`:

```txt
# Remove these lines
User-agent: Google-Extended
Disallow: /
```

To keep Google-Extended out of specific sections only, disallow those paths instead:

```txt
User-agent: Google-Extended
Disallow: /private/
```

If Google-Extended is listed alongside other agents in a grouped block (several `User-agent` lines followed by one `Disallow: /`), remove just its `User-agent` line.

## Verify the fix

After deploying:

```sh
curl -s https://yourdomain.com/robots.txt | grep -A 3 "Google-Extended"
```

No result means Google-Extended falls back to your wildcard rules. `Disallow: /` means the block is still active. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [claudebot-blocked](./claudebot-blocked)
- [claude-searchbot-blocked](./claude-searchbot-blocked)
- [google-extended-blocked](./google-extended-blocked)
- [llms-txt-missing](./llms-txt-missing)
