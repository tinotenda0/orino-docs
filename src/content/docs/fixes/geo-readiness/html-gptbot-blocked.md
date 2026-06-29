---
title: GPTBot blocked in robots.txt (HTML project)
description: Remove the GPTBot block from your robots.txt file so OpenAI can index your site once deployed.
sidebar:
  badge:
    text: Warning
    variant: caution
---

## What this means

Orino found `Disallow: /` under `User-agent: GPTBot` in your project's `robots.txt` file. This block prevents OpenAI's crawler from indexing your content once the site is deployed.

This check runs during disk-only audits — when Orino scans a plain HTML project without fetching a live URL. It reads the `robots.txt` file directly from your project directory.

:::note
GPTBot is OpenAI's training crawler. Blocking it keeps your content out of OpenAI's training data but does not prevent ChatGPT from citing you via real-time web search. That is controlled by OAI-SearchBot. See [html-oai-searchbot-blocked](./html-oai-searchbot-blocked) if that is also blocked.
:::

## How to fix it

Open `robots.txt` in your project root and remove the GPTBot block:

```txt
# Remove these lines
User-agent: GPTBot
Disallow: /
```

To allow GPTBot site-wide, delete both lines. To restrict specific paths only:

```txt
User-agent: GPTBot
Disallow: /private/
```

## Verify the fix

Check the file in your project:

```sh
grep -A 3 "GPTBot" robots.txt
```

No output means GPTBot has no specific rule and falls back to your wildcard rules. `Disallow: /` means the block is still active. Re-run `orino audit` to confirm the check passes.

## Related fixes

- [html-oai-searchbot-blocked](./html-oai-searchbot-blocked)
- [html-perplexitybot-blocked](./html-perplexitybot-blocked)
- [html-claudebot-blocked](./html-claudebot-blocked)
- [llms-txt-missing](./llms-txt-missing)
