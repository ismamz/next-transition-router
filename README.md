<div align="center">
  <img src="https://raw.githubusercontent.com/ismamz/next-transition-router/main/example/app/icon.svg" alt="next-transition-router" width="100" height="100" />
  <h1>next-transition-router</h1>
</div>

Easily add animated transitions between pages using Next.js App Router and your favorite animation library.

- [**Live Demo using GSAP**](https://next-transition-router.vercel.app) (source code: [/example](/example)).
- [**Stackblitz Demo using Framer Motion**](https://stackblitz.com/edit/next-transition-router-framer-motion).

## Features

- Automatically detect internal links to handle page transitions ([optional `auto` flag](#auto-enabled)).
- Use a custom `Link` component to manually handle page transitions ([when `auto` is disabled](#handle-links-custom-link-component-vs-auto-detection)).
- Exclusively to be used with [Next.js App Router](https://nextjs.org/docs/app) (v14.0.0 or higher).
- Quickly add animated transitions between pages using JavaScript or CSS.
- Integrate seamlessly with [GSAP](https://gsap.com/resources/React/) or any other animation library of your choice (see [minimal GSAP example](#minimal-example-using-gsap)).
- If JavaScript is disabled, the router's accessibility is not compromised.
- It's really lightweight; the bundle size is less than 8 KB.
- Focused on customizable animations, not targeting the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API).

If you're looking to use the View Transitions API, check [next-view-transitions](https://github.com/shuding/next-view-transitions).

> [!WARNING]
> This project is currently in Beta. Please note that the API may change as features are enhanced and refined.

## Video tutorials

Learn how to build page transitions with these community tutorials.

<table>
  <tr>
    <td width="50%" valign="top">
      <a href="https://www.youtube.com/watch?v=ngD_e4m45S0">
        <img src="https://i.ytimg.com/vi/ngD_e4m45S0/maxresdefault.jpg" alt="Next JS Page Transitions Taken Over by GSAP (The Hyperactive Block Reveal Effect)" width="480" />
        <br />
        <strong>Next JS Page Transitions Taken Over by GSAP (The Hyperactive Block Reveal Effect)</strong>
      </a>
      <br />
      Codegrid
    </td>
    <td width="50%" valign="top">
      <a href="https://www.youtube.com/watch?v=Y_xP_IRGvbM">
        <img src="https://i.ytimg.com/vi/Y_xP_IRGvbM/maxresdefault.jpg" alt="Premium SVG Page Transition in Next.js (GSAP + Next Transition Router)" width="480" />
        <br />
        <strong>Premium SVG Page Transition in Next.js (GSAP + Next Transition Router)</strong>
      </a>
      <br />
      WolfDev
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <a href="https://www.youtube.com/watch?v=0TA4LTy4Ib0">
        <img src="https://i.ytimg.com/vi/0TA4LTy4Ib0/maxresdefault.jpg" alt="The $10,000 Next JS Page Transition That Took Me One Coffee and Four Divs" width="480" />
        <br />
        <strong>The $10,000 Next JS Page Transition That Took Me One Coffee and Four Divs</strong>
      </a>
      <br />
      Codegrid
    </td>
    <td width="50%" valign="top">
      <a href="https://www.youtube.com/watch?v=4pNvK0WMqCc">
        <img src="https://i.ytimg.com/vi/4pNvK0WMqCc/maxresdefault.jpg" alt="I Let GSAP Eat My Next JS Page Transitions Again (The Awwwards SOTD One)" width="480" />
        <br />
        <strong>I Let GSAP Eat My Next JS Page Transitions Again (The Awwwards SOTD One)</strong>
      </a>
      <br />
      Codegrid
    </td>
  </tr>
</table>

## Installation

Install the package using npm:

```sh
npm install next-transition-router
```

## Usage

### `TransitionRouter`

Create a client component (e.g.: `app/providers.tsx`) to use the `TransitionRouter` provider:

```tsx
"use client";

import { TransitionRouter } from "next-transition-router";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TransitionRouter
      leave={(next) => {
        someAnimation().then(next);
      }}
      enter={(next) => {
        anotherAnimation().then(next);
      }}
    >
      {children}
    </TransitionRouter>
  );
}
```

> [!NOTE]
> It should be a client component because you have to pass DOM functions as props to the provider.

After that, you should import that component in the layout component (e.g.: `app/layout.tsx`).

#### Async Callbacks

The `leave` and `enter` callbacks support async functions.

```tsx
"use client";

import { TransitionRouter } from "next-transition-router";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TransitionRouter
      leave={async (next) => {
        await someAsyncAnimation();
        next();
      }}
      enter={async (next) => {
        await anotherAsyncAnimation();
        next();
      }}
    >
      {children}
    </TransitionRouter>
  );
}
```

#### `from` and `to` parameters for `leave` callback

The `leave` callback receives the `from` and `to` parameters, which are strings with the previous and next page paths. Useful if you want to animate the transition conditionally based on the page.

```tsx
const onLeave = (next, from, to) => {
  someAnimation(from, to).then(next);
};
```

> [!NOTE]
> When using `router.back()` method, the `to` parameter will be undefined. See [programmatic navigation](#programmatic-navigation).

### Handling links (custom `Link` component vs auto-detection)

To determine how to handle links, `TransitionRouter` can receive an `auto` prop (`boolean`).

#### `auto` disabled (default)

Use the custom `Link` component instead of the native [`Link` component from Next.js](https://nextjs.org/docs/app/api-reference/components/link) to trigger transitions.

```tsx
import { Link } from "next-transition-router";

export function Example() {
  return <Link href="/about">About</Link>;
}
```

> [!TIP]
> Use `import { Link as TransitionLink } from "next-transition-router"` to avoid naming conflicts.

#### `auto` enabled

When `auto` is enabled, the `TransitionRouter` intercepts click events on internal links, except anchor links, and triggers page transitions. In this case you don't need to use the custom `Link` component.

To ignore a link in this mode, simply add the `data-transition-ignore` attribute to the link.

### Programmatic navigation

Use the `useTransitionRouter` hook to manage navigation (`push`, `replace`, `back`).

It's similar to [Next.js `useRouter`](https://nextjs.org/docs/app/api-reference/functions/use-router) with added transition support.

```tsx
"use client";

import { useTransitionRouter } from "next-transition-router";

export function Programmatic() {
  const router = useTransitionRouter();

  return (
    <button
      onClick={() => {
        alert("Do something before navigating away");
        router.push("/about");
      }}
    >
      Go to /about
    </button>
  );
}
```

> [!IMPORTANT]
> Back and Forward browser navigation doesn't trigger page transitions, and [this is intentional](https://github.com/ismamz/next-transition-router/issues/2).

### Search parameter transitions

By default, changing only the query string navigates without an animation. Opt in
with `transitionOnSearchParams` to animate filtering, pagination, or other search
parameter changes on the same pathname:

```tsx
<TransitionRouter
  transitionOnSearchParams
  leave={(next) => someAnimation().then(next)}
  enter={(next) => anotherAnimation().then(next)}
>
  {children}
</TransitionRouter>
```

This applies to the custom `Link`, auto-detected links, and programmatic `push`
and `replace`. Adding, changing, and removing parameters complete the full
`leaving` → `entering` → `none` cycle. Hash-only changes and equivalent query
encodings (such as `?q=a%20b` and `?q=a+b`) do not animate. Browser history
navigation keeps its existing behavior.

The query observer has its own Suspense boundary, so enabling this option does
not require wrapping the application in Suspense.

### Transition state

Use the `useTransitionState` hook to determine the current stage of the transition.

Possible `stage` values: `'entering' | 'leaving' | 'none'`.

Aditionally, you have the `isReady` state (`boolean`).

```tsx
"use client";

import { useTransitionState } from "next-transition-router";

export function Example() {
  const { stage, isReady } = useTransitionState();

  return (
    <div>
      <p>Current stage: {stage}</p>
      <p>Page ready: {isReady ? "Yes" : "No"}</p>
    </div>
  );
}
```

> [!TIP]
> This is useful, for example, if you want to trigger a reveal animation after the page transition ends.

### Cleanup

`TransitionRouter` manages cleanup functions for `leave` and `enter` callbacks, to prevent memory leaks.

Similar to React's `useEffect` hook, you can return a cleanup function to cancel the animation.

#### Minimal example using GSAP

```tsx
"use client";

import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TransitionRouter
      leave={(next) => {
        const tween = gsap.fromTo("main", { autoAlpha: 1 }, { autoAlpha: 0, onComplete: next });
        return () => tween.kill();
      }}
      enter={(next) => {
        const tween = gsap.fromTo("main", { autoAlpha: 0 }, { autoAlpha: 1, onComplete: next });
        return () => tween.kill();
      }}
    >
      {children}
    </TransitionRouter>
  );
}
```

## Performance Optimization

When overlapping exit animations with page loading (common for smooth transitions), React rendering can cause animation jank. Use `requestAnimationFrame` and `startTransition` to prioritize animation performance:

```tsx
import { startTransition } from "react";

enter={(next) => {
  const tl = gsap.timeline()
    .to(".overlay", { y: "-100%", duration: 0.5 })
    .call(() => {
      requestAnimationFrame(() => startTransition(next));
    }, undefined, "<50%"); // Overlap timing preserved
    
  return () => tl.kill();
}}
```

This prevents React updates from interfering with your animation timeline while maintaining visual timing.

## API

### `TransitionRouter`

| Prop       | Type       | Default Value    | Description                                       |
| ---------- | ---------- | ---------------- | ------------------------------------------------- |
| `leave`    | `function` | `next => next()` | Function to handle the leaving animation          |
| `enter`    | `function` | `next => next()` | Function to handle the entering animation         |
| `auto`     | `boolean`  | `false`          | Flag to enable/disable auto-detection of links    |
| `transitionOnSearchParams` | `boolean` | `false` | Animate query string changes on the same pathname. |

### `useTransitionState`

| Property  | Type                                | Description                                        |
|-----------|-------------------------------------|----------------------------------------------------|
| `stage`   | `'entering' \| 'leaving' \| 'none'` | Indicates the current stage of the transition.     |
| `isReady` | `boolean`                           | Indicates if the new page is ready to be animated. |

## Used by…

- [Eladio Dieste](https://www.eladiodieste.com/) (by [++hellohello](https://www.hellohello.is))
- [Outfit®](https://outfit.hellohello.is/) (Awwwards SOTD & Dev, FWA of the Day, by [++hellohello](https://www.hellohello.is))
- [197 Historias Ilustradas](https://www.197historiasilustradas.com/) (FWA of the Day, by [++hellohello](https://www.hellohello.is))
- [Studio 375](https://375.studio/) (Awwwards SOTD & Dev)
- [Anuc Home](https://www.anuchome.com/) (Awwwards SOTD & Dev, FWA of the Day, by [Edoardo Lunardi](https://www.edoardolunardi.dev/) & Eva Landaluce)
- [Secret Level](https://www.secretlevel.co/) (by [Andreas Antonsson](https://www.andreasantonsson.dev/))
- [MIUX Studio](https://madeinuxstudio.com/) (Awwwards SOTD, by MIUX)

## Disclaimer

This package may not cover every use case. If you require a specific scenario, please [open an issue](https://github.com/ismamz/next-transition-router/issues/new/choose), and we can explore the possibility of extending the functionality.

## Local browser tests

The example includes pagination controls and a checkbox for enabling query
transitions. To run its Playwright regression tests against a production build:

```sh
pnpm install --frozen-lockfile
pnpm --filter next-transition-router-example exec playwright install chromium
pnpm build
pnpm --filter next-transition-router-example build
pnpm --filter next-transition-router-example test:e2e
```

Add `--headed` to the last command to watch the browser. Failed tests retain
Playwright traces in `example/test-results`.

## License

MIT.

---

by [isma](https://isma.uy)
