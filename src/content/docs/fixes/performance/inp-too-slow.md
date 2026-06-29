---
title: INP too slow
description: Resolves an Interaction to Next Paint score above 200ms that makes the site feel unresponsive to user input.
sidebar:
  badge:
    text: Critical
    variant: danger
---

## What this means

INP (Interaction to Next Paint) measures the delay between any user interaction — a click, tap, or keypress — and when the browser renders the next frame in response. It replaced First Input Delay as a Core Web Vital in March 2024. Google's threshold is ≤200ms. Above 500ms, the site feels broken.

The root cause is almost always JavaScript running on the main thread. When JS is executing, the browser cannot respond to input — it finishes the current task first.

## How to fix it

**Find the long tasks first.** Open Chrome DevTools, go to Performance, record while interacting with the page, and look for tasks longer than 50ms (shown in red). Those are your targets.

**Split large bundles**

Only load JavaScript that the current page needs. In Next.js, use dynamic imports. In Astro, components are zero-JS by default — check if you have `client:load` directives that could use `client:idle` or `client:visible` instead.

```tsx
// Next.js: load heavy components only when needed
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('./HeavyChart'), { ssr: false })
```

**Defer non-critical scripts**

Third-party scripts — analytics, tag managers, chat widgets — often run on the main thread at load time. Load them with `defer` or `async`, or better yet, load them after the page becomes interactive.

**Break up long event handlers**

If a click handler does expensive work synchronously, split it using `scheduler.yield()` to give the browser a chance to paint between tasks.

```ts
async function handleClick() {
  doFirstPart()
  await scheduler.yield() // let the browser respond to other input
  doSecondPart()
}
```

:::note
`scheduler.yield()` has broad browser support as of 2025. For older browsers, `await new Promise(r => setTimeout(r, 0))` gives the same effect.
:::

**Move heavy computation off the main thread**

Data transformations, parsing, or filtering that run synchronously in response to user input belong in a Web Worker, not the main thread.

## Verify the fix

Re-run the audit:

```bash
npx orino audit https://yourdomain.com
```

INP data comes from Chrome User Experience Report (CrUX), which reflects real-user data. Changes you make will not appear in the score until enough real users visit the updated page. For immediate feedback, test in Chrome DevTools using the Performance panel.

## Related fixes

- [LCP too slow](./lcp-too-slow)
- [TTFB slow](./ttfb-slow)
