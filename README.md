<div align="center">
  <img src="https://raw.githubusercontent.com/ismamz/next-transition-router/main/example/app/icon.svg" alt="next-transition-router" width="100" height="100" />
  <h1>next-transition-router</h1>
</div>

Easily add animated transitions between pages using Next.js App Router and your favorite animation library.

[**Live Demo using GSAP**](https://next-transition-router.vercel.app) (source code: [/example](/example)).

## Features

- Automatically detect internal links to handle page transitions ([optional `auto` flag](#auto-enabled)).
- Use a custom `Link` component to manually handle page transitions ([when `auto` is disabled](#handle-links-custom-link-component-vs-auto-detection)).
- Exclusively to be used with [Next.js App Router](https://nextjs.org/docs/app).
- Quickly add animated transitions between pages using JavaScript or CSS.
- Integrate seamlessly with [GSAP](https://gsap.com/resources/React/) or any other animation library of your choice.
- If JavaScript is disabled, the router's accessibility is not compromised.
- Focused on customizable animations, not targeting the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API).

If you're looking to use the View Transitions API, check [next-view-transitions](https://github.com/shuding/next-view-transitions).

> [!WARNING]
> This project is currently in Beta. Please note that the API may change as features are enhanced and refined.

## Installation

Install the package using your preferred package manager:

```sh
pnpm add next-transition-router
```

```sh
yarn add next-transition-router
```

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

## API

### `TransitionRouter`

| Prop       | Type       | Default Value    | Description                                       |
| ---------- | ---------- | ---------------- | ------------------------------------------------- |
| `leave`    | `function` | `next => next()` | Function to handle the leaving animation          |
| `enter`    | `function` | `next => next()` | Function to handle the entering animation         |
| `auto`     | `boolean`  | `false`          | Flag to enable/disable auto-detection of links    |

### `useTransitionState`

| Property  | Type                                | Description                                        |
|-----------|-------------------------------------|----------------------------------------------------|
| `stage`   | `'entering' \| 'leaving' \| 'none'` | Indicates the current stage of the transition.     |
| `isReady` | `boolean`                           | Indicates if the new page is ready to be animated. |

## Disclaimer

This package may not cover every use case. If you require a specific scenario, please [open an issue](https://github.com/ismamz/next-transition-router/issues/new/choose), and we can explore the possibility of extending the functionality.

## License

MIT.